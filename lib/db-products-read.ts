import { db } from "./db";
import { ProductWithCategory } from "./db-queries-types";
import { ensureTables } from "./db-init";

interface GetProductsOptions {
  categorySlug?: string;
  onlyActive?: boolean;
  limit?: number;
}

function mapRow(row: any): ProductWithCategory {
  let parsedImages: string[] = [];
  try {
    parsedImages = typeof row.images === "string" ? JSON.parse(row.images || "[]") : (row.images || []);
  } catch {
    parsedImages = [];
  }
  const rest = { ...row };
  delete rest.images;
  return {
    ...rest,
    images: parsedImages,
  } as ProductWithCategory;
}

export async function getProducts(options: GetProductsOptions = {}): Promise<ProductWithCategory[]> {
  const { categorySlug, onlyActive = true, limit } = options;

  if (process.env.NODE_ENV === "production") {
    await ensureTables();
    const { db: vercelDb } = await import("@vercel/postgres");
    const client = await vercelDb.connect();
    
    let query = `
      SELECT p.*, c.name as category_name, c.slug as category_slug, c.emoji as category_emoji
      FROM products p
      JOIN categories c ON p.category_id = c.id
    `;
    const conditions: string[] = [];
    const params: any[] = [];
    
    if (onlyActive) conditions.push("p.is_active = 1");
    if (categorySlug) {
      params.push(categorySlug);
      conditions.push(`c.slug = $${params.length}`);
    }
    
    if (conditions.length > 0) query += " WHERE " + conditions.join(" AND ");
    query += " ORDER BY p.display_order ASC, p.created_at DESC";
    if (limit) {
      params.push(limit);
      query += ` LIMIT $${params.length}`;
    }
    
    const { rows } = await client.query(query, params);
    client.release();
    return rows.map(mapRow);
  }

  // SQLite Logic
  let query = `
    SELECT p.*, c.name as category_name, c.slug as category_slug, c.emoji as category_emoji
    FROM products p
    JOIN categories c ON p.category_id = c.id
  `;
  const conditions: string[] = [];
  const params: any[] = [];

  if (onlyActive) conditions.push("p.is_active = 1");
  if (categorySlug) {
    conditions.push("c.slug = ?");
    params.push(categorySlug);
  }

  if (conditions.length > 0) query += " WHERE " + conditions.join(" AND ");
  query += " ORDER BY p.display_order ASC, p.created_at DESC";
  if (limit) {
    query += " LIMIT ?";
    params.push(limit);
  }

  const stmt = db.prepare(query);
  const rows = stmt.all(...params) as any[];
  return rows.map(mapRow);
}

export async function getProductBySlug(slug: string): Promise<ProductWithCategory | null> {
  if (process.env.NODE_ENV === "production") {
    await ensureTables();
    const { sql } = await import("@vercel/postgres");
    const { rows } = await sql`
      SELECT p.*, c.name as category_name, c.slug as category_slug, c.emoji as category_emoji
      FROM products p
      JOIN categories c ON p.category_id = c.id
      WHERE p.slug = ${slug}
      LIMIT 1
    `;
    return rows[0] ? mapRow(rows[0]) : null;
  }

  const stmt = db.prepare(`
    SELECT p.*, c.name as category_name, c.slug as category_slug, c.emoji as category_emoji
    FROM products p
    JOIN categories c ON p.category_id = c.id
    WHERE p.slug = ?
    LIMIT 1
  `);
  const row = stmt.get(slug) as any;
  return row ? mapRow(row) : null;
}

export async function getProductById(id: number): Promise<ProductWithCategory | null> {
  if (process.env.NODE_ENV === "production") {
    await ensureTables();
    const { sql } = await import("@vercel/postgres");
    const { rows } = await sql`
      SELECT p.*, c.name as category_name, c.slug as category_slug, c.emoji as category_emoji
      FROM products p
      JOIN categories c ON p.category_id = c.id
      WHERE p.id = ${id}
      LIMIT 1
    `;
    return rows[0] ? mapRow(rows[0]) : null;
  }

  const stmt = db.prepare(`
    SELECT p.*, c.name as category_name, c.slug as category_slug, c.emoji as category_emoji
    FROM products p
    JOIN categories c ON p.category_id = c.id
    WHERE p.id = ?
    LIMIT 1
  `);
  const row = stmt.get(id) as any;
  return row ? mapRow(row) : null;
}
