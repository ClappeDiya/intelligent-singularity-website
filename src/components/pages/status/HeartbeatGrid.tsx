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
  ariaLabel,
}: {
  heartbeats: Heartbeat[];
  ariaLabel: string;
}) {
  const padded = heartbeats.slice(-90);
  while (padded.length < 90) padded.unshift({ status: 3, time: '' });
  return (
    <div
      role="img"
      aria-label={ariaLabel}
      className="flex gap-[2px] items-stretch min-w-0"
      style={{ height: 28, overflow: 'hidden' }}
    >
      {padded.map((h, i) => (
        <span
          key={i}
          data-hb-cell
          title={h.time}
          style={{
            flex: 1,
            minWidth: 1,
            borderRadius: 2,
            background: color(h.status),
          }}
        />
      ))}
    </div>
  );
}
