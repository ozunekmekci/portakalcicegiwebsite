import { Instagram, MessageCircle, MapPin, Clock } from "lucide-react";
import Link from "next/link";

interface FooterLink {
  label: string;
  href: string;
}

const footerLinks: FooterLink[] = [
  { label: "Koleksiyonlar", href: "/#koleksiyonlar" },
  { label: "Öne Çıkanlar", href: "/#one-cikanlar" },
  { label: "Atölye Hikayesi", href: "/#hakkinda" },
  { label: "Nasıl Çalışır?", href: "/#nasil-calisir" },
  { label: "İletişim & Teklif", href: "/#iletisim" },
];

export default function Footer() {
  const waNumber = (process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "905555555555").replace(/\D/g, "");

  return (
    <footer className="bg-[#1E1C1A] text-[#FDFBF7] font-sans border-t border-[#2C2926]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 lg:gap-12 items-start">
          
          {/* Brand & Physical Location */}
          <div className="md:col-span-5 space-y-4 text-left">
            <Link href="/" className="inline-block">
              <span className="font-serif text-2xl font-bold tracking-tight text-[#FDFBF7]">
                Portakal Çiçeği Atölye
              </span>
            </Link>
            <p className="text-sm text-[#A89F95] max-w-sm leading-relaxed">
              Detaylar önemlidir. Doğum günü, baby shower ve kutlamalarınız için Akdeniz zarafetiyle tasarlanan magnetler, cake topper süsleri ve kapı panoları.
            </p>
            
            <div className="space-y-2 pt-2 text-xs text-[#D8D0C5]">
              <div className="flex items-start gap-2">
                <MapPin size={14} className="text-[#C86D51] flex-shrink-0 mt-0.5" />
                <span>Caferağa Mah. Moda Cad. No:42/A, Kadıköy / İstanbul</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock size={14} className="text-[#5A6855] flex-shrink-0" />
                <span>Pazartesi – Cumartesi 09:30 – 18:30</span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div className="md:col-span-3 space-y-4 text-left">
            <h3 className="font-serif text-base font-semibold text-[#FDFBF7]">
              Atölye Gezintisi
            </h3>
            <ul className="space-y-2.5">
              {footerLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sm text-[#A89F95] hover:text-[#C86D51] transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Direct Channels & Legal - Straight Edges */}
          <div className="md:col-span-4 space-y-4 text-left">
            <h3 className="font-serif text-base font-semibold text-[#FDFBF7]">
              Bize Ulaşın &amp; Sipariş
            </h3>
            <div className="flex space-x-3">
              <a
                href="https://www.instagram.com/portakalcicegi.atolye/"
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 bg-white/5 hover:bg-[#C86D51] text-[#FDFBF7] rounded-none transition-all duration-200 border border-white/10"
                aria-label="Instagram sayfamızı ziyaret edin"
              >
                <Instagram className="h-4 w-4" />
              </a>
              <a
                href={`https://wa.me/${waNumber}?text=${encodeURIComponent("Merhaba, atölyenizden bilgi almak istiyorum.")}`}
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 bg-white/5 hover:bg-[#C86D51] text-[#FDFBF7] rounded-none transition-all duration-200 border border-white/10"
                aria-label="WhatsApp üzerinden doğrudan yazın"
              >
                <MessageCircle className="h-4 w-4" />
              </a>
            </div>
            <p className="text-xs text-[#A89F95] leading-relaxed max-w-xs">
              Kişiye özel cake topper, magnet ve kapı panosu siparişleri için Instagram DM ve WhatsApp üzerinden doğrudan atölye tasarımcımızla görüşebilirsiniz.
            </p>
          </div>
        </div>

        {/* Bottom Bar: Copyright & Legal Links */}
        <div className="mt-14 pt-8 border-t border-white/10 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs text-[#8E857B]">
          <p>© {new Date().getFullYear()} Portakal Çiçeği Atölye. Tüm hakları saklıdır.</p>
          <div className="flex flex-wrap items-center gap-5">
            <Link href="/gizlilik-politikasi" className="hover:text-[#C86D51] transition-colors">
              Gizlilik Politikası (KVKK)
            </Link>
            <span>•</span>
            <Link href="/kullanim-kosullari" className="hover:text-[#C86D51] transition-colors">
              Kullanım ve Sipariş Koşulları
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
