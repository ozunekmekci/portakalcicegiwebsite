"use client";

import { useState, useEffect } from "react";
import { MessageCircle, X } from "lucide-react";

export default function AnnouncementBar() {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const isDismissed = localStorage.getItem("portakal_announcement_dismissed");
    if (isDismissed === "true") {
      setIsVisible(false);
    }
  }, []);

  const handleDismiss = () => {
    setIsVisible(false);
    localStorage.setItem("portakal_announcement_dismissed", "true");
  };

  if (!isVisible) return null;

  const rawNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "905555555555";
  const waNumber = rawNumber.replace(/\D/g, "");

  return (
    <div
      role="region"
      aria-label="Duyuru ve Özel Fırsat"
      className="bg-[#1E1C1A] text-[#FDFBF7] text-xs font-sans py-2.5 px-4 relative border-b border-[#2C2926] z-50 transition-all duration-300"
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
        <div className="flex-1 flex items-center justify-center text-center flex-wrap gap-x-3 gap-y-1">
          <span className="font-semibold text-[#D95A2B]">✦ Özel Atölye Fırsatı:</span>
          <span className="text-[#E6DFD5]">
            100+ adet toplu siparişlerde ücretsiz kargo & birebir tasarım danışmanlığı.
          </span>
          <a
            href={`https://wa.me/${waNumber}?text=${encodeURIComponent("Merhaba, 100+ adetlik toplu sipariş fırsatı hakkında bilgi almak istiyorum.")}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 font-medium text-[#D95A2B] hover:text-[#FFA07A] underline underline-offset-2 transition-colors ml-1"
          >
            <MessageCircle size={12} />
            <span>Hızlı Sipariş Hattı →</span>
          </a>
        </div>

        <button
          onClick={handleDismiss}
          type="button"
          aria-label="Duyuruyu gizle"
          className="text-[#8E857B] hover:text-[#FDFBF7] p-1 rounded-full hover:bg-white/10 transition-colors flex-shrink-0"
        >
          <X size={14} />
        </button>
      </div>
    </div>
  );
}
