export default function NotFound() {
  return (
    <main style={{
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '40px',
      background: 'var(--bg)',
      color: 'var(--fg1)',
      fontFamily: 'var(--font-body)'
    }}>
      <div style={{ maxWidth: 620, textAlign: 'center' }}>
        <p style={{ fontFamily: 'var(--font-mono)', fontSize: 14, letterSpacing: '0.14em', textTransform: 'uppercase', margin: 0, color: 'var(--fg3)' }}>
          404
        </p>
        <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 42, lineHeight: 1.05, margin: '18px 0 12px' }}>
          Page not found.
        </h1>
        <p style={{ fontSize: 17, lineHeight: 1.7, color: 'var(--fg2)', margin: '0 0 24px' }}>
          The page you tried to visit does not exist. Return to the home page to continue.
        </p>
        <a href="/" style={{
          display: 'inline-flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 8,
          padding: '14px 24px',
          borderRadius: 'var(--r-sm)',
          background: 'var(--accent)',
          color: 'var(--accent-fg)',
          fontFamily: 'var(--font-display)',
          fontWeight: 600,
          textDecoration: 'none'
        }}>
          Back to home
        </a>
      </div>
    </main>
  );
}
