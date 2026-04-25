import type { Metadata } from 'next';
import Link from 'next/link';
import MixCalculator from '@/components/calculator/MixCalculator';
import { getPeptides } from '@/lib/peptides';
import MedicalDisclaimer from '@/components/ui/MedicalDisclaimer';
import AffiliateBox from '@/components/affiliate/AffiliateBox';

export const metadata: Metadata = {
  title: 'Calculadora de Mistura',
  description:
    'Combine 2 a 4 peptídeos em um frasco e descubra a dose exata de cada um entregue em uma única aplicação.',
  openGraph: {
    title: 'Calculadora de Mistura de Peptídeos',
    description: 'Dose correta de cada peptídeo numa seringa combinada.',
  },
  alternates: { canonical: '/ferramentas/mistura' },
};

export default function MisturaPage() {
  const peptides = getPeptides();

  return (
    <div className="max-w-6xl mx-auto px-4 md:px-6 py-6 md:py-10">
      <nav className="text-sm text-ink-3 mb-4 flex items-center gap-1.5">
        <Link href="/ferramentas" className="hover:text-teal-700">Ferramentas</Link>
        <span>/</span>
        <span className="text-ink-2">Mistura</span>
      </nav>

      <header className="mb-8">
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-extrabold tracking-tight">
          Calculadora de Mistura
        </h1>
        <p className="mt-2 text-ink-2 max-w-2xl text-base md:text-lg">
          Combinando 2 a 4 peptídeos no mesmo frasco? Descubra a dose exata que cada
          um entrega quando você puxa uma quantidade de unidades na seringa.
        </p>
      </header>

      <MixCalculator peptides={peptides} />

      <div className="mt-8">
        <AffiliateBox
          productId="natflix_fitness_hotmart"
          slot="mistura-bottom"
        />
      </div>

      <MedicalDisclaimer variant="prominent" />
    </div>
  );
}
