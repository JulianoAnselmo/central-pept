import { db } from '@/lib/db';
import { channels } from '@/drizzle/schema';
import { eq } from 'drizzle-orm';
import { NextRequest, NextResponse } from 'next/server';

export async function GET() {
  try {
    const rows = await db.select().from(channels).orderBy(channels.name);
    return NextResponse.json(rows);
  } catch (e) {
    return NextResponse.json({ error: String(e) }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json() as { kind: string; name: string; handle?: string; notes?: Record<string, unknown> };
    const [row] = await db
      .insert(channels)
      .values({
        kind: body.kind,
        name: body.name,
        handle: body.handle ?? null,
        notes: body.notes ?? {},
      })
      .returning();
    return NextResponse.json(row, { status: 201 });
  } catch (e) {
    return NextResponse.json({ error: String(e) }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const id = Number(searchParams.get('id'));
    if (!id) return NextResponse.json({ error: 'id obrigatório' }, { status: 400 });
    await db.delete(channels).where(eq(channels.id, id));
    return NextResponse.json({ ok: true });
  } catch (e) {
    return NextResponse.json({ error: String(e) }, { status: 500 });
  }
}
