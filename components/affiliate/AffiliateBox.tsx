import Image from 'next/image';
import { getAffiliate } from '@/lib/affiliates';

type Props = {
  productId: string;
  slot: string;
  variant?: 'inline' | 'compact';
  /** Override do título do produto pra contextualizar com tema da página. */
  title?: string;
  /** Override da descrição. */
  blurb?: string;
  /** Override do CTA. */
  cta?: string;
};

/**
 * Card afiliado server-rendered. Click vai por `/api/click` → grava → 302.
 * Disclosure CONAR sempre visível. Título/blurb/cta podem ser sobrescritos
 * por slot pra ganhar relevância contextual.
 */
export default function AffiliateBox({
  productId,
  slot,
  variant = 'inline',
  title,
  blurb,
  cta,
}: Props) {
  const product = getAffiliate(productId);
  if (!product) return null;

  const displayTitle = title ?? product.title;
  const displayBlurb = blurb ?? product.blurb;
  const displayCta = cta ?? product.cta;

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
            <p className="font-semibold text-ink truncate">{displayTitle}</p>
            {product.priceHint && (
              <p className="text-sm text-ink-2 mt-0.5">{product.priceHint}</p>
            )}
          </div>
          <span className="btn-primary text-sm whitespace-nowrap">{displayCta}</span>
        </div>
      </a>
    );
  }

  return (
    <a
      href={href}
      target="_blank"
      rel="nofollow sponsored noopener"
      className="block card overflow-hidden hover:border-teal-300 transition-colors no-print"
    >
      <div className="md:flex">
        {product.image && (
          <div className="md:w-1/3 md:flex-shrink-0 bg-neutral-100">
            <Image
              src={product.image.src}
              alt={product.image.alt}
              width={product.image.width}
              height={product.image.height}
              className="w-full h-48 md:h-full object-cover"
            />
          </div>
        )}
        <div className="p-5 md:flex-1">
          <h3 className="text-lg font-extrabold text-ink mb-1">{displayTitle}</h3>
          <p className="text-sm text-ink-2 leading-relaxed">{displayBlurb}</p>
          <div className="mt-4 flex items-center justify-between gap-3">
            {product.priceHint && (
              <span className="text-sm font-semibold text-ink-2">{product.priceHint}</span>
            )}
            <span className="btn-primary text-sm">{displayCta} →</span>
          </div>
        </div>
      </div>
    </a>
  );
}
