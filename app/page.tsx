import Hero from "@/components/sections/Hero";
import About from "@/components/sections/About";
import HowItWorks from "@/components/sections/HowItWorks";
import Collections from "@/components/sections/Collections";
import Gallery from "@/components/sections/Gallery";
import Testimonials from "@/components/sections/Testimonials";
import Contact from "@/components/sections/Contact";
import { getSettings, getTestimonials, Testimonial } from "@/lib/db-queries";

export const revalidate = 0;
export const dynamic = "force-dynamic";
export const fetchCache = "force-no-store";

export default async function Home() {
  let settings: Record<string, string> = {};
  let testimonials: Testimonial[] = [];

  try {
    const [settingsData, testimonialsData] = await Promise.all([
      getSettings(),
      getTestimonials({ onlyActive: true })
    ]);
    settings = settingsData;
    testimonials = testimonialsData;
  } catch (error) {
    console.error("Error loading homepage data:", error);
  }

  return (
    <>
      <Hero settings={settings} />
      <About settings={settings} />
      <HowItWorks />
      <Collections />
      <Gallery />
      {testimonials.length > 0 && <Testimonials testimonials={testimonials} />}
      <Contact settings={settings} />
    </>
  );
}







