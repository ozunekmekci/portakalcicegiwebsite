"use client";

import { motion } from "framer-motion";
import { Sparkles, Layers, PackageCheck } from "lucide-react";

const steps = [
  {
    stepNumber: "01",
    icon: Sparkles,
    title: "Model & Konsept Seçimi",
    description: "Kataloğumuzdan veya Instagram seçkilerimizden etkinliğinizin ruhuna uyan pleksi formunu ve renk paletini seçin.",
    detail: "100+ adetlik toplu siparişlerinizde özel adet indirimi uygulanır.",
  },
  {
    stepNumber: "02",
    icon: Layers,
    title: "Kişiye Özel Tasarım & Onay",
    description: "İsim, tarih, yazı tipi ve akrilik katman tercihlerini WhatsApp üzerinden doğrudan atölye tasarımcımızla netleştirin.",
    detail: "Üretime geçilmeden önce dijital yerleşim onayı alınır.",
  },
  {
    stepNumber: "03",
    icon: PackageCheck,
    title: "El İşçiliği & Özenli Teslimat",
    description: "Her bir hatıralık atölyemizde tek tek incelenir, montajı yapılır ve özel korumalı kutularda adresinize ulaştırılır.",
    detail: "Etkinlik tarihinize tam zamanında yetişecek şekilde kargolanır.",
  },
];

export default function HowItWorks() {
  return (
    <section id="nasil-calisir" aria-label="Nasıl Çalışır" className="bg-[#F5EFEB] py-20 px-4 sm:px-6 lg:px-8 border-b border-[#EDE6DF] overflow-hidden">
      <div className="max-w-7xl mx-auto space-y-16">
        
        {/* Editorial Header (No eyebrow label) */}
        <div className="max-w-2xl text-left space-y-3">
          <h2 className="font-serif text-3xl sm:text-4xl text-[#1E1C1A] font-bold tracking-tight">
            Siparişten Teslimata Üç Aşamalı Atölye Süreci
          </h2>
          <p className="font-sans text-sm sm:text-base text-[#696159] leading-relaxed">
            Kutlamanızın konseptine en uygun tasarımı birlikte belirleyip, şeffaf ve özenli bir süreçle hazırlıyoruz.
          </p>
        </div>

        {/* Linear Journey Architecture */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-10 relative">
          {steps.map((step, idx) => {
            const Icon = step.icon;
            return (
              <motion.div
                key={step.stepNumber}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.12, ease: [0.16, 1, 0.3, 1] }}
                className="relative flex flex-col justify-between p-8 rounded-2xl bg-[#FDFBF7] border border-[#EDE6DF] shadow-soft-sm hover:shadow-soft-md transition-all duration-300 space-y-6"
              >
                {/* Step Indicator & Icon Header */}
                <div className="flex items-center justify-between">
                  <div className="w-12 h-12 rounded-xl bg-[#D95A2B]/10 border border-[#D95A2B]/20 flex items-center justify-center text-[#D95A2B]">
                    <Icon size={22} strokeWidth={1.8} />
                  </div>
                  <span className="font-serif text-2xl font-bold text-[#696159]/40 tracking-wider">
                    {step.stepNumber}
                  </span>
                </div>

                {/* Content */}
                <div className="space-y-2.5 flex-grow">
                  <h3 className="font-serif text-xl font-bold text-[#1E1C1A]">
                    {step.title}
                  </h3>
                  <p className="font-sans text-sm text-[#696159] leading-relaxed">
                    {step.description}
                  </p>
                </div>

                {/* Subtle Pillar Highlight */}
                <div className="pt-4 border-t border-[#EDE6DF] text-xs font-sans font-medium text-[#5A6855]">
                  ✦ {step.detail}
                </div>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
