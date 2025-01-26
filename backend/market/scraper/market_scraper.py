import requests
from bs4 import BeautifulSoup
from market.models import WorldIndex, TopGainer, TopLoser
from django.db import transaction
from django.utils.timezone import now

# Yahoo Finance URL and headers
YAHOO_FINANCE_URL = "https://finance.yahoo.com/markets/"
HEADERS = {
    "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/96.0.4664.110 Safari/537.36"
}

def fetch_page_content(url):
    """Fetch and parse the page content from Yahoo Finance."""
    response = requests.get(url, headers=HEADERS)
    if response.status_code != 200:
        raise Exception(f"Failed to fetch data from Yahoo Finance. Status code: {response.status_code}")
    return BeautifulSoup(response.text, "html.parser")

def fetch_world_indices(soup):
    """Extract world indices data."""
    carousel = soup.find("div", {"class": "scroll-carousel"})
    if not carousel:
        raise Exception("Unable to locate the world indices section.")
    
    indices = []
    regions = carousel.find_all("section", {"data-testid": "world-indices"})
    for region in regions:
        region_name = region.find("h3").text.strip()
        table = region.find("table", {"class": "markets-table"})
        if not table:
            continue
        rows = table.find("tbody").find_all("tr")
        for row in rows:
            symbol = row.find("a", {"data-testid": "table-cell-ticker"}).text.strip()
            price = float(row.find("fin-streamer", {"data-field": "regularMarketPrice"}).text.replace(",", ""))
            change = row.find("fin-streamer", {"data-field": "regularMarketChangePercent"}).text.strip()
            indices.append({
                "region": region_name,
                "symbol": symbol,
                "price": price,
                "change": change,
            })
    return indices

def fetch_tops(soup, section_id):
    """Extract top gainers or top losers."""
    stocks = []
    section = soup.find("li", {"data-id": section_id})
    if not section:
        print(f"Section with id {section_id} not found.")
        return stocks

    rows = section.find_all("li", class_="dock-item primary font-default yf-46ugf5 clickability hover hasSymbolOptions")
    if not rows:
        print(f"No rows found in the section {section_id}.")
        return stocks

    for row in rows:
        try:
            symbol = row.find("span", class_="symbol").text.strip()
            name = row.find("span", class_="longName")["title"].strip()
            price = float(row.find("fin-streamer", {"data-field": "regularMarketPrice"})["data-value"])
            change_percent = float(row.find("fin-streamer", {"data-field": "regularMarketChangePercent"})["data-value"])
            stocks.append({
                "symbol": symbol,
                "name": name,
                "price": price,
                "change_percent": f"{change_percent:.2f}%"
            })
        except Exception as e:
            print(f"Error parsing row: {e}")
    return stocks

def save_to_db(data, model):
    """Save data to the specified model."""
    with transaction.atomic():
        model.objects.all().delete()  # Clear old data
        for item in data:
            try:
                model.objects.create(**item)
            except Exception as e:
                print(f"Error saving item to {model.__name__}: {e}")

def scrape_and_save():
    """Main function to scrape and save data."""
    print("Starting scrape_and_save...")
    try:
        soup = fetch_page_content(YAHOO_FINANCE_URL)

        # Fetch data
        world_indices = fetch_world_indices(soup)
        print(f"World Indices: {world_indices}")
        top_gainers = fetch_tops(soup, "topGainers")
        print(f"Top Gainers: {top_gainers}")
        top_losers = fetch_tops(soup, "topLosers")
        print(f"Top Losers: {top_losers}")

        # Save to database
        save_to_db(world_indices, WorldIndex)
        save_to_db(top_gainers, TopGainer)
        save_to_db(top_losers, TopLoser)

        print("Data scraped and saved successfully.")
    except Exception as e:
        print(f"Error during scraping and saving: {e}")
