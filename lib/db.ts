declare global {
  // eslint-disable-next-line no-var
  var dbInstance: any;
}

let db: any = null;

if (process.env.NODE_ENV !== "production") {
  // eslint-disable-next-line
  const Database = require("better-sqlite3");
  const path = require("path");
  
  const dbPath = path.join(process.cwd(), "portakalcicegi.db");
  
  if (!global.dbInstance) {
    global.dbInstance = new Database(dbPath, { verbose: console.log });
    
    // SQLite pragmalarını etkinleştir
    global.dbInstance.pragma("foreign_keys = ON");
    global.dbInstance.pragma("journal_mode = WAL");
    
    // Veritabanı tablolarını ilklendir
    global.dbInstance.exec(`
      CREATE TABLE IF NOT EXISTS categories (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        slug TEXT NOT NULL UNIQUE,
        emoji TEXT,
        description TEXT,
        display_order INTEGER DEFAULT 0,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP
      );

      CREATE TABLE IF NOT EXISTS products (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        slug TEXT NOT NULL UNIQUE,
        category_id INTEGER NOT NULL,
        description TEXT,
        min_order INTEGER DEFAULT 1,
        price_range TEXT,
        images TEXT NOT NULL DEFAULT '[]',
        cover_image TEXT,
        is_active INTEGER DEFAULT 1,
        display_order INTEGER DEFAULT 0,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (category_id) REFERENCES categories(id) ON DELETE CASCADE
      );
    `);
    
    // Başlangıç kategorilerini ekle (eğer veritabanı boşsa)
    const categoryCount = global.dbInstance.prepare("SELECT COUNT(*) as count FROM categories").get() as { count: number };
    
    if (categoryCount.count === 0) {
      const insertCategory = global.dbInstance.prepare(`
        INSERT INTO categories (name, slug, emoji, display_order)
        VALUES (?, ?, ?, ?)
      `);
      
      const insertInitialCategories = global.dbInstance.transaction(() => {
        insertCategory.run('Düğün & Nişan', 'dugun-nisan', '💍', 1);
        insertCategory.run('Babyshower', 'babyshower', '🍼', 2);
        insertCategory.run('Diş Buğdayı', 'dis-bugdayi', '🌾', 3);
        insertCategory.run('Doğum Günü', 'dogum-gunu', '🎂', 4);
      });
      
      insertInitialCategories();
      console.log("Başlangıç kategorileri SQLite veritabanına eklendi.");
    }


  }
  db = global.dbInstance;
}

export { db };
