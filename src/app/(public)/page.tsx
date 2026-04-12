import { MeridianMark } from '@/components/brand/MeridianMark';
import { Wordmark } from '@/components/brand/Wordmark';

export default function HomePage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-6 p-8">
      <MeridianMark size={64} />
      <Wordmark className="text-2xl" />
      <p className="text-sm opacity-60 font-[var(--font-mono)]">
        A studio building software for universal access.
      </p>
      <p className="text-xs opacity-40 font-[var(--font-mono)]">
        Coming soon · Incorporated in Alberta, Canada
      </p>
    </main>
  );
}
