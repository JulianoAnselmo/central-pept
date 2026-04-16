import type { Metadata } from 'next';
import Link from 'next/link';
import TitrationCalculator from '@/components/calculator/TitrationCalculator';
import MedicalDisclaimer from '@/components/ui/MedicalDisclaimer';

export const metadata: Metadata = {
  title: 'Titulação GLP-1 — Semaglutida e Tirzepatida',
  description: 'Calculadora de titulação para semaglutida (Ozempic/Wegovy) e tirzepatida (Mounjaro/Zepbound). Gere o calendário de subida de doses.',
  openGraph: {
    title: 'Calculadora de Titulação GLP-1',
    description: 'Subida de dose semana a semana com datas automáticas.',
  },
};

export default function TitulacaoPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 md:px-6 py-6 md:py-10">
      <nav className="text-sm text-ink-3 mb-4 flex items-center gap-1.5">
        <Link href="/ferramentas" className="hover:text-teal-700">Ferramentas</Link>
        <span>/</span>
        <span className="text-ink-2">Titulação</span>
      </nav>

      <header className="mb-8">
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-extrabold tracking-tight">
          Titulação GLP-1
        </h1>
        <p className="mt-2 text-ink-2 max-w-2xl text-base md:text-lg">
          Monte o plano completo de escalonamento de doses para semaglutida
          (Ozempic/Wegovy) e tirzepatida (Mounjaro/Zepbound). Com datas e
          export para o calendário.
        </p>
      </header>

      <TitrationCalculator />

      <MedicalDisclaimer variant="prominent" />
    </div>
  );
}
