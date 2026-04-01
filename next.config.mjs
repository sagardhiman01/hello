/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  experimental: {
    webpackBuildWorker: true,
    parallelServerCompiles: true,
  },
};

export default nextConfig;
