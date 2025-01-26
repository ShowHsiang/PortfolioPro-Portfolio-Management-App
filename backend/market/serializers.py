from rest_framework import serializers
from .models import Asset, PriceHistory, WatchlistItem

class AssetSerializer(serializers.ModelSerializer):
    class Meta:
        model = Asset
        fields = ['id', 'symbol', 'name', 'logo_url', 'market_type', 'last_refreshed']

class PriceHistorySerializer(serializers.ModelSerializer):
    class Meta:
        model = PriceHistory
        fields = ['date', 'open_price', 'close_price', 'high_price', 'low_price', 'volume', 'price', 'change_24h', 'market_cap']

class WatchlistSerializer(serializers.ModelSerializer):
    user = serializers.StringRelatedField(read_only=True)
    class Meta:
        model = WatchlistItem
        fields = ['id', 'user', 'symbol', 'added_at']
        read_only_fields = ['id', 'user', 'added_at']