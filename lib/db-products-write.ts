import { db } from "./db";
import { Product } from "./db-queries-types";
import { ensureTables } from "./db-init";

export async function createProduct(
  product: Omit<Product, "id" | "created_at" | "updated_at">
): Promise<number> {
  if (process.env.NODE_ENV === "production") {
    await ensureTables();
    const { sql } = await import("@vercel/postgres");
    const result = await sql`
      INSERT INTO products (
        name, slug, category_id, description, min_order, 
        price_range, images, cover_image, is_active, display_order
      )
      VALUES (
        ${product.name}, ${product.slug}, ${product.category_id}, 
        ${product.description}, ${product.min_order}, ${product.price_range}, 
        ${product.images}, ${product.cover_image}, ${product.is_active}, 
        ${product.display_order}
      )
      RETURNING id
    `;
    return result.rows[0].id as number;
  }

  const stmt = db.prepare(`
    INSERT INTO products (
      name, slug, category_id, description, min_order, 
      price_range, images, cover_image, is_active, display_order
    )
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `);

  const result = stmt.run(
    product.name,
    product.slug,
    product.category_id,
    product.description,
    product.min_order,
    product.price_range,
    product.images,
    product.cover_image,
    product.is_active,
    product.display_order
  );

  return result.lastInsertRowid as number;
}

export async function updateProduct(
  id: number,
  product: Partial<Omit<Product, "id" | "created_at" | "updated_at">>
): Promise<boolean> {
  if (process.env.NODE_ENV === "production") {
    await ensureTables();
    const { db: vercelDb } = await import("@vercel/postgres");
    const client = await vercelDb.connect();
    
    const sets: string[] = [];
    const params: any[] = [];
    
    Object.entries(product).forEach(([key, value]) => {
      params.push(value);
      sets.push(`${key} = $${params.length}`);
    });
    
    if (sets.length === 0) {
      client.release();
      return false;
    }
    
    sets.push("updated_at = CURRENT_TIMESTAMP");
    params.push(id);
    const query = `
      UPDATE products
      SET ${sets.join(", ")}
      WHERE id = $${params.length}
    `;
    
    const result = await client.query(query, params);
    client.release();
    return (result.rowCount ?? 0) > 0;
  }

  const sets: string[] = [];
  const params: any[] = [];

  Object.entries(product).forEach(([key, value]) => {
    sets.push(`${key} = ?`);
    params.push(value);
  });

  if (sets.length === 0) return false;

  sets.push("updated_at = CURRENT_TIMESTAMP");
  params.push(id);

  const stmt = db.prepare(`
    UPDATE products
    SET ${sets.join(", ")}
    WHERE id = ?
  `);

  const result = stmt.run(...params);
  return result.changes > 0;
}

export async function deleteProduct(id: number): Promise<boolean> {
  if (process.env.NODE_ENV === "production") {
    await ensureTables();
    const { sql } = await import("@vercel/postgres");
    const result = await sql`DELETE FROM products WHERE id = ${id}`;
    return (result.rowCount ?? 0) > 0;
  }

  const stmt = db.prepare("DELETE FROM products WHERE id = ?");
  const result = stmt.run(id);
  return result.changes > 0;
}
