import Hero from "@/components/sections/Hero";
import About from "@/components/sections/About";
import HowItWorks from "@/components/sections/HowItWorks";
import Collections from "@/components/sections/Collections";
import ProductGrid from "@/components/sections/ProductGrid";
import BestsellersSlider from "@/components/sections/BestsellersSlider";
import Gallery from "@/components/sections/Gallery";
import Testimonials from "@/components/sections/Testimonials";
import Contact from "@/components/sections/Contact";
import { getSettings, getTestimonials, getProducts, Testimonial } from "@/lib/db-queries";

export const revalidate = 0;
export const dynamic = "force-dynamic";
export const fetchCache = "force-no-store";

export default async function Home() {
  let settings: Record<string, string> = {};
  let testimonials: Testimonial[] = [];
  let products: any[] = [];
  let bestsellers: any[] = [];

  try {
    const [settingsData, testimonialsData, productsData, bestsellersData] = await Promise.all([
      getSettings(),
      getTestimonials({ onlyActive: true }),
      getProducts({ onlyActive: true, limit: 4 }),
      getProducts({ onlyActive: true, limit: 10 })
    ]);
    settings = settingsData;
    testimonials = testimonialsData;
    products = productsData;
    bestsellers = bestsellersData;
  } catch (error) {
    console.error("Error loading homepage data:", error);
  }

  return (
    <>
      <Hero settings={settings} />
      <BestsellersSlider products={bestsellers} />
      <Collections />
      <ProductGrid products={products} />
      <About settings={settings} />
      <HowItWorks />
      <Gallery />
      <Testimonials testimonials={testimonials} />
      <Contact settings={settings} />
    </>
  );
}
