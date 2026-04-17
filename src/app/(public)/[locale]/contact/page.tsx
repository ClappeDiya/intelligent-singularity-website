import { Suspense } from 'react';
import type { Metadata } from 'next';
import { ContactForm } from '@/components/pages/ContactForm';
import { fetchContactPage } from '@/lib/payload';
import { buildPageMetadata } from '@/lib/seo';
import { JsonLd } from '@/components/seo/JsonLd';
import { getBreadcrumbSchema, getWebPageSchema } from '@/lib/schema';

const CHANNELS = [
  {
    label: 'General',
    email: 'hello@intelligentsingularityinc.com',
    hint: 'For product questions, intros, or just to say hi.',
  },
  {
    label: 'Press',
    email: 'press@intelligentsingularityinc.com',
    hint: 'Interviews, quotes, and background on the mission.',
  },
  {
    label: 'Partnerships',
    email: 'partners@intelligentsingularityinc.com',
    hint: 'NGOs, governments, and enterprise collaboration.',
  },
  {
    label: 'Legal',
    email: 'legal@intelligentsingularityinc.com',
    hint: 'Data requests, DPAs, and regulatory inquiries.',
  },
];

async function ContactContent({ locale }: { locale: string }) {
  const contact = await fetchContactPage(locale);
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
      <div className="page-label">Contact · Studio desk</div>
      <h1 className="page-title">{contact.title}</h1>
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

        <aside className="flex flex-col gap-6">
          <div
            className="rounded-[24px] border p-7"
            style={{
              borderColor: 'rgba(26,22,18,0.1)',
              background: 'rgba(255,255,255,0.65)',
            }}
          >
            <div
              className="text-[10.5px] uppercase tracking-[0.24em] text-[var(--color-mint)] mb-4"
              style={{ fontFamily: 'var(--font-mono)' }}
            >
              Direct channels
            </div>
            <ul className="flex flex-col gap-5">
              {CHANNELS.map((c) => (
                <li key={c.label}>
                  <div
                    className="text-[10.5px] uppercase tracking-[0.2em] mb-1.5"
                    style={{ fontFamily: 'var(--font-mono)', color: 'rgba(26,22,18,0.56)' }}
                  >
                    {c.label}
                  </div>
                  <a
                    href={`mailto:${c.email}`}
                    className="text-[15px] text-[var(--color-paper-ink)] underline underline-offset-4 decoration-[rgba(26,22,18,0.18)] hover:decoration-[var(--color-mint)] hover:text-[var(--color-mint)] break-all"
                  >
                    {c.email}
                  </a>
                  <p className="text-[13px] text-[rgba(26,22,18,0.6)] leading-[1.6] mt-1.5">
                    {c.hint}
                  </p>
                </li>
              ))}
            </ul>
          </div>

          <div
            className="rounded-[24px] border p-7"
            style={{
              borderColor: 'rgba(108,143,122,0.22)',
              background:
                'linear-gradient(180deg, rgba(108,143,122,0.08) 0%, rgba(108,143,122,0.02) 100%)',
            }}
          >
            <div
              className="text-[10.5px] uppercase tracking-[0.24em] text-[var(--color-mint)] mb-3"
              style={{ fontFamily: 'var(--font-mono)' }}
            >
              Response time
            </div>
            <p className="text-[14px] leading-[1.75] text-[rgba(26,22,18,0.72)]">
              A human reads every message. We reply within two business days across UTC−07:00
              (Mountain) working hours. Legal and press inquiries are prioritised.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-3 text-[12px]" style={{ fontFamily: 'var(--font-mono)' }}>
            <div
              className="rounded-2xl p-5"
              style={{ border: '1px solid rgba(26,22,18,0.1)', background: 'rgba(255,255,255,0.5)' }}
            >
              <div className="uppercase tracking-[0.2em] text-[rgba(26,22,18,0.5)] mb-2">HQ</div>
              <div className="text-[13.5px] text-[var(--color-paper-ink)] leading-[1.5]">
                Alberta, Canada
                <br />
                Incorporated 2024
              </div>
            </div>
            <div
              className="rounded-2xl p-5"
              style={{ border: '1px solid rgba(26,22,18,0.1)', background: 'rgba(255,255,255,0.5)' }}
            >
              <div className="uppercase tracking-[0.2em] text-[rgba(26,22,18,0.5)] mb-2">Privacy</div>
              <div className="text-[13.5px] text-[var(--color-paper-ink)] leading-[1.5]">
                No trackers.
                <br />
                Email delivery only.
              </div>
            </div>
          </div>
        </aside>
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
    <Suspense fallback={<div className="px-4 sm:px-6 md:px-8 lg:px-12 py-16 md:py-20 lg:py-[120px]">Loading...</div>}>
      <ContactContent locale={locale} />
    </Suspense>
  );
}
