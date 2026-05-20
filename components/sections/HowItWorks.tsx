"use client";

import { motion } from "framer-motion";
import { Palette, Pencil, Package } from "lucide-react";

const steps = [
  {
    number: "01",
    icon: Palette,
    title: "Koleksiyonu Seç",
    description: "Tasarım kataloğumuza göz atın, beğendiğiniz koleksiyonu seçin.",
  },
  {
    number: "02",
    icon: Pencil,
    title: "Kişiselleştir",
    description: "İsim, tarih ve özel notlarınızı bizimle paylaşın. Her detay özenle işlenir.",
  },
  {
    number: "03",
    icon: Package,
    title: "Teslim Alın",
    description: "Özenle paketlenmiş siparişiniz kapınıza gelir. 100+ adet siparişlerde özel fiyat.",
  },
];

export default function HowItWorks() {
  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.15,
      },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut" as const,
      },
    },
  };


  return (
    <section id="nasil-calisir" aria-label="Nasıl Çalışır" className="bg-brand-bg-cream py-24 px-6 overflow-hidden">
      <div className="max-w-5xl mx-auto space-y-16">
        {/* Header Block */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center space-y-4 max-w-xl mx-auto"
        >
          <span className="text-xs md:text-sm font-sans tracking-widest text-brand-orange-dark font-bold uppercase">
            NASIL ÇALIŞIR
          </span>
          <h2 className="font-serif text-4xl md:text-5xl text-brand-text-dark leading-tight font-bold whitespace-pre-line">
            Siparişten teslimata<br />
            üç adım.
          </h2>
          <p className="font-sans text-base text-brand-text-mid">
            Hızlı, şeffaf ve sanatsal bir süreç.
          </p>
        </motion.div>

        {/* Steps Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
        >
          {steps.map((step, index) => {
            const Icon = step.icon;
            return (
              <motion.div
                key={index}
                variants={cardVariants}
                whileHover={{ 
                  y: -4, 
                  boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.05), 0 4px 6px -2px rgba(0, 0, 0, 0.02)" 
                }}
                className="relative bg-white rounded-2xl p-8 shadow-sm transition-shadow duration-300 flex flex-col items-start space-y-6 overflow-hidden border border-[#eaeaea]"
              >
                {/* Back Number */}
                <span className="absolute top-4 right-4 text-7xl font-serif text-brand-orange opacity-20 select-none font-bold">
                  {step.number}
                </span>

                {/* Icon Container */}
                <div className="w-12 h-12 rounded-xl bg-brand-orange/10 flex items-center justify-center text-brand-orange">
                  <Icon className="w-6 h-6" />
                </div>

                {/* Content */}
                <div className="space-y-2 relative z-10">
                  <h3 className="font-serif text-xl font-bold text-brand-text-dark">
                    {step.title}
                  </h3>
                  <p className="font-sans text-sm text-brand-text-mid leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
