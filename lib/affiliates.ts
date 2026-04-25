/**
 * Registry de produtos afiliados.
 *
 * Cada entry: id estável (slug) → URL afiliado + meta.
 * Trocar `url` aqui propaga em todo site sem redeploy de páginas.
 *
 * Compliance:
 *  - `disclosure: true` força label "parceria comercial" no card (CONAR).
 *  - `network` usado em analytics — não exposto ao usuário.
 */

export type AffiliateNetwork = 'amazon' | 'hotmart' | 'monetizze' | 'eduzz' | 'direto';

export type AffiliateProduct = {
  id: string;
  network: AffiliateNetwork;
  url: string;
  title: string;
  blurb: string;
  cta: string;
  priceHint?: string;
};

export const AFFILIATES: Record<string, AffiliateProduct> = {
  agua_bact_amazon: {
    id: 'agua_bact_amazon',
    network: 'amazon',
    url: 'https://www.amazon.com.br/s?k=agua+bacteriostatica&tag=SEU-TAG-20',
    title: 'Água bacteriostática 30 ml',
    blurb: 'Diluente padrão pra reconstituir peptídeos. Frasco multidose com álcool benzílico 0,9%.',
    cta: 'Ver na Amazon',
    priceHint: 'a partir de R$ 35',
  },
  seringa_insulina_amazon: {
    id: 'seringa_insulina_amazon',
    network: 'amazon',
    url: 'https://www.amazon.com.br/s?k=seringa+insulina+1ml&tag=SEU-TAG-20',
    title: 'Seringa insulina 1 ml (100 U)',
    blurb: 'Agulha 8mm/13mm. Caixa 100 unidades. Marca SR/BD/Descarpack.',
    cta: 'Ver opções',
    priceHint: 'a partir de R$ 45',
  },
  cooler_insulina_amazon: {
    id: 'cooler_insulina_amazon',
    network: 'amazon',
    url: 'https://www.amazon.com.br/s?k=cooler+insulina+frio&tag=SEU-TAG-20',
    title: 'Cooler de insulina (FRIO/Diabag)',
    blurb: 'Mantém peptídeo refrigerado em viagem 24-72h sem gelo.',
    cta: 'Ver coolers',
  },
  ebook_glp1_hotmart: {
    id: 'ebook_glp1_hotmart',
    network: 'hotmart',
    url: 'https://go.hotmart.com/SEU-LINK-GLP1',
    title: 'Protocolo GLP-1 completo',
    blurb: 'Curso passo-a-passo: titulação, manejo de náusea, plateau, manutenção.',
    cta: 'Ver curso',
    priceHint: 'R$ 197',
  },
  ebook_peptideos_hotmart: {
    id: 'ebook_peptideos_hotmart',
    network: 'hotmart',
    url: 'https://go.hotmart.com/SEU-LINK-PEPTIDEOS',
    title: 'Guia avançado de peptídeos',
    blurb: 'Cronogramas, combinações e protocolos avançados (BPC-157, TB-500, GH).',
    cta: 'Ver guia',
    priceHint: 'R$ 97',
  },
  planilha_peptideo_hotmart: {
    id: 'planilha_peptideo_hotmart',
    network: 'hotmart',
    url: 'https://go.hotmart.com/T105551445E?src=central-peptideos',
    title: 'Planilha de protocolo de peptídeos',
    blurb: 'Planilha pronta: cronograma de aplicações, doses, controle de frasco e registro de efeitos. Ideal pra acompanhar o protocolo semana a semana.',
    cta: 'Ver planilha',
    // priceHint: 'R$ XX', // preencha após pegar valor real da página de vendas
  },
};

export function getAffiliate(id: string): AffiliateProduct | undefined {
  return AFFILIATES[id];
}
