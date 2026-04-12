'use client';

import { useState } from 'react';

type Props = {
  successMessage: string;
  errorMessage: string;
  privacyNote: string;
};

export function ContactForm({ successMessage, errorMessage, privacyNote }: Props) {
  const [state, setState] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle');

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setState('sending');
    const data = new FormData(e.currentTarget);
    const res = await fetch('/api/contact', {
      method: 'POST',
      body: data,
    });
    setState(res.ok ? 'sent' : 'error');
  }

  if (state === 'sent') return <p className="text-[var(--color-mint)] text-[18px]">{successMessage}</p>;

  return (
    <form onSubmit={onSubmit} className="flex flex-col gap-6 max-w-[640px]">
      <label className="flex flex-col gap-2">
        <span className="font-[var(--font-mono)] text-[11px] uppercase tracking-[0.15em] text-[var(--color-mint)]">Routing</span>
        <select name="route" required className="bg-transparent border border-[var(--color-rule)] px-4 py-3 text-[var(--color-cream)]">
          <option value="general">General inquiry</option>
          <option value="press">Press</option>
          <option value="partnerships">Partnerships</option>
          <option value="legal">Legal</option>
        </select>
      </label>
      <label className="flex flex-col gap-2">
        <span className="font-[var(--font-mono)] text-[11px] uppercase tracking-[0.15em] text-[var(--color-mint)]">Name</span>
        <input type="text" name="name" required className="bg-transparent border border-[var(--color-rule)] px-4 py-3 text-[var(--color-cream)]" />
      </label>
      <label className="flex flex-col gap-2">
        <span className="font-[var(--font-mono)] text-[11px] uppercase tracking-[0.15em] text-[var(--color-mint)]">Email</span>
        <input type="email" name="from" required className="bg-transparent border border-[var(--color-rule)] px-4 py-3 text-[var(--color-cream)]" />
      </label>
      <label className="flex flex-col gap-2">
        <span className="font-[var(--font-mono)] text-[11px] uppercase tracking-[0.15em] text-[var(--color-mint)]">Subject</span>
        <input type="text" name="subject" required className="bg-transparent border border-[var(--color-rule)] px-4 py-3 text-[var(--color-cream)]" />
      </label>
      <label className="flex flex-col gap-2">
        <span className="font-[var(--font-mono)] text-[11px] uppercase tracking-[0.15em] text-[var(--color-mint)]">Message</span>
        <textarea name="body" required rows={6} className="bg-transparent border border-[var(--color-rule)] px-4 py-3 text-[var(--color-cream)]" />
      </label>
      <p className="text-[12px] text-[var(--color-cream-dim)]">{privacyNote}</p>
      <button type="submit" disabled={state === 'sending'} className="bg-[var(--color-mint)] text-[var(--color-ink)] py-3 px-6 font-semibold text-[12px] uppercase tracking-[0.14em]">
        {state === 'sending' ? 'Sending...' : 'Send'}
      </button>
      {state === 'error' && <p className="text-red-400">{errorMessage}</p>}
    </form>
  );
}
