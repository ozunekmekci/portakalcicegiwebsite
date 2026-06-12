"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { MessageSquare } from "lucide-react";
import { Testimonial } from "@/lib/db-queries";
import { getOptimizedUrl } from "@/lib/cloudinary";

interface TestimonialsProps {
  testimonials: Testimonial[];
}

export default function Testimonials({ testimonials }: TestimonialsProps) {
  if (!testimonials || testimonials.length === 0) return null;

  return (
    <section id="referanslar" aria-label="Müşteri Yorumları" className="bg-[#fbf7f0] py-24 px-6 overflow-hidden">
      <div className="max-w-6xl mx-auto space-y-16">
        
        {/* Header Block */}
        <div className="text-center space-y-4 max-w-xl mx-auto">
          <span className="text-xs md:text-sm font-sans tracking-widest text-[#fa3500] font-bold uppercase">
            MÜŞTERİ YORUMLARI
          </span>
          <h2 className="font-serif text-4xl md:text-5xl text-[#1a1a1a] leading-tight font-bold whitespace-pre-line">
            Mutlu anlara<br />
            ortak olduk.
          </h2>
          <p className="font-sans text-base text-[#555555]">
            Çiftlerimizin ve ailelerimizin bizimle ilgili paylaştığı değerli yorumlar.
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((item, idx) => {
            const avatarSrc = item.avatar
              ? getOptimizedUrl(item.avatar, { width: 150, height: 150 })
              : null;

            return (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: idx * 0.12, ease: "easeOut" }}
                className="bg-white border border-[#eaeaea] rounded-3xl p-8 flex flex-col justify-between h-full shadow-sm hover:shadow-md transition-shadow duration-300 relative"
              >
                {/* Quote decoration */}
                <div className="absolute top-6 right-8 text-brand-orange/15 select-none pointer-events-none">
                  <span className="font-serif text-6xl">&ldquo;</span>
                </div>

                <div className="space-y-4 relative z-10 flex-grow">
                  <p className="font-sans text-sm text-[#555555] leading-relaxed italic">
                    &ldquo;{item.text}&rdquo;
                  </p>
                </div>

                {/* Customer Profile Row */}
                <div className="flex items-center gap-4 pt-6 mt-6 border-t border-gray-100 relative z-10">
                  <div className="relative w-12 h-12 rounded-full overflow-hidden bg-[#fbf7f0] border border-gray-100 flex items-center justify-center flex-shrink-0">
                    {avatarSrc ? (
                      <Image
                        src={avatarSrc}
                        alt={item.name}
                        fill
                        sizes="48px"
                        className="object-cover"
                        unoptimized
                      />
                    ) : (
                      <MessageSquare className="text-brand-orange" size={20} />
                    )}
                  </div>
                  <div>
                    <h4 className="font-serif text-base font-bold text-[#1a1a1a]">
                      {item.name}
                    </h4>
                    <span className="text-[11px] text-brand-orange font-bold uppercase tracking-wider font-sans">
                      Mutlu Müşteri
                    </span>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
