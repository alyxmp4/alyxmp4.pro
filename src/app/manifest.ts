import { MetadataRoute } from 'next'

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'alyxmp4',
    short_name: 'alyx',
    description: 'arsen / full-stack dev',
    start_url: '/',
    display: 'standalone',
    background_color: '#121212',
    theme_color: '#fff',
    icons: [
      {
        src: '/favicon.ico',
        sizes: 'any',
        type: 'image/x-icon',
      },
    ],
  }
}
