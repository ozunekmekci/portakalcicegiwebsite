"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import { Menu, X, ArrowUpRight } from "lucide-react";
import { useInquiry } from "@/components/celebration/InquiryContext";

const links = [
  { href: "/#urunler", label: "Ürünler" },
  { href: "/#kutlamalar", label: "Kutlamalardan" },
  { href: "/set-icerikleri", label: "Set içerikleri" },
  { href: "/#surec", label: "Nasıl ilerliyoruz?" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const button = useRef<HTMLButtonElement>(null);
  const { draft } = useInquiry();
  const requestLabel = draft.products.length ? `Talebim (${draft.products.length})` : "Talep oluştur";
  return <header className="sticky top-0 z-50 border-b border-[#e7dfd4] bg-[#fdfbf7]/95 backdrop-blur-md" onKeyDown={event => { if (event.key === "Escape") { setOpen(false); button.current?.focus(); } }}>
    <div className="mx-auto flex h-[82px] max-w-[1344px] items-center justify-between gap-5 px-[18px] sm:px-8">
      <Link href="/" onClick={() => setOpen(false)} className="shrink-0"><span className="block font-serif text-[22px] font-semibold tracking-tight text-[#302a25] sm:text-[25px]">Portakal Çiçeği Atölye</span><span className="block pt-0.5 text-[9px] tracking-[.13em] text-[#8c7968]">KUTLAMANA ÖZEL TASARIMLAR</span></Link>
      <nav aria-label="Ana gezinme" className="hidden items-center gap-7 xl:flex">{links.map(link => <Link key={link.href} href={link.href} className="py-3 text-[12px] text-[#756656] transition-colors hover:text-[#a9533d]">{link.label}</Link>)}<Link href="/talep-olustur" className="inline-flex min-h-11 items-center gap-5 bg-[#a9533d] px-5 py-3 text-xs text-white">{requestLabel}<ArrowUpRight size={16} /></Link></nav>
      <button ref={button} type="button" aria-label={open ? "Menüyü kapat" : "Menüyü aç"} aria-expanded={open} aria-controls="mobile-navigation" onClick={() => setOpen(!open)} className="grid h-11 w-11 shrink-0 place-items-center text-[#6c5545] xl:hidden">{open ? <X size={23} /> : <Menu size={23} />}</button>
    </div>
    {open && <nav id="mobile-navigation" aria-label="Mobil gezinme" className="max-h-[calc(100dvh-110px)] overflow-y-auto border-t border-[#e7dfd4] bg-[#fdfbf7] px-6 pb-6 pt-3 xl:hidden">{links.map(link => <Link key={link.href} href={link.href} onClick={() => setOpen(false)} className="block border-b border-[#eee5da] py-3.5 text-sm text-[#756656]">{link.label}</Link>)}<Link href="/talep-olustur" onClick={() => setOpen(false)} className="mt-4 flex min-h-12 items-center justify-between bg-[#a9533d] px-4 py-3 text-sm text-white">{requestLabel}<ArrowUpRight size={16} /></Link></nav>}
  </header>;
}
