import type { Metadata } from 'next';
import Link from 'next/link';
import TitrationCalculator from '@/components/calculator/TitrationCalculator';
import MedicalDisclaimer from '@/components/ui/MedicalDisclaimer';
import EbookCTA from '@/components/ebook/EbookCTA';
import { getEbooks } from '@/lib/ebooks';

export const metadata: Metadata = {
  title: 'Plano de Subida de Dose — Ozempic, Wegovy e Mounjaro',
  description: 'Calendário de subida de dose para semaglutida (Ozempic/Wegovy) e tirzepatida (Mounjaro/Zepbound). Semana a semana, com datas automáticas e export para o Google Calendar.',
  openGraph: {
    title: 'Plano de Subida de Dose GLP-1 — Ozempic e Mounjaro',
    description: 'Subida de dose semana a semana, com datas automáticas.',
  },
  alternates: { canonical: '/ferramentas/titulacao' },
};

export default function TitulacaoPage() {
  const ebooks = getEbooks();
  const featuredEbook = ebooks[0];
  return (
    <div className="max-w-6xl mx-auto px-4 md:px-6 py-6 md:py-10">
      <nav className="text-sm text-ink-3 mb-4 flex items-center gap-1.5">
        <Link href="/ferramentas" className="hover:text-teal-700">Ferramentas</Link>
        <span>/</span>
        <span className="text-ink-2">Subida de Dose GLP-1</span>
      </nav>

      <header className="mb-8">
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-extrabold tracking-tight">
          Subida de Dose — <span className="text-teal-700">Ozempic, Wegovy e Mounjaro</span>
        </h1>
        <p className="mt-2 text-ink-2 max-w-2xl text-base md:text-lg">
          Monte o calendário completo de escalonamento semana a semana para semaglutida
          (Ozempic/Wegovy) e tirzepatida (Mounjaro/Zepbound). Com datas automáticas e
          export para o Google Calendar.
        </p>
      </header>

      <TitrationCalculator />

      {featuredEbook && (
        <div className="mt-10">
          <EbookCTA ebook={featuredEbook} variant="inline" source="titulacao-bottom" />
        </div>
      )}

      <MedicalDisclaimer variant="prominent" />
    </div>
  );
}
