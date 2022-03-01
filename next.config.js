/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['cdn.discordapp.com', 'static-cdn.jtvnw.net'],
  }
}

module.exports = nextConfig
