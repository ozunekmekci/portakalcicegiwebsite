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
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `;
    
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


  }
  isInitialized = true;
}
