from abc import ABC, abstractmethod
from market.models import Asset, PriceHistory

class MarketService(ABC):
    @abstractmethod
    def fetch_price_history(self, asset: Asset):
        """Fetch historical price data for the given asset."""
        pass

    def update_price_history(self, asset: Asset):
        """Update the database with the latest historical price data for the asset."""
        data = self.fetch_price_history(asset)
        for record in data:
            PriceHistory.objects.update_or_create(
                asset=asset,
                date=record['date'],
                defaults={
                    'open_price': record['open'],
                    'close_price': record['close'],
                    'high_price': record['high'],
                    'low_price': record['low'],
                    'volume': record['volume']
                }
            )
