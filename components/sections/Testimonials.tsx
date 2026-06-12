"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { Star } from "lucide-react";
import { Testimonial } from "@/lib/db-queries";
import { getOptimizedUrl } from "@/lib/cloudinary";

interface TestimonialsProps {
  testimonials?: Testimonial[];
}

export default function Testimonials({ testimonials = [] }: TestimonialsProps) {
  // Use first active testimonial from the database or fall back to a premium default
  const activeTestimonial = testimonials.length > 0 
    ? testimonials[0] 
    : {
        name: "Merve & Caner (Gelin & Damat)",
        text: "Düğün hatıralarımız için pleksi magnet siparişi verdik. Tasarımın inceliği, detaylardaki Akdeniz esintisi ve 3D akrilik işçilik gerçekten olağanüstüydü. Misafirlerimizden aldığımız geri dönüşler harikaydı, hediyelikler kelimenin tam anlamıyla saklanmalık birer sanat eseri oldu."
      };

  return (
    <section id="referanslar" aria-label="Müşteri Yorumları" className="bg-[#fbf7f0] py-24 border-t border-b border-[#eaeaea]">
      <div className="max-w-[1400px] mx-auto px-8 md:px-[42px] flex flex-col lg:flex-row gap-[74px] items-center justify-between">
        
        {/* Left Box - Review Text (max-w-[530px]) */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="w-full lg:max-w-[530px] flex flex-col justify-center text-left"
        >
          {/* 5 Black Star Icons */}
          <div className="flex items-center gap-1.5 text-black mb-6">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star key={i} size={22} fill="currentColor" stroke="currentColor" className="text-black" />
            ))}
          </div>

          {/* Customer Quote (24px size) */}
          <blockquote className="font-serif text-[24px] leading-snug font-bold text-[#1a1a1a] tracking-tight">
            &ldquo;{activeTestimonial.text}&rdquo;
          </blockquote>

          {/* Author Name */}
          <cite className="not-italic font-sans text-xs md:text-sm font-bold uppercase tracking-widest text-[#fa3500] mt-6 block">
            {activeTestimonial.name}
          </cite>
        </motion.div>

        {/* Right Box - Vertical Image (w-[530px] h-[695px] on desktop) */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="relative w-full max-w-[530px] lg:w-[530px] h-[450px] lg:h-[695px] bg-[#fbf7f0] rounded-3xl overflow-hidden shadow-sm flex-shrink-0"
        >
          <Image
            src={getOptimizedUrl("/images/testimonial_side.png", { width: 600, height: 800, crop: "fill" })}
            alt="Atölye Tasarım Konsepti"
            fill
            sizes="(max-w-1024px) 100vw, 530px"
            className="object-cover transition-transform duration-700 hover:scale-103"
            unoptimized
          />
        </motion.div>

      </div>
    </section>
  );
}
