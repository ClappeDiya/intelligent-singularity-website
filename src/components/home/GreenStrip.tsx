import { getTranslations } from 'next-intl/server';
import { formatCarbon } from '@/lib/carbon';

type Props = { pageBytes: number; carbonGrams: number };

type StatProps = { label: string; value: string; unit?: string; hint?: string };

function Stat({ label, value, unit, hint }: StatProps) {
  return (
    <div className="flex flex-col gap-1.5">
      <div
        className="text-[10.5px] uppercase tracking-[0.12em] text-[var(--color-emerald)]"
        style={{ fontFamily: 'var(--font-mono)' }}
      >
        {label}
      </div>
      <div
        className="font-semibold leading-none tracking-[-0.04em]"
        style={{
          fontFamily: 'var(--font-serif)',
          fontSize: 'clamp(28px, 3.2vw, 44px)',
          color: 'var(--color-cream)',
        }}
      >
        {value}
        {unit && (
          <span
            className="text-[0.4em] align-super ms-0.5"
            style={{ color: 'var(--color-emerald)' }}
          >
            {unit}
          </span>
        )}
      </div>
      {hint ? (
        <div className="text-[11px] text-[var(--color-cream-faint)] leading-[1.6]" style={{ fontFamily: 'var(--font-mono)' }}>
          {hint}
        </div>
      ) : null}
    </div>
  );
}

export async function GreenStrip({ pageBytes, carbonGrams }: Props) {
  const t = await getTranslations('pages.home.greenStrip');
  const kb = (pageBytes / 1024).toFixed(1);
  return (
    <div
      className="home-story-panel home-story-panel--dark"
      style={{
        paddingTop: 'clamp(36px, 4vw, 56px)',
        paddingBottom: 'clamp(36px, 4vw, 56px)',
      }}
    >
      <div className="grid grid-cols-1 lg:grid-cols-[1.1fr_1.3fr] gap-10 lg:gap-16 items-start">
        <div>
          <div
            className="text-[10.5px] uppercase tracking-[0.12em] mb-4 text-[var(--color-emerald)]"
            style={{ fontFamily: 'var(--font-mono)' }}
          >
            {t('eyebrow')}
          </div>
          <div
            className="font-semibold tracking-[-0.035em] leading-[1.05] text-[var(--color-cream)] mb-4"
            style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(28px, 3.4vw, 44px)' }}
          >
            {t('heading')}
          </div>
          <p className="text-[15px] leading-[1.8] text-[var(--color-cream-soft)] max-w-[48ch]">
            {t('body')}
          </p>
        </div>
        <div className="grid grid-cols-2 gap-x-8 gap-y-8">
          <Stat label={t('pageWeightLabel')} value={`${kb} ${t('pageWeightUnit')}`} hint={t('pageWeightHint')} />
          <Stat label={t('carbonLabel')} value={formatCarbon(carbonGrams)} hint={t('carbonHint')} />
          <Stat label={t('hostingLabel')} value={t('hostingValue')} hint={t('hostingHint')} />
          <Stat label={t('thirdPartyLabel')} value={t('thirdPartyValue')} hint={t('thirdPartyHint')} />
        </div>
      </div>
    </div>
  );
}
