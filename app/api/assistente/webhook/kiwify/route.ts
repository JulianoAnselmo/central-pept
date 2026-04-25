import { db } from '@/lib/db';
import { conversions } from '@/drizzle/schema';
import { NextRequest, NextResponse } from 'next/server';
import { createHmac } from 'crypto';

export async function POST(req: NextRequest) {
  const secret = process.env.KIWIFY_WEBHOOK_SECRET;

  // Valida assinatura se secret configurado
  if (secret) {
    const sig = req.headers.get('x-kiwify-signature') ?? '';
    const body = await req.text();
    const expected = createHmac('sha256', secret).update(body).digest('hex');
    if (sig !== expected) {
      return NextResponse.json({ error: 'Assinatura inválida' }, { status: 401 });
    }
    const payload = JSON.parse(body) as KiwifyPayload;
    return handlePayload(payload);
  }

  const payload = (await req.json()) as KiwifyPayload;
  return handlePayload(payload);
}

interface KiwifyPayload {
  order_id?: string;
  order_status?: string;
  product?: { slug?: string };
  order_value?: number; // em centavos ou reais — Kiwify envia em centavos
  tracking?: {
    utm_source?: string;
    utm_medium?: string;
    utm_campaign?: string;
    utm_content?: string;
  };
}

async function handlePayload(payload: KiwifyPayload) {
  // Só registra pedidos aprovados/pagos
  if (payload.order_status && !['paid', 'approved', 'complete'].includes(payload.order_status)) {
    return NextResponse.json({ ignored: true });
  }

  try {
    const [row] = await db
      .insert(conversions)
      .values({
        utmSource: payload.tracking?.utm_source ?? null,
        utmMedium: payload.tracking?.utm_medium ?? null,
        utmCampaign: payload.tracking?.utm_campaign ?? null,
        utmContent: payload.tracking?.utm_content ?? null,
        kiwifyOrderId: payload.order_id ?? null,
        productSlug: payload.product?.slug ?? null,
        amount: payload.order_value ?? null,
      })
      .returning();
    return NextResponse.json({ ok: true, id: row.id });
  } catch (e) {
    return NextResponse.json({ error: String(e) }, { status: 500 });
  }
}
