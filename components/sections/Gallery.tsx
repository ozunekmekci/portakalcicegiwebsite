"use client";

import { motion } from "framer-motion";
import { Instagram, ArrowUpRight } from "lucide-react";
import Image from "next/image";

export default function Gallery() {
  return (
    <section id="galeri" aria-label="Atölye Galerisi" className="bg-[#FDFBF7] py-24 px-4 sm:px-6 lg:px-8 border-b border-[#EDE6DF] overflow-hidden">
      <div className="max-w-7xl mx-auto space-y-12">
        
        {/* Editorial Header (No eyebrow) */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-6">
          <div className="max-w-xl text-left space-y-2">
            <h2 className="font-serif text-3xl sm:text-4xl text-[#1E1C1A] font-bold tracking-tight">
              Ellerimizden Çıkan Her Detay
            </h2>
            <p className="font-sans text-sm sm:text-base text-[#696159] leading-relaxed">
              Gerçek siparişlerden, atölye masasından ve kutlama sofralarından objektifimize yansıyan hatıralar.
            </p>
          </div>

          <a
            href="https://www.instagram.com/portakalcicegi.atolye/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 border border-[#EDE6DF] bg-white hover:border-[#D95A2B]/40 hover:text-[#D95A2B] text-[#1E1C1A] transition-all duration-300 rounded-full px-5 py-2.5 text-xs sm:text-sm font-medium font-sans shadow-soft-sm self-start sm:self-auto"
          >
            <Instagram size={15} className="text-[#D95A2B]" />
            <span>Instagram&apos;da Takip Et</span>
            <ArrowUpRight size={14} />
          </a>
        </div>

        {/* Gallery Grid (8 Items, balanced, subtle borders) */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
          {Array.from({ length: 8 }).map((_, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.05 }}
              className="relative aspect-square rounded-2xl overflow-hidden bg-[#F5EFEB] border border-[#EDE6DF] shadow-soft-sm group cursor-pointer"
            >
              <Image
                src={`/images/gallery-${index + 1}.webp`}
                alt={`Portakal Çiçeği Atölyesi el yapımı tasarım detayları ${index + 1}`}
                fill
                sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                loading="lazy"
                className="object-cover transition-transform duration-700 group-hover:scale-[1.04]"
              />
              <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
