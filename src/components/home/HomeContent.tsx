import Link from 'next/link';
import { HeroCounter } from '@/components/home/HeroCounter';
import { FactsSection } from '@/components/home/FactsSection';
import { FlagshipsSection } from '@/components/home/FlagshipsSection';
import { CommitmentsSection } from '@/components/home/CommitmentsSection';
import { GreenStrip } from '@/components/home/GreenStrip';
import {
  fetchHomepageContent,
  fetchITUData,
  fetchFlagshipProducts,
  fetchCommitments,
} from '@/lib/payload';
import { bytesToGrams } from '@/lib/carbon';
import type { ITUData, Product, CommitmentItem } from '@/types/cms';
import { JsonLd } from '@/components/seo/JsonLd';
import { getWebPageSchema } from '@/lib/schema';

type HomepageContent = {
  heroLabel: string;
  heroTagline: string;
  heroCtaPrimary: string;
  heroCtaSecondary: string;
  factsTitle: string;
  factsLead: string;
  flagshipsTitle: string;
  flagshipsLead: string;
  seeAllPortfolioLine: string;
  commitmentsTitle: string;
  commitmentsLead: string;
};

export async function HomeContent({ locale }: { locale: string }) {
  const [hp, itu, flagships, commitments] = await Promise.all([
    fetchHomepageContent(locale),
    fetchITUData(locale),
    fetchFlagshipProducts(locale),
    fetchCommitments(locale),
  ]) as [HomepageContent, ITUData, Product[], CommitmentItem[]];

  const estBytes = 48_000;
  const grams = bytesToGrams(estBytes, 0.8);
  const webPageSchema = getWebPageSchema({
    locale,
    pathname: '/',
    name: 'Intelligent Singularity | Software For Universal Access',
    description:
      'A mission-driven studio building AI-augmented software for universal access across business, health, finance, and work.',
  });

  return (
    <div className="page-home">
      <JsonLd id={`homepage-schema-${locale}`} data={webPageSchema} />
      <HeroCounter
        value={itu.offlineCount}
        label={hp.heroLabel}
        tagline={hp.heroTagline}
        primaryCta={hp.heroCtaPrimary}
        secondaryCta={hp.heroCtaSecondary}
      />
      <FactsSection title={hp.factsTitle} lead={hp.factsLead} itu={itu} />
      <FlagshipsSection
        title={hp.flagshipsTitle}
        lead={hp.flagshipsLead}
        flagships={flagships}
        seeAllLine={hp.seeAllPortfolioLine}
      />
      <section className="px-4 sm:px-6 md:px-8 lg:px-12 py-4 md:py-6 lg:py-8">
        <GreenStrip pageBytes={estBytes} carbonGrams={grams} />
      </section>
      <CommitmentsSection title={hp.commitmentsTitle} lead={hp.commitmentsLead} items={commitments} />
      <section
        aria-labelledby="insights-callout"
        className="my-20 rounded-[24px] p-8 md:p-12 flex flex-col md:flex-row items-start md:items-center gap-6"
        style={{ background: 'var(--color-paper-warm)' }}
      >
        <div className="flex-1">
          <div className="text-[12.5px] uppercase" style={{ fontFamily: 'var(--font-mono)', color: 'var(--color-mint-ink)' }}>
            Field notes
          </div>
          <h2
            id="insights-callout"
            className="mt-2 mb-3"
            style={{
              fontFamily: 'var(--font-serif)',
              fontSize: 'clamp(24px, 3vw, 36px)',
              letterSpacing: '-0.025em',
              fontWeight: 600,
              lineHeight: 1.1,
              color: 'var(--color-paper-ink)',
            }}
          >
            How we think about building this.
          </h2>
          <p className="text-[15px] leading-[1.7] max-w-[52ch]" style={{ color: 'rgba(20,20,19,0.72)' }}>
            Short, grounded essays from the studio. We write slowly and cite everything. No clickbait, no thought-leadership fog.
          </p>
        </div>
        <Link
          href={`/${locale}/insights`}
          className="inline-flex items-center gap-2 px-6 py-[11px] rounded-full bg-[var(--color-paper-ink)] text-[var(--color-cream)] text-[13px] uppercase"
          style={{ fontFamily: 'var(--font-mono)', fontWeight: 500 }}
        >
          Read our field notes →
        </Link>
      </section>
    </div>
  );
}
