import type { Metadata } from 'next';
import { Suspense } from 'react';
import config from '@payload-config';
import { RootPage, generatePageMetadata } from '@payloadcms/next/views';
import { importMap } from '../importMap';

type Args = {
  params: Promise<{ segments: string[] }>;
  searchParams: Promise<Record<string, string | string[]>>;
};

export const generateMetadata = ({ params, searchParams }: Args): Promise<Metadata> =>
  generatePageMetadata({ config, params, searchParams });

const Page = ({ params, searchParams }: Args) => (
  <Suspense fallback={<div>Loading...</div>}>
    {RootPage({ config, importMap, params, searchParams })}
  </Suspense>
);

export default Page;
