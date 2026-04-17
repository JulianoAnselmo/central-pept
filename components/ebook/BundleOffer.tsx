import Image from 'next/image';
import type { Ebook, EbookBundle } from '@/lib/ebooks';

const fmt = (n: number) =>
  n.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 });

function checkoutWithSource(url: string, source?: string): string {
  if (!source) return url;
  const sep = url.includes('?') ? '&' : '?';
  return `${url}${sep}utm_source=site&utm_medium=${encodeURIComponent(source)}`;
}

type Props = {
  bundle: EbookBundle;
  /** Ebook da landing atual (mostrado como "você já está levando") */
  current: Ebook;
  /** Ebook que será adicionado no combo */
  other: Ebook;
  /** Tracking (ex: 'bundle-retatrutida-hero', 'bundle-ghkcu-prefaq') */
  source?: string;
};

/**
 * Card de oferta de combo cruzado: na landing do ebook X, oferece
 * adicionar o ebook Y por mais R$ {bonusPrice}.
 */
export default function BundleOffer({ bundle, current, other, source }: Props) {
  const href = checkoutWithSource(bundle.checkoutUrl, source ?? `bundle-${current.slug}`);
  const soloTotal = current.price + other.price;
  const saved = soloTotal - bundle.totalPrice;

  return (
    <section className="max-w-4xl mx-auto px-4 md:px-6 py-10 md:py-14">
      <div
        className="cta-bundle-section cta-border-orange relative overflow-hidden rounded-2xl border-2 border-orange-300 shadow-xl"
      >
        {/* Glow decorativo */}
        <div
          className="absolute -top-16 -right-16 w-64 h-64 rounded-full opacity-30 blur-3xl"
          style={{ background: 'radial-gradient(circle, #fbbf24, transparent)' }}
          aria-hidden
        />
        <div
          className="absolute -bottom-16 -left-16 w-64 h-64 rounded-full opacity-30 blur-3xl"
          style={{ background: 'radial-gradient(circle, #22d3ee, transparent)' }}
          aria-hidden
        />

        <div className="relative p-6 md:p-8">
          {/* Badge */}
          <div className="flex justify-center mb-4">
            <span
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[11px] font-black uppercase tracking-widest text-white shadow-lg"
              style={{ background: 'linear-gradient(90deg, #f97316, #dc2626)' }}
            >
              🔥 Oferta combo · Só hoje
            </span>
          </div>

          <h2 className="text-center text-2xl md:text-3xl font-extrabold tracking-tight text-ink">
            Leve também o ebook{' '}
            <span className="text-orange-600">{other.shortTitle ?? other.title}</span>
            <br className="hidden md:block" />
            <span className="text-ink-2 text-lg md:text-xl font-bold">
              {' '}por apenas +R$ {fmt(bundle.bonusPrice)}
            </span>
          </h2>

          <p className="mt-3 text-center text-sm md:text-base text-ink-2 max-w-xl mx-auto leading-relaxed">
            {other.hook}
          </p>

          {/* Imagem do combo (ou mockups lado a lado como fallback) */}
          {bundle.coverImage ? (
            <div className="mt-7 flex justify-center">
              <div className="relative w-full max-w-md rounded-xl overflow-hidden shadow-2xl">
                <Image
                  src={bundle.coverImage}
                  alt={`Combo ${current.title} + ${other.title}`}
                  width={900}
                  height={600}
                  className="w-full h-auto object-cover"
                />
              </div>
            </div>
          ) : (
            <div className="mt-7 flex items-center justify-center gap-4 md:gap-6">
              <MiniCover title={current.shortTitle ?? current.title} color="#0d9488" tag="você já leva" />
              <div
                className="text-3xl md:text-4xl font-black text-orange-600 select-none"
                aria-hidden
              >
                +
              </div>
              <MiniCover title={other.shortTitle ?? other.title} color="#e11d48" tag="bônus" highlight />
            </div>
          )}

          {/* Breakdown de preço */}
          <div className="mt-7 flex flex-col items-center">
            <div className="flex items-baseline gap-2 flex-wrap justify-center">
              <span className="text-sm md:text-base text-ink-3 line-through tabular-nums">
                R$ {fmt(soloTotal)}
              </span>
              <span className="text-4xl md:text-5xl font-extrabold text-teal-700 tabular-nums">
                R$ {fmt(bundle.totalPrice)}
              </span>
            </div>
            <div className="mt-1 text-xs md:text-sm font-bold text-orange-600">
              R$ {fmt(current.price)} + R$ {fmt(bundle.bonusPrice)} · economize R$ {fmt(saved)}
            </div>
            <div className="mt-1 text-xs text-ink-3">
              ou 12× de R$ {(bundle.totalPrice / 12).toFixed(2).replace('.', ',')} sem juros
            </div>
          </div>

          {/* CTA */}
          <div className="mt-6 flex justify-center">
            <a
              href={href}
              target="_blank"
              rel="noreferrer noopener"
              className="inline-flex items-center justify-center gap-2 px-8 h-14 rounded-xl font-extrabold text-base text-white shadow-xl hover:shadow-2xl hover:-translate-y-0.5 transition-all"
              style={{ background: 'linear-gradient(135deg, #f97316 0%, #dc2626 100%)' }}
            >
              Levar os 2 por R$ {fmt(bundle.totalPrice)}
              <svg
                viewBox="0 0 20 20"
                width={18}
                height={18}
                fill="none"
                stroke="currentColor"
                strokeWidth={2.5}
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden
              >
                <path d="M4 10h12M10 4l6 6-6 6" />
              </svg>
            </a>
          </div>

          <p className="mt-4 text-center text-[11px] md:text-xs text-ink-3">
            ✓ Entrega imediata dos 2 PDFs · ✓ 7 dias de garantia · ✓ Pix · Cartão · Boleto
          </p>
        </div>
      </div>
    </section>
  );
}

