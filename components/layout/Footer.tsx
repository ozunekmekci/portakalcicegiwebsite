import { Instagram, MessageCircle } from "lucide-react";
import Link from "next/link";

interface FooterLink {
  label: string;
  href: string;
}

const footerLinks: FooterLink[] = [
  { label: "Koleksiyonlar", href: "#koleksiyonlar" },
  { label: "Öne Çıkanlar", href: "#one-cikanlar" },
  { label: "Atölye Hikayesi", href: "#hakkinda" },
  { label: "Nasıl Çalışır?", href: "#nasil-calisir" },
  { label: "İletişim & Teklif", href: "#iletisim" },
];

export default function Footer() {
  const waNumber = (process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "905555555555").replace(/\D/g, "");

  return (
    <footer className="bg-[#1E1C1A] text-[#FDFBF7] font-sans border-t border-[#2C2926]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 items-start">
          
          {/* Brand & Manifesto */}
          <div className="space-y-4 text-left">
            <Link href="/" className="inline-block">
              <span className="font-serif text-2xl font-bold tracking-tight text-[#FDFBF7]">
                Portakal Çiçeği Atölye
              </span>
            </Link>
            <p className="text-sm text-[#A89F95] max-w-sm leading-relaxed">
              Detaylar önemlidir. Doğum, baby shower, düğün ve nişan kutlamaları için Akdeniz zarafetiyle tasarlanan ömürlük 3D akrilik hatıralar.
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-4 text-left">
            <h3 className="font-serif text-base font-semibold text-[#FDFBF7]">
              Atölye Gezintisi
            </h3>
            <ul className="space-y-2.5">
              {footerLinks.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-sm text-[#A89F95] hover:text-[#D95A2B] transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Direct Channels */}
          <div className="space-y-4 text-left">
            <h3 className="font-serif text-base font-semibold text-[#FDFBF7]">
              Bize Ulaşın
            </h3>
            <div className="flex space-x-3">
              <a
                href="https://www.instagram.com/portakalcicegi.atolye/"
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 bg-white/5 hover:bg-[#D95A2B] text-[#FDFBF7] rounded-full transition-all duration-300 border border-white/10"
                aria-label="Instagram sayfamızı ziyaret edin"
              >
                <Instagram className="h-4 w-4" />
              </a>
              <a
                href={`https://wa.me/${waNumber}`}
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 bg-white/5 hover:bg-[#D95A2B] text-[#FDFBF7] rounded-full transition-all duration-300 border border-white/10"
                aria-label="WhatsApp üzerinden doğrudan yazın"
              >
                <MessageCircle className="h-4 w-4" />
              </a>
            </div>
            <p className="text-xs text-[#A89F95] leading-relaxed max-w-xs">
              100+ adet toplu siparişler ve özel tasarım talepleri için Instagram DM ve WhatsApp üzerinden doğrudan tasarımcımızla görüşebilirsiniz.
            </p>
          </div>
        </div>

        {/* Bottom copyright */}
        <div className="mt-14 pt-8 border-t border-white/10 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs text-[#8E857B]">
          <p>© {new Date().getFullYear()} Portakal Çiçeği Atölye. Tüm hakları saklıdır.</p>
          <p className="text-[#6E665D]">Modern Akdeniz & Sıcak Minimalizm</p>
        </div>
      </div>
    </footer>
  );
}
