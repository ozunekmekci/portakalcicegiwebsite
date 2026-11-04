"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ArrowRight, Check, Play } from "lucide-react";
import type { ProductGroup } from "@/content/celebrations";
import { SelectProductLink, useInquiry } from "./InquiryContext";
import styles from "./Celebration.module.css";

export default function ProductExperience({ group }: { group: ProductGroup }) {
  const [view, setView] = useState<"use" | "detail">("use");
  const [playVideo, setPlayVideo] = useState(false);
  const { draft, toggleProduct } = useInquiry();
  const selected = draft.products.includes(group.id);
  const show = (next: "use" | "detail") => { setView(next); setPlayVideo(false); };

  return <div className={styles.site}><div className={`${styles.container} ${styles.experience}`}>
    <Link href="/#urunler" className={styles.back}><ArrowLeft size={14} /> Ürünlere dön</Link>
    <div className={styles.experienceGrid}>
      <section className={styles.experienceVisual} aria-label={`${group.title} görselleri`}>
        <div className={styles.viewSwitch} role="group" aria-label="Ürünü görüntüleme biçimi"><button onClick={() => show("use")} aria-pressed={view === "use"}>{group.id === "magnet" ? "Toplu sunumda gör" : "Set içinde gör"}</button><button onClick={() => show("detail")} aria-pressed={view === "detail"}>Yakından incele</button></div>
        <div className={styles.productPhoto}>{playVideo && group.video ? <video controls playsInline muted autoPlay preload="metadata" poster={view === "use" ? group.useImage : group.detailImage} aria-label={`${group.title} videosu`}><source src={group.video} type="video/mp4" />Tarayıcın videoyu desteklemiyor.</video> : <Image src={view === "use" ? group.useImage : group.detailImage} alt={`${group.title}: ${view === "use" ? "Mihrimah siparişindeki sunum" : "ürün detayları"}`} fill priority sizes="(max-width: 850px) 90vw, 650px" />}</div>
        <div className={styles.photoCaption}><span>{view === "use" ? "Mihrimah’ın babyshower’ından" : "İsim, renk ve tasarım detayları"}</span>{group.video && <button onClick={() => setPlayVideo(!playVideo)}><Play size={13} />{playVideo ? "Fotoğrafa dön" : "Videoyu izle"}</button>}</div>
      </section>
      <div className={styles.experienceCopy}><p className={styles.eyebrow}>Kutlamana özel</p><h1>{group.title}</h1><h2>{group.line}</h2><p>{group.description}</p>
        <div className={styles.productDetails}><h3>{group.location}</h3>{group.details.map(detail => <p key={detail}><Check size={14} />{detail}</p>)}</div>
        <p className={styles.productNote}>Fotoğraflardaki isim ve renkler örnektir. Kendi kutlaman için istediğin detayları talebine yazabilirsin.</p>
        <button className={styles.selectButton} aria-pressed={selected} onClick={() => toggleProduct(group.id)}>{selected ? <><Check size={16} /> Talebine eklendi · Çıkar</> : <>Talebime ekle <span>+</span></>}</button>
        <SelectProductLink products={[group.id]} className={styles.primary}>Bu ürün için talep oluştur <ArrowRight size={16} /></SelectProductLink>
        <Link href={group.id === "magnet" ? "/urun-gruplari/kapi-susu" : "/urun-gruplari/magnet"} className={styles.textLink}>Uyumlu {group.id === "magnet" ? "kapı süsüne" : "magnetlere"} de bak <ArrowUpRightIcon /></Link>
      </div>
    </div>
    <div className={styles.experienceEnd}><h2>Aynı kutlamanın parçaları.</h2><p>Bu siparişte magnet ve kapı süsü birlikte hazırlandı. İhtiyacın olan parçaları ayrı ayrı seçebilir veya uyumlu bir set isteyebilirsin.</p><SelectProductLink products={["magnet", "kapi-susu"]} concept="Mihrimah gibi isimli, pembe ay ve güneş temalı bir kutlama" className={styles.textLink}>Bu uyumdan yola çıkalım <ArrowRight size={16} /></SelectProductLink></div>
  </div></div>;
}

function ArrowUpRightIcon() { return <span aria-hidden="true">↗</span>; }
