import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { productGroups } from "@/content/celebrations";
import ProductExperience from "@/components/celebration/ProductExperience";
import SetStudio from "@/components/sections/SetStudio";

type Props = { params: { slug: string } };
export function generateStaticParams() { return productGroups.map(group => ({ slug: group.id })); }
export function generateMetadata({ params }: Props): Metadata {
  const group = productGroups.find(item => item.id === params.slug);
  if (!group) return { title: "Ürün grubu bulunamadı" };
  return { title: group.title, description: group.description, alternates: { canonical: `/urun-gruplari/${group.id}` }, openGraph: { title: `${group.title} | Portakal Çiçeği Atölye`, description: group.description, images: [group.image] } };
}
export default function ProductGroupPage({ params }: Props) {
  const group = productGroups.find(item => item.id === params.slug);
  if (!group) notFound();
  return group.id === "pasta-susleri" ? <SetStudio /> : <ProductExperience key={group.id} group={group} />;
}
