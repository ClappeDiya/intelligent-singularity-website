'use client';

import { useLocale } from 'next-intl';
import { useRouter, usePathname } from 'next/navigation';
import { LOCALES, LOCALE_LABELS, LOCALE_NAMES, type Locale } from '@/i18n/config';

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
  const router = useRouter();
  const pathname = usePathname();

  function onPick(locale: Locale) {
    setLocaleCookie(locale);
    router.push(replaceLocaleInPath(pathname, locale));
  }

  return (
    <div className="flex flex-wrap gap-2 mt-[6px]" role="group" aria-label="Language selector">
      {LOCALES.map((l) => {
        const active = l === current;
        return (
          <button
            key={l}
            type="button"
            onClick={() => onPick(l)}
            aria-label={`Switch language to ${LOCALE_NAMES[l]}`}
            aria-pressed={active}
            className={`w-[34px] h-[34px] rounded-full border flex items-center justify-center text-[10px] font-[var(--font-mono)] transition ${
              active
                ? 'bg-[var(--color-mint)] text-[var(--color-ink)] border-[var(--color-mint)]'
                : 'border-[var(--color-rule)] text-[var(--color-cream-dim)] hover:border-[var(--color-mint)] hover:text-[var(--color-mint)]'
            }`}
          >
            {LOCALE_LABELS[l]}
          </button>
        );
      })}
    </div>
  );
}
