from rest_framework import viewsets, status
from rest_framework.views import APIView
from rest_framework.response import Response
from django.utils.timezone import now
from .models import Asset, PriceHistory, WatchlistItem
from .serializers import AssetSerializer, PriceHistorySerializer, WatchlistSerializer
from .services import StockService, CryptoService
from .utils import should_refresh_data
from .services import get_market_service
from rest_framework.permissions import IsAuthenticated, AllowAny
from datetime import datetime
from rest_framework.decorators import api_view, permission_classes
import logging
from datetime import timedelta
from .scraper.market_scraper import scrape_and_save
from .models import WorldIndex, TopGainer, TopLoser
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
import json
import os
import requests


logger = logging.getLogger(__name__)

class AssetViewSet(viewsets.ModelViewSet):
    queryset = Asset.objects.all()
    serializer_class = AssetSerializer

    def retrieve(self, request, *args, **kwargs):
        asset = self.get_object()
        if should_refresh_data(asset.last_refreshed):
            self.refresh_data(asset)
        return super().retrieve(request, *args, **kwargs)

    def refresh_data(self, asset):
        service = self.get_service_for_asset(asset)
        service.update_price_history(asset)

    def get_service_for_asset(self, asset):
        if asset.market_type == 'stock':
            return StockService()
        elif asset.market_type == 'crypto':
            return CryptoService()

class MarketDataView(APIView):
    """
    Fetch market data for a specific asset and market type.
    If the asset doesn't exist in the database, it attempts to fetch and store it.
    """

    def get(self, request, market, symbol):
        asset = Asset.objects.filter(market_type=market, symbol=symbol.upper()).first()
        if not asset:
            # Create a new asset record
            asset, _ = Asset.objects.get_or_create(
                symbol=symbol.upper(),
                defaults={
                    'market_type': market,
                    'name': symbol.upper()
                }
            )
            
            service = self.get_service_for_market(market)
            # Fetch historical data for the last 30 days
            service.fetch_price_history(asset, period="1mo", interval="1d")
            return Response({"error": "Asset not found"}, status=status.HTTP_404_NOT_FOUND)

        
        if request.query_params.get("history") == "true":
            start_date = request.query_params.get("start_date", (now() - timedelta(days=30)).date())
            end_date = request.query_params.get("end_date", now().date())

            price_history = PriceHistory.objects.filter(
                asset=asset,
                date__range=[start_date, end_date]
            ).order_by("date")

            if not price_history.exists():
                return Response({"error": "No price history available for this asset"}, status=404)

            history_data = [
                {
                    "date": record.date,
                    "open_price": record.open_price,
                    "high_price": record.high_price,
                    "low_price": record.low_price,
                    "close_price": record.close_price,
                    "volume": record.volume,
                }
                for record in price_history
            ]
            return Response(history_data, status=200)
        
        # load the appropriate service based on the market type
        latest_data = PriceHistory.objects.filter(asset=asset).order_by('-date').first()
        if not latest_data:
            # Fetch historical data for the last 30 days
            service = self.get_service_for_market(market)
            service.fetch_price_history(asset, period="1mo", interval="1d")
            latest_data = PriceHistory.objects.filter(asset=asset).order_by('-date').first()
        else:
            # Check if the current stored data is older than two days from the current time
            two_days_ago = datetime.now() - timedelta(days=2)
            logger.info(f'latest_data.date: {latest_data.date}, two_days_ago: {two_days_ago.date()}')
            if latest_data.date < two_days_ago.date():
                print('data is older than two days, refetching data from service')
                service = self.get_service_for_market(market)
                # Fetch historical data for the last 30 days
                service.fetch_price_history(asset, period="1mo", interval="1d")
                latest_data = PriceHistory.objects.filter(asset=asset).order_by('-date').first()
        # get historical data for the last 30 days
        historical_data = PriceHistory.objects.filter(asset=asset).order_by('-date')[:30] 
        historical_data_serialized = [
            {
                'date': record.date,
                'open_price': record.open_price,
                'close_price': record.close_price,
                'high_price': record.high_price,
                'low_price': record.low_price,
                'volume': record.volume,
            }
            for record in historical_data   
        ]
        
        # prepare the response data
        response_data = {
            'symbol': symbol,
            'price': latest_data.price,
            'change_24h': latest_data.change_24h,
            'volume': latest_data.volume,
            'market_cap': latest_data.market_cap,
            'historical_data': historical_data_serialized,
        }
        
        return Response(response_data, status=status.HTTP_200_OK)
    
    def get_service_for_market(self, market):
        if market == 'stock':
            return StockService()
        elif market == 'crypto':
            return CryptoService()
