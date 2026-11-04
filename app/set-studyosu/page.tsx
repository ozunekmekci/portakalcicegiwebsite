import type { Metadata } from "next";
import SetStudio from "@/components/sections/SetStudio";

export const metadata: Metadata = {
  title: "Kutlama Seti Stüdyosu",
  description: "Pembe ve Mavi kutlama setlerini kullanım sahnesinde ve parça parça inceleyin.",
  alternates: { canonical: "/set-studyosu" },
};

export default function SetStudioPage() { return <SetStudio />; }
