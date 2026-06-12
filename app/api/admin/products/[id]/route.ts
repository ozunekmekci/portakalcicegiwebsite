import { NextResponse } from "next/server";
import { updateProduct, deleteProduct, getProductById, getProductBySlug } from "@/lib/db-queries";

export const dynamic = "force-dynamic";
import { slugify } from "@/lib/utils";

/**
 * Güncelleme sırasında benzersiz bir slug oluşturur.
 */
async function generateUniqueSlug(name: string, currentId: number): Promise<string> {
  const baseSlug = slugify(name) || "urun";
  let slug = baseSlug;
  let counter = 1;
  while (true) {
    const existing = await getProductBySlug(slug);
    if (!existing || existing.id === currentId) {
      break;
    }
    slug = `${baseSlug}-${counter}`;
    counter++;
  }
  return slug;
}

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const id = Number(params.id);
    if (isNaN(id)) {
      return NextResponse.json({ error: "Geçersiz ürün kimliği." }, { status: 400 });
    }

    const product = await getProductById(id);
    if (!product) {
      return NextResponse.json({ error: "Ürün bulunamadı." }, { status: 404 });
    }

    return NextResponse.json(product);
  } catch (error) {
    console.error("GET product error:", error);
    return NextResponse.json(
      { error: "Ürün detayları alınırken bir hata oluştu." },
      { status: 500 }
    );
  }
}

export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const id = Number(params.id);
    if (isNaN(id)) {
      return NextResponse.json({ error: "Geçersiz ürün kimliği." }, { status: 400 });
    }

    const currentProduct = await getProductById(id);
    if (!currentProduct) {
      return NextResponse.json({ error: "Ürün bulunamadı." }, { status: 404 });
    }

    const body = await request.json();
    const updateData: any = {};

    // Sadece istek gövdesinde gönderilen alanları güncelle
    if (body.name !== undefined) {
      updateData.name = body.name;
      if (body.name !== currentProduct.name) {
        updateData.slug = await generateUniqueSlug(body.name, id);
      }
    }

    if (body.category_id !== undefined) updateData.category_id = Number(body.category_id);
    if (body.description !== undefined) updateData.description = body.description || null;
    if (body.min_order !== undefined) updateData.min_order = Number(body.min_order);
    if (body.price_range !== undefined) updateData.price_range = body.price_range || null;
    
    if (body.images !== undefined) {
      updateData.images = JSON.stringify(body.images);
      updateData.cover_image = body.images.length > 0 ? body.images[0] : null;
    }

    if (body.is_active !== undefined) updateData.is_active = Number(body.is_active) ? 1 : 0;
    if (body.display_order !== undefined) updateData.display_order = Number(body.display_order);
    if (body.package_content !== undefined) updateData.package_content = body.package_content || null;
    if (body.features !== undefined) updateData.features = body.features || null;

    const success = await updateProduct(id, updateData);
    return NextResponse.json({ success, slug: updateData.slug || currentProduct.slug });
  } catch (error) {
    console.error("PUT product error:", error);
    return NextResponse.json(
      { error: "Ürün güncellenirken bir hata oluştu." },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const id = Number(params.id);
    if (isNaN(id)) {
      return NextResponse.json({ error: "Geçersiz ürün kimliği." }, { status: 400 });
    }

    const success = await deleteProduct(id);
    if (!success) {
      return NextResponse.json({ error: "Ürün silinemedi veya zaten silinmiş." }, { status: 404 });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("DELETE product error:", error);
    return NextResponse.json(
      { error: "Ürün silinirken bir hata oluştu." },
      { status: 500 }
    );
  }
}
