/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  eslint: {
    // Warning: This allows production builds to successfully complete even if
    // your project has ESLint errors.
    ignoreDuringBuilds: true,
  },
  typescript: {
    // !! WARN !!
    // Dangerously allow production builds to successfully complete even if
    // your project has type errors.
    // !! WARN !!
    ignoreBuildErrors: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com'
      },
      {
        protocol: 'http',
        hostname: 'images.amazon.com'
      },
      {
        protocol: 'https',
        hostname: 'images.amazon.com'
      },
      {
        protocol: 'https',
        hostname: 'covers.openlibrary.org'
      }
    ],
  },
}

module.exports = nextConfig 