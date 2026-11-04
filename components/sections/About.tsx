"use client";

import { motion } from "framer-motion";
import Image from "next/image";

interface AboutProps {
  settings?: Record<string, string>;
}

export default function About({ settings = {} }: AboutProps) {
  const titleText = settings.about_title || "Kutlaman için\nev atölyemizde hazırlıyoruz.";
  const text1 =
    settings.about_text_1 ||
    "Evimizdeki atölyede kendi çizimlerimizle, çok katmanlı 3D akrilik ürünler hazırlıyoruz. İsimli pasta süsü ve kapı süsünü 1 adet, hatıra magnetlerini 25 adet ve üzeri sipariş edebilirsin. Her parçayı tek tek elde birleştiriyoruz.";
  const text2 =
    settings.about_text_2 ||
    "Instagram’dan (@portakalcicegi.atolye) bize yazabilirsin. Taslağı WhatsApp’tan gönderiyor, sen onayladıktan sonra üretime başlıyoruz. Kargoda bir parça kırılırsa yenisini hemen ücretsiz gönderiyoruz.";
  const quoteText =
    settings.about_quote ||
    "Her parçayı ev atölyemizde ellerimizle hazırlıyoruz.";
  const imageSrc = settings.about_image || "/images/about.webp";

  return (
    <section id="hakkinda" aria-label="Hakkımızda" className="bg-[#FDFBF7] py-20 px-4 sm:px-6 lg:px-8 border-b border-[#EDE6DF] overflow-hidden">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
        
        {/* Left Column: Atelier Narrative & Manifesto */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="lg:col-span-7 space-y-6 flex flex-col justify-center text-left"
        >
          {/* Headline */}
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-[#1E1C1A] leading-tight font-bold whitespace-pre-line tracking-tight">
            {titleText}
          </h2>

          <p className="font-sans text-sm sm:text-base text-[#696159] leading-relaxed">
            {text1}
          </p>

          {text2 && (
            <p className="font-sans text-sm sm:text-base text-[#696159] leading-relaxed">
              {text2}
            </p>
          )}

          {/* Editorial Quote Box - Straight Edges */}
          {quoteText && (
            <div className="p-6 rounded-none bg-[#F5EFEB] border border-[#EDE6DF]">
              <p className="font-serif text-base sm:text-lg text-[#1E1C1A] italic leading-relaxed">
                &ldquo;{quoteText}&rdquo;
              </p>
              <span className="font-sans text-[11px] uppercase tracking-widest text-[#C86D51] font-semibold mt-3 block">
                Portakal Çiçeği Atölye
              </span>
            </div>
          )}
        </motion.div>

        {/* Right Column: Visual Atelier Photo - Straight Edges */}
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
          className="lg:col-span-5 flex justify-center"
        >
          <div className="relative w-full max-w-[440px] aspect-square rounded-none overflow-hidden bg-white border border-[#EDE6DF] shadow-soft-md p-2">
            <div className="relative w-full h-full rounded-none overflow-hidden bg-[#F5EFEB]">
              <Image
                src={imageSrc}
                alt="Portakal Çiçeği Atölyesi el yapımı tasarım detayları ve akrilik işçiliği"
                fill
                sizes="(max-width: 1024px) 100vw, 440px"
                className="object-cover"
              />
            </div>
          </div>
        </motion.div>

      </div>
    </section>
  );
}
