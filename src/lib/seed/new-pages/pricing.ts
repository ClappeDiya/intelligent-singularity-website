import type { Payload } from 'payload';

export const PRICING_PAGE_SEED = {
  eyebrow: 'Pricing · Our six rules',
  title: 'Fair, published, built to last.',
  lede:
    'We price each product on its own site. This page is about the rules we use everywhere. The same rules apply to a one-person shop and a five-thousand-person factory.',
  whyThisExists: {
    eyebrow: 'Why this exists',
    heading: 'Enterprise software is expensive because it was designed to be.',
    body:
      'Six-figure contracts, six-month rollouts, and six layers of consultants are not a bug of the industry — they are its business model. We reject that model. Our prices exist to keep the studio running, not to block small businesses at the door.',
    freeTierLine: 'Free tier — enough to run a real business, not a demo sandbox.',
    paidTierLine: 'Paid tier — adds scale (seats, volume, support), never unlocks features you already have.',
    enterpriseLine: 'Enterprise — the same product with procurement paperwork, SSO, and a human on call. No secret feature set.',
  },
  principles: [
    {
      label: '01',
      title: 'A free tier you can actually run a business on',
      body: 'Not a trial. Not three invoices and a timer. Every flagship has a free-forever plan with enough room for a one-person business — real records, real reports, real exports, no advertising. If you outgrow it, paid tiers add scale, never features. The one-person market stall in Lagos and the consultancy in Toronto sign up to the same plan and reach for the same upgrade button when they need more headroom.',
    },
    {
      label: '02',
      title: 'Prices adjusted for where you live',
      body: 'A plan that costs twenty dollars in Toronto costs less in Lagos. We use published purchasing-power indices from the World Bank to set fair regional prices so the same team pays the same relative cost wherever they sign up from. The developed-world customer pays full market price; the emerging-market customer pays a price that respects their currency. Nobody is priced out, and nobody subsidises a worse product.',
    },
    {
      label: '03',
      title: 'Every feature in every tier',
      body: 'AI help, automation, multi-store, deep analytics, integrations, fraud checks — all in every price tier. No "enterprise-only" gates. Higher tiers buy more seats, more volume, more support hours, and tighter SLAs. They never unlock a feature you did not already have. The grade-eight student on the free plan and the Fortune 500 buyer sign in to the same product, with the same toolkit.',
    },
    {
      label: '04',
      title: 'Published prices. No "contact sales."',
      body: 'If you have to email us to learn what something costs, it is not transparent pricing. Every number is on the product’s own site, updated the day we change it, in every currency we serve. No hidden enterprise sheet, no quote that depends on how big you look on a discovery call. The price is the price, and we publish it.',
    },
    {
      label: '05',
      title: 'No per-seat gouging',
      body: 'Seats matter, but they should not be the only lever. We meter on usage that actually reflects value — transactions, storage, active volumes — and keep seat math simple. A growing team should pay a little more, not a five-times multiplier. Our pricing has never asked anyone to lay off teammates to make the numbers work.',
    },
    {
      label: '06',
      title: 'Stop paying on your terms',
      body: 'Cancel in one click. No retention calls. No "we need a reason." A refund for unused time lands in your account within three business days. Your data exports cleanly to standard formats so you are never held hostage by a sunk-cost migration. We earn the next month, every month — by being worth keeping, not by being painful to leave.',
    },
  ],
  antiPatterns: [
    {
      title: 'No "starter" tier with crippled features',
      body: 'A free tier with the data export removed, the API throttled to uselessness, or AI hidden behind an upgrade prompt is not a free tier — it is a sales funnel in costume. Our free tier ships the same engine as the paid one.',
    },
    {
      title: 'No transaction tax that punishes growth',
      body: 'Some platforms charge a percentage of every invoice, every payment, every record. That is a tax on success. We meter where it tracks real cost (storage, compute, payment-rail fees) and pass the saving back when our cost goes down.',
    },
    {
      title: 'No quotes, no "contact sales", no enterprise opacity',
      body: 'Every price is published. If a procurement team needs an MSA, a DPA, or invoiced billing, those are paperwork, not pricing. The dollar amount on a Fortune 500 invoice is the same dollar amount on the published page, multiplied by the number of seats they bought.',
    },
    {
      title: 'No per-seat ladders that triple every step',
      body: 'A team of ten should not pay three times what a team of three pays per seat. Our seat math is linear and simple, with volume discounts that kick in at honest break points — never as bait for an upsell.',
    },
  ],
  workedExample: [
    {
      who: 'Solo trader · Lagos, Nigeria',
      tier: 'Free tier',
      what: 'Runs a one-person shop. Issues invoices, tracks stock, handles tax filings. Free-forever, no advertising, no record cap, full data export.',
      note: 'Pays nothing. Uses the same engine as the paid customers.',
    },
    {
      who: 'Five-person consultancy · Toronto, Canada',
      tier: 'Pro tier',
      what: 'Five seats. AI-assisted billing, mid-volume transactions, business-hours support. Same feature set as the free tier and the enterprise tier.',
      note: 'Pays the published Pro price for Canada in CAD.',
    },
    {
      who: 'Manufacturer · Frankfurt, Germany',
      tier: 'Enterprise tier',
      what: '120 seats. SSO, DPA, dedicated account contact, 24-hour SLA. Same features as the solo trader, just with more headroom and more paperwork.',
      note: 'Pays the published Enterprise price for Germany in EUR.',
    },
  ],
  seePricesCta: {
    eyebrow: 'See actual prices',
    heading: 'Each product publishes its own prices.',
    body: 'Numbers vary by product and region, but the six rules on this page never do. Browse the portfolio to land on the right product, and the current prices are on its homepage.',
  },
};

export async function seedPricingPage(payload: Payload, log: string[]): Promise<void> {
  await payload.updateGlobal({ slug: 'pricing-page', data: PRICING_PAGE_SEED as any });
  log.push('pricing-page: updated');
}
