export const groupLabels = {
  magnet: "Magnet",
  "kapi-susu": "Kapı süsü",
  "pasta-susleri": "Pasta üstü ve kürdan topper",
} as const;

export type GroupId = keyof typeof groupLabels;
export interface InquiryDraft {
  products: GroupId[];
  quantities: Partial<Record<GroupId, string>>;
  concept: string;
}
export interface InquiryFields {
  name: string;
  occasion: string;
  date: string;
  phone: string;
  notes: string;
}

export function restoreDraft(serialized: string | null): InquiryDraft {
  const empty: InquiryDraft = { products: [], quantities: {}, concept: "" };
  try {
    const value = JSON.parse(serialized || "null");
    if (!value || typeof value !== "object" || !Array.isArray(value.products)) return empty;
    const products = [...new Set(value.products.filter((id: unknown): id is GroupId =>
      typeof id === "string" && Object.hasOwn(groupLabels, id)))];
    const quantities: InquiryDraft["quantities"] = {};
    for (const id of products as GroupId[]) {
      const quantity = value.quantities?.[id];
      quantities[id] = typeof quantity === "string" ? quantity.slice(0, 12) : "";
    }
    return { products: products as GroupId[], quantities, concept: typeof value.concept === "string" ? value.concept.slice(0, 160) : "" };
  } catch {
    return empty;
  }
}

export function getContactTarget(phone: string, message: string): { channel: "whatsapp" | "instagram"; href: string } {
  let number = phone.replace(/\D/g, "");
  if (/^0\d{10}$/.test(number)) number = `90${number.slice(1)}`;
  if (/^5\d{9}$/.test(number)) number = `90${number}`;
  if (/^[1-9]\d{9,14}$/.test(number) && number !== "905555555555") {
    return { channel: "whatsapp", href: `https://wa.me/${number}?text=${encodeURIComponent(message)}` };
  }
  return { channel: "instagram", href: "https://www.instagram.com/portakalcicegi.atolye/" };
}

export function buildInquiryMessage(draft: InquiryDraft, fields: InquiryFields): string {
  const lines = ["Merhaba, kutlamam için bilgi almak istiyorum.", "", `İsim: ${fields.name.trim()}`, `Etkinlik: ${fields.occasion.trim()}`];
  if (fields.date) lines.push(`Tarih: ${fields.date.split("-").reverse().join(".")}`);
  if (draft.concept.trim()) lines.push(`Konsept: ${draft.concept.trim()}`);
  lines.push("", "İlgilendiğim ürünler:");
  for (const id of draft.products) {
    const quantity = draft.quantities[id]?.trim();
    lines.push(`${groupLabels[id]}: ${quantity ? `${quantity} adet` : "Adet netleşecek"}`);
  }
  if (fields.phone.trim()) lines.push("", `Telefon: ${fields.phone.trim()}`);
  if (fields.notes.trim()) lines.push("", `Notum: ${fields.notes.trim()}`);
  return lines.join("\n");
}
