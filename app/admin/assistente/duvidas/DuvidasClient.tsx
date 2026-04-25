'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';

interface Question {
  id: number;
  source: string;
  url: string;
  title: string;
  snippet: string | null;
  matchedKeywords: string[] | null;
  suggestedTemplateId: number | null;
  suggestedTemplateTitle: string | null;
  seenAt: Date;
}

export default function DuvidasClient({ initial }: { initial: Question[] }) {
  const router = useRouter();
  const [busy, setBusy] = useState<number | null>(null);

  async function act(id: number, action: 'dismiss' | 'answer') {
    setBusy(id);
    await fetch('/api/assistente/duvidas', {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id, action }),
    });
    setBusy(null);
    router.refresh();
  }

  if (initial.length === 0) {
    return (
      <div className="bg-white border border-gray-200 rounded p-6 text-center text-sm text-gray-500">
        Nenhuma dúvida nova. Clique em "Atualizar agora" pra buscar do Reddit.
      </div>
    );
  }

  return (
    <ul className="space-y-3">
      {initial.map((q) => (
        <li key={q.id} className="bg-white border border-gray-200 rounded p-4">
          <div className="flex items-start justify-between gap-4">
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-1">
                <span className="text-xs uppercase text-gray-500">{q.source}</span>
                <span className="text-xs text-gray-400">
                  {new Date(q.seenAt).toLocaleDateString('pt-BR')}
                </span>
              </div>
              <a
                href={q.url}
                target="_blank"
                rel="noreferrer"
                className="font-medium text-sm text-gray-900 hover:text-teal-700 block"
              >
                {q.title} ↗
              </a>
              {q.snippet && (
                <p className="text-xs text-gray-600 mt-1 line-clamp-2">{q.snippet}</p>
              )}
              <div className="flex flex-wrap gap-1 mt-2">
                {(q.matchedKeywords ?? []).map((kw) => (
                  <span key={kw} className="text-xs bg-gray-100 text-gray-700 px-1.5 py-0.5 rounded">
                    {kw}
                  </span>
                ))}
              </div>
              {q.suggestedTemplateTitle && (
                <p className="text-xs text-teal-700 mt-2">
                  💡 Sugestão: <strong>{q.suggestedTemplateTitle}</strong>
                </p>
              )}
            </div>
            <div className="flex flex-col gap-1">
              <button
                disabled={busy === q.id}
                onClick={() => act(q.id, 'answer')}
                className="text-xs bg-teal-600 text-white px-3 py-1 rounded hover:bg-teal-700"
              >
                Respondi
              </button>
              <button
                disabled={busy === q.id}
                onClick={() => act(q.id, 'dismiss')}
                className="text-xs text-gray-600 hover:text-gray-900"
              >
                Descartar
              </button>
            </div>
          </div>
        </li>
      ))}
    </ul>
  );
}
