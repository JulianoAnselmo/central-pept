import type { MetadataRoute } from 'next';

export const dynamic = 'force-static';

const SITE = process.env.SITE_URL || 'https://centralpeptideos.com.br';
const BLOCKED_CRAWLERS = [
  'MJ12bot',
  'AhrefsBot',
  'SemrushBot',
  'DotBot',
  'Bytespider',
  'DataForSeoBot',
  'BLEXBot',
];

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      { userAgent: '*', allow: '/', disallow: '/admin/' },
      ...BLOCKED_CRAWLERS.map((userAgent) => ({ userAgent, disallow: '/' })),
    ],
    sitemap: `${SITE}/sitemap.xml`,
  };
}
