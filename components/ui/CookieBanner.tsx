"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

export default function CookieBanner() {
  const [showBanner, setShowBanner] = useState(false);

  useEffect(() => {
    if (localStorage.getItem("portakal_cookie_consent")) return;
    setShowBanner(true);
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
      role="region"
      aria-live="polite"
      aria-label="Çerez tercihleri"
      className="bg-[var(--taste-ink)] text-white"
    >
      <div className="mx-auto grid max-w-[1344px] gap-2 px-[var(--taste-gutter)] py-2.5 md:grid-cols-[1fr_auto] md:items-center">
      <p className="text-sm leading-snug">
        Çerezleri site işleyişi ve ziyaretçi istatistikleri için kullanıyoruz.{" "}
        <Link href="/gizlilik-politikasi" className="underline underline-offset-2">Ayrıntılar</Link>
      </p>
      <div className="flex flex-wrap gap-2">
        <button onClick={handleAcceptEssential} type="button" className="min-h-11 flex-1 bg-white px-2 text-sm font-semibold text-[var(--taste-ink)] hover:bg-[var(--taste-field-strong)]">Yalnızca zorunlu</button>
        <button onClick={handleAcceptAll} type="button" className="min-h-11 flex-1 bg-[var(--taste-action)] px-2 text-sm font-semibold hover:bg-[var(--taste-action-hover)]">Tümünü kabul et</button>
      </div>
      </div>
    </div>
  );
}
