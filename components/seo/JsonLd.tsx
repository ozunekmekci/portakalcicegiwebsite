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
    "@type": "Organization",
    "@id": `${baseUrl}/#organization`,
    name: "Portakal Çiçeği Atölye",
    alternateName: "Portakal Çiçeği Hediyelik Tasarım Atölyesi",
    url: baseUrl,
    logo: `${baseUrl}/icon.svg`,
    image: `${baseUrl}/images/celebrations/mihrimah-set.webp`,
    description: "Kişiye özel magnet, kapı süsü ve fotoğraflı pasta süsleri.",
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
    description: "Kutlamana özel magnetler, kapı süsleri ve pasta süsleri",
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
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema).replace(/</g, "\\u003c") }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema).replace(/</g, "\\u003c") }}
      />
      {specificSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(specificSchema).replace(/</g, "\\u003c") }}
        />
      )}
    </>
  );
}
