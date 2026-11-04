import Link from "next/link";
import { CheckCircle2, MessageCircle, ArrowRight } from "lucide-react";

export const metadata = {
  title: "Talebin alındı, teşekkür ederiz",
  description: "Talebin atölyemize ulaştı. Detayları konuşmak için seninle iletişime geçeceğiz.",
};

export default function ThankYouPage() {
  const waNumber = (process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "905555555555").replace(/\D/g, "");

  return (
    <div className="bg-[#FDFBF7] min-h-[85vh] py-20 px-4 sm:px-6 lg:px-8 flex items-center justify-center">
      <div className="max-w-2xl w-full mx-auto text-center space-y-10">
        
        {/* Success Icon - Straight Edges */}
        <div className="w-16 h-16 rounded-none bg-[#5A6855]/15 border border-[#5A6855]/30 flex items-center justify-center text-[#5A6855] mx-auto shadow-sm">
          <CheckCircle2 size={32} />
        </div>

        {/* Headline */}
        <div className="space-y-3">
          <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-[#1E1C1A] tracking-tight">
            Talebin bize ulaştı
          </h1>
          <p className="font-sans text-sm sm:text-base text-[#696159] leading-relaxed max-w-lg mx-auto">
            Paylaştığın detaylara bakıyoruz. Gün içinde WhatsApp’tan sana yazacağız.
          </p>
        </div>

        {/* Process Timeline Card - Straight Edges */}
        <div className="p-6 sm:p-8 rounded-none bg-[#F5EFEB] border border-[#EDE6DF] text-left space-y-6 shadow-sm">
          <h2 className="font-serif text-base sm:text-lg font-semibold text-[#1E1C1A]">
            Sırada ne var?
          </h2>

          <div className="space-y-4 text-xs sm:text-sm font-sans">
            <div className="flex items-start gap-3.5">
              <div className="w-6 h-6 rounded-none bg-[#C86D51]/15 text-[#C86D51] flex items-center justify-center flex-shrink-0 font-bold text-xs mt-0.5">
                1
              </div>
              <div>
                <p className="font-semibold text-[#1E1C1A]">Tasarım ve adetler</p>
                <p className="text-[#696159] text-xs leading-relaxed mt-0.5">
                  Kutlama tarihine, istediğin adede ve temaya göre atölye takvimimizi kontrol ediyoruz.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3.5">
              <div className="w-6 h-6 rounded-none bg-[#C86D51]/15 text-[#C86D51] flex items-center justify-center flex-shrink-0 font-bold text-xs mt-0.5">
                2
              </div>
              <div>
                <p className="font-semibold text-[#1E1C1A]">Taslak onayı</p>
                <p className="text-[#696159] text-xs leading-relaxed mt-0.5">
                  İsim, tarih ve renkleri gösteren taslağı WhatsApp’tan gönderip onayını alıyoruz.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3.5">
              <div className="w-6 h-6 rounded-none bg-[#C86D51]/15 text-[#C86D51] flex items-center justify-center flex-shrink-0 font-bold text-xs mt-0.5">
                3
              </div>
              <div>
                <p className="font-semibold text-[#1E1C1A]">Üretim ve kargo</p>
                <p className="text-[#696159] text-xs leading-relaxed mt-0.5">
                  Onayladığın pleksi tasarımları hazırlıyor, tek tek kontrol edip korumalı paketlerle kargoya veriyoruz.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Direct Action Buttons - Straight Edges */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
          <a
            href={`https://wa.me/${waNumber}?text=${encodeURIComponent("Merhaba, web sitenizden az önce teklif formunu doldurdum. Detayları WhatsApp üzerinden hızlıca netleştirebilir miyiz?")}`}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-[#C86D51] hover:bg-[#A85338] text-[#FDFBF7] font-sans text-xs uppercase tracking-wider font-semibold px-7 py-3.5 rounded-none shadow-sm transition-all"
          >
            <MessageCircle size={16} />
            <span>WhatsApp’tan yaz</span>
          </a>

          <Link
            href="/"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 border border-[#EDE6DF] bg-white hover:bg-[#F5EFEB] text-[#1E1C1A] font-sans text-xs uppercase tracking-wider font-semibold px-7 py-3.5 rounded-none transition-all"
          >
            <span>Ana sayfaya dön</span>
            <ArrowRight size={14} />
          </Link>
        </div>

      </div>
    </div>
  );
}
