"use client";

import { motion } from "framer-motion";

export default function Hero() {
  const handleScrollToCollections = () => {
    document.getElementById("koleksiyonlar")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section aria-label="Karşılama" className="relative min-h-screen bg-brand-bg-cream flex flex-col items-center justify-center pt-20 px-4 overflow-hidden">
      {/* Decorative Blob Right-Bottom */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 0.1, scale: 1 }}
        transition={{ duration: 1.2, delay: 0.6, ease: "easeOut" }}
        className="absolute right-0 bottom-0 w-48 h-48 md:w-96 md:h-96 bg-brand-orange rounded-full blur-3xl pointer-events-none"
      />
      {/* Decorative Blob Left-Top */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 0.05, scale: 1 }}
        transition={{ duration: 1.5, delay: 0.8, ease: "easeOut" }}
        className="absolute -left-10 -top-10 w-40 h-40 md:-left-20 md:-top-20 md:w-80 md:h-80 bg-brand-orange-dark rounded-full blur-3xl pointer-events-none"
      />

      <div className="relative z-10 max-w-4xl mx-auto text-center flex flex-col items-center justify-center space-y-6 md:space-y-8">
        {/* Upper Badge */}
        <motion.span
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0 }}
          className="text-xs md:text-sm font-sans tracking-widest text-brand-orange-dark font-bold uppercase"
        >
          ÖZEL TASARIM • EL YAPIMI • HATIRLIK
        </motion.span>

        {/* Main Title */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.15 }}
          className="font-serif text-4xl sm:text-5xl md:text-7xl lg:text-8xl text-brand-text-dark leading-tight font-bold whitespace-pre-line"
        >
          Her Kutlama,<br />
          Bir <span className="text-brand-orange-dark relative inline-block">
            Sanat Eseri
            <span className="absolute bottom-1 left-0 w-full h-[6px] bg-brand-orange/20 rounded-full -z-10"></span>
          </span>
        </motion.h1>

        {/* Description */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="font-sans text-base md:text-lg lg:text-xl text-[#555555] max-w-xl mx-auto leading-relaxed whitespace-pre-line"
        >
          Doğum, baby shower, düğün ve nişanlarınız için{"\n"}özel tasarım, 3D akrilik hediyelikler.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.45 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4 w-full sm:w-auto"
        >
          <button
            onClick={handleScrollToCollections}
            className="w-full sm:w-auto px-8 py-3.5 bg-brand-orange text-white rounded-full font-semibold shadow-md shadow-brand-orange/20 hover:bg-brand-orange/90 hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 cursor-pointer text-center"
          >
            Koleksiyonları Keşfet
          </button>
          
          <a
            href="https://wa.me/90XXXXXXXXXXX"
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto px-8 py-3.5 border-2 border-brand-orange-dark text-brand-orange-dark font-semibold rounded-full hover:bg-brand-orange-dark hover:text-white hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 text-center"
          >
            Sipariş Ver
          </a>
        </motion.div>
      </div>
    </section>
  );
}
