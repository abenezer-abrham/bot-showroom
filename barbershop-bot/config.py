import os
from dotenv import load_dotenv

load_dotenv()

BOT_TOKEN = os.getenv("BOT_TOKEN", "PLACEHOLDER_TOKEN")
ADMIN_IDS = [
    int(x.strip())
    for x in os.getenv("ADMIN_IDS", "123456789").split(",")
    if x.strip().isdigit()
]

SHOP_NAME = os.getenv("SHOP_NAME", "Habesha Grooming Lounge")
SHOP_PHONE = os.getenv("SHOP_PHONE", "+251 90 421 6852")
SHOP_ALT_PHONE = os.getenv("SHOP_ALT_PHONE", "+251 96 366 1680")
SHOP_LOCATION = os.getenv("SHOP_LOCATION", "Bole Road, Near Edna Mall, Addis Ababa")

TELEBIRR_PHONE = os.getenv("TELEBIRR_PHONE", "+251 96 366 1680")
TELEBIRR_NAME = os.getenv("TELEBIRR_NAME", "ADDIS")

DATABASE_PATH = os.path.join(os.path.dirname(__file__), "barbershop.db")
