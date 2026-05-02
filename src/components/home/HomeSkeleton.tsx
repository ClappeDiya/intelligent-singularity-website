/**
 * Skeleton fallback for the homepage Suspense boundary.
 * Reserves a viewport-tall hero-shaped block so the resolved content does
 * not push anything visible — keeping CLS near 0.
 */
export function HomeSkeleton() {
  return (
    <div className="page-home" aria-hidden="true">
      <section className="relative px-4 sm:px-6 md:px-8 lg:px-12 pt-20 pb-16 md:pt-28 md:pb-24 lg:pt-32 lg:pb-28 min-h-[100dvh] flex items-center">
        <div className="relative max-w-[1280px] mx-auto w-full">
          <div className="max-w-[980px] mx-auto text-center">
            <div
              className="inline-flex items-center gap-3 mb-8 px-3 py-1.5 rounded-full"
              style={{
                border: '1px solid rgba(16,185,129,0.2)',
                background: 'rgba(16,185,129,0.06)',
                minHeight: 24,
                minWidth: 220,
              }}
            />
            <div
              className="font-semibold leading-[0.92] tracking-[-0.055em] mb-5"
              style={{
                fontSize: 'clamp(56px, 10vw, 152px)',
                color: 'transparent',
                userSelect: 'none',
              }}
            >
              {' '}
            </div>
            <div className="flex items-center justify-center gap-4 mb-8 flex-wrap" style={{ minHeight: 24 }} />
            <div className="mb-12" style={{ minHeight: 84 }} />
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center" style={{ minHeight: 56 }} />
          </div>
        </div>
      </section>
    </div>
  );
}
