import type { Metadata } from "next";
import SetStudio from "@/components/sections/SetStudio";

export const metadata: Metadata = {
  title: "Kutlama Seti Stüdyosu",
  description: "Pembe ve Mavi setlerdeki süslere, adetlerine ve pasta üzerinde nasıl göründüklerine bak.",
  alternates: { canonical: "/set-studyosu" },
};

export default function SetStudioPage() { return <SetStudio />; }
