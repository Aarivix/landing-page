/* Marketing nav with live theme toggle. */
function Nav({ theme, onToggleTheme }) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  useEffect(() => {
    // page scrolls on the window/document, not the #scrollroot div
    const onScroll = () => {
      const y = window.scrollY || document.documentElement.scrollTop || 0;
      setScrolled(y > 8);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  const links = [["Platform", "#how"], ["How it works", "#how"], ["Features", "#features"], ["FAQ", "#faq"]];
  const jump = (sel) => {
    const el = document.querySelector(sel);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
    setMobileOpen(false);
  };
  return (
    <header style={{ position: "sticky", top: 0, zIndex: 50,
      background: scrolled ? "color-mix(in srgb, var(--bg) 82%, transparent)" : "transparent",
      backdropFilter: scrolled ? "blur(12px)" : "none",
      borderBottom: scrolled ? "1px solid var(--line)" : "1px solid transparent",
      transition: "background .2s, border-color .2s" }}>
      <div style={{ ...WRAP, height: 64, display: "flex", alignItems: "center", gap: 28 }}>
        <a href="#" onClick={(e) => e.preventDefault()} style={{ display: "flex", alignItems: "center", gap: 9, textDecoration: "none" }}>
          <img src="assets/aarivix-mark.png" alt="" style={{ height: 26 }} />
          <span style={{ fontFamily: "var(--font-display)", fontWeight: 600, fontSize: 19, color: "var(--fg1)", letterSpacing: "-0.01em" }}>Aarivix</span>
        </a>
        <nav className="nav-links" style={{ display: "flex", gap: 26, marginLeft: 8 }}>
          {links.map(([label, sel]) => (
            <a key={label} href={sel} onClick={(e) => { e.preventDefault(); jump(sel); }}
              className="nav-link"
              style={{ fontFamily: "var(--font-display)", fontSize: 14.5, fontWeight: 500, color: "var(--fg2)", textDecoration: "none" }}>{label}</a>
          ))}
        </nav>
        <div style={{ marginLeft: "auto", display: "flex", alignItems: "center", gap: 12 }}>
          <button onClick={onToggleTheme} aria-label="Toggle theme"
            style={{ width: 36, height: 36, borderRadius: "var(--r-sm)", border: "1px solid var(--line-strong)",
              background: "transparent", color: "var(--fg2)", cursor: "pointer", display: "flex",
              alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
            <Icon name={theme === "dark" ? "sun" : "moon"} size={17} />
          </button>
          <a href="#" onClick={(e) => e.preventDefault()} className="nav-signin"
            style={{ fontFamily: "var(--font-display)", fontSize: 14.5, fontWeight: 500, color: "var(--fg1)", textDecoration: "none" }}>Sign in</a>
          <Btn variant={theme === "dark" ? "signal" : "primary"} size="sm" iconRight="arrow-right" className="nav-cta">Book a demo</Btn>
          <button className="nav-burger" onClick={() => setMobileOpen((v) => !v)} aria-label="Menu"
            style={{ display: "none", width: 36, height: 36, borderRadius: "var(--r-sm)", border: "1px solid var(--line-strong)",
              background: "transparent", color: "var(--fg1)", cursor: "pointer", alignItems: "center", justifyContent: "center" }}>
            <Icon name={mobileOpen ? "x" : "menu"} size={18} />
          </button>
        </div>
      </div>
      {mobileOpen && (
        <div className="mobile-menu" style={{ display: "none", borderTop: "1px solid var(--line)",
          background: "var(--bg-raised)", padding: "14px 24px 20px" }}>
          <div style={{ display: "flex", flexDirection: "column", gap: 2 }}>
            {links.map(([label, sel]) => (
              <a key={label} href={sel} onClick={(e) => { e.preventDefault(); jump(sel); }}
                style={{ fontFamily: "var(--font-display)", fontSize: 16, fontWeight: 500, color: "var(--fg1)",
                  textDecoration: "none", padding: "11px 0", borderBottom: "1px solid var(--line)" }}>{label}</a>
            ))}
          </div>
          <div style={{ marginTop: 16 }}>
            <Btn variant={theme === "dark" ? "signal" : "primary"} size="md" iconRight="arrow-right" style={{ width: "100%" }}>Book a demo</Btn>
          </div>
        </div>
      )}
    </header>
  );
}

function Hero({ heroLayout = "split", motion = true, theme = "light" }) {
  const stacked = heroLayout === "stacked";
  return (
    <section style={{ position: "relative", overflow: "hidden" }}>
      <div aria-hidden="true" style={{ position: "absolute", inset: 0,
        backgroundImage: "linear-gradient(var(--grid-line) 1px, transparent 1px), linear-gradient(90deg, var(--grid-line) 1px, transparent 1px)",
        backgroundSize: "32px 32px",
        maskImage: stacked ? "radial-gradient(120% 80% at 50% 0%, #000 45%, transparent 80%)" : "radial-gradient(120% 90% at 72% 0%, #000 40%, transparent 85%)" }} />
      <div style={{ ...WRAP, position: "relative", paddingTop: 72, paddingBottom: 64,
        display: "grid", gridTemplateColumns: stacked ? "1fr" : "0.95fr 1.15fr", gap: stacked ? 48 : 46,
        alignItems: "center", textAlign: stacked ? "center" : "left" }} className="hero-grid">
        <div style={{ maxWidth: stacked ? 760 : "none", margin: stacked ? "0 auto" : 0 }}>
          <div style={{ display: "inline-flex", alignItems: "center", gap: 9, padding: "5px 12px 5px 7px",
            border: "1px solid var(--line-strong)", borderRadius: "var(--r-pill)", background: "var(--bg-raised)" }}>
            <span style={{ fontFamily: "var(--font-mono)", fontSize: 10, fontWeight: 600, letterSpacing: "0.04em",
              background: "var(--signal-500)", color: "var(--petrol-900)", padding: "2px 7px", borderRadius: "var(--r-pill)" }}>NEW</span>
            <span style={{ fontFamily: "var(--font-mono)", fontSize: 12, color: "var(--fg2)", letterSpacing: "0.02em" }}>Compare every flight, milestone to milestone</span>
          </div>
          <h1 className="hero-title" style={{ fontFamily: "var(--font-display)", fontSize: 58, fontWeight: 600, lineHeight: 1.0,
            letterSpacing: "-0.03em", color: "var(--fg1)", margin: "20px 0 0" }}>
            See exactly how your site drifts from the plan — to the millimeter.
          </h1>
          <p className="hero-sub" style={{ fontFamily: "var(--font-body)", fontSize: 19, lineHeight: 1.55, color: "var(--fg2)",
            margin: "22px 0 0", maxWidth: 540, marginInline: stacked ? "auto" : 0 }}>
            Aarivix turns every drone flight into a measured reality model — orthomosaic,
            terrain and point cloud — aligned to your design and tracked across every
            milestone. The objective source of truth for your site.
          </p>
          <div style={{ display: "flex", gap: 12, marginTop: 30, justifyContent: stacked ? "center" : "flex-start", flexWrap: "wrap" }}>
            <Btn variant="primary" size="lg" iconRight="arrow-right">Book a demo</Btn>
            <Btn variant="secondary" size="lg" icon="play">See a sample report</Btn>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 14, marginTop: 28, flexWrap: "wrap",
            justifyContent: stacked ? "center" : "flex-start",
            fontFamily: "var(--font-mono)", fontSize: 12, color: "var(--fg3)" }}>
            {["±3 mm tolerance", "LiDAR + photogrammetry", "Orthomosaic · DSM · contours"].map((it, i) => (
              <span key={it} style={{ paddingLeft: i ? 14 : 0,
                borderLeft: i ? "1px solid var(--line-strong)" : "none" }}>{it}</span>
            ))}
          </div>
        </div>
        <div style={{ maxWidth: stacked ? 1040 : "none", margin: stacked ? "0 auto" : 0, width: "100%" }}>
          <ProductShot theme={theme} />
        </div>
      </div>
    </section>
  );
}

function TrustStrip() {
  const names = ["MERIDIAN AEC", "HARBOURWORKS", "NORTHQUAY", "STRUKTON", "VANTAGE BUILD", "GROUNDLINE"];
  return (
    <section style={{ borderTop: "1px solid var(--line)", borderBottom: "1px solid var(--line)", background: "var(--bg-raised)" }}>
      <div style={{ ...WRAP, padding: "20px 32px", display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 18 }}>
        <span style={{ fontFamily: "var(--font-mono)", fontSize: 11, letterSpacing: "0.08em", textTransform: "uppercase", color: "var(--fg3)", whiteSpace: "nowrap" }}>Trusted on site by</span>
        <div style={{ display: "flex", gap: 30, flexWrap: "wrap", alignItems: "center" }}>
          {names.map((n) => (
            <span key={n} style={{ fontFamily: "var(--font-display)", fontWeight: 600, fontSize: 14.5, letterSpacing: "0.02em", color: "var(--fg3)", whiteSpace: "nowrap" }}>{n}</span>
          ))}
        </div>
      </div>
    </section>
  );
}

Object.assign(window, { Nav, Hero, TrustStrip });
