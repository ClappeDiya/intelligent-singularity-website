import Link from 'next/link';

export default function NotFound() {
  return (
    <main
      id="main-content"
      style={{
        minHeight: '100dvh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 'clamp(32px, 6vw, 80px)',
        textAlign: 'center',
        color: 'var(--color-paper-ink)',
        fontFamily: 'var(--font-sans)',
      }}
    >
      <div style={{ fontFamily: 'var(--font-mono)', color: 'var(--color-emerald-ink)', textTransform: 'uppercase', letterSpacing: '0.18em', fontSize: '11px', marginBottom: '1rem' }}>
        404 · Page not found
      </div>
      <h1 style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(34px, 5vw, 56px)', letterSpacing: '-0.03em', lineHeight: 1.05, marginBottom: '1rem', textWrap: 'balance' }}>
        We could not find that page.
      </h1>
      <p style={{ fontSize: '17px', lineHeight: 1.65, color: 'rgba(17,24,39,0.78)', maxWidth: '54ch', marginBottom: '2rem' }}>
        The link may be old, the page may have moved, or the address may have a typo. Try the home page, or contact us if you reached this from a link we wrote.
      </p>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem', justifyContent: 'center' }}>
        <Link href="/en" className="btn-primary" style={{ fontFamily: 'var(--font-mono)' }}>
          Go to home
          <span aria-hidden="true">→</span>
        </Link>
        <Link href="/en/contact" className="btn-outline" style={{ fontFamily: 'var(--font-mono)' }}>
          Contact us
        </Link>
      </div>
    </main>
  );
}
