from django.db import models
from users.models import User

class Portfolio(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    name = models.CharField(max_length=255)
    created_at = models.DateTimeField(auto_now_add=True)

class Holding(models.Model):
    portfolio = models.ForeignKey(Portfolio, related_name='holdings', on_delete=models.CASCADE)
    symbol = models.CharField(max_length=10)
    shares = models.IntegerField()  # Number of shares held
    cost_basis = models.DecimalField(max_digits=10, decimal_places=2)  # Cost basis per share
    market_value = models.DecimalField(max_digits=10, decimal_places=2)  # Set to cost_basis initially

    def __str__(self):
        return f"{self.symbol} - Shares: {self.shares}, Cost Basis: {self.cost_basis}, Market Value: {self.market_value}"

class Transaction(models.Model):
    holding = models.ForeignKey(Holding, related_name='transactions', on_delete=models.CASCADE)
    trade_date = models.DateField()
    shares = models.IntegerField()  # Number of shares bought or sold
    price = models.DecimalField(max_digits=10, decimal_places=2)  # Price per share
    action = models.CharField(max_length=4, choices=[('BUY', 'Buy'), ('SELL', 'Sell')])

    def __str__(self):
        return f"{self.action} - {self.shares} shares at {self.price} on {self.trade_date}"