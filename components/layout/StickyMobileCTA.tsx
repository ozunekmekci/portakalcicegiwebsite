"use client";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { useInquiry } from "@/components/celebration/InquiryContext";

export default function StickyMobileCTA() {
  const { draft } = useInquiry();
  if (!draft.products.length) return null;
  return <div aria-label="Ürünler ve talep" className="fixed inset-x-0 bottom-0 z-40 bg-[var(--taste-field)] px-[18px] pb-[calc(12px+env(safe-area-inset-bottom))] pt-3 md:hidden"><div className="mx-auto flex max-w-lg gap-3"><Link href="/#urunler" className="flex min-h-11 flex-1 items-center justify-center bg-white px-4 text-sm text-[var(--taste-ink)]">Ürünler</Link><Link href="/talep-olustur" className="flex min-h-11 flex-[1.5] items-center justify-between gap-4 bg-[var(--taste-action)] px-4 text-sm text-white">Talebim ({draft.products.length})<ArrowUpRight size={16} /></Link></div></div>;
}
