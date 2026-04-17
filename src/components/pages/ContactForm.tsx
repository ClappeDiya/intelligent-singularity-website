'use client';

import { useState } from 'react';

type Props = {
  successMessage: string;
  errorMessage: string;
  privacyNote: string;
};

const labelClass =
  'text-[12.5px] uppercase text-[var(--color-paper-ink)]';

const fieldClass =
  'bg-[var(--color-paper-soft)] border border-transparent px-4 py-[13px] text-[15px] text-[var(--color-paper-ink)] rounded-[14px] focus:outline-none focus:border-[var(--color-mint)] transition-colors';

export function ContactForm({ successMessage, errorMessage, privacyNote }: Props) {
  const [state, setState] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle');

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
      <p role="status" className="text-[var(--color-mint)] text-[18px]">
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
            Routing
          </span>
          <select name="route" required className={fieldClass}>
            <option value="general">General inquiry</option>
            <option value="press">Press</option>
            <option value="partnerships">Partnerships</option>
            <option value="legal">Legal</option>
          </select>
        </label>
        <label className="flex flex-col gap-2">
          <span
            className={labelClass}
            style={{ fontFamily: 'var(--font-mono)', fontWeight: 500 }}
          >
            Name
          </span>
          <input type="text" name="name" required className={fieldClass} />
        </label>
        <label className="flex flex-col gap-2">
          <span
            className={labelClass}
            style={{ fontFamily: 'var(--font-mono)', fontWeight: 500 }}
          >
            Email
          </span>
          <input type="email" name="from" required className={fieldClass} />
        </label>
        <label className="flex flex-col gap-2">
          <span
            className={labelClass}
            style={{ fontFamily: 'var(--font-mono)', fontWeight: 500 }}
          >
            Subject
          </span>
          <input type="text" name="subject" required className={fieldClass} />
        </label>
        <label className="flex flex-col gap-2">
          <span
            className={labelClass}
            style={{ fontFamily: 'var(--font-mono)', fontWeight: 500 }}
          >
            Message
          </span>
          <textarea name="body" required rows={8} className={fieldClass} />
        </label>
        <p className="text-[13.5px] text-[rgba(20,20,19,0.66)] leading-[1.65]">{privacyNote}</p>
      </div>
      <button
        type="submit"
        disabled={state === 'sending'}
        aria-busy={state === 'sending'}
        className="w-full sm:w-auto rounded-full bg-[var(--color-paper-ink)] text-[var(--color-cream)] py-[13px] px-8 font-semibold text-[13px] uppercase"
        style={{ fontFamily: 'var(--font-mono)' }}
      >
        {state === 'sending' ? 'Sending…' : 'Send message'}
      </button>
      {state === 'error' && (
        <p role="alert" className="text-[#b04a3a]">
          {errorMessage}
        </p>
      )}
    </form>
  );
}
