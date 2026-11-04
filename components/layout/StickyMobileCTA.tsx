"use client";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { useInquiry } from "@/components/celebration/InquiryContext";

export default function StickyMobileCTA() {
  const { draft } = useInquiry();
  return <div aria-label="Ürünler ve talep" className="fixed inset-x-0 bottom-0 z-40 border-t border-[#dfd3c3] bg-[#fdfbf7]/95 px-[18px] pb-[calc(12px+env(safe-area-inset-bottom))] pt-3 backdrop-blur-md md:hidden"><div className="mx-auto flex max-w-lg gap-3"><Link href="/#urunler" className="flex min-h-11 flex-1 items-center justify-center border border-[#d8c9b5] px-4 text-xs text-[#79614e]">Ürünler</Link><Link href="/talep-olustur" className="flex min-h-11 flex-[1.5] items-center justify-between gap-4 bg-[#a9533d] px-4 text-xs text-white">{draft.products.length ? `Talebim (${draft.products.length})` : "Talep oluştur"}<ArrowUpRight size={16} /></Link></div></div>;
}
