import { db } from '@/lib/db';
import { questionsFeed, templates } from '@/drizzle/schema';
import { eq, desc } from 'drizzle-orm';
import DuvidasClient from './DuvidasClient';

export const dynamic = 'force-dynamic';

async function getData() {
  const rows = await db
    .select({
      id: questionsFeed.id,
      source: questionsFeed.source,
      url: questionsFeed.url,
      title: questionsFeed.title,
      snippet: questionsFeed.snippet,
      matchedKeywords: questionsFeed.matchedKeywords,
      suggestedTemplateId: questionsFeed.suggestedTemplateId,
      suggestedTemplateTitle: templates.title,
      seenAt: questionsFeed.seenAt,
    })
    .from(questionsFeed)
    .leftJoin(templates, eq(questionsFeed.suggestedTemplateId, templates.id))
    .where(eq(questionsFeed.dismissed, false))
    .orderBy(desc(questionsFeed.seenAt))
    .limit(100);
  return rows;
}

export default async function DuvidasPage() {
  const questions = await getData();

  return (
    <div>
      <header className="mb-6 flex justify-between items-start">
        <div>
          <h1 className="text-2xl font-bold">Dúvidas agregadas</h1>
          <p className="text-sm text-gray-600 mt-1">
            Posts recentes do Reddit com keywords relevantes. <strong>Não responde sozinho</strong> —
            você decide onde vale intervir.
          </p>
        </div>
        <form action="/api/assistente/cron/fetch-duvidas" method="GET">
          <button className="bg-teal-600 text-white text-sm px-3 py-1.5 rounded hover:bg-teal-700">
            Atualizar agora
          </button>
        </form>
      </header>

      <DuvidasClient initial={questions} />
    </div>
  );
}
