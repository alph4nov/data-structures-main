/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',  // <--- MANDATORY: Turns your app into static HTML files for GitHub
  basePath: '/data-structures-main', // <--- MANDATORY: actual repo name (with the slash)
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true, // <--- MANDATORY: GitHub Pages cannot optimize images, this fixes broken images
  },
  experimental: {
    webpackBuildWorker: true,
  },
}

export default nextConfig;