class AssetDetailView(APIView):
    def get(self, request, market_type, symbol):
        market_service = get_market_service(market_type)
        if not market_service:
            return Response({"error": "Market type not supported"}, status=status.HTTP_400_BAD_REQUEST)
        
        asset_data = market_service.get_current_data(symbol)
        if not asset_data:
            return Response({"error": "Asset data not found"}, status=status.HTTP_404_NOT_FOUND)
        
        return Response(asset_data, status=status.HTTP_200_OK)
    
class WatchlistViewSet(viewsets.ModelViewSet):
    permission_classes = [IsAuthenticated]
    queryset = WatchlistItem.objects.all()
    serializer_class = WatchlistSerializer

    def get_queryset(self):
        return self.queryset.filter(user=self.request.user)

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)
    
    def list(self, request):
        """
        List all watchlist items for the authenticated user.
        """
        items = WatchlistItem.objects.filter(user=request.user)
        serializer = WatchlistSerializer(items, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

    def create(self, request):
        """
        Add a new asset to the user's watchlist.
        """
        symbol = request.data.get('symbol', '').upper()
        if not symbol:
            return Response({'error': 'Symbol is required.'}, status=status.HTTP_400_BAD_REQUEST)

        # Check if the asset already exists in the user's watchlist
        if WatchlistItem.objects.filter(user=request.user, symbol=symbol).exists():
            return Response({'error': 'Asset already in watchlist.'}, status=status.HTTP_400_BAD_REQUEST)

        watchlist_item = WatchlistItem.objects.create(user=request.user, symbol=symbol)
        serializer = WatchlistSerializer(watchlist_item)
        return Response(serializer.data, status=status.HTTP_201_CREATED)

    def destroy(self, request, pk=None):
        """
        Remove an asset from the user's watchlist.
        """
        try:
            item = WatchlistItem.objects.get(user=request.user, pk=pk)
        except WatchlistItem.DoesNotExist:
            return Response({'error': 'Asset not found in watchlist.'}, status=status.HTTP_404_NOT_FOUND)

        item.delete()
        return Response({'message': f'Asset {item.symbol} removed from watchlist.'}, status=status.HTTP_204_NO_CONTENT)




@api_view(['GET'])
@permission_classes([AllowAny])
def check_and_update_world_indices(request):
    """
    check last updated time and update if necessary
    """
    last_updated = WorldIndex.objects.first().last_updated if WorldIndex.objects.exists() else None
    if not last_updated or now() - last_updated > timedelta(minutes=5):
        # if more than 5 minutes since last update, trigger update
        scrape_and_save()
        return Response({"status": "updated", "last_updated": now()})
    scrape_and_save()
    return Response({"status": "up-to-date", "last_updated": last_updated})

@api_view(['GET'])
@permission_classes([AllowAny])
def market_overview(request):
    try:
        world_indices = WorldIndex.objects.values('region', 'symbol', 'price', 'change')
        top_gainers = TopGainer.objects.values('symbol', 'name', 'price', 'change_percent')
        top_losers = TopLoser.objects.values('symbol', 'name', 'price', 'change_percent')

        return Response({
            'world_indices': list(world_indices),
            'top_gainers': list(top_gainers),
            'top_losers': list(top_losers),
        })
    except Exception as e:
        # print error log for debugging
        print(f"Error in market_overview view: {e}")
        return Response({'error': 'Internal Server Error'}, status=500)

@csrf_exempt
def chat_with_xai(request):
    if request.method == "POST":
        try:
            # get user input
            data = json.loads(request.body)
            user_message = data.get("message", "")
            
            # get XAI API key
            XAI_API_KEY = os.getenv("XAI_API_KEY")
            
            # define request headers and data
            url = "https://api.x.ai/v1/chat/completions"
            headers = {
                "Content-Type": "application/json",
                "Authorization": f"Bearer {XAI_API_KEY}"
            }
            payload = {
                "messages": [
                    {
                        "role": "system",
                        "content": "You name is ProfolioPro, an expert in portfolio management and finance. Answer questions concisely and informatively."
                    },
                    {
                        "role": "user",
                        "content": user_message
                    }
                ],
                "model": "grok-beta",
                "stream": False,
                "temperature": 0.7
            }

            # send request to XAI
            response = requests.post(url, json=payload, headers=headers)
            if response.status_code == 200:
                xai_response = response.json()
                message = xai_response["choices"][0]["message"]["content"]
                return JsonResponse({"response": message}, status=200)
            else:
                return JsonResponse({"error": response.text}, status=response.status_code)

        except Exception as e:
            return JsonResponse({"error": str(e)}, status=500)
    return JsonResponse({"error": "Invalid request method."}, status=405)