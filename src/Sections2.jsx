/* How it works, metric band, feature rows, FAQ, CTA, footer. */

function HowItWorks({ motion = true }) {
  const [ref, seen] = useInView();
  const steps = [
    { n: "01", icon: "scan-line", eyebrow: "Capture", title: "Capture the site from the air",
      body: "Fly the site by drone or scan it with LiDAR. Aarivix turns thousands of overlapping images into a measured orthomosaic, terrain model and point cloud, registered to your control points." },
    { n: "02", icon: "layers", eyebrow: "Align", title: "Align reality to the design",
      body: "Aarivix locks each capture to your as-designed plan and to earlier flights — one shared coordinate frame — so every bench, surface and structure is compared like-for-like." },
    { n: "03", icon: "flag", eyebrow: "Flag", title: "Measure what changed, flag what's off",
      body: "Volumes, levels and deviations are computed automatically. Every element outside tolerance is flagged with a signed figure and a clear audit trail — ready to report." },
  ];
  return (
    <section id="how" style={{ ...WRAP, padding: "92px 32px 8px" }}>
      <div style={{ maxWidth: 640 }}>
        <Eyebrow>The workflow</Eyebrow>
        <h2 style={{ fontFamily: "var(--font-display)", fontSize: 38, fontWeight: 600, letterSpacing: "-0.025em",
          color: "var(--fg1)", margin: "14px 0 0", lineHeight: 1.06 }}>
          Capture, align, flag. Three steps from flight to source of truth.
        </h2>
        <p style={{ fontFamily: "var(--font-body)", fontSize: 18, lineHeight: 1.55, color: "var(--fg2)", margin: "16px 0 0" }}>
          No more guesswork between site visits. Aarivix turns every flight into a measured,
          versioned record of exactly how your site stands.
        </p>
      </div>
      <div ref={ref} className="how-grid" style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 1,
        background: "var(--line)", border: "1px solid var(--line)", borderRadius: "var(--r-lg)",
        overflow: "hidden", marginTop: 44 }}>
        {steps.map((s) => (
          <div key={s.n} style={{ background: "var(--surface)", padding: "30px 28px 32px",
            display: "flex", flexDirection: "column", gap: 0 }}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
              <span style={{ width: 40, height: 40, borderRadius: "var(--r-md)", border: "1px solid var(--line-strong)",
                display: "flex", alignItems: "center", justifyContent: "center", color: "var(--fg1)" }}>
                <Icon name={s.icon} size={20} />
              </span>
              <span style={{ fontFamily: "var(--font-mono)", fontSize: 13, color: "var(--info)", fontWeight: 500 }}>{s.n}</span>
            </div>
            <Eyebrow style={{ marginTop: 22, color: "var(--fg3)" }}>{s.eyebrow}</Eyebrow>
            <h3 style={{ fontFamily: "var(--font-display)", fontSize: 21, fontWeight: 600, letterSpacing: "-0.015em",
              color: "var(--fg1)", margin: "9px 0 0", lineHeight: 1.2 }}>{s.title}</h3>
            <p style={{ fontFamily: "var(--font-body)", fontSize: 14.5, lineHeight: 1.55, color: "var(--fg2)", margin: "11px 0 0" }}>{s.body}</p>
          </div>
        ))}
      </div>
      <MetricBand seen={seen} motion={motion} />
    </section>
  );
}

function MetricBand({ seen, motion = true }) {
  const stats = [
    { v: useCountUp(3, { start: seen, enabled: motion }), pre: "± ", unit: " mm", l: "Verified tolerance, site-wide" },
    { v: useCountUp(98.6, { start: seen, decimals: 1, enabled: motion }), unit: "%", l: "Median within-tolerance rate" },
    { v: useCountUp(4, { start: seen, enabled: motion }), unit: " hrs", l: "From flight to aligned model" },
    { v: useCountUp(52.4, { start: seen, decimals: 1, enabled: motion }), unit: " ha", l: "Mapped per flight" },
  ];
  const fmt = (s) => (s.comma ? Number(s.v).toLocaleString("en-US") : s.v);
  return (
    <div className="metric-band" style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 1,
      background: "var(--line)", border: "1px solid var(--line)", borderRadius: "var(--r-lg)",
      overflow: "hidden", marginTop: 40 }}>
      {stats.map((s, i) => (
        <div key={i} style={{ background: "var(--bg-raised)", padding: "26px 24px" }}>
          <div style={{ fontFamily: "var(--font-mono)", fontSize: 33, fontWeight: 500, color: "var(--fg1)",
            letterSpacing: "0.01em", fontFeatureSettings: '"tnum" 1, "zero" 1' }}>
            {s.pre || ""}{fmt(s)}<span style={{ fontSize: 18, color: "var(--fg3)" }}>{s.unit}</span>
          </div>
          <div style={{ fontFamily: "var(--font-body)", fontSize: 13.5, color: "var(--fg2)", marginTop: 8, lineHeight: 1.4 }}>{s.l}</div>
        </div>
      ))}
    </div>
  );
}

function Features() {
  const feats = [
    { kind: "capture", step: "01", eyebrow: "Capture", title: "A measured reality model, not a flat photo.",
      body: "Fly with a drone or scan with LiDAR. Aarivix fuses the imagery into a dense, georeferenced point cloud and orthomosaic — registered to your site control points.",
      points: ["Sub-centimeter point density", "Auto-registered to control points", "Orthomosaic, DSM & DTM outputs"] },
    { kind: "align", step: "02", eyebrow: "Align", title: "As-built and as-designed, in one coordinate frame.",
      body: "Import IFC, DWG or your CAD design surface and Aarivix locks reality to intent — the same grid, the same datum — and versions it against every flight.",
      points: ["IFC / DWG / design-surface import", "One shared coordinate frame", "Versioned against every milestone"] },
    { kind: "flag", step: "03", eyebrow: "Flag", title: "Signed deviations and volumes, with an audit trail.",
      body: "Cut-and-fill volumes, level checks and position deviations are computed for you. Everything outside tolerance is flagged with a signed Δ and a one-click QA report.",
      points: ["Signed Δ with tolerance band", "Cut / fill volume & level checks", "One-click QA/QC report"] },
  ];
  return (
    <section id="features" style={{ ...WRAP, padding: "84px 32px 24px", display: "flex", flexDirection: "column", gap: 80 }}>
      {feats.map((f, i) => (
        <div key={f.step} className="feature-row" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 56, alignItems: "center" }}>
          <div style={{ order: i % 2 === 1 ? 2 : 1 }} className="feature-copy">
            <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
              <span style={{ fontFamily: "var(--font-mono)", fontSize: 13, color: "var(--info)", fontWeight: 500 }}>{f.step}</span>
              <Eyebrow style={{ color: "var(--fg3)" }}>{f.eyebrow}</Eyebrow>
            </div>
            <h2 style={{ fontFamily: "var(--font-display)", fontSize: 32, fontWeight: 600, letterSpacing: "-0.02em",
              color: "var(--fg1)", margin: "12px 0 0", lineHeight: 1.12 }}>{f.title}</h2>
            <p style={{ fontFamily: "var(--font-body)", fontSize: 17, lineHeight: 1.6, color: "var(--fg2)", margin: "16px 0 0" }}>{f.body}</p>
            <ul style={{ listStyle: "none", padding: 0, margin: "22px 0 0", display: "flex", flexDirection: "column", gap: 11 }}>
              {f.points.map((p) => (
                <li key={p} style={{ display: "flex", alignItems: "center", gap: 11, fontFamily: "var(--font-body)", fontSize: 15, color: "var(--fg1)" }}>
                  <Icon name="check" size={17} color="var(--ok)" /> {p}
                </li>
              ))}
            </ul>
          </div>
          <div style={{ order: i % 2 === 1 ? 1 : 2 }} className="feature-viz"><MiniViz kind={f.kind} /></div>
        </div>
      ))}
    </section>
  );
}

function MiniViz({ kind }) {
  return (
    <div style={{ position: "relative", borderRadius: "var(--r-lg)", overflow: "hidden",
      background: "#04202F", aspectRatio: "16 / 11", border: "1px solid rgba(174,208,201,0.18)", boxShadow: "var(--shadow-2)" }}>
      <div style={{ position: "absolute", inset: 0,
        backgroundImage: "linear-gradient(rgba(174,208,201,0.09) 1px, transparent 1px), linear-gradient(90deg, rgba(174,208,201,0.09) 1px, transparent 1px)",
        backgroundSize: "26px 26px" }} />
      <svg viewBox="0 0 640 440" preserveAspectRatio="xMidYMid meet" style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }}>
        {kind === "capture" && (
          <g>
            <g stroke="#6BA6C0" strokeWidth="2" fill="none"><rect x="70" y="60" width="500" height="320" /><line x1="320" y1="60" x2="320" y2="250" /></g>
            {Array.from({ length: 130 }).map((_, i) => {
              const x = 80 + ((i * 91) % 480), y = 70 + ((i * 53) % 300);
              return <circle key={i} cx={x} cy={y} r="1.6" fill="#AED0C9" opacity={0.4 + ((i * 0.13) % 0.5)} />;
            })}
          </g>
        )}
        {kind === "align" && (
          <g fill="none" strokeLinecap="square">
            <g stroke="#6BA6C0" strokeWidth="2"><rect x="80" y="70" width="480" height="300" /><line x1="320" y1="70" x2="320" y2="370" /></g>
            <g stroke="#F3F2EA" strokeWidth="2" opacity="0.85" transform="translate(10,7)"><rect x="80" y="70" width="480" height="300" /><line x1="320" y1="70" x2="320" y2="370" /></g>
            <line x1="320" y1="40" x2="320" y2="400" stroke="#FFFB08" strokeWidth="2" />
          </g>
        )}
        {kind === "flag" && (
          <g>
            <g stroke="#6BA6C0" strokeWidth="2" fill="none"><rect x="80" y="70" width="480" height="300" /><line x1="80" y1="220" x2="560" y2="220" /></g>
            <rect x="290" y="190" width="60" height="60" fill="none" stroke="#FFFB08" strokeWidth="3" />
            <circle cx="320" cy="220" r="40" fill="none" stroke="#FFFB08" strokeWidth="1.5" opacity="0.5" />
            <circle cx="180" cy="140" r="9" fill="#2F9E6B" stroke="#fff" strokeWidth="2" />
            <circle cx="460" cy="300" r="9" fill="#E8A317" stroke="#fff" strokeWidth="2" />
          </g>
        )}
      </svg>
      <div style={{ position: "absolute", bottom: 12, left: 14, fontFamily: "var(--font-mono)", fontSize: 10.5,
        letterSpacing: "0.06em", color: "var(--mint-500)", textTransform: "uppercase" }}>
        {kind === "capture" ? "Point cloud · live" : kind === "align" ? "As-built ↔ as-designed" : "Δ +8.3 mm · flagged"}
      </div>
    </div>
  );
}

function FAQItem({ q, a, open, onClick }) {
  return (
    <div style={{ borderBottom: "1px solid var(--line)" }}>
      <button onClick={onClick} style={{ width: "100%", display: "flex", alignItems: "center", justifyContent: "space-between",
        gap: 20, padding: "22px 4px", background: "transparent", border: "none", cursor: "pointer", textAlign: "left" }}>
        <span style={{ fontFamily: "var(--font-display)", fontSize: 18, fontWeight: 500, color: "var(--fg1)", letterSpacing: "-0.01em" }}>{q}</span>
        <span style={{ flexShrink: 0, color: "var(--fg3)", transition: "transform .2s", transform: open ? "rotate(45deg)" : "none" }}>
          <Icon name="plus" size={20} />
        </span>
      </button>
      <div style={{ maxHeight: open ? 240 : 0, overflow: "hidden", transition: "max-height .25s cubic-bezier(0.2,0.8,0.2,1)" }}>
        <p style={{ fontFamily: "var(--font-body)", fontSize: 15.5, lineHeight: 1.6, color: "var(--fg2)", margin: "0 0 22px", maxWidth: 680 }}>{a}</p>
      </div>
    </div>
  );
}

function FAQ() {
  const [open, setOpen] = useState(0);
  const items = [
    { q: "How accurate is the survey?", a: "Aarivix verifies to ±3 mm site-wide when captured against established ground control points. Every deviation is reported as a signed figure with its tolerance band, so you see not just that something moved, but exactly how far and in which direction." },
    { q: "What capture hardware do we need?", a: "Any survey-grade drone or LiDAR scanner. Aarivix is hardware-agnostic — it ingests imagery and point clouds, registers them to your control points, and builds the reality model regardless of the aircraft or scanner you flew." },
    { q: "Which design formats can I align against?", a: "Import IFC, DWG and design surfaces (DTM / TIN). Aarivix locks the as-built capture to your as-designed intent in a single shared coordinate frame, then versions every comparison against your project milestones." },
    { q: "How long does it take to get a report?", a: "Roughly four hours from flight to an aligned reality model for a typical site. From there a QA report — flagged deviations, cut/fill volumes and level checks with a full audit trail — is one click away." },
    { q: "Is our site data secure?", a: "Reality models, imagery and designs are encrypted in transit and at rest, with role-based access per project. Aarivix is the objective record of your site, and that record stays yours." },
  ];
  return (
    <section id="faq" style={{ ...WRAP, padding: "92px 32px 24px" }}>
      <div className="faq-grid" style={{ display: "grid", gridTemplateColumns: "0.8fr 1.2fr", gap: 56, alignItems: "start" }}>
        <div>
          <Eyebrow>FAQ</Eyebrow>
          <h2 style={{ fontFamily: "var(--font-display)", fontSize: 36, fontWeight: 600, letterSpacing: "-0.025em",
            color: "var(--fg1)", margin: "14px 0 0", lineHeight: 1.08 }}>Questions, measured answers.</h2>
          <p style={{ fontFamily: "var(--font-body)", fontSize: 16.5, lineHeight: 1.55, color: "var(--fg2)", margin: "16px 0 0" }}>
            Everything teams ask before their first flight. Still curious?
          </p>
          <a href="#" onClick={(e) => e.preventDefault()} style={{ display: "inline-flex", alignItems: "center", gap: 7, marginTop: 14,
            fontFamily: "var(--font-display)", fontSize: 15, fontWeight: 500, color: "var(--fg1)", textDecoration: "none" }}>
            Talk to an engineer <Icon name="arrow-right" size={16} />
          </a>
        </div>
        <div>
          {items.map((it, i) => (
            <FAQItem key={i} {...it} open={open === i} onClick={() => setOpen(open === i ? -1 : i)} />
          ))}
        </div>
      </div>
    </section>
  );
}

function CTABand() {
  return (
    <section style={{ ...WRAP, padding: "80px 32px 88px" }}>
      <div style={{ position: "relative", overflow: "hidden", borderRadius: "var(--r-xl)",
        background: "var(--petrol-900)", padding: "68px 56px" }}>
        <div aria-hidden="true" style={{ position: "absolute", inset: 0,
          backgroundImage: "linear-gradient(rgba(174,208,201,0.09) 1px, transparent 1px), linear-gradient(90deg, rgba(174,208,201,0.09) 1px, transparent 1px)",
          backgroundSize: "30px 30px",
          maskImage: "radial-gradient(120% 130% at 85% 0%, #000 30%, transparent 75%)" }} />
        {/* scan accent line */}
        <div aria-hidden="true" style={{ position: "absolute", top: 0, bottom: 0, right: "16%", width: 2,
          background: "linear-gradient(rgba(255,251,8,0.0), rgba(255,251,8,0.5), rgba(255,251,8,0.0))" }} />
        <div style={{ position: "relative", maxWidth: 660 }}>
          <Eyebrow color="var(--mint-500)">Reality, Measured.</Eyebrow>
          <h2 style={{ fontFamily: "var(--font-display)", fontSize: 42, fontWeight: 600, letterSpacing: "-0.025em",
            color: "var(--paper-50)", margin: "14px 0 0", lineHeight: 1.06 }}>
            Stop guessing between site visits. Measure the site.
          </h2>
          <p style={{ fontFamily: "var(--font-body)", fontSize: 18, lineHeight: 1.6, color: "var(--petrol-200)", margin: "16px 0 30px", maxWidth: 560 }}>
            Bring an objective source of truth to your next milestone. See a sample deviation
            and volume report run on one of your own sites.
          </p>
          <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
            <Btn variant="signal" size="lg" iconRight="arrow-right">Book a demo</Btn>
            <Btn variant="onDarkGhost" size="lg">Talk to an engineer</Btn>
          </div>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  const cols = [
    { h: "Platform", items: ["Capture", "Align", "Deviations", "Volumes", "Reports"] },
    { h: "Industries", items: ["Earthworks & quarries", "Mining & aggregates", "Infrastructure", "Construction"] },
    { h: "Company", items: ["About", "Careers", "Security", "Contact"] },
  ];
  return (
    <footer style={{ borderTop: "1px solid var(--line)", background: "var(--bg-raised)" }}>
      <div className="footer-grid" style={{ ...WRAP, padding: "52px 32px 36px", display: "grid", gridTemplateColumns: "1.6fr 1fr 1fr 1fr", gap: 40 }}>
        <div>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <img src="assets/aarivix-mark.png" alt="" style={{ height: 28 }} />
            <span style={{ fontFamily: "var(--font-display)", fontWeight: 600, fontSize: 19, color: "var(--fg1)" }}>Aarivix</span>
          </div>
          <div style={{ fontFamily: "var(--font-mono)", fontSize: 11.5, letterSpacing: "0.06em", textTransform: "uppercase", color: "var(--fg3)", marginTop: 12 }}>Reality, Measured.</div>
          <p style={{ fontFamily: "var(--font-body)", fontSize: 13.5, color: "var(--fg2)", marginTop: 14, maxWidth: 280, lineHeight: 1.5 }}>
            The objective source of truth for your site.
          </p>
        </div>
        {cols.map((c) => (
          <div key={c.h}>
            <div style={{ fontFamily: "var(--font-display)", fontWeight: 600, fontSize: 14, color: "var(--fg1)", marginBottom: 14 }}>{c.h}</div>
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              {c.items.map((it) => (
                <a key={it} href="#" onClick={(e) => e.preventDefault()} className="foot-link"
                  style={{ fontFamily: "var(--font-body)", fontSize: 14, color: "var(--fg2)", textDecoration: "none" }}>{it}</a>
              ))}
            </div>
          </div>
        ))}
      </div>
      <div style={{ ...WRAP, padding: "0 32px 32px" }}>
        <TickRule style={{ marginBottom: 18 }} />
        <div className="footer-base" style={{ display: "flex", justifyContent: "space-between", gap: 14,
          fontFamily: "var(--font-mono)", fontSize: 11.5, color: "var(--fg3)" }}>
          <span>© 2026 Aarivix Inc.</span><span>Privacy · Terms · Status</span>
        </div>
      </div>
    </footer>
  );
}

Object.assign(window, { HowItWorks, Features, FAQ, CTABand, Footer });
