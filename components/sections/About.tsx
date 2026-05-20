"use client";

import { motion } from "framer-motion";

export default function About() {
  return (
    <section id="hakkinda" className="bg-brand-bg-gray py-24 px-6 overflow-hidden">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        {/* Left Column: Text */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7 }}
          className="space-y-6 flex flex-col justify-center"
        >
          <span className="text-xs md:text-sm font-sans tracking-widest text-brand-orange font-bold uppercase">
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

        {/* Right Column: Visual Placeholder */}
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7, delay: 0.15 }}
          className="w-full flex justify-center"
        >
          <div className="w-full max-w-md aspect-square bg-brand-bg-cream rounded-2xl shadow-xl flex flex-col items-center justify-center p-8 text-center space-y-4 hover:scale-[1.02] transition-transform duration-300">
            <span className="text-8xl select-none">🍊</span>
            <p className="font-serif text-xl font-semibold text-brand-text-dark">
              Ürün görseli yakında
            </p>
            <p className="font-sans text-xs md:text-sm text-[#777777] max-w-xs leading-relaxed">
              Atölyemizin özgün, çok katmanlı 3D akrilik tasarımlarından bir kesit burada sergilenecektir.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
