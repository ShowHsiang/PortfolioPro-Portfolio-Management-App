# Generated by Django 4.2 on 2024-11-20 10:06

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('market', '0002_pricehistory_change_24h_pricehistory_market_cap_and_more'),
    ]

    operations = [
        migrations.AlterModelOptions(
            name='watchlistitem',
            options={'ordering': ['-added_at'], 'verbose_name': 'Watchlist Item', 'verbose_name_plural': 'Watchlist Items'},
        ),
        migrations.AlterField(
            model_name='watchlistitem',
            name='added_at',
            field=models.DateTimeField(auto_now_add=True, verbose_name='Added At'),
        ),
        migrations.AlterField(
            model_name='watchlistitem',
            name='symbol',
            field=models.CharField(max_length=10, verbose_name='Asset Symbol'),
        ),
        migrations.AlterField(
            model_name='watchlistitem',
            name='user',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='watchlist', to=settings.AUTH_USER_MODEL, verbose_name='User'),
        ),
        migrations.AlterUniqueTogether(
            name='watchlistitem',
            unique_together={('user', 'symbol')},
        ),
    ]
