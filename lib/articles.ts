export type Author = {
  name: string;
  credentials?: string;
  url?: string;
  image?: string;
};

export type Article = {
  slug: string;
  title: string;
  excerpt: string;
  publishedAt: string;  // ISO
  updatedAt?: string;
  readMinutes: number;
  tags: string[];
  relatedPeptides?: string[]; // slugs
  coverColor?: string; // classe tailwind para gradient
  draft?: boolean;     // mostra aviso de draft no hero
  author?: Author;
  reviewedBy?: Author;
  tldr?: string;       // resumo curto (aparece em destaque + melhora featured snippet)
};

// Fase 3: hard-coded. Fase 2 Supabase moveria isso.
// Cada artigo é uma página TSX em app/blog/[slug]/page.tsx (controle total sobre estilo)
export const ARTICLES: Article[] = [
  {
    slug: 'como-reconstituir-semaglutida',
    title: 'Como reconstituir semaglutida: passo a passo com seringa de insulina',
    excerpt: 'Guia completo de reconstituição de semaglutida com proporções corretas, cálculo de dose e armazenamento seguro.',
    tldr: 'Para reconstituir semaglutida 5 mg: limpe a tampa de ambos os frascos com álcool, puxe 2 ml de água bacteriostática, introduza no frasco de semaglutida escorrendo pela lateral, gire suavemente (nunca agite) até dissolver, e armazene refrigerado. Cada dose de 0,25 mg equivale a 10 unidades na seringa de insulina.',
    publishedAt: '2026-04-16',
    readMinutes: 8,
    tags: ['semaglutida', 'glp-1', 'reconstituição', 'passo-a-passo'],
    relatedPeptides: ['semaglutida', 'tirzepatida'],
    coverColor: 'from-blue-500/20 to-teal-500/10',
  },
  {
    slug: 'semaglutida-vs-tirzepatida',
    title: 'Semaglutida vs Tirzepatida: comparativo completo (2026)',
    excerpt: 'Comparação detalhada entre os dois agonistas GLP-1 mais usados: mecanismo, eficácia, efeitos e custos.',
    tldr: 'Semaglutida é agonista GLP-1 puro; tirzepatida ativa GLP-1 + GIP. Em ensaios fase 3, tirzepatida (15 mg/sem) levou a perda de peso de ~21% vs ~15% da semaglutida (2,4 mg/sem). Efeitos gastrointestinais são similares, com ligeira vantagem de tolerabilidade para tirzepatida. Ambas aprovadas pelo FDA; semaglutida tem mais dados de longo prazo.',
    publishedAt: '2026-04-16',
    readMinutes: 10,
    tags: ['glp-1', 'comparação', 'emagrecimento'],
    relatedPeptides: ['semaglutida', 'tirzepatida'],
    coverColor: 'from-orange-500/20 to-blue-500/10',
  },
  {
    slug: 'agua-bacteriostatica-guia',
    title: 'Água bacteriostática: o que é e por que usar na reconstituição',
    excerpt: 'Entenda por que a água bacteriostática é o diluente correto, como armazenar o frasco reconstituído e quais as alternativas.',
    tldr: 'Água bacteriostática é água estéril com 0,9% de álcool benzílico como conservante, permitindo múltiplas perfurações no mesmo frasco sem contaminação. É o diluente padrão para peptídeos multi-dose. Frascos reconstituídos duram 28 dias refrigerados. Nunca use água destilada comum em frascos multi-dose — contamina em horas.',
    publishedAt: '2026-04-16',
    readMinutes: 6,
    tags: ['reconstituição', 'armazenamento', 'guia-básico'],
    coverColor: 'from-teal-500/20 to-green-500/10',
  },
  {
    slug: 'ozempic-para-perder-peso-sem-diabetes',
    title: 'Ozempic para perder peso sem diabetes: o que a ciência mostra',
    excerpt: 'Uso de semaglutida off-label em pessoas sem diabetes, dados dos ensaios clínicos STEP e riscos do uso estético.',
    tldr: 'Semaglutida funciona para perda de peso em pessoas sem diabetes — o estudo STEP-1 mostrou perda média de ~15% com 2,4 mg/semana em 68 semanas. Ozempic (1-2 mg) é aprovado para diabetes; Wegovy (2,4 mg) para obesidade. Usar Ozempic off-label para emagrecer é comum mas deve ser acompanhado por endocrinologista. Reganho de 60-70% do peso perdido ocorre em 1 ano se descontinuado.',
    publishedAt: '2026-04-16',
    readMinutes: 9,
    tags: ['semaglutida', 'emagrecimento', 'off-label'],
    relatedPeptides: ['semaglutida'],
    coverColor: 'from-blue-500/20 to-teal-500/10',
  },
  {
    slug: 'efeitos-colaterais-semaglutida',
    title: 'Semaglutida faz mal? Efeitos colaterais documentados',
    excerpt: 'Revisão dos efeitos adversos da semaglutida a partir dos ensaios STEP, SUSTAIN e relatórios pós-comercialização.',
    tldr: 'Os efeitos colaterais mais comuns da semaglutida são gastrointestinais: náusea (até 44%), diarreia (30%), vômito (25%), constipação (24%). Efeitos sérios raros incluem pancreatite (~0,3%), cálculos biliares e reações de hipersensibilidade. Contraindicações absolutas: história pessoal/familiar de carcinoma medular de tireoide, NEM 2 e gravidez.',
    publishedAt: '2026-04-16',
    readMinutes: 7,
    tags: ['semaglutida', 'efeitos-colaterais', 'segurança'],
    relatedPeptides: ['semaglutida'],
    coverColor: 'from-amber-500/20 to-blue-500/10',
  },
  {
    slug: 'como-guardar-ozempic-wegovy',
    title: 'Como guardar Ozempic e Wegovy corretamente (antes e depois de abertos)',
    excerpt: 'Orientações de armazenamento conforme bula: temperatura, proteção da luz, tempo pós-abertura e dicas de viagem.',
    tldr: 'Antes de abrir: geladeira (2-8°C), nunca na porta, nunca congelar, proteger da luz. Depois de abrir (primeira perfuração): pode ficar em temperatura ambiente (até 25°C) por até 56 dias, ou continuar refrigerado. Congelamento ou temperatura acima de 30°C degrada a molécula — descarte.',
    publishedAt: '2026-04-16',
    readMinutes: 5,
    tags: ['armazenamento', 'ozempic', 'wegovy', 'guia-básico'],
    relatedPeptides: ['semaglutida'],
    coverColor: 'from-teal-500/20 to-green-500/10',
  },
  {
    slug: 'ozempic-falso-como-identificar',
    title: 'Ozempic falso: como identificar e o que fazer',
    excerpt: 'Sinais visuais em embalagem, número de lote, alerta da ANVISA e orientações para não comprar produto falsificado.',
    tldr: 'Sinais de Ozempic falso: preço muito abaixo do mercado (<R$ 500 para 1 mg), venda em marketplaces ou redes sociais, lote da caixa não bate com lote do pen, impressão de baixa qualidade, bula em folha avulsa. Verifique sempre na consulta ANVISA (consultas.anvisa.gov.br) e compre apenas em farmácia física com nota fiscal. Em caso de suspeita, notifique via Notivisa.',
    publishedAt: '2026-04-16',
    readMinutes: 6,
    tags: ['ozempic', 'segurança', 'regulatório'],
    relatedPeptides: ['semaglutida'],
    coverColor: 'from-red-500/20 to-amber-500/10',
  },
  {
    slug: 'tirzepatida-manipulada-seguranca',
    title: 'Tirzepatida manipulada é segura? Cuidados ao usar',
    excerpt: 'Diferenças entre o Mounjaro industrial e versões manipuladas: qualidade, certificação, sinais de confiança na farmácia.',
    tldr: 'Tirzepatida manipulada custa 60-70% menos que Mounjaro mas não é equivalente — pureza, estabilidade e dose exata variam. Farmácia confiável tem: registro ANVISA visível, fornece COA (Certificado de Análise), HPLC, farmacêutico responsável identificado e exige prescrição. Se orçamento permite, industrializado é sempre mais seguro.',
    publishedAt: '2026-04-16',
    readMinutes: 8,
    tags: ['tirzepatida', 'manipulação', 'segurança'],
    relatedPeptides: ['tirzepatida'],
    coverColor: 'from-orange-500/20 to-red-500/10',
  },
  {
    slug: 'quanto-tempo-ozempic-faz-efeito',
    title: 'Quanto tempo Ozempic leva para começar a fazer efeito?',
    excerpt: 'Linha do tempo esperada: controle glicêmico em dias, saciedade em semanas, perda de peso em meses — com referências.',
    tldr: 'Saciedade aparece em 2-3 dias. Redução consistente de apetite em 2-4 semanas. Perda de peso de 4-8 kg até a semana 12. Controle glicêmico (HbA1c) detectável em 8-12 semanas. Perda máxima de peso (10-15%) em 6 meses com dose de manutenção. Semaglutida tem meia-vida de 7 dias, então estado estacionário só acontece após 4-5 semanas.',
    publishedAt: '2026-04-16',
    readMinutes: 6,
    tags: ['ozempic', 'semaglutida', 'expectativas'],
    relatedPeptides: ['semaglutida'],
    coverColor: 'from-blue-500/20 to-teal-500/10',
  },
  {
    slug: 'efeito-rebote-apos-parar-semaglutida',
    title: 'Efeito rebote após parar semaglutida: o que esperar',
    excerpt: 'Dados do estudo STEP-4 sobre reganho de peso pós-descontinuação e estratégias discutidas para minimizar.',
    tldr: 'O estudo STEP-4 mostrou que pacientes que trocaram semaglutida por placebo recuperaram ~70% do peso perdido em 48 semanas, enquanto quem continuou manteve a perda. Semaglutida não "cura" obesidade — trata enquanto ativa. Para minimizar rebote: reduzir dose gradualmente, manter treino resistido, aumentar proteína e monitorar peso semanalmente.',
    publishedAt: '2026-04-16',
    readMinutes: 7,
    tags: ['semaglutida', 'emagrecimento', 'manutenção'],
    relatedPeptides: ['semaglutida'],
    coverColor: 'from-amber-500/20 to-orange-500/10',
  },
  {
    slug: 'nausea-ozempic-como-lidar',
    title: 'Náusea no Ozempic: como minimizar e quando procurar médico',
    excerpt: 'Estratégias dietéticas e de timing para reduzir náusea durante a titulação da semaglutida.',
    tldr: 'Para minimizar náusea no Ozempic: refeições pequenas e frequentes (5-6x/dia), evitar gordura e frituras durante picos, hidratação reforçada, gengibre ou dimenidrinato pontual. Se náusea persiste, não suba a dose — repita a etapa atual por mais 2-4 semanas. Procure médico se: dor abdominal severa e persistente, vômito impedindo hidratação por 24h, ou perda de peso maior que 4 kg/semana.',
    publishedAt: '2026-04-16',
    readMinutes: 5,
    tags: ['ozempic', 'efeitos-colaterais', 'dicas'],
    relatedPeptides: ['semaglutida'],
    coverColor: 'from-green-500/20 to-teal-500/10',
  },
  {
    slug: 'bpc-157-ciclo-duracao',
    title: 'Ciclo de BPC-157: quanto tempo usar e quando pausar',
    excerpt: 'Protocolos típicos usados em pesquisa, duração recomendada por objetivo (cicatrização vs manutenção) e pausas.',
    tldr: 'Protocolo típico informal de BPC-157 para cicatrização aguda: 250 mcg SC 2x/dia por 4-6 semanas. Para questões GI: 250-500 mcg 1-2x/dia por 2-4 semanas. Padrão conservador de pausa: 4 semanas on, 2 semanas off. Evitar em quem tem câncer ativo ou histórico recente (preocupação teórica com angiogênese). BPC-157 não é aprovado para uso humano em nenhuma jurisdição.',
    publishedAt: '2026-04-16',
    readMinutes: 7,
    tags: ['bpc-157', 'protocolo', 'cicatrização'],
    relatedPeptides: ['bpc-157'],
    coverColor: 'from-green-500/20 to-teal-500/10',
  },
  {
    slug: 'cjc-ipamorelina-como-combinar',
    title: 'CJC-1295 + Ipamorelina: o combo mais usado, explicado',
    excerpt: 'Por que a combinação GHRH + GHRP potencializa a liberação de GH, protocolos comuns e limites de segurança.',
    tldr: 'CJC-1295 (GHRH analog) e ipamorelina (GHRP) agem em receptores diferentes e sinérgicos — juntos, amplificam a liberação de GH mais que qualquer um isolado. Protocolo informal: CJC sem DAC 100 mcg + ipamorelina 200-300 mcg SC, 2-3x/dia em estômago vazio. Use CJC sem DAC (não a versão com DAC de longa duração) para preservar pulsatilidade fisiológica. Monitore IGF-1 a cada 6-8 semanas. Ambos proibidos pela WADA.',
    publishedAt: '2026-04-16',
    readMinutes: 8,
    tags: ['cjc-1295', 'ipamorelina', 'gh', 'combinação'],
    relatedPeptides: ['cjc-1295', 'ipamorelina'],
    coverColor: 'from-violet-500/20 to-blue-500/10',
  },
];

export function getArticles(): Article[] {
  return [...ARTICLES].sort((a, b) => b.publishedAt.localeCompare(a.publishedAt));
}

export function getArticleBySlug(slug: string): Article | undefined {
  return ARTICLES.find((a) => a.slug === slug);
}

export function getArticleSlugs(): string[] {
  return ARTICLES.map((a) => a.slug);
}
