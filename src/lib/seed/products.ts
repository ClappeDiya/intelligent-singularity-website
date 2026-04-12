export type ProductSeed = {
  name: string;
  slug: string;
  publicName?: string;
  categorySlug: string;
  tagline: string;
  shortDescription: string;
  outboundURL: string;
  productStatus: 'production' | 'staging' | 'awaiting-approval' | 'infrastructure';
  isFlagship: boolean;
  ordering: number;
};

export const PRODUCTS_SEED: ProductSeed[] = [
  // Core Platform
  { name: 'Clappe', slug: 'clappe', categorySlug: 'core-platform',
    tagline: 'Run a business.',
    shortDescription: 'A unified ERP usable by a one-person shop and a 5,000-employee manufacturer alike. Same features, same quality, purchasing-power-adjusted pricing.',
    outboundURL: 'https://clappe.com', productStatus: 'production', isFlagship: true, ordering: 1 },
  { name: 'Clappe Landing', slug: 'clappe-landing', categorySlug: 'core-platform',
    tagline: 'Marketing gateway.', shortDescription: 'Public-facing gateway to the Clappe ecosystem.',
    outboundURL: 'https://clappe.com', productStatus: 'staging', isFlagship: false, ordering: 2 },
  { name: 'ClapBill', slug: 'clapbill', categorySlug: 'core-platform',
    tagline: 'Get paid for your work.',
    shortDescription: 'Multi-tenant invoicing and business management. Professional billing for a Toronto consultancy and a Lagos market stall on the same platform.',
    outboundURL: 'https://clapbill.com', productStatus: 'production', isFlagship: true, ordering: 3 },
  { name: 'AutoBill Alberta', slug: 'autobill-alberta', categorySlug: 'core-platform',
    tagline: 'Physician billing AI.',
    shortDescription: 'AI-powered billing from SOAP notes for physicians — cuts billing time from two hours to five minutes.',
    outboundURL: 'https://autobillalberta.com', productStatus: 'production', isFlagship: false, ordering: 4 },

  // Health & Wellness
  { name: 'ClapMed', slug: 'clapmed', categorySlug: 'health-wellness',
    tagline: 'Manage your health.', shortDescription: 'World\u2019s first agentic Electronic Medical Record system.',
    outboundURL: 'https://clapmed.com', productStatus: 'awaiting-approval', isFlagship: false, ordering: 5 },
  { name: 'ClapDiet', slug: 'clapdiet', categorySlug: 'health-wellness',
    tagline: 'Eat better.',
    shortDescription: 'Lab-guided nutrition and meal planning. Serves urban professionals managing chronic conditions and families managing food-security challenges alike.',
    outboundURL: 'https://clapdiet.com', productStatus: 'production', isFlagship: true, ordering: 6 },
  { name: 'ClapMove', slug: 'clapmove', publicName: 'Joint Exercise', categorySlug: 'health-wellness',
    tagline: 'Move better.',
    shortDescription: 'Personalized joint-health programs, pain tracking, and clinician-supported wellness. Works for someone managing a chronic condition and someone building mobility from scratch.',
    outboundURL: 'https://clap.world', productStatus: 'production', isFlagship: true, ordering: 7 },
  { name: 'Clinic1', slug: 'clinic1', categorySlug: 'health-wellness',
    tagline: 'Run your clinic.', shortDescription: 'Clinic website + practice management foundation.',
    outboundURL: 'https://clinic1.com', productStatus: 'staging', isFlagship: false, ordering: 8 },

  // Finance
  { name: 'ClapPay', slug: 'clappay', categorySlug: 'finance-commerce',
    tagline: 'Get paid, anywhere.', shortDescription: 'Global Unified Financial Platform \u2014 every payment rail.',
    outboundURL: 'https://clappay.com', productStatus: 'awaiting-approval', isFlagship: false, ordering: 9 },
  { name: 'ClapTrader', slug: 'claptrader', categorySlug: 'finance-commerce',
    tagline: 'Trade intelligently.', shortDescription: 'Hybrid AI-assisted intraday trading platform.',
    outboundURL: 'https://claptrader.com', productStatus: 'awaiting-approval', isFlagship: false, ordering: 10 },
  { name: 'GPT-Trading', slug: 'gpt-trading', categorySlug: 'finance-commerce',
    tagline: 'Trading research.', shortDescription: 'AI trading research monorepo \u2014 R&D pipeline feeding ClapTrader.',
    outboundURL: 'https://github.com/intelligent-singularity/gpt-trading', productStatus: 'infrastructure', isFlagship: false, ordering: 11 },

  // Work & Community
  { name: 'Clapwork', slug: 'clapwork', categorySlug: 'work-community',
    tagline: 'Earn a living from anywhere.',
    shortDescription: 'Trust-first freelance marketplace. A freelancer in San Francisco and a freelancer in Kampala compete on the same terms — same tools, same escrow, same compliance.',
    outboundURL: 'https://clapwork.com', productStatus: 'production', isFlagship: true, ordering: 12 },
  { name: 'ClapNetwork', slug: 'clapnetwork', categorySlug: 'work-community',
    tagline: 'Secure access backbone.', shortDescription: 'Private network and secure access infrastructure (OpenClaw).',
    outboundURL: 'https://clapnetwork.com', productStatus: 'infrastructure', isFlagship: false, ordering: 13 },
  { name: 'ClapWorldDB', slug: 'clapworlddb', categorySlug: 'work-community',
    tagline: 'Country and region data.', shortDescription: 'Country/region dataset and crawler.',
    outboundURL: 'https://clapworlddb.com', productStatus: 'infrastructure', isFlagship: false, ordering: 14 },

  // Agriculture
  { name: 'Apogee', slug: 'apogee', categorySlug: 'agriculture-food',
    tagline: 'Manage your farm.', shortDescription: 'Goat farming management system for commercial farms and smallholders alike.',
    outboundURL: 'https://apogee.farm', productStatus: 'staging', isFlagship: false, ordering: 15 },

  // Media & Creative
  { name: 'Audiflo / SlideFlow', slug: 'audiflo', categorySlug: 'media-creative',
    tagline: 'Tell your story.', shortDescription: 'Multi-audience AI presentation narration.',
    outboundURL: 'https://audiflo.com', productStatus: 'production', isFlagship: false, ordering: 16 },
  { name: 'Nestbitt', slug: 'nestbitt', categorySlug: 'media-creative',
    tagline: 'Make music.', shortDescription: 'AI music generation and voice cloning.',
    outboundURL: 'https://nestbitt.com', productStatus: 'staging', isFlagship: false, ordering: 17 },
  { name: 'DailyWorship', slug: 'dailyworship', categorySlug: 'media-creative',
    tagline: 'Worship music for every community.', shortDescription: 'AI-powered worship music generation, open source.',
    outboundURL: 'https://dailyworship.com', productStatus: 'staging', isFlagship: false, ordering: 18 },
  { name: 'Video-Remotion', slug: 'video-remotion', categorySlug: 'media-creative',
    tagline: 'Programmatic video.', shortDescription: 'Programmatic video creation for every scale.',
    outboundURL: 'https://video.clappe.com', productStatus: 'staging', isFlagship: false, ordering: 19 },

  // Communications & Infra
  { name: 'Gclap', slug: 'gclap', categorySlug: 'communications-data',
    tagline: 'Email for everyone.', shortDescription: 'Open-source AI-integrated email & marketing platform.',
    outboundURL: 'https://gclap.com', productStatus: 'staging', isFlagship: false, ordering: 20 },
  { name: 'FileManager', slug: 'filemanager', categorySlug: 'communications-data',
    tagline: 'Organize everything.', shortDescription: 'Unified cross-platform file operations, transfer, sync, governance.',
    outboundURL: 'https://filemanager.clappe.com', productStatus: 'staging', isFlagship: false, ordering: 21 },
  { name: 'RateAds / Feedback Hub', slug: 'rateads', categorySlug: 'communications-data',
    tagline: 'Listen to your community.', shortDescription: 'Survey and feedback platform for every community — enterprise, citizen, underserved.',
    outboundURL: 'https://rateads.com', productStatus: 'staging', isFlagship: false, ordering: 22 },
  { name: 'Mail-RateAds', slug: 'mail-rateads', categorySlug: 'communications-data',
    tagline: 'Mail backbone.', shortDescription: 'Mail/DNS configuration for the entire Clap domain portfolio.',
    outboundURL: 'https://mail.rateads.com', productStatus: 'infrastructure', isFlagship: false, ordering: 23 },
];
