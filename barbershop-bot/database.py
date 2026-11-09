import aiosqlite
from config import DATABASE_PATH

async def init_db():
    async with aiosqlite.connect(DATABASE_PATH) as db:
        await db.execute("""
            CREATE TABLE IF NOT EXISTS users (
                user_id INTEGER PRIMARY KEY,
                username TEXT,
                full_name TEXT,
                phone TEXT,
                language TEXT DEFAULT 'en',
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            )
        """)
        await db.execute("""
            CREATE TABLE IF NOT EXISTS services (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                name_en TEXT NOT NULL,
                name_am TEXT NOT NULL,
                price INTEGER NOT NULL,
                duration_mins INTEGER NOT NULL,
                description_en TEXT,
                description_am TEXT
            )
        """)
        await db.execute("""
            CREATE TABLE IF NOT EXISTS barbers (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                name TEXT NOT NULL,
                specialty_en TEXT,
                specialty_am TEXT,
                is_active INTEGER DEFAULT 1
            )
        """)
        await db.execute("""
            CREATE TABLE IF NOT EXISTS appointments (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                user_id INTEGER NOT NULL,
                customer_name TEXT,
                customer_phone TEXT,
                service_id INTEGER NOT NULL,
                barber_id INTEGER NOT NULL,
                booking_date TEXT NOT NULL,
                time_slot TEXT NOT NULL,
                payment_method TEXT NOT NULL,
                payment_ref TEXT,
                status TEXT DEFAULT 'pending',
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                FOREIGN KEY (user_id) REFERENCES users (user_id),
                FOREIGN KEY (service_id) REFERENCES services (id),
                FOREIGN KEY (barber_id) REFERENCES barbers (id)
            )
        """)

        # Seed initial services if table is empty
        cursor = await db.execute("SELECT COUNT(*) FROM services")
        count = (await cursor.fetchone())[0]
        if count == 0:
            services = [
                ("Classic Haircut / Fade", "የጸጉር መቁረጥ / ፌድ", 250, 30, "Modern fades, scissor work, & razor finish", "ዘመናዊ የጸጉር ስታይል እና ማስተካከል"),
                ("Beard Trim & Hot Towel Shave", "የጢም ማስተካከልና ሙቅ ፎጣ ሻቨር", 150, 20, "Beard shaping, oil treatment & razor lineup", "የጢም ቅርጽ ማውጣትና የዘይት እንክብካቤ"),
                ("Haircut + Beard Styling Combo", "የጸጉር እና የጢም ጥምር ጥቅል", 350, 45, "Full head and beard grooming package", "ሙሉ የጸጉር እና የጢም ማስተካከል"),
                ("Facial Scrub & Black Mask", "የፊት እስክራብና ብላክ ማስክ", 300, 30, "Deep pore cleansing, steam & facial massage", "የፊት ቆዳ ጥልቅ ጽዳትና ማሳጅ"),
                ("Hair Color & Dye", "የጸጉር ቀለም መቀባት", 400, 40, "Grey coverage or full vibrant color", "የጸጉር ቀለም እና ዳይ አገልግሎት"),
                ("VIP Grooming Executive Package", "ቪአይፒ ሙሉ የክብር ጥቅል", 750, 75, "Haircut, beard, facial scrub, wash & massage", "ጸጉር፣ ጢም፣ የፊት እስክራብ እና ሙሉ ማሳጅ"),
            ]
            await db.executemany("""
                INSERT INTO services (name_en, name_am, price, duration_mins, description_en, description_am)
                VALUES (?, ?, ?, ?, ?, ?)
            """, services)

        # Seed initial barbers if empty
        cursor = await db.execute("SELECT COUNT(*) FROM barbers")
        barber_count = (await cursor.fetchone())[0]
        if barber_count == 0:
            barbers = [
                ("Abel", "Master Barber • Modern Fades & Tapers", "ዋና ጸጉር አስተካካይ • ዘመናዊ ፌድ"),
                ("Dawit", "Classic Haircuts & Beard Sculpting", "ክላሲክ የጸጉር ቁረጥና የጢም ባለሙያ"),
                ("Natnael", "Creative Styling & Kids Cuts", "የፈጠራ ስታይልና የህጻናት ጸጉር"),
            ]
            await db.executemany("""
                INSERT INTO barbers (name, specialty_en, specialty_am)
                VALUES (?, ?, ?)
            """, barbers)

        await db.commit()

