export default function NotFound() {
  return (
    <main id="main" className="wrap flex min-h-[100svh] flex-col justify-center gap-s-3 py-section">
      <p className="font-mono text-small text-ink-3">404</p>
      <h1 className="font-display text-h2">This page does not exist.</h1>
      <p className="max-w-measure text-ink-2">The link may be old, or the address may have a typo.</p>
      <a href="/" className="btn self-start">
        Back to the portfolio <span aria-hidden="true">→</span>
      </a>
    </main>
  );
}
