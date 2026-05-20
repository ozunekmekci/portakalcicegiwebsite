import Hero from "@/components/sections/Hero";
import About from "@/components/sections/About";
import HowItWorks from "@/components/sections/HowItWorks";
import Collections from "@/components/sections/Collections";
import Gallery from "@/components/sections/Gallery";
import Contact from "@/components/sections/Contact";

// Notion değişikliklerinin anında (sayfa her yenilendiğinde) yansıması için önbelleği devre dışı bırakıyoruz.
export const revalidate = 0;

export default function Home() {
  return (
    <>
      <Hero />
      <About />
      <HowItWorks />
      <Collections />
      <Gallery />
      <Contact />
    </>
  );
}







