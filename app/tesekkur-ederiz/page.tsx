import Link from "next/link";
import { CheckCircle2, MessageCircle, ArrowRight, Layers, Palette, PackageCheck } from "lucide-react";

export const metadata = {
  title: "Talebiniz Alındı — Teşekkür Ederiz | Portakal Çiçeği Atölye",
  description: "Özel tasarım hatıralık talebiniz atölyemize ulaştı. Tasarımcımız en kısa sürede sizinle iletişime geçecektir.",
};

export default function ThankYouPage() {
  const waNumber = (process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "905555555555").replace(/\D/g, "");

  return (
    <div className="bg-[#FDFBF7] min-h-[85vh] py-20 px-4 sm:px-6 lg:px-8 flex items-center justify-center">
      <div className="max-w-2xl w-full mx-auto text-center space-y-10">
        
        {/* Success Icon */}
        <div className="w-20 h-20 rounded-full bg-[#5A6855]/15 border border-[#5A6855]/30 flex items-center justify-center text-[#5A6855] mx-auto shadow-soft-sm">
          <CheckCircle2 size={40} />
        </div>

        {/* Headline */}
        <div className="space-y-3">
          <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-[#1E1C1A] tracking-tight">
            Talebiniz Atölyemize Ulaştı
          </h1>
          <p className="font-sans text-base sm:text-lg text-[#696159] leading-relaxed max-w-lg mx-auto">
            Özel gününüz için ilettiğiniz detaylar inceleniyor. Tasarım ekibimiz gün içinde WhatsApp üzerinden sizinle iletişime geçecektir.
          </p>
        </div>

        {/* Process Timeline Card */}
        <div className="p-8 rounded-3xl bg-[#F5EFEB] border border-[#EDE6DF] text-left space-y-6 shadow-soft-sm">
          <h2 className="font-serif text-lg font-semibold text-[#1E1C1A]">
            Şimdi Ne Olacak?
          </h2>

          <div className="space-y-4 text-sm font-sans">
            <div className="flex items-start gap-3.5">
              <div className="w-7 h-7 rounded-full bg-[#D95A2B]/15 text-[#D95A2B] flex items-center justify-center flex-shrink-0 font-bold text-xs mt-0.5">
                1
              </div>
              <div>
                <p className="font-semibold text-[#1E1C1A]">Tasarım & Adet İncelemesi</p>
                <p className="text-[#696159] text-xs leading-relaxed mt-0.5">
                  Etkinlik tarihiniz, istediğiniz adet ve konsept atölye takvimimize göre planlanır.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3.5">
              <div className="w-7 h-7 rounded-full bg-[#D95A2B]/15 text-[#D95A2B] flex items-center justify-center flex-shrink-0 font-bold text-xs mt-0.5">
                2
              </div>
              <div>
                <p className="font-semibold text-[#1E1C1A]">Birebir WhatsApp Taslak Onayı</p>
                <p className="text-[#696159] text-xs leading-relaxed mt-0.5">
                  İsim, tarih ve renk uyumları dijital görsel taslak olarak WhatsApp üzerinden onayınıza sunulur.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3.5">
              <div className="w-7 h-7 rounded-full bg-[#D95A2B]/15 text-[#D95A2B] flex items-center justify-center flex-shrink-0 font-bold text-xs mt-0.5">
                3
              </div>
              <div>
                <p className="font-semibold text-[#1E1C1A]">Özenli El İşçiliği & Kargo</p>
                <p className="text-[#696159] text-xs leading-relaxed mt-0.5">
                  Onaylanan pleksiler titizlikle üretilir, tek tek kontrol edilir ve korumalı paketlerde kargolanır.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Direct Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
          <a
            href={`https://wa.me/${waNumber}?text=${encodeURIComponent("Merhaba, web sitenizden az önce teklif formunu doldurdum. Detayları WhatsApp üzerinden hızlıca netleştirebilir miyiz?")}`}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-[#D95A2B] hover:bg-[#B8471D] text-[#FDFBF7] font-sans text-sm font-semibold px-8 py-3.5 rounded-full shadow-[0_4px_14px_rgba(217,90,43,0.22)] transition-all"
          >
            <MessageCircle size={17} />
            <span>WhatsApp ile Hemen Görüş</span>
          </a>

          <Link
            href="/"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 border border-[#EDE6DF] bg-white hover:bg-[#F5EFEB] text-[#1E1C1A] font-sans text-sm font-medium px-7 py-3.5 rounded-full transition-all"
          >
            <span>Ana Sayfaya Dön</span>
            <ArrowRight size={15} />
          </Link>
        </div>

      </div>
    </div>
  );
}
