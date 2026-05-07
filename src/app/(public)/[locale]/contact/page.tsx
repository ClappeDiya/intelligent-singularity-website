import { Suspense } from 'react';
import { PageLoading } from '@/components/pages/shared/PageLoading';
import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import { ContactForm } from '@/components/pages/ContactForm';
import { fetchContactPage } from '@/lib/payload';
import { buildPageMetadata } from '@/lib/seo';
import { JsonLd } from '@/components/seo/JsonLd';
import { getBreadcrumbSchema, getWebPageSchema } from '@/lib/schema';

const CHANNEL_SLUGS = [
  { slug: 'general', email: 'hello@intelligentsingularityinc.com' },
  { slug: 'press', email: 'press@intelligentsingularityinc.com' },
  { slug: 'partnerships', email: 'partners@intelligentsingularityinc.com' },
  { slug: 'careers', email: 'careers@intelligentsingularityinc.com' },
  { slug: 'security', email: 'security@intelligentsingularityinc.com' },
  { slug: 'accessibility', email: 'accessibility@intelligentsingularityinc.com' },
  { slug: 'privacy', email: 'privacy@intelligentsingularityinc.com' },
  { slug: 'legal', email: 'legal@intelligentsingularityinc.com' },
] as const;

async function ContactContent({ locale }: { locale: string }) {
  const contact = await fetchContactPage(locale);
  const t = await getTranslations('pages.contact');
  const webPageSchema = getWebPageSchema({
    locale,
    pathname: '/contact',
    name: 'Contact | Intelligent Singularity',
    description:
      'Contact Intelligent Singularity for partnerships, press, legal, or product inquiries about our universal-access software ecosystem.',
    type: 'ContactPage',
  });
  const breadcrumbSchema = getBreadcrumbSchema({
    locale,
    crumbs: [
      { name: 'Home', pathname: '/' },
      { name: 'Contact', pathname: '/contact' },
    ],
  });
  return (
    <article className="page-shell-wide">
      <JsonLd id={`contact-schema-${locale}`} data={webPageSchema} />
      <JsonLd id={`contact-breadcrumb-schema-${locale}`} data={breadcrumbSchema} />
      <div className="page-label">{t('eyebrow')}</div>
      <h1 className="page-title">{contact.title || t('titleFallback')}</h1>
      <p className="page-lead">{contact.lead}</p>

      <div className="grid grid-cols-1 lg:grid-cols-[1.1fr_.9fr] gap-12 lg:gap-20">
        <section aria-labelledby="contact-form-heading">
          <h2 id="contact-form-heading" className="sr-only">Contact form</h2>
          <ContactForm
            successMessage={contact.successMessage}
            errorMessage={contact.errorMessage}
            privacyNote={contact.privacyNote}
          />
        </section>

        <div className="flex flex-col gap-6">
          <div
            className="is-card rounded-[24px] p-7"
          >
            <div
              className="label-mono mb-4"
            >
              {t('directChannelsLabel')}
            </div>
            <ul className="flex flex-col gap-5">
              {CHANNEL_SLUGS.map((c) => (
                <li key={c.slug}>
                  <div
                    className="text-[10px] uppercase tracking-[0.1em] mb-1.5"
                    style={{ fontFamily: 'var(--font-mono)', color: 'rgba(17,24,39,0.72)' }}
                  >
                    {t(`channels.${c.slug}.label`)}
                  </div>
                  <a
                    href={`mailto:${c.email}`}
                    className="text-[15px] text-[var(--color-paper-ink)] underline underline-offset-4 decoration-[rgba(16,185,129,0.2)] hover:decoration-[var(--color-emerald-ink)] hover:text-[var(--color-emerald-ink)] break-all"
                  >
                    {c.email}
                  </a>
                  <p className="text-[13px] leading-[1.6] mt-1.5" style={{ color: 'rgba(17,24,39,0.78)' }}>
                    {t(`channels.${c.slug}.hint`)}
                  </p>
                </li>
              ))}
            </ul>
          </div>

          <div
            className="rounded-[24px] p-7"
            style={{
              border: '1px solid rgba(16,185,129,0.2)',
              background: 'linear-gradient(180deg, rgba(16,185,129,0.08) 0%, rgba(16,185,129,0.02) 100%)',
            }}
          >
            <div className="label-mono mb-3">
              {t('responseTimeLabel')}
            </div>
            <p className="text-[14px] leading-[1.75]" style={{ color: 'rgba(17,24,39,0.78)' }}>
              {t('responseTimeBody')}
            </p>
          </div>

          <div className="grid grid-cols-2 gap-3 text-[12px]" style={{ fontFamily: 'var(--font-mono)' }}>
            <div
              className="rounded-2xl p-5"
              style={{ border: '1px solid rgba(16,185,129,0.15)', background: 'rgba(255,255,255,0.95)' }}
            >
              <div className="text-[10px] uppercase tracking-[0.1em] mb-2" style={{ color: 'rgba(17,24,39,0.72)', fontFamily: 'var(--font-mono)' }}>{t('factHqLabel')}</div>
              <div className="text-[13.5px] leading-[1.5]" style={{ color: 'var(--color-paper-ink)' }}>
                {t('factHqLine1')}
                <br />
                {t('factHqLine2')}
              </div>
            </div>
            <div
              className="rounded-2xl p-5"
              style={{ border: '1px solid rgba(16,185,129,0.15)', background: 'rgba(255,255,255,0.95)' }}
            >
              <div className="text-[10px] uppercase tracking-[0.1em] mb-2" style={{ color: 'rgba(17,24,39,0.72)', fontFamily: 'var(--font-mono)' }}>{t('factPrivacyLabel')}</div>
              <div className="text-[13.5px] leading-[1.5]" style={{ color: 'var(--color-paper-ink)' }}>
                {t('factPrivacyLine1')}
                <br />
                {t('factPrivacyLine2')}
              </div>
            </div>
            <div
              className="rounded-2xl p-5"
              style={{ border: '1px solid rgba(16,185,129,0.15)', background: 'rgba(255,255,255,0.95)' }}
            >
              <div className="text-[10px] uppercase tracking-[0.1em] mb-2" style={{ color: 'rgba(17,24,39,0.72)', fontFamily: 'var(--font-mono)' }}>{t('factLanguagesLabel')}</div>
              <div className="text-[13.5px] leading-[1.5]" style={{ color: 'var(--color-paper-ink)' }}>
                {t('factLanguagesLine1')}
                <br />
                {t('factLanguagesLine2')}
              </div>
            </div>
            <div
              className="rounded-2xl p-5"
              style={{ border: '1px solid rgba(16,185,129,0.15)', background: 'rgba(255,255,255,0.95)' }}
            >
              <div className="text-[10px] uppercase tracking-[0.1em] mb-2" style={{ color: 'rgba(17,24,39,0.72)', fontFamily: 'var(--font-mono)' }}>{t('factHostingLabel')}</div>
              <div className="text-[13.5px] leading-[1.5]" style={{ color: 'var(--color-paper-ink)' }}>
                {t('factHostingLine1')}
                <br />
                {t('factHostingLine2')}
              </div>
            </div>
          </div>
        </div>
      </div>
    </article>
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  return buildPageMetadata({
    locale,
    pathname: '/contact',
    title: 'Contact | Intelligent Singularity',
    description:
      'Contact Intelligent Singularity for partnerships, press, legal, or product inquiries about our universal-access software ecosystem.',
  });
}

export default async function ContactPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  return (
    <Suspense fallback={<PageLoading />}>
      <ContactContent locale={locale} />
    </Suspense>
  );
}
