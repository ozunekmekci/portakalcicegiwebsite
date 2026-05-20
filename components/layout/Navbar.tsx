"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ChevronDown } from "lucide-react";
import { usePathname } from "next/navigation";
import Link from "next/link";

interface NavLink {
  label: string;
  href: string;
}

const navLinks: NavLink[] = [
  { label: "Hakkında", href: "#hakkinda" },
  { label: "Koleksiyonlar", href: "#koleksiyonlar" },
  { label: "Nasıl Çalışır", href: "#nasil-calisir" },
  { label: "İletişim", href: "#iletisim" },
];

const koleksiyonlar = [
  { isim: "Babyshower", slug: "babyshower" },
  { isim: "Doğum Günü", slug: "dogum-gunu" },
  { isim: "Diş Buğdayı", slug: "dis-bugdayi" },
  { isim: "Düğün & Nişan", slug: "dugun-nisan" },
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
    <motion.nav
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="sticky top-0 z-50 bg-brand-bg-cream shadow-sm border-b border-brand-bg-gray/20"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20 items-center">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link href="/" className="font-serif text-xl md:text-2xl font-semibold text-brand-orange-dark hover:opacity-90 transition-opacity">
              Portakal Çiçeği Atölye
            </Link>
          </div>

          {/* Desktop Nav Links */}
          <div className="hidden md:flex space-x-8 items-center">
            {navLinks.map((link) => {
              if (link.label === "Koleksiyonlar") {
                const koleksiyonlarHref = pathname === "/" ? "#koleksiyonlar" : "/koleksiyonlar/babyshower";
                return (
                  <div
                    key={link.label}
                    className="relative py-4"
                    onMouseEnter={() => setIsDropdownOpen(true)}
                    onMouseLeave={() => setIsDropdownOpen(false)}
                  >
                    <a
                      href={koleksiyonlarHref}
                      className="font-sans text-brand-text-mid hover:text-brand-orange transition-colors text-sm font-medium flex items-center gap-1 cursor-pointer"
                    >
                      {link.label}
                      <ChevronDown size={14} className={`transition-transform duration-200 ${isDropdownOpen ? "rotate-180" : ""}`} />
                    </a>
                    <AnimatePresence>
                      {isDropdownOpen && (
                        <motion.div
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: 10 }}
                          transition={{ duration: 0.2 }}
                          className="absolute top-full left-0 bg-white rounded-xl shadow-lg py-2 min-w-[180px] z-50 border border-black/5 overflow-hidden"
                        >
                          {koleksiyonlar.map((kol) => (
                            <Link
                              key={kol.slug}
                              href={`/koleksiyonlar/${kol.slug}`}
                              className="block px-4 py-2.5 text-sm text-[#1a1a1a] hover:bg-[#fbf7f0] hover:text-[#ff914b] transition-colors"
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

              // Normal anchor navigation if home page, or go home then scroll
              const normHref = pathname === "/" ? link.href : `/${link.href}`;

              return (
                <a
                  key={link.label}
                  href={normHref}
                  className="font-sans text-brand-text-mid hover:text-brand-orange transition-colors text-sm font-medium"
                >
                  {link.label}
                </a>
              );
            })}
            <a
              href={`https://wa.me/${waNumber}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block bg-brand-orange hover:bg-brand-orange-dark text-white font-sans text-sm font-medium px-5 py-2.5 rounded-full shadow-md transition-all duration-300 transform hover:-translate-y-0.5"
            >
              Sipariş Ver
            </a>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex md:hidden">
            <button
              onClick={toggleMenu}
              type="button"
              className="text-brand-text-dark hover:text-brand-orange p-2 focus:outline-none"
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
            transition={{ duration: 0.3 }}
            className="md:hidden bg-brand-bg-cream border-t border-brand-bg-gray/20 overflow-hidden"
          >
            <div className="px-4 pt-2 pb-6 space-y-2">
              {navLinks.map((link) => {
                if (link.label === "Koleksiyonlar") {
                  const koleksiyonlarHref = pathname === "/" ? "#koleksiyonlar" : "/koleksiyonlar/babyshower";
                  return (
                    <div key={link.label} className="py-2 border-b border-brand-bg-gray/10">
                      <a
                        href={koleksiyonlarHref}
                        onClick={() => setIsOpen(false)}
                        className="block font-sans text-brand-text-mid hover:text-brand-orange text-base font-medium pb-2"
                      >
                        {link.label}
                      </a>
                      <div className="pl-4 space-y-2 pt-1">
                        {koleksiyonlar.map((kol) => (
                          <Link
                            key={kol.slug}
                            href={`/koleksiyonlar/${kol.slug}`}
                            onClick={() => setIsOpen(false)}
                            className="block font-sans text-brand-text-mid/80 hover:text-brand-orange text-sm font-medium py-1.5"
                          >
                            • {kol.isim}
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
                    className="block font-sans text-brand-text-mid hover:text-brand-orange text-base font-medium py-3 border-b border-brand-bg-gray/10 last:border-0"
                  >
                    {link.label}
                  </a>
                );
              })}
              <div className="pt-4">
                <a
                  href={`https://wa.me/${waNumber}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => setIsOpen(false)}
                  className="block text-center bg-brand-orange hover:bg-brand-orange-dark text-white font-sans text-base font-medium py-3.5 rounded-full shadow-md transition-colors"
                >
                  Sipariş Ver
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
