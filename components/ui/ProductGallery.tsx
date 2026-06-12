"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Image from "next/image"

type Props = {
  anaGorsel: string
  ekGorseller: string[]
  isim: string
  emoji?: string
}

export default function ProductGallery({ anaGorsel, ekGorseller, isim, emoji = "🎁" }: Props) {
  const allImages = Array.from(new Set([anaGorsel, ...ekGorseller])).filter(Boolean)
  const [activeImage, setActiveImage] = useState(allImages[0] || "")

  return (
    <div className="flex flex-col">
      {/* Main Image Container */}
      <div className="aspect-square md:aspect-[4/5] relative rounded-2xl overflow-hidden bg-[#fbf7f0] border border-[#eaeaea]">
        <AnimatePresence mode="wait">
          {activeImage ? (
            <motion.div
              key={activeImage}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="relative w-full h-full"
            >
              <Image
                src={activeImage}
                alt={isim}
                fill
                sizes="(max-w-768px) 100vw, 50vw"
                className="object-cover"
                priority
              />
            </motion.div>
          ) : (
            <div className="w-full h-full flex items-center justify-center">
              <span className="text-8xl select-none" role="img" aria-label={isim}>
                {emoji}
              </span>
            </div>
          )}
        </AnimatePresence>
      </div>

      {/* Thumbnails list */}
      {allImages.length > 1 && (
        <div className="flex flex-row gap-2 mt-3 overflow-x-auto pb-2 scrollbar-thin">
          {allImages.map((img, idx) => (
            <button
              key={idx}
              onClick={() => setActiveImage(img)}
              className={`relative w-16 h-16 rounded-lg cursor-pointer overflow-hidden border border-black/5 flex-shrink-0 transition-all focus:outline-none ${
                activeImage === img ? "ring-2 ring-[#ff914b] opacity-100" : "opacity-70 hover:opacity-100"
              }`}
              aria-label={`${isim} thumbnail ${idx + 1}`}
            >
              <Image
                src={img}
                alt={`${isim} thumbnail ${idx + 1}`}
                fill
                sizes="64px"
                className="object-cover"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
