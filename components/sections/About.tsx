"use client";

import { motion } from "framer-motion";
import Image from "next/image";

interface AboutProps {
  settings?: Record<string, string>;
}

export default function About({ settings = {} }: AboutProps) {
  const badgeText = settings.about_badge || "HAKKIMIZDA";
  const titleText = settings.about_title || "Detaylar önemlidir.\nBiz buna inanıyoruz.";
  const text1 = settings.about_text_1 || "Portakal Çiçeği Atölye olarak her hediyeliği, saklanmaya değer bir hatıraya dönüştürmek için tasarlıyoruz. Jenerik, seri üretim seçeneklerin aksine, her tasarımımız özgün illüstrasyonlar ve çok katmanlı 3D akrilik işçilikle hayat buluyor.";
  const text2 = settings.about_text_2 || "Doğum, baby shower, düğün ve nişan gibi hayatın en özel anları için 100 adetten fazla siparişleri sanatsal kaliteden ödün vermeden teslim ediyoruz.";
  const quoteText = settings.about_quote || "Her hediyelik bir sanat eseri, her kutlama bir anı.";
  const imageSrc = settings.about_image || "/images/about.webp";

  return (
    <section id="hakkinda" aria-label="Hakkımızda" className="bg-brand-bg-gray py-24 px-6 overflow-hidden">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center">
        {/* Left Column: Text */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7 }}
          className="space-y-6 flex flex-col justify-center"
        >
          <span className="text-xs md:text-sm font-sans tracking-widest text-[#fa3500] font-bold uppercase">
            {badgeText}
          </span>
          <h2 className="font-serif text-4xl md:text-5xl text-brand-text-dark leading-tight font-bold whitespace-pre-line">
            {titleText}
          </h2>
          <p className="font-sans text-base text-[#555555] leading-relaxed">
            {text1}
          </p>
          {text2 && (
            <p className="font-sans text-base text-[#555555] leading-relaxed">
              {text2}
            </p>
          )}
          {quoteText && (
            <div className="border-l-4 border-brand-orange pl-4 italic text-brand-orange-dark font-serif text-lg leading-relaxed">
              &ldquo;{quoteText}&rdquo;
            </div>
          )}
        </motion.div>

        {/* Right Column: Visual Showcase */}
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7, delay: 0.15 }}
          className="w-full flex justify-center"
        >
          <div className="w-full max-w-md aspect-square relative rounded-2xl shadow-xl overflow-hidden hover:scale-[1.02] transition-transform duration-300">
            <Image
              src={imageSrc}
              alt="Portakal Çiçeği Atölyesi el yapımı tasarım ürünleri"
              fill
              sizes="(max-w-768px) 100vw, (max-w-1200px) 50vw, 450px"
              priority
              className="object-cover"
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
