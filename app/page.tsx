import Image from "next/image";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-6 md:p-24 bg-brand-bg-cream text-brand-text-dark select-none">
      <div className="max-w-xl text-center space-y-8">
        <h1 className="text-4xl md:text-6xl font-serif font-semibold text-brand-orange-dark tracking-wide">
          Portakal Çiçeği
        </h1>
        <p className="font-serif italic text-lg md:text-xl text-brand-text-mid">
          Premium Hediyelik Tasarımı & Atölyesi
        </p>
        <div className="h-[2px] w-24 bg-brand-orange mx-auto rounded-full" />
        <p className="font-sans text-sm md:text-base text-brand-text-mid leading-relaxed max-w-md mx-auto">
          Özel günleriniz için modern, butik ve premium 3D akrilik hediyelikler tasarlıyoruz. Yakında yeni koleksiyonlarımızla yayındayız.
        </p>
        <div className="pt-4">
          <a
            href="https://www.instagram.com/portakalcicegi.atolye/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block px-8 py-3 bg-brand-orange hover:bg-brand-orange-dark text-white font-sans font-medium rounded-full shadow-lg transition-all duration-300 transform hover:-translate-y-0.5"
          >
            Bizi Instagram'da Takip Edin
          </a>
        </div>
      </div>
    </main>
  );
}

