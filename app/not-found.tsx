import Link from "next/link"

export default function NotFound() {
  return (
    <main className="bg-[#fbf7f0] min-h-[70vh] flex flex-col items-center justify-center px-6 py-24 text-center">
      <h1 className="font-serif text-5xl md:text-6xl font-bold text-brand-text-dark mb-4">
        404
      </h1>
      <h2 className="font-serif text-2xl font-semibold text-[#1a1a1a] mb-2">
        Sayfa Bulunamadı
      </h2>
      <p className="font-sans text-brand-text-mid max-w-md mb-8 leading-relaxed">
        Aradığınız ürün veya sayfa mevcut değil ya da taşınmış olabilir.
      </p>
      <Link
        href="/"
        className="inline-flex items-center justify-center bg-brand-orange hover:bg-brand-orange-dark text-white font-sans text-sm font-semibold px-8 py-3.5 rounded-full shadow-md transition-all duration-300 transform hover:-translate-y-0.5"
      >
        Ana Sayfaya Dön
      </Link>
    </main>
  )
}
