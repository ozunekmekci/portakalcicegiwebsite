"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { MessageCircle, Instagram } from "lucide-react";

export default function Contact() {
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
    <section id="iletisim" aria-label="İletişim" className="bg-[#1a1a1a] py-24 px-6 overflow-hidden text-white">
      <div className="max-w-4xl mx-auto space-y-16 text-center">
        {/* Header Block */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="space-y-4 max-w-xl mx-auto"
        >
          <span className="text-xs md:text-sm font-sans tracking-widest text-brand-orange-dark font-bold uppercase">
            İLETİŞİM
          </span>
          <h2 className="font-serif text-4xl md:text-5xl text-[#fbf7f0] leading-tight font-bold whitespace-pre-line">
            Hayalinizdeki kutlamayı<br />
            birlikte tasarlayalım.
          </h2>
          <p className="font-sans text-base text-[#dcdcd9]">
            100 adetten fazla siparişlerde özel fiyat teklifi alın.
          </p>
        </motion.div>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 flex-wrap"
        >
          {/* WhatsApp Button */}
          <motion.a
            href="https://wa.me/90XXXXXXXXXXX"
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
            className="w-full sm:w-auto flex items-center justify-center gap-2 bg-[#25D366] text-white rounded-full px-8 py-4 text-lg font-medium shadow-lg hover:shadow-[#25D366]/20 transition-all duration-300"
          >
            <MessageCircle className="w-6 h-6" />
            WhatsApp&apos;tan Yaz
          </motion.a>

          {/* Instagram Button */}
          <motion.a
            href="https://www.instagram.com/portakalcicegi.atolye/"
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
            className="w-full sm:w-auto flex items-center justify-center gap-2 bg-transparent border-2 border-[#fbf7f0] text-[#fbf7f0] rounded-full px-8 py-4 text-lg font-medium transition-all duration-300"
          >
            <Instagram className="w-6 h-6" />
            Instagram&apos;da Takip Et
          </motion.a>
        </motion.div>

        {/* Contact Form */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="space-y-6 pt-8 border-t border-white/10"
        >
          <p className="text-sm text-[#dcdcd9]">
            veya formu doldurun, sizi arayalım:
          </p>

          <form onSubmit={handleSubmit} className="flex flex-col gap-4 max-w-lg mx-auto w-full">
            <input
              type="text"
              name="name"
              placeholder="Adınız Soyadınız"
              aria-label="Adınız Soyadınız"
              required
              value={formData.name}
              onChange={handleChange}
              className="w-full bg-white/10 border border-white/20 text-white placeholder-white/40 rounded-xl px-4 py-3 focus:outline-none focus:border-brand-orange transition-colors duration-300 font-sans"
            />
            <input
              type="tel"
              name="phone"
              placeholder="Telefon Numaranız"
              aria-label="Telefon Numaranız"
              required
              value={formData.phone}
              onChange={handleChange}
              className="w-full bg-white/10 border border-white/20 text-white placeholder-white/40 rounded-xl px-4 py-3 focus:outline-none focus:border-brand-orange transition-colors duration-300 font-sans"
            />
            <textarea
              name="message"
              placeholder="Mesajınız veya İstediğiniz Tasarım/Adet"
              aria-label="Mesajınız veya İstediğiniz Tasarım/Adet"
              required
              rows={4}
              value={formData.message}
              onChange={handleChange}
              className="w-full bg-white/10 border border-white/20 text-white placeholder-white/40 rounded-xl px-4 py-3 focus:outline-none focus:border-brand-orange transition-colors duration-300 font-sans resize-none"
            />

            <button
              type="submit"
              disabled={status === "submitting"}
              className="bg-brand-orange hover:bg-brand-orange/90 disabled:bg-brand-orange/50 text-white font-semibold rounded-full px-8 py-3.5 w-full shadow-md shadow-brand-orange/10 hover:shadow-brand-orange/20 transition-all duration-300 active:scale-[0.98]"
            >
              {status === "submitting" ? "Gönderiliyor..." : "Teklif İste"}
            </button>

            {status === "success" && (
              <motion.p
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-emerald-400 font-medium font-sans text-sm mt-2"
              >
                ✅ Mesajınız iletildi! En kısa sürede dönüş yapacağız.
              </motion.p>
            )}

            {status === "error" && (
              <motion.p
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-rose-400 font-medium font-sans text-sm mt-2"
              >
                ❌ Gönderim sırasında bir hata oluştu. Lütfen doğrudan WhatsApp veya Instagram üzerinden bizimle iletişime geçin.
              </motion.p>
            )}
          </form>
        </motion.div>
      </div>
    </section>
  );
}
