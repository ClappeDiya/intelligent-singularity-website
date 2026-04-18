import type { Payload } from 'payload';

export const STATUS_PAGE_SEED = {
  kumaBaseUrl: 'https://status.intelligentsingularityinc.com',
  kumaSlug: 'is',
  eyebrow: 'STATUS',
  title: 'How everything is running.',
  lede:
    'This page is pulled live from our public status monitor. If the numbers look wrong, tell us — that is part of keeping this honest.',
  groups: [
    { heading: 'Website', monitorIds: [] },
    { heading: 'CMS', monitorIds: [] },
    { heading: 'Database', monitorIds: [] },
    { heading: 'Mail', monitorIds: [] },
    { heading: 'Error telemetry', monitorIds: [] },
  ],
  operationalCopy:
    'Operational means the service answered within the target time for every check in the last five minutes. A small blip does not break that. A sustained failure does.',
};

export async function seedStatusPage(payload: Payload, log: string[]): Promise<void> {
  await payload.updateGlobal({ slug: 'status-page', data: STATUS_PAGE_SEED as any });
  log.push('status-page: updated');
}
