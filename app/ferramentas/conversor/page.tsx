import type { Metadata } from 'next';
import Link from 'next/link';
import UnitConverter from '@/components/calculator/UnitConverter';
import { getPeptides } from '@/lib/peptides';
import MedicalDisclaimer from '@/components/ui/MedicalDisclaimer';
import AffiliateBox from '@/components/affiliate/AffiliateBox';

export const metadata: Metadata = {
  title: 'Conversor de Unidades',
  description:
    'Conversão rápida entre mg, mcg e UI considerando o peptídeo específico. Mostra a quantidade como múltiplo da dose típica.',
  openGraph: {
    title: 'Conversor mg ↔ mcg ↔ UI',
    description: 'Conversor de unidades para peptídeos.',
  },
  alternates: { canonical: '/ferramentas/conversor' },
};

export default function ConversorPage() {
  const peptides = getPeptides();

  return (
    <div className="max-w-6xl mx-auto px-4 md:px-6 py-6 md:py-10">
      <nav className="text-sm text-ink-3 mb-4 flex items-center gap-1.5">
        <Link href="/ferramentas" className="hover:text-teal-700">Ferramentas</Link>
        <span>/</span>
        <span className="text-ink-2">Conversor</span>
      </nav>

      <header className="mb-8">
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-extrabold tracking-tight">
          Conversor de Unidades
        </h1>
        <p className="mt-2 text-ink-2 max-w-2xl text-base md:text-lg">
          Converta entre mg, mcg e UI. Se escolher um peptídeo, mostramos a quantidade
          como múltiplo da dose típica.
        </p>
      </header>

      <UnitConverter peptides={peptides} />

      <div className="mt-8">
        <AffiliateBox
          productId="natflix_fitness_hotmart"
          slot="conversor-bottom"
        />
      </div>

      <MedicalDisclaimer variant="prominent" />
    </div>
  );
}
