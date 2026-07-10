import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactCompiler: true,
  images: {
    formats: ['image/avif', 'image/webp'],
  },
  allowedDevOrigins: ['192.168.178.48'],
  async redirects() {
    return [
      {
        source: '/:path*',
        has: [{ type: 'host', value: 'moleventure.it' }],
        destination: 'https://www.moleventure.com/:path*',
        permanent: true, // Questo genera un redirect 301, ottimo per la SEO
      },
      {
        source: '/:path*',
        has: [{ type: 'host', value: 'www.moleventure.it' }],
        destination: 'https://www.moleventure.com/:path*',
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
