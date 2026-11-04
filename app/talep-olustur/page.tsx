import type { Metadata } from "next";
import { getSettings } from "@/lib/db-settings";
import InquiryForm from "@/components/celebration/InquiryForm";

export const dynamic = "force-dynamic";
export const metadata: Metadata = {
  title: "Kutlaman için talep oluştur",
  description: "Magnet, kapı süsü ve pasta süsü seçimlerini bir araya getir, kutlaman için talep taslağını hazırla.",
  alternates: { canonical: "/talep-olustur" },
  robots: { index: false, follow: true },
};

export default async function InquiryPage() {
  let phone = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "";
  try { phone = (await getSettings()).contact_phone || phone; }
  catch { /* Kayıtlı iletişim bilgisi okunamazsa mevcut kanal kullanılır. */ }
  return <InquiryForm contactPhone={phone} />;
}
