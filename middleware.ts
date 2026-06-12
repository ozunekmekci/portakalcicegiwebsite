import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { verifySession } from "./lib/auth";

export async function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;

  // Sadece /admin ile başlayan ve giriş sayfası (/admin/giris) olmayan rotaları koru
  if (path.startsWith("/admin") && path !== "/admin/giris") {
    const adminToken = request.cookies.get("admin_session")?.value;
    const secret = process.env.ADMIN_SECRET;

    if (!secret) {
      console.error("ADMIN_SECRET ortam değişkeni ayarlanmamış!");
      // Sistem yapılandırması eksikse güvenlik gereği giriş sayfasına yönlendir
      return NextResponse.redirect(new URL("/admin/giris", request.url));
    }

    const isValid = adminToken ? await verifySession(adminToken, secret) : false;

    if (!isValid) {
      // Oturum geçersizse giriş sayfasına yönlendir
      const loginUrl = new URL("/admin/giris", request.url);
      return NextResponse.redirect(loginUrl);
    }
  }

  return NextResponse.next();
}

// Middleware'in sadece admin sayfalarında tetiklenmesi için matcher tanımla
export const config = {
  matcher: ["/admin/:path*"],
};
