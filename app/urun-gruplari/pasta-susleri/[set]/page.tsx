import type { Metadata } from "next";
import { notFound } from "next/navigation";
import SetStudio from "@/components/sections/SetStudio";
import { cakeSetImage, cakeSetPath, cakeSetTotal, setPosters } from "@/content/set-posters";

type Props = { params: { set: string } };

export const dynamicParams = false;

export function generateStaticParams() {
  return setPosters.map(set => ({ set: set.id }));
}

export function generateMetadata({ params }: Props): Metadata {
  const set = setPosters.find(item => item.id === params.set);
  if (!set) notFound();
  const description = `${set.title} içindeki ${cakeSetTotal(set)} parçayı ve pasta, cupcake ve bardaklarda nasıl göründüklerini incele.`;
  return {
    title: set.title,
    description,
    alternates: { canonical: cakeSetPath(set.id) },
    openGraph: { title: set.title, description, images: [cakeSetImage(set.id, "overview")] },
  };
}

export default function CakeSetDetail({ params }: Props) {
  const set = setPosters.find(item => item.id === params.set);
  if (!set) notFound();
  return <SetStudio key={set.id} set={set} />;
}
