import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export const metadata = {
  title: "Gizlilik ve KVKK Politikası | Portakal Çiçeği Atölye",
  description: "Portakal Çiçeği Atölye kişisel verilerin korunması (KVKK) ve gizlilik politikası metni.",
};

export default function PrivacyPolicyPage() {
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
            Gizlilik ve Kişisel Verilerin Korunması Politikası
          </h1>
          <p className="font-sans text-sm text-[#696159]">
            Son güncelleme: 14 Eylül 2026 • Portakal Çiçeği Atölye (Kadıköy / İstanbul)
          </p>
        </div>

        {/* Content */}
        <div className="space-y-8 font-sans text-sm text-[#1E1C1A] leading-relaxed text-left">
          
          <section className="space-y-3">
            <h2 className="font-serif text-xl font-bold text-[#1E1C1A]">1. Veri Sorumlusu</h2>
            <p className="text-[#696159]">
              Portakal Çiçeği Atölye (“Atölye”), 6698 sayılı Kişisel Verilerin Korunması Kanunu (“KVKK”) uyarınca veri sorumlusu sıfatıyla hareket etmektedir. Atölyemiz Caferağa Mah. Moda Cad. No:42/A Kadıköy / İstanbul adresinde faaliyet göstermektedir.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="font-serif text-xl font-bold text-[#1E1C1A]">2. Hangi Veriler İşlenmektedir?</h2>
            <p className="text-[#696159]">
              Kişiye özel 3D akrilik ve pleksi hatıra hediyelik taleplerinizi hazırlamak amacıyla aşağıdaki veriler toplanmaktadır:
            </p>
            <ul className="list-disc pl-5 space-y-1.5 text-[#696159]">
              <li><strong>Kimlik ve İletişim Bilgileri:</strong> Adınız, soyadınız, telefon numaranız, teslimat adresiniz ve e-posta adresiniz.</li>
              <li><strong>Kişiselleştirme Verileri:</strong> Ürün üzerine işlenmesini talep ettiğiniz isim, tarih, özel not ve kutlama konsepti detayları.</li>
              <li><strong>İletişim Kayıtları:</strong> WhatsApp ve form üzerinden ilettiğiniz mesajlar ve sipariş detayları.</li>
            </ul>
          </section>

          <section className="space-y-3">
            <h2 className="font-serif text-xl font-bold text-[#1E1C1A]">3. Kişisel Verilerin İşlenme Amaçları</h2>
            <p className="text-[#696159]">
              Verileriniz; siparişlerin tasarım ve üretim süreçlerinin yürütülmesi, teslimat organizasyonu, fiyat tekliflerinin hazırlanması ve müşteri memnuniyetinin sağlanması amacıyla işlenir.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="font-serif text-xl font-bold text-[#1E1C1A]">4. Çerezler (Cookies) ve Analitik</h2>
            <p className="text-[#696159]">
              Web sitemizde ziyaretçi deneyimini optimize etmek ve trafik analizleri yapmak amacıyla anonim çerezler kullanılmaktadır. Tarayıcı ayarlarınızdan dilediğiniz an çerez tercihlerini değiştirebilirsiniz.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="font-serif text-xl font-bold text-[#1E1C1A]">5. Haklarınız</h2>
            <p className="text-[#696159]">
              KVKK&apos;nın 11. maddesi uyarınca dilediğiniz zaman verilerinizin işlenip işlenmediğini öğrenme, düzeltme, silme ve bilgi talep etme hakkına sahipsiniz. Başvurularınızı <code>iletisim@portakalcicegiatolye.com</code> adresine iletebilirsiniz.
            </p>
          </section>

        </div>

      </div>
    </div>
  );
}
