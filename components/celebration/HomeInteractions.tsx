"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import styles from "./Celebration.module.css";

export function PageReveals() {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const elements = document.querySelectorAll<HTMLElement>("main [data-reveal]");
    const observer = new IntersectionObserver((entries) => {
      entries.filter(entry => entry.isIntersecting).forEach(({ target }, index) => {
        observer.unobserve(target);
        const element = target as HTMLElement;
        element.style.setProperty("--reveal-delay", `${Math.min(index, 3) * 70}ms`);
        element.dataset.arrived = "";
      });
    });
    elements.forEach(element => observer.observe(element));
    return () => observer.disconnect();
  }, []);
  return null;
}

export function SetPreview() {
  const [theme, setTheme] = useState<"pembe" | "mavi">("pembe");

  return <>
    <div className={styles.previewControls} data-reveal>
      <div className={styles.viewSwitch} role="group" aria-label="Pasta süsü temasını seç">
        <button type="button" aria-pressed={theme === "pembe"} onClick={() => setTheme("pembe")}>Pembe</button>
        <button type="button" aria-pressed={theme === "mavi"} onClick={() => setTheme("mavi")}>Mavi</button>
      </div>
      <Link href={`/set-studyosu?tema=${theme}`} className={styles.primary}>Seti yakından incele <ArrowRight size={16} /></Link>
      <Link href="/set-icerikleri" className={styles.textLink}>Tüm temaları gör</Link>
    </div>
    <figure className={styles.previewFigure} data-reveal>
      <div className={styles.previewImage}>
        <Image key={theme} src={`/images/celebrations/${theme === "pembe" ? "pink" : "blue"}-cake.webp`} alt={`${theme === "pembe" ? "Pembe" : "Mavi"} fotoğraflı süslerin pasta üzerinde görünümü`} fill sizes="(max-width: 700px) 92vw, 55vw" />
      </div>
    </figure>
  </>;
}
