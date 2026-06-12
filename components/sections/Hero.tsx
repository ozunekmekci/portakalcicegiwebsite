"use client";

import { motion } from "framer-motion";

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

  const titleText = settings.hero_title || "Özel günlerinize Akdeniz esintisi. Ömür boyu saklanan premium hatıralar.";
  const descriptionText = settings.hero_description || "Doğum, baby shower, düğün ve nişanlarınız için atölyemizde özenle tasarlanan, çok katmanlı 3D akrilik ve pleksi hatıra hediyelikler.";
  const heroImage = settings.hero_image || "/images/hero_bg.png";

  return (
    <section 
      aria-label="Karşılama" 
      className="relative w-full h-[60vh] md:h-[55vh] md:max-h-[550px] flex items-center overflow-hidden bg-brand-text-dark"
    >
      {/* Background Image with Overlay */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url('${heroImage}')` }}
      />
      <div className="absolute inset-0 bg-black/40 backdrop-blur-[1px]" />

      {/* Content Container (1400px container logic) */}
      <div className="relative z-10 w-full max-w-[1400px] mx-auto px-4 md:px-8">
        <div className="pl-4 md:pl-16 max-w-[632px] text-left flex flex-col justify-center items-start space-y-4 md:space-y-6">
          {/* Main Title */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.15 }}
            className="font-serif text-3xl sm:text-4xl md:text-5xl lg:text-[42px] text-[#fbf7f0] leading-tight font-bold tracking-tight"
          >
            {titleText}
          </motion.h1>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="font-sans text-sm sm:text-base text-[#fbf7f0]/85 leading-relaxed"
          >
            {descriptionText}
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.45 }}
            className="flex flex-row items-center gap-4 pt-2 w-full sm:w-auto"
          >
            <button
              onClick={handleScrollToCollections}
              className="px-6 py-3 bg-brand-orange text-[#fbf7f0] rounded-full font-semibold shadow-md shadow-brand-orange/20 hover:bg-brand-orange/90 hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 cursor-pointer text-sm font-sans"
            >
              Koleksiyonları Keşfet
            </button>
            
            <a
              href={`https://wa.me/${waNumber}`}
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3 border-2 border-[#fbf7f0] text-[#fbf7f0] font-semibold rounded-full hover:bg-[#fbf7f0] hover:text-brand-text-dark hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 text-sm font-sans text-center"
            >
              Sipariş Ver
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
