import { NextRequest, NextResponse } from 'next/server';
import { createHash } from 'crypto';
import { db } from '@/lib/db';
import { affiliateClicks } from '@/drizzle/schema';
import { getAffiliate } from '@/lib/affiliates';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

const IP_SALT = process.env.IP_HASH_SALT ?? 'change-me-in-env';

function hashIp(ip: string | null): string | null {
  if (!ip) return null;
  return createHash('sha256').update(ip + IP_SALT).digest('hex').slice(0, 32);
}

export async function GET(req: NextRequest) {
  const { searchParams } = req.nextUrl;
  const productId = searchParams.get('p');
  const slot = searchParams.get('slot') ?? 'unknown';
  if (!productId) {
    return NextResponse.json({ error: 'missing p' }, { status: 400 });
  }

  const product = getAffiliate(productId);
  if (!product) {
    return NextResponse.json({ error: 'unknown product' }, { status: 404 });
  }

  const ip =
    req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ??
    req.headers.get('x-real-ip') ??
    null;

  // Aguarda insert completar — serverless suspende função após return,
  // background promise não sobrevive.
  try {
    await db.insert(affiliateClicks).values({
      productId: product.id,
      network: product.network,
      slot,
      utmSource: searchParams.get('utm_source'),
      utmMedium: searchParams.get('utm_medium'),
      utmCampaign: searchParams.get('utm_campaign'),
      utmContent: searchParams.get('utm_content'),
      referer: req.headers.get('referer'),
      ipHash: hashIp(ip),
      userAgent: req.headers.get('user-agent'),
    });
  } catch (err) {
    console.error('[affiliate click] insert failed', err);
    // Continua redirect mesmo se DB falhar — não bloqueia conversão.
  }

  return NextResponse.redirect(product.url, { status: 302 });
}
