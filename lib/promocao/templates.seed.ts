export interface TemplateSeed {
  slug: string;
  title: string;
  channelKind: string | null;
  bodyVariants: string[];
  utmDefaults: Record<string, string>;
}

export const TEMPLATES_SEED: TemplateSeed[] = [
  {
    slug: 'reconstituicao',
    title: 'Reconstituição — Quantas unidades na seringa',
    channelKind: null,
    utmDefaults: { path: '/ferramentas/reconstituicao', campaign: 'divulgacao' },
    bodyVariants: [
      `a fórmula é dose × água × 100 / mg_frasco. ex: 0.25mg de sema em frasco de 5mg com 2ml de água = 10 unidades.\n\n(se não quiser calcular na mão tem uma calculadora que faz isso com desenho da seringa: {utm_url})`,
      `divide assim: (dose desejada ÷ mg do frasco) × volume de água × 100. no caso de 0.25mg em frasco 5mg/2ml dá 10 unidades na seringa de insulina.\n\ntambém tem uma calculadora visual pra isso: {utm_url}`,
      `{utm_url} — essa calculadora calcula direto e ainda mostra a marcação na seringa. coloca a dose, o mg do frasco e a água que você usou.`,
    ],
  },
  {
    slug: 'titulacao-glp1',
    title: 'Titulação GLP-1 — Protocolo de subida de dose',
    channelKind: null,
    utmDefaults: { path: '/ferramentas/titulacao', campaign: 'divulgacao' },
    bodyVariants: [
      `protocolo padrão: 0.25mg/semana por 4 semanas → 0.5mg → 1.0mg → 1.7mg → 2.4mg (manutenção). cada etapa espera 4 semanas.\n\ntinha um calendário pronto aqui: {utm_url} — coloca a data de início e gera o cronograma.`,
      `a subida é gradual pra evitar efeito colateral GI. começa em 0.25mg por um mês, depois sobe quando o corpo se adaptar. bula orienta 4 semanas em cada patamar.\n\n{utm_url} gera o calendário com datas já calculadas`,
      `0.25 → 0.5 → 1.0 → 1.7 → 2.4mg, uma etapa por mês. não precisa seguir à risca se não tolerar — pode ficar mais tempo em cada degrau.\n\ncalendário visual: {utm_url}`,
    ],
  },
  {
    slug: 'doses-frasco',
    title: 'Quantas doses rende o frasco',
    channelKind: null,
    utmDefaults: { path: '/ferramentas/reconstituicao', campaign: 'divulgacao' },
    bodyVariants: [
      `divide mg do frasco pela dose. 10mg / 2.5mg = 4 doses. se a dose não for exata use a calculadora que calcula junto com as unidades: {utm_url}`,
      `frasco ÷ dose = número de aplicações. mas se o volume de reconstituição for esquisito ou a dose tiver casas decimais, é mais fácil deixar a calculadora fazer: {utm_url}`,
      `{utm_url} — mostra quantas doses rende junto com as unidades na seringa, útil quando a divisão não dá número redondo.`,
    ],
  },
  {
    slug: 'armazenamento',
    title: 'Armazenamento após reconstituição',
    channelKind: null,
    utmDefaults: { path: '/blog/como-guardar-ozempic-wegovy', campaign: 'divulgacao' },
    bodyVariants: [
      `GLP-1 reconstituído dura 28-30 dias na geladeira (2-8°C). não congela — pode desnaturar. evita deixar fora mais de 2h somadas no dia.\n\ntim guia por peptídeo: {utm_url}`,
      `regra geral: reconstituído na geladeira até 28 dias, longe de luz. BPC-157 segue o mesmo prazo. congelado não é recomendado.\n\n{utm_url} tem prazo separado por peptídeo`,
      `depois de abrir: 2-8°C, até 30 dias. a semaglutida e a tirze seguem isso. não deixa fora da geladeira por muito tempo.\n\ndetalhes em: {utm_url}`,
    ],
  },
  {
    slug: 'sema-vs-tirze',
    title: 'Comparativo Semaglutida vs Tirzepatida',
    channelKind: null,
    utmDefaults: { path: '/blog/semaglutida-vs-tirzepatida', campaign: 'divulgacao' },
    bodyVariants: [
      `sema age só em GLP-1. tirze age em GLP-1 + GIP (dual). na prática tirze perde mais peso (~20% vs ~15% em estudos) mas efeito GI é maior no início. custo da tirze costuma ser 30-40% mais alto.\n\ntabela completa: {utm_url}`,
      `diferença principal: tirzepatida é dual agonista (GLP-1 + GIP), semaglutida é só GLP-1. perda de peso maior com tirze na média, mas cada organismo reage diferente.\n\n{utm_url} tem os estudos comparados`,
      `tirze ≈ +5pp de perda de peso vs sema em média, mas mais efeito colateral nas primeiras semanas e preço mais alto. se o objetivo é custo-benefício, sema ainda é boa escolha.\n\ncomparativo detalhado: {utm_url}`,
    ],
  },
];
