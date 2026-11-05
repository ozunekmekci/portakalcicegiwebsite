/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [{ source: "/set-studyosu", destination: "/urun-gruplari/pasta-susleri", permanent: true }];
  },
  images: {
    formats: ["image/avif", "image/webp"],
    remotePatterns: [
      { protocol: "https", hostname: "drive.google.com" },
      { protocol: "https", hostname: "lh3.googleusercontent.com" },
      { protocol: "https", hostname: "res.cloudinary.com" },
    ],
  },
};

export default nextConfig;
