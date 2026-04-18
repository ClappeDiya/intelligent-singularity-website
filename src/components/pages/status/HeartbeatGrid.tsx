// src/components/pages/status/HeartbeatGrid.tsx
import type { Heartbeat } from '@/lib/uptime-kuma';

function color(status: number): string {
  if (status === 1) return 'var(--color-mint)';
  if (status === 2) return '#E1B054';
  if (status === 0) return '#C24B4B';
  return 'rgba(246,241,231,0.2)';
}

export function HeartbeatGrid({
  heartbeats,
  uptime24h,
}: {
  heartbeats: Heartbeat[];
  uptime24h?: number;
}) {
  const padded = heartbeats.slice(-90);
  while (padded.length < 90) padded.unshift({ status: 3, time: '' });
  const pct = typeof uptime24h === 'number' ? `${(uptime24h * 100).toFixed(2)}%` : 'unknown';
  return (
    <div
      role="img"
      aria-label={`Uptime over the last 90 days, ${pct} in the last 24 hours.`}
      className="flex gap-[2px] items-stretch"
      style={{ height: 28 }}
    >
      {padded.map((h, i) => (
        <span
          key={i}
          data-hb-cell
          title={h.time}
          style={{
            flex: 1,
            minWidth: 2,
            borderRadius: 2,
            background: color(h.status),
          }}
        />
      ))}
    </div>
  );
}
