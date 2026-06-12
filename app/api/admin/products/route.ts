import { NextResponse } from "next/server";
import { getProducts, getProductBySlug, createProduct } from "@/lib/db-queries";

export const dynamic = "force-dynamic";
import { slugify } from "@/lib/utils";

/**
 * Benzersiz bir slug oluşturur.
 */
async function generateUniqueSlug(name: string): Promise<string> {
  const baseSlug = slugify(name) || "urun";
  let slug = baseSlug;
  let counter = 1;
  while (await getProductBySlug(slug)) {
    slug = `${baseSlug}-${counter}`;
    counter++;
  }
  return slug;
}

export async function GET() {
  try {
    const products = await getProducts({ onlyActive: false });
    return NextResponse.json(products);
  } catch (error) {
    console.error("GET products error:", error);
    return NextResponse.json(
      { error: "Ürünler listelenirken bir hata oluştu." },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const {
      name,
      category_id,
      description,
      min_order,
      price_range,
      images = [],
      is_active = 1,
      display_order = 0,
    } = body;

    if (!name || !category_id) {
      return NextResponse.json(
        { error: "Ürün adı ve kategori alanları zorunludur." },
        { status: 400 }
      );
    }

    const slug = await generateUniqueSlug(name);
    
    // İlk görseli kapak görseli olarak ayarla
    const cover_image = images.length > 0 ? images[0] : null;

    const productId = await createProduct({
      name,
      slug,
      category_id: Number(category_id),
      description: description || null,
      min_order: Number(min_order) || 1,
      price_range: price_range || null,
      images: JSON.stringify(images),
      cover_image,
      is_active: Number(is_active) ? 1 : 0,
      display_order: Number(display_order) || 0,
    });

    return NextResponse.json({ success: true, id: productId, slug });
  } catch (error) {
    console.error("POST product error:", error);
    return NextResponse.json(
      { error: "Ürün eklenirken bir hata oluştu." },
      { status: 500 }
    );
  }
}
