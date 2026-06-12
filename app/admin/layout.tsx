"use client";

import { usePathname } from "next/navigation";
import Script from "next/script";
import AdminNav from "@/components/admin/AdminNav";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const isLoginPage = pathname === "/admin/giris";

  return (
    <div className="min-h-screen bg-brand-bg-cream text-brand-text-dark flex flex-col">
      <Script src="https://upload-widget.cloudinary.com/global/all.js" strategy="afterInteractive" />
      {!isLoginPage && <AdminNav />}
      <main className={isLoginPage ? "flex-grow flex items-center justify-center p-4" : "flex-grow max-w-7xl w-full mx-auto py-8 px-6"}>
        {children}
      </main>
    </div>
  );
}
