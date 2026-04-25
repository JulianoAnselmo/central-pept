import { db } from '@/lib/db';
import { channels, postsLog, templates } from '@/drizzle/schema';
import { desc, eq } from 'drizzle-orm';
import ChannelsClient from './ChannelsClient';

export const dynamic = 'force-dynamic';

async function getData() {
  const channelList = await db.select().from(channels).orderBy(channels.name);
  const lastPostsByChannel = new Map<number, { postedAt: Date; templateTitle: string | null }>();

  for (const ch of channelList) {
    const [last] = await db
      .select({
        postedAt: postsLog.postedAt,
        templateTitle: templates.title,
      })
      .from(postsLog)
      .leftJoin(templates, eq(postsLog.templateId, templates.id))
      .where(eq(postsLog.channelId, ch.id))
      .orderBy(desc(postsLog.postedAt))
      .limit(1);
    if (last) lastPostsByChannel.set(ch.id, last);
  }

  const enriched = channelList.map((ch) => {
    const last = lastPostsByChannel.get(ch.id);
    const daysSince = last
      ? Math.floor((Date.now() - new Date(last.postedAt).getTime()) / (1000 * 60 * 60 * 24))
      : null;
    const releaseInDays = last ? Math.max(0, 7 - (daysSince ?? 0)) : 0;
    return {
      ...ch,
      lastPostAt: last?.postedAt ?? null,
      lastTemplateTitle: last?.templateTitle ?? null,
      daysSince,
      releaseInDays,
      locked: releaseInDays > 0,
    };
  });

  const tpls = await db.select().from(templates);
  return { channels: enriched, templates: tpls };
}

export default async function AssistenteDashboard() {
  const { channels: data, templates: tpls } = await getData();

  return (
    <div>
      <header className="mb-6">
        <h1 className="text-2xl font-bold">Grupos & Cooldowns</h1>
        <p className="text-sm text-gray-600 mt-1">
          Regra 1 post/grupo/semana (DIVULGACAO.md linha 44). Badge vermelha = já postou nos últimos 7 dias.
        </p>
      </header>

      <ChannelsClient initialChannels={data} templates={tpls} />
    </div>
  );
}
