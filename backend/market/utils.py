from datetime import timedelta
from django.utils.timezone import now

REFRESH_INTERVAL = timedelta(hours=1) 

def should_refresh_data(last_refreshed):
    return (now() - last_refreshed) > REFRESH_INTERVAL
