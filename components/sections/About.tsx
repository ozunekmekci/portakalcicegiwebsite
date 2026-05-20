"use client";

import { motion } from "framer-motion";
import Image from "next/image";

export default function About() {
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
          <span className="text-xs md:text-sm font-sans tracking-widest text-brand-orange-dark font-bold uppercase">
            HAKKIMIZDA
          </span>
          <h2 className="font-serif text-4xl md:text-5xl text-brand-text-dark leading-tight font-bold whitespace-pre-line">
            Detaylar önemlidir.<br />
            Biz buna inanıyoruz.
          </h2>
          <p className="font-sans text-base text-[#555555] leading-relaxed">
            Portakal Çiçeği Atölye olarak her hediyeliği, saklanmaya değer bir hatıraya 
            dönüştürmek için tasarlıyoruz. Jenerik, seri üretim seçeneklerin aksine, 
            her tasarımımız özgün illüstrasyonlar ve çok katmanlı 3D akrilik işçilikle hayat buluyor.
          </p>
          <p className="font-sans text-base text-[#555555] leading-relaxed">
            Doğum, baby shower, düğün ve nişan gibi hayatın en özel anları için 
            100 adetten fazla siparişleri sanatsal kaliteden ödün vermeden teslim ediyoruz.
          </p>
          <div className="border-l-4 border-brand-orange pl-4 italic text-brand-orange-dark font-serif text-lg leading-relaxed">
            &ldquo;Her hediyelik bir sanat eseri, her kutlama bir anı.&rdquo;
          </div>
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
              src="/images/about.webp"
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
