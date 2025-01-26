from django.contrib import admin
from .models import WatchlistItem, Asset, PriceHistory

admin.site.register(WatchlistItem)
admin.site.register(Asset)
admin.site.register(PriceHistory)