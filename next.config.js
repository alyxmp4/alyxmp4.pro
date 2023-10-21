/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'avatars.githubusercontent.com',
        pathname: '/alyxmp4',
      },
      {
        protocol: 'https',
        hostname: 'i.scdn.co',
        pathname: '/image/*',
      },
    ],
  },
}

module.exports = nextConfig
