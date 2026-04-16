type Props = {
  variant?: 'inline' | 'prominent';
};

export default function MedicalDisclaimer({ variant = 'inline' }: Props) {
  if (variant === 'prominent') {
    return (
      <aside
        role="note"
        aria-label="Aviso médico"
        className="mt-8 rounded-xl border-2 border-amber-200 bg-amber-50 p-4 text-sm text-amber-900 leading-relaxed"
      >
        <div className="flex items-start gap-3">
          <svg viewBox="0 0 24 24" width={22} height={22} fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" aria-hidden className="mt-0.5 flex-shrink-0">
            <path d="M12 9v4M12 17h.01M10.3 3.9 2.5 17.5A2 2 0 0 0 4.2 20.5h15.6a2 2 0 0 0 1.7-3L13.7 3.9a2 2 0 0 0-3.4 0z" />
          </svg>
          <div>
            <strong className="block font-semibold">Conteúdo informativo — não é prescrição médica.</strong>
            <p className="mt-1">
              As informações aqui têm caráter educativo. Dosagem, indicações
              e contraindicações variam por pessoa. Nunca inicie, altere ou
              suspenda um protocolo sem acompanhamento de profissional de
              saúde habilitado.
            </p>
          </div>
        </div>
      </aside>
    );
  }

  return (
    <p className="text-xs text-ink-3 leading-relaxed">
      ⚠️ Conteúdo informativo. Não substitui orientação médica — consulte um
      profissional de saúde antes de iniciar qualquer protocolo.
    </p>
  );
}
