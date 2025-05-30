"use client";

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ShoppingCartIcon, UserIcon, MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import { useCart } from '@/context/CartContext';

function getCurrentMonthTR() {
  const aylar = [
    'OCAK', 'ŞUBAT', 'MART', 'NİSAN', 'MAYIS', 'HAZİRAN',
    'TEMMUZ', 'AĞUSTOS', 'EYLÜL', 'EKİM', 'KASIM', 'ARALIK'
  ];
  const now = new Date();
  return aylar[now.getMonth()];
}

const DISCOUNT = 30;

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const [megaMenuOpen, setMegaMenuOpen] = useState(false);
  const currentMonth = getCurrentMonthTR();
  const { items, total, removeFromCart } = useCart();

  return (
    <header className="z-50 bg-white shadow-sm">
      {/* Modern Promosyon Bannerı */}
      <div className="w-full flex justify-center items-center py-0.5 bg-transparent">
        <div className="relative px-8 py-1.5 rounded-2xl shadow-lg bg-gradient-to-r from-brand-orange via-pink-200 to-brand-blue border-2 border-orange-200 flex items-center gap-4 animate-fade-in"
          style={{ boxShadow: '0 4px 24px 0 rgba(255, 145, 77, 0.10)' }}>
          <span className="text-white font-bold text-lg md:text-xl drop-shadow">%{DISCOUNT} İNDİRİM</span>
          <span className="w-2 h-2 rounded-full bg-white/60 mx-2"></span>
          <span className="text-orange-900 font-semibold text-base md:text-lg tracking-wide">{currentMonth} AYINA ÖZEL KARGO ÜCRETSİZ</span>
          <span className="flex items-center gap-1 text-blue-800 font-bold text-base md:text-lg bg-white/80 px-3 py-1 rounded-xl shadow border border-blue-200">
            <span className="text-2xl">🚚</span> KARGO ÜCRETSİZ
          </span>
        </div>
      </div>
      {/* Main Header */}
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-20 md:h-24">
          {/* Logo */}
          <Link href="/" className="flex items-center -ml-8 md:-ml-16 z-10 relative">
            <div className="rounded-3xl bg-white shadow-xl border-4 border-brand-orange p-2 md:p-4 flex items-center justify-center transition-transform hover:scale-105">
              <Image
                src="/logo/logo.png"
                alt="Portakal Çiçeği Atölye"
                width={200}
                height={200}
                className="h-14 md:h-20 w-auto drop-shadow-xl"
                priority
              />
            </div>
          </Link>

          {/* Navigation */}
          <nav className="hidden md:flex space-x-8 relative">
            {/* Kategoriler Mega Menü */}
            <div
              className="relative"
              onMouseEnter={() => setMegaMenuOpen(true)}
              onMouseLeave={() => setMegaMenuOpen(false)}
            >
              <button className="text-gray-600 hover:text-orange-600 transition-colors font-semibold">
                Kategoriler
              </button>
              {megaMenuOpen && (
                <div className="absolute left-0 top-full mt-2 w-[520px] bg-white rounded-2xl shadow-2xl p-6 flex gap-8 animate-fade-in z-50 border border-orange-100">
                  {/* Sütun 1: Alt Kategoriler */}
                  <div>
                    <div className="font-bold text-gray-800 mb-2">Alt Kategoriler</div>
                    <ul className="space-y-2">
                      <li><Link href="/kategori/bebek" className="hover:text-brand-orange transition-colors">Bebek Magnetleri</Link></li>
                      <li><Link href="/kategori/isimli" className="hover:text-brand-orange transition-colors">İsimli Hediyelikler</Link></li>
                      <li><Link href="/kategori/ozel-tasarim" className="hover:text-brand-orange transition-colors">Özel Tasarım</Link></li>
                      <li><Link href="/kategori/pleksi" className="hover:text-brand-orange transition-colors">Pleksi Ürünler</Link></li>
                    </ul>
                  </div>
                  {/* Sütun 2: Kampanyalar ve Öne Çıkanlar */}
                  <div>
                    <div className="font-bold text-gray-800 mb-2">Kampanyalar</div>
                    <ul className="space-y-2">
                      <li><Link href="/kampanyalar" className="hover:text-brand-orange transition-colors">%30 İndirimli Ürünler</Link></li>
                      <li><Link href="/yeni-gelenler" className="hover:text-brand-orange transition-colors">Yeni Gelenler</Link></li>
                      <li><Link href="/firsatlar" className="hover:text-brand-orange transition-colors">Fırsatlar</Link></li>
                    </ul>
                  </div>
                </div>
              )}
            </div>
            <Link href="/yeni-gelenler" className="text-gray-600 hover:text-orange-600 transition-colors">
              Yeni Gelenler
            </Link>
            <Link href="/kampanyalar" className="text-gray-600 hover:text-orange-600 transition-colors">
              Kampanyalar
            </Link>
            <Link href="/hakkimizda" className="text-gray-600 hover:text-orange-600 transition-colors">
              Hakkımızda
            </Link>
          </nav>

          {/* Right Icons */}
          <div className="flex items-center space-x-6">
            <button className="text-gray-600 hover:text-orange-600 transition-colors">
              <MagnifyingGlassIcon className="h-6 w-6" />
            </button>
            <Link href="/hesabim" className="text-gray-600 hover:text-orange-600 transition-colors">
              <UserIcon className="h-6 w-6" />
            </Link>
            <button
              className="text-gray-600 hover:text-orange-600 transition-colors relative"
              onClick={() => setCartOpen(true)}
              aria-label="Sepeti Aç"
            >
              <ShoppingCartIcon className="h-6 w-6" />
              <span className="absolute -top-2 -right-2 bg-orange-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                {items.length}
              </span>
            </button>
          </div>
        </div>
      </div>

      {/* Slide-in Sepet Paneli */}
      {cartOpen && (
        <div className="fixed inset-0 z-50 flex justify-end">
          {/* Arka plan */}
          <div className="absolute inset-0 bg-black/40" onClick={() => setCartOpen(false)} />
          {/* Panel */}
          <div className="relative w-full max-w-md bg-white h-full shadow-2xl p-6 flex flex-col">
            <button
              className="absolute top-4 right-4 text-gray-400 hover:text-orange-600 text-2xl font-bold"
              onClick={() => setCartOpen(false)}
              aria-label="Kapat"
            >
              ×
            </button>
            <h2 className="text-xl font-bold mb-4 text-brand-orange">Sepetim</h2>
            {items.length === 0 ? (
              <p className="text-gray-400">Sepetiniz boş.</p>
            ) : (
              <ul className="flex-1 overflow-y-auto divide-y divide-gray-100 mb-4">
                {items.map((item) => (
                  <li key={item.image} className="flex items-center justify-between py-3">
                    <span className="flex items-center gap-2">
                      <Image src={item.image} alt={item.name} width={40} height={40} className="rounded border" />
                      <span className="font-medium text-gray-700 text-sm line-clamp-1">{item.name}</span>
                    </span>
                    <span className="text-gray-500 text-sm">{item.quantity} x {item.price}₺</span>
                    <button onClick={() => removeFromCart(item.image)} className="ml-2 text-red-500 hover:text-red-700 text-lg">×</button>
                  </li>
                ))}
              </ul>
            )}
            <div className="mt-auto pt-4 border-t">
              <div className="flex justify-between font-bold text-lg mb-4">
                <span>Toplam:</span>
                <span className="text-brand-orange">{total}₺</span>
              </div>
              <Link
                href="/checkout"
                className="block w-full bg-brand-orange hover:bg-orange-600 text-white py-3 rounded-lg font-semibold text-center transition-colors"
                onClick={() => setCartOpen(false)}
              >
                Alışverişi Tamamla
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header; 