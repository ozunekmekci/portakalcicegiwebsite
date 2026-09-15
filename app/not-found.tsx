import Link from "next/link";
import { ArrowLeft, MessageCircle, ShoppingBag } from "lucide-react";

export const metadata = {
  title: "Sayfa Bulunamadı | Portakal Çiçeği Atölye",
  description: "Aradığınız tasarım veya sayfa mevcut değil ya da taşınmış olabilir.",
};

export default function NotFound() {
  const waNumber = (process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "905555555555").replace(/\D/g, "");

  return (
    <div className="bg-[#FDFBF7] min-h-[75vh] flex flex-col items-center justify-center px-4 sm:px-6 lg:px-8 py-20 text-center">
      <div className="max-w-xl mx-auto space-y-6">
        
        {/* Straight-Edge Soft Badge */}
        <span className="inline-block px-3 py-1 rounded-none bg-[#C86D51]/10 text-[#C86D51] font-sans text-xs font-semibold tracking-wider uppercase">
          404 Hatası
        </span>

        {/* Heading */}
        <h1 className="font-serif text-3xl sm:text-5xl font-bold text-[#1E1C1A] tracking-tight">
          Aradığınız Sayfa Atölyemizde Bulunamadı
        </h1>

        {/* Subtitle */}
        <p className="font-sans text-sm sm:text-base text-[#696159] leading-relaxed max-w-md mx-auto">
          Aradığınız modelin adı değişmiş, koleksiyon güncellenmiş veya sayfa taşınmış olabilir. Dilerseniz 3 ana koleksiyonumuza göz atabilir veya tasarımcımıza danışabilirsiniz.
        </p>

        {/* Action Buttons - Straight Edges */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
          <Link
            href="/"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-[#C86D51] hover:bg-[#A85338] text-[#FDFBF7] font-sans text-xs uppercase tracking-wider font-semibold px-6 py-3.5 rounded-none shadow-sm transition-all"
          >
            <ArrowLeft size={15} />
            <span>Ana Sayfaya Dön</span>
          </Link>

          <Link
            href="/#koleksiyonlar"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 border border-[#EDE6DF] bg-white hover:bg-[#F5EFEB] text-[#1E1C1A] font-sans text-xs uppercase tracking-wider font-semibold px-6 py-3.5 rounded-none transition-all"
          >
            <ShoppingBag size={15} className="text-[#696159]" />
            <span>Koleksiyonları Gez</span>
          </Link>

          <a
            href={`https://wa.me/${waNumber}?text=${encodeURIComponent("Merhaba, web sitenizde aradığım bir ürünü bulamadım, yardımcı olabilir misiniz?")}`}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 border border-[#EDE6DF] bg-white hover:border-[#C86D51] hover:text-[#C86D51] text-[#1E1C1A] font-sans text-xs uppercase tracking-wider font-semibold px-6 py-3.5 rounded-none transition-all"
          >
            <MessageCircle size={15} className="text-[#25D366]" />
            <span>WhatsApp Destek</span>
          </a>
        </div>

        {/* Quick Collection Shortcuts */}
        <div className="pt-8 border-t border-[#EDE6DF] text-xs font-sans text-[#696159]">
          <p className="font-medium text-[#1E1C1A] mb-2.5">Ana Koleksiyonlarımız:</p>
          <div className="flex flex-wrap items-center justify-center gap-3">
            <Link href="/koleksiyonlar/magnet" className="underline hover:text-[#C86D51]">
              Magnet &amp; Hediyelik
            </Link>
            <span>•</span>
            <Link href="/koleksiyonlar/cake-topper" className="underline hover:text-[#C86D51]">
              Cake Topper (Pasta Süsleri)
            </Link>
            <span>•</span>
            <Link href="/koleksiyonlar/kapi-susu" className="underline hover:text-[#C86D51]">
              Kapı Süsü &amp; Pano
            </Link>
          </div>
        </div>

      </div>
    </div>
  );
}
