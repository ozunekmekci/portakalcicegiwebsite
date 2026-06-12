import { db } from "./db";
import { Category } from "./db-queries-types";
import { ensureTables } from "./db-init";

/**
 * Tüm kategorileri sıralı şekilde getirir.
 */
export async function getCategories(): Promise<Category[]> {
  if (process.env.NODE_ENV === "production") {
    await ensureTables();
    const { sql } = await import("@vercel/postgres");
    const { rows } = await sql`SELECT * FROM categories ORDER BY display_order ASC`;
    return rows as Category[];
  }

  const stmt = db.prepare("SELECT * FROM categories ORDER BY display_order ASC");
  return stmt.all() as Category[];
}
