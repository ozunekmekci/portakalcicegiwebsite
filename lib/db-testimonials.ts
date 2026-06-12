import { db } from "./db";
import { Testimonial } from "./db-queries-types";
import { ensureTables } from "./db-init";

export async function getTestimonials(options: { onlyActive?: boolean } = {}): Promise<Testimonial[]> {
  const { onlyActive = false } = options;
  
  if (process.env.NODE_ENV === "production") {
    await ensureTables();
    const { sql } = await import("@vercel/postgres");
    
    if (onlyActive) {
      const { rows } = await sql`SELECT * FROM testimonials WHERE is_active = 1 ORDER BY display_order ASC, created_at DESC`;
      return rows as Testimonial[];
    } else {
      const { rows } = await sql`SELECT * FROM testimonials ORDER BY display_order ASC, created_at DESC`;
      return rows as Testimonial[];
    }
  }

  // SQLite
  let query = "SELECT * FROM testimonials";
  if (onlyActive) {
    query += " WHERE is_active = 1";
  }
  query += " ORDER BY display_order ASC, created_at DESC";
  
  const stmt = db.prepare(query);
  return stmt.all() as Testimonial[];
}

export async function getTestimonialById(id: number): Promise<Testimonial | null> {
  if (process.env.NODE_ENV === "production") {
    await ensureTables();
    const { sql } = await import("@vercel/postgres");
    const { rows } = await sql`SELECT * FROM testimonials WHERE id = ${id} LIMIT 1`;
    return (rows[0] as Testimonial) || null;
  }

  const stmt = db.prepare("SELECT * FROM testimonials WHERE id = ? LIMIT 1");
  const row = stmt.get(id);
  return (row as Testimonial) || null;
}

export async function createTestimonial(
  testimonial: Omit<Testimonial, "id" | "created_at">
): Promise<number> {
  if (process.env.NODE_ENV === "production") {
    await ensureTables();
    const { sql } = await import("@vercel/postgres");
    const result = await sql`
      INSERT INTO testimonials (name, text, avatar, display_order, is_active)
      VALUES (${testimonial.name}, ${testimonial.text}, ${testimonial.avatar}, ${testimonial.display_order}, ${testimonial.is_active})
      RETURNING id
    `;
    return result.rows[0].id as number;
  }

  const stmt = db.prepare(`
    INSERT INTO testimonials (name, text, avatar, display_order, is_active)
    VALUES (?, ?, ?, ?, ?)
  `);
  const result = stmt.run(
    testimonial.name,
    testimonial.text,
    testimonial.avatar,
    testimonial.display_order,
    testimonial.is_active
  );
  return result.lastInsertRowid as number;
}

export async function updateTestimonial(
  id: number,
  testimonial: Partial<Omit<Testimonial, "id" | "created_at">>
): Promise<boolean> {
  if (process.env.NODE_ENV === "production") {
    await ensureTables();
    const { db: vercelDb } = await import("@vercel/postgres");
    const client = await vercelDb.connect();
    
    const sets: string[] = [];
    const params: any[] = [];
    
    Object.entries(testimonial).forEach(([key, value]) => {
      params.push(value);
      sets.push(`${key} = $${params.length}`);
    });
    
    if (sets.length === 0) {
      client.release();
      return false;
    }
    
    params.push(id);
    const query = `
      UPDATE testimonials
      SET ${sets.join(", ")}
      WHERE id = $${params.length}
    `;
    
    const result = await client.query(query, params);
    client.release();
    return (result.rowCount ?? 0) > 0;
  }

  const sets: string[] = [];
  const params: any[] = [];

  Object.entries(testimonial).forEach(([key, value]) => {
    sets.push(`${key} = ?`);
    params.push(value);
  });

  if (sets.length === 0) return false;

  params.push(id);

  const stmt = db.prepare(`
    UPDATE testimonials
    SET ${sets.join(", ")}
    WHERE id = ?
  `);

  const result = stmt.run(...params);
  return result.changes > 0;
}

export async function deleteTestimonial(id: number): Promise<boolean> {
  if (process.env.NODE_ENV === "production") {
    await ensureTables();
    const { sql } = await import("@vercel/postgres");
    const result = await sql`DELETE FROM testimonials WHERE id = ${id}`;
    return (result.rowCount ?? 0) > 0;
  }

  const stmt = db.prepare("DELETE FROM testimonials WHERE id = ?");
  const result = stmt.run(id);
  return result.changes > 0;
}
