type Tile = { label: string; row: number; col: number; w?: number; h?: number };

const DEFAULT_TILES: Tile[] = [
  { label: 'Clappe', row: 0, col: 0, w: 2, h: 2 },
  { label: 'ClapBill', row: 0, col: 2, w: 1, h: 1 },
  { label: 'ClapMed', row: 0, col: 3, w: 1, h: 2 },
  { label: 'ClapDiet', row: 1, col: 2, w: 1, h: 1 },
  { label: 'ClapPay', row: 2, col: 0, w: 1, h: 1 },
  { label: 'Clapwork', row: 2, col: 1, w: 1, h: 1 },
  { label: 'Apogee', row: 2, col: 2, w: 1, h: 1 },
  { label: 'Audiflo', row: 2, col: 3, w: 1, h: 1 },
];

const COLS = 4;
const ROWS = 3;
const CELL = 80;
const GAP = 8;
const W = COLS * CELL + (COLS - 1) * GAP;
const H = ROWS * CELL + (ROWS - 1) * GAP;

export function PortfolioMosaic({
  tiles = DEFAULT_TILES,
  ariaLabel = 'A mosaic showing eight platforms across the Clap ecosystem: Clappe, ClapBill, ClapMed, ClapDiet, ClapPay, Clapwork, Apogee, and Audiflo.',
}: {
  tiles?: Tile[];
  ariaLabel?: string;
}) {
  return (
    <figure className="pmosaic" role="figure" aria-label={ariaLabel}>
      <svg
        viewBox={`0 0 ${W} ${H}`}
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
        focusable="false"
      >
        <title>Portfolio mosaic</title>
        <desc>{ariaLabel}</desc>
        {tiles.map((t, i) => {
          const w = (t.w ?? 1) * CELL + ((t.w ?? 1) - 1) * GAP;
          const h = (t.h ?? 1) * CELL + ((t.h ?? 1) - 1) * GAP;
          const x = t.col * (CELL + GAP);
          const y = t.row * (CELL + GAP);
          return (
            <g
              key={t.label}
              className="pmosaic__tile"
              style={{ animationDelay: `${i * 70}ms` }}
            >
              <rect
                x={x}
                y={y}
                width={w}
                height={h}
                rx={10}
                ry={10}
                className="pmosaic__rect"
              />
              <text
                x={x + w / 2}
                y={y + h / 2}
                className="pmosaic__label"
                textAnchor="middle"
                dominantBaseline="middle"
              >
                {t.label}
              </text>
            </g>
          );
        })}
      </svg>
      <style>{`
        .pmosaic {
          margin: 0;
          width: 100%;
          max-width: 480px;
          margin-inline: auto;
        }
        .pmosaic svg {
          width: 100%;
          height: auto;
          display: block;
        }
        .pmosaic__tile {
          opacity: 0;
          transform-origin: center;
          transform: scale(0.92);
          animation: pm-in 540ms cubic-bezier(0.22, 1, 0.36, 1) forwards;
        }
        .pmosaic__rect {
          fill: color-mix(in srgb, var(--color-mint, #A8E6CF) 28%, transparent);
          stroke: color-mix(in srgb, var(--color-emerald, #10B981) 50%, transparent);
          stroke-width: 1;
        }
        .pmosaic__tile:nth-child(odd) .pmosaic__rect {
          fill: color-mix(in srgb, var(--color-mint, #A8E6CF) 40%, transparent);
        }
        .pmosaic__label {
          font-family: var(--font-serif, serif);
          font-size: 13px;
          font-weight: 600;
          letter-spacing: -0.01em;
          fill: var(--color-paper-ink, #111827);
        }
        @keyframes pm-in {
          0% { opacity: 0; transform: scale(0.92) translateY(6px); }
          100% { opacity: 1; transform: scale(1) translateY(0); }
        }
        @media (prefers-reduced-motion: reduce) {
          .pmosaic__tile { animation: none; opacity: 1; transform: none; }
        }
      `}</style>
    </figure>
  );
}
