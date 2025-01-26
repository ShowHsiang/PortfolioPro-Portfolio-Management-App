from rest_framework import viewsets, status
from rest_framework.response import Response
from .models import Portfolio, Holding, Transaction
from .serializers import PortfolioSerializer, HoldingSerializer, TransactionSerializer
from rest_framework.permissions import IsAuthenticated
from rest_framework.decorators import api_view, permission_classes
from market.models import PriceHistory
from django.utils.timezone import now
from datetime import timedelta
from market.models import PriceHistory

import logging

logger = logging.getLogger(__name__)

def recalculate_holding(holding):
    """
    Recalculate the holding's shares and cost_basis based on all associated transactions.
    """
    transactions = holding.transactions.all()
    total_shares = 0
    total_cost = 0

    for transaction in transactions:
        if transaction.action == 'BUY':
            total_shares += transaction.shares
            total_cost += transaction.shares * transaction.price
        elif transaction.action == 'SELL':
            total_shares -= transaction.shares

    holding.shares = total_shares
    holding.cost_basis = (total_cost / total_shares) if total_shares > 0 else 0
    latest_price = (
        PriceHistory.objects.filter(asset__symbol=holding.symbol)
        .order_by('-date')
        .first()
    )
    if latest_price:
        holding.market_value = total_shares * latest_price.close_price
    else:
        holding.market_value = 0
        
    holding.save()

class TransactionViewSet(viewsets.ModelViewSet):
    permission_classes = [IsAuthenticated]
    queryset = Transaction.objects.all()
    serializer_class = TransactionSerializer

    def create(self, request, *args, **kwargs):
        symbol = request.data.pop('symbol', None)
        serializer = self.get_serializer(data=request.data)
        
        if serializer.is_valid():
            if symbol is None:
                return Response({'error': 'Symbol is required'}, status=status.HTTP_400_BAD_REQUEST)
            
            # Retrieve or create Portfolio and Holding
            portfolio, created = Portfolio.objects.get_or_create(user=request.user)
            holding, holding_created = Holding.objects.get_or_create(
                portfolio=portfolio,
                symbol=symbol,
                defaults={'shares': 0, 'cost_basis': 0, 'market_value': 0}
            )

            # Save transaction and recalculate holding
            transaction = serializer.save(holding=holding)
            recalculate_holding(holding)
            logger.info("Transaction created and holding recalculated: %s", serializer.data)
            return Response(TransactionSerializer(transaction).data, status=status.HTTP_201_CREATED)

        logger.warning("Transaction creation failed: %s", serializer.errors)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def update(self, request, *args, **kwargs):
        transaction = self.get_object()
        holding = transaction.holding

        # Update transaction data
        serializer = self.get_serializer(transaction, data=request.data, partial=True)
        serializer.is_valid(raise_exception=True)
        transaction = serializer.save()  # Save updated transaction

        # Recalculate holding based on all transactions
        recalculate_holding(holding)
        logger.info("Transaction updated and holding recalculated: %s", serializer.data)
        return Response(serializer.data, status=status.HTTP_200_OK)
    
    def destroy(self, request, *args, **kwargs):
        transaction = self.get_object()
        holding = transaction.holding

        # Delete transaction and recalculate holding
        transaction.delete()
        recalculate_holding(holding)
        logger.info("Transaction deleted and holding recalculated")
        return Response(status=status.HTTP_204_NO_CONTENT)
    
class PortfolioViewSet(viewsets.ModelViewSet):
    permission_classes = [IsAuthenticated]
    queryset = Portfolio.objects.all()
    serializer_class = PortfolioSerializer
    
class HoldingViewSet(viewsets.ModelViewSet):
    permission_classes = [IsAuthenticated]
    queryset = Holding.objects.all()
    serializer_class = HoldingSerializer
    
@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_profit_history(request):
    def calculate_profit_history(user, symbol=None, start_date=None, end_date=None):
        # 获取用户的交易记录和历史价格
        transactions = Transaction.objects.filter(holding__portfolio__user=user)
        if symbol:
            transactions = transactions.filter(holding__symbol=symbol)
        if start_date and end_date:
            transactions = transactions.filter(trade_date__range=[start_date, end_date])

        # 获取相关的历史价格
        symbols = transactions.values_list('holding__symbol', flat=True).distinct()
        price_history = PriceHistory.objects.filter(
            asset__symbol__in=symbols,
            date__range=[start_date, end_date]
        ).order_by('date')

        # 初始化变量
        daily_holdings = {symbol: {'shares': 0, 'total_cost': 0} for symbol in symbols}
        profit_history = []

        # 按日期排序的交易和价格
        transactions = transactions.order_by('trade_date')
        date_range = price_history.values_list('date', flat=True).distinct()

        for date in date_range:
            # 按日期应用交易，更新持仓状态
            for transaction in transactions.filter(trade_date=date):
                symbol = transaction.holding.symbol
                if transaction.action == 'BUY':
                    daily_holdings[symbol]['shares'] += transaction.shares
                    daily_holdings[symbol]['total_cost'] += transaction.shares * transaction.price
                elif transaction.action == 'SELL':
                    daily_holdings[symbol]['shares'] -= transaction.shares
                    # 按成本比例减少总成本
                    avg_cost = daily_holdings[symbol]['total_cost'] / daily_holdings[symbol]['shares']
                    daily_holdings[symbol]['total_cost'] -= transaction.shares * avg_cost

            # 计算当天的总市值和收益
            total_value = 0
            total_cost = 0
            for symbol, holding in daily_holdings.items():
                shares = holding['shares']
                cost = holding['total_cost']
                price_data = price_history.filter(asset__symbol=symbol, date=date).first()
                if shares > 0 and price_data:
                    total_value += shares * price_data.close_price
                    total_cost += cost

            profit_history.append({
                'date': date,
                'total_value': total_value,
                'profit': total_value - total_cost
            })

        return profit_history

    """
    Get the profit history of a user's holdings.
    Supports filtering by time range and specific asset.
    """
    user = request.user
    start_date = request.query_params.get('start_date')
    end_date = request.query_params.get('end_date')
    symbol = request.query_params.get('symbol')

    # Default to query the last 30 days of data
    if not start_date:
        start_date = (now() - timedelta(days=30)).date()
    if not end_date:
        end_date = now().date()

    # # Get the user's portfolios
    # portfolios = Portfolio.objects.filter(user=user)
    # holdings = Holding.objects.filter(portfolio__in=portfolios)

    # if symbol:
    #     holdings = holdings.filter(symbol=symbol)

    # # Get historical price data
    # symbols = holdings.values_list('symbol', flat=True)
    # price_history = PriceHistory.objects.filter(
    #     asset__symbol__in=symbols,
    #     date__range=[start_date, end_date]
    # ).order_by('date')

    # # Build profit history data
    # profit_history = []
    # for date in price_history.values_list('date', flat=True).distinct():
    #     total_value = 0
    #     total_cost = 0

    #     for holding in holdings:
    #         daily_price = price_history.filter(asset__symbol=holding.symbol, date=date).first()
    #         if daily_price:
    #             total_value += holding.shares * daily_price.close_price
    #             total_cost += holding.cost_basis * holding.shares

    #     profit_history.append({
    #         'date': date,
    #         'total_value': total_value,
    #         'profit': total_value - total_cost,
    #     })
    profit_history = calculate_profit_history(
        user=user,
        symbol=symbol,
        start_date=start_date,
        end_date=end_date
    )
    
    
    return Response(profit_history, status=200)