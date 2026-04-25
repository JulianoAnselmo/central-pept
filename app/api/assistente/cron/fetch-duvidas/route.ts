import { db } from '@/lib/db';
import { questionsFeed, templates } from '@/drizzle/schema';
import { fetchRedditQuestions } from '@/lib/promocao/reddit';
import { eq } from 'drizzle-orm';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const posts = await fetchRedditQuestions();
    let inserted = 0;
    let skipped = 0;

    // Carrega templates pra sugerir o mais adequado por keywords
    const allTemplates = await db.select().from(templates);

    for (const post of posts) {
      // Evita duplicatas (sourceId é UNIQUE no schema)
      const existing = await db
        .select({ id: questionsFeed.id })
        .from(questionsFeed)
        .where(eq(questionsFeed.sourceId, post.sourceId))
        .limit(1);
      if (existing.length > 0) { skipped++; continue; }

      // Sugere template pelo maior overlap de keywords
      let suggestedId: number | null = null;
      let bestScore = 0;
      for (const tpl of allTemplates) {
        const variants = tpl.bodyVariants as string[];
        const score = post.matchedKeywords.filter((kw) =>
          variants.some((v) => v.toLowerCase().includes(kw))
        ).length;
        if (score > bestScore) { bestScore = score; suggestedId = tpl.id; }
      }

      await db.insert(questionsFeed).values({
        source: 'reddit',
        sourceId: post.sourceId,
        url: post.url,
        title: post.title,
        snippet: post.snippet,
        matchedKeywords: post.matchedKeywords,
        suggestedTemplateId: suggestedId,
      });
      inserted++;
    }

    return NextResponse.json({ inserted, skipped });
  } catch (e) {
    return NextResponse.json({ error: String(e) }, { status: 500 });
  }
}
