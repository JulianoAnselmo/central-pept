'use client';

import { useMemo, useState } from 'react';
import { buildUtmUrl, SOURCES, defaultMediumForSource } from '@/lib/promocao/utm';

interface Template {
  id: number;
  slug: string;
  title: string;
  channelKind: string | null;
  bodyVariants: string[];
  utmDefaults: Record<string, string>;
}

export default function TemplatesClient({
  templates,
  usageMap,
}: {
  templates: Template[];
  usageMap: Record<string, number>;
}) {
  const [selected, setSelected] = useState<Template | null>(templates[0] ?? null);
  const [source, setSource] = useState('whatsapp');
  const [content, setContent] = useState('');
  const [copied, setCopied] = useState(false);

  // Escolhe variação menos usada
  const leastUsedIndex = useMemo(() => {
    if (!selected) return 0;
    let min = Infinity;
    let idx = 0;
    for (let i = 0; i < selected.bodyVariants.length; i++) {
      const count = usageMap[`${selected.id}:${i}`] ?? 0;
      if (count < min) { min = count; idx = i; }
    }
    return idx;
  }, [selected, usageMap]);

  const [variantIdx, setVariantIdx] = useState(0);
  const effectiveIdx = variantIdx || leastUsedIndex;

  const utmUrl = useMemo(() => {
    if (!selected) return '';
    return buildUtmUrl({
      path: selected.utmDefaults.path ?? '/',
      source,
      medium: defaultMediumForSource(source),
      campaign: selected.utmDefaults.campaign ?? 'divulgacao',
      content: content || undefined,
    });
  }, [selected, source, content]);

  const rendered = useMemo(() => {
    if (!selected) return '';
    const variant = selected.bodyVariants[effectiveIdx] ?? '';
    return variant.replace(/{utm_url}/g, utmUrl);
  }, [selected, effectiveIdx, utmUrl]);

  async function copy() {
    await navigator.clipboard.writeText(rendered);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  }

  if (templates.length === 0) {
    return <p className="text-gray-500 text-sm">Sem templates. Rode o seed acima.</p>;
  }

  return (
    <div className="grid grid-cols-12 gap-6">
      <aside className="col-span-4 space-y-2">
        <h3 className="text-xs uppercase tracking-wider text-gray-500 font-medium">Templates</h3>
        {templates.map((t) => (
          <button
            key={t.id}
            onClick={() => { setSelected(t); setVariantIdx(0); }}
            className={`w-full text-left p-3 rounded border text-sm ${
              selected?.id === t.id ? 'border-teal-500 bg-teal-50' : 'border-gray-200 bg-white hover:border-gray-300'
            }`}
          >
            <div className="font-medium">{t.title}</div>
            <div className="text-xs text-gray-500">{t.bodyVariants.length} variações</div>
          </button>
        ))}
      </aside>

      <div className="col-span-8 space-y-4">
        {!selected ? null : (
          <>
            <div className="bg-white border border-gray-200 rounded p-4 space-y-3">
              <div className="grid grid-cols-2 gap-3">
                <label className="block">
                  <span className="text-xs text-gray-600">Canal (utm_source)</span>
                  <select
                    value={source}
                    onChange={(e) => setSource(e.target.value)}
                    className="mt-1 w-full border border-gray-300 rounded px-2 py-1 text-sm"
                  >
                    {SOURCES.map((s) => <option key={s.value} value={s.value}>{s.label}</option>)}
                  </select>
                </label>
                <label className="block">
                  <span className="text-xs text-gray-600">Variação</span>
                  <select
                    value={variantIdx}
                    onChange={(e) => setVariantIdx(Number(e.target.value))}
                    className="mt-1 w-full border border-gray-300 rounded px-2 py-1 text-sm"
                  >
                    {selected.bodyVariants.map((_, i) => {
                      const used = usageMap[`${selected.id}:${i}`] ?? 0;
                      const isLeast = i === leastUsedIndex;
                      return (
                        <option key={i} value={i}>
                          #{i + 1} — usada {used}x{isLeast ? ' (sugerida)' : ''}
                        </option>
                      );
                    })}
                  </select>
                </label>
              </div>
              <label className="block">
                <span className="text-xs text-gray-600">utm_content — identificador do grupo/post (opcional)</span>
                <input
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  placeholder="ex: grupo-ozempic-bh"
                  className="mt-1 w-full border border-gray-300 rounded px-2 py-1 text-sm font-mono"
                />
              </label>
            </div>

            <div className="bg-gray-900 text-gray-100 rounded p-4">
              <pre className="whitespace-pre-wrap text-sm font-mono">{rendered}</pre>
            </div>

            <div className="flex gap-2">
              <button
                onClick={copy}
                className="bg-teal-600 text-white px-4 py-2 rounded text-sm font-medium"
              >
                {copied ? 'Copiado!' : 'Copiar texto'}
              </button>
              <a
                href={utmUrl}
                target="_blank"
                rel="noreferrer"
                className="text-sm text-gray-600 px-4 py-2"
              >
                Abrir URL ↗
              </a>
            </div>

            <p className="text-xs text-gray-500">
              Depois que colar, volte em <strong>Grupos</strong> e clique "Registrar post" no canal onde postou,
              escolhendo este template. Assim o cooldown de 7 dias começa a contar.
            </p>
          </>
        )}
      </div>
    </div>
  );
}
