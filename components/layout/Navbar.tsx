"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import { Menu, X, ArrowUpRight } from "lucide-react";
import { useInquiry } from "@/components/celebration/InquiryContext";

const links = [
  { href: "/#urunler", label: "Ürünler" },
  { href: "/#kutlamalar", label: "Uyumlu parçalar" },
  { href: "/set-icerikleri", label: "Set içerikleri" },
  { href: "/#surec", label: "Nasıl ilerliyoruz?" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const button = useRef<HTMLButtonElement>(null);
  const { draft } = useInquiry();
  const requestLabel = draft.products.length ? `Talebim (${draft.products.length})` : "Talep oluştur";
  return <header className="relative z-50 bg-white" onKeyDown={event => { if (event.key === "Escape") { setOpen(false); button.current?.focus(); } }}>
    <div className="mx-auto flex h-16 max-w-[1344px] items-center justify-between gap-4 px-[var(--taste-gutter)]">
      <Link href="/" onClick={() => setOpen(false)} className="shrink-0"><span className="block font-serif text-[22px] font-semibold tracking-tight text-[var(--taste-ink)] sm:text-[25px]">Portakal Çiçeği Atölye</span></Link>
      <nav aria-label="Ana gezinme" className="hidden items-center gap-7 xl:flex">{links.map(link => <Link key={link.href} href={link.href} className="py-3 text-sm text-[var(--taste-ink)] transition-colors hover:underline">{link.label}</Link>)}<Link href="/talep-olustur" className="inline-flex min-h-11 items-center gap-5 bg-[var(--taste-action)] px-5 py-3 text-sm text-white">{requestLabel}<ArrowUpRight size={16} /></Link></nav>
      <button ref={button} type="button" aria-label={open ? "Menüyü kapat" : "Menüyü aç"} aria-expanded={open} aria-controls="mobile-navigation" onClick={() => setOpen(!open)} className="grid h-11 w-11 shrink-0 place-items-center text-[var(--taste-ink)] xl:hidden">{open ? <X size={23} /> : <Menu size={23} />}</button>
    </div>
    {open && <nav id="mobile-navigation" aria-label="Mobil gezinme" className="max-h-[calc(100dvh-110px)] overflow-y-auto bg-[var(--taste-field)] px-6 pb-6 pt-3 xl:hidden">{links.map(link => <Link key={link.href} href={link.href} onClick={() => setOpen(false)} className="block py-3.5 text-base text-[var(--taste-ink)]">{link.label}</Link>)}<Link href="/talep-olustur" onClick={() => setOpen(false)} className="mt-4 flex min-h-12 items-center justify-between bg-[var(--taste-action)] px-4 py-3 text-sm text-white">{requestLabel}<ArrowUpRight size={16} /></Link></nav>}
  </header>;
}
