import { getPayload } from 'payload';
import config from '@payload-config';
import { seedChangelog } from '@/lib/seed/new-pages/changelog';
import { seedRoadmap } from '@/lib/seed/new-pages/roadmap';
import { seedInsights } from '@/lib/seed/new-pages/insights';
import { seedStatusPage } from '@/lib/seed/new-pages/status';
import { seedTrustPage } from '@/lib/seed/new-pages/trust';
import { seedHelpPage } from '@/lib/seed/new-pages/help';
import { seedNewPagesTranslations } from '@/lib/seed/new-pages/translations';

export async function POST(request: Request) {
  if (process.env.NODE_ENV === 'production') {
    const url = new URL(request.url);
    const secret = url.searchParams.get('secret');
    if (secret !== process.env.REVALIDATE_SECRET) {
      return Response.json(
        { error: 'Seed requires valid secret in production' },
        { status: 403 }
      );
    }
  }

  const payload = await getPayload({ config });
  const log: string[] = [];

  await seedStatusPage(payload as any, log);
  await seedTrustPage(payload as any, log);
  await seedHelpPage(payload as any, log);
  await seedRoadmap(payload as any, log);
  await seedChangelog(payload as any, log);
  await seedInsights(payload as any, log);
  await seedNewPagesTranslations(payload as any, log);

  return Response.json({ ok: true, log });
}
