// src/lib/uptime-kuma.ts
export type Heartbeat = { status: 0 | 1 | 2 | 3; ping?: number; time: string };
export type Monitor = { id: number; name: string; heartbeats: Heartbeat[]; uptime24h?: number; uptime30d?: number };
export type Group = { name: string; monitors: Monitor[] };
export type KumaStatus = {
  overall: 'operational' | 'degraded' | 'down' | 'unknown';
  groups: Group[];
  fetchedAt: string;
};

type RawStatus = { publicGroupList?: Array<{ name: string; monitorList: Array<{ id: number; name: string }> }> };
type RawHeartbeat = {
  heartbeatList?: Record<string, Array<{ status: number; ping?: number; time: string }>>;
  uptimeList?: Record<string, number>;
};

export async function fetchKumaStatus(opts: {
  baseUrl: string;
  slug: string;
  timeoutMs?: number;
}): Promise<KumaStatus | null> {
  const { baseUrl, slug, timeoutMs = 3000 } = opts;
  const signal = AbortSignal.timeout(timeoutMs);
  try {
    const timeout = new Promise<never>((_, reject) =>
      setTimeout(() => reject(new DOMException('Timeout', 'AbortError')), timeoutMs)
    );
    const [statusRes, heartbeatRes] = await Promise.race([
      Promise.all([
        fetch(`${baseUrl}/api/status-page/${slug}`, { signal, cache: 'no-store' }),
        fetch(`${baseUrl}/api/status-page/heartbeat/${slug}`, { signal, cache: 'no-store' }),
      ]),
      timeout,
    ]);
    if (!statusRes.ok || !heartbeatRes.ok) return null;
    const status: RawStatus = await statusRes.json();
    const heartbeat: RawHeartbeat = await heartbeatRes.json();
    const hb = heartbeat.heartbeatList ?? {};
    const up = heartbeat.uptimeList ?? {};

    const groups: Group[] = (status.publicGroupList ?? []).map((g) => ({
      name: g.name,
      monitors: (g.monitorList ?? []).map((m) => ({
        id: m.id,
        name: m.name,
        heartbeats: (hb[String(m.id)] ?? []).map((h) => ({
          status: (h.status as 0 | 1 | 2 | 3) ?? 3,
          ping: h.ping,
          time: h.time,
        })),
        uptime24h: up[`${m.id}_24`],
        uptime30d: up[`${m.id}_720`],
      })),
    }));

    const allUp = groups.every((g) => g.monitors.every((m) => m.heartbeats.slice(-3).every((h) => h.status === 1)));
    const overall: KumaStatus['overall'] = groups.length === 0 ? 'unknown' : allUp ? 'operational' : 'degraded';

    return { overall, groups, fetchedAt: new Date().toISOString() };
  } catch {
    return null;
  }
}