async def get_user_language(user_id: int) -> str:
    async with aiosqlite.connect(DATABASE_PATH) as db:
        cursor = await db.execute("SELECT language FROM users WHERE user_id = ?", (user_id,))
        row = await cursor.fetchone()
        return row[0] if row else "en"

async def set_user_language(user_id: int, lang: str):
    async with aiosqlite.connect(DATABASE_PATH) as db:
        await db.execute("""
            INSERT INTO users (user_id, language) VALUES (?, ?)
            ON CONFLICT(user_id) DO UPDATE SET language = excluded.language
        """, (user_id, lang))
        await db.commit()

async def get_all_services():
    async with aiosqlite.connect(DATABASE_PATH) as db:
        db.row_factory = aiosqlite.Row
        cursor = await db.execute("SELECT * FROM services ORDER BY price ASC")
        return await cursor.fetchall()

async def get_service_by_id(service_id: int):
    async with aiosqlite.connect(DATABASE_PATH) as db:
        db.row_factory = aiosqlite.Row
        cursor = await db.execute("SELECT * FROM services WHERE id = ?", (service_id,))
        return await cursor.fetchone()

async def get_all_barbers():
    async with aiosqlite.connect(DATABASE_PATH) as db:
        db.row_factory = aiosqlite.Row
        cursor = await db.execute("SELECT * FROM barbers WHERE is_active = 1")
        return await cursor.fetchall()

async def get_barber_by_id(barber_id: int):
    async with aiosqlite.connect(DATABASE_PATH) as db:
        db.row_factory = aiosqlite.Row
        cursor = await db.execute("SELECT * FROM barbers WHERE id = ?", (barber_id,))
        return await cursor.fetchone()

async def create_appointment(user_id, customer_name, customer_phone, service_id, barber_id, date, slot, payment_method, payment_ref=None):
    async with aiosqlite.connect(DATABASE_PATH) as db:
        cursor = await db.execute("""
            INSERT INTO appointments (user_id, customer_name, customer_phone, service_id, barber_id, booking_date, time_slot, payment_method, payment_ref, status)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, 'pending')
        """, (user_id, customer_name, customer_phone, service_id, barber_id, date, slot, payment_method, payment_ref))
        await db.commit()
        return cursor.lastrowid

async def get_user_appointments(user_id: int):
    async with aiosqlite.connect(DATABASE_PATH) as db:
        db.row_factory = aiosqlite.Row
        cursor = await db.execute("""
            SELECT a.*, s.name_en, s.name_am, s.price, b.name as barber_name
            FROM appointments a
            JOIN services s ON a.service_id = s.id
            JOIN barbers b ON a.barber_id = b.id
            WHERE a.user_id = ?
            ORDER BY a.id DESC
            LIMIT 5
        """, (user_id,))
        return await cursor.fetchall()

async def get_daily_appointments(date_str: str):
    async with aiosqlite.connect(DATABASE_PATH) as db:
        db.row_factory = aiosqlite.Row
        cursor = await db.execute("""
            SELECT a.*, s.name_en, s.name_am, s.price, b.name as barber_name
            FROM appointments a
            JOIN services s ON a.service_id = s.id
            JOIN barbers b ON a.barber_id = b.id
            WHERE a.booking_date = ?
            ORDER BY a.time_slot ASC
        """, (date_str,))
        return await cursor.fetchall()

async def update_appointment_status(appointment_id: int, status: str):
    async with aiosqlite.connect(DATABASE_PATH) as db:
        await db.execute("UPDATE appointments SET status = ? WHERE id = ?", (status, appointment_id))
        await db.commit()

async def cancel_appointment(appointment_id: int, user_id: int) -> bool:
    async with aiosqlite.connect(DATABASE_PATH) as db:
        cursor = await db.execute("""
            UPDATE appointments SET status = 'cancelled'
            WHERE id = ? AND user_id = ? AND status = 'pending'
        """, (appointment_id, user_id))
        await db.commit()
        return cursor.rowcount > 0

async def get_all_user_ids():
    async with aiosqlite.connect(DATABASE_PATH) as db:
        cursor = await db.execute("SELECT DISTINCT user_id FROM users")
        rows = await cursor.fetchall()
        return [r[0] for r in rows]
