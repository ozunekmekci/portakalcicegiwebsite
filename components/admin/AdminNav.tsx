"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import { LogOut, Package, PlusCircle } from "lucide-react";

export default function AdminNav() {
  const pathname = usePathname();
  const router = useRouter();
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  const handleLogout = async () => {
    if (isLoggingOut) return;
    setIsLoggingOut(true);

    try {
      const res = await fetch("/api/admin/auth", {
        method: "DELETE",
      });

      if (res.ok) {
        router.refresh();
        router.push("/admin/giris");
      } else {
        alert("Çıkış yapılırken bir hata oluştu.");
      }
    } catch (error) {
      console.error("Logout error:", error);
      alert("Bağlantı hatası oluştu.");
    } finally {
      setIsLoggingOut(false);
    }
  };

  const navLinks = [
    { href: "/admin", label: "Ürün Yönetimi", icon: Package },
    { href: "/admin/urun-ekle", label: "Yeni Ürün Ekle", icon: PlusCircle },
  ];

  return (
    <header className="bg-white border-b border-[#dcdcd9] sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        {/* Brand/Logo Area */}
        <div className="flex items-center gap-3">
          <span className="text-xl font-bold text-brand-orange-dark tracking-tight font-sans flex items-center gap-2">
            🍊 Portakal Çiçeği <span className="text-xs bg-[#fbf7f0] border border-[#ff914b] text-[#ff914b] px-2.5 py-0.5 rounded-full uppercase tracking-wider font-semibold">Admin</span>
          </span>
        </div>

        {/* Links Area */}
        <nav className="flex items-center gap-2 sm:gap-4">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            const Icon = link.icon;
            
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold font-sans transition-all ${
                  isActive
                    ? "bg-[#ff914b] text-white shadow-sm shadow-[#ff914b]/10"
                    : "text-brand-text-mid hover:text-brand-orange hover:bg-[#fbf7f0]"
                }`}
              >
                <Icon size={16} />
                <span className="hidden sm:inline">{link.label}</span>
              </Link>
            );
          })}

          <div className="h-6 w-[1px] bg-[#dcdcd9] mx-1" />

          {/* Logout Button */}
          <button
            onClick={handleLogout}
            disabled={isLoggingOut}
            className="flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold font-sans text-brand-orange-dark hover:bg-red-50 disabled:opacity-50 transition-all cursor-pointer"
            aria-label="Çıkış Yap"
          >
            <LogOut size={16} />
            <span className="hidden sm:inline">
              {isLoggingOut ? "Çıkılıyor..." : "Çıkış Yap"}
            </span>
          </button>
        </nav>
      </div>
    </header>
  );
}
