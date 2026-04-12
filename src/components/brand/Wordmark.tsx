export function Wordmark({ className = '' }: { className?: string }) {
  return (
    <span
      className={`wordmark inline-flex items-baseline gap-[0.2em] font-[var(--font-serif)] ${className}`}
      style={{ letterSpacing: '-0.005em' }}
    >
      <span>Intelligent</span>
      <span>Singularity</span>
    </span>
  );
}
