/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
  },
  server: {
    host: '0.0.0.0',
  }
}

module.exports = nextConfig
