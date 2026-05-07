import { getTranslations } from 'next-intl/server';

export async function PageLoading() {
  const t = await getTranslations('common');
  return (
    <div className="px-4 sm:px-6 md:px-8 lg:px-12 py-16 md:py-20 lg:py-[120px]">
      {t('loading')}
    </div>
  );
}
