import Link from 'next/link';
import Image from 'next/image';
import type { Ebook } from '@/lib/ebooks';
import { EBOOKS, BUNDLES, getEbookBySlug } from '@/lib/ebooks';
import { BundleBanner } from './BundleOffer';

type Props = {
  ebook: Ebook;
  variant?: 'banner' | 'inline' | 'sidebar';
  source?: string; // UTM/tracking (ex: 'retatrutide-page', 'home-hero')
};

// Gradient da capa como style inline (Tailwind não resolve strings dinâmicas)
const COVER_STYLE = {
  background: 'linear-gradient(145deg, #f97316 0%, #0d9488 50%, #1e40af 100%)',
  boxShadow: '0 10px 30px -5px rgba(13,148,136,0.4), 0 0 0 1px rgba(255,255,255,0.1) inset',
};

const fmt = (n: number) => n.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 });

// Tracking via query string — você pode ver depois no Kiwify qual CTA converte mais
function checkoutWithSource(url: string, source?: string): string {
  if (!source) return url;
  const sep = url.includes('?') ? '&' : '?';
  return `${url}${sep}utm_source=site&utm_medium=${encodeURIComponent(source)}`;
}

export default function EbookCTA({ ebook, variant = 'inline', source }: Props) {
  const landing = `/ebook/${ebook.slug}`;
  const coverLabel = ebook.shortTitle ?? ebook.title;

  if (variant === 'banner') {
    // Banner horizontal compacto — pro topo de página de peptídeo relevante
    return (
      <Link
        href={landing}
        className="group relative block overflow-hidden rounded-xl border border-teal-200 p-3 md:p-4 shadow-sm transition-all hover:shadow-md hover:border-teal hover:-translate-y-0.5"
        style={{
          background:
            'linear-gradient(120deg, rgba(253,186,116,0.18) 0%, rgba(94,234,212,0.15) 50%, rgba(147,197,253,0.18) 100%), #ffffff',
        }}
      >
        <div className="flex items-center gap-3 md:gap-4">
          {/* Mini cover */}
          {ebook.coverImage ? (
            <div className="flex-shrink-0 w-14 md:w-16 rounded-md overflow-hidden shadow">
              <Image
                src={ebook.coverImage}
                alt={ebook.title}
                width={160}
                height={160}
                className="w-full h-auto object-cover"
              />
            </div>
          ) : (
            <div
              className="flex-shrink-0 w-12 md:w-14 aspect-[3/4] rounded-md flex items-center justify-center text-white text-[9px] font-black text-center px-1 leading-tight"
              style={COVER_STYLE}
            >
              EBOOK<br />{coverLabel}
            </div>
          )}

          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-1.5 mb-0.5">
              <span className="text-[9px] md:text-[10px] font-bold uppercase tracking-wider text-orange-600">📘 Ebook</span>
            </div>
            <h3 className="font-extrabold text-ink text-sm md:text-base leading-tight line-clamp-1 group-hover:text-teal-700 transition-colors">
              {ebook.title}
            </h3>
            <div className="mt-1 flex flex-wrap items-baseline gap-x-2 gap-y-0.5">
              {ebook.priceFrom && (
                <span className="text-[10px] text-ink-3 line-through tabular-nums">
                  R$ {fmt(ebook.priceFrom)}
                </span>
              )}
              <span className="text-base md:text-lg font-extrabold text-teal-700 tabular-nums">
                R$ {fmt(ebook.price)}
              </span>
              <span className="text-[10px] text-ink-3 hidden md:inline">12× sem juros</span>
              <span className="ml-auto text-xs md:text-sm font-bold text-teal-700 flex items-center gap-0.5 group-hover:gap-1 transition-all">
                Ver
                <svg viewBox="0 0 20 20" width={12} height={12} fill="none" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round" aria-hidden><path d="M5 10h10M10 5l5 5-5 5" /></svg>
              </span>
            </div>
          </div>
        </div>
      </Link>
    );
  }

  if (variant === 'sidebar') {
    // Card vertical compacto — pra sidebar de artigo
    return (
      <aside className="card overflow-hidden sticky top-24">
        {ebook.coverImage ? (
          <div className="relative aspect-[5/4] w-full">
            <Image
              src={ebook.coverImage}
              alt={ebook.title}
              fill
              sizes="(max-width: 768px) 100vw, 300px"
              className="object-cover"
            />
          </div>
        ) : (
          <div
            className="h-28 flex items-center justify-center text-white text-xs font-black px-3 text-center leading-tight"
            style={COVER_STYLE}
          >
            📘 Ebook<br/>exclusivo
          </div>
        )}
        <div className="p-4">
          <h3 className="font-bold text-sm text-ink leading-tight">{ebook.title}</h3>
          <p className="text-xs text-ink-2 mt-2 leading-relaxed line-clamp-3">{ebook.hook}</p>
          <div className="mt-3 flex items-baseline gap-2">
            {ebook.priceFrom && (
              <span className="text-xs text-ink-3 line-through tabular-nums">R$ {fmt(ebook.priceFrom)}</span>
            )}
            <span className="text-lg font-extrabold text-teal-700 tabular-nums">R$ {fmt(ebook.price)}</span>
          </div>
          <Link
            href={landing}
            className="mt-3 btn-teal w-full !h-10 text-sm"
          >
            Ver o ebook
            <svg viewBox="0 0 20 20" width={12} height={12} fill="none" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round" aria-hidden><path d="M4 10h12M10 4l6 6-6 6" /></svg>
          </Link>
          <p className="text-[10px] text-ink-3 mt-2 text-center">✓ Entrega imediata · 7 dias garantia</p>
        </div>
      </aside>
    );
  }

  // variant === 'inline' — card inline no meio do conteúdo
  return (
    <div className="not-prose my-6">
      <Link
        href={landing}
        className="group block overflow-hidden rounded-xl border border-teal-200 p-4 md:p-5 shadow-sm transition-all hover:shadow-md hover:border-teal hover:-translate-y-0.5"
        style={{
          background:
            'linear-gradient(120deg, rgba(253,186,116,0.18) 0%, rgba(94,234,212,0.15) 50%, rgba(147,197,253,0.18) 100%), #ffffff',
        }}
      >
        <div className="flex items-center gap-4">
          {ebook.coverImage ? (
            <div className="flex-shrink-0 w-20 md:w-24 rounded-lg overflow-hidden shadow">
              <Image
                src={ebook.coverImage}
                alt={ebook.title}
                width={240}
                height={240}
                className="w-full h-auto object-cover"
              />
            </div>
          ) : (
            <div
              className="flex-shrink-0 w-16 md:w-20 aspect-[3/4] rounded-lg flex items-center justify-center text-white text-xs font-black text-center px-2 leading-tight"
              style={COVER_STYLE}
            >
              EBOOK<br />{coverLabel}
            </div>
          )}
          <div className="flex-1 min-w-0">
            <span className="inline-block text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-orange-100 text-orange-700 border border-orange-200 mb-1.5">
              📘 Material complementar
            </span>
            <h3 className="font-extrabold text-ink text-base md:text-lg leading-tight line-clamp-2 group-hover:text-teal-700 transition-colors">
              {ebook.title}
            </h3>
            <div className="mt-2 flex flex-wrap items-baseline gap-x-2 gap-y-0.5">
              {ebook.priceFrom && (
                <span className="text-xs text-ink-3 line-through tabular-nums">R$ {fmt(ebook.priceFrom)}</span>
              )}
              <span className="text-xl md:text-2xl font-extrabold text-teal-700 tabular-nums">
                R$ {fmt(ebook.price)}
              </span>
              <span className="ml-auto text-xs md:text-sm font-bold text-teal-700 flex items-center gap-0.5 group-hover:gap-1 transition-all">
                Ver ebook
                <svg viewBox="0 0 20 20" width={14} height={14} fill="none" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round" aria-hidden><path d="M5 10h10M10 5l5 5-5 5" /></svg>
              </span>
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
}

/**
 * CTA compacto para caber dentro do card sticky de resultado de calculadora.
 * Fica visível enquanto o usuário mexe nos inputs.
 */
export function EbookStickyCTA({ ebook = EBOOKS[0], source }: { ebook?: Ebook; source?: string }) {
  return (
    <Link
      href={`/ebook/${ebook.slug}`}
      className="group block mt-4 overflow-hidden rounded-xl border-2 border-teal p-3 transition-all hover:shadow-lg hover:-translate-y-0.5"
      style={{
        background:
          'linear-gradient(120deg, rgba(253,186,116,0.25) 0%, rgba(94,234,212,0.22) 50%, rgba(147,197,253,0.25) 100%), #ffffff',
      }}
      data-source={source}
    >
      <div className="flex items-center gap-3">
        {ebook.coverImage ? (
          <div className="flex-shrink-0 w-12 h-12 rounded overflow-hidden shadow">
            <Image
              src={ebook.coverImage}
              alt={ebook.title}
              width={96}
              height={96}
              className="w-full h-full object-cover"
            />
          </div>
        ) : (
          <div
            className="flex-shrink-0 w-10 h-14 rounded flex items-center justify-center text-white text-[8px] font-black text-center leading-tight"
            style={COVER_STYLE}
          >
            EBOOK
          </div>
        )}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-1.5 mb-0.5">
            <span className="text-[9px] font-bold uppercase tracking-wider text-orange-600">📘 Material</span>
            {ebook.priceFrom && (
              <span className="text-[9px] font-bold text-orange-700 bg-orange-100 px-1.5 py-0.5 rounded-full border border-orange-200">
                -{Math.round((1 - ebook.price / ebook.priceFrom) * 100)}%
              </span>
            )}
          </div>
          <div className="font-bold text-sm text-ink leading-tight line-clamp-1 group-hover:text-teal-700 transition-colors">
            {ebook.shortTitle ? `Guia completo · ${ebook.shortTitle}` : ebook.title}
          </div>
          <div className="flex items-baseline gap-1.5 mt-0.5">
            {ebook.priceFrom && (
              <span className="text-[10px] text-ink-3 line-through tabular-nums">R$ {fmt(ebook.priceFrom)}</span>
            )}
            <span className="text-sm font-extrabold text-teal-700 tabular-nums">R$ {fmt(ebook.price)}</span>
            <span className="ml-auto text-xs font-bold text-teal-700 flex items-center gap-0.5 group-hover:gap-1 transition-all">
              Quero
              <svg viewBox="0 0 20 20" width={12} height={12} fill="none" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round" aria-hidden><path d="M5 10h10M10 5l5 5-5 5" /></svg>
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
}

/**
 * Versão sticky do combo — mesmo formato compacto do EbookStickyCTA,
 * mas linka pro checkout do combo direto. Pensado pro sidebar da calculadora.
 */
export function BundleStickyCTA({ source }: { source?: string }) {
  const bundle = BUNDLES[0];
  if (!bundle) return null;
  const ebooks = bundle.ebookSlugs
    .map((s) => getEbookBySlug(s))
    .filter(Boolean) as Ebook[];
  if (ebooks.length !== 2) return null;
  const [a, b] = ebooks;
  const soloTotal = a.price + b.price;
  const saved = soloTotal - bundle.totalPrice;
  const href = checkoutWithSource(
    bundle.checkoutUrl,
    source ?? 'sidebar-bundle',
  );

  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer noopener"
      className="group block mt-3 overflow-hidden rounded-xl border-2 border-orange-300 p-3 transition-all hover:shadow-lg hover:-translate-y-0.5"
      style={{
        background:
          'linear-gradient(120deg, rgba(253,186,116,0.35) 0%, rgba(254,240,138,0.3) 50%, rgba(94,234,212,0.25) 100%), #ffffff',
      }}
    >
      <div className="flex items-center gap-3">
        {bundle.coverImage ? (
          <div className="flex-shrink-0 w-12 h-12 rounded overflow-hidden shadow">
            <Image
              src={bundle.coverImage}
              alt={`Combo ${a.title} + ${b.title}`}
              width={96}
              height={96}
              className="w-full h-full object-cover"
            />
          </div>
        ) : (
          <div
            className="flex-shrink-0 w-12 h-12 rounded flex items-center justify-center text-white text-[10px] font-black text-center leading-tight"
            style={{
              background:
                'linear-gradient(135deg, #f97316 0%, #dc2626 100%)',
            }}
          >
            COMBO
          </div>
        )}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-1.5 mb-0.5">
            <span className="text-[9px] font-bold uppercase tracking-wider text-orange-700">🔥 Combo</span>
            <span className="text-[9px] font-bold text-orange-700 bg-orange-100 px-1.5 py-0.5 rounded-full border border-orange-200">
              -R$ {fmt(saved)}
            </span>
          </div>
          <div className="font-bold text-sm text-ink leading-tight line-clamp-1">
            Leve os 2 — o 2º por R$ {fmt(bundle.bonusPrice)}
          </div>
          <div className="flex items-baseline gap-1.5 mt-0.5">
            <span className="text-[10px] text-ink-3 line-through tabular-nums">
              R$ {fmt(soloTotal)}
            </span>
            <span className="text-sm font-extrabold text-orange-600 tabular-nums">
              R$ {fmt(bundle.totalPrice)}
            </span>
            <span className="ml-auto text-xs font-bold text-orange-600 flex items-center gap-0.5 group-hover:gap-1 transition-all">
              Ver
              <svg viewBox="0 0 20 20" width={12} height={12} fill="none" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round" aria-hidden><path d="M5 10h10M10 5l5 5-5 5" /></svg>
            </span>
          </div>
        </div>
      </div>
    </a>
  );
}

/**
 * Stack pro sidebar da calculadora: todos os ebooks + combo, todos compactos.
 * Substitui o `EbookStickyCTA` solo que tinha antes.
 */
export function EbookSidebarStack({ source = 'sidebar' }: { source?: string }) {
  return (
    <>
      {EBOOKS.map((e) => (
        <EbookStickyCTA key={e.slug} ebook={e} source={`${source}-${e.slug}`} />
      ))}
      <BundleStickyCTA source={`${source}-bundle`} />
    </>
  );
}

/**
 * Vitrine completa: 2 ebooks lado-a-lado + combo embaixo.
 * Usada em blog posts e páginas de peptídeo para oferecer tudo de uma vez.
 */
export function EbookShowcase({
  source = 'showcase',
  className = '',
}: { source?: string; className?: string }) {
  const bundle = BUNDLES[0];
  const bundleEbooks = bundle
    ? (bundle.ebookSlugs
        .map((s) => getEbookBySlug(s))
        .filter(Boolean) as [Ebook, Ebook])
    : null;
  return (
    <div className={`not-prose space-y-3 ${className}`}>
      <div className="grid gap-3 md:grid-cols-2">
        {EBOOKS.map((e) => (
          <EbookCTA
            key={e.slug}
            ebook={e}
            variant="banner"
            source={`${source}-${e.slug}`}
          />
        ))}
      </div>
      {bundle && bundleEbooks && (
        <BundleBanner
          bundle={bundle}
          ebooks={bundleEbooks}
          source={`${source}-bundle`}
        />
      )}
    </div>
  );
}

// Botão isolado de checkout direto (usado na landing page do ebook)
export function EbookBuyButton({
  ebook,
  source,
  size = 'lg',
  children,
}: {
  ebook: Ebook;
  source?: string;
  size?: 'md' | 'lg';
  children?: React.ReactNode;
}) {
  const href = checkoutWithSource(ebook.checkoutUrl, source);
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer noopener"
      className={`btn-teal ${size === 'lg' ? '!h-14 !px-8 !text-base' : ''} shadow-glow`}
    >
      {children || 'Comprar agora'}
      <svg viewBox="0 0 20 20" width={size === 'lg' ? 18 : 14} height={size === 'lg' ? 18 : 14} fill="none" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round" aria-hidden><path d="M4 10h12M10 4l6 6-6 6" /></svg>
    </a>
  );
}
