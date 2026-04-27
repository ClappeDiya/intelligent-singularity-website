type Branch = { label: string; tag: string };

const DEFAULT_BRANCHES: Branch[] = [
  { label: 'Core platform', tag: 'Clappe · ClapBill' },
  { label: 'Health', tag: 'ClapMed · ClapDiet · ClapMove' },
  { label: 'Finance', tag: 'ClapPay' },
  { label: 'Work', tag: 'Clapwork' },
  { label: 'Agriculture', tag: 'Apogee' },
  { label: 'Media', tag: 'Audiflo · Nestbitt · DailyWorship' },
  { label: 'Comms / data', tag: 'Gclap · FileManager · RateAds' },
];

const W = 720;
const H = 360;
const ROOT_X = W / 2;
const ROOT_Y = H - 36;
const RADIUS_X = W / 2 - 60;
const RADIUS_Y = H - 110;

export function EcosystemTree({
  branches = DEFAULT_BRANCHES,
  rootLabel = 'Intelligent Singularity',
}: {
  branches?: Branch[];
  rootLabel?: string;
}) {
  const n = branches.length;
  const positions = branches.map((b, i) => {
    const t = n === 1 ? 0.5 : i / (n - 1);
    const angle = Math.PI * (1 - t);
    const x = ROOT_X + Math.cos(angle) * RADIUS_X;
    const y = ROOT_Y - Math.sin(angle) * RADIUS_Y;
    return { ...b, x, y, i };
  });

  const ariaLabel = `${rootLabel} parent company with ${n} product branches: ${branches
    .map((b) => `${b.label} (${b.tag})`)
    .join('; ')}.`;

  return (
    <figure className="ecotree" role="figure" aria-label={ariaLabel}>
      <svg
        viewBox={`0 0 ${W} ${H}`}
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
        focusable="false"
      >
        <title>The Clap ecosystem under one parent company</title>
        <desc>{ariaLabel}</desc>

        {positions.map((p) => (
          <path
            key={`line-${p.i}`}
            d={`M ${ROOT_X} ${ROOT_Y} Q ${(ROOT_X + p.x) / 2} ${
              (ROOT_Y + p.y) / 2 - 30
            } ${p.x} ${p.y}`}
            className="ecotree__line"
            style={{ animationDelay: `${p.i * 80}ms` }}
          />
        ))}

        <circle
          cx={ROOT_X}
          cy={ROOT_Y}
          r={9}
          className="ecotree__root-dot"
        />

        {positions.map((p) => (
          <g
            key={`node-${p.i}`}
            className="ecotree__node"
            style={{ animationDelay: `${300 + p.i * 80}ms` }}
          >
            <circle cx={p.x} cy={p.y} r={6} className="ecotree__node-dot" />
            <text
              x={p.x}
              y={p.y - 14}
              className="ecotree__node-label"
              textAnchor="middle"
            >
              {p.label}
            </text>
            <text
              x={p.x}
              y={p.y - 28}
              className="ecotree__node-tag"
              textAnchor="middle"
            >
              {p.tag}
            </text>
          </g>
        ))}

        <text
          x={ROOT_X}
          y={ROOT_Y + 28}
          className="ecotree__root-label"
          textAnchor="middle"
        >
          {rootLabel}
        </text>
      </svg>

      <style>{`
        .ecotree {
          margin: 0;
          width: 100%;
          max-width: 760px;
          margin-inline: auto;
        }
        .ecotree svg {
          width: 100%;
          height: auto;
          display: block;
          overflow: visible;
        }
        .ecotree__line {
          fill: none;
          stroke: color-mix(in srgb, var(--color-emerald, #10B981) 45%, transparent);
          stroke-width: 1.25;
          stroke-linecap: round;
          stroke-dasharray: 1, 4;
          opacity: 0;
          animation: et-line-in 700ms cubic-bezier(0.22, 1, 0.36, 1) forwards;
        }
        .ecotree__root-dot {
          fill: var(--color-emerald, #10B981);
          filter: drop-shadow(0 0 8px color-mix(in srgb, var(--color-emerald, #10B981) 50%, transparent));
        }
        .ecotree__root-label {
          font-family: var(--font-mono, monospace);
          font-size: 11px;
          letter-spacing: 0.06em;
          text-transform: uppercase;
          fill: var(--color-emerald-ink, #047857);
          font-weight: 600;
        }
        .ecotree__node {
          opacity: 0;
          transform-origin: center;
          transform: translateY(8px);
          animation: et-node-in 540ms cubic-bezier(0.22, 1, 0.36, 1) forwards;
        }
        .ecotree__node-dot {
          fill: var(--color-mint, #A8E6CF);
          stroke: var(--color-emerald, #10B981);
          stroke-width: 1;
        }
        .ecotree__node-label {
          font-family: var(--font-serif, serif);
          font-size: 13px;
          font-weight: 600;
          letter-spacing: -0.01em;
          fill: var(--color-paper-ink, #111827);
        }
        .ecotree__node-tag {
          font-family: var(--font-mono, monospace);
          font-size: 9.5px;
          letter-spacing: 0.04em;
          text-transform: uppercase;
          fill: color-mix(in srgb, var(--color-paper-ink, #111827) 55%, transparent);
        }
        @keyframes et-line-in {
          0% { opacity: 0; }
          100% { opacity: 1; }
        }
        @keyframes et-node-in {
          0% { opacity: 0; transform: translateY(8px); }
          100% { opacity: 1; transform: translateY(0); }
        }
        @media (prefers-reduced-motion: reduce) {
          .ecotree__line, .ecotree__node {
            animation: none;
            opacity: 1;
            transform: none;
          }
        }
      `}</style>
    </figure>
  );
}
