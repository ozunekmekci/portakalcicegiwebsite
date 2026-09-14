"use client";

import { MessageCircle, ShoppingBag } from "lucide-react";
import Link from "next/link";

export default function StickyMobileCTA() {
  const rawNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "905555555555";
  const waNumber = rawNumber.replace(/\D/g, "");

  return (
    <div
      role="complementary"
      aria-label="Hızlı Sipariş ve Koleksiyon Gezintisi"
      className="fixed bottom-0 inset-x-0 z-40 md:hidden bg-[#FDFBF7]/95 backdrop-blur-md border-t border-[#EDE6DF] p-3 pb-[calc(0.75rem+env(safe-area-inset-bottom))] shadow-[0_-4px_20px_rgba(30,28,26,0.08)]"
    >
      <div className="flex items-center gap-3 max-w-md mx-auto">
        <Link
          href="/#koleksiyonlar"
          className="flex-1 inline-flex items-center justify-center gap-2 py-3 px-4 rounded-full border border-[#EDE6DF] bg-white text-[#1E1C1A] text-xs font-sans font-medium hover:bg-[#F5EFEB] transition-colors"
        >
          <ShoppingBag size={15} className="text-[#696159]" />
          <span>Koleksiyonlar</span>
        </Link>

        <a
          href={`https://wa.me/${waNumber}?text=${encodeURIComponent("Merhaba, hediyelik modelleriniz hakkında bilgi almak ve sipariş vermek istiyorum.")}`}
          target="_blank"
          rel="noopener noreferrer"
          className="flex-[1.5] inline-flex items-center justify-center gap-2 py-3 px-4 rounded-full bg-[#D95A2B] hover:bg-[#B8471D] text-[#FDFBF7] text-xs font-sans font-semibold shadow-[0_4px_12px_rgba(217,90,43,0.3)] transition-all"
        >
          <MessageCircle size={16} />
          <span>WhatsApp Sipariş</span>
        </a>
      </div>
    </div>
  );
}
