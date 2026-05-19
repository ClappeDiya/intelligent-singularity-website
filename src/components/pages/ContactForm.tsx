'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';

type Props = {
  successMessage: string;
  errorMessage: string;
  privacyNote: string;
};

const labelClass =
  'text-[12.5px] uppercase text-[var(--color-paper-ink)] flex items-center gap-1';

const fieldClass =
  'bg-white border px-4 py-[13px] text-[15px] text-[var(--color-paper-ink)] rounded-[14px] focus:outline-none focus:border-[var(--color-emerald)] focus:ring-2 focus:ring-[rgba(16,185,129,0.18)] transition-colors';

const fieldStyle: React.CSSProperties = {
  borderColor: 'rgba(16,185,129,0.28)',
};

const RequiredMark = () => (
  <span aria-hidden="true" className="text-[var(--color-emerald-ink)] ms-0.5">*</span>
);

export function ContactForm({ successMessage, errorMessage, privacyNote }: Props) {
  const [state, setState] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle');
  const t = useTranslations('contactForm');

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setState('sending');
    try {
      const data = new FormData(e.currentTarget);
      const res = await fetch('/api/contact', {
        method: 'POST',
        body: data,
      });
      setState(res.ok ? 'sent' : 'error');
    } catch {
      setState('error');
    }
  }

  if (state === 'sent')
    return (
      <p role="status" aria-live="polite" aria-atomic="true" className="text-[var(--color-emerald-ink)] text-[18px]">
        {successMessage}
      </p>
    );

  return (
    <form onSubmit={onSubmit} className="flex flex-col gap-6 max-w-[720px]" aria-busy={state === 'sending'}>
      <div className="flex flex-col gap-5">
        <label className="flex flex-col gap-2">
          <span
            className={labelClass}
            style={{ fontFamily: 'var(--font-mono)', fontWeight: 500 }}
          >
            {t('routingLabel')}<RequiredMark />
          </span>
          <select name="route" required aria-required="true" className={fieldClass} style={fieldStyle}>
            <option value="general">{t('routeGeneral')}</option>
            <option value="press">{t('routePress')}</option>
            <option value="partnerships">{t('routePartnerships')}</option>
            <option value="legal">{t('routeLegal')}</option>
          </select>
        </label>
        <label className="flex flex-col gap-2">
          <span
            className={labelClass}
            style={{ fontFamily: 'var(--font-mono)', fontWeight: 500 }}
          >
            {t('nameLabel')}<RequiredMark />
          </span>
          <input type="text" name="name" required aria-required="true" autoComplete="name" className={fieldClass} style={fieldStyle} />
        </label>
        <label className="flex flex-col gap-2">
          <span
            className={labelClass}
            style={{ fontFamily: 'var(--font-mono)', fontWeight: 500 }}
          >
            {t('emailLabel')}<RequiredMark />
          </span>
          <input type="email" name="from" required aria-required="true" autoComplete="email" className={fieldClass} style={fieldStyle} />
        </label>
        <label className="flex flex-col gap-2">
          <span
            className={labelClass}
            style={{ fontFamily: 'var(--font-mono)', fontWeight: 500 }}
          >
            {t('subjectLabel')}<RequiredMark />
          </span>
          <input type="text" name="subject" required aria-required="true" autoComplete="off" className={fieldClass} style={fieldStyle} />
        </label>
        <label className="flex flex-col gap-2">
          <span
            className={labelClass}
            style={{ fontFamily: 'var(--font-mono)', fontWeight: 500 }}
          >
            {t('messageLabel')}<RequiredMark />
          </span>
          <textarea name="body" required aria-required="true" aria-describedby="contact-privacy-note" rows={8} className={fieldClass} style={fieldStyle} />
        </label>
        <p id="contact-privacy-note" className="text-[13.5px] text-[var(--color-paper-ink-muted)] leading-[1.65]">{privacyNote}</p>
      </div>
      <button
        type="submit"
        disabled={state === 'sending'}
        aria-busy={state === 'sending'}
        className="w-full sm:w-auto rounded-full text-[var(--color-cream)] py-[13px] px-8 font-semibold text-[13px] uppercase transition-all hover:-translate-y-0.5 disabled:opacity-70 disabled:translate-y-0"
        style={{
          fontFamily: 'var(--font-mono)',
          background: 'var(--color-emerald-ink)',
          boxShadow: '0 2px 10px rgba(16,185,129,0.28)',
        }}
      >
        {state === 'sending' ? t('sendingButton') : (
          <>{t('sendButton')} <span aria-hidden="true">→</span></>
        )}
      </button>
      <div aria-live="assertive" aria-atomic="true">
        {state === 'error' && (
          <p role="alert" className="text-[#b04a3a]">
            {errorMessage}
          </p>
        )}
      </div>
    </form>
  );
}
