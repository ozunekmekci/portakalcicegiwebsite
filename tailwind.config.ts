import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          cream: "var(--color-bg-cream)",
          warm: "var(--color-bg-warm)",
          ink: "var(--color-text-ink)",
          sepia: "var(--color-text-sepia)",
          terracotta: "var(--color-terracotta)",
          "terracotta-dark": "var(--color-terracotta-dark)",
          olive: "var(--color-olive)",
          amber: "var(--color-amber)",
          border: "var(--color-border)",
          // Geriye dönük uyumluluk
          orange: "var(--color-orange)",
          "orange-dark": "var(--color-orange-dark)",
          yellow: "var(--color-yellow)",
          "bg-cream": "var(--color-bg-cream)",
          "bg-gray": "var(--color-bg-gray)",
          "text-dark": "var(--color-text-dark)",
          "text-mid": "var(--color-text-mid)",
        },
      },
      fontFamily: {
        sans: ["var(--font-inter)", "sans-serif"],
        serif: ["var(--font-playfair)", "serif"],
      },
      boxShadow: {
        "soft-sm": "0 2px 8px -2px rgba(30, 28, 26, 0.04)",
        "soft-md": "0 8px 24px -4px rgba(30, 28, 26, 0.06)",
        "soft-lg": "0 16px 36px -6px rgba(30, 28, 26, 0.08)",
      },
    },
  },
  plugins: [],
};

export default config;
