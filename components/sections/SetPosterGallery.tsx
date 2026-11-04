"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { ArrowUpRight, Check, X } from "lucide-react";
import { setPosters } from "@/content/set-posters";
import { SelectProductLink } from "@/components/celebration/InquiryContext";

export default function SetPosterGallery() {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
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
      <div className="grid grid-cols-1 gap-5 min-[480px]:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4">
        {setPosters.map((poster, index) => (
          <article key={poster.id} className="group border border-[#EDE6DF] bg-white transition-colors hover:border-[#C86D51]">
            <button
              type="button"
              onClick={() => setSelectedIndex(index)}
              className="block w-full text-left focus-visible:outline-offset-[-4px]"
              aria-label={`${poster.title} afişini ve içeriğini büyüt`}
            >
              <div className="relative aspect-[4/5] overflow-hidden bg-[#F4F0E9] p-2 sm:p-3">
                <Image
                  src={poster.image}
                  alt={poster.alt}
                  fill
                  sizes="(max-width: 479px) 100vw, (max-width: 1023px) 50vw, (max-width: 1535px) 33vw, 25vw"
                  loading={index < 4 ? "eager" : "lazy"}
                  className="object-contain p-2 transition-transform duration-500 group-hover:scale-[1.025]"
                />
              </div>
              <div className="space-y-2 p-4 sm:p-5">
                <span className="font-sans text-[10px] font-semibold uppercase tracking-[0.16em] text-[#A85338]">
                  Tema {String(index + 1).padStart(2, "0")}
                </span>
                <h3 className="font-serif text-lg font-semibold text-[#1E1C1A]">{poster.title}</h3>
                <p className="line-clamp-2 font-sans text-xs leading-relaxed text-[#696159]">
                  {poster.included.join(" · ")}
                </p>
                <span className="inline-flex items-center gap-1.5 pt-1 font-sans text-xs font-semibold text-[#A85338]">
                  Afişi büyüt
                  <ArrowUpRight aria-hidden="true" size={14} />
                </span>
              </div>
            </button>
          </article>
        ))}
      </div>

      {selectedPoster && (
        <div
          className="fixed inset-0 z-[70] flex items-center justify-center bg-[#171513]/75 p-3 backdrop-blur-sm sm:p-6"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) setSelectedIndex(null);
          }}
        >
          <section
            ref={dialogRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby="set-poster-title"
            className="relative grid max-h-[92dvh] w-full max-w-5xl grid-cols-1 overflow-y-auto bg-[#FDFBF7] shadow-2xl md:grid-cols-[minmax(0,1.1fr)_minmax(270px,0.9fr)] md:overflow-hidden"
          >
            <button
              ref={closeButtonRef}
              type="button"
              onClick={() => setSelectedIndex(null)}
              aria-label="Afiş penceresini kapat"
              className="absolute right-3 top-3 z-10 flex h-10 w-10 items-center justify-center border border-[#EDE6DF] bg-[#FDFBF7] text-[#1E1C1A] transition-colors hover:bg-[#F5EFEB]"
            >
              <X aria-hidden="true" size={19} />
            </button>

            <div className="relative flex min-h-[50vh] items-center justify-center bg-[#F4F0E9] p-5 pt-14 sm:p-8 md:min-h-0 md:max-h-[92dvh]">
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
                <p className="font-sans text-[10px] font-semibold uppercase tracking-[0.18em] text-[#A85338]">
                  Set içeriği
                </p>
                <h2 id="set-poster-title" className="font-serif text-3xl font-semibold text-[#1E1C1A]">
                  {selectedPoster.title}
                </h2>
                <p className="font-sans text-sm leading-relaxed text-[#696159]">
                  Bu afişteki tema parçaları ve adetleri:
                </p>
              </div>

              <ul className="space-y-3 border-y border-[#EDE6DF] py-5">
                {selectedPoster.included.map((item) => (
                  <li key={item} className="flex items-start gap-3 font-sans text-sm text-[#37322E]">
                    <Check aria-hidden="true" size={17} className="mt-0.5 shrink-0 text-[#5A6855]" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>

              <p className="font-sans text-xs leading-relaxed text-[#696159]">
                İsim, yaş ve renk detayları kişiye göre düzenlenebilir. İstediğin değişiklikleri sipariş öncesi birlikte netleştiririz.
              </p>

              <SelectProductLink
                products={["pasta-susleri"]}
                concept={selectedPoster.title}
                className="inline-flex min-h-12 items-center justify-center gap-2 bg-[#C86D51] px-5 py-3 font-sans text-xs font-semibold uppercase tracking-wider text-white transition-colors hover:bg-[#A85338]"
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
