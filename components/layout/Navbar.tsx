"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ChevronDown, MessageCircle } from "lucide-react";
import { usePathname } from "next/navigation";
import Link from "next/link";

interface NavLink {
  label: string;
  href: string;
}

const navLinks: NavLink[] = [
  { label: "Koleksiyonlar", href: "#koleksiyonlar" },
  { label: "Seçkiler", href: "#one-cikanlar" },
  { label: "Atölye", href: "#hakkinda" },
  { label: "Süreç", href: "#nasil-calisir" },
  { label: "İletişim", href: "#iletisim" },
];

const koleksiyonlar = [
  { isim: "Kişiye Özel Pasta Süsleri", slug: "pasta-susleri" },
  { isim: "Baby Shower & Doğum Magnetleri", slug: "babyshower" },
  { isim: "Kutlama Kombin Setleri", slug: "kombin-setler" },
  { isim: "Düğün & Nişan Hatıraları", slug: "dugun-nisan" },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const pathname = usePathname();
  const waNumber = (process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "905555555555").replace(/\D/g, "");

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "unset";
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <motion.header
      initial={{ y: -16, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="sticky top-0 z-50 bg-[#FDFBF7]/95 backdrop-blur-md border-b border-[#EDE6DF] transition-all"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20 items-center">
          
          {/* Logo & Subtitle */}
          <Link href="/" className="group flex flex-col justify-center">
            <span className="font-serif text-xl sm:text-2xl font-bold tracking-tight text-[#1E1C1A] group-hover:text-[#D95A2B] transition-colors">
              Portakal Çiçeği Atölye
            </span>
            <span className="font-sans text-[11px] uppercase tracking-[0.16em] text-[#696159]">
              Ev Atölyesi • Pasta Süsü &amp; Magnet
            </span>
          </Link>

          {/* Desktop Nav Links */}
          <nav className="hidden md:flex items-center space-x-7">
            {navLinks.map((link) => {
              if (link.label === "Koleksiyonlar") {
                const koleksiyonlarHref = pathname === "/" ? "#koleksiyonlar" : "/koleksiyonlar/pasta-susleri";
                return (
                  <div
                    key={link.label}
                    className="relative py-4"
                    onMouseEnter={() => setIsDropdownOpen(true)}
                    onMouseLeave={() => setIsDropdownOpen(false)}
                  >
                    <a
                      href={koleksiyonlarHref}
                      className="font-sans text-sm font-medium text-[#696159] hover:text-[#1E1C1A] transition-colors flex items-center gap-1 cursor-pointer py-1"
                    >
                      {link.label}
                      <ChevronDown
                        size={14}
                        className={`transition-transform duration-200 text-[#696159] ${isDropdownOpen ? "rotate-180 text-[#D95A2B]" : ""}`}
                      />
                    </a>
                    <AnimatePresence>
                      {isDropdownOpen && (
                        <motion.div
                          initial={{ opacity: 0, y: 8 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: 6 }}
                          transition={{ duration: 0.18 }}
                          className="absolute top-full left-0 bg-[#FDFBF7] rounded-xl shadow-[0_12px_32px_-4px_rgba(30,28,26,0.08)] py-2 min-w-[220px] z-50 border border-[#EDE6DF]"
                        >
                          {koleksiyonlar.map((kol) => (
                            <Link
                              key={kol.slug}
                              href={`/koleksiyonlar/${kol.slug}`}
                              className="block px-4 py-2.5 text-sm text-[#1E1C1A] hover:bg-[#F5EFEB] hover:text-[#D95A2B] transition-colors font-medium"
                            >
                              {kol.isim}
                            </Link>
                          ))}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              }

              const normHref = pathname === "/" ? link.href : `/${link.href}`;

              return (
                <a
                  key={link.label}
                  href={normHref}
                  className="font-sans text-sm font-medium text-[#696159] hover:text-[#1E1C1A] transition-colors py-1"
                >
                  {link.label}
                </a>
              );
            })}

            {/* Direct Primary Action */}
            <a
              href={`https://wa.me/${waNumber}?text=${encodeURIComponent("Merhaba, pasta süsü ve baby shower magnet modelleriniz için tasarım taslağı hazırlatmak istiyorum.")}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-[#D95A2B] hover:bg-[#B8471D] text-[#FDFBF7] font-sans text-xs sm:text-sm font-medium px-5 py-2.5 rounded-full shadow-[0_4px_14px_rgba(217,90,43,0.22)] transition-all duration-300 transform hover:-translate-y-0.5 active:translate-y-0"
            >
              <MessageCircle size={15} />
              <span>WhatsApp&apos;ta Taslak İste</span>
            </a>
          </nav>

          {/* Mobile Menu Button */}
          <div className="flex md:hidden">
            <button
              onClick={toggleMenu}
              type="button"
              className="text-[#1E1C1A] hover:text-[#D95A2B] p-2 focus:outline-none"
              aria-expanded={isOpen}
              aria-label={isOpen ? "Menüyü kapat" : "Menüyü aç"}
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Nav Links Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25 }}
            className="md:hidden bg-[#FDFBF7] border-t border-[#EDE6DF] overflow-hidden"
          >
            <div className="px-4 pt-3 pb-6 space-y-3">
              {navLinks.map((link) => {
                if (link.label === "Koleksiyonlar") {
                  const koleksiyonlarHref = pathname === "/" ? "#koleksiyonlar" : "/koleksiyonlar/babyshower";
                  return (
                    <div key={link.label} className="py-2 border-b border-[#EDE6DF]/60">
                      <a
                        href={koleksiyonlarHref}
                        onClick={() => setIsOpen(false)}
                        className="block font-sans text-base font-medium text-[#1E1C1A] pb-2"
                      >
                        {link.label}
                      </a>
                      <div className="pl-3 space-y-1.5 pt-1">
                        {koleksiyonlar.map((kol) => (
                          <Link
                            key={kol.slug}
                            href={`/koleksiyonlar/${kol.slug}`}
                            onClick={() => setIsOpen(false)}
                            className="block font-sans text-sm text-[#696159] hover:text-[#D95A2B] py-1"
                          >
                            {kol.isim}
                          </Link>
                        ))}
                      </div>
                    </div>
                  );
                }

                const normHref = pathname === "/" ? link.href : `/${link.href}`;

                return (
                  <a
                    key={link.label}
                    href={normHref}
                    onClick={() => setIsOpen(false)}
                    className="block font-sans text-base font-medium text-[#1E1C1A] hover:text-[#D95A2B] py-2 border-b border-[#EDE6DF]/60 last:border-0"
                  >
                    {link.label}
                  </a>
                );
              })}
              <div className="pt-3">
                <a
                  href={`https://wa.me/${waNumber}?text=${encodeURIComponent("Merhaba, pasta süsü ve baby shower magnet modelleriniz için tasarım taslağı hazırlatmak istiyorum.")}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => setIsOpen(false)}
                  className="flex items-center justify-center gap-2 text-center bg-[#D95A2B] hover:bg-[#B8471D] text-[#FDFBF7] font-sans text-sm font-medium py-3 rounded-full shadow-md transition-colors"
                >
                  <MessageCircle size={16} />
                  WhatsApp&apos;ta Taslak İste
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
