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

export default async function HomePage() {
  const locale = 'en';
  const [hp, itu, flagships, commitments] = await Promise.all([
    fetchHomepageContent(locale),
    fetchITUData(locale),
    fetchFlagshipProducts(locale),
    fetchCommitments(locale),
  ]);

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
      <section className="px-12 py-[120px]" style={{ borderTop: '1px solid var(--color-rule)' }}>
        <GreenStrip pageBytes={estBytes} carbonGrams={grams} />
      </section>
      <CommitmentsSection title={hp.commitmentsTitle} lead={hp.commitmentsLead} items={commitments} />
    </>
  );
}
