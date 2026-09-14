import type { Metadata } from "next";
import Hero from "@/components/sections/Hero";
import About from "@/components/sections/About";
import HowItWorks from "@/components/sections/HowItWorks";
import Collections from "@/components/sections/Collections";
import BestsellersSlider from "@/components/sections/BestsellersSlider";
import Gallery from "@/components/sections/Gallery";
import Testimonials from "@/components/sections/Testimonials";
import Contact from "@/components/sections/Contact";
import { getSettings, getTestimonials, getProducts, Testimonial } from "@/lib/db-queries";

export const revalidate = 0;
export const dynamic = "force-dynamic";
export const fetchCache = "force-no-store";

export const metadata: Metadata = {
  title: "Portakal Çiçeği Atölye | Akdeniz Esintili 3D Akrilik Hatıra Tasarımları",
  description: "Doğum, baby shower, düğün, nişan ve ilk yaş kutlamaları için özel tasarım 3D çok katmanlı akrilik hatıralıklar. 100+ adet toplu siparişlerde atölye indirimi. İstanbul.",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Portakal Çiçeği Atölye | Akdeniz Esintili 3D Akrilik Hatıra Tasarımları",
    description: "Doğum, baby shower, düğün ve nişan kutlamaları için özenle tasarlanan çok katmanlı 3D pleksi hatıralar.",
    url: "https://portakalcicegiwebsite.vercel.app",
    type: "website",
  },
};

export default async function Home() {
  let settings: Record<string, string> = {};
  let testimonials: Testimonial[] = [];
  let bestsellers: any[] = [];

  try {
    const [settingsData, testimonialsData, bestsellersData] = await Promise.all([
      getSettings(),
      getTestimonials({ onlyActive: true }),
      getProducts({ onlyActive: true, limit: 10 })
    ]);
    settings = settingsData;
    testimonials = testimonialsData;
    bestsellers = bestsellersData;
  } catch (error) {
    console.error("Error loading homepage data:", error);
  }

  return (
    <>
      <Hero settings={settings} />
      <BestsellersSlider products={bestsellers} />
      <Collections />
      <About settings={settings} />
      <HowItWorks />
      <Gallery />
      <Testimonials testimonials={testimonials} settings={settings} />
      <Contact settings={settings} />
    </>
  );
}
