import Link from "next/link";
import { ArrowUpRight, Instagram } from "lucide-react";
import { productGroups } from "@/content/celebrations";

export default function Footer() {
  return <footer className="bg-[var(--taste-field)] pb-28 pt-14 text-[var(--taste-ink)] md:pb-9">
    <div className="mx-auto max-w-[1344px] px-[var(--taste-gutter)]"><div className="grid gap-10 md:grid-cols-[1.5fr_1fr_1fr]">
      <div><Link href="/" className="font-serif text-[clamp(28px,4vw,58px)] leading-tight font-medium">Portakal Çiçeği Atölye</Link><p className="mt-4 max-w-xs text-sm leading-7">İsimli magnetler, kapı süsleri ve fotoğraflı pasta süsleri hazırlıyoruz.</p></div>
      <nav aria-label="Ürün grupları"><h2 className="mb-4 font-serif text-lg font-medium">Ürünlere göz at</h2>{productGroups.map(group => <Link key={group.id} className="block py-2 text-base hover:underline" href={`/urun-gruplari/${group.id}`}>{group.title}</Link>)}<Link href="/set-icerikleri" className="block py-2 text-base hover:underline">Set içerikleri</Link></nav>
      <div><h2 className="mb-4 font-serif text-lg font-medium">Bize ulaş</h2><Link href="/talep-olustur" className="inline-flex min-h-11 items-center gap-5 underline underline-offset-4 text-sm">Talebini oluştur <ArrowUpRight size={15} /></Link><a href="https://www.instagram.com/portakalcicegi.atolye/" target="_blank" rel="noopener noreferrer" className="mt-4 flex min-h-11 items-center gap-2 text-sm"><Instagram size={16} />Instagram’da atölye</a></div>
    </div><div className="mt-10 flex flex-wrap justify-between gap-5 text-sm"><p>© {new Date().getFullYear()} Portakal Çiçeği Atölye</p><div className="flex gap-5"><Link href="/gizlilik-politikasi">Gizlilik politikası</Link><Link href="/kullanim-kosullari">Sipariş koşulları</Link></div></div></div>
  </footer>;
}
