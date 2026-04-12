import type { GlobalConfig } from 'payload';
import { revalidateGlobal } from '../hooks/revalidate';

export const ITUData: GlobalConfig = {
  slug: 'itu-data',
  hooks: {
    afterChange: [revalidateGlobal('itu')],
  },
  fields: [
    { name: 'offlineCount', type: 'number', required: true, defaultValue: 2200000000 },
    { name: 'onlinePercent', type: 'number', required: true, defaultValue: 74 },
    { name: 'offlinePercent', type: 'number', required: true, defaultValue: 26 },
    { name: 'highIncomePercent', type: 'number', required: true, defaultValue: 94 },
    { name: 'lowIncomePercent', type: 'number', required: true, defaultValue: 23 },
    { name: 'highIncome5G', type: 'number', required: true, defaultValue: 84 },
    { name: 'lowIncome5G', type: 'number', required: true, defaultValue: 4 },
    { name: 'urbanPercent', type: 'number', required: true, defaultValue: 85 },
    { name: 'ruralPercent', type: 'number', required: true, defaultValue: 58 },
    { name: 'offlineInLowMiddleIncomePercent', type: 'number', required: true, defaultValue: 96 },
    { name: 'sourceLabel', type: 'text', required: true, defaultValue: 'ITU Facts and Figures 2025' },
    { name: 'sourceUrl', type: 'text', required: true, defaultValue: 'https://www.itu.int/itu-d/reports/statistics/facts-figures-2025/' },
    { name: 'lastVerified', type: 'date', required: true },
  ],
};
