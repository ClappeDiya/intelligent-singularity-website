type Props = {
  count?: number;
  size?: number;
  ariaLabel?: string;
};

export function PledgeRings({
  count = 9,
  size = 220,
  ariaLabel = 'Nine concentric commitments forming a single ring of universal access — the engineering rules every product ships against.',
}: Props) {
  const cx = size / 2;
  const cy = size / 2;
  const minR = 18;
  const maxR = size / 2 - 8;
  const step = (maxR - minR) / Math.max(1, count - 1);

  const rings = Array.from({ length: count }, (_, i) => {
    const r = minR + step * i;
    return { i, r };
  });

  return (
    <figure className="pledgerings" role="figure" aria-label={ariaLabel}>
      <svg
        viewBox={`0 0 ${size} ${size}`}
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
        focusable="false"
      >
        <title>Nine commitments</title>
        <desc>{ariaLabel}</desc>
        {rings.map((r) => (
          <circle
            key={r.i}
            cx={cx}
            cy={cy}
            r={r.r}
            className="pledgerings__ring"
            style={{ animationDelay: `${r.i * 60}ms` }}
          />
        ))}
        <circle cx={cx} cy={cy} r={5} className="pledgerings__core" />
      </svg>
      <style>{`
        .pledgerings {
          margin: 0;
          width: 100%;
          max-width: ${size}px;
          aspect-ratio: 1 / 1;
        }
        .pledgerings svg {
          width: 100%;
          height: 100%;
          display: block;
        }
        .pledgerings__ring {
          fill: none;
          stroke: color-mix(in srgb, var(--color-mint, #A8E6CF) 80%, transparent);
          stroke-width: 1.25;
          opacity: 0;
          transform-origin: center;
          transform: scale(0.85);
          animation: pr-in 700ms cubic-bezier(0.22, 1, 0.36, 1) forwards;
        }
        .pledgerings__core {
          fill: var(--color-emerald, #10B981);
          filter: drop-shadow(0 0 6px color-mix(in srgb, var(--color-emerald, #10B981) 60%, transparent));
        }
        @keyframes pr-in {
          0% { opacity: 0; transform: scale(0.85); }
          100% { opacity: 1; transform: scale(1); }
        }
        @media (prefers-reduced-motion: reduce) {
          .pledgerings__ring { animation: none; opacity: 1; transform: scale(1); }
        }
      `}</style>
    </figure>
  );
}
