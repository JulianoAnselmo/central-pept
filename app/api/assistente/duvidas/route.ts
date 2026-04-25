import { db } from '@/lib/db';
import { questionsFeed } from '@/drizzle/schema';
import { eq } from 'drizzle-orm';
import { NextRequest, NextResponse } from 'next/server';

export async function GET() {
  try {
    const rows = await db
      .select()
      .from(questionsFeed)
      .where(eq(questionsFeed.dismissed, false))
      .orderBy(questionsFeed.seenAt);
    return NextResponse.json(rows);
  } catch (e) {
    return NextResponse.json({ error: String(e) }, { status: 500 });
  }
}

export async function PATCH(req: NextRequest) {
  try {
    const { id, action } = (await req.json()) as { id: number; action: 'dismiss' | 'answer' };
    if (action === 'dismiss') {
      await db.update(questionsFeed).set({ dismissed: true }).where(eq(questionsFeed.id, id));
    } else if (action === 'answer') {
      await db.update(questionsFeed).set({ answered: true, dismissed: true }).where(eq(questionsFeed.id, id));
    }
    return NextResponse.json({ ok: true });
  } catch (e) {
    return NextResponse.json({ error: String(e) }, { status: 500 });
  }
}
