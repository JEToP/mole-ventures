import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactCompiler: true,
  images: {
    formats: ['image/avif', 'image/webp'],
  },
  allowedDevOrigins: ['192.168.178.48'],
  async redirects() {
    // Dominio canonico UNICO: moleventure.com (senza www).
    // Tutte le varianti .it puntano direttamente lì con un solo redirect 301,
    // così non ci sono doppi salti né ambiguità di canonico per la SEO.
    // (Il redirect www.moleventure.com → moleventure.com è gestito da Netlify.)
    return [
      {
        source: '/:path*',
        has: [{ type: 'host', value: 'moleventure.it' }],
        destination: 'https://moleventure.com/:path*',
        permanent: true, // 301
      },
      {
        source: '/:path*',
        has: [{ type: 'host', value: 'www.moleventure.it' }],
        destination: 'https://moleventure.com/:path*',
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
