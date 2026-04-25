import { getAffiliate } from '@/lib/affiliates';

type Props = {
  productId: string;
  slot: string;
  variant?: 'inline' | 'compact';
};

/**
 * Card afiliado server-rendered. Click vai por `/api/click` → grava → 302.
 * Disclosure CONAR sempre visível.
 */
export default function AffiliateBox({ productId, slot, variant = 'inline' }: Props) {
  const product = getAffiliate(productId);
  if (!product) return null;

  const href = `/api/click?p=${encodeURIComponent(product.id)}&slot=${encodeURIComponent(slot)}`;

  if (variant === 'compact') {
    return (
      <a
        href={href}
        target="_blank"
        rel="nofollow sponsored noopener"
        className="block card p-4 hover:border-teal-300 transition-colors no-print"
      >
        <div className="flex items-center justify-between gap-3">
          <div className="min-w-0">
            <p className="text-xs font-bold uppercase tracking-wider text-ink-3 mb-1">
              Parceria comercial
            </p>
            <p className="font-semibold text-ink truncate">{product.title}</p>
            {product.priceHint && (
              <p className="text-sm text-ink-2 mt-0.5">{product.priceHint}</p>
            )}
          </div>
          <span className="btn-primary text-sm whitespace-nowrap">{product.cta}</span>
        </div>
      </a>
    );
  }

  return (
    <a
      href={href}
      target="_blank"
      rel="nofollow sponsored noopener"
      className="block card p-5 hover:border-teal-300 transition-colors no-print"
    >
      <p className="text-xs font-bold uppercase tracking-wider text-ink-3 mb-2">
        Parceria comercial
      </p>
      <h3 className="text-lg font-extrabold text-ink mb-1">{product.title}</h3>
      <p className="text-sm text-ink-2 leading-relaxed">{product.blurb}</p>
      <div className="mt-4 flex items-center justify-between gap-3">
        {product.priceHint && (
          <span className="text-sm font-semibold text-ink-2">{product.priceHint}</span>
        )}
        <span className="btn-primary text-sm">{product.cta} →</span>
      </div>
    </a>
  );
}
