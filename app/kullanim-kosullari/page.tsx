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
          className="inline-flex items-center gap-2 text-xs font-sans font-medium text-[#696159] hover:text-[#C86D51] transition-colors"
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
            Son güncelleme: 15 Eylül 2026 • Portakal Çiçeği Atölye (Kadıköy / İstanbul)
          </p>
        </div>

        {/* Content */}
        <div className="space-y-8 font-sans text-sm text-[#1E1C1A] leading-relaxed text-left">
          
          <section className="space-y-3">
            <h2 className="font-serif text-xl font-bold text-[#1E1C1A]">1. Hizmet ve Sipariş Modeli</h2>
            <p className="text-[#696159]">
              Portakal Çiçeği Atölye’de siparişe göre 3D katmanlı akrilik, aynalı pleksi ve ahşap detaylı pasta süsleri, hatıra magnetleri ve kapı süsleri hazırlıyoruz. Pasta süsü ve kapı süsünü 1 adet sipariş edebilirsiniz. Magnetleri en az 25 adet veya indirimli kombin setleri içinde hazırlıyoruz.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="font-serif text-xl font-bold text-[#1E1C1A]">2. Tasarım ve Dijital Onay Süreci</h2>
            <p className="text-[#696159]">
              Üretime başlamadan önce isim, tarih, yazı tipi ve renk katmanlarını gösteren dijital taslağı WhatsApp üzerinden gönderiyoruz. Yazılı onayınızı aldıktan sonra kesim ve montaja başlıyoruz.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="font-serif text-xl font-bold text-[#1E1C1A]">3. Üretim ve Teslimat Süreleri</h2>
            <p className="text-[#696159]">
              Onaylanan siparişleri, adede ve sezon yoğunluğuna göre ortalama 3 ile 7 iş gününde hazırlıyoruz. Acil teslimat gerekiyorsa sipariş vermeden önce süreyi bizden teyit etmeniz gerekir. Ürünleri darbe emici kutularda, sigortalı olarak kargoya veriyoruz.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="font-serif text-xl font-bold text-[#1E1C1A]">4. Cayma Hakkı ve İade Koşulları</h2>
            <p className="text-[#696159]">
              Tüketicinin Korunması Hakkında Kanun ve Mesafeli Sözleşmeler Yönetmeliği uyarınca; <strong>tüketicinin istekleri veya kişisel ihtiyaçları doğrultusunda hazırlanan (isim, tarih veya özel tasarım içeren) mallarda cayma hakkı kullanılamaz</strong>. Üretimden veya kargodan kaynaklanan hasar ya da hata varsa ilgili ürünleri hemen ücretsiz olarak yeniden hazırlayıp gönderiyoruz.
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
