export type Ebook = {
  slug: string;
  title: string;
  subtitle: string;
  /** Benefício em 1 frase que vira gancho */
  hook: string;
  /** Preço em reais (de — por) */
  priceFrom?: number;
  price: number;
  /** Número de páginas */
  pages: number;
  /** Tempo estimado de leitura */
  readMinutes: number;
  /** Cores do gradient da capa */
  coverColor: string;
  /** O que o leitor vai aprender — aparece como bullets */
  learn: string[];
  /** Para quem é */
  audience: string[];
  /** FAQ da página de venda */
  faq: { q: string; a: string }[];
  /** Peptídeos relacionados (para cross-placement) */
  relatedPeptides?: string[];
  /** Tags do blog relacionadas (para cross-placement) */
  relatedTags?: string[];
  /** URL do checkout (Kiwify/Hotmart/Gumroad) — preenchido via env */
  checkoutUrl: string;
};

// URL de checkout vem de env pra facilitar trocar sem rebuild de código.
// Defina NEXT_PUBLIC_KIWIFY_RETATRUTIDA=https://pay.kiwify.com.br/XXX
const CHECKOUT_RETATRUTIDA =
  process.env.NEXT_PUBLIC_KIWIFY_RETATRUTIDA ||
  'https://pay.kiwify.com.br/PLACEHOLDER';

export const EBOOKS: Ebook[] = [
  {
    slug: 'retatrutida-estrategias',
    title: 'Retatrutida: Estratégias para Maximizar Resultados',
    subtitle: 'O manual prático da nova geração de emagrecedores',
    hook: 'Do primeiro frasco à dose de manutenção: protocolo completo, cálculo de doses, armazenamento, comparativo com semaglutida e tirzepatida e os erros que sabotam resultados.',
    priceFrom: 49.90,
    price: 29.90,
    pages: 64,
    readMinutes: 90,
    coverColor: 'from-orange-500 via-teal-500 to-blue-600',
    learn: [
      'Como a retatrutida age em 3 receptores simultâneos e por que isso potencializa o efeito',
      'Os resultados dos estudos TRIUMPH e a perda de peso esperada em cada dose',
      'Protocolo completo de titulação: como começar, quando subir, quando pausar',
      'Como reconstituir e calcular doses com precisão milimétrica',
      'Efeitos colaterais e como minimizar náusea durante a escalada',
      'Comparativo honesto: Retatrutida vs Tirzepatida vs Semaglutida',
      'O que fazer na fase de manutenção pra evitar o efeito rebote',
      'Sinais de alerta que exigem interromper o uso imediatamente',
      'Como escolher uma farmácia de manipulação confiável',
      'Combinação com treino e dieta para otimizar resultado sem perder massa muscular',
    ],
    audience: [
      'Pessoas considerando iniciar retatrutida sob acompanhamento médico',
      'Quem já usa mas quer entender o mecanismo a fundo',
      'Profissionais de saúde que querem base técnica atualizada (2026)',
      'Quem comparou GLP-1 e quer entender a nova geração',
    ],
    faq: [
      {
        q: 'O ebook substitui acompanhamento médico?',
        a: 'Não. É material educativo técnico baseado em literatura científica. Qualquer protocolo com retatrutida deve ser feito sob orientação de médico habilitado.',
      },
      {
        q: 'Como recebo o ebook após comprar?',
        a: 'Entrega automática por email em até 2 minutos após confirmação do pagamento. PDF compatível com celular, tablet e computador.',
      },
      {
        q: 'Os dados são atualizados?',
        a: 'Sim — edição de 2026, incluindo os resultados mais recentes dos estudos TRIUMPH-4 e análise farmacocinética.',
      },
      {
        q: 'Retatrutida é aprovada no Brasil?',
        a: 'Ainda não — está em estudos fase 3 da Eli Lilly. O ebook trata tanto do que a ciência mostra quanto do uso off-label atual em contexto de pesquisa.',
      },
      {
        q: 'Posso pedir reembolso?',
        a: 'Sim — garantia incondicional de 7 dias conforme CDC. Não gostou? Devolvemos 100% do valor sem perguntas.',
      },
      {
        q: 'O pagamento é seguro?',
        a: 'Sim. Checkout processado pela Kiwify (infraestrutura brasileira com criptografia SSL, gateway antifraude). Aceita cartão, Pix e boleto.',
      },
    ],
    relatedPeptides: ['retatrutide', 'semaglutida', 'tirzepatida'],
    relatedTags: ['glp-1', 'emagrecimento', 'comparação'],
    checkoutUrl: CHECKOUT_RETATRUTIDA,
  },
];

export function getEbooks(): Ebook[] { return EBOOKS; }
export function getEbookBySlug(slug: string): Ebook | undefined {
  return EBOOKS.find((e) => e.slug === slug);
}
export function getEbookSlugs(): string[] {
  return EBOOKS.map((e) => e.slug);
}

// Encontrar ebooks relevantes para um peptídeo (para cross-placement)
export function getEbooksForPeptide(peptideSlug: string): Ebook[] {
  return EBOOKS.filter((e) => e.relatedPeptides?.includes(peptideSlug));
}
// Encontrar ebooks relevantes para tags de artigo
export function getEbooksForTags(tags: string[]): Ebook[] {
  return EBOOKS.filter((e) =>
    e.relatedTags?.some((t) => tags.includes(t))
  );
}
