"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ArrowRight, Check, MousePointer2, RotateCcw } from "lucide-react";
import styles from "./SetStudio.module.css";
import { SelectProductLink } from "@/components/celebration/InquiryContext";

type Part = "topper" | "picks" | "cupcakes" | "straws";
type Theme = "pembe" | "mavi";
const parts: { id: Part; title: string; count: number; location: string; description: string }[] = [
  { id: "topper", title: "Büyük pasta süsü", count: 1, location: "Pastanın en üstünde", description: "Kutlamanın merkezinde senin fotoğrafın var. Büyük süs, setin bütün renklerini tek bir tasarımda buluşturur." },
  { id: "picks", title: "Şapkalı süsler", count: 10, location: "Pasta ve ikramlarda", description: "Aynı fotoğraf, birbirinden farklı parti şapkaları. Pastanın çevresinde veya ikramların üzerinde kullanabilirsin." },
  { id: "cupcakes", title: "Cupcake süsleri", count: 10, location: "Küçük tatlıların üzerinde", description: "Kutlama temasını küçük ikramlara da taşı. Kısa çubuklu süsler cupcake ve diğer küçük tatlıları tamamlar." },
  { id: "straws", title: "Süslü pipetler", count: 10, location: "İçecek bardaklarında", description: "Masadaki içecekler de kutlamaya katılsın. Fotoğraflı pipet detayları, bütün setle aynı temayı sürdürür." },
];
const layers: Record<Theme, Record<Part, number>> = {
  pembe: { topper: 2, picks: 1, cupcakes: 3, straws: 4 },
  mavi: { topper: 4, picks: 3, cupcakes: 2, straws: 5 },
};
const source = (theme: Theme, part: Part) => `/images/set-layers/${theme}/layer-${layers[theme][part]}.webp`;

function CakeScene() {
  return (
    <svg className={styles.cake} viewBox="0 0 800 680" fill="none" aria-hidden="true">
      <defs>
        <linearGradient id="studio-icing"><stop stopColor="#e9dfd0" /><stop offset=".3" stopColor="#fffdf6" /><stop offset=".72" stopColor="#f8f2e7" /><stop offset="1" stopColor="#dfd4c4" /></linearGradient>
        <linearGradient id="studio-stand"><stop stopColor="#bb9573" /><stop offset=".5" stopColor="#e1c5a0" /><stop offset="1" stopColor="#a47f60" /></linearGradient>
        <linearGradient id="studio-glass" x1="0" y1="0" x2="1" y2="0"><stop stopColor="#e7cfc2" stopOpacity=".5" /><stop offset=".5" stopColor="#fffdf6" stopOpacity=".25" /><stop offset="1" stopColor="#d5b9a6" stopOpacity=".6" /></linearGradient>
        <radialGradient id="studio-floor"><stop stopColor="#ac8d74" stopOpacity=".22" /><stop offset="1" stopColor="#ac8d74" stopOpacity="0" /></radialGradient>
      </defs>
      <ellipse cx="410" cy="595" rx="320" ry="65" fill="url(#studio-floor)" />
      <path d="M358 527H442L435 595Q435 605 464 615Q479 630 400 632Q322 630 337 615Q367 605 365 595Z" fill="url(#studio-stand)" />
      <ellipse cx="400" cy="526" rx="222" ry="43" fill="#b89673" />
      <ellipse cx="400" cy="518" rx="225" ry="42" fill="#e4ceb0" />
      <path d="M212 390H588V482C588 540 212 540 212 482Z" fill="url(#studio-icing)" />
      {[418, 437, 456, 475, 494].map(y => <path key={y} d={`M216 ${y} Q400 ${y + 66} 584 ${y}`} stroke="#d9cebf" strokeOpacity=".55" strokeWidth="2" />)}
      <ellipse cx="400" cy="390" rx="188" ry="46" fill="#fdfaf2" stroke="#e7ddcf" strokeWidth="2" />
      <path d="M282 286H518V382C518 421 282 421 282 382Z" fill="url(#studio-icing)" />
      {[308, 326, 345, 364, 383].map(y => <path key={y} d={`M285 ${y} Q400 ${y + 43} 515 ${y}`} stroke="#d9cebf" strokeOpacity=".55" strokeWidth="1.8" />)}
      <ellipse cx="400" cy="286" rx="118" ry="31" fill="#fffdf6" stroke="#e7ddcf" strokeWidth="2" />
      <ellipse cx="400" cy="287" rx="108" ry="24" stroke="#eee5d7" strokeWidth="1.5" />
      <g transform="translate(151 568)">
        <ellipse cy="43" rx="64" ry="18" fill="#cab29b" fillOpacity=".2" />
        <path d="M-41 1L-32 56Q0 69 32 56L41 1Z" fill="#ddc5ad" />
        {[-26, -13, 0, 13, 26].map(x => <path key={x} d={`M${x} 8L${x * .78} 55`} stroke="#b49a7c" strokeOpacity=".5" strokeWidth="2" />)}
        <path d="M-48 1Q-51 -17 -29 -23Q-35 -42 -9 -46Q-14 -61 8 -70Q0 -55 23 -46Q43 -37 35 -23Q58 -17 48 1Q0 22 -48 1Z" fill="#fffdf7" stroke="#e6dccc" strokeWidth="2" />
        <path d="M-28 -22Q1 -12 34 -24M-9 -45Q9 -37 23 -44" stroke="#e5d9c9" strokeWidth="2" />
      </g>
      <ellipse cx="663" cy="590" rx="45" ry="12" fill="#cab29b" fillOpacity=".2" />
      <g transform="translate(663 430)">
        <path d="M-37 6L-28 139Q0 161 28 139L37 6Z" fill="url(#studio-glass)" stroke="#cab4a3" strokeWidth="1.5" />
        <ellipse cy="6" rx="37" ry="10" stroke="#c9b2a1" strokeWidth="1.5" />
        <path d="M-28 66Q0 78 28 66L24 132Q0 150 -24 132Z" fill="#efbcac" fillOpacity=".5" />
        <path d="M-24 20L-17 129" stroke="white" strokeOpacity=".8" strokeWidth="4" strokeLinecap="round" />
      </g>
    </svg>
  );
}

