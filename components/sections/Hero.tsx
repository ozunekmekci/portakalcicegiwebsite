"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { MessageCircle, ArrowRight, Sparkles } from "lucide-react";

interface HeroProps {
  settings?: Record<string, string>;
}

export default function Hero({ settings = {} }: HeroProps) {
  const handleScrollToCollections = () => {
    document.getElementById("koleksiyonlar")?.scrollIntoView({ behavior: "smooth" });
  };

  const dbNumber = settings.contact_phone;
  const rawNumber = dbNumber || process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "905555555555";
  const waNumber = rawNumber.replace(/\D/g, "");

  const titleText = settings.hero_title || "Evimizde, ellerimizle, kutlamanıza özel tasarlıyoruz.";
  const descriptionText =
    settings.hero_description ||
    "Doğum, baby shower, ilk yaş ve nişan kutlamaları için 3D akrilik pasta süsleri ve kişiye özel magnet hatıralıkları. Önce WhatsApp'ta taslağınızı görün, içinize sinsin; sonra sevgiyle üretelim.";
  const heroImage = settings.hero_image || "/images/gallery-5.webp";

  return (
    <section
      aria-label="Karşılama"
      className="relative w-full min-h-[82vh] lg:min-h-[88vh] flex items-center bg-[#FDFBF7] py-12 md:py-20 overflow-hidden border-b border-[#EDE6DF]"
    >
      {/* Delicate background ambient tint */}
      <div className="absolute top-0 right-0 w-[550px] h-[550px] bg-[#D95A2B]/4 rounded-full blur-3xl pointer-events-none -mr-32 -mt-32" />
      <div className="absolute bottom-0 left-0 w-[450px] h-[450px] bg-[#5A6855]/4 rounded-full blur-3xl pointer-events-none -ml-24 -mb-24" />

      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left Column: Editorial Manifesto & CTAs */}
          <div className="lg:col-span-7 flex flex-col justify-center text-left space-y-6 md:space-y-8">
            
            {/* Direct Headline (No eyebrow tag) */}
            <motion.h1
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              className="font-serif text-3xl sm:text-5xl lg:text-6xl text-[#1E1C1A] leading-[1.12] font-bold tracking-tight"
            >
              {titleText}
            </motion.h1>

            {/* Narrative / Atelier Story */}
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
              className="font-sans text-base sm:text-lg text-[#696159] leading-relaxed max-w-2xl font-normal"
            >
              {descriptionText}
            </motion.p>

            {/* Action Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.28, ease: [0.16, 1, 0.3, 1] }}
              className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-2 w-full sm:w-auto"
            >
              <a
                href={`https://wa.me/${waNumber}?text=${encodeURIComponent("Merhaba! Bebeğimin/etkinliğimin kutlaması için pasta süsü ve magnet tasarımlarınızı konuşmak, taslak hazırlatmak istiyorum.")}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-7 py-3.5 bg-[#D95A2B] text-[#FDFBF7] rounded-full font-medium text-sm sm:text-base shadow-[0_6px_20px_rgba(217,90,43,0.22)] hover:bg-[#B8471D] hover:shadow-[0_8px_25px_rgba(217,90,43,0.3)] transition-all duration-300 transform hover:-translate-y-0.5 active:translate-y-0 cursor-pointer"
              >
                <MessageCircle size={18} />
                <span>WhatsApp&apos;ta Taslak İste</span>
              </a>

              <button
                onClick={handleScrollToCollections}
                className="inline-flex items-center justify-center gap-2 px-7 py-3.5 border border-[#EDE6DF] bg-white/70 hover:bg-white text-[#1E1C1A] font-medium rounded-full hover:border-[#D95A2B]/40 hover:text-[#D95A2B] transition-all duration-300 text-sm sm:text-base shadow-sm cursor-pointer"
              >
                <span>Koleksiyonları İncele</span>
                <ArrowRight size={16} />
              </button>
            </motion.div>

            {/* Micro Pillars / Social Proof Footnote */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.42 }}
              className="pt-4 border-t border-[#EDE6DF]/80 flex flex-wrap items-center gap-x-6 gap-y-2 text-xs text-[#696159]"
            >
              <div className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-[#D95A2B]" />
                <span>1 Adet Pasta Süsü / 25+ Magnet</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-[#5A6855]" />
                <span>WhatsApp&apos;ta Birebir Taslak Onayı</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-[#D49B35]" />
                <span>Kargoda %100 Hasar Garantisi</span>
              </div>
            </motion.div>

          </div>

          {/* Right Column: Visual Showcase (Natural light atelier photo) */}
          <div className="lg:col-span-5 flex justify-center lg:justify-end">
            <motion.div
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
              className="relative w-full max-w-[460px] aspect-[4/5] rounded-[32px] overflow-hidden bg-[#F5EFEB] border border-[#EDE6DF] shadow-[0_20px_45px_-12px_rgba(30,28,26,0.12)] p-2"
            >
              <div className="relative w-full h-full rounded-[26px] overflow-hidden">
                <Image
                  src={heroImage}
                  alt="Portakal Çiçeği Atölyesi el yapımı 3D akrilik hatıra tasarımı"
                  fill
                  priority
                  sizes="(max-width: 1024px) 90vw, 460px"
                  className="object-cover"
                />
              </div>

              {/* Floating Material Footnote */}
              <div className="absolute bottom-5 left-5 right-5 z-20 bg-[#FDFBF7]/90 backdrop-blur-md rounded-2xl p-4 border border-[#EDE6DF] shadow-soft-md">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-serif text-sm font-semibold text-[#1E1C1A]">
                      Özgün El Yapımı • Kadıköy
                    </p>
                    <p className="font-sans text-xs text-[#696159] mt-0.5">
                      3D Pleksi Pasta Süsü &amp; Baby Shower Magneti
                    </p>
                  </div>
                  <span className="text-[11px] font-sans font-medium text-[#D95A2B] bg-[#D95A2B]/10 px-2.5 py-1 rounded-full">
                    Özel Tasarım
                  </span>
                </div>
              </div>
            </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
}
