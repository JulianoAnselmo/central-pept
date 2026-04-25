import { db } from '@/lib/db';
import { conversions, postsLog, channels } from '@/drizzle/schema';
import { desc, gte, sql } from 'drizzle-orm';

export const dynamic = 'force-dynamic';

async function getMetrics() {
  const weekAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);

  // Conversões dos últimos 7 dias
  const recentConversions = await db
    .select()
    .from(conversions)
    .where(gte(conversions.occurredAt, weekAgo))
    .orderBy(desc(conversions.occurredAt));

  // Breakdown por utm_source
  const bySource = await db
    .select({
      source: conversions.utmSource,
      count: sql<number>`count(*)::int`,
      revenue: sql<number>`coalesce(sum(${conversions.amount}), 0)::int`,
    })
    .from(conversions)
    .where(gte(conversions.occurredAt, weekAgo))
    .groupBy(conversions.utmSource);

  // Posts por canal (últimos 7d)
  const postsBySource = await db
    .select({
      channelName: channels.name,
      channelKind: channels.kind,
      count: sql<number>`count(*)::int`,
    })
    .from(postsLog)
    .leftJoin(channels, sql`${postsLog.channelId} = ${channels.id}`)
    .where(gte(postsLog.postedAt, weekAgo))
    .groupBy(channels.name, channels.kind);

  const totalRevenue = bySource.reduce((s, b) => s + (b.revenue ?? 0), 0);
  const totalConversions = bySource.reduce((s, b) => s + b.count, 0);

  return { recentConversions, bySource, postsBySource, totalRevenue, totalConversions };
}

function formatBRL(cents: number | null): string {
  if (!cents) return 'R$ 0,00';
  return (cents / 100).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
}

export default async function MetricasPage() {
  const { recentConversions, bySource, postsBySource, totalRevenue, totalConversions } = await getMetrics();

  return (
    <div>
      <header className="mb-6">
        <h1 className="text-2xl font-bold">Métricas — últimos 7 dias</h1>
        <p className="text-sm text-gray-600 mt-1">
          Ritual de sexta (DIVULGACAO.md linha 269). Conversões vêm do webhook Kiwify em{' '}
          <code className="text-xs bg-gray-100 px-1">/api/assistente/webhook/kiwify</code>.
        </p>
      </header>

      <div className="grid grid-cols-3 gap-4 mb-6">
        <Card label="Conversões" value={String(totalConversions)} />
        <Card label="Receita" value={formatBRL(totalRevenue)} />
        <Card label="Canais ativos" value={String(postsBySource.length)} />
      </div>

      <section className="mb-8">
        <h2 className="text-sm font-medium text-gray-700 mb-2">Conversões por UTM source</h2>
        <table className="w-full bg-white border border-gray-200 rounded text-sm">
          <thead className="bg-gray-50">
            <tr>
              <th className="text-left p-2 font-medium">Source</th>
              <th className="text-right p-2 font-medium">Conversões</th>
              <th className="text-right p-2 font-medium">Receita</th>
            </tr>
          </thead>
          <tbody>
            {bySource.length === 0 ? (
              <tr><td colSpan={3} className="p-4 text-center text-gray-500 text-xs">
                Sem conversões ainda. Configure o webhook Kiwify apontando para{' '}
                <code>/api/assistente/webhook/kiwify</code>.
              </td></tr>
            ) : bySource.map((b) => (
              <tr key={b.source ?? 'none'} className="border-t border-gray-100">
                <td className="p-2 font-mono">{b.source ?? '(sem UTM)'}</td>
                <td className="p-2 text-right">{b.count}</td>
                <td className="p-2 text-right">{formatBRL(b.revenue)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>

      <section className="mb-8">
        <h2 className="text-sm font-medium text-gray-700 mb-2">Posts registrados (esforço)</h2>
        <table className="w-full bg-white border border-gray-200 rounded text-sm">
          <thead className="bg-gray-50">
            <tr>
              <th className="text-left p-2 font-medium">Canal</th>
              <th className="text-left p-2 font-medium">Tipo</th>
              <th className="text-right p-2 font-medium">Posts</th>
            </tr>
          </thead>
          <tbody>
            {postsBySource.length === 0 ? (
              <tr><td colSpan={3} className="p-4 text-center text-gray-500 text-xs">Nenhum post nos últimos 7 dias.</td></tr>
            ) : postsBySource.map((p) => (
              <tr key={`${p.channelName}-${p.channelKind}`} className="border-t border-gray-100">
                <td className="p-2">{p.channelName ?? '—'}</td>
                <td className="p-2 text-xs text-gray-600">{p.channelKind ?? '—'}</td>
                <td className="p-2 text-right">{p.count}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>

      <section>
        <h2 className="text-sm font-medium text-gray-700 mb-2">Conversões recentes (brutas)</h2>
        <table className="w-full bg-white border border-gray-200 rounded text-sm">
          <thead className="bg-gray-50">
            <tr>
              <th className="text-left p-2 font-medium">Quando</th>
              <th className="text-left p-2 font-medium">Produto</th>
              <th className="text-left p-2 font-medium">Source / Medium</th>
              <th className="text-right p-2 font-medium">Valor</th>
            </tr>
          </thead>
          <tbody>
            {recentConversions.length === 0 ? (
              <tr><td colSpan={4} className="p-4 text-center text-gray-500 text-xs">Nenhuma.</td></tr>
            ) : recentConversions.map((c) => (
              <tr key={c.id} className="border-t border-gray-100">
                <td className="p-2 text-xs">{new Date(c.occurredAt).toLocaleString('pt-BR')}</td>
                <td className="p-2 text-xs">{c.productSlug ?? '—'}</td>
                <td className="p-2 text-xs font-mono">{c.utmSource ?? '—'} / {c.utmMedium ?? '—'}</td>
                <td className="p-2 text-right text-xs">{formatBRL(c.amount)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </div>
  );
}

function Card({ label, value }: { label: string; value: string }) {
  return (
    <div className="bg-white border border-gray-200 rounded p-4">
      <div className="text-xs text-gray-500 uppercase tracking-wide">{label}</div>
      <div className="text-2xl font-bold text-gray-900 mt-1">{value}</div>
    </div>
  );
}
