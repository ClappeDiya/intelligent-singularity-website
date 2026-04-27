type Props = {
  onlinePercent?: number;
  offlinePercent?: number;
  onlineCount?: string;
  offlineCount?: string;
  source?: string;
};

const COLS = 10;
const ROWS = 10;
const CELL = 14;
const RADIUS = 4;
const PADDING_X = 8;
const PADDING_Y = 8;
const GRID_W = COLS * CELL;
const GRID_H = ROWS * CELL;
const VIEW_W = GRID_W + PADDING_X * 2;
const VIEW_H = GRID_H + PADDING_Y * 2;

export function DigitalDivideIllustration({
  onlinePercent = 74,
  offlinePercent = 26,
  onlineCount = '5.9 billion',
  offlineCount = '2.2 billion',
  source = 'ITU Facts and Figures 2025',
}: Props) {
  const totalDots = COLS * ROWS;
  const onlineDots = Math.round((onlinePercent / 100) * totalDots);

  const dots = Array.from({ length: totalDots }, (_, i) => {
    const row = Math.floor(i / COLS);
    const col = i % COLS;
    const cx = PADDING_X + col * CELL + CELL / 2;
    const cy = PADDING_Y + row * CELL + CELL / 2;
    const isOnline = i < onlineDots;
    return { i, cx, cy, isOnline };
  });

  const ariaLabel = `${onlinePercent} percent of humanity is online (${onlineCount}). ${offlinePercent} percent is offline (${offlineCount}). Source: ${source}.`;

  return (
    <figure className="digital-divide" aria-label={ariaLabel} role="figure">
      <div className="digital-divide__grid">
        <svg
          viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
          focusable="false"
        >
          <title>Who is online and who is not</title>
          <desc>{ariaLabel}</desc>
          {dots.map((d) => (
            <circle
              key={d.i}
              cx={d.cx}
              cy={d.cy}
              r={RADIUS}
              className={d.isOnline ? 'dot dot--on' : 'dot dot--off'}
              style={{ animationDelay: `${(d.i % COLS) * 30 + Math.floor(d.i / COLS) * 25}ms` }}
            />
          ))}
        </svg>
      </div>
      <figcaption className="digital-divide__caption">
        <div className="digital-divide__legend">
          <div className="digital-divide__row">
            <span className="digital-divide__swatch digital-divide__swatch--on" aria-hidden="true" />
            <span className="digital-divide__num">{onlinePercent}%</span>
            <span className="digital-divide__label">
              online — {onlineCount}
            </span>
          </div>
          <div className="digital-divide__row">
            <span className="digital-divide__swatch digital-divide__swatch--off" aria-hidden="true" />
            <span className="digital-divide__num">{offlinePercent}%</span>
            <span className="digital-divide__label">
              still offline — {offlineCount}
            </span>
          </div>
        </div>
        <p className="digital-divide__source">Source: {source}.</p>
      </figcaption>

      <style>{`
        .digital-divide {
          margin: 0;
          display: grid;
          gap: 24px;
          grid-template-columns: 1fr;
          align-items: center;
        }
        @media (min-width: 768px) {
          .digital-divide {
            grid-template-columns: minmax(0, 1fr) minmax(0, 1fr);
            gap: 48px;
          }
        }
        .digital-divide__grid {
          width: 100%;
          max-width: 320px;
          aspect-ratio: 1 / 1;
        }
        .digital-divide__grid svg {
          width: 100%;
          height: 100%;
          display: block;
        }
        .dot {
          opacity: 0;
          transform-origin: center;
          transform: scale(0.6);
          animation: dd-pop 540ms cubic-bezier(0.22, 1, 0.36, 1) forwards;
        }
        .dot--on {
          fill: var(--color-mint, #A8E6CF);
        }
        .dot--off {
          fill: transparent;
          stroke: var(--color-cream, #F4EFE6);
          stroke-opacity: 0.35;
          stroke-width: 1;
        }
        @keyframes dd-pop {
          0%   { opacity: 0; transform: scale(0.6); }
          100% { opacity: 1; transform: scale(1); }
        }
        @media (prefers-reduced-motion: reduce) {
          .dot { animation: none; opacity: 1; transform: scale(1); }
        }
        .digital-divide__caption {
          display: grid;
          gap: 16px;
        }
        .digital-divide__legend {
          display: grid;
          gap: 12px;
        }
        .digital-divide__row {
          display: grid;
          grid-template-columns: auto auto 1fr;
          align-items: baseline;
          gap: 12px;
        }
        .digital-divide__swatch {
          display: inline-block;
          width: 12px;
          height: 12px;
          border-radius: 50%;
          align-self: center;
        }
        .digital-divide__swatch--on { background: var(--color-mint, #A8E6CF); }
        .digital-divide__swatch--off {
          background: transparent;
          border: 1px solid color-mix(in srgb, var(--color-cream, #F4EFE6) 35%, transparent);
        }
        .digital-divide__num {
          font-family: var(--font-serif, serif);
          font-size: clamp(28px, 3vw, 40px);
          font-weight: 600;
          letter-spacing: -0.02em;
          color: var(--color-cream, #F4EFE6);
          line-height: 1;
        }
        .digital-divide__label {
          font-family: var(--font-sans, sans-serif);
          font-size: 14px;
          color: color-mix(in srgb, var(--color-cream, #F4EFE6) 70%, transparent);
          line-height: 1.5;
        }
        .digital-divide__source {
          margin: 0;
          font-family: var(--font-mono, monospace);
          font-size: 11px;
          letter-spacing: 0.05em;
          text-transform: uppercase;
          color: color-mix(in srgb, var(--color-cream, #F4EFE6) 50%, transparent);
        }
      `}</style>
    </figure>
  );
}
