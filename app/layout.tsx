import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import "./globals.css";

const inter = Inter({ 
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://portakalcicegiwebsite.vercel.app"),
  title: "Portakal Çiçeği Atölye | Premium Hediyelik Tasarımı",
  description: "Doğum, baby shower, düğün ve nişanlarınız için özel tasarım, 3D akrilik hediyelikler. 100+ adet toplu siparişlerde özel fiyat. İstanbul.",
  keywords: ["hediyelik", "baby shower", "düğün hediyesi", "doğum hediyesi", "3D akrilik", "pleksi hediyelik", "özel tasarım", "toplu sipariş", "diş buğdayı", "nikah şekeri"],
  authors: [{ name: "Portakal Çiçeği Atölye" }],
  creator: "Portakal Çiçeği Atölye",
  openGraph: {
    type: "website",
    locale: "tr_TR",
    url: "https://portakalcicegiwebsite.vercel.app",
    siteName: "Portakal Çiçeği Atölye",
    title: "Portakal Çiçeği Atölye | Premium Hediyelik Tasarımı",
    description: "Özel günleriniz için tasarlanmış, el yapımı 3D akrilik hediyelikler.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Portakal Çiçeği Atölye",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Portakal Çiçeği Atölye",
    description: "Premium hediyelik tasarımı",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
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
      <body className={`${inter.variable} ${playfair.variable} min-h-screen flex flex-col bg-brand-bg-cream text-brand-text-dark`}>
        <Navbar />
        <main className="flex-grow">{children}</main>
        <Footer />
      </body>
    </html>
  );
}


