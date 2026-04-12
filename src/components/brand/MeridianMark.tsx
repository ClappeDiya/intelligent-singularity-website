export function MeridianMark({ size = 28 }: { size?: number }) {
  const center = size / 2;
  const dotRadius = size * 0.18;
  const ringRadius = size * 0.42;
  const lineY = center + size * 0.07;
  const dotY = center - size * 0.04;

  return (
    <svg
      width={size}
      height={size}
      viewBox={`0 0 ${size} ${size}`}
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <circle
        cx={center}
        cy={dotY}
        r={ringRadius}
        fill="none"
        stroke="var(--color-mint-faint)"
        strokeWidth="1"
      />
      <line
        x1={size * 0.1}
        y1={lineY}
        x2={size * 0.9}
        y2={lineY}
        stroke="var(--color-mint)"
        strokeWidth="1"
        strokeLinecap="round"
      />
      <circle
        data-role="dot"
        cx={center}
        cy={dotY}
        r={dotRadius}
        fill="var(--color-mint)"
      />
    </svg>
  );
}
