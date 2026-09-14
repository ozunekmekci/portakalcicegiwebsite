import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "Portakal Çiçeği Atölye | Akdeniz Esintili 3D Akrilik Hatıralıklar";
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          backgroundColor: "#FDFBF7",
          padding: "70px 80px",
          fontFamily: "sans-serif",
          border: "16px solid #F5EFEB",
          position: "relative",
        }}
      >
        {/* Subtle decorative accent circle */}
        <div
          style={{
            position: "absolute",
            top: "-100px",
            right: "-100px",
            width: "450px",
            height: "450px",
            borderRadius: "50%",
            backgroundColor: "rgba(217, 90, 43, 0.08)",
          }}
        />

        {/* Top Header / Brand */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <span
              style={{
                fontSize: "36px",
                fontWeight: "bold",
                color: "#1E1C1A",
                letterSpacing: "-0.02em",
              }}
            >
              Portakal Çiçeği Atölye
            </span>
            <span
              style={{
                fontSize: "14px",
                textTransform: "uppercase",
                letterSpacing: "0.2em",
                color: "#696159",
                marginTop: "4px",
              }}
            >
              Akdeniz Hatıra Tasarımları
            </span>
          </div>

          <div
            style={{
              padding: "10px 24px",
              borderRadius: "50px",
              backgroundColor: "rgba(217, 90, 43, 0.12)",
              color: "#D95A2B",
              fontSize: "16px",
              fontWeight: 600,
            }}
          >
            Özel Üretim Atölyesi
          </div>
        </div>

        {/* Center Headline */}
        <div style={{ display: "flex", flexDirection: "column", gap: "16px", maxWidth: "950px" }}>
          <h1
            style={{
              fontSize: "62px",
              fontWeight: "bold",
              color: "#1E1C1A",
              lineHeight: 1.15,
              margin: 0,
              letterSpacing: "-0.03em",
            }}
          >
            Hayatın en narin anları için, akrilikten ömürlük hatıralar.
          </h1>
          <p
            style={{
              fontSize: "24px",
              color: "#696159",
              lineHeight: 1.4,
              margin: 0,
            }}
          >
            Doğum, baby shower, düğün ve nişan kutlamaları için özel üretim 3D pleksi tasarımlar.
          </p>
        </div>

        {/* Bottom Bar: Trust Pillars */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            borderTop: "2px solid #EDE6DF",
            paddingTop: "24px",
            fontSize: "17px",
            color: "#696159",
          }}
        >
          <div style={{ display: "flex", gap: "32px" }}>
            <span>✦ 100+ Adet Toplu Sipariş</span>
            <span>✦ Çok Katmanlı 3D Pleksi</span>
            <span>✦ İstanbul Atölye Üretimi</span>
          </div>
          <span style={{ fontWeight: 600, color: "#D95A2B" }}>
            portakalcicegiwebsite.vercel.app
          </span>
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
