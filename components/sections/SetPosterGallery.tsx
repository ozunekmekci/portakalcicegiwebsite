"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Check, X } from "lucide-react";
import { setPosters } from "@/content/set-posters";
import { SelectProductLink } from "@/components/celebration/InquiryContext";
import styles from "@/components/celebration/Celebration.module.css";

export default function SetPosterGallery() {
  const [themeIndex, setThemeIndex] = useState(0);
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const theme = setPosters[themeIndex];
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const dialogRef = useRef<HTMLElement>(null);
  const isOpen = selectedIndex !== null;
  const selectedPoster = selectedIndex === null ? null : setPosters[selectedIndex];

  useEffect(() => {
    if (!isOpen) return;

    const previousFocus = document.activeElement instanceof HTMLElement ? document.activeElement : null;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeButtonRef.current?.focus();

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setSelectedIndex(null);
        return;
      }

      if (event.key !== "Tab") return;
      const focusable = dialogRef.current?.querySelectorAll<HTMLElement>(
        'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])',
      );
      if (!focusable?.length) return;

      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", handleKeyDown);
      previousFocus?.focus();
    };
  }, [isOpen]);


  return (
    <>
      <label className={styles.themeSelect}>
        <span>Tema</span>
        <select value={themeIndex} onChange={event => setThemeIndex(Number(event.target.value))}>
          {setPosters.map((poster, index) => <option key={poster.id} value={index}>{poster.title}</option>)}
        </select>
      </label>
      <div className={styles.catalogGrid}>
        <button
          type="button"
          onClick={() => setSelectedIndex(themeIndex)}
          className={styles.posterImage} data-reveal
          aria-label={`${theme.title} afişini ve içeriğini büyüt`}
        >
          <Image src={theme.image} alt={theme.alt} fill loading="eager" sizes="(max-width: 700px) 35vw, 45vw" />
          <span>Afişi büyüt <ArrowUpRight aria-hidden="true" size={16} /></span>
        </button>
        <div className={styles.catalogCopy}>
          <h3 data-reveal>{theme.title}</h3>
          <ul>{theme.included.map(item => <li key={item} data-reveal>{item}</li>)}</ul>
          <p>İsim, yaş ve renkleri sipariş öncesi birlikte belirleyebiliriz.</p>
          <SelectProductLink products={["pasta-susleri"]} concept={theme.title} className={styles.primary}>
            Bu seti talebime ekle <ArrowUpRight aria-hidden="true" size={16} />
          </SelectProductLink>
          {(theme.id === "pembe" || theme.id === "mavi") && (
            <Link href={`/set-studyosu?tema=${theme.id}`} className={styles.textLink}>Stüdyoda incele ↗</Link>
          )}
        </div>
      </div>
      <noscript><ul>{setPosters.map(poster => <li key={poster.id}><a href={poster.image}>{poster.title} afişi</a> · {poster.included.join(", ")}</li>)}</ul></noscript>

      {selectedPoster && (
        <div
          className="fixed inset-0 z-[70] flex items-center justify-center bg-[#171513]/75 p-3 sm:p-6"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) setSelectedIndex(null);
          }}
        >
          <section
            ref={dialogRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby="set-poster-title"
            className="relative grid max-h-[92dvh] w-full max-w-5xl grid-cols-1 overflow-y-auto bg-white shadow-2xl md:grid-cols-[minmax(0,1.1fr)_minmax(270px,0.9fr)] md:overflow-hidden"
          >
            <button
              ref={closeButtonRef}
              type="button"
              onClick={() => setSelectedIndex(null)}
              aria-label="Afiş penceresini kapat"
              className="absolute right-3 top-3 z-10 flex h-10 w-10 items-center justify-center border border-[#EDE6DF] bg-white text-[#1E1C1A] transition-colors hover:bg-[#F5EFEB]"
            >
              <X aria-hidden="true" size={19} />
            </button>

            <div className="relative flex min-h-[50vh] items-center justify-center bg-[#edf1eb] p-5 pt-14 sm:p-8 md:min-h-0 md:max-h-[92dvh]">
              <Image
                src={selectedPoster.image}
                alt={selectedPoster.alt}
                width={960}
                height={1200}
                sizes="(max-width: 767px) 90vw, 55vw"
                className="max-h-[75dvh] w-auto max-w-full object-contain"
              />
            </div>

            <div className="flex flex-col justify-center gap-6 p-6 sm:p-9 md:max-h-[92dvh] md:overflow-y-auto">
              <div className="space-y-2">
                <h2 id="set-poster-title" className="font-serif text-3xl font-semibold text-[#1E1C1A]">
                  {selectedPoster.title}
                </h2>
                <p className="font-sans text-sm leading-relaxed text-[#696159]">
                  Bu sette neler var?
                </p>
              </div>

              <ul className="space-y-3 py-2">
                {selectedPoster.included.map((item) => (
                  <li key={item} className="flex items-start gap-3 font-sans text-sm text-[#37322E]">
                    <Check aria-hidden="true" size={17} className="mt-0.5 shrink-0 text-[#5A6855]" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>

              <p className="font-sans text-sm leading-relaxed text-[#696159]">
                İsim, yaş ve renkleri değiştirebiliriz. Nasıl istediğini sipariş öncesi birlikte konuşalım.
              </p>

              <SelectProductLink
                products={["pasta-susleri"]}
                concept={selectedPoster.title}
                className="inline-flex min-h-12 items-center justify-center gap-2 bg-[#9c3d20] px-5 py-3 font-sans text-sm font-semibold text-white transition-colors hover:bg-[#783019]"
              >
                Bu seti talebime ekle
                <ArrowUpRight aria-hidden="true" size={15} />
              </SelectProductLink>
            </div>
          </section>
        </div>
      )}
    </>
  );
}
