/**
 * Lightweight CMS types used in page components.
 * These mirror the Payload-generated types but are manually maintained
 * until payload-types.ts is auto-generated in a later phase.
 */

export type ProductCategory = {
  id: string;
  name: string;
  slug: string;
  ordering: number;
  description?: string;
  accentColor?: string;
};

export type Product = {
  id: string;
  name: string;
  slug: string;
  publicName?: string | null;
  category: ProductCategory | string;
  tagline?: string | null;
  shortDescription?: string | null;
  longDescription?: unknown;
  universalReachNote?: string | null;
  outboundURL: string;
  status: 'production' | 'staging' | 'awaiting-approval' | 'infrastructure';
  isFlagship: boolean;
  launchDate?: string | null;
  ordering: number;
};

export type CommitmentItem = {
  id: string;
  number: number;
  title: string;
  body: string;
};

export type LegalPage = {
  id: string;
  slug: string;
  title: string;
  body: unknown;
  lastUpdated: string;
};

export type ITUData = {
  offlineCount: number;
  onlinePercent: number;
  offlinePercent: number;
  highIncomePercent: number;
  lowIncomePercent: number;
  highIncome5G: number;
  lowIncome5G: number;
  urbanPercent: number;
  ruralPercent: number;
  offlineInLowMiddleIncomePercent: number;
  sourceLabel: string;
  sourceUrl: string;
  lastVerified: string;
};