/**
 * Versão compacta em banner — usada em home/hub de ferramentas.
 * Mensagem neutra: "combo leve os 2" em vez de "adicione o outro".
 */
export function BundleBanner({
  bundle,
  ebooks,
  source,
}: {
  bundle: EbookBundle;
  /** Os dois ebooks do combo, na ordem de exibição */
  ebooks: [Ebook, Ebook];
  source?: string;
}) {
  const href = checkoutWithSource(bundle.checkoutUrl, source ?? `bundle-banner`);
  const [a, b] = ebooks;
  const soloTotal = a.price + b.price;
  const saved = soloTotal - bundle.totalPrice;

  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer noopener"
      className="cta-bundle-banner cta-border-orange group relative block overflow-hidden rounded-xl border-2 border-orange-300 shadow-sm transition-all hover:shadow-md hover:-translate-y-0.5"
    >
      <div className="relative p-3 md:p-4 flex items-center gap-3 md:gap-4">
        {/* Imagem do combo (ou mockups como fallback) */}
        {bundle.coverImage ? (
          <div className="flex-shrink-0 w-20 md:w-28 rounded-md overflow-hidden shadow">
            <Image
              src={bundle.coverImage}
              alt={`Combo ${a.title} + ${b.title}`}
              width={280}
              height={187}
              className="w-full h-auto object-cover"
            />
          </div>
        ) : (
          <div className="flex items-center gap-1 flex-shrink-0">
            <MiniCover title={a.shortTitle ?? a.title} color="#0d9488" tag="" compact />
            <div className="text-lg font-black text-orange-600 select-none" aria-hidden>+</div>
            <MiniCover title={b.shortTitle ?? b.title} color="#e11d48" tag="" compact highlight />
          </div>
        )}

        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-1.5 mb-0.5">
            <span
              className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded-full text-[9px] md:text-[10px] font-black uppercase tracking-wider text-white"
              style={{ background: 'linear-gradient(90deg, #f97316, #dc2626)' }}
            >
              🔥 Combo
            </span>
            <span className="text-[9px] md:text-[10px] font-bold uppercase tracking-wider text-orange-700 hidden sm:inline">
              -R$ {fmt(saved)}
            </span>
          </div>
          <h3 className="font-extrabold text-ink text-sm md:text-base leading-tight line-clamp-2">
            Leve os 2 ebooks — <span className="text-teal-700">o 2º por R$ {fmt(bundle.bonusPrice)}</span>
          </h3>
          <div className="mt-1 flex flex-wrap items-baseline gap-x-2 gap-y-0.5">
            <span className="text-[10px] text-ink-3 line-through tabular-nums">R$ {fmt(soloTotal)}</span>
            <span className="text-base md:text-lg font-extrabold text-teal-700 tabular-nums">
              R$ {fmt(bundle.totalPrice)}
            </span>
            <span className="ml-auto text-xs md:text-sm font-bold text-orange-600 flex items-center gap-0.5 group-hover:gap-1 transition-all">
              Ver
              <svg viewBox="0 0 20 20" width={12} height={12} fill="none" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round" aria-hidden><path d="M5 10h10M10 5l5 5-5 5" /></svg>
            </span>
          </div>
        </div>
      </div>
    </a>
  );
}

function MiniCover({
  title,
  color,
  tag,
  highlight,
  compact,
}: {
  title: string;
  color: string;
  tag: string;
  highlight?: boolean;
  compact?: boolean;
}) {
  const size = compact ? 'w-14 md:w-16' : 'w-20 md:w-28';
  const label = compact ? 'text-[8px] md:text-[9px]' : 'text-[10px] md:text-xs';
  return (
    <div className="relative">
      {highlight && (
        <div
          className="absolute -inset-2 rounded-xl opacity-60 blur-xl"
          style={{ background: 'radial-gradient(circle, #fbbf24, transparent)' }}
          aria-hidden
        />
      )}
      <div
        className={`relative ${size} aspect-[3/4] rounded-lg shadow-2xl flex flex-col items-center justify-center text-white p-1.5 md:p-3 border-2 border-white/40`}
        style={{
          background: `linear-gradient(145deg, ${color} 0%, #0f172a 100%)`,
          boxShadow:
            '0 15px 30px -10px rgba(0,0,0,0.35), 0 0 0 1px rgba(255,255,255,0.1) inset',
        }}
      >
        <div className="text-[7px] md:text-[9px] font-bold uppercase tracking-[0.2em] text-yellow-300 mb-0.5 md:mb-1">
          EBOOK
        </div>
        <div className={`${label} font-black text-center leading-tight`}>
          {title}
        </div>
      </div>
      {tag && !compact && (
        <div className="mt-2 text-center">
          <span
            className={`inline-block text-[9px] md:text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full ${
              highlight
                ? 'bg-orange-100 text-orange-700 border border-orange-200'
                : 'bg-teal-50 text-teal-700 border border-teal-100'
            }`}
          >
            {tag}
          </span>
        </div>
      )}
    </div>
  );
}
