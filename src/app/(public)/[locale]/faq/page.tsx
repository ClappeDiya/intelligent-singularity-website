import Link from 'next/link';
import type { Metadata } from 'next';
import { buildPageMetadata } from '@/lib/seo';
import { JsonLd } from '@/components/seo/JsonLd';
import { getBreadcrumbSchema, getWebPageSchema } from '@/lib/schema';

type QA = { q: string; a: string };
type Section = { title: string; items: QA[] };

const SECTIONS: Section[] = [
  {
    title: 'The studio',
    items: [
      {
        q: 'What is Intelligent Singularity?',
        a: 'A small studio in Alberta, Canada that builds software for universal access. One small team. Fourteen tools shipping under one mission: close the gap between the software a Fortune 500 has and the software a one-person business can afford.',
      },
      {
        q: 'Are you a venture-backed startup?',
        a: 'No. We are self-funded and bootstrapped. That means we answer to users, not to investors chasing quick exits. We take longer to ship, and we plan to be around in twenty years.',
      },
      {
        q: 'Who is behind this?',
        a: 'Dr. Md Diya founded the studio in 2024 after thirty-four years of global medical practice across multiple continents. A small, remote, AI-augmented team ships each product under one shared stack.',
      },
      {
        q: 'How do you make money if your apps are affordable?',
        a: 'Products have a free-forever tier that runs a real business. Paid tiers add scale, not features. Pricing is adjusted for purchasing power so a plan that costs twenty dollars in Toronto costs less in Lagos. That keeps the math fair and keeps us in business.',
      },
    ],
  },
  {
    title: 'The products',
    items: [
      {
        q: 'Are these products real or still ideas?',
        a: 'Every product on the portfolio page has an honest status label. "Live" means you can sign up today. "Staging" means it runs but is invite-only while we harden it. "Awaiting approval" is ready but waiting on a regulator. "Infrastructure" is code we share publicly that other products rely on.',
      },
      {
        q: 'Why are some products listed as staging?',
        a: 'Most of our tools are still being hardened before public launch. We would rather ship late than break trust on day one. If you want early access, write to us from the contact page.',
      },
      {
        q: 'Why do products link out to other domains?',
        a: 'Each product is its own service with its own terms, pricing, and sign-up. Sending you directly there is faster than making you click twice.',
      },
      {
        q: 'Can I use your products offline?',
        a: 'Yes. Every product is designed to work on slow and intermittent networks. We target two-bar 2G as a baseline, not as a nice-to-have.',
      },
    ],
  },
  {
    title: 'Privacy and data',
    items: [
      {
        q: 'Do you track me on this website?',
        a: 'No. This site has zero analytics, zero pixels, zero tracking cookies, and zero content from third parties. The only data we see is what you type into the contact form and hit send on.',
      },
      {
        q: 'Where is my data stored?',
        a: 'When you contact us, your message is sent by email to a self-hosted inbox. We do not store it in a database on this site. Product-specific data (when you sign up for one of our tools) is described in that product\u2019s own privacy policy on its own domain.',
      },
      {
        q: 'Can I delete data you hold about me?',
        a: 'Yes. Email legal@intelligentsingularityinc.com from the address you contacted us with and we will confirm the removal within three business days.',
      },
    ],
  },
  {
    title: 'Partnerships and press',
    items: [
      {
        q: 'How do I partner with the studio?',
        a: 'We work with NGOs, governments, and enterprises who want to put universal-access software in the hands of people who cannot usually afford it. Send a short note from the contact page, routed to Partnerships, and you will hear back within two business days.',
      },
      {
        q: 'Where can I find a press kit?',
        a: (
          // Using string join so the JSX stays clean below
          'Visit the press page for the wordmark, founder portrait, fact sheet, and approved quotes. If you need something specific, email press@intelligentsingularityinc.com.'
        ),
      },
      {
        q: 'Do you speak at conferences?',
        a: 'Occasionally, on universal access, AI-augmented operations, and lean software economics. Write to press@intelligentsingularityinc.com with the event details.',
      },
    ],
  },
];

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  return buildPageMetadata({
    locale,
    pathname: '/faq',
    title: 'FAQ | Intelligent Singularity',
    description:
      'Honest answers about the studio, our products, privacy practices, and how to partner with Intelligent Singularity.',
  });
}

