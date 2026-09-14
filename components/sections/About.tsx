"use client";

import { motion } from "framer-motion";
import Image from "next/image";

interface AboutProps {
  settings?: Record<string, string>;
}

export default function About({ settings = {} }: AboutProps) {
  const titleText = settings.about_title || "Detaylar önemlidir.\nBiz buna inanıyoruz.";
  const text1 =
    settings.about_text_1 ||
    "Portakal Çiçeği Atölye olarak her hediyeliği, kutlamanın ertesi günü unutulmayacak ve bir ömür saklanmaya değer bir hatıraya dönüştürmek için tasarlıyoruz. Jenerik, seri üretim seçeneklerin aksine, her tasarımımız özgün illüstrasyonlar ve çok katmanlı 3D akrilik işçilikle hayat buluyor.";
  const text2 =
    settings.about_text_2 ||
    "Doğum, baby shower, düğün ve nişan gibi hayatın en özel anları için 100 adetten fazla siparişleri sanatsal kaliteden ödün vermeden, tek tek elde kontrol ederek teslim ediyoruz.";
  const quoteText =
    settings.about_quote ||
    "Detaylar önemlidir. Hediyeliklerimiz kutlamanın ertesi günü unutulmaz — bir ömür saklanır.";
  const imageSrc = settings.about_image || "/images/about.webp";

  return (
    <section id="hakkinda" aria-label="Hakkımızda" className="bg-[#FDFBF7] py-24 px-4 sm:px-6 lg:px-8 border-b border-[#EDE6DF] overflow-hidden">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
        
        {/* Left Column: Atelier Narrative & Manifesto */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="lg:col-span-7 space-y-6 flex flex-col justify-center text-left"
        >
          {/* Headline without eyebrow */}
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-[#1E1C1A] leading-tight font-bold whitespace-pre-line tracking-tight">
            {titleText}
          </h2>

          <p className="font-sans text-base sm:text-lg text-[#696159] leading-relaxed">
            {text1}
          </p>

          {text2 && (
            <p className="font-sans text-base text-[#696159] leading-relaxed">
              {text2}
            </p>
          )}

          {/* Editorial Quote Box (Replacing side-tab accent stripe) */}
          {quoteText && (
            <div className="p-6 rounded-2xl bg-[#F5EFEB] border border-[#EDE6DF] shadow-soft-sm">
              <p className="font-serif text-lg sm:text-xl text-[#1E1C1A] italic leading-relaxed">
                &ldquo;{quoteText}&rdquo;
              </p>
              <span className="font-sans text-xs uppercase tracking-widest text-[#D95A2B] font-semibold mt-3 block">
                Portakal Çiçeği Atölye Manifestosu
              </span>
            </div>
          )}
        </motion.div>

        {/* Right Column: Visual Atelier Photo */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.75, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
          className="lg:col-span-5 flex justify-center"
        >
          <div className="relative w-full max-w-[440px] aspect-square rounded-[32px] overflow-hidden bg-[#F5EFEB] border border-[#EDE6DF] shadow-soft-md p-2">
            <div className="relative w-full h-full rounded-[24px] overflow-hidden">
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
