export function ProofChip({ label, value }: { label: string; value: string }) {
  return (
    <span
      className="inline-flex items-center gap-2 px-3 py-1 rounded-full border text-[11px] uppercase tracking-[0.16em]"
      style={{
        fontFamily: 'var(--font-mono)',
        color: 'var(--color-cream-soft)',
        borderColor: 'rgba(246,241,231,0.16)',
      }}
    >
      <span style={{ color: 'var(--color-mint)' }}>{value}</span>
      <span aria-hidden="true" style={{ color: 'rgba(246,241,231,0.3)' }}>·</span>
      <span>{label}</span>
    </span>
  );
}
