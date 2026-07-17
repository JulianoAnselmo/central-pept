// Comparações estáticas de alta intenção de busca ("X vs Y").
// Cada uma vira uma rota indexável /comparar/<slug>.
export type Comparison = {
  slug: string;          // 'semaglutida-vs-tirzepatida'
  peptideSlugs: string[]; // peptídeos comparados (2+)
  title: string;         // 'Semaglutida vs Tirzepatida'
  relatedPost?: string;  // slug de um post de blog correspondente, se houver
};

export const COMPARISONS: Comparison[] = [
  { slug: 'semaglutida-vs-tirzepatida', peptideSlugs: ['semaglutida', 'tirzepatida'], title: 'Semaglutida vs Tirzepatida', relatedPost: 'semaglutida-vs-tirzepatida' },
  { slug: 'tirzepatida-vs-retatrutide', peptideSlugs: ['tirzepatida', 'retatrutide'], title: 'Tirzepatida vs Retatrutide' },
  { slug: 'semaglutida-vs-retatrutide', peptideSlugs: ['semaglutida', 'retatrutide'], title: 'Semaglutida vs Retatrutide' },
  { slug: 'bpc-157-vs-tb-500', peptideSlugs: ['bpc-157', 'tb-500'], title: 'BPC-157 vs TB-500' },
  { slug: 'cjc-1295-vs-ipamorelina', peptideSlugs: ['cjc-1295', 'ipamorelina'], title: 'CJC-1295 vs Ipamorelina', relatedPost: 'cjc-ipamorelina-como-combinar' },
  { slug: 'ipamorelina-vs-sermorelina', peptideSlugs: ['ipamorelina', 'sermorelina'], title: 'Ipamorelina vs Sermorelina' },
  { slug: 'ghrp-2-vs-ghrp-6', peptideSlugs: ['ghrp-2', 'ghrp-6'], title: 'GHRP-2 vs GHRP-6' },
  { slug: 'semax-vs-selank', peptideSlugs: ['semax', 'selank'], title: 'Semax vs Selank' },
  { slug: 'mots-c-vs-epithalon', peptideSlugs: ['mots-c', 'epithalon'], title: 'MOTS-c vs Epithalon' },
  { slug: 'pt-141-vs-melanotan-ii', peptideSlugs: ['pt-141', 'melanotan-ii'], title: 'PT-141 vs Melanotan II' },
];

export function getComparison(slug: string): Comparison | undefined {
  return COMPARISONS.find((c) => c.slug === slug);
}

export function getComparisonSlugs(): string[] {
  return COMPARISONS.map((c) => c.slug);
}
