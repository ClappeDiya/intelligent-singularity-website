import type { Payload } from 'payload';

export const STATUS_PAGE_SEED = {
  kumaBaseUrl: 'https://status.intelligentsingularityinc.com',
  kumaSlug: 'is',
  eyebrow: 'STATUS',
  title: 'How everything is running, right now.',
  lede:
    'This page reads straight from our public health monitor, updated every minute. If the number on the page looks wrong to you, please tell us — keeping the truth visible is part of the job. Green means the check answered in time. Amber means we are watching a slow response. Red means we know and we are on it.',
  groups: [
    { heading: 'Website', monitorIds: [] },
    { heading: 'Content system', monitorIds: [] },
    { heading: 'Database', monitorIds: [] },
    { heading: 'Email delivery', monitorIds: [] },
    { heading: 'Error telemetry', monitorIds: [] },
  ],
  operationalCopy:
    'Operational means every check passed in time over the last five minutes. A brief blip does not change the status. A long failure does. If an outage starts, you will see a red badge here first. Within ten minutes the on-call engineer posts a short note. The note says what is happening, what we are doing, and when to check back.',
};

export async function seedStatusPage(payload: Payload, log: string[]): Promise<void> {
  await payload.updateGlobal({ slug: 'status-page', data: STATUS_PAGE_SEED as any });
  log.push('status-page: updated');
}
