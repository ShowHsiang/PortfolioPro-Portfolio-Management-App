# Generated by Django 4.2 on 2024-11-26 14:27

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('market', '0006_worldindex_last_updated'),
    ]

    operations = [
        migrations.CreateModel(
            name='Sector',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('sector_name', models.CharField(max_length=255)),
                ('market_weight', models.CharField(max_length=10)),
                ('ytd_return', models.CharField(max_length=10)),
            ],
        ),
        migrations.CreateModel(
            name='TopGainer',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('symbol', models.CharField(max_length=10)),
                ('name', models.CharField(max_length=255)),
                ('price', models.DecimalField(decimal_places=2, max_digits=12)),
                ('change_percent', models.CharField(max_length=10)),
            ],
        ),
        migrations.CreateModel(
            name='TopLoser',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('symbol', models.CharField(max_length=10)),
                ('name', models.CharField(max_length=255)),
                ('price', models.DecimalField(decimal_places=2, max_digits=12)),
                ('change_percent', models.CharField(max_length=10)),
            ],
        ),
    ]
