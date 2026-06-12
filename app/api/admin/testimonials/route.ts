import { NextResponse } from "next/server";
import { getTestimonials, createTestimonial } from "@/lib/db-queries";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const testimonials = await getTestimonials({ onlyActive: false });
    return NextResponse.json(testimonials);
  } catch (error) {
    console.error("GET testimonials error:", error);
    return NextResponse.json(
      { error: "Yorumlar listelenirken bir hata oluştu." },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, text, avatar = null, display_order = 0, is_active = 1 } = body;

    if (!name || !text) {
      return NextResponse.json(
        { error: "Müşteri adı ve yorum metni alanları zorunludur." },
        { status: 400 }
      );
    }

    const testimonialId = await createTestimonial({
      name,
      text,
      avatar,
      display_order: Number(display_order) || 0,
      is_active: Number(is_active) ? 1 : 0,
    });

    return NextResponse.json({ success: true, id: testimonialId });
  } catch (error) {
    console.error("POST testimonial error:", error);
    return NextResponse.json(
      { error: "Yorum eklenirken bir hata oluştu." },
      { status: 500 }
    );
  }
}
