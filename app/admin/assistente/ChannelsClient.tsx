'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

const KINDS = ['whatsapp', 'reddit', 'telegram', 'fb', 'forum', 'tiktok', 'instagram'];

interface Channel {
  id: number;
  kind: string;
  name: string;
  handle: string | null;
  notes: Record<string, unknown> | null;
  lastPostAt: Date | null;
  lastTemplateTitle: string | null;
  daysSince: number | null;
  releaseInDays: number;
  locked: boolean;
}

interface Template {
  id: number;
  title: string;
  slug: string;
}

export default function ChannelsClient({
  initialChannels,
  templates,
}: {
  initialChannels: Channel[];
  templates: Template[];
}) {
  const router = useRouter();
  const [creating, setCreating] = useState(false);
  const [form, setForm] = useState({ kind: 'whatsapp', name: '', handle: '' });
  const [logForm, setLogForm] = useState<{ channelId: number | null; templateId: number | null; note: string }>({
    channelId: null,
    templateId: null,
    note: '',
  });
  const [busy, setBusy] = useState(false);

  async function createChannel(e: React.FormEvent) {
    e.preventDefault();
    setBusy(true);
    await fetch('/api/assistente/channels', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
    });
    setForm({ kind: 'whatsapp', name: '', handle: '' });
    setCreating(false);
    setBusy(false);
    router.refresh();
  }

  async function deleteChannel(id: number) {
    if (!confirm('Remover canal? (posts_log com esse channel serão afetados)')) return;
    await fetch(`/api/assistente/channels?id=${id}`, { method: 'DELETE' });
    router.refresh();
  }

  async function registerPost(e: React.FormEvent) {
    e.preventDefault();
    if (!logForm.channelId) return;
    setBusy(true);
    await fetch('/api/assistente/posts-log', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        channelId: logForm.channelId,
        templateId: logForm.templateId ?? undefined,
        note: logForm.note || undefined,
      }),
    });
    setLogForm({ channelId: null, templateId: null, note: '' });
    setBusy(false);
    router.refresh();
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-sm font-medium text-gray-700">
          {initialChannels.length} canais cadastrados
        </h2>
        <button
          onClick={() => setCreating(!creating)}
          className="text-sm bg-teal-600 text-white px-3 py-1.5 rounded hover:bg-teal-700"
        >
          {creating ? 'Cancelar' : '+ Novo canal'}
        </button>
      </div>

      {creating && (
        <form onSubmit={createChannel} className="bg-white border border-gray-200 rounded p-4 space-y-3">
          <div className="grid grid-cols-3 gap-3">
            <select
              value={form.kind}
              onChange={(e) => setForm({ ...form, kind: e.target.value })}
              className="border border-gray-300 rounded px-2 py-1 text-sm"
            >
              {KINDS.map((k) => <option key={k} value={k}>{k}</option>)}
            </select>
            <input
              placeholder="Nome (ex: Grupo Ozempic BH)"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              required
              className="border border-gray-300 rounded px-2 py-1 text-sm col-span-2"
            />
          </div>
          <input
            placeholder="Handle/link (opcional)"
            value={form.handle}
            onChange={(e) => setForm({ ...form, handle: e.target.value })}
            className="w-full border border-gray-300 rounded px-2 py-1 text-sm"
          />
          <button
            type="submit"
            disabled={busy}
            className="bg-teal-600 text-white px-3 py-1.5 rounded text-sm"
          >
            Salvar
          </button>
        </form>
      )}

      <table className="w-full bg-white border border-gray-200 rounded overflow-hidden text-sm">
        <thead className="bg-gray-50">
          <tr>
            <th className="text-left p-2 font-medium">Status</th>
            <th className="text-left p-2 font-medium">Canal</th>
            <th className="text-left p-2 font-medium">Último post</th>
            <th className="text-left p-2 font-medium">Libera em</th>
            <th className="text-left p-2 font-medium">Ações</th>
          </tr>
        </thead>
        <tbody>
          {initialChannels.length === 0 ? (
            <tr><td colSpan={5} className="p-4 text-center text-gray-500">Nenhum canal ainda. Clique em "Novo canal".</td></tr>
          ) : initialChannels.map((ch) => (
            <tr key={ch.id} className="border-t border-gray-100">
              <td className="p-2">
                {ch.locked ? (
                  <span className="inline-block bg-red-100 text-red-700 text-xs px-2 py-0.5 rounded">bloqueado</span>
                ) : (
                  <span className="inline-block bg-green-100 text-green-700 text-xs px-2 py-0.5 rounded">liberado</span>
                )}
              </td>
              <td className="p-2">
                <div className="font-medium">{ch.name}</div>
                <div className="text-xs text-gray-500">{ch.kind}{ch.handle ? ` · ${ch.handle}` : ''}</div>
              </td>
              <td className="p-2 text-xs">
                {ch.lastPostAt ? (
                  <>
                    <div>{new Date(ch.lastPostAt).toLocaleDateString('pt-BR')}</div>
                    <div className="text-gray-500">{ch.lastTemplateTitle ?? 'sem template'}</div>
                  </>
                ) : <span className="text-gray-400">nunca</span>}
              </td>
              <td className="p-2 text-xs">
                {ch.locked ? `${ch.releaseInDays}d` : <span className="text-green-700">agora</span>}
              </td>
              <td className="p-2">
                <button
                  onClick={() => setLogForm({ channelId: ch.id, templateId: null, note: '' })}
                  className="text-xs text-teal-700 hover:underline mr-3"
                >
                  Registrar post
                </button>
                <button
                  onClick={() => deleteChannel(ch.id)}
                  className="text-xs text-red-600 hover:underline"
                >
                  Remover
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {logForm.channelId !== null && (
        <form onSubmit={registerPost} className="bg-white border border-teal-300 rounded p-4 space-y-3">
          <h3 className="font-medium text-sm">
            Registrar post em {initialChannels.find((c) => c.id === logForm.channelId)?.name}
          </h3>
          <select
            value={logForm.templateId ?? ''}
            onChange={(e) => setLogForm({ ...logForm, templateId: e.target.value ? Number(e.target.value) : null })}
            className="w-full border border-gray-300 rounded px-2 py-1 text-sm"
          >
            <option value="">— Sem template —</option>
            {templates.map((t) => <option key={t.id} value={t.id}>{t.title}</option>)}
          </select>
          <input
            placeholder="Nota (opcional — ex: respondi pergunta sobre reconstituição)"
            value={logForm.note}
            onChange={(e) => setLogForm({ ...logForm, note: e.target.value })}
            className="w-full border border-gray-300 rounded px-2 py-1 text-sm"
          />
          <div className="flex gap-2">
            <button type="submit" disabled={busy} className="bg-teal-600 text-white px-3 py-1.5 rounded text-sm">
              Salvar post
            </button>
            <button
              type="button"
              onClick={() => setLogForm({ channelId: null, templateId: null, note: '' })}
              className="text-sm text-gray-600"
            >
              Cancelar
            </button>
          </div>
        </form>
      )}
    </div>
  );
}
