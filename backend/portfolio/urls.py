from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import PortfolioViewSet, HoldingViewSet, TransactionViewSet
from .views import get_profit_history


router = DefaultRouter()
router.register(r'portfolios', PortfolioViewSet)
router.register(r'holdings', HoldingViewSet)
router.register(r'transactions', TransactionViewSet)

urlpatterns = [
    path('', include(router.urls)),
    path('profit-history/', get_profit_history, name='profit-history'),
]