import Link from 'next/link';
import { getLocale, getTranslations } from 'next-intl/server';

export default async function NotFound() {
  const locale = await getLocale();
  const t = await getTranslations('common');
  return (
    <main
      id="main-content"
      tabIndex={-1}
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
        {t('notFoundEyebrow')}
      </div>
      <h1 style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(34px, 5vw, 56px)', letterSpacing: '-0.03em', lineHeight: 1.05, marginBottom: '1rem', textWrap: 'balance' }}>
        {t('notFoundTitle')}
      </h1>
      <p style={{ fontSize: '17px', lineHeight: 1.65, color: 'var(--color-paper-ink-muted)', maxWidth: '54ch', marginBottom: '2rem' }}>
        {t('notFoundBody')}
      </p>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem', justifyContent: 'center' }}>
        <Link href={`/${locale}`} className="btn-primary" style={{ fontFamily: 'var(--font-mono)' }}>
          {t('goToHome')}
          <span aria-hidden="true">→</span>
        </Link>
        <Link href={`/${locale}/contact`} className="btn-outline" style={{ fontFamily: 'var(--font-mono)' }}>
          {t('contactUs')}
        </Link>
      </div>
    </main>
  );
}
