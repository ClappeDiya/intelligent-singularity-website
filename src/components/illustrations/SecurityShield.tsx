type Props = {
  size?: number;
  ariaLabel?: string;
};

export function SecurityShield({
  size = 200,
  ariaLabel = 'A simple shield illustrating the security posture: TLS encryption, zero third-party calls, isolated product environments, short retention, and named subprocessors.',
}: Props) {
  return (
    <figure className="securityshield" role="figure" aria-label={ariaLabel}>
      <svg
        viewBox="0 0 200 220"
        xmlns="http://www.w3.org/2000/svg"
        width={size}
        height={(size * 220) / 200}
        aria-hidden="true"
        focusable="false"
      >
        <title>Security posture</title>
        <desc>{ariaLabel}</desc>
        <defs>
          <linearGradient id="ss-grad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="var(--color-mint, #A8E6CF)" stopOpacity="0.85" />
            <stop offset="100%" stopColor="var(--color-emerald, #10B981)" stopOpacity="0.95" />
          </linearGradient>
        </defs>

        <path
          d="M 100 14 L 178 38 L 178 110 C 178 158 144 192 100 208 C 56 192 22 158 22 110 L 22 38 Z"
          className="securityshield__shape"
          fill="url(#ss-grad)"
        />

        <path
          d="M 70 110 L 92 132 L 134 88"
          className="securityshield__check"
          fill="none"
          strokeWidth="6"
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        {[60, 80, 100].map((y, i) => (
          <line
            key={y}
            x1="46"
            x2="68"
            y1={y}
            y2={y}
            className="securityshield__pulse"
            style={{ animationDelay: `${i * 220}ms` }}
          />
        ))}
      </svg>
      <style>{`
        .securityshield {
          margin: 0;
          display: flex;
          justify-content: center;
        }
        .securityshield svg {
          display: block;
          filter: drop-shadow(0 6px 24px color-mix(in srgb, var(--color-emerald, #10B981) 30%, transparent));
        }
        .securityshield__shape {
          opacity: 0;
          transform-origin: center;
          transform: scale(0.92);
          animation: ss-in 600ms cubic-bezier(0.22, 1, 0.36, 1) forwards;
        }
        .securityshield__check {
          stroke: var(--color-paper, #FFFFFF);
          stroke-dasharray: 100;
          stroke-dashoffset: 100;
          animation: ss-check 700ms 350ms cubic-bezier(0.22, 1, 0.36, 1) forwards;
        }
        .securityshield__pulse {
          stroke: color-mix(in srgb, var(--color-emerald, #10B981) 40%, transparent);
          stroke-width: 2;
          stroke-linecap: round;
          opacity: 0;
          animation: ss-pulse 1800ms cubic-bezier(0.22, 1, 0.36, 1) infinite;
        }
        @keyframes ss-in {
          0% { opacity: 0; transform: scale(0.92); }
          100% { opacity: 1; transform: scale(1); }
        }
        @keyframes ss-check {
          to { stroke-dashoffset: 0; }
        }
        @keyframes ss-pulse {
          0%, 100% { opacity: 0; transform: translateX(0); }
          50% { opacity: 1; transform: translateX(4px); }
        }
        @media (prefers-reduced-motion: reduce) {
          .securityshield__shape, .securityshield__check, .securityshield__pulse {
            animation: none;
            opacity: 1;
            transform: none;
            stroke-dashoffset: 0;
          }
        }
      `}</style>
    </figure>
  );
}
