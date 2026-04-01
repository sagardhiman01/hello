/** @type {import('next').NextConfig} */
const nextConfig = {
  // Standard config for Hostinger
  productionBrowserSourceMaps: false,
  swcMinify: true,
  output: 'standalone',
};

export default nextConfig;
