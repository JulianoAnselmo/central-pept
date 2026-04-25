import { db } from '@/lib/db';
import { postsLog, channels, templates } from '@/drizzle/schema';
import { desc, eq } from 'drizzle-orm';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const channelId = searchParams.get('channelId');

    const query = db
      .select({
        id: postsLog.id,
        channelId: postsLog.channelId,
        channelName: channels.name,
        templateId: postsLog.templateId,
        templateTitle: templates.title,
        variantIndex: postsLog.variantIndex,
        postedAt: postsLog.postedAt,
        utmUrl: postsLog.utmUrl,
        note: postsLog.note,
      })
      .from(postsLog)
      .leftJoin(channels, eq(postsLog.channelId, channels.id))
      .leftJoin(templates, eq(postsLog.templateId, templates.id))
      .orderBy(desc(postsLog.postedAt))
      .limit(100);

    const rows = channelId
      ? await query.where(eq(postsLog.channelId, Number(channelId)))
      : await query;

    return NextResponse.json(rows);
  } catch (e) {
    return NextResponse.json({ error: String(e) }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json() as {
      channelId: number;
      templateId?: number;
      variantIndex?: number;
      utmUrl?: string;
      note?: string;
    };
    const [row] = await db
      .insert(postsLog)
      .values({
        channelId: body.channelId,
        templateId: body.templateId ?? null,
        variantIndex: body.variantIndex ?? null,
        utmUrl: body.utmUrl ?? null,
        note: body.note ?? null,
      })
      .returning();
    return NextResponse.json(row, { status: 201 });
  } catch (e) {
    return NextResponse.json({ error: String(e) }, { status: 500 });
  }
}
