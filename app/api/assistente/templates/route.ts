import { db } from '@/lib/db';
import { templates } from '@/drizzle/schema';
import { TEMPLATES_SEED } from '@/lib/promocao/templates.seed';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const rows = await db.select().from(templates).orderBy(templates.title);
    return NextResponse.json(rows);
  } catch (e) {
    return NextResponse.json({ error: String(e) }, { status: 500 });
  }
}

// Seed inicial — chame POST /api/assistente/templates/seed manualmente uma vez
export async function POST() {
  try {
    const inserted: unknown[] = [];
    for (const seed of TEMPLATES_SEED) {
      const [row] = await db
        .insert(templates)
        .values({
          slug: seed.slug,
          title: seed.title,
          channelKind: seed.channelKind ?? null,
          bodyVariants: seed.bodyVariants,
          utmDefaults: seed.utmDefaults,
        })
        .onConflictDoNothing()
        .returning();
      if (row) inserted.push(row);
    }
    return NextResponse.json({ inserted: inserted.length });
  } catch (e) {
    return NextResponse.json({ error: String(e) }, { status: 500 });
  }
}
