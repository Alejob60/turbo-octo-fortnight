/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  reactStrictMode: true,
  swcMinify: true,
  transpilePackages: ['recharts'],
  eslint: {
    // Advertencia: Desactivando ESLint durante build para evitar conflictos
    // con configuración obsoleta en Next.js internals
    ignoreDuringBuilds: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: 'http',
        hostname: 'localhost',
      },
      {
        protocol: 'https',
        hostname: 'misybot-backend.com',
      },
      {
        protocol: 'https',
        hostname: 'api.misybot.com',
      },
    ],
  },
  env: {
    NEXT_PUBLIC_MISYBOT_API_URL: process.env.NEXT_PUBLIC_MISYBOT_API_URL || 'http://localhost:8000/api',
  },
};

export default nextConfig;