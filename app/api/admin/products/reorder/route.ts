import { NextResponse } from "next/server";
import { updateProductOrder } from "@/lib/db-queries";

export const dynamic = "force-dynamic";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { products } = body; // Array of { id: number, display_order: number }

    if (!Array.isArray(products)) {
      return NextResponse.json(
        { error: "Geçersiz veri formatı. 'products' dizisi gereklidir." },
        { status: 400 }
      );
    }

    for (const item of products) {
      if (typeof item.id !== "number" || typeof item.display_order !== "number") {
        return NextResponse.json(
          { error: "Her ürün objesi geçerli bir 'id' ve 'display_order' içermelidir." },
          { status: 400 }
        );
      }
    }

    // Sıralamayı veritabanında güncelle
    for (const item of products) {
      await updateProductOrder(item.id, item.display_order);
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("POST reorder products error:", error);
    return NextResponse.json(
      { error: "Sıralama güncellenirken bir hata oluştu." },
      { status: 500 }
    );
  }
}
