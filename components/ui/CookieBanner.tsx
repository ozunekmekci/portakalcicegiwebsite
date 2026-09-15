"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Cookie, X } from "lucide-react";

export default function CookieBanner() {
  const [showBanner, setShowBanner] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem("portakal_cookie_consent");
    if (!consent) {
      // Small delay for smooth appearance
      const timer = setTimeout(() => setShowBanner(true), 1200);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleAcceptAll = () => {
    localStorage.setItem("portakal_cookie_consent", "all");
    setShowBanner(false);
  };

  const handleAcceptEssential = () => {
    localStorage.setItem("portakal_cookie_consent", "essential");
    setShowBanner(false);
  };

  if (!showBanner) return null;

  return (
    <div
      role="dialog"
      aria-live="polite"
      aria-label="Çerez Tercihleri Bildirimi"
      className="fixed bottom-20 md:bottom-6 left-4 right-4 md:left-auto md:right-6 md:max-w-md z-50 bg-[#FDFBF7] border border-[#EDE6DF] rounded-none p-5 shadow-[0_16px_36px_-6px_rgba(30,28,26,0.15)] transition-all animate-in fade-in slide-in-from-bottom-5 duration-300"
    >
      <div className="space-y-3 text-left">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-none bg-[#C86D51]/10 flex items-center justify-center text-[#C86D51]">
              <Cookie size={16} />
            </div>
            <h3 className="font-serif text-sm font-semibold text-[#1E1C1A]">
              Çerez Tercihleriniz
            </h3>
          </div>
          <button
            onClick={handleAcceptEssential}
            type="button"
            aria-label="Bildirimi kapat"
            className="text-[#8E857B] hover:text-[#1E1C1A] p-1 transition-colors"
          >
            <X size={15} />
          </button>
        </div>

        <p className="font-sans text-xs text-[#696159] leading-relaxed">
          Deneyiminizi iyileştirmek, atölye ziyaretçi istatistiklerini anlamak ve sipariş akışını sorunsuz yürütmek için çerezlerden faydalanıyoruz. Detaylar için{" "}
          <Link href="/gizlilik-politikasi" className="underline text-[#C86D51] hover:text-[#A85338]">
            Gizlilik Politikamızı
          </Link>{" "}
          inceleyebilirsiniz.
        </p>

        <div className="flex items-center gap-2.5 pt-1">
          <button
            onClick={handleAcceptAll}
            type="button"
            className="flex-1 py-2 px-3 rounded-none bg-[#C86D51] hover:bg-[#A85338] text-[#FDFBF7] text-xs font-sans font-semibold uppercase tracking-wider transition-colors cursor-pointer text-center"
          >
            Tümünü Kabul Et
          </button>
          <button
            onClick={handleAcceptEssential}
            type="button"
            className="flex-1 py-2 px-3 rounded-none border border-[#EDE6DF] bg-[#F5EFEB] hover:bg-[#EDE6DF] text-[#1E1C1A] text-xs font-sans font-semibold uppercase tracking-wider transition-colors cursor-pointer text-center"
          >
            Yalnızca Zorunlu
          </button>
        </div>
      </div>
    </div>
  );
}
