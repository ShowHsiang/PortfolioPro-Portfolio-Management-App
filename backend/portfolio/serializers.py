from rest_framework import serializers
from .models import Portfolio, Holding, Transaction


class TransactionSerializer(serializers.ModelSerializer):
    symbol = serializers.CharField(source='holding.symbol', read_only=True)
    class Meta:
        model = Transaction
        fields = ['id', 'trade_date', 'shares', 'price', 'action', 'holding', 'symbol']
        extra_kwargs = {
            'holding': {'read_only': True}
        }

class HoldingSerializer(serializers.ModelSerializer):
    transactions = TransactionSerializer(many=True, read_only=True)

    class Meta:
        model = Holding
        fields = ['id', 'symbol', 'shares', 'cost_basis', 'market_value', 'transactions']

class PortfolioSerializer(serializers.ModelSerializer):
    holdings = HoldingSerializer(many=True, read_only=True)

    class Meta:
        model = Portfolio
        fields = ['id', 'name', 'created_at', 'holdings']