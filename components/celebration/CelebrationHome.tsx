import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, ArrowRight } from "lucide-react";
import { productGroups } from "@/content/celebrations";
import { SelectProductLink } from "./InquiryContext";
import styles from "./Celebration.module.css";

export function ProductGroupCards() {
  return <div className={styles.groupGrid}>{productGroups.map((group, index) => <article className={styles.groupCard} key={group.id}>
    <Link href={`/urun-gruplari/${group.id}`} className={styles.groupImage}>
      <Image src={group.image} alt={group.title} fill sizes="(max-width: 700px) 90vw, 33vw" />
      <span className={styles.imageArrow}><ArrowUpRight size={20} /></span>
    </Link>
    <div className={styles.groupText}><span className={styles.index}>0{index + 1}</span><h3><Link href={`/urun-gruplari/${group.id}`}>{group.title}</Link></h3><p>{group.line}</p>
      <Link href={`/urun-gruplari/${group.id}`} className={styles.textLink}>Yakından bak <ArrowRight size={15} /></Link>
    </div>
  </article>)}</div>;
}

export default function CelebrationHome() {
  return <div className={styles.site}>
    <section className={`${styles.container} ${styles.hero}`} aria-labelledby="home-title">
      <div className={styles.heroCopy}><p className={styles.eyebrow}>Portakal Çiçeği Atölye</p>
        <h1 id="home-title">Kutlamanın<br />her parçası<br /><em>sana özel.</em></h1>
        <p className={styles.heroDescription}>İsimli magnetler, kapı süsleri ve fotoğraflı pasta süsleri. Kutlamana ait renkleri ve detayları birlikte seçelim.</p>
        <div className={styles.actions}><Link href="#urunler" className={styles.primary}>Ürünleri keşfet <ArrowRight size={17} /></Link><Link href="/talep-olustur" className={styles.textLink}>Aklındaki kutlamayı anlat <ArrowUpRight size={16} /></Link></div>
        <div className={styles.heroFootnote}><span className={styles.smallFlower}>✳</span><span>Bir isimle başlar.<br />Kutlamanın detaylarında devam eder.</span></div>
      </div>
      <div className={styles.heroComposition}>
        <div className={styles.heroPaper}><Image src="/images/celebrations/mihrimah-set.webp" alt="Mihrimah'ın isimli kapı süsü ve sepet içindeki uyumlu magnetleri" fill priority sizes="(max-width: 900px) 80vw, 460px" /><span>Mihrimah’ın babyshower’ından</span></div>
        <Link href="/set-studyosu" className={styles.heroInset}><div><Image src="/images/celebrations/pink-cake.webp" alt="Pasta üzerindeki fotoğraflı büyük süs ve şapkalı kürdan topper kullanım örneği" fill priority sizes="(max-width: 900px) 32vw, 210px" /></div><span>Pasta üzerinde gör <ArrowUpRight size={14} /></span></Link>
        <span className={styles.heroHandwritten}>aynı kutlamanın<br />birbirini bulan parçaları</span>
      </div>
    </section>

    <section id="urunler" className={`${styles.container} ${styles.productSection}`} aria-labelledby="products-title">
      <span id="koleksiyonlar" className={styles.anchor} />
      <div className={styles.sectionHeading}><div><p className={styles.eyebrow}>Nereden başlayalım?</p><h2 id="products-title">Kutlamana ne eşlik etsin?</h2></div><p>İhtiyacın olan parçadan başlayabilirsin.<br />Uyumlu bir seti de birlikte düşünebiliriz.</p></div>
      <ProductGroupCards />
    </section>

    <section id="kutlamalar" className={styles.storySection} aria-labelledby="story-title">
      <div className={`${styles.container} ${styles.storyGrid}`}>
        <div className={styles.storyMedia}><video controls playsInline muted loop preload="none" poster="/images/celebrations/mihrimah-set.webp" aria-label="Mihrimah'ın kapı süsü ve magnetlerinin birlikte videosu"><source src="/videos/celebrations/mihrimah-set.mp4" type="video/mp4" />Tarayıcın videoyu desteklemiyor.</video><span>Bir siparişin hikâyesi / 01</span></div>
        <div className={styles.storyCopy}><p className={styles.eyebrow}>Gerçek bir kutlamadan</p><h2 id="story-title">Mihrimah’ın<br /><em>babyshower’ı.</em></h2><p>İsmin etrafında toplanan pembe tonları, ay ve güneş detayları. Konuklara ayrılan magnetler ve kutlamayı karşılayan isimli kapı süsü aynı sipariş için hazırlandı.</p><p>Tek bir magneti yakından inceleyebilir, toplu sunumuna bakabilir ve kapı süsüyle birlikte nasıl göründüğünü izleyebilirsin.</p>
          <div className={styles.storyTags}><Link href="/urun-gruplari/magnet">İsimli magnet</Link><Link href="/urun-gruplari/kapi-susu">Kapı süsü</Link></div>
          <SelectProductLink products={["magnet", "kapi-susu"]} concept="Mihrimah'ın babyshower'ındaki gibi pembe, ay ve güneş detayları" className={styles.primary}>Benzer bir set istiyorum <ArrowRight size={16} /></SelectProductLink>
        </div>
      </div>
    </section>

    <section id="hakkinda" className={`${styles.container} ${styles.studioTeaser}`} aria-labelledby="studio-title">
      <div className={styles.studioPhoto}><Image src="/images/celebrations/pink-pieces.webp" alt="Fotoğraflı büyük pasta süsü ile farklı şapkalı kürdan süslerinin bir arada görünümü" fill sizes="(max-width: 800px) 90vw, 500px" /><span>Kullanım örneklerinden</span></div>
      <div><p className={styles.eyebrow}>Detaylara birlikte bakalım</p><h2 id="studio-title">Pastanın üzerinde<br /><em>sen varsın.</em></h2><p>Fotoğraflı süslerin pasta ve ikramlar üzerinde nasıl durduğunu gör. Pembe ve Mavi setler arasında geçebilir, her parçanın adedini ayrı ayrı inceleyebilirsin.</p><Link href="/set-studyosu" className={styles.primary}>Set stüdyosuna gir <ArrowRight size={16} /></Link><Link href="/set-icerikleri" className={styles.textLink}>Diğer tema setlerine bak <ArrowUpRight size={15} /></Link></div>
    </section>

    <section id="surec" className={`${styles.container} ${styles.process}`} aria-labelledby="process-title"><span id="nasil-calisir" className={styles.anchor} />
      <div className={styles.sectionHeading}><div><p className={styles.eyebrow}>Aklındaki kutlamadan başlayalım</p><h2 id="process-title">Nasıl ilerliyoruz?</h2></div></div>
      <div className={styles.steps}>{[
        ["01", "Parçalarını seç", "Magnet, kapı süsü veya pasta süsü. İhtiyacın olan ürünleri talebine ekle."],
        ["02", "Kutlamanı anlat", "İsim, tarih, düşündüğün renkler ve varsa beğendiğin bir örnek. Bildiklerini paylaşman yeterli."],
        ["03", "Detayları konuşalım", "Adetleri, kişiselleştirmeyi ve istediğin parçaların uyumunu birlikte netleştirelim."],
      ].map(([number, title, text]) => <div key={number}><span>{number}</span><h3>{title}</h3><p>{text}</p></div>)}</div>
    </section>
    <section id="iletisim" className={styles.finalCta}><div className={styles.container}><p className={styles.eyebrow}>Portakal Çiçeği Atölye</p><h2>Senin kutlamanda<br /><em>neler olsun?</em></h2><p>Henüz her detaya karar vermiş olman gerekmiyor.</p><Link href="/talep-olustur" className={styles.primary}>Talebini oluştur <ArrowRight size={17} /></Link></div></section>
  </div>;
}
