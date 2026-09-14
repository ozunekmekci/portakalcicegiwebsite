"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { MessageCircle, Instagram, Send, CheckCircle2, AlertCircle } from "lucide-react";

interface ContactProps {
  settings?: Record<string, string>;
}

export default function Contact({ settings = {} }: ContactProps) {
  const dbNumber = settings.contact_phone;
  const rawNumber = dbNumber || process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "905555555555";
  const waNumber = rawNumber.replace(/\D/g, "");
  
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    message: "",
  });
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("submitting");

    try {
      const response = await fetch("https://formspree.io/f/mgoqoprk", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setStatus("success");
        setFormData({ name: "", phone: "", message: "" });
      } else {
        setStatus("error");
      }
    } catch (error) {
      setStatus("error");
    }
  };

  return (
    <section id="iletisim" aria-label="İletişim ve Fiyat Teklifi" className="bg-[#1E1C1A] py-24 px-4 sm:px-6 lg:px-8 text-[#FDFBF7] overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          
          {/* Left Column: Direct Outreach & WhatsApp */}
          <div className="lg:col-span-6 space-y-8 text-left">
            <div className="space-y-4">
              <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-[#FDFBF7] leading-tight">
                Hayalinizdeki Kutlamayı Birlikte Tasarlayalım
              </h2>
              <p className="font-sans text-base sm:text-lg text-[#A89F95] leading-relaxed">
                100 adetten fazla toplu siparişleriniz ve size özel tasarım talepleriniz için doğrudan atölye tasarımcımızla iletişime geçin.
              </p>
            </div>

            {/* Quick Action Channels */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-2">
              <a
                href={`https://wa.me/${waNumber}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2.5 bg-[#D95A2B] hover:bg-[#B8471D] text-[#FDFBF7] rounded-full px-7 py-3.5 text-sm sm:text-base font-medium shadow-[0_4px_16px_rgba(217,90,43,0.3)] transition-all duration-300 transform hover:-translate-y-0.5 active:translate-y-0"
              >
                <MessageCircle size={18} />
                <span>WhatsApp ile Doğrudan Yaz</span>
              </a>

              <a
                href="https://www.instagram.com/portakalcicegi.atolye/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2.5 bg-white/5 hover:bg-white/10 text-[#FDFBF7] border border-white/15 rounded-full px-6 py-3.5 text-sm sm:text-base font-medium transition-all duration-300"
              >
                <Instagram size={17} />
                <span>Instagram DM</span>
              </a>
            </div>

            {/* Atelier Guarantees */}
            <div className="pt-6 border-t border-white/10 space-y-3 text-xs sm:text-sm text-[#A89F95]">
              <div className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#D95A2B]" />
                <span>Toplu siparişlerde (100+ adet) özel fiyatlandırma ve indirim</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#5A6855]" />
                <span>Türkiye&apos;nin her yerine korunaklı, sigortalı kargo</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#D49B35]" />
                <span>Tasarım ve üretim sürecinde birebir iletişim</span>
              </div>
            </div>
          </div>

          {/* Right Column: Clean Inquiry Form */}
          <div className="lg:col-span-6 bg-white/[0.04] p-8 sm:p-10 rounded-3xl border border-white/10 shadow-soft-md text-left">
            <h3 className="font-serif text-xl sm:text-2xl font-semibold text-[#FDFBF7] mb-2">
              Hızlı Teklif Formu
            </h3>
            <p className="font-sans text-xs sm:text-sm text-[#A89F95] mb-6">
              Bilgilerinizi bırakın, etkinlik detaylarınıza özel fiyat teklifinizi gün içinde iletelim:
            </p>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="contact-name" className="block text-xs font-sans font-medium text-[#D8D0C5] mb-1.5">
                  Adınız Soyadınız
                </label>
                <input
                  id="contact-name"
                  type="text"
                  name="name"
                  placeholder="Örn. Ayşe Yılmaz"
                  required
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full bg-white/[0.06] border border-white/15 text-[#FDFBF7] placeholder-[#8E857B] rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#D95A2B] transition-colors font-sans"
                />
              </div>

              <div>
                <label htmlFor="contact-phone" className="block text-xs font-sans font-medium text-[#D8D0C5] mb-1.5">
                  Telefon Numaranız (WhatsApp)
                </label>
                <input
                  id="contact-phone"
                  type="tel"
                  name="phone"
                  placeholder="05XX XXX XX XX"
                  required
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full bg-white/[0.06] border border-white/15 text-[#FDFBF7] placeholder-[#8E857B] rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#D95A2B] transition-colors font-sans"
                />
              </div>

              <div>
                <label htmlFor="contact-message" className="block text-xs font-sans font-medium text-[#D8D0C5] mb-1.5">
                  Etkinlik Türü & Tahmini Adet / Notunuz
                </label>
                <textarea
                  id="contact-message"
                  name="message"
                  placeholder="Örn. 150 adet baby shower pleksi magnet, Nisan teslim..."
                  required
                  rows={3}
                  value={formData.message}
                  onChange={handleChange}
                  className="w-full bg-white/[0.06] border border-white/15 text-[#FDFBF7] placeholder-[#8E857B] rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#D95A2B] transition-colors font-sans resize-none"
                />
              </div>

              <button
                type="submit"
                disabled={status === "submitting"}
                className="w-full inline-flex items-center justify-center gap-2 bg-[#D95A2B] hover:bg-[#B8471D] disabled:opacity-50 text-[#FDFBF7] font-medium rounded-xl px-6 py-3.5 text-sm transition-all duration-300 shadow-md cursor-pointer"
              >
                {status === "submitting" ? (
                  <span>İletiliyor...</span>
                ) : (
                  <>
                    <Send size={15} />
                    <span>Fiyat Teklifi İste</span>
                  </>
                )}
              </button>

              {status === "success" && (
                <div className="flex items-center gap-2 p-3 rounded-xl bg-[#5A6855]/20 border border-[#5A6855]/40 text-emerald-300 text-xs font-sans">
                  <CheckCircle2 size={16} className="flex-shrink-0" />
                  <span>Talebiniz atölyemize ulaştı. En kısa sürede WhatsApp üzerinden teklifinizi ileteceğiz.</span>
                </div>
              )}

              {status === "error" && (
                <div className="flex items-start gap-2 p-3 rounded-xl bg-[#B8471D]/20 border border-[#B8471D]/40 text-rose-300 text-xs font-sans">
                  <AlertCircle size={16} className="flex-shrink-0 mt-0.5" />
                  <span>Gönderim sırasında bir aksaklık oluştu. Lütfen doğrudan yukarıdaki WhatsApp butonuyla bize yazın.</span>
                </div>
              )}
            </form>
          </div>

        </div>
      </div>
    </section>
  );
}
