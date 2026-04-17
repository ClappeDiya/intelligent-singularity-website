import { headers } from 'next/headers';

type JsonLdProps = {
  id: string;
  data: Record<string, unknown>;
};

export async function JsonLd({ id, data }: JsonLdProps) {
  const nonce = (await headers()).get('x-nonce') ?? undefined;

  return (
    <script
      id={id}
      type="application/ld+json"
      nonce={nonce}
      suppressHydrationWarning
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
