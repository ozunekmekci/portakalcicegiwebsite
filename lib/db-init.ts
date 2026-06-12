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

    // Seed initial products if empty
    const prodCountRes = await sql`SELECT COUNT(*) as count FROM products`;
    const prodCount = parseInt(prodCountRes.rows[0].count);
    if (prodCount === 0) {
      // Düğün & Nişan = 1, Babyshower = 2
      await sql`
        INSERT INTO products (
          name, slug, category_id, description, min_order, 
          price_range, images, cover_image, is_active, display_order
        ) 
        VALUES (
          'Bulut Bebek Seti', 
          'bulut-bebek-seti', 
          2, 
          'Pastel tonlarda 3D akrilik bulut figürlü baby shower seti.', 
          100, 
          '₺850 - ₺1.200', 
          '[]', 
          null, 
          1, 
          1
        )
      `;
      await sql`
        INSERT INTO products (
          name, slug, category_id, description, min_order, 
          price_range, images, cover_image, is_active, display_order
        ) 
        VALUES (
          'Çiçek Bebek Seti', 
          'cicek-bebek-seti', 
          2, 
          'Portakal çiçeği motifli, modern tasarım baby shower hediyeliği.', 
          100, 
          '₺950 - ₺1.400', 
          '[]', 
          null, 
          1, 
          2
        )
      `;
      await sql`
        INSERT INTO products (
          name, slug, category_id, description, min_order, 
          price_range, images, cover_image, is_active, display_order
        ) 
        VALUES (
          'Zarif Çiçekler Seti', 
          'zarif-cicekler-seti', 
          1, 
          'Düğün ve nişan için zarif çiçek detaylı akrilik hediyelikler. Modern çiftler için özel tasarlanmış, isim ve tarih işlemeli premium nikah hatırası.', 
          100, 
          '₺1.100 - ₺1.600', 
          '[]', 
          null, 
          1, 
          1
        )
      `;
      console.log("Başlangıç ürünleri Postgres veritabanına eklendi.");
    }
  }
  isInitialized = true;
}
