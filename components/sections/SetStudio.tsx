"use client";

import { useEffect, useRef, useState, type KeyboardEvent } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ArrowRight, Check, ChevronLeft, ChevronRight } from "lucide-react";
import { SelectProductLink } from "@/components/celebration/InquiryContext";
import { cakeCatalogPath, cakeSetImage, cakeSetTotal, getCakeSetParts, type SetPoster } from "@/content/set-posters";
import styles from "./SetStudio.module.css";

const slides = [
  { id: "overview", title: "Tüm set" },
  { id: "cake", title: "Pasta süsleri" },
  { id: "cupcakes", title: "Cupcake süsleri" },
  { id: "straws", title: "Pipetler" },
] as const;

const sizes = "(max-width: 600px) 94vw, (max-width: 800px) 560px, (max-width: 1150px) 52vw, 580px";

export default function SetStudio({ set }: { set: SetPoster }) {
  const [active, setActive] = useState(0);
  const viewport = useRef<HTMLDivElement>(null);
  const scrollTimer = useRef<ReturnType<typeof setTimeout>>();
  const parts = getCakeSetParts(set);
  const total = cakeSetTotal(set);
  const { topper, picks, cupcakes, straws } = set.counts;
  const captions = [
    `${total} parça bir arada`,
    `${topper} büyük süs ve ${picks} pasta kürdanı`,
    `${cupcakes} cupcake süsü`,
    `${straws} süslü pipet`,
  ];
  const uses = [
    "",
    "Kutlama masasında pasta üzerindeki süsler",
    `Servis tepsisinde ${cupcakes} süslü cupcake`,
    `${straws} bardakta birer süslü pipet`,
  ];

  useEffect(() => () => clearTimeout(scrollTimer.current), []);

  function goTo(index: number) {
    const frame = viewport.current;
    if (!frame || index < 0 || index >= slides.length) return;
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    setActive(index);
    frame.scrollTo({ left: index * frame.clientWidth, behavior: reducedMotion ? "instant" : "smooth" });
  }

  function openFromOverview(index: number) {
    viewport.current?.focus({ preventScroll: true });
    goTo(index);
  }

  function syncSlide() {
    clearTimeout(scrollTimer.current);
    scrollTimer.current = setTimeout(() => {
      const frame = viewport.current;
      if (frame?.clientWidth) setActive(Math.round(frame.scrollLeft / frame.clientWidth));
    }, 120);
  }

  function onKeyDown(event: KeyboardEvent<HTMLElement>) {
    if (event.altKey || event.ctrlKey || event.metaKey) return;
    const index = { ArrowLeft: active - 1, ArrowRight: active + 1, Home: 0, End: slides.length - 1 }[event.key];
    if (index === undefined) return;
    event.preventDefault();
    goTo(index);
  }

  return (
    <div className={styles.studio} data-theme={set.id}>
      <div className={`${styles.container} ${styles.detailContainer}`}>
        <Link href={cakeCatalogPath} className={styles.backLink}><ArrowLeft size={16} aria-hidden="true" /> Tüm pasta süsü setleri</Link>
        <div className={styles.workspace}>
          <header className={styles.detailHeading}>
            <p className={styles.eyebrow}>Kişiye özel kutlama süsleri</p>
            <h1 id="cake-set-title">{set.title}</h1>
            <p className={styles.description}>Pastadan içecek bardaklarına, kutlama masası için aynı temada hazırlanan süsler.</p>
          </header>
          <section className={styles.gallery} aria-label="Set fotoğrafları" aria-roledescription="karusel" onKeyDown={onKeyDown}>
            <div className={styles.thumbnails} role="group" aria-label="Gösterilecek fotoğraf">
              {slides.map((slide, index) => (
                <button key={slide.id} type="button" onClick={() => goTo(index)} aria-pressed={active === index} aria-label={`${index + 1}. fotoğraf: ${slide.title}`}>
                  <span className={styles.thumbnailImage}><Image src={cakeSetImage(set.id, index === 0 ? "overview" : `${slide.id}-table`)} alt="" fill sizes="80px" /></span>
                  <span className={styles.thumbnailText}>{slide.title}</span>
                </button>
              ))}
            </div>
            <div className={styles.galleryBody}>
              <div className={styles.galleryFrame}>
                <div className={styles.track} ref={viewport} onScroll={syncSlide} tabIndex={0} aria-label="Fotoğrafları yatay kaydır">
                  {slides.map((slide, index) => (
                    <div key={slide.id} className={styles.slide} role="group" aria-roledescription="kare" aria-label={`${index + 1} / ${slides.length}: ${slide.title}`} aria-hidden={active !== index}>
                      {index === 0 ? (
                        <div className={styles.overview}>
                          <div className={styles.overviewScene}>
                            <Image src={cakeSetImage(set.id, "overview")} alt={`${set.title}: ${captions[1]}, ${captions[2]} ve ${captions[3]}${set.counts.card ? ", fotoğraflı kartla" : ""} masada bir arada`} fill sizes={sizes} priority draggable={false} />
                            <button type="button" className={styles.cakeHotspot} aria-label="Pasta süslerini yakından incele" tabIndex={active === 0 ? 0 : -1} onClick={() => openFromOverview(1)} />
                            <button type="button" className={styles.cupcakeHotspot} aria-label="Cupcake süslerini yakından incele" tabIndex={active === 0 ? 0 : -1} onClick={() => openFromOverview(2)} />
                            <button type="button" className={styles.strawHotspot} aria-label="Pipetleri yakından incele" tabIndex={active === 0 ? 0 : -1} onClick={() => openFromOverview(3)} />
                          </div>
                        </div>
                      ) : (
                        <div className={styles.collage} data-slide={slide.id}>
                          <div className={styles.panel}>
                            <Image src={cakeSetImage(set.id, `${slide.id}-pieces`)} alt={captions[index]} fill sizes={sizes} draggable={false} />
                            <span>Parçalar</span>
                          </div>
                          <div className={styles.panel}>
                            <Image src={cakeSetImage(set.id, `${slide.id}-table`)} alt={uses[index]} fill sizes={sizes} draggable={false} />
                            <span>Masada</span>
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
                <button className={`${styles.galleryArrow} ${styles.previous}`} type="button" aria-disabled={active === 0} onClick={() => goTo(active - 1)} aria-label="Önceki fotoğraf"><ChevronLeft size={22} aria-hidden="true" /></button>
                <button className={`${styles.galleryArrow} ${styles.next}`} type="button" aria-disabled={active === slides.length - 1} onClick={() => goTo(active + 1)} aria-label="Sonraki fotoğraf"><ChevronRight size={22} aria-hidden="true" /></button>
              </div>
              <div className={styles.galleryCaption} aria-live="polite" aria-atomic="true">
                <span><strong>{slides[active].title}</strong> <span className={styles.captionDivider}>·</span> {captions[active]}</span>
                <span className={styles.frameNumber}>{active + 1} / {slides.length}</span>
              </div>
              <p className={styles.galleryHint}>{active === 0 ? "Yakından bakmak için fotoğraftaki bir ürüne dokun veya fotoğrafı kaydır." : "Üstte setteki parçalar, altta masada kullanım örneği."}</p>
            </div>
          </section>

          <aside className={styles.details} aria-labelledby="cake-set-title">
            <div className={styles.contentsHeading}><h2>Setin içinde</h2><span>{total} parça</span></div>
            <ul className={styles.partList}>
              {parts.map(({ id, title, slide, count }) => (
                <li key={id}>
                  <button type="button" onClick={() => {
                    goTo(slide);
                    if (window.matchMedia("(max-width: 800px)").matches) viewport.current?.focus();
                  }} aria-pressed={active === slide && active !== 0}>
                    <span>{title}</span><strong>{count} adet</strong><ChevronRight size={16} aria-hidden="true" />
                  </button>
                </li>
              ))}
            </ul>
            <p className={styles.personalization}><Check size={16} aria-hidden="true" /> İsim, yaş ve fotoğrafı sipariş öncesi birlikte belirleyebiliriz.</p>
            <SelectProductLink products={["pasta-susleri"]} concept={set.title} className={styles.orderButton}>Bu set için bilgi al <ArrowRight size={17} aria-hidden="true" /></SelectProductLink>
            <p className={styles.orderNote}>Pasta, cupcake ve bardaklar sunum örneğidir.</p>
          </aside>
        </div>
      </div>
    </div>
  );
}
