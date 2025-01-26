from .base_service import MarketService
from binance.client import Client
from pycoingecko import CoinGeckoAPI
from datetime import datetime, timedelta
from ..models import PriceHistory, Asset
import os
from dotenv import load_dotenv

# Load environment variables from .env file
load_dotenv()

class CryptoService(MarketService):
    def __init__(self):
        """
        Initialize Binance client and CoinGecko client using environment variables.
        """
        api_key = os.getenv("BINANCE_API_KEY")
        api_secret = os.getenv("BINANCE_API_SECRET")
        self.client = Client(api_key=api_key, api_secret=api_secret)
        self.cg = CoinGeckoAPI()
        self.symbol_to_id = self.get_symbol_to_id_mapping()

    def get_symbol_to_id_mapping(self):
        """
        Fetch and cache a mapping of base symbols to CoinGecko IDs.
        :return: A dictionary with symbols (e.g., 'BTC') as keys and CoinGecko IDs (e.g., 'bitcoin') as values.
        """
        try:
            coins_list = self.cg.get_coins_list()
            return {coin['symbol'].upper(): coin['id'] for coin in coins_list}
        except Exception as e:
            print(f"Error fetching CoinGecko coin list: {e}")
            return {}

    def get_coingecko_id(self, trading_pair):
        """
        Extract the base symbol from the trading pair (e.g., 'BTCUSDT') and get the CoinGecko ID.
        :param trading_pair: Binance trading pair symbol (e.g., 'BTCUSDT')
        :return: The corresponding CoinGecko ID (e.g., 'bitcoin') or None if not found.
        """
        try:
            base_symbol = trading_pair[:-4]  # Remove the last 4 characters (e.g., 'USDT', 'BUSD', etc.)
            return self.symbol_to_id.get(base_symbol.upper())
        except Exception as e:
            print(f"Error extracting CoinGecko ID for trading pair {trading_pair}: {e}")
            return None

    def get_current_data(self, asset):
        """
        Fetch the current price and market data for a specific trading pair.
        Automatically determine the CoinGecko ID based on the trading pair.

        :param symbol: The trading pair symbol (e.g., 'BTCUSDT')
        :return: A dictionary containing the latest price, open, high, low, volume, date, and market cap.
        """
        symbol = asset.symbol
        try:
            # Determine CoinGecko ID
            coingecko_id = self.get_coingecko_id(symbol)
            if not coingecko_id:
                print(f"CoinGecko ID not found for trading pair {symbol}")

            # Fetch current data from Binance
            ticker = self.client.get_ticker(symbol=symbol)
            current_data = {
                'price': float(ticker['lastPrice']),
                'open': float(ticker['openPrice']),
                'high': float(ticker['highPrice']),
                'low': float(ticker['lowPrice']),
                'volume': float(ticker['volume']),
                'date': datetime.utcfromtimestamp(int(ticker['closeTime']) / 1000).date(),
                'market_cap': None  # Default to None
            }

            # Fetch market cap from CoinGecko if ID is available
            if coingecko_id:
                market_cap = self.get_market_cap(coingecko_id)
                current_data['market_cap'] = market_cap

            return current_data
        except Exception as e:
            print(f"Error fetching current data for {symbol}: {e}")
            return None

    def fetch_price_history(self, asset, period="1mo", interval="1d", start_date=None, end_date=None):
        """
        Fetch historical price data for a specific cryptocurrency trading pair.

        :param symbol: The trading pair symbol (e.g., 'BTCUSDT')
        :param interval: The time interval for the data (e.g., '1m', '15m', '1h', '4h', '1d')
        :param start_date: The start date for fetching historical data in 'YYYY-MM-DD' format
        :param end_date: The end date for fetching historical data in 'YYYY-MM-DD' format
        """
        symbol = asset.symbol
        try:
            if start_date is None:
                start_date = (datetime.utcnow() - timedelta(days=30)).strftime('%Y-%m-%d')
            if end_date is None:
                end_date = datetime.utcnow().strftime('%Y-%m-%d')

            # Fetch historical kline (candlestick) data from Binance
            klines = self.client.get_historical_klines(
                symbol,
                interval,
                start_str=start_date,
                end_str=end_date
            )

            if klines:
                asset, _ = Asset.objects.get_or_create(symbol=symbol.upper())
                history_records = {}
                # Determine CoinGecko ID
                coingecko_id = self.get_coingecko_id(symbol)
                market_cap = self.get_market_cap(coingecko_id) if coingecko_id else None
                # Store fetched data in a dictionary with date as key
                for kline in klines:
                    date = datetime.utcfromtimestamp(kline[0] / 1000).date()
                    history_records[date] = {
                        'asset': asset,
                        'date': date,
                        'open_price': float(kline[1]),
                        'close_price': float(kline[4]),
                        'high_price': float(kline[2]),
                        'low_price': float(kline[3]),
                        'volume': float(kline[5]) * float(kline[4]),
                        'price': float(kline[4]),
                        'change_24h': ((float(kline[4]) - float(kline[1])) / float(kline[1])) * 100,
                        'market_cap': market_cap*float(kline[4]),
                    }
                # Fill missing weekend data
                start_date = datetime.strptime(start_date, '%Y-%m-%d').date()
                end_date = datetime.strptime(end_date, '%Y-%m-%d').date()
                current_date = start_date

                last_close_price = None
                while current_date <= end_date:
                    if current_date in history_records:
                        # Update last close price for weekdays
                        last_close_price = history_records[current_date]['close_price']
                    elif current_date.weekday() in [5, 6] and last_close_price is not None:
                        # Fill weekend data with last known close price
                        history_records[current_date] = {
                            'asset': asset,
                            'date': current_date,
                            'open_price': last_close_price,
                            'close_price': last_close_price,
                            'high_price': last_close_price,
                            'low_price': last_close_price,
                            'volume': 0,  # No volume on weekends
                            'price': last_close_price,
                            'change_24h': 0,  # No change on weekends
                        }
                    current_date += timedelta(days=1)
                # Insert data into the database
                PriceHistory.objects.bulk_create(
                    [PriceHistory(**record) for record in history_records.values()],
                    ignore_conflicts=True
                )
        except Exception as e:
            print(f"Error fetching historical data for {symbol}: {e}")

    def get_market_cap(self, coingecko_id):
        """
        Fetch the market cap of a cryptocurrency using the CoinGecko API.

        :param coingecko_id: The CoinGecko ID of the cryptocurrency (e.g., 'bitcoin' for BTC)
        :return: Market cap in USD or None if an error occurs.
        """
        try:
            data = self.cg.get_coin_market_chart_by_id(id=coingecko_id, vs_currency='usd', days=1)
            market_cap = data['market_caps'][0][1]
            return market_cap
        except Exception as e:
            print(f"Error fetching market cap for {coingecko_id}: {e}")
            return None
