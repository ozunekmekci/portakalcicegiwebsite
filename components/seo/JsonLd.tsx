import React from "react";

interface JsonLdProps {
  type?: "home" | "product" | "collection";
  productData?: {
    name: string;
    description: string;
    image: string;
    price: string;
    slug: string;
  };
  collectionData?: {
    name: string;
    description: string;
    slug: string;
  };
}

export default function JsonLd({ type = "home", productData, collectionData }: JsonLdProps) {
  const baseUrl = "https://portakalcicegiwebsite.vercel.app";

  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "@id": `${baseUrl}/#organization`,
    name: "Portakal Çiçeği Atölye",
    alternateName: "Portakal Çiçeği Hediyelik Tasarım Atölyesi",
    url: baseUrl,
    logo: `${baseUrl}/icon.svg`,
    image: `${baseUrl}/images/about.webp`,
    description: "Doğum, baby shower, düğün ve nişan kutlamaları için özel tasarım 3D akrilik ve pleksi hatıra hediyelikleri atölyesi.",
    telephone: "+905555555555",
    email: "iletisim@portakalcicegiatolye.com",
    priceRange: "₺₺",
    address: {
      "@type": "PostalAddress",
      streetAddress: "Caferağa Mah. Moda Cad. No:42/A",
      addressLocality: "Kadıköy",
      addressRegion: "İstanbul",
      postalCode: "34710",
      addressCountry: "TR",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: 40.9876,
      longitude: 29.0289,
    },
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
        opens: "09:30",
        closes: "18:30",
      },
    ],
    sameAs: [
      "https://www.instagram.com/portakalcicegi.atolye/",
    ],
  };

  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${baseUrl}/#website`,
    url: baseUrl,
    name: "Portakal Çiçeği Atölye",
    description: "Akdeniz Esintili 3D Akrilik Hatıra Hediyelikleri",
    publisher: {
      "@id": `${baseUrl}/#organization`,
    },
    inLanguage: "tr-TR",
  };

  let specificSchema = null;

  if (type === "product" && productData) {
    const rawPrice = productData.price.replace(/[^\d]/g, "") || "50";
    specificSchema = {
      "@context": "https://schema.org",
      "@type": "Product",
      name: productData.name,
      description: productData.description,
      image: productData.image,
      sku: productData.slug,
      brand: {
        "@type": "Brand",
        name: "Portakal Çiçeği Atölye",
      },
      offers: {
        "@type": "AggregateOffer",
        priceCurrency: "TRY",
        lowPrice: rawPrice,
        priceValidUntil: "2027-12-31",
        availability: "https://schema.org/InStock",
        url: `${baseUrl}/urunler/${productData.slug}`,
      },
    };
  }

  if (type === "collection" && collectionData) {
    specificSchema = {
      "@context": "https://schema.org",
      "@type": "CollectionPage",
      name: `${collectionData.name} Koleksiyonu | Portakal Çiçeği Atölye`,
      description: collectionData.description,
      url: `${baseUrl}/koleksiyonlar/${collectionData.slug}`,
    };
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
      />
      {specificSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(specificSchema) }}
        />
      )}
    </>
  );
}
