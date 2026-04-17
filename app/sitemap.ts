import type { MetadataRoute } from 'next';
import { getPeptideSlugs } from '@/lib/peptides';
import { getArticleSlugs, getArticleBySlug, getArticles } from '@/lib/articles';
import { getEbookSlugs } from '@/lib/ebooks';

export const dynamic = 'force-static';

const SITE = process.env.SITE_URL || 'https://calcular-peps.example.com';
const BASE = process.env.PAGES_BASE || '';

function url(path: string): string {
  return `${SITE}${BASE}${path}`;
}

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const staticPaths: Array<{ path: string; priority: number; changeFrequency: 'daily' | 'weekly' | 'monthly' }> = [
    { path: '/',                             priority: 1.0, changeFrequency: 'weekly' },
    { path: '/ferramentas/reconstituicao/',  priority: 0.95, changeFrequency: 'monthly' },
    { path: '/peptideos/',                   priority: 0.9, changeFrequency: 'weekly' },
    { path: '/ferramentas/',                 priority: 0.85, changeFrequency: 'monthly' },
    { path: '/ferramentas/mistura/',         priority: 0.8, changeFrequency: 'monthly' },
    { path: '/ferramentas/conversor/',       priority: 0.8, changeFrequency: 'monthly' },
    { path: '/ferramentas/cronograma/',      priority: 0.8, changeFrequency: 'monthly' },
    { path: '/ferramentas/titulacao/',       priority: 0.85, changeFrequency: 'monthly' },
    { path: '/comparar/',                    priority: 0.85, changeFrequency: 'weekly' },
    { path: '/blog/',                        priority: 0.85, changeFrequency: 'weekly' },
    { path: '/glossario/',                   priority: 0.7, changeFrequency: 'monthly' },
    { path: '/metodologia/',                 priority: 0.6, changeFrequency: 'monthly' },
    { path: '/sobre/',                       priority: 0.5, changeFrequency: 'monthly' },
    { path: '/contato/',                     priority: 0.4, changeFrequency: 'monthly' },
    { path: '/privacidade/',                 priority: 0.3, changeFrequency: 'monthly' },
    { path: '/termos/',                      priority: 0.3, changeFrequency: 'monthly' },
  ];

  // Tag archives do blog
  const allTags = Array.from(new Set(getArticles().flatMap((a) => a.tags)));
  const slugify = (s: string) =>
    s.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/\s+/g, '-');

  return [
    ...staticPaths.map((p) => ({
      url: url(p.path),
      lastModified: now,
      changeFrequency: p.changeFrequency,
      priority: p.priority,
    })),
    ...getPeptideSlugs().map((slug) => ({
      url: url(`/peptideos/${slug}/`),
      lastModified: now,
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    })),
    ...getArticleSlugs().map((slug) => {
      const a = getArticleBySlug(slug);
      return {
        url: url(`/blog/${slug}/`),
        lastModified: a?.updatedAt ? new Date(a.updatedAt) : a?.publishedAt ? new Date(a.publishedAt) : now,
        changeFrequency: 'monthly' as const,
        priority: 0.7,
      };
    }),
    ...allTags.map((t) => ({
      url: url(`/blog/tag/${slugify(t)}/`),
      lastModified: now,
      changeFrequency: 'weekly' as const,
      priority: 0.5,
    })),
    ...getEbookSlugs().map((slug) => ({
      url: url(`/ebook/${slug}/`),
      lastModified: now,
      changeFrequency: 'monthly' as const,
      priority: 0.9, // alta — são páginas de conversão
    })),
  ];
}
