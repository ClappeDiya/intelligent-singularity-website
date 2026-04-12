import { Suspense } from 'react';
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

async function HomeContent({ locale }: { locale: string }) {
  const [hp, itu, flagships, commitments] = await Promise.all([
    fetchHomepageContent(locale),
    fetchITUData(locale),
    fetchFlagshipProducts(locale),
    fetchCommitments(locale),
  ]) as [HomepageContent, ITUData, Product[], CommitmentItem[]];

  const estBytes = 48_000;
  const grams = bytesToGrams(estBytes, 0.8);

  return (
    <>
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
      <section className="px-4 sm:px-6 md:px-8 lg:px-12 py-16 md:py-20 lg:py-[120px]" style={{ borderTop: '1px solid var(--color-rule)' }}>
        <GreenStrip pageBytes={estBytes} carbonGrams={grams} />
      </section>
      <CommitmentsSection title={hp.commitmentsTitle} lead={hp.commitmentsLead} items={commitments} />
    </>
  );
}

export default async function HomePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  return (
    <Suspense fallback={<div className="px-4 sm:px-6 md:px-8 lg:px-12 py-16 md:py-20 lg:py-[120px]">Loading...</div>}>
      <HomeContent locale={locale} />
    </Suspense>
  );
}
