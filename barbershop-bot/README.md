# 💈 Barbershop Telegram Bot (Bilingual ETB / Telebirr)

A production-ready Telegram Bot built with **Python 3.10+ (aiogram 3.x)** and **SQLite** specifically designed for barbershops and grooming salons in the Ethiopian community.

---

## ✨ Features

- **🌐 Bilingual (አማርኛ & English)**: Full localization with 1-click language switching.
- **✂️ Service Menu with ETB Pricing**: Fade haircuts, beard sculpting, facial treatments, hair dye, VIP grooming combos.
- **👤 Barber Choice**: Pick a specific barber (Abel, Dawit, Natnael) or choose *Any Available Barber*.
- **📅 Smart Slot Scheduler**: Date & time slot picker with double-booking collision prevention.
- **📱 Telebirr Integration**: Direct payment flow (`+251 96 366 1680` - `ADDIS`) with transaction code verification, or in-shop cash.
- **👑 Owner / Admin Dashboard**:
  - `/today` — Hourly schedule of all bookings
  - 1-click inline button approval/decline of Telebirr payments
  - `/broadcast <msg>` — Send announcements to all registered clients
- **📋 Customer Profiles**: View active bookings, cancel/reschedule with 1 tap.

---

## 🚀 Quick Setup & Run

### 1. Install Requirements
```bash
cd barbershop-bot
python3 -m venv venv
source venv/bin/activate
pip install -r requirements.txt
```

### 2. Configure Environment
Copy `.env.example` to `.env` and insert your Telegram bot token from `@BotFather`:
```bash
cp .env.example .env
nano .env
```

### 3. Launch the Bot
```bash
python3 main.py
```
Database tables and default Ethiopian barbershop services will initialize automatically!
