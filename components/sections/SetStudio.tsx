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
  { id: "topper", title: "Büyük pasta süsü", count: 1, location: "Pastanın en üstünde", description: "Fotoğrafınla hazırlanan büyük süsü pastanın üstüne yerleştirebilirsin. Renkleri setin diğer parçalarıyla uyumludur." },
  { id: "picks", title: "Şapkalı süsler", count: 10, location: "Pasta ve ikramlarda", description: "Fotoğrafını farklı parti şapkalarıyla hazırlıyoruz. Bu süsleri pastanın çevresinde veya ikramlarda kullanabilirsin." },
  { id: "cupcakes", title: "Cupcake süsleri", count: 10, location: "Küçük tatlıların üzerinde", description: "Kısa çubuklu süsleri cupcake ve diğer küçük tatlıların üzerine yerleştirebilirsin." },
  { id: "straws", title: "Süslü pipetler", count: 10, location: "İçecek bardaklarında", description: "Fotoğraflı pipetler de setin diğer süsleriyle aynı temada hazırlanır." },
];
const layers: Record<Theme, Record<Part, number>> = {
  pembe: { topper: 2, picks: 1, cupcakes: 3, straws: 4 },
  mavi: { topper: 4, picks: 3, cupcakes: 2, straws: 5 },
};
const source = (theme: Theme, part: Part) => `/images/set-layers/${theme}/layer-${layers[theme][part]}.webp`;

const pickPlacement = [
  { left: "1%", top: "4%", height: "80%", transform: "rotate(-12deg)" },
  { left: "15%", top: "-1%", height: "77%", transform: "rotate(-7deg)" },
  { left: "73%", top: "1%", height: "77%", transform: "rotate(7deg)" },
  { left: "86%", top: "11%", height: "77%", transform: "rotate(12deg)" },
  { left: "19%", top: "21%", height: "74%", transform: "rotate(-5deg)" },
  { left: "41%", top: "26%", height: "70%" },
  { left: "63%", top: "23%", height: "71%", transform: "rotate(5deg)" },
];

function CakeScene() {
  return <Image src="/images/set-scene/realistic-food-v2.webp" alt="" fill priority quality={90} sizes="(max-width: 800px) 95vw, (max-width: 1050px) 85vw, 780px" className={styles.cake} />;
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
          <div><p className={styles.eyebrow}>Fotoğraflı pasta süsleri</p><h1>Setin içinde <em>neler var?</em></h1></div>
          <p>Süsleri kendi fotoğrafınla hazırlıyoruz.<br />Pastada ve ikramlarda nasıl durduğuna bak.</p>
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
                <span className={styles.sceneCaption}>Masada<br /><em>kullanım örneği</em></span>
                <CakeScene />
                <button className={`${styles.sceneItem} ${styles.topper}`} data-active={selected === "topper"} data-visible={showAll || selected === "topper"} onClick={() => selectPart("topper")} aria-label="Büyük pasta süsünü incele, 1 adet">
                  <span className={styles.woodStick} />
                  <Image src={source(theme, "topper")} alt="Fotoğraflı büyük pasta süsü" fill sizes="(max-width: 800px) 35vw, 250px" className={styles.art} priority />
                </button>
                <button className={`${styles.sceneItem} ${styles.picks}`} data-active={selected === "picks"} data-visible={showAll || selected === "picks"} onClick={() => selectPart("picks")} aria-label="Şapkalı süsleri incele, 10 adet">
                  {pickPlacement.map((placement, index) => <span key={index} className={styles.pick} style={placement}>
                    <span className={styles.woodStick} /><span className={styles.pickHead}><Image src={`/images/set-layers/${theme}/pick-head-${index + 1}.webp`} alt="" fill sizes="60px" className={styles.art} /></span>
                  </span>)}
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
            <div className={styles.productTitle}><p className={styles.eyebrow}>Fotoğraflı kutlama koleksiyonu</p><h2>{title}<span>Senin fotoğrafınla.</span></h2><p>Aynı temada 4 farklı süs:<br />pasta ve cupcake süsleri, şapkalı süsler, pipetler.</p></div>
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
            <div className={styles.personalization}><span><Check size={14} /> Fotoğrafına göre hazırlanır</span><span><Check size={14} /> İsim ve yaşı birlikte belirleyelim</span></div>
            <SelectProductLink products={["pasta-susleri"]} concept={title} className={styles.orderButton}>Bu set için bilgi al <ArrowRight size={17} /></SelectProductLink>
            <p className={styles.orderNote}>Fotoğrafını ve kutlama tarihini mesajında paylaşabilirsin.</p>
          </aside>
        </div>
        <div className={styles.closing}><p>Başka bir tema<br /><em>ister misin?</em></p><span>Diğer temalardaki süsleri ve<br />set içeriklerini de inceleyebilirsin.</span><Link href="/set-icerikleri">Tüm temaları gör <ArrowRight size={16} /></Link></div>
      </div>
    </div>
  );
}
