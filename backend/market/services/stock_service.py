# services/stock_service.py
from .base_service import MarketService
import yfinance as yf
from ..models import PriceHistory, Asset
from datetime import datetime, timedelta

class StockService(MarketService):
    def get_current_data(self, asset):
        symbol = asset.symbol
        # Fetch stock data using yfinance
        stock = yf.Ticker(symbol)
        data = stock.history(period="1d")
        
        if not data.empty:
            latest_data = data.iloc[-1]
            return {
                'price': latest_data['Close'],
                'open': latest_data['Open'],
                'high': latest_data['High'],
                'low': latest_data['Low'],
                'volume': latest_data['Volume'],
                'date': latest_data.name.date()
            }
        return None

    def fetch_price_history(self, asset, period="1mo", interval="1d"):
        # Fetch historical price data with a specified period and interval
        symbol = asset.symbol
        if not symbol:
            raise ValueError("Symbol is required and cannot be None.")
        
        stock = yf.Ticker(symbol)
        history_data = stock.history(period=period, interval=interval)
        
        if not history_data.empty:
            asset, _ = Asset.objects.get_or_create(symbol=symbol.upper())
            history_records = {}
            last_close_price = None

            for date, row in history_data.iterrows():
                record_date = date.date()
                history_records[record_date] = {
                    'asset': asset,
                    'date': record_date,
                    'open_price': row['Open'],
                    'close_price': row['Close'],
                    'high_price': row['High'],
                    'low_price': row['Low'],
                    'volume': row['Volume'],
                    'price': row['Close'],
                    'change_24h': (row['Close'] - row['Open']) / row['Open'] * 100,
                    'market_cap': stock.info.get('marketCap', 0),
                }
                last_close_price = row['Close']
            # Fill missing weekend data
            start_date = min(history_records.keys())
            end_date = max(history_records.keys())
            current_date = start_date

            while current_date <= end_date:
                if current_date not in history_records and current_date.weekday() in [5, 6]:
                    # Fill weekend data
                    history_records[current_date] = {
                        'asset': asset,
                        'date': current_date,
                        'open_price': last_close_price,
                        'close_price': last_close_price,
                        'high_price': last_close_price,
                        'low_price': last_close_price,
                        'volume': 0,
                        'price': last_close_price,
                        'change_24h': 0,
                    }
                current_date += timedelta(days=1)

            # Insert data into the database
            PriceHistory.objects.bulk_create(
                [PriceHistory(**record) for record in history_records.values()],
                ignore_conflicts=True
            )