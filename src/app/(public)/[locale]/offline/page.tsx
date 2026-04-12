import { MeridianMark } from '@/components/brand/MeridianMark';

export default function OfflinePage() {
  return (
    <section className="min-h-screen flex flex-col items-center justify-center gap-6 p-8">
      <MeridianMark size={64} />
      <h1 className="font-[var(--font-serif)] text-[32px]">You&apos;re offline.</h1>
      <p className="font-[var(--font-serif)] italic text-[18px] text-[var(--color-cream-soft)] text-center max-w-[520px]">
        That&apos;s okay. This site was built to keep working without a connection. Try again when you&apos;re back online.
      </p>
    </section>
  );
}
