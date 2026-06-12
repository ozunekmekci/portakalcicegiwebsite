import { NextResponse } from "next/server";
import { getCategories } from "@/lib/db-queries";

export const dynamic = "force-dynamic";

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
