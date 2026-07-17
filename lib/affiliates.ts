export type AffiliateNetwork = 'whatsapp' | 'direto';

export type AffiliateProduct = {
  id: string;
  network: AffiliateNetwork;
  url: string;
  title: string;
  blurb: string;
  cta: string;
  priceHint?: string;
  image?: { src: string; width: number; height: number; alt: string };
  /** Mensagem pré-preenchida no WhatsApp (anexada como ?text= no redirect). */
  message?: string;
};

export const AFFILIATES: Record<string, AffiliateProduct> = {
  fornecedor_oficial: {
    id: 'fornecedor_oficial',
    network: 'whatsapp',
    url: 'https://wa.me/5511920904819',
    title: 'Fornecedor Oficial',
    blurb: 'Peptídeos com procedência. Fale direto no WhatsApp.',
    cta: 'Falar no WhatsApp',
    message:
      'Olá! Vim do site Central Peptídeos e gostaria de mais informações.',
  },
};

export function getAffiliate(id: string): AffiliateProduct | undefined {
  return AFFILIATES[id];
}
