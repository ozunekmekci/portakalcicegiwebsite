let isInitialized = false;

export async function ensureTables() {
  if (isInitialized) return;
  if (process.env.NODE_ENV === 'production') {
    const { sql } = await import("@vercel/postgres");
    
    // Create categories table
    await sql`
      CREATE TABLE IF NOT EXISTS categories (
        id SERIAL PRIMARY KEY,
        name TEXT NOT NULL,
        slug TEXT NOT NULL UNIQUE,
        emoji TEXT,
        description TEXT,
        display_order INTEGER DEFAULT 0,
        banner_image TEXT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `;
    
    // Create products table
    await sql`
      CREATE TABLE IF NOT EXISTS products (
        id SERIAL PRIMARY KEY,
        name TEXT NOT NULL,
        slug TEXT NOT NULL UNIQUE,
        category_id INTEGER NOT NULL REFERENCES categories(id) ON DELETE CASCADE,
        description TEXT,
        min_order INTEGER DEFAULT 1,
        price_range TEXT,
        images TEXT NOT NULL DEFAULT '[]',
        cover_image TEXT,
        is_active INTEGER DEFAULT 1,
        display_order INTEGER DEFAULT 0,
        view_count INTEGER DEFAULT 0,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `;

    // Create testimonials table
    await sql`
      CREATE TABLE IF NOT EXISTS testimonials (
        id SERIAL PRIMARY KEY,
        name TEXT NOT NULL,
        text TEXT NOT NULL,
        avatar TEXT,
        display_order INTEGER DEFAULT 0,
        is_active INTEGER DEFAULT 1,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `;

    // Create site_settings table
    await sql`
      CREATE TABLE IF NOT EXISTS site_settings (
        key TEXT PRIMARY KEY,
        value TEXT NOT NULL
      );
    `;

    // Column Migrations (ALTER TABLE)
    try {
      await sql`SELECT banner_image FROM categories LIMIT 1`;
    } catch (e) {
      try {
        await sql`ALTER TABLE categories ADD COLUMN banner_image TEXT`;
        console.log("Postgres categories table migrated: added banner_image column.");
      } catch (err) {
        console.error("Migration error Postgres (categories):", err);
      }
    }

    try {
      await sql`SELECT view_count FROM products LIMIT 1`;
    } catch (e) {
      try {
        await sql`ALTER TABLE products ADD COLUMN view_count INTEGER DEFAULT 0`;
        console.log("Postgres products table migrated: added view_count column.");
      } catch (err) {
        console.error("Migration error Postgres (products):", err);
      }
    }
    
    // Seed initial categories if empty
    const countRes = await sql`SELECT COUNT(*) as count FROM categories`;
    const count = parseInt(countRes.rows[0].count);
    if (count === 0) {
      await sql`INSERT INTO categories (name, slug, emoji, display_order) VALUES ('Düğün & Nişan', 'dugun-nisan', '💍', 1)`;
      await sql`INSERT INTO categories (name, slug, emoji, display_order) VALUES ('Babyshower', 'babyshower', '🍼', 2)`;
      await sql`INSERT INTO categories (name, slug, emoji, display_order) VALUES ('Diş Buğdayı', 'dis-bugdayi', '🌾', 3)`;
      await sql`INSERT INTO categories (name, slug, emoji, display_order) VALUES ('Doğum Günü', 'dogum-gunu', '🎂', 4)`;
      console.log("Başlangıç kategorileri Postgres veritabanına eklendi.");
    }

    // Seed default site settings if empty
    const settingsCountRes = await sql`SELECT COUNT(*) as count FROM site_settings`;
    const settingsCount = parseInt(settingsCountRes.rows[0].count);
    if (settingsCount === 0) {
      await sql`INSERT INTO site_settings (key, value) VALUES ('hero_badge', 'ÖZEL TASARIM • EL YAPIMI • HATIRLIK')`;
      await sql`INSERT INTO site_settings (key, value) VALUES ('hero_title', 'Her Kutlama,\nBir Sanat Eseri')`;
      await sql`INSERT INTO site_settings (key, value) VALUES ('hero_description', 'Doğum, baby shower, düğün ve nişanlarınız için\nözel tasarım, 3D akrilik hediyelikler.')`;
      await sql`INSERT INTO site_settings (key, value) VALUES ('about_badge', 'HAKKIMIZDA')`;
      await sql`INSERT INTO site_settings (key, value) VALUES ('about_title', 'Detaylar önemlidir.\nBiz buna inanıyoruz.')`;
      await sql`INSERT INTO site_settings (key, value) VALUES ('about_text_1', 'Portakal Çiçeği Atölye olarak her hediyeliği, saklanmaya değer bir hatıraya dönüştürmek için tasarlıyoruz. Jenerik, seri üretim seçeneklerin aksine, her tasarımımız özgün illüstrasyonlar ve çok katmanlı 3D akrilik işçilikle hayat buluyor.')`;
      await sql`INSERT INTO site_settings (key, value) VALUES ('about_text_2', 'Doğum, baby shower, düğün ve nişan gibi hayatın en özel anları için 100 adetten fazla siparişleri sanatsal kaliteden ödün vermeden teslim ediyoruz.')`;
      await sql`INSERT INTO site_settings (key, value) VALUES ('about_quote', 'Her hediyelik bir sanat eseri, her kutlama bir anı.')`;
      await sql`INSERT INTO site_settings (key, value) VALUES ('about_image', '')`;
      await sql`INSERT INTO site_settings (key, value) VALUES ('contact_phone', '')`;
      console.log("Başlangıç site ayarları Postgres veritabanına eklendi.");
    }


  }
  isInitialized = true;
}
