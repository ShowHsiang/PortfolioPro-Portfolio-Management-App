from django.db import models
from users.models import User
from django.conf import settings
from django.utils.timezone import now


class Asset(models.Model):
    symbol = models.CharField(max_length=10, unique=True)
    name = models.CharField(max_length=255, unique=True )
    logo_url = models.URLField(blank=True, null=True)
    market_type = models.CharField(max_length=20)  
    last_refreshed = models.DateTimeField(auto_now=True) 

class PriceHistory(models.Model):
    asset = models.ForeignKey(Asset, on_delete=models.CASCADE, related_name='price_history')
    date = models.DateField()
    open_price = models.DecimalField(max_digits=10, decimal_places=2)
    close_price = models.DecimalField(max_digits=10, decimal_places=2)
    high_price = models.DecimalField(max_digits=10, decimal_places=2)
    low_price = models.DecimalField(max_digits=10, decimal_places=2)
    volume = models.BigIntegerField()
    price = models.DecimalField(max_digits=10, decimal_places=2, null=True, blank=True) 
    change_24h = models.DecimalField(max_digits=6, decimal_places=2, null=True, blank=True)     
    market_cap = models.BigIntegerField(null=True, blank=True)  

    class Meta:
        unique_together = ('asset', 'date') 
class WatchlistItem(models.Model):
    user = models.ForeignKey(
        settings.AUTH_USER_MODEL,  
        on_delete=models.CASCADE,
        related_name="watchlist",  
        verbose_name="User"
    )
    symbol = models.CharField(
        max_length=10,
        verbose_name="Asset Symbol"
    )
    added_at = models.DateTimeField(
        auto_now_add=True,
        verbose_name="Added At"
    )

    class Meta:
        unique_together = ('user', 'symbol')  
        ordering = ['-added_at']  
        verbose_name = "Watchlist Item"
        verbose_name_plural = "Watchlist Items"

    def __str__(self):
        return f"{self.user.username} - {self.symbol}"
class WorldIndex(models.Model):
    region = models.CharField(max_length=100)
    symbol = models.CharField(max_length=50)
    price = models.DecimalField(max_digits=12, decimal_places=2)
    change = models.CharField(max_length=20)  # Store as a string to keep percentage
    last_updated = models.DateTimeField(default=now)
    class Meta:
        unique_together = ('region', 'symbol')  # Ensure unique region-symbol pair

    def __str__(self):
        return f"{self.region} - {self.symbol}"

class TopGainer(models.Model):
    symbol = models.CharField(max_length=10)
    name = models.CharField(max_length=255)
    price = models.DecimalField(max_digits=12, decimal_places=2)
    change_percent = models.CharField(max_length=10)

    def __str__(self):
        return f"{self.symbol} ({self.name})"


class TopLoser(models.Model):
    symbol = models.CharField(max_length=10)
    name = models.CharField(max_length=255)
    price = models.DecimalField(max_digits=12, decimal_places=2)
    change_percent = models.CharField(max_length=10)

    def __str__(self):
        return f"{self.symbol} ({self.name})"

