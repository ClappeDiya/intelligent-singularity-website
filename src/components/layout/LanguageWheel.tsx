'use client';

import Link from 'next/link';
import { useLocale, useTranslations } from 'next-intl';
import { usePathname, useSearchParams } from 'next/navigation';
import { useSyncExternalStore } from 'react';
import { LOCALES, LOCALE_LABELS, LOCALE_NAMES } from '@/i18n/config';

function subscribeHash(callback: () => void) {
  if (typeof window === 'undefined') return () => {};
  window.addEventListener('hashchange', callback);
  return () => window.removeEventListener('hashchange', callback);
}

function getHashSnapshot() {
  return typeof window !== 'undefined' ? window.location.hash : '';
}

function getServerHashSnapshot() {
  return '';
}

function setLocaleCookie(locale: string) {
  const oneYear = 60 * 60 * 24 * 365;
  document.cookie = `NEXT_LOCALE=${locale}; path=/; max-age=${oneYear}; SameSite=Lax`;
}

function replaceLocaleInPath(path: string, newLocale: string): string {
  const segments = path.split('/').filter(Boolean);
  if (segments.length > 0 && (LOCALES as readonly string[]).includes(segments[0])) {
    segments[0] = newLocale;
    return '/' + segments.join('/');
  }
  return `/${newLocale}${path}`;
}

export function LanguageWheel() {
  const current = useLocale();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const search = searchParams.toString();
  const hash = useSyncExternalStore(subscribeHash, getHashSnapshot, getServerHashSnapshot);
  const suffix = `${search ? `?${search}` : ''}${hash}`;
  const t = useTranslations('languageWheel');

  return (
    <nav className="flex flex-wrap gap-2" aria-label={t('navAria')}>
      {LOCALES.map((l) => {
        const active = l === current;
        return (
          <Link
            key={l}
            href={`${replaceLocaleInPath(pathname, l)}${suffix}`}
            onClick={() => setLocaleCookie(l)}
            aria-label={`${LOCALE_LABELS[l]} · ${t('switchTo', { language: LOCALE_NAMES[l] })}`}
            {...(active ? { 'aria-current': 'page' as const } : {})}
            title={LOCALE_NAMES[l]}
            className={`min-w-[36px] h-[32px] px-2 rounded-full border flex items-center justify-center text-[10.5px] font-[var(--font-mono)] uppercase tracking-[0.06em] transition ${
              active
                ? 'bg-[var(--color-mint)] text-[var(--color-ink)] border-[var(--color-mint)]'
                : 'border-[rgba(246,241,231,0.40)] text-[var(--color-cream-soft)] hover:border-[var(--color-mint)] hover:text-[var(--color-mint)]'
            }`}
          >
            {LOCALE_LABELS[l]}
          </Link>
        );
      })}
    </nav>
  );
}
