# backend/market/services/__init__.py

from .stock_service import StockService
from .crypto_service import CryptoService

def get_market_service(market_type):
    if market_type == 'stock':
        return StockService()
    elif market_type == 'crypto':
        return CryptoService()
    else:
        return None