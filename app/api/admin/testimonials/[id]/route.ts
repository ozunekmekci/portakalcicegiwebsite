import { NextResponse } from "next/server";
import { getTestimonialById, updateTestimonial, deleteTestimonial } from "@/lib/db-queries";

export const dynamic = "force-dynamic";

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const id = Number(params.id);
    if (isNaN(id)) {
      return NextResponse.json({ error: "Geçersiz yorum kimliği." }, { status: 400 });
    }

    const testimonial = await getTestimonialById(id);
    if (!testimonial) {
      return NextResponse.json({ error: "Yorum bulunamadı." }, { status: 404 });
    }

    return NextResponse.json(testimonial);
  } catch (error) {
    console.error("GET testimonial error:", error);
    return NextResponse.json(
      { error: "Yorum detayları alınırken bir hata oluştu." },
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
      return NextResponse.json({ error: "Geçersiz yorum kimliği." }, { status: 400 });
    }

    const currentTestimonial = await getTestimonialById(id);
    if (!currentTestimonial) {
      return NextResponse.json({ error: "Yorum bulunamadı." }, { status: 404 });
    }

    const body = await request.json();
    const updateData: any = {};

    if (body.name !== undefined) updateData.name = body.name;
    if (body.text !== undefined) updateData.text = body.text;
    if (body.avatar !== undefined) updateData.avatar = body.avatar || null;
    if (body.display_order !== undefined) updateData.display_order = Number(body.display_order);
    if (body.is_active !== undefined) updateData.is_active = Number(body.is_active) ? 1 : 0;

    const success = await updateTestimonial(id, updateData);
    return NextResponse.json({ success });
  } catch (error) {
    console.error("PUT testimonial error:", error);
    return NextResponse.json(
      { error: "Yorum güncellenirken bir hata oluştu." },
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
      return NextResponse.json({ error: "Geçersiz yorum kimliği." }, { status: 400 });
    }

    const success = await deleteTestimonial(id);
    if (!success) {
      return NextResponse.json({ error: "Yorum silinemedi veya zaten silinmiş." }, { status: 404 });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("DELETE testimonial error:", error);
    return NextResponse.json(
      { error: "Yorum silinirken bir hata oluştu." },
      { status: 500 }
    );
  }
}
