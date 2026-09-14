"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { Star } from "lucide-react";
import { Testimonial } from "@/lib/db-queries";
import { getOptimizedUrl } from "@/lib/cloudinary";

interface TestimonialsProps {
  testimonials?: Testimonial[];
  settings?: Record<string, string>;
}

export default function Testimonials({ testimonials = [], settings = {} }: TestimonialsProps) {
  const activeTestimonial =
    testimonials.length > 0
      ? testimonials[0]
      : {
          name: "Merve & Caner",
          text: "Düğün hatıralarımız için pleksi magnet siparişi verdik. Tasarımın inceliği, detaylardaki Akdeniz esintisi ve 3D akrilik işçilik gerçekten olağanüstüydü. Misafirlerimizden aldığımız geri dönüşler harikaydı; hediyelikler kelimenin tam anlamıyla saklanmalık birer sanat eseri oldu.",
        };

  const sideImage = settings.testimonial_image || "/images/testimonial_side.webp";

  return (
    <section id="referanslar" aria-label="Müşteri Hatıraları" className="bg-[#F5EFEB] py-24 px-4 sm:px-6 lg:px-8 border-b border-[#EDE6DF] overflow-hidden">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
        
        {/* Left Column: Review Text & Warm Attribution */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="lg:col-span-7 flex flex-col justify-center text-left space-y-6"
        >
          {/* Subtle Star Rating (Refined amber, small) */}
          <div className="flex items-center gap-1 text-[#D49B35]">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star key={i} size={15} fill="#D49B35" stroke="none" />
            ))}
            <span className="ml-2 text-xs font-sans text-[#696159] font-medium">
              Özenli İşçilik & Memnuniyet
            </span>
          </div>

          {/* Customer Quote */}
          <blockquote className="font-serif text-xl sm:text-2xl lg:text-3xl leading-snug font-medium text-[#1E1C1A] tracking-tight">
            &ldquo;{activeTestimonial.text}&rdquo;
          </blockquote>

          {/* Author Details */}
          <div className="pt-2 border-t border-[#EDE6DF] flex flex-col">
            <span className="font-serif text-base font-bold text-[#1E1C1A]">
              {activeTestimonial.name}
            </span>
            <span className="font-sans text-xs text-[#696159] mt-0.5">
              Düğün & Nişan Hatıra Siparişi (150 Adet)
            </span>
          </div>
        </motion.div>

        {/* Right Column: Vertical Image Showcase */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.75, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
          className="lg:col-span-5 flex justify-center lg:justify-end"
        >
          <div className="relative w-full max-w-[440px] aspect-[3/4] bg-[#FDFBF7] rounded-[32px] overflow-hidden border border-[#EDE6DF] shadow-soft-md p-2">
            <div className="relative w-full h-full rounded-[24px] overflow-hidden">
              <Image
                src={getOptimizedUrl(sideImage, { width: 600, height: 800, crop: "fill" })}
                alt="Portakal Çiçeği Atölyesi tasarım ve kutlama anısı"
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
