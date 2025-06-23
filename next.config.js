/** @type {import('next').NextConfig} */
const nextConfig = {
  // output: 'export',
  // distDir: 'out',
  images: {
    unoptimized: true,
  },
  experimental: {
    staleTimes: {
      dynamic: 30,
    },
  },
  // assetPrefix: './',
  // basePath: '',
};

export default nextConfig;
