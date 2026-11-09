import asyncio
import logging
import sys
from aiogram import Bot, Dispatcher
from aiogram.enums import ParseMode
from aiogram.client.default import DefaultBotProperties
import config
from database import init_db
from handlers import start, booking, profile, admin

logging.basicConfig(level=logging.INFO, format="%(asctime)s - %(levelname)s - %(name)s - %(message)s")
logger = logging.getLogger(__name__)

async def main():
    logger.info("Initializing database...")
    await init_db()
    
    if config.BOT_TOKEN == "PLACEHOLDER_TOKEN" or not config.BOT_TOKEN:
        logger.warning("BOT_TOKEN is not configured! Please configure BOT_TOKEN in .env file.")
        
    bot = Bot(
        token=config.BOT_TOKEN,
        default=DefaultBotProperties(parse_mode=ParseMode.MARKDOWN)
    )
    dp = Dispatcher()
    
    # Register routers in correct priority order
    dp.include_router(admin.router)
    dp.include_router(booking.router)
    dp.include_router(profile.router)
    dp.include_router(start.router)
    
    logger.info(f"Starting {config.SHOP_NAME} Telegram Bot...")
    try:
        await dp.start_polling(bot)
    finally:
        await bot.session.close()

if __name__ == "__main__":
    try:
        asyncio.run(main())
    except (KeyboardInterrupt, SystemExit):
        logger.info("Bot stopped.")
