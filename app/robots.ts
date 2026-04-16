import type { MetadataRoute } from 'next';

export const dynamic = 'force-static';

const SITE = process.env.SITE_URL || 'https://calcular-peps.example.com';
const BASE = process.env.PAGES_BASE || '';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [{ userAgent: '*', allow: '/' }],
    sitemap: `${SITE}${BASE}/sitemap.xml`,
  };
}
