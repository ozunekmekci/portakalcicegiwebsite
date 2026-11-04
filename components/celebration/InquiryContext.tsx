"use client";

import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import Link from "next/link";
import { restoreDraft, type GroupId, type InquiryDraft } from "@/lib/inquiry";

const storageKey = "portakal-celebration-selection";
interface InquiryContextValue {
  draft: InquiryDraft;
  ready: boolean;
  toggleProduct: (id: GroupId) => void;
  selectProducts: (ids: GroupId[], concept?: string) => void;
  setQuantity: (id: GroupId, quantity: string) => void;
  setConcept: (concept: string) => void;
}
const InquiryContext = createContext<InquiryContextValue | null>(null);

export function InquiryProvider({ children }: { children: ReactNode }) {
  const [draft, setDraft] = useState<InquiryDraft>({ products: [], quantities: {}, concept: "" });
  const [ready, setReady] = useState(false);

  useEffect(() => {
    try { setDraft(restoreDraft(sessionStorage.getItem(storageKey))); } catch { /* Depo kapalıyken seçim bellekte kalır. */ }
    setReady(true);
  }, []);
  useEffect(() => {
    if (ready) {
      try { sessionStorage.setItem(storageKey, JSON.stringify(draft)); } catch { /* Sayfa geçişlerinde context seçimi korur. */ }
    }
  }, [draft, ready]);

  const toggleProduct = (id: GroupId) => setDraft(previous => {
    const products = previous.products.includes(id) ? previous.products.filter(item => item !== id) : [...previous.products, id];
    const quantities = { ...previous.quantities };
    if (!products.includes(id)) delete quantities[id];
    return { ...previous, products, quantities };
  });
  const selectProducts = (ids: GroupId[], concept?: string) => setDraft(previous => ({
    ...previous, products: Array.from(new Set([...previous.products, ...ids])),
    concept: concept === undefined ? previous.concept : concept,
  }));
  const setQuantity = (id: GroupId, quantity: string) => setDraft(previous => ({ ...previous, quantities: { ...previous.quantities, [id]: quantity } }));
  const setConcept = (concept: string) => setDraft(previous => ({ ...previous, concept }));

  return <InquiryContext.Provider value={{ draft, ready, toggleProduct, selectProducts, setQuantity, setConcept }}>{children}</InquiryContext.Provider>;
}

export function useInquiry() {
  const context = useContext(InquiryContext);
  if (!context) throw new Error("Ürün seçimi InquiryProvider içinde kullanılmalı.");
  return context;
}

export function SelectProductLink({ products, concept, children, className }: {
  products: GroupId[]; concept?: string; children: ReactNode; className?: string;
}) {
  const { selectProducts } = useInquiry();
  return <Link href="/talep-olustur" className={className} onClick={() => selectProducts(products, concept)}>{children}</Link>;
}
