import type { Metadata } from 'next';
import Link from 'next/link';
import ScheduleCalculator from '@/components/calculator/ScheduleCalculator';
import { getPeptides } from '@/lib/peptides';
import MedicalDisclaimer from '@/components/ui/MedicalDisclaimer';
import AffiliateBox from '@/components/affiliate/AffiliateBox';

export const metadata: Metadata = {
  title: 'Cronograma de Doses',
  description: 'Monte um cronograma de aplicações e baixe como arquivo .ics para importar no Google Calendar, Apple Calendar ou Outlook.',
  alternates: { canonical: '/ferramentas/cronograma' },
};

export default function CronogramaPage() {
  const peptides = getPeptides();

  return (
    <div className="max-w-6xl mx-auto px-4 md:px-6 py-6 md:py-10">
      <nav className="text-sm text-ink-3 mb-4 flex items-center gap-1.5">
        <Link href="/ferramentas" className="hover:text-teal-700">Ferramentas</Link>
        <span>/</span>
        <span className="text-ink-2">Cronograma</span>
      </nav>

      <header className="mb-8">
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-extrabold tracking-tight">
          Cronograma de Doses
        </h1>
        <p className="mt-2 text-ink-2 max-w-2xl text-base md:text-lg">
          Monte um cronograma de aplicações e baixe como arquivo <code>.ics</code>
          {' '}para importar no seu calendário favorito. Alertas automáticos 15 minutos
          antes de cada dose.
        </p>
      </header>

      <ScheduleCalculator peptides={peptides} />

      <div className="mt-8">
        <AffiliateBox
          productId="natflix_fitness_hotmart"
          slot="cronograma-bottom"
          title="Pare de adiar — treine em casa com Natflix"
          blurb="Cronograma de doses + treino guiado todo dia. Plataforma da Natasha Villaschi: você abre o app, segue o vídeo, treina sem academia. Acelera resultado de qualquer protocolo de emagrecimento."
          cta="Quero conhecer"
        />
      </div>

      <MedicalDisclaimer variant="prominent" />
    </div>
  );
}
