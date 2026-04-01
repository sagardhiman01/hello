/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  productionBrowserSourceMaps: false,
  swcMinify: true,
  experimental: {
    webpackBuildWorker: true,
    parallelServerCompiles: true,
  },
};

export default nextConfig;
