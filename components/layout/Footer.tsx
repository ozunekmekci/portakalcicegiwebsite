import Link from "next/link";
import { ArrowUpRight, Instagram } from "lucide-react";
import { productGroups } from "@/content/celebrations";

export default function Footer() {
  return <footer className="border-t border-[#ded4c5] bg-[#ece6da] pb-28 pt-14 text-[#615345] md:pb-9">
    <div className="mx-auto max-w-[1344px] px-[18px] sm:px-8"><div className="grid gap-10 md:grid-cols-[1.5fr_1fr_1fr]">
      <div><Link href="/" className="font-serif text-[27px] font-medium text-[#453a30]">Portakal Çiçeği Atölye</Link><p className="mt-4 max-w-xs text-xs leading-7">Kutlamana özel magnetler, isimli kapı süsleri ve fotoğraflı pasta süsleri. Renkleri ve tasarım detaylarını birlikte seçelim.</p></div>
      <nav aria-label="Ürün grupları"><h2 className="mb-4 font-serif text-lg font-medium">Ürünlere göz at</h2>{productGroups.map(group => <Link key={group.id} className="block py-2 text-xs hover:text-[#a9533d]" href={`/urun-gruplari/${group.id}`}>{group.title}</Link>)}<Link href="/set-icerikleri" className="block py-2 text-xs hover:text-[#a9533d]">Set içerikleri</Link></nav>
      <div><h2 className="mb-4 font-serif text-lg font-medium">Kutlamanı konuşalım</h2><Link href="/talep-olustur" className="inline-flex min-h-11 items-center gap-5 border-b border-[#b59e84] text-xs">Talebini oluştur <ArrowUpRight size={15} /></Link><a href="https://www.instagram.com/portakalcicegi.atolye/" target="_blank" rel="noopener noreferrer" className="mt-4 flex min-h-11 items-center gap-2 text-xs"><Instagram size={16} />Instagram’da atölye</a></div>
    </div><div className="mt-10 flex flex-wrap justify-between gap-5 border-t border-[#d7cdbf] pt-6 text-[10px] text-[#8d7a65]"><p>© {new Date().getFullYear()} Portakal Çiçeği Atölye</p><div className="flex gap-5"><Link href="/gizlilik-politikasi">Gizlilik politikası</Link><Link href="/kullanim-kosullari">Sipariş koşulları</Link></div></div></div>
  </footer>;
}
