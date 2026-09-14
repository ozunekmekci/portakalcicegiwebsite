import Link from "next/link";
import { ArrowLeft, MessageCircle, ShoppingBag } from "lucide-react";

export const metadata = {
  title: "Sayfa Bulunamadı | Portakal Çiçeği Atölye",
  description: "Aradığınız hatıra tasarımı veya sayfa mevcut değil ya da taşınmış olabilir.",
};

export default function NotFound() {
  const waNumber = (process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "905555555555").replace(/\D/g, "");

  return (
    <div className="bg-[#FDFBF7] min-h-[75vh] flex flex-col items-center justify-center px-4 sm:px-6 lg:px-8 py-20 text-center">
      <div className="max-w-xl mx-auto space-y-6">
        
        {/* Soft Badge */}
        <span className="inline-block px-4 py-1.5 rounded-full bg-[#D95A2B]/10 text-[#D95A2B] font-sans text-xs font-semibold tracking-wider uppercase">
          404 Hatası
        </span>

        {/* Heading */}
        <h1 className="font-serif text-3xl sm:text-5xl font-bold text-[#1E1C1A] tracking-tight">
          Aradığınız Sayfa Atölyemizde Bulunamadı
        </h1>

        {/* Subtitle */}
        <p className="font-sans text-sm sm:text-base text-[#696159] leading-relaxed max-w-md mx-auto">
          Aradığınız modelin adı değişmiş, koleksiyon güncellenmiş veya sayfa taşınmış olabilir. Dilerseniz en sevilen koleksiyonlarımıza göz atabilir veya tasarımcımıza danışabilirsiniz.
        </p>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3.5 pt-2">
          <Link
            href="/"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-[#D95A2B] hover:bg-[#B8471D] text-[#FDFBF7] font-sans text-sm font-medium px-7 py-3.5 rounded-full shadow-[0_4px_14px_rgba(217,90,43,0.22)] transition-all"
          >
            <ArrowLeft size={16} />
            <span>Ana Sayfaya Dön</span>
          </Link>

          <Link
            href="/#koleksiyonlar"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 border border-[#EDE6DF] bg-[#F5EFEB] hover:bg-[#EDE6DF] text-[#1E1C1A] font-sans text-sm font-medium px-6 py-3.5 rounded-full transition-all"
          >
            <ShoppingBag size={16} className="text-[#696159]" />
            <span>Koleksiyonları Gez</span>
          </Link>

          <a
            href={`https://wa.me/${waNumber}?text=${encodeURIComponent("Merhaba, web sitenizde aradığım bir ürünü bulamadım, yardımcı olabilir misiniz?")}`}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 border border-[#EDE6DF] bg-white hover:border-[#D95A2B]/40 hover:text-[#D95A2B] text-[#1E1C1A] font-sans text-sm font-medium px-6 py-3.5 rounded-full transition-all"
          >
            <MessageCircle size={16} className="text-[#25D366]" />
            <span>WhatsApp Destek</span>
          </a>
        </div>

        {/* Quick Collection Shortcuts */}
        <div className="pt-8 border-t border-[#EDE6DF] text-xs font-sans text-[#696159]">
          <p className="font-medium text-[#1E1C1A] mb-2.5">Popüler Koleksiyonlar:</p>
          <div className="flex flex-wrap items-center justify-center gap-3">
            <Link href="/koleksiyonlar/babyshower" className="underline hover:text-[#D95A2B]">
              Baby Shower & Doğum
            </Link>
            <span>•</span>
            <Link href="/koleksiyonlar/dugun-nisan" className="underline hover:text-[#D95A2B]">
              Düğün & Nişan
            </Link>
            <span>•</span>
            <Link href="/koleksiyonlar/dogum-gunu" className="underline hover:text-[#D95A2B]">
              İlk Yaş & Doğum Günü
            </Link>
          </div>
        </div>

      </div>
    </div>
  );
}
