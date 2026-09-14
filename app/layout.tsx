import type { Metadata, Viewport } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import AnnouncementBar from "@/components/layout/AnnouncementBar";
import StickyMobileCTA from "@/components/layout/StickyMobileCTA";
import CookieBanner from "@/components/ui/CookieBanner";
import Analytics from "@/components/analytics/Analytics";
import JsonLd from "@/components/seo/JsonLd";
import "./globals.css";

const inter = Inter({ 
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
  adjustFontFallback: false,
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
  adjustFontFallback: false,
});

export const viewport: Viewport = {
  themeColor: "#FDFBF7",
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  metadataBase: new URL("https://portakalcicegiwebsite.vercel.app"),
  title: {
    default: "Portakal Çiçeği Atölye | Akdeniz Esintili 3D Akrilik Hatıra Tasarımları",
    template: "%s | Portakal Çiçeği Atölye",
  },
  description: "Doğum, baby shower, düğün, nişan ve ilk yaş kutlamaları için özel tasarım 3D akrilik ve pleksi hatıra hediyelikler. 100+ adet toplu siparişlerde özel indirim ve kişiselleştirme. İstanbul.",
  keywords: [
    "hediyelik",
    "baby shower hediyeliği",
    "düğün hatırası",
    "doğum hediyesi",
    "3D akrilik",
    "pleksi hediyelik",
    "pleksi magnet",
    "özel tasarım hediyelik",
    "toplu sipariş hediyelik",
    "diş buğdayı hatırası",
    "nikah şekeri alternatifi",
    "Akdeniz atölye hediyelik"
  ],
  authors: [{ name: "Portakal Çiçeği Atölye", url: "https://portakalcicegiwebsite.vercel.app" }],
  creator: "Portakal Çiçeği Atölye",
  publisher: "Portakal Çiçeği Atölye",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  alternates: {
    canonical: "/",
  },
  icons: {
    icon: [
      { url: "/icon.svg", type: "image/svg+xml" },
    ],
    apple: [
      { url: "/apple-icon.svg", type: "image/svg+xml" },
    ],
  },
  openGraph: {
    type: "website",
    locale: "tr_TR",
    url: "https://portakalcicegiwebsite.vercel.app",
    siteName: "Portakal Çiçeği Atölye",
    title: "Portakal Çiçeği Atölye | Akdeniz Esintili 3D Akrilik Hatıra Tasarımları",
    description: "Doğum, baby shower, düğün ve nişan kutlamaları için özenle tasarlanan çok katmanlı 3D pleksi hatıralar.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Portakal Çiçeği Atölye | Premium Hediyelik Tasarımı",
    description: "Akdeniz zarafetiyle elde üretilen 3D akrilik hatıralar.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="tr">
      <head>
        <JsonLd type="home" />
      </head>
      <body className={`${inter.variable} ${playfair.variable} min-h-screen flex flex-col bg-brand-cream text-brand-ink selection:bg-[#F7E5DB] selection:text-[#1E1C1A]`}>
        <Analytics />
        <AnnouncementBar />
        <Navbar />
        <main className="flex-grow">{children}</main>
        <Footer />
        <StickyMobileCTA />
        <CookieBanner />
      </body>
    </html>
  );
}