export default function SetStudio() {
  const [theme, setTheme] = useState<Theme>("pembe");
  const [mode, setMode] = useState<"scene" | "pieces">("scene");
  const [selected, setSelected] = useState<Part>("topper");
  const [showAll, setShowAll] = useState(true);
  const active = parts.find(part => part.id === selected)!;
  const title = theme === "pembe" ? "Pembe Set" : "Mavi Set";
  const selectPart = (part: Part) => setSelected(part);

  return (
    <div className={styles.studio} data-theme={theme}>
      <div className={styles.container}>
        <div className={styles.breadcrumb}>
          <Link href="/set-icerikleri"><ArrowLeft size={14} /> Set içerikleri</Link>
          <span>Pasta süsü setleri</span>
        </div>
        <div className={styles.heading}>
          <div><p className={styles.eyebrow}>Sana özel, parça parça.</p><h1>Bir set. <em>Bütün bir kutlama.</em></h1></div>
          <p>Fotoğrafın, renklerin, kutlaman.<br />Her parçanın masandaki yerini keşfet.</p>
        </div>

        <div className={styles.workspace}>
          <section className={styles.visual} aria-label="Etkileşimli set görselleri">
            <div className={styles.visualToolbar}>
              <div className={styles.modeSwitch} role="group" aria-label="Seti görüntüleme biçimi">
                <button aria-pressed={mode === "scene"} onClick={() => setMode("scene")}>Kutlamada gör</button>
                <button aria-pressed={mode === "pieces"} onClick={() => setMode("pieces")}>Parçaları incele</button>
              </div>
              <span className={styles.viewNumber}>{mode === "scene" ? "01 / Kullanım" : "02 / Set içeriği"}</span>
            </div>

            <div className={styles.stage}>
              {mode === "scene" ? <>
                <span className={styles.sceneCaption}>Kutlama masanda<br /><em>böyle görünür.</em></span>
                <CakeScene />
                <button className={`${styles.sceneItem} ${styles.topper}`} data-active={selected === "topper"} data-visible={showAll || selected === "topper"} onClick={() => selectPart("topper")} aria-label="Büyük pasta süsünü incele, 1 adet">
                  <Image src={source(theme, "topper")} alt="Fotoğraflı büyük pasta süsü" fill sizes="(max-width: 800px) 35vw, 250px" className={styles.art} priority />
                </button>
                <button className={`${styles.sceneItem} ${styles.picks}`} data-active={selected === "picks"} data-visible={showAll || selected === "picks"} onClick={() => selectPart("picks")} aria-label="Şapkalı süsleri incele, 10 adet">
                  <span className={styles.woodStick} /><Image src={`/images/set-layers/${theme}/single-cupcake.webp?v=2`} alt="Pastanın yanındaki fotoğraflı şapkalı süs" fill sizes="100px" className={styles.art} />
                </button>
                <button className={`${styles.sceneItem} ${styles.cupcakes}`} data-active={selected === "cupcakes"} data-visible={showAll || selected === "cupcakes"} onClick={() => selectPart("cupcakes")} aria-label="Cupcake süslerini incele, 10 adet">
                  <Image src={`/images/set-layers/${theme}/single-cupcake.webp?v=2`} alt="Cupcake üzerinde fotoğraflı süs" fill sizes="100px" className={styles.art} />
                </button>
                <button className={`${styles.sceneItem} ${styles.straws}`} data-active={selected === "straws"} data-visible={showAll || selected === "straws"} onClick={() => selectPart("straws")} aria-label="Süslü pipetleri incele, 10 adet">
                  <Image src={`/images/set-layers/${theme}/single-straw.webp`} alt="Bardakta fotoğraflı pipet" fill sizes="70px" className={styles.art} />
                </button>
                <span className={styles.sceneNote}>Yerleşim örneği · Paket adetleri listede</span>
              </> : <div className={styles.flatGrid}>
                {parts.map((part, index) => <button key={part.id} className={styles.flatItem} data-active={selected === part.id} onClick={() => selectPart(part.id)} aria-pressed={selected === part.id}>
                  <span className={styles.flatNumber}>0{index + 1}</span>
                  <div className={styles.flatImage}><Image src={source(theme, part.id)} alt={`${title}: ${part.title}`} fill sizes="(max-width: 800px) 40vw, 320px" className={styles.art} /></div>
                  <span className={styles.flatLabel}>{part.title}<strong>{part.count} adet</strong></span>
                </button>)}
              </div>}
            </div>
            <div className={styles.visualBottom}>
              <span><MousePointer2 size={14} /> {active.title} · {active.count} adet</span>
              {mode === "scene" && <button onClick={() => setShowAll(!showAll)} aria-pressed={!showAll}><RotateCcw size={13} />{showAll ? "Yalnızca seçili parça" : "Tüm seti göster"}</button>}
            </div>
          </section>

          <aside className={styles.details} aria-label="Setin içeriği ve kişiselleştirme">
            <div className={styles.productTitle}><p className={styles.eyebrow}>Fotoğraflı kutlama koleksiyonu</p><h2>{title}<span>Senin fotoğrafınla.</span></h2><p>Birbirini tamamlayan 4 farklı parça,<br />kutlamana özel tek bir tema.</p></div>
            <div className={styles.themePicker} role="group" aria-label="Set temasını seç">
              <button onClick={() => setTheme("pembe")} aria-pressed={theme === "pembe"}><span className={styles.pinkSwatch} />Pembe</button>
              <button onClick={() => setTheme("mavi")} aria-pressed={theme === "mavi"}><span className={styles.blueSwatch} />Mavi</button>
            </div>
            <div className={styles.contentsHeading}><h3>Setin içinde</h3><span>31 parça</span></div>
            <div className={styles.partList} role="group" aria-label="İncelenecek parçayı seç">
              {parts.map((part, index) => <button key={part.id} onClick={() => selectPart(part.id)} aria-pressed={selected === part.id}>
                <span className={styles.listNumber}>0{index + 1}</span><span>{part.title}</span><strong>{part.count} adet</strong><ArrowRight size={15} />
              </button>)}
            </div>
            <div className={styles.partDetail} aria-live="polite" aria-atomic="true"><p>{active.location}</p><h3>{active.title}</h3><span>{active.description}</span></div>
            <div className={styles.personalization}><span><Check size={14} /> Fotoğrafına göre hazırlanır</span><span><Check size={14} /> İsim ve yaş birlikte netleştirilir</span></div>
            <SelectProductLink products={["pasta-susleri"]} concept={title} className={styles.orderButton}>Bu seti birlikte tasarlayalım <ArrowRight size={17} /></SelectProductLink>
            <p className={styles.orderNote}>Fotoğrafını ve kutlama tarihini iletmen yeterli.</p>
          </aside>
        </div>
        <div className={styles.closing}><p>Küçük detaylar.<br /><em>Sana ait bir kutlama.</em></p><span>Pembe ve Mavi setlerin içeriğini inceledin.<br />Diğer temaların parçalarına da göz atabilirsin.</span><Link href="/set-icerikleri">Tüm temaları gör <ArrowRight size={16} /></Link></div>
      </div>
    </div>
  );
}
