export type Product = {
  id: string;
  name: string;
  slug: string;
  publicName?: string;
  tagline?: string;
  shortDescription?: string;
  longDescription?: unknown;
  universalReachNote?: string;
  outboundURL: string;
  status: 'production' | 'staging' | 'awaiting-approval' | 'infrastructure';
  isFlagship: boolean;
  launchDate?: string;
  ordering: number;
  category:
    | string
    | {
        id: string;
        name: string;
        slug: string;
      };
};

export type CommitmentItem = {
  id: string;
  number: number;
  title: string;
  body: string;
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
