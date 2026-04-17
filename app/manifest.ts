import type { MetadataRoute } from 'next';

export const dynamic = 'force-static';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Central Peptídeos',
    short_name: 'Central Peptídeos',
    description: 'Calculadoras e enciclopédia de peptídeos — reconstituição, mistura, conversão, etiqueta, comparador.',
    start_url: '/',
    display: 'standalone',
    orientation: 'portrait-primary',
    background_color: '#ffffff',
    theme_color: '#0d9488',
    lang: 'pt-BR',
    categories: ['health', 'medical', 'education', 'utilities'],
    icons: [
      { src: '/fav.jpg', sizes: '192x192', type: 'image/jpeg', purpose: 'any' },
      { src: '/fav.jpg', sizes: '512x512', type: 'image/jpeg', purpose: 'any' },
      { src: '/fav.jpg', sizes: '512x512', type: 'image/jpeg', purpose: 'maskable' },
    ],
    shortcuts: [
      {
        name: 'Calculadora de reconstituição',
        short_name: 'Reconstituição',
        url: '/ferramentas/reconstituicao',
      },
      {
        name: 'Enciclopédia',
        short_name: 'Peptídeos',
        url: '/peptideos',
      },
      {
        name: 'Comparador',
        short_name: 'Comparar',
        url: '/comparar',
      },
    ],
  };
}
