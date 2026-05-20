"use client";

import { motion } from "framer-motion";
import { Instagram } from "lucide-react";

export default function Gallery() {
  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.05,
      },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut" as const,
      },
    },
  };

  return (
    <section id="galeri" aria-label="Galeri" className="bg-brand-bg-cream py-24 px-6 overflow-hidden">
      <div className="max-w-6xl mx-auto space-y-16">
        {/* Header Block */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center space-y-4 max-w-xl mx-auto"
        >
          <span className="text-xs md:text-sm font-sans tracking-widest text-brand-orange font-bold uppercase">
            GALERİ
          </span>
          <h2 className="font-serif text-4xl md:text-5xl text-brand-text-dark leading-tight font-bold whitespace-pre-line">
            Ellerimizden çıkan<br />
            her detay.
          </h2>
          <p className="font-sans text-base text-brand-text-mid">
            Gerçek siparişlerden kareler.
          </p>
        </motion.div>

        {/* Grid Container */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4"
        >
          {Array.from({ length: 8 }).map((_, index) => {
            const isEven = index % 2 === 0;
            const bgClass = isEven ? "bg-[#dcdcd9]" : "bg-[#e8e0d4]";
            return (
              <motion.div
                key={index}
                variants={cardVariants}
                whileHover={{ scale: 1.03 }}
                className={`${bgClass} aspect-square rounded-2xl flex flex-col items-center justify-center p-4 text-center cursor-pointer shadow-sm hover:shadow-md transition-shadow duration-300 select-none space-y-2`}
              >
                <span className="text-4xl">📷</span>
                <span className="text-xs font-sans text-brand-text-dark/60 font-medium">
                  Fotoğraf yakında
                </span>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Footer Link */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center pt-4 space-y-4 flex flex-col items-center"
        >
          <p className="font-sans text-sm text-brand-text-mid">
            Daha fazlası için Instagram&apos;ı takip edin
          </p>
          <a
            href="https://www.instagram.com/portakalcicegi.atolye/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 border border-brand-orange text-brand-orange hover:bg-brand-orange hover:text-white transition-all duration-300 rounded-full px-6 py-2.5 text-sm font-medium font-sans shadow-sm"
          >
            <Instagram className="w-4 h-4" />
            Instagram&apos;da Takip Et
          </a>
        </motion.div>
      </div>
    </section>
  );
}
