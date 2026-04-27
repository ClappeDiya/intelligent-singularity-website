type Props = {
  size?: number;
  ariaLabel?: string;
};

const POPULATIONS = [
  { x: 30, y: 38, r: 2.4, kind: 'on' },
  { x: 38, y: 32, r: 2.0, kind: 'on' },
  { x: 47, y: 30, r: 2.6, kind: 'on' },
  { x: 56, y: 33, r: 1.8, kind: 'on' },
  { x: 70, y: 36, r: 2.2, kind: 'on' },
  { x: 78, y: 40, r: 2.0, kind: 'on' },
  { x: 35, y: 50, r: 2.4, kind: 'off' },
  { x: 50, y: 56, r: 2.2, kind: 'off' },
  { x: 60, y: 50, r: 2.6, kind: 'off' },
  { x: 70, y: 58, r: 2.0, kind: 'off' },
  { x: 42, y: 68, r: 1.8, kind: 'on' },
  { x: 55, y: 72, r: 2.2, kind: 'off' },
];

export function OfflineGlobe({
  size = 220,
  ariaLabel = 'A simple globe with two-point-two billion offline dots highlighted, illustrating the digital-divide ITU figure.',
}: Props) {
  return (
    <figure className="oglobe" role="figure" aria-label={ariaLabel}>
      <svg
        viewBox="0 0 100 100"
        xmlns="http://www.w3.org/2000/svg"
        width={size}
        height={size}
        aria-hidden="true"
        focusable="false"
      >
        <title>Offline reach</title>
        <desc>{ariaLabel}</desc>
        <defs>
          <radialGradient id="og-bg" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="var(--color-mint, #A8E6CF)" stopOpacity="0.18" />
            <stop offset="100%" stopColor="var(--color-emerald, #10B981)" stopOpacity="0.12" />
          </radialGradient>
        </defs>

        <circle cx="50" cy="50" r="45" className="oglobe__sphere" fill="url(#og-bg)" />

        {[12, 24, 36, 48].map((r) => (
          <ellipse
            key={`lat-${r}`}
            cx="50"
            cy="50"
            rx="45"
            ry={r}
            className="oglobe__ring"
          />
        ))}
        {[-30, 0, 30].map((rotation) => (
          <ellipse
            key={`lon-${rotation}`}
            cx="50"
            cy="50"
            rx="22"
            ry="45"
            transform={`rotate(${rotation} 50 50)`}
            className="oglobe__ring"
          />
        ))}

        {POPULATIONS.map((p, i) => (
          <circle
            key={i}
            cx={p.x}
            cy={p.y}
            r={p.r}
            className={p.kind === 'on' ? 'oglobe__dot oglobe__dot--on' : 'oglobe__dot oglobe__dot--off'}
            style={{ animationDelay: `${i * 90}ms` }}
          />
        ))}
      </svg>
      <style>{`
        .oglobe {
          margin: 0;
          display: flex;
          justify-content: center;
        }
        .oglobe__sphere {
          stroke: color-mix(in srgb, var(--color-emerald, #10B981) 35%, transparent);
          stroke-width: 0.5;
        }
        .oglobe__ring {
          fill: none;
          stroke: color-mix(in srgb, var(--color-emerald, #10B981) 25%, transparent);
          stroke-width: 0.4;
        }
        .oglobe__dot {
          opacity: 0;
          animation: og-dot-in 540ms cubic-bezier(0.22, 1, 0.36, 1) forwards;
        }
        .oglobe__dot--on {
          fill: var(--color-mint, #A8E6CF);
        }
        .oglobe__dot--off {
          fill: color-mix(in srgb, var(--color-paper-ink, #111827) 40%, transparent);
          stroke: var(--color-emerald, #10B981);
          stroke-width: 0.4;
        }
        @keyframes og-dot-in {
          0% { opacity: 0; transform: scale(0.4); transform-origin: center; }
          100% { opacity: 1; transform: scale(1); transform-origin: center; }
        }
        @media (prefers-reduced-motion: reduce) {
          .oglobe__dot { animation: none; opacity: 1; }
        }
      `}</style>
    </figure>
  );
}
