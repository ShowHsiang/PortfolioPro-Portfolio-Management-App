from django.contrib import admin

# Register your models here.
from .models import Portfolio, Holding

admin.site.register(Portfolio)
admin.site.register(Holding)
