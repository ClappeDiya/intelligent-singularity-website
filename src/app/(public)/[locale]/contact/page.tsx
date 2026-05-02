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
    hint: 'Product questions, intros, or just to say hi.',
  },
  {
    label: 'Press',
    email: 'press@intelligentsingularityinc.com',
    hint: 'Interviews, quotes, founder availability, story leads.',
  },
  {
    label: 'Partnerships',
    email: 'partners@intelligentsingularityinc.com',
    hint: 'NGOs, governments, enterprise collaboration, grant funding.',
  },
  {
    label: 'Careers',
    email: 'careers@intelligentsingularityinc.com',
    hint: 'Open roles, introductions, references.',
  },
  {
    label: 'Security',
    email: 'security@intelligentsingularityinc.com',
    hint: 'Vulnerability reports — acknowledged within one business day.',
  },
  {
    label: 'Accessibility',
    email: 'accessibility@intelligentsingularityinc.com',
    hint: 'Report a barrier on the site or in any product.',
  },
  {
    label: 'Privacy',
    email: 'privacy@intelligentsingularityinc.com',
    hint: 'Data access, correction, deletion, portability requests.',
  },
  {
    label: 'Legal',
    email: 'legal@intelligentsingularityinc.com',
    hint: 'DPAs, MSAs, formal notices, regulatory inquiries.',
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
      <h1 className="page-title">{contact.title || 'Get in touch'}</h1>
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
              Direct channels
            </div>
            <ul className="flex flex-col gap-5">
              {CHANNELS.map((c) => (
                <li key={c.label}>
                  <div
                    className="text-[10px] uppercase tracking-[0.1em] mb-1.5"
                    style={{ fontFamily: 'var(--font-mono)', color: 'rgba(17,24,39,0.72)' }}
                  >
                    {c.label}
                  </div>
                  <a
                    href={`mailto:${c.email}`}
                    className="text-[15px] text-[var(--color-paper-ink)] underline underline-offset-4 decoration-[rgba(16,185,129,0.2)] hover:decoration-[var(--color-emerald-ink)] hover:text-[var(--color-emerald-ink)] break-all"
                  >
                    {c.email}
                  </a>
                  <p className="text-[13px] leading-[1.6] mt-1.5" style={{ color: 'rgba(17,24,39,0.78)' }}>
                    {c.hint}
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
              Response time
            </div>
            <p className="text-[14px] leading-[1.75]" style={{ color: 'rgba(17,24,39,0.78)' }}>
              A human reads every message. We reply within two business days across UTC−07:00
              (Mountain) working hours. Security and legal inquiries are
              prioritised — security reports are acknowledged within one
              business day. We can reply in any of the fourteen languages this
              site speaks.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-3 text-[12px]" style={{ fontFamily: 'var(--font-mono)' }}>
            <div
              className="rounded-2xl p-5"
              style={{ border: '1px solid rgba(16,185,129,0.15)', background: 'rgba(255,255,255,0.95)' }}
            >
              <div className="text-[10px] uppercase tracking-[0.1em] mb-2" style={{ color: 'rgba(17,24,39,0.72)', fontFamily: 'var(--font-mono)' }}>HQ</div>
              <div className="text-[13.5px] leading-[1.5]" style={{ color: 'var(--color-paper-ink)' }}>
                Alberta, Canada
                <br />
                Incorporated 2024
              </div>
            </div>
            <div
              className="rounded-2xl p-5"
              style={{ border: '1px solid rgba(16,185,129,0.15)', background: 'rgba(255,255,255,0.95)' }}
            >
              <div className="text-[10px] uppercase tracking-[0.1em] mb-2" style={{ color: 'rgba(17,24,39,0.72)', fontFamily: 'var(--font-mono)' }}>Privacy</div>
              <div className="text-[13.5px] leading-[1.5]" style={{ color: 'var(--color-paper-ink)' }}>
                No trackers.
                <br />
                Email delivery only.
              </div>
            </div>
            <div
              className="rounded-2xl p-5"
              style={{ border: '1px solid rgba(16,185,129,0.15)', background: 'rgba(255,255,255,0.95)' }}
            >
              <div className="text-[10px] uppercase tracking-[0.1em] mb-2" style={{ color: 'rgba(17,24,39,0.72)', fontFamily: 'var(--font-mono)' }}>Languages</div>
              <div className="text-[13.5px] leading-[1.5]" style={{ color: 'var(--color-paper-ink)' }}>
                14 shipping locales.
                <br />
                Including Arabic & Urdu RTL.
              </div>
            </div>
            <div
              className="rounded-2xl p-5"
              style={{ border: '1px solid rgba(16,185,129,0.15)', background: 'rgba(255,255,255,0.95)' }}
            >
              <div className="text-[10px] uppercase tracking-[0.1em] mb-2" style={{ color: 'rgba(17,24,39,0.72)', fontFamily: 'var(--font-mono)' }}>Hosting</div>
              <div className="text-[13.5px] leading-[1.5]" style={{ color: 'var(--color-paper-ink)' }}>
                Single VPS, Edmonton.
                <br />
                No third-party CDN.
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
    <Suspense fallback={<div className="px-4 sm:px-6 md:px-8 lg:px-12 py-16 md:py-20 lg:py-[120px]">Loading...</div>}>
      <ContactContent locale={locale} />
    </Suspense>
  );
}
