import { Instagram, MessageCircle } from "lucide-react";

interface FooterLink {
  label: string;
  href: string;
}

const footerLinks: FooterLink[] = [
  { label: "Hakkında", href: "#hakkinda" },
  { label: "Koleksiyonlar", href: "#koleksiyonlar" },
  { label: "Nasıl Çalışır", href: "#nasil-karar-verilir" }, // matching the brief anchor or name
  { label: "İletişim", href: "#iletisim" },
];

export default function Footer() {
  return (
    <footer className="bg-brand-text-dark text-brand-bg-cream font-sans border-t border-brand-text-mid/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-8 items-start">
          {/* Left Column: Brand & Slogan */}
          <div className="space-y-4">
            <h3 className="font-serif text-xl md:text-2xl font-semibold text-brand-orange">
              Portakal Çiçeği Atölye
            </h3>
            <p className="text-sm text-brand-bg-cream/80 max-w-sm leading-relaxed">
              Detaylar önemlidir. Her hediyelik, bir hatıra.
            </p>
          </div>

          {/* Middle Column: Quick Links */}
          <div className="space-y-4">
            <h4 className="text-sm font-semibold text-brand-yellow uppercase tracking-wider">
              Hızlı Bağlantılar
            </h4>
            <ul className="space-y-2">
              {footerLinks.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-sm text-brand-bg-cream/70 hover:text-brand-orange transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Right Column: Social Links */}
          <div className="space-y-4">
            <h4 className="text-sm font-semibold text-brand-yellow uppercase tracking-wider">
              İletişim & Sosyal Medya
            </h4>
            <div className="flex space-x-4">
              <a
                href="https://www.instagram.com/portakalcicegi.atolye/"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2.5 bg-brand-bg-cream/10 rounded-full hover:bg-brand-orange hover:text-white transition-all duration-300"
                aria-label="Instagram sayfamızı ziyaret edin"
              >
                <Instagram className="h-5 w-5" />
              </a>
              <a
                href="https://wa.me/905555555555"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2.5 bg-brand-bg-cream/10 rounded-full hover:bg-brand-orange hover:text-white transition-all duration-300"
                aria-label="WhatsApp üzerinden sipariş verin"
              >
                <MessageCircle className="h-5 w-5" />
              </a>
            </div>
            <p className="text-xs text-brand-bg-cream/50 leading-relaxed">
              Bize Instagram DM veya WhatsApp üzerinden ulaşabilirsiniz.
            </p>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-brand-bg-cream/10 flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0 text-xs text-brand-bg-cream/55">
          <p>© 2025 Portakal Çiçeği Atölye. Tüm hakları saklıdır.</p>
          <div className="flex space-x-6">
            <a href="#" className="hover:text-brand-orange transition-colors">Kullanım Koşulları</a>
            <a href="#" className="hover:text-brand-orange transition-colors">Gizlilik Politikası</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
