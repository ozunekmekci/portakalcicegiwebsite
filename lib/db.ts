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
        banner_image TEXT,
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
        view_count INTEGER DEFAULT 0,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (category_id) REFERENCES categories(id) ON DELETE CASCADE
      );

      CREATE TABLE IF NOT EXISTS testimonials (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        text TEXT NOT NULL,
        avatar TEXT,
        display_order INTEGER DEFAULT 0,
        is_active INTEGER DEFAULT 1,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP
      );

      CREATE TABLE IF NOT EXISTS site_settings (
        key TEXT PRIMARY KEY,
        value TEXT NOT NULL
      );
    `);

    // Kolon Göçleri (ALTER TABLE)
    try {
      global.dbInstance.prepare("SELECT banner_image FROM categories LIMIT 1").get();
    } catch (e) {
      try {
        global.dbInstance.exec("ALTER TABLE categories ADD COLUMN banner_image TEXT");
        console.log("SQLite categories table migrated: added banner_image column.");
      } catch (err) {
        console.error("Migration error (categories):", err);
      }
    }

    try {
      global.dbInstance.prepare("SELECT view_count FROM products LIMIT 1").get();
    } catch (e) {
      try {
        global.dbInstance.exec("ALTER TABLE products ADD COLUMN view_count INTEGER DEFAULT 0");
        console.log("SQLite products table migrated: added view_count column.");
      } catch (err) {
        console.error("Migration error (products):", err);
      }
    }
    
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

    // Başlangıç ayarlarını ekle (eğer boşsa)
    const settingsCount = global.dbInstance.prepare("SELECT COUNT(*) as count FROM site_settings").get() as { count: number };
    if (settingsCount.count === 0) {
      const insertSetting = global.dbInstance.prepare(`
        INSERT INTO site_settings (key, value) VALUES (?, ?)
      `);
      
      const seedSettings = global.dbInstance.transaction(() => {
        insertSetting.run("hero_badge", "ÖZEL TASARIM • EL YAPIMI • HATIRLIK");
        insertSetting.run("hero_title", "Her Kutlama,\nBir Sanat Eseri");
        insertSetting.run("hero_description", "Doğum, baby shower, düğün ve nişanlarınız için\nözel tasarım, 3D akrilik hediyelikler.");
        insertSetting.run("about_badge", "HAKKIMIZDA");
        insertSetting.run("about_title", "Detaylar önemlidir.\nBiz buna inanıyoruz.");
        insertSetting.run("about_text_1", "Portakal Çiçeği Atölye olarak her hediyeliği, saklanmaya değer bir hatıraya dönüştürmek için tasarlıyoruz. Jenerik, seri üretim seçeneklerin aksine, her tasarımımız özgün illüstrasyonlar ve çok katmanlı 3D akrilik işçilikle hayat buluyor.");
        insertSetting.run("about_text_2", "Doğum, baby shower, düğün ve nişan gibi hayatın en özel anları için 100 adetten fazla siparişleri sanatsal kaliteden ödün vermeden teslim ediyoruz.");
        insertSetting.run("about_quote", "Her hediyelik bir sanat eseri, her kutlama bir anı.");
        insertSetting.run("about_image", "");
        insertSetting.run("contact_phone", "");
      });
      
      seedSettings();
      console.log("Başlangıç site ayarları SQLite veritabanına eklendi.");
    }


  }
  db = global.dbInstance;
}

export { db };
