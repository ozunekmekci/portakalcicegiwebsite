import { NextResponse } from "next/server";
import { getCategories, createCategory, getCategoryBySlug } from "@/lib/db-queries";
import { slugify } from "@/lib/utils";

export const dynamic = "force-dynamic";

async function generateUniqueCategorySlug(name: string): Promise<string> {
  const baseSlug = slugify(name) || "koleksiyon";
  let slug = baseSlug;
  let counter = 1;
  while (await getCategoryBySlug(slug)) {
    slug = `${baseSlug}-${counter}`;
    counter++;
  }
  return slug;
}

export async function GET() {
  try {
    const categories = await getCategories();
    return NextResponse.json(categories);
  } catch (error) {
    console.error("GET categories error:", error);
    return NextResponse.json(
      { error: "Kategoriler listelenirken bir hata oluştu." },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, emoji = null, description = null, display_order = 0, banner_image = null } = body;

    if (!name) {
      return NextResponse.json(
        { error: "Koleksiyon adı zorunludur." },
        { status: 400 }
      );
    }

    const slug = await generateUniqueCategorySlug(name);
    
    const categoryId = await createCategory({
      name,
      slug,
      emoji: emoji || null,
      description: description || null,
      display_order: Number(display_order) || 0,
      banner_image: banner_image || null,
    });

    return NextResponse.json({ success: true, id: categoryId, slug });
  } catch (error) {
    console.error("POST category error:", error);
    return NextResponse.json(
      { error: "Koleksiyon eklenirken bir hata oluştu." },
      { status: 500 }
    );
  }
}
