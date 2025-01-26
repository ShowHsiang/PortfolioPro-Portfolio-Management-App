# urls.py
from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import AssetViewSet, MarketDataView, WatchlistViewSet
from . import views
from .views import check_and_update_world_indices, market_overview, chat_with_xai

router = DefaultRouter()
router.register(r'assets', AssetViewSet)
router.register(r'watchlist', WatchlistViewSet)

urlpatterns = [
    path('', include(router.urls)),
    path('<str:market>/<str:symbol>/', MarketDataView.as_view(), name='market-data'),
    path('check-update/', check_and_update_world_indices, name='check-update'),
    path('overview/', market_overview, name='market_overview'),
    path("chat-with-xai/", chat_with_xai, name="chat_with_xai"),

    # path('<str:market_type>/<str:symbol>/', views.AssetDetailView.as_view(), name='asset_detail'),

]
