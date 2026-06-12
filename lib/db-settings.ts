import { db } from "./db";
import { ensureTables } from "./db-init";

export async function getSettings(): Promise<Record<string, string>> {
  if (process.env.NODE_ENV === "production") {
    await ensureTables();
    const { sql } = await import("@vercel/postgres");
    const { rows } = await sql`SELECT * FROM site_settings`;
    
    const settingsMap: Record<string, string> = {};
    rows.forEach((row) => {
      settingsMap[row.key] = row.value;
    });
    return settingsMap;
  }

  // SQLite
  const stmt = db.prepare("SELECT * FROM site_settings");
  const rows = stmt.all() as { key: string; value: string }[];
  
  const settingsMap: Record<string, string> = {};
  rows.forEach((row) => {
    settingsMap[row.key] = row.value;
  });
  return settingsMap;
}

export async function saveSettings(settings: Record<string, string>): Promise<boolean> {
  if (process.env.NODE_ENV === "production") {
    await ensureTables();
    const { db: vercelDb } = await import("@vercel/postgres");
    const client = await vercelDb.connect();
    
    try {
      await client.query("BEGIN");
      for (const [key, value] of Object.entries(settings)) {
        await client.query(
          `INSERT INTO site_settings (key, value)
           VALUES ($1, $2)
           ON CONFLICT (key) DO UPDATE SET value = EXCLUDED.value`,
          [key, value]
        );
      }
      await client.query("COMMIT");
      client.release();
      return true;
    } catch (error) {
      await client.query("ROLLBACK");
      client.release();
      console.error("Postgres saveSettings error:", error);
      return false;
    }
  }

  // SQLite
  const stmt = db.prepare(`
    INSERT INTO site_settings (key, value)
    VALUES (?, ?)
    ON CONFLICT(key) DO UPDATE SET value = excluded.value
  `);
  
  const saveTransaction = db.transaction(() => {
    for (const [key, value] of Object.entries(settings)) {
      stmt.run(key, value);
    }
  });

  try {
    saveTransaction();
    return true;
  } catch (error) {
    console.error("SQLite saveSettings error:", error);
    return false;
  }
}
