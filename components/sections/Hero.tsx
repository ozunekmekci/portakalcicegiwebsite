"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { MessageCircle, ArrowRight } from "lucide-react";

interface HeroProps {
  settings?: Record<string, string>;
}

export default function Hero({ settings = {} }: HeroProps) {
  const dbNumber = settings.contact_phone;
  const rawNumber = dbNumber || process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "905555555555";
  const waNumber = rawNumber.replace(/\D/g, "");

  const titleText = settings.hero_title || "Evimizde, ellerimizle, kutlamanıza özel tasarlıyoruz.";
  const descriptionText =
    settings.hero_description ||
    "Doğum günü, baby shower ve özel günleriniz için kişiye özel magnetler, 3D akrilik cake topper süsleri ve kapı panoları. Önce WhatsApp'ta taslağınızı görün, içinize sinsin; sonra sevgiyle üretelim.";
  const heroImage = settings.hero_image || "/images/gallery-5.webp";

  const categories = [
    { label: "Magnetler", count: "Min. 25 Adet", href: "/koleksiyonlar/magnet" },
    { label: "Cake Topper", count: "1 Adet Kişiye Özel", href: "/koleksiyonlar/cake-topper" },
    { label: "Kapı Süsleri", count: "1 Adet Kişiye Özel", href: "/koleksiyonlar/kapi-susu" },
  ];

  return (
    <section
      aria-label="Karşılama ve Ürün Vitrini"
      className="relative w-full min-h-[80vh] flex items-center bg-[#FDFBF7] py-10 md:py-16 overflow-hidden border-b border-[#EDE6DF]"
    >
      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          
          {/* Left Column: Product-First Editorial & CTAs */}
          <div className="lg:col-span-7 flex flex-col justify-center text-left space-y-6">
            
            {/* Direct Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="font-serif text-3xl sm:text-4xl lg:text-5xl text-[#1E1C1A] leading-[1.15] font-bold tracking-tight"
            >
              {titleText}
            </motion.h1>

            {/* Narrative */}
            <motion.p
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.12, ease: [0.16, 1, 0.3, 1] }}
              className="font-sans text-sm sm:text-base text-[#696159] leading-relaxed max-w-2xl font-normal"
            >
              {descriptionText}
            </motion.p>

            {/* E-Commerce 3-Category Direct Tabs */}
            <motion.div
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
              className="grid grid-cols-3 gap-3 pt-2"
            >
              {categories.map((cat) => (
                <Link
                  key={cat.label}
                  href={cat.href}
                  className="group p-3 border border-[#EDE6DF] bg-white hover:border-[#C86D51] transition-all duration-200 text-left rounded-none flex flex-col justify-between"
                >
                  <span className="font-serif text-sm font-bold text-[#1E1C1A] group-hover:text-[#C86D51] transition-colors">
                    {cat.label}
                  </span>
                  <span className="text-[11px] font-sans text-[#696159] mt-1">
                    {cat.count}
                  </span>
                </Link>
              ))}
            </motion.div>

            {/* Primary Action Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.28, ease: [0.16, 1, 0.3, 1] }}
              className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-2 w-full sm:w-auto"
            >
              <a
                href={`https://wa.me/${waNumber}?text=${encodeURIComponent("Merhaba! Bebeğimin/etkinliğimin kutlaması için magnet, cake topper veya kapı süsü tasarlatmak istiyorum.")}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-[#C86D51] text-[#FDFBF7] rounded-none font-sans font-semibold text-xs uppercase tracking-wider shadow-sm hover:bg-[#A85338] transition-all duration-200 cursor-pointer"
              >
                <MessageCircle size={16} />
                <span>WhatsApp&apos;ta Taslak İste</span>
              </a>

              <Link
                href="/#koleksiyonlar"
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 border border-[#EDE6DF] bg-white hover:bg-[#F5EFEB] text-[#1E1C1A] font-sans font-semibold text-xs uppercase tracking-wider rounded-none hover:border-[#C86D51] hover:text-[#C86D51] transition-all duration-200 shadow-sm cursor-pointer"
              >
                <span>Ürünleri İncele</span>
                <ArrowRight size={14} />
              </Link>
            </motion.div>

            {/* Micro Pillars / Value Guarantee */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.38 }}
              className="pt-4 border-t border-[#EDE6DF] flex flex-wrap items-center gap-x-6 gap-y-2 text-xs text-[#696159]"
            >
              <div className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 bg-[#C86D51]" />
                <span>1 Adet Cake Topper / Kapı Süsü</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 bg-[#5A6855]" />
                <span>25+ Adet Magnet Siparişi</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 bg-[#D49B35]" />
                <span>WhatsApp Taslak Onayı &amp; Kırılma Garantisi</span>
              </div>
            </motion.div>

          </div>

          {/* Right Column: Architectural Visual Framing (Straight-edge) */}
          <div className="lg:col-span-5 flex justify-center lg:justify-end">
            <motion.div
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              className="relative w-full max-w-[460px] aspect-[4/5] rounded-none overflow-hidden bg-white border border-[#EDE6DF] shadow-soft-md p-2"
            >
              <div className="relative w-full h-full rounded-none overflow-hidden bg-[#F5EFEB]">
                <Image
                  src={heroImage}
                  alt="Portakal Çiçeği Atölyesi el yapımı 3D akrilik hatıra tasarımı"
                  fill
                  priority
                  sizes="(max-width: 1024px) 90vw, 460px"
                  className="object-cover"
                />
              </div>

              {/* Material Detail Overlay - Straight Edge */}
              <div className="absolute bottom-4 left-4 right-4 z-20 bg-[#FDFBF7]/95 backdrop-blur-md rounded-none p-3.5 border border-[#EDE6DF]">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-serif text-xs font-bold text-[#1E1C1A]">
                      Butik Ev Atölyesi
                    </p>
                    <p className="font-sans text-[11px] text-[#696159] mt-0.5">
                      Magnet • Cake Topper • Kapı Süsü
                    </p>
                  </div>
                  <span className="text-[10px] font-sans font-semibold uppercase tracking-wider text-[#C86D51] bg-[#C86D51]/10 px-2 py-0.5 rounded-none">
                    Kişiye Özel
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
