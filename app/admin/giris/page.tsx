"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Lock } from "lucide-react";

export default function LoginPage() {
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!password) {
      setError("Lütfen şifrenizi girin.");
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch("/api/admin/auth", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });

      const data = await response.json();

      if (response.ok) {
        router.refresh();
        router.push("/admin");
      } else {
        setError(data.error || "Şifre doğrulanamadı.");
      }
    } catch (err) {
      console.error("Login error:", err);
      setError("Bağlantı hatası oluştu. Lütfen tekrar deneyin.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md bg-white border border-[#dcdcd9] rounded-3xl p-8 shadow-sm flex flex-col items-center">
      {/* Brand logo / Emoji */}
      <div className="w-16 h-16 bg-[#fbf7f0] border border-[#ff914b]/20 rounded-full flex items-center justify-center text-3xl mb-4">
        🍊
      </div>

      <h1 className="font-serif text-2xl font-bold text-brand-text-dark text-center mb-1">
        Portakal Çiçeği Atölye
      </h1>
      <p className="text-sm text-brand-text-mid text-center mb-8 font-sans">
        Yönetim paneline erişmek için şifrenizi girin.
      </p>

      <form onSubmit={handleSubmit} className="w-full space-y-5">
        <div>
          <label
            htmlFor="password"
            className="block text-xs font-semibold text-brand-text-dark uppercase tracking-wider mb-2 font-sans"
          >
            Yönetici Şifresi
          </label>
          <div className="relative">
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••••••"
              disabled={isLoading}
              className="w-full px-4 py-3 bg-[#fbf7f0] border border-[#dcdcd9] rounded-2xl text-brand-text-dark placeholder-gray-400 focus:outline-none focus:border-[#ff914b] focus:ring-1 focus:ring-[#ff914b] transition-all font-sans text-center tracking-widest disabled:opacity-50"
            />
            <div className="absolute right-4 top-1/2 -translate-y-1/2 text-brand-text-mid pointer-events-none">
              <Lock size={16} />
            </div>
          </div>
        </div>

        {error && (
          <div className="bg-red-50 text-brand-orange-dark border border-red-200 text-xs font-semibold px-4 py-3 rounded-2xl text-center font-sans">
            {error}
          </div>
        )}

        <button
          type="submit"
          disabled={isLoading}
          className="w-full py-3.5 bg-brand-orange text-white font-semibold rounded-2xl shadow-md shadow-brand-orange/15 hover:bg-brand-orange/95 hover:scale-[1.01] active:scale-[0.99] disabled:opacity-50 transition-all font-sans cursor-pointer text-center"
        >
          {isLoading ? "Giriş yapılıyor..." : "Giriş Yap"}
        </button>
      </form>
    </div>
  );
}