export default async function FaqPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const webPageSchema = getWebPageSchema({
    locale,
    pathname: '/faq',
    name: 'FAQ | Intelligent Singularity',
    description:
      'Honest answers about the studio, our products, privacy practices, and how to partner with Intelligent Singularity.',
  });
  const breadcrumbSchema = getBreadcrumbSchema({
    locale,
    crumbs: [
      { name: 'Home', pathname: '/' },
      { name: 'FAQ', pathname: '/faq' },
    ],
  });

  return (
    <article className="page-shell-wide">
      <JsonLd id={`faq-schema-${locale}`} data={webPageSchema} />
      <JsonLd id={`faq-breadcrumb-schema-${locale}`} data={breadcrumbSchema} />
      <div className="page-label">FAQ · Plain answers</div>
      <h1 className="page-title">Questions, answered plainly.</h1>
      <p className="page-lead">
        What people actually ask us — about the studio, the products, and the
        privacy trade-offs of using our tools.
      </p>

      <div className="flex flex-col gap-14">
        {SECTIONS.map((section, si) => (
          <section key={section.title} aria-labelledby={`faq-${si}`}>
            <div
              className="mb-6 flex items-baseline gap-4"
              style={{ borderBottom: '1px solid rgba(20,20,19,0.1)', paddingBottom: '14px' }}
            >
              <div
                className="text-[12.5px] uppercase text-[var(--color-mint)]"
                style={{ fontFamily: 'var(--font-mono)', fontWeight: 500 }}
              >
                {String(si + 1).padStart(2, '0')}
              </div>
              <h2
                id={`faq-${si}`}
                className="text-[var(--color-paper-ink)]"
                style={{
                  fontFamily: 'var(--font-serif)',
                  fontSize: 'clamp(26px, 3vw, 38px)',
                  letterSpacing: '-0.03em',
                  lineHeight: 1.05,
                  fontWeight: 600,
                }}
              >
                {section.title}
              </h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-6">
              {section.items.map((it, i) => (
                <details
                  key={i}
                  className="rounded-[20px] p-6 md:p-7"
                  style={{ background: 'var(--color-paper-soft)' }}
                >
                  <summary
                    className="cursor-pointer list-none flex items-start justify-between gap-4 text-[17px] md:text-[18px]"
                    style={{
                      fontFamily: 'var(--font-serif)',
                      fontWeight: 600,
                      color: 'var(--color-paper-ink)',
                      letterSpacing: '-0.015em',
                      lineHeight: 1.25,
                    }}
                  >
                    <span>{it.q}</span>
                    <span
                      aria-hidden="true"
                      className="mt-1 inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full"
                      style={{
                        background: 'rgba(108,143,122,0.12)',
                        color: 'var(--color-mint)',
                        fontFamily: 'var(--font-mono)',
                        fontSize: '14px',
                      }}
                    >
                      +
                    </span>
                  </summary>
                  <p
                    className="mt-4 text-[15px] leading-[1.78]"
                    style={{ color: 'rgba(20,20,19,0.78)' }}
                  >
                    {it.a}
                  </p>
                </details>
              ))}
            </div>
          </section>
        ))}
      </div>

      <section
        className="mt-20 rounded-[24px] p-8 md:p-10 flex flex-col md:flex-row items-start md:items-center gap-6 md:gap-10"
        style={{ background: 'var(--color-paper-warm)' }}
      >
        <div className="flex-1">
          <div
            className="text-[12.5px] uppercase text-[var(--color-mint)] mb-2"
            style={{ fontFamily: 'var(--font-mono)', fontWeight: 500 }}
          >
            Still have a question?
          </div>
          <h3
            className="mb-2 text-[var(--color-paper-ink)]"
            style={{
              fontFamily: 'var(--font-serif)',
              fontSize: 'clamp(22px, 2.4vw, 30px)',
              letterSpacing: '-0.025em',
              fontWeight: 600,
              lineHeight: 1.15,
            }}
          >
            A human reads every message.
          </h3>
          <p className="text-[15px] leading-[1.7] text-[rgba(20,20,19,0.72)] max-w-[50ch]">
            We usually reply within two business days. Send a note through the
            contact form or email hello@intelligentsingularityinc.com directly.
          </p>
        </div>
        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
          <Link
            href="/contact"
            className="inline-flex items-center justify-center gap-2 px-6 py-[11px] rounded-full bg-[var(--color-paper-ink)] text-[var(--color-cream)] text-[13px] uppercase"
            style={{ fontFamily: 'var(--font-mono)', fontWeight: 500 }}
          >
            Open the form
            <span aria-hidden="true">→</span>
          </Link>
          <a
            href="mailto:hello@intelligentsingularityinc.com"
            className="inline-flex items-center justify-center gap-2 px-6 py-[11px] rounded-full border text-[13px] uppercase"
            style={{
              fontFamily: 'var(--font-mono)',
              fontWeight: 500,
              borderColor: 'rgba(20,20,19,0.18)',
              color: 'var(--color-paper-ink)',
            }}
          >
            Email directly
          </a>
        </div>
      </section>
    </article>
  );
}
