export default function Loading() {
  return (
    <div
      role="status"
      aria-label="Yükleniyor..."
      className="bg-[#FDFBF7] min-h-[70vh] flex flex-col items-center justify-center space-y-4 px-4"
    >
      <div className="w-12 h-12 rounded-full border-2 border-[#EDE6DF] border-t-[#D95A2B] animate-spin" />
      <span className="font-serif text-sm text-[#696159] tracking-wide">
        Portakal Çiçeği Atölyesi Yükleniyor...
      </span>
    </div>
  );
}
