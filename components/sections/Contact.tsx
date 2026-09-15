"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { MessageCircle, Instagram, Send, MapPin, Mail, Phone, Clock, AlertCircle } from "lucide-react";

interface ContactProps {
  settings?: Record<string, string>;
}

export default function Contact({ settings = {} }: ContactProps) {
  const router = useRouter();
  const dbNumber = settings.contact_phone;
  const rawNumber = dbNumber || process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "905555555555";
  const waNumber = rawNumber.replace(/\D/g, "");
  
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    productType: "Magnet (Min. 25 Adet)",
    message: "",
  });
  const [status, setStatus] = useState<"idle" | "submitting" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.name.trim() || !formData.phone.trim()) {
      setStatus("error");
      setErrorMessage("Lütfen adınızı ve telefon numaranızı eksiksiz girin.");
      return;
    }

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
        router.push("/tesekkur-ederiz");
      } else {
        setStatus("error");
        setErrorMessage("Form iletilirken bir aksaklık oluştu. Lütfen doğrudan WhatsApp üzerinden bizimle iletişime geçin.");
      }
    } catch {
      setStatus("error");
      setErrorMessage("Bağlantı hatası oluştu. Lütfen doğrudan WhatsApp üzerinden bize yazın.");
    }
  };

  return (
    <section id="iletisim" aria-label="İletişim ve Fiyat Teklifi" className="bg-[#1E1C1A] py-20 px-4 sm:px-6 lg:px-8 text-[#FDFBF7] overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          
          {/* Left Column: Direct Outreach & Physical Atelier Info */}
          <div className="lg:col-span-6 space-y-8 text-left">
            <div className="space-y-4">
              <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-[#FDFBF7] leading-tight">
                Hayalinizdeki Kutlamayı Birlikte Tasarlayalım
              </h2>
              <p className="font-sans text-sm sm:text-base text-[#A89F95] leading-relaxed">
                Magnetler, kişiye özel cake topper süsleri ve kapı panoları için doğrudan ev atölyemizle iletişime geçin.
              </p>
            </div>

            {/* Quick Action Channels - Straight Edges */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-2">
              <a
                href={`https://wa.me/${waNumber}?text=${encodeURIComponent("Merhaba! Magnet, pasta süsü ve kapı süsü tasarımlarınızı konuşmak, etkinliğimin detaylarını paylaşmak istiyorum.")}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 bg-[#C86D51] hover:bg-[#A85338] text-[#FDFBF7] rounded-none px-6 py-3.5 text-xs font-sans font-semibold uppercase tracking-wider shadow-sm transition-all duration-200"
              >
                <MessageCircle size={16} />
                <span>WhatsApp&apos;ta Tasarım Konuşalım</span>
              </a>

              <a
                href="https://www.instagram.com/portakalcicegi.atolye/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 bg-white/5 hover:bg-white/10 text-[#FDFBF7] border border-white/15 rounded-none px-6 py-3.5 text-xs font-sans font-semibold uppercase tracking-wider transition-all duration-200"
              >
                <Instagram size={15} />
                <span>Instagram DM</span>
              </a>
            </div>

            {/* Real Physical Atelier Address & Details */}
            <div className="pt-6 border-t border-white/10 space-y-3.5 text-xs sm:text-sm text-[#D8D0C5]">
              <div className="flex items-start gap-3">
                <MapPin size={17} className="text-[#C86D51] flex-shrink-0 mt-0.5" />
                <span><strong>Atölye:</strong> Caferağa Mah. Moda Cad. No:42/A, Kadıköy / İstanbul</span>
              </div>
              <div className="flex items-center gap-3">
                <Phone size={16} className="text-[#C86D51] flex-shrink-0" />
                <span><strong>WhatsApp Destek:</strong> +90 (555) 555 55 55</span>
              </div>
              <div className="flex items-center gap-3">
                <Mail size={16} className="text-[#C86D51] flex-shrink-0" />
                <span><strong>E-posta:</strong> iletisim@portakalcicegiatolye.com</span>
              </div>
              <div className="flex items-center gap-3">
                <Clock size={16} className="text-[#5A6855] flex-shrink-0" />
                <span><strong>Çalışma Saatleri:</strong> Pazartesi – Cumartesi 09:30 – 18:30</span>
              </div>
            </div>
          </div>

          {/* Right Column: Clean Inquiry Form - Straight Edges */}
          <div className="lg:col-span-6 bg-white/[0.04] p-6 sm:p-8 rounded-none border border-white/10 shadow-soft-md text-left">
            <h3 className="font-serif text-xl sm:text-2xl font-semibold text-[#FDFBF7] mb-2">
              Hızlı Tasarım &amp; Teklif Formu
            </h3>
            <p className="font-sans text-xs sm:text-sm text-[#A89F95] mb-6">
              Etkinlik bilgilerinizi bırakın, dijital taslağınızı ve özel fiyat teklifinizi gün içinde WhatsApp&apos;tan iletelim:
            </p>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="contact-name" className="block text-xs font-sans font-medium text-[#D8D0C5] mb-1.5">
                  Adınız Soyadınız <span className="text-[#C86D51]">*</span>
                </label>
                <input
                  id="contact-name"
                  type="text"
                  name="name"
                  placeholder="Örn. Ayşe Yılmaz"
                  required
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full bg-white/[0.06] border border-white/15 text-[#FDFBF7] placeholder-[#8E857B] rounded-none px-4 py-3 text-sm focus:outline-none focus:border-[#C86D51] transition-colors font-sans"
                />
              </div>

              <div>
                <label htmlFor="contact-phone" className="block text-xs font-sans font-medium text-[#D8D0C5] mb-1.5">
                  Telefon Numaranız (WhatsApp) <span className="text-[#C86D51]">*</span>
                </label>
                <input
                  id="contact-phone"
                  type="tel"
                  name="phone"
                  placeholder="05XX XXX XX XX"
                  required
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full bg-white/[0.06] border border-white/15 text-[#FDFBF7] placeholder-[#8E857B] rounded-none px-4 py-3 text-sm focus:outline-none focus:border-[#C86D51] transition-colors font-sans"
                />
              </div>

              <div>
                <label htmlFor="contact-type" className="block text-xs font-sans font-medium text-[#D8D0C5] mb-1.5">
                  İlgilendiğiniz Ürün Kategorisi
                </label>
                <select
                  id="contact-type"
                  name="productType"
                  value={formData.productType}
                  onChange={handleChange}
                  className="w-full bg-[#2C2926] border border-white/15 text-[#FDFBF7] rounded-none px-4 py-3 text-sm focus:outline-none focus:border-[#C86D51] transition-colors font-sans"
                >
                  <option value="Magnet (Min. 25 Adet)">Magnet &amp; Hediyelik (Min. 25 Adet)</option>
                  <option value="Cake Topper (1 Adet)">Cake Topper / Pasta Süsü (1 Adet Özel Üretim)</option>
                  <option value="Kapı Süsü (1 Adet)">Kapı Süsü &amp; Pano (1 Adet Özel Üretim)</option>
                  <option value="Kutlama Kombin Seti">Kutlama Kombin Seti</option>
                  <option value="Özel Tasarım">Farklı / Özel Konsept Fikir</option>
                </select>
              </div>

              <div>
                <label htmlFor="contact-message" className="block text-xs font-sans font-medium text-[#D8D0C5] mb-1.5">
                  Etkinlik Tarihi, İsim &amp; Konsept Notunuz
                </label>
                <textarea
                  id="contact-message"
                  name="message"
                  placeholder="Örn. 1 Yaş için 'Can' isimli gold ayna pasta süsü ve 25 adet uyumlu bulut magnet..."
                  rows={3}
                  value={formData.message}
                  onChange={handleChange}
                  className="w-full bg-white/[0.06] border border-white/15 text-[#FDFBF7] placeholder-[#8E857B] rounded-none px-4 py-3 text-sm focus:outline-none focus:border-[#C86D51] transition-colors font-sans resize-none"
                />
              </div>

              <button
                type="submit"
                disabled={status === "submitting"}
                className="w-full inline-flex items-center justify-center gap-2 bg-[#C86D51] hover:bg-[#A85338] disabled:opacity-50 text-[#FDFBF7] font-sans font-semibold text-xs uppercase tracking-wider rounded-none px-6 py-3.5 transition-all duration-200 shadow-sm cursor-pointer"
              >
                {status === "submitting" ? (
                  <span>İletiliyor...</span>
                ) : (
                  <>
                    <Send size={14} />
                    <span>Fiyat Teklifi İste</span>
                  </>
                )}
              </button>

              {status === "error" && (
                <div className="flex items-start gap-2.5 p-3 rounded-none bg-[#A85338]/20 border border-[#A85338]/40 text-rose-300 text-xs font-sans">
                  <AlertCircle size={16} className="flex-shrink-0 mt-0.5 text-rose-300" />
                  <span>{errorMessage}</span>
                </div>
              )}
            </form>
          </div>

        </div>
      </div>
    </section>
  );
}
