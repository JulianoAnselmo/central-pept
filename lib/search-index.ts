import { getPeptides, CATEGORY_LABELS } from './peptides';
import { getArticles } from './articles';

export type SearchResult = {
  id: string;
  title: string;
  subtitle?: string;
  type: 'peptide' | 'article' | 'tool' | 'page';
  url: string;
  keywords: string;
};

// Build search index (static - runs at build time via getSearchIndex)
export function buildSearchIndex(): SearchResult[] {
  const items: SearchResult[] = [];

  // Peptídeos
  for (const p of getPeptides()) {
    items.push({
      id: `p-${p.slug}`,
      title: p.name,
      subtitle: p.shortDescription,
      type: 'peptide',
      url: `/peptideos/${p.slug}`,
      keywords: [
        p.name,
        p.slug,
        p.shortDescription,
        p.category && p.category in CATEGORY_LABELS ? CATEGORY_LABELS[p.category as keyof typeof CATEGORY_LABELS] : '',
        p.category || '',
      ].join(' ').toLowerCase(),
    });
  }

  // Artigos
  for (const a of getArticles()) {
    items.push({
      id: `a-${a.slug}`,
      title: a.title,
      subtitle: a.excerpt,
      type: 'article',
      url: `/blog/${a.slug}`,
      keywords: [a.title, a.excerpt, ...a.tags].join(' ').toLowerCase(),
    });
  }

  // Ferramentas
  const tools = [
    { slug: 'reconstituicao', title: 'Calculadora de Reconstituição', desc: 'Cálculo de unidades na seringa' },
    { slug: 'mistura', title: 'Calculadora de Mistura', desc: '2-4 peptídeos no mesmo frasco' },
    { slug: 'conversor', title: 'Conversor mg ↔ mcg ↔ UI', desc: 'Conversão entre unidades' },
    { slug: 'cronograma', title: 'Cronograma de Doses', desc: 'Agenda + export .ics' },
    { slug: 'titulacao', title: 'Titulação GLP-1', desc: 'Escada de doses semaglutida / tirzepatida' },
  ];
  for (const t of tools) {
    items.push({
      id: `t-${t.slug}`,
      title: t.title,
      subtitle: t.desc,
      type: 'tool',
      url: `/ferramentas/${t.slug}`,
      keywords: [t.title, t.desc, t.slug].join(' ').toLowerCase(),
    });
  }

  // Páginas
  const pages = [
    { url: '/comparar', title: 'Comparador de peptídeos', desc: 'Até 4 peptídeos lado a lado' },
    { url: '/glossario', title: 'Glossário', desc: 'Termos técnicos explicados' },
    { url: '/blog', title: 'Blog', desc: 'Artigos e guias' },
    { url: '/sobre', title: 'Sobre', desc: 'Metodologia editorial' },
    { url: '/contato', title: 'Contato', desc: 'Correções e sugestões' },
  ];
  for (const pg of pages) {
    items.push({
      id: `pg-${pg.url}`,
      title: pg.title,
      subtitle: pg.desc,
      type: 'page',
      url: pg.url,
      keywords: [pg.title, pg.desc].join(' ').toLowerCase(),
    });
  }

  return items;
}

// Simple fuzzy-ish search with score
export function searchIndex(items: SearchResult[], query: string, limit = 8): SearchResult[] {
  const q = query.trim().toLowerCase();
  if (!q) return [];

  const tokens = q.split(/\s+/).filter(Boolean);

  const scored = items
    .map((item) => {
      let score = 0;
      const title = item.title.toLowerCase();
      for (const t of tokens) {
        if (title.startsWith(t)) score += 50;
        else if (title.includes(t)) score += 20;
        if (item.keywords.includes(t)) score += 5;
        // bonus por match exato
        if (title === t) score += 100;
      }
      return { item, score };
    })
    .filter(({ score }) => score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map(({ item }) => item);

  return scored;
}
