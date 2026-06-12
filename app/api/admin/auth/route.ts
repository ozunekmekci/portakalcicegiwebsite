import { NextResponse } from "next/server";
import { signSession } from "@/lib/auth";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { password } = body;

    const adminPassword = process.env.ADMIN_PASSWORD;
    const adminSecret = process.env.ADMIN_SECRET;

    if (!adminPassword || !adminSecret) {
      return NextResponse.json(
        { error: "Admin yapılandırması sunucuda eksik." },
        { status: 500 }
      );
    }

    if (password !== adminPassword) {
      return NextResponse.json(
        { error: "Hatalı şifre. Lütfen tekrar deneyin." },
        { status: 401 }
      );
    }

    const token = await signSession(adminSecret);
    const response = NextResponse.json({ success: true });

    // 7 gün geçerli HttpOnly, Secure, Lax cookie set et
    response.cookies.set("admin_session", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 7 * 24 * 60 * 60, // 7 gün
      path: "/",
    });

    return response;
  } catch (error) {
    console.error("Auth error:", error);
    return NextResponse.json(
      { error: "Giriş yapılırken bir hata oluştu." },
      { status: 500 }
    );
  }
}

export async function DELETE() {
  const response = NextResponse.json({ success: true });
  
  // Çıkış yaparken cookie'yi sil
  response.cookies.set("admin_session", "", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 0, // anında geçersiz kıl
    path: "/",
  });

  return response;
}
