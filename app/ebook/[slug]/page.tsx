import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getEbookBySlug, getEbookSlugs } from '@/lib/ebooks';
import { EbookBuyButton } from '@/components/ebook/EbookCTA';
import FAQ from '@/components/ui/FAQ';
import MedicalDisclaimer from '@/components/ui/MedicalDisclaimer';

type Params = { slug: string };

export async function generateStaticParams(): Promise<Params[]> {
  return getEbookSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: { params: Promise<Params> }): Promise<Metadata> {
  const { slug } = await params;
  const ebook = getEbookBySlug(slug);
  if (!ebook) return { title: 'Ebook não encontrado' };
  return {
    title: ebook.title,
    description: ebook.hook,
    openGraph: {
      title: ebook.title,
      description: ebook.hook,
      type: 'website',
    },
  };
}

export default async function EbookLanding({
  params,
}: { params: Promise<Params> }) {
  const { slug } = await params;
  const ebook = getEbookBySlug(slug);
  if (!ebook) notFound();

  const fmt = (n: number) =>
    n.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  const discountPct = ebook.priceFrom
    ? Math.round((1 - ebook.price / ebook.priceFrom) * 100)
    : 0;

  // Schema Product — faz o Google mostrar preço/rating nos resultados
  const productJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: ebook.title,
    description: ebook.hook,
    category: 'Ebook',
    offers: {
      '@type': 'Offer',
      price: ebook.price,
      priceCurrency: 'BRL',
      availability: 'https://schema.org/InStock',
      url: ebook.checkoutUrl,
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productJsonLd) }}
      />

      {/* ═══ HERO ═══ */}
      <section
        className="relative overflow-hidden"
        style={{
          background:
            'linear-gradient(135deg, #f97316 0%, #0d9488 45%, #1e40af 100%)',
        }}
      >
        {/* Blobs decorativos */}
        <div
          className="absolute top-0 left-1/4 w-[500px] h-[500px] rounded-full opacity-30 blur-3xl"
          style={{ background: 'radial-gradient(circle, #fbbf24, transparent)' }}
          aria-hidden
        />
        <div
          className="absolute bottom-0 right-0 w-[600px] h-[600px] rounded-full opacity-30 blur-3xl"
          style={{ background: 'radial-gradient(circle, #22d3ee, transparent)' }}
          aria-hidden
        />
        {/* Grid pattern sutil */}
        <div
          className="absolute inset-0 opacity-[0.07]"
          style={{
            backgroundImage:
              'linear-gradient(rgba(255,255,255,.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.5) 1px, transparent 1px)',
            backgroundSize: '40px 40px',
          }}
          aria-hidden
        />

        <div className="relative max-w-6xl mx-auto px-4 md:px-6 pt-12 pb-16 md:pt-20 md:pb-24">
          <div className="grid lg:grid-cols-[1fr_380px] gap-10 items-center">
            <div className="text-white">
              <span
                className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-white text-xs font-bold uppercase tracking-wider shadow-lg"
                style={{ background: 'rgba(255,255,255,.15)', backdropFilter: 'blur(8px)' }}
              >
                <span className="w-2 h-2 rounded-full bg-yellow-300 animate-pulse" />
                📘 Ebook exclusivo · Edição 2026
              </span>
              <h1
                className="mt-5 text-4xl md:text-6xl lg:text-7xl font-black tracking-tight leading-[1.02]"
                style={{ textShadow: '0 2px 40px rgba(0,0,0,0.3)' }}
              >
                {ebook.title}
              </h1>
              <p className="mt-5 text-xl md:text-2xl leading-relaxed max-w-2xl text-white font-light">
                {ebook.subtitle}
              </p>
              <p className="mt-5 text-base md:text-lg leading-relaxed max-w-xl text-white/90">
                {ebook.hook}
              </p>

              <div className="mt-8 flex flex-wrap items-center gap-4">
                <a
                  href={ebook.checkoutUrl + (ebook.checkoutUrl.includes('?') ? '&' : '?') + 'utm_source=site&utm_medium=landing-hero'}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="inline-flex items-center justify-center gap-2 px-8 h-14 rounded-xl font-extrabold text-base text-ink bg-white hover:bg-yellow-50 transition-all shadow-2xl hover:shadow-[0_20px_60px_rgba(0,0,0,0.4)] hover:-translate-y-0.5"
                >
                  Comprar por R$ {ebook.price}
                  <svg viewBox="0 0 20 20" width={18} height={18} fill="none" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round" aria-hidden><path d="M4 10h12M10 4l6 6-6 6" /></svg>
                </a>
                <div className="text-white text-sm">
                  {ebook.priceFrom && (
                    <div className="flex items-baseline gap-2">
                      <span className="line-through text-white/60">R$ {ebook.priceFrom}</span>
                      <span className="font-bold text-yellow-300 text-lg">R$ {ebook.price}</span>
                    </div>
                  )}
                  <div className="text-xs text-white/80">ou 12× de R$ {(ebook.price / 12).toFixed(2).replace('.', ',')} sem juros</div>
                </div>
              </div>

              <div className="mt-6 flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-white/95">
                <span className="flex items-center gap-1.5 font-semibold">✓ Entrega imediata</span>
                <span className="flex items-center gap-1.5 font-semibold">✓ 7 dias de garantia</span>
                <span className="flex items-center gap-1.5 font-semibold">✓ Pix · Cartão · Boleto</span>
              </div>
            </div>

            {/* Mockup do ebook */}
            <div className="flex justify-center lg:justify-end">
              <div className="relative">
                {/* Glow dourado por trás */}
                <div
                  className="absolute -inset-8 rounded-full opacity-60 blur-3xl"
                  style={{ background: 'radial-gradient(circle, #fbbf24 0%, transparent 70%)' }}
                  aria-hidden
                />
                {/* Badge flutuante */}
                <div className="absolute -top-4 -right-4 z-20 w-20 h-20 rounded-full bg-yellow-400 text-ink font-black text-xs flex flex-col items-center justify-center shadow-xl rotate-12 border-4 border-white">
                  <span className="text-[9px] uppercase tracking-widest">Novo</span>
                  <span className="text-xl leading-none">52%</span>
                  <span className="text-[9px] uppercase tracking-widest">OFF</span>
                </div>
                {/* Capa */}
                <div
                  className="relative w-64 md:w-80 aspect-[3/4] rounded-xl shadow-2xl flex flex-col items-center justify-between text-white p-6 md:p-8 border-2 border-white/30 rotate-[-2deg] hover:rotate-0 transition-transform duration-500"
                  style={{
                    background:
                      'linear-gradient(145deg, #0f172a 0%, #1e293b 45%, #0f172a 100%)',
                    boxShadow:
                      '0 25px 50px -12px rgba(0,0,0,0.5), 0 0 0 1px rgba(255,255,255,0.1) inset',
                  }}
                >
                  <div className="w-full flex flex-col items-center">
                    <div className="text-[10px] font-bold uppercase tracking-[0.3em] text-yellow-300 mb-1">EBOOK</div>
                    <div
                      className="h-1 w-20 rounded-full"
                      style={{ background: 'linear-gradient(90deg, #fbbf24, #f97316)' }}
                    />
                  </div>
                  <div className="text-center">
                    <h2
                      className="text-3xl md:text-4xl font-black tracking-tight leading-[1.05]"
                      style={{
                        background: 'linear-gradient(135deg, #fbbf24 0%, #ffffff 60%, #5eead4 100%)',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                      }}
                    >
                      Retatrutida
                    </h2>
                    <div className="h-0.5 w-12 bg-white/40 mx-auto my-4" />
                    <p className="text-xs md:text-sm text-white/85 leading-relaxed font-medium">
                      Estratégias para<br />Maximizar Resultados
                    </p>
                  </div>
                  <div className="w-full flex flex-col items-center gap-1">
                    <div className="text-[10px] uppercase tracking-widest text-white/60">Central Peptídeos</div>
                    <div className="text-[10px] font-bold uppercase tracking-widest text-yellow-300">2026</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══ VALOR: O que tem dentro ═══ */}
      <section className="max-w-4xl mx-auto px-4 md:px-6 py-14 md:py-20">
        <div className="text-center mb-10">
          <span className="text-xs font-bold uppercase tracking-widest text-teal-700">O que você vai aprender</span>
          <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight mt-2">
            {ebook.pages} páginas de conteúdo técnico, direto ao ponto
          </h2>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          {ebook.learn.map((item, i) => (
            <div key={i} className="flex items-start gap-3 p-4 rounded-xl bg-bg border border-border">
              <span className="flex-shrink-0 w-6 h-6 rounded-full bg-teal text-white flex items-center justify-center text-xs font-bold">
                ✓
              </span>
              <p className="text-sm text-ink-2 leading-relaxed">{item}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ═══ PARA QUEM É ═══ */}
      <section className="bg-surface border-y border-border">
        <div className="max-w-4xl mx-auto px-4 md:px-6 py-14 md:py-20">
          <div className="text-center mb-10">
            <span className="text-xs font-bold uppercase tracking-widest text-teal-700">Para quem é</span>
            <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight mt-2">
              Este ebook é pra você se...
            </h2>
          </div>
          <div className="grid gap-3">
            {ebook.audience.map((a, i) => (
              <div key={i} className="flex items-start gap-3 p-4 rounded-xl border border-border">
                <span className="flex-shrink-0 w-8 h-8 rounded-full bg-teal-50 text-teal-700 flex items-center justify-center text-base font-bold">
                  {i + 1}
                </span>
                <p className="text-base text-ink leading-relaxed">{a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ OFERTA / CTA ═══ */}
      <section className="max-w-4xl mx-auto px-4 md:px-6 py-14 md:py-20 text-center">
        <div className="inline-block">
          <div className="text-sm font-bold uppercase tracking-wider text-ink-3 mb-2">Oferta de lançamento</div>
          <div className="flex items-baseline justify-center gap-3">
            {ebook.priceFrom && (
              <span className="text-xl md:text-2xl text-ink-3 line-through tabular-nums">
                R$ {ebook.priceFrom}
              </span>
            )}
            <span className="text-5xl md:text-6xl font-extrabold text-teal-700 tabular-nums">
              R$ {ebook.price}
            </span>
          </div>
          {ebook.priceFrom && (
            <div className="mt-2 text-sm font-bold text-orange-600">
              {Math.round((1 - ebook.price / ebook.priceFrom) * 100)}% OFF · ou 12× de R$ {(ebook.price / 12).toFixed(2).replace('.', ',')}
            </div>
          )}
        </div>

        <div className="mt-8">
          <EbookBuyButton ebook={ebook} source="landing-mid">
            Quero o ebook agora
          </EbookBuyButton>
        </div>

        <div className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-4 max-w-2xl mx-auto">
          <TrustItem icon="⚡" title="Imediato" desc="No seu email em 2 min" />
          <TrustItem icon="🛡️" title="Garantia" desc="7 dias de reembolso" />
          <TrustItem icon="📱" title="Qualquer tela" desc="PDF celular/PC" />
          <TrustItem icon="🔒" title="Seguro" desc="Checkout Kiwify" />
        </div>
      </section>

      {/* ═══ FAQ ═══ */}
      <section className="bg-surface border-y border-border">
        <div className="max-w-3xl mx-auto px-4 md:px-6 py-14 md:py-20">
          <FAQ items={ebook.faq} title="Perguntas frequentes" />
        </div>
      </section>

      {/* ═══ CTA FINAL ═══ */}
      <section className="max-w-4xl mx-auto px-4 md:px-6 py-14 md:py-20 text-center">
        <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight">Pronto pra começar?</h2>
        <p className="mt-3 text-lg text-ink-2 max-w-xl mx-auto">
          {ebook.pages} páginas · {ebook.readMinutes} min de leitura · Tudo baseado em estudos fase 3.
        </p>
        <div className="mt-8">
          <EbookBuyButton ebook={ebook} source="landing-footer">
            Comprar por R$ {ebook.price}
          </EbookBuyButton>
        </div>
        <p className="mt-4 text-xs text-ink-3">
          Dúvidas antes de comprar? <Link href="/contato" className="text-teal-700 hover:underline">Fale com a gente</Link>
        </p>
      </section>

      <div className="max-w-3xl mx-auto px-4 md:px-6 pb-10">
        <MedicalDisclaimer variant="prominent" />
      </div>
    </>
  );
}

function TrustItem({ icon, title, desc }: { icon: string; title: string; desc: string }) {
  return (
    <div className="text-center">
      <div className="text-3xl mb-1">{icon}</div>
      <div className="font-bold text-sm text-ink">{title}</div>
      <div className="text-xs text-ink-3">{desc}</div>
    </div>
  );
}
