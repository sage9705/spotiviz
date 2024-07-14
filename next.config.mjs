/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: [
      'i.scdn.co',
      'mosaic.scdn.co',
      'seeded-session-images.scdn.co',
      'image-cdn-ak.spotifycdn.com',
      'image-cdn-fa.spotifycdn.com'
    ],
  },
}

module.exports = nextConfig