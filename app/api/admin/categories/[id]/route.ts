import { NextResponse } from "next/server";
import { getCategoryById, updateCategory, deleteCategory, getCategoryBySlug } from "@/lib/db-queries";
import { slugify } from "@/lib/utils";

export const dynamic = "force-dynamic";

async function generateUniqueCategorySlug(name: string, currentId: number): Promise<string> {
  const baseSlug = slugify(name) || "koleksiyon";
  let slug = baseSlug;
  let counter = 1;
  while (true) {
    const existing = await getCategoryBySlug(slug);
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
      return NextResponse.json({ error: "Geçersiz kategori kimliği." }, { status: 400 });
    }

    const category = await getCategoryById(id);
    if (!category) {
      return NextResponse.json({ error: "Kategori bulunamadı." }, { status: 404 });
    }

    return NextResponse.json(category);
  } catch (error) {
    console.error("GET category error:", error);
    return NextResponse.json(
      { error: "Kategori detayları alınırken bir hata oluştu." },
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
      return NextResponse.json({ error: "Geçersiz kategori kimliği." }, { status: 400 });
    }

    const currentCategory = await getCategoryById(id);
    if (!currentCategory) {
      return NextResponse.json({ error: "Kategori bulunamadı." }, { status: 404 });
    }

    const body = await request.json();
    const updateData: any = {};

    if (body.name !== undefined) {
      updateData.name = body.name;
      if (body.name !== currentCategory.name) {
        updateData.slug = await generateUniqueCategorySlug(body.name, id);
      }
    }

    if (body.emoji !== undefined) updateData.emoji = body.emoji || null;
    if (body.description !== undefined) updateData.description = body.description || null;
    if (body.display_order !== undefined) updateData.display_order = Number(body.display_order);
    if (body.banner_image !== undefined) updateData.banner_image = body.banner_image || null;

    const success = await updateCategory(id, updateData);
    return NextResponse.json({ success, slug: updateData.slug || currentCategory.slug });
  } catch (error) {
    console.error("PUT category error:", error);
    return NextResponse.json(
      { error: "Kategori güncellenirken bir hata oluştu." },
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
      return NextResponse.json({ error: "Geçersiz kategori kimliği." }, { status: 400 });
    }

    const success = await deleteCategory(id);
    if (!success) {
      return NextResponse.json({ error: "Kategori silinemedi veya zaten silinmiş." }, { status: 404 });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("DELETE category error:", error);
    return NextResponse.json(
      { error: "Kategori silinirken bir hata oluştu." },
      { status: 500 }
    );
  }
}
