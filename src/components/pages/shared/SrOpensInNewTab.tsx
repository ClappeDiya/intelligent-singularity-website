import { getTranslations } from 'next-intl/server';

export async function SrOpensInNewTab() {
  const t = await getTranslations('common');
  return <span className="sr-only"> {t('opensInNewTab')}</span>;
}
