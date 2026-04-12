export function SkipToContent() {
  return (
    <a
      href="#main-content"
      className="sr-only focus:not-sr-only focus:absolute focus:top-2 focus:start-2 focus:z-50 focus:bg-[var(--color-mint)] focus:text-[var(--color-ink)] focus:px-3 focus:py-2 focus:rounded"
    >
      Skip to main content
    </a>
  );
}
