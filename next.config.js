/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  reactStrictMode: true,
  swcMinify: true,
  transpilePackages: ['recharts'],
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