import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export const metadata = {
  title: "Kullanım ve Sipariş Koşulları | Portakal Çiçeği Atölye",
  description: "Portakal Çiçeği Atölye kişiye özel üretim, sipariş, onay, kargo ve teslimat koşulları.",
};

export default function TermsOfServicePage() {
  return (
    <div className="bg-[#FDFBF7] min-h-screen py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto space-y-10">
        
        {/* Top Breadcrumb Link */}
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-xs font-sans font-medium text-[#696159] hover:text-[#D95A2B] transition-colors"
        >
          <ArrowLeft size={14} />
          <span>Ana Sayfaya Dön</span>
        </Link>

        {/* Heading */}
        <div className="space-y-3 border-b border-[#EDE6DF] pb-8 text-left">
          <h1 className="font-serif text-3xl sm:text-4xl font-bold text-[#1E1C1A] tracking-tight">
            Kullanım ve Sipariş Koşulları
          </h1>
          <p className="font-sans text-sm text-[#696159]">
            Son güncelleme: 14 Eylül 2026 • Portakal Çiçeği Atölye (Kadıköy / İstanbul)
          </p>
        </div>

        {/* Content */}
        <div className="space-y-8 font-sans text-sm text-[#1E1C1A] leading-relaxed text-left">
          
          <section className="space-y-3">
            <h2 className="font-serif text-xl font-bold text-[#1E1C1A]">1. Hizmet ve Sipariş Modeli</h2>
            <p className="text-[#696159]">
              Portakal Çiçeği Atölye, müşterinin talebine özel olarak tasarlanan ve üretilen 3D katmanlı akrilik, aynalı pleksi ve kurutulmuş çiçek detaylı hatıra hediyelikleri üretmektedir. Siparişler genellikle 100 adet ve üzeri toplu organizasyonlar için hazırlanır.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="font-serif text-xl font-bold text-[#1E1C1A]">2. Tasarım ve Dijital Onay Süreci</h2>
            <p className="text-[#696159]">
              Her sipariş için üretime başlamadan önce isim, tarih, font ve renk katmanlarını içeren dijital bir yerleşim taslağı WhatsApp üzerinden müşterinin onayına sunulur. Müşteri tarafından yazılı onay verilmeden fiziksel kesim ve montaj sürecine geçilmez.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="font-serif text-xl font-bold text-[#1E1C1A]">3. Üretim ve Teslimat Süreleri</h2>
            <p className="text-[#696159]">
              Onaylanan siparişlerin üretim süresi sipariş adedine ve sezon yoğunluğuna bağlı olarak ortalama 3 ile 7 iş günü arasındadır. Acil teslimat gerektiren etkinlikler için sipariş öncesinde teyit alınması zorunludur. Ürünler darbe emici özel kutularda sigortalı olarak kargoya teslim edilir.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="font-serif text-xl font-bold text-[#1E1C1A]">4. Cayma Hakkı ve İade Koşulları</h2>
            <p className="text-[#696159]">
              Tüketicinin Korunması Hakkında Kanun ve Mesafeli Sözleşmeler Yönetmeliği uyarınca; <strong>tüketicinin istekleri veya kişisel ihtiyaçları doğrultusunda hazırlanan (isim, tarih veya özel tasarım içeren) mallarda cayma hakkı kullanılamaz</strong>. Ancak üretimden veya kargodan kaynaklı herhangi bir hasar veya hata durumunda, ilgili adetler atölyemizce derhal ücretsiz olarak yeniden üretilip gönderilir.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="font-serif text-xl font-bold text-[#1E1C1A]">5. Fikri Mülkiyet</h2>
            <p className="text-[#696159]">
              Sitede yer alan tüm tasarım modelleri, fotoğraflar, metinler ve marka unsurları Portakal Çiçeği Atölye&apos;ye aittir. İzinsiz kopyalanamaz ve ticari amaçla kullanılamaz.
            </p>
          </section>

        </div>

      </div>
    </div>
  );
}
