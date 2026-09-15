"use client";

import { motion } from "framer-motion";
import { Sparkles, Layers, PackageCheck } from "lucide-react";

const steps = [
  {
    stepNumber: "01",
    icon: Sparkles,
    title: "Hayalinizi & Modelinizi Seçin",
    description: "Magnet, cake topper veya kapı süsü için beğendiğiniz modeli, bebeğinizin/çiftin ismini ve kutlama temanızı WhatsApp'tan iletin.",
    detail: "Tekil ürünler veya 25+ adetlik toplu magnet siparişleri.",
  },
  {
    stepNumber: "02",
    icon: Layers,
    title: "WhatsApp'ta 1'e 1 Taslak Onayı",
    description: "Yazı tipi, renk katmanları ve ölçüleri içeren dijital tasarım görselini WhatsApp'tan onayınıza sunalım. Siz 'tamam' demeden üretime geçmiyoruz.",
    detail: "Tüm kişiselleştirme ve taslak revizeleri ücretsizdir.",
  },
  {
    stepNumber: "03",
    icon: PackageCheck,
    title: "Ev Atölyemizde Üretim & Kargo",
    description: "Onayınızın ardından her parçayı lazerle kesip tek tek elde monte ediyoruz. Kırılmaya karşı korumalı şık kutularda kapınıza gönderiyoruz.",
    detail: "Kargoda olası en ufak hasarda ücretsiz anında telafi.",
  },
];

export default function HowItWorks() {
  return (
    <section id="nasil-calisir" aria-label="Nasıl Çalışır" className="bg-[#F5EFEB] py-16 md:py-20 px-4 sm:px-6 lg:px-8 border-b border-[#EDE6DF] overflow-hidden">
      <div className="max-w-7xl mx-auto space-y-12">
        
        {/* Editorial Header */}
        <div className="max-w-2xl text-left space-y-3">
          <h2 className="font-serif text-3xl sm:text-4xl text-[#1E1C1A] font-bold tracking-tight">
            Siparişten Teslimata Üç Aşamalı Atölye Süreci
          </h2>
          <p className="font-sans text-sm sm:text-base text-[#696159] leading-relaxed">
            Kutlamanızın konseptine en uygun tasarımı birlikte belirleyip, şeffaf ve özenli bir süreçle hazırlıyoruz.
          </p>
        </div>

        {/* Linear Journey Architecture - Straight Edges */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-10 relative">
          {steps.map((step, idx) => {
            const Icon = step.icon;
            return (
              <motion.div
                key={step.stepNumber}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.12, ease: [0.16, 1, 0.3, 1] }}
                className="relative flex flex-col justify-between p-8 rounded-none bg-white border border-[#EDE6DF] hover:border-[#C86D51] transition-all duration-200 space-y-6 text-left"
              >
                {/* Step Indicator & Icon Header */}
                <div className="flex items-center justify-between">
                  <div className="w-11 h-11 rounded-none bg-[#C86D51]/10 border border-[#C86D51]/20 flex items-center justify-center text-[#C86D51]">
                    <Icon size={20} strokeWidth={1.8} />
                  </div>
                  <span className="font-serif text-2xl font-bold text-[#696159]/30 tracking-wider">
                    {step.stepNumber}
                  </span>
                </div>

                {/* Content */}
                <div className="space-y-2 flex-grow">
                  <h3 className="font-serif text-lg sm:text-xl font-bold text-[#1E1C1A]">
                    {step.title}
                  </h3>
                  <p className="font-sans text-xs sm:text-sm text-[#696159] leading-relaxed">
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
