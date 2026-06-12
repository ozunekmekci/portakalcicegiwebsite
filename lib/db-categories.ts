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

export async function getCategoryById(id: number): Promise<Category | null> {
  if (process.env.NODE_ENV === "production") {
    await ensureTables();
    const { sql } = await import("@vercel/postgres");
    const { rows } = await sql`SELECT * FROM categories WHERE id = ${id} LIMIT 1`;
    return (rows[0] as Category) || null;
  }

  const stmt = db.prepare("SELECT * FROM categories WHERE id = ? LIMIT 1");
  const row = stmt.get(id);
  return (row as Category) || null;
}

export async function getCategoryBySlug(slug: string): Promise<Category | null> {
  if (process.env.NODE_ENV === "production") {
    await ensureTables();
    const { sql } = await import("@vercel/postgres");
    const { rows } = await sql`SELECT * FROM categories WHERE slug = ${slug} LIMIT 1`;
    return (rows[0] as Category) || null;
  }

  const stmt = db.prepare("SELECT * FROM categories WHERE slug = ? LIMIT 1");
  const row = stmt.get(slug);
  return (row as Category) || null;
}

export async function createCategory(
  category: Omit<Category, "id" | "created_at">
): Promise<number> {
  if (process.env.NODE_ENV === "production") {
    await ensureTables();
    const { sql } = await import("@vercel/postgres");
    const result = await sql`
      INSERT INTO categories (name, slug, emoji, description, display_order, banner_image, image_type, image_url)
      VALUES (${category.name}, ${category.slug}, ${category.emoji}, ${category.description}, ${category.display_order}, ${category.banner_image}, ${category.image_type || 'emoji'}, ${category.image_url})
      RETURNING id
    `;
    return result.rows[0].id as number;
  }

  const stmt = db.prepare(`
    INSERT INTO categories (name, slug, emoji, description, display_order, banner_image, image_type, image_url)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?)
  `);
  const result = stmt.run(
    category.name,
    category.slug,
    category.emoji,
    category.description,
    category.display_order,
    category.banner_image,
    category.image_type || 'emoji',
    category.image_url
  );
  return result.lastInsertRowid as number;
}

export async function updateCategory(
  id: number,
  category: Partial<Omit<Category, "id" | "created_at">>
): Promise<boolean> {
  if (process.env.NODE_ENV === "production") {
    await ensureTables();
    const { db: vercelDb } = await import("@vercel/postgres");
    const client = await vercelDb.connect();
    
    const sets: string[] = [];
    const params: any[] = [];
    
    Object.entries(category).forEach(([key, value]) => {
      params.push(value);
      sets.push(`${key} = $${params.length}`);
    });
    
    if (sets.length === 0) {
      client.release();
      return false;
    }
    
    params.push(id);
    const query = `
      UPDATE categories
      SET ${sets.join(", ")}
      WHERE id = $${params.length}
    `;
    
    const result = await client.query(query, params);
    client.release();
    return (result.rowCount ?? 0) > 0;
  }

  const sets: string[] = [];
  const params: any[] = [];

  Object.entries(category).forEach(([key, value]) => {
    sets.push(`${key} = ?`);
    params.push(value);
  });

  if (sets.length === 0) return false;

  params.push(id);

  const stmt = db.prepare(`
    UPDATE categories
    SET ${sets.join(", ")}
    WHERE id = ?
  `);

  const result = stmt.run(...params);
  return result.changes > 0;
}

export async function deleteCategory(id: number): Promise<boolean> {
  if (process.env.NODE_ENV === "production") {
    await ensureTables();
    const { sql } = await import("@vercel/postgres");
    const result = await sql`DELETE FROM categories WHERE id = ${id}`;
    return (result.rowCount ?? 0) > 0;
  }

  const stmt = db.prepare("DELETE FROM categories WHERE id = ?");
  const result = stmt.run(id);
  return result.changes > 0;
}
