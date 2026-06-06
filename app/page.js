
'use client';

import { useEffect, useMemo, useRef, useState } from 'react';

const ICONS = {
  lock: [
    <rect key="lock-body" x="6" y="10" width="12" height="10" rx="2" />,
    <path key="lock-shackle" d="M8 10V7a4 4 0 0 1 8 0v3" />
  ],
  sun: [
    <circle key="sun-core" cx="12" cy="12" r="5" />,
    <path key="sun-rays" d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" />
  ],
  moon: [
    <path key="moon" d="M21 12.79A9 9 0 1111.21 3a7 7 0 009.79 9.79z" />
  ],
  menu: [
    <path key="menu" d="M4 6h16M4 12h16M4 18h16" />
  ],
  x: [
    <path key="x" d="M6 6l12 12M18 6l-12 12" />
  ],
  'arrow-right': [
    <path key="arrow-line" d="M5 12h14" />,
    <path key="arrow-head" d="M13 6l6 6-6 6" />
  ],
  play: [
    <path key="play" d="M8 5v14l11-7z" />
  ],
  plus: [
    <path key="plus" d="M12 5v14M5 12h14" />
  ],
  check: [
    <path key="check" d="M5 12l5 5l9-9" />
  ],
  'scan-line': [
    <path key="scan-line" d="M4 6h16M4 12h16M4 18h16" />
  ],
  layers: [
    <path key="layers-1" d="M4 7l8 5 8-5" />,
    <path key="layers-2" d="M4 12l8 5 8-5" />,
    <path key="layers-3" d="M4 17l8 5 8-5" />
  ],
  flag: [
    <path key="flag-stem" d="M4 22V6h8l4 4-4 4H4" />
  ]
};

function Icon({ name, size = 18, strokeWidth = 1.75, color = 'currentColor', style }) {
  const icon = ICONS[name];
  if (!icon) return null;
  return (
    <svg viewBox="0 0 24 24" width={size} height={size} fill="none" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" style={style}>
      {icon}
    </svg>
  );
}

function Btn({ variant = 'primary', size = 'md', icon, iconRight, children, href = '#', style, onClick, className }) {
  const base = {
    fontFamily: 'var(--font-display)',
    fontWeight: 500,
    letterSpacing: '-0.01em',
    border: '1px solid transparent',
    borderRadius: 'var(--r-sm)',
    cursor: 'pointer',
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    textDecoration: 'none',
    transition: 'background .15s, border-color .15s, transform .08s, color .15s',
    whiteSpace: 'nowrap'
  };
  const sizes = {
    sm: { fontSize: 14, padding: '8px 14px' },
    md: { fontSize: 15, padding: '11px 20px' },
    lg: { fontSize: 16.5, padding: '14px 26px' }
  };
  const variants = {
    primary: { background: 'var(--accent)', color: 'var(--accent-fg)' },
    signal: { background: 'var(--signal-500)', color: 'var(--petrol-900)' },
    secondary: { background: 'transparent', color: 'var(--fg1)', borderColor: 'var(--line-strong)' },
    ghost: { background: 'transparent', color: 'var(--fg2)' },
    onDark: { background: 'var(--signal-500)', color: 'var(--petrol-900)' },
    onDarkGhost: { background: 'transparent', color: 'var(--paper-50)', borderColor: 'rgba(174,208,201,0.35)' }
  };
  return (
    <a
      href={href}
      className={className}
      onClick={(e) => {
        e.preventDefault();
        onClick?.();
      }}
      style={{ ...base, ...sizes[size], ...variants[variant], ...style }}
      onMouseDown={(e) => (e.currentTarget.style.transform = 'translateY(1px)')}
      onMouseUp={(e) => (e.currentTarget.style.transform = '')}
      onMouseLeave={(e) => (e.currentTarget.style.transform = '')}
    >
      {icon && <Icon name={icon} size={size === 'lg' ? 19 : 17} />}
      {children}
      {iconRight && <Icon name={iconRight} size={size === 'lg' ? 19 : 17} />}
    </a>
  );
}

function Eyebrow({ children, color, style }) {
  return (
    <div style={{ fontFamily: 'var(--font-mono)', fontSize: 12, fontWeight: 500, letterSpacing: '0.1em', textTransform: 'uppercase', color: color || 'var(--info)', ...style }}>
      {children}
    </div>
  );
}

function useInView(opts = {}) {
  const margin = opts.margin != null ? opts.margin : 110;
  const ref = useRef(null);
  const [seen, setSeen] = useState(false);

  useEffect(() => {
    if (seen) return;
    const check = () => {
      const el = ref.current;
      if (!el) return false;
      const r = el.getBoundingClientRect();
      const vh = window.innerHeight || document.documentElement.clientHeight;
      if (r.top < vh - margin && r.bottom > 0) {
        setSeen(true);
        return true;
      }
      return false;
    };

    if (check()) return;
    const onScroll = () => check();
    window.addEventListener('scroll', onScroll, { passive: true, capture: true });
    window.addEventListener('resize', onScroll);
    const iv = setInterval(check, 200);
    return () => {
      window.removeEventListener('scroll', onScroll, { capture: true });
      window.removeEventListener('resize', onScroll);
      clearInterval(iv);
    };
  }, [seen, margin]);

  return [ref, seen];
}

function useCountUp(target, { start, duration = 1100, decimals = 0, enabled = true } = {}) {
  const reduce = typeof window !== 'undefined' && window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const animate = enabled && !reduce;
  const [val, setVal] = useState(animate ? 0 : target);

  useEffect(() => {
    if (!animate) {
      setVal(target);
      return;
    }
    if (!start) return;
    let raf = 0;
    let t0 = 0;
    const ease = (p) => 1 - Math.pow(1 - p, 3);
    const loop = (t) => {
      if (!t0) t0 = t;
      const p = Math.min((t - t0) / duration, 1);
      setVal(target * ease(p));
      if (p < 1) raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    const fallback = window.setTimeout(() => setVal(target), duration + 500);
    return () => {
      cancelAnimationFrame(raf);
      clearTimeout(fallback);
    };
  }, [start, target, duration, animate]);

  return Number(val).toFixed(decimals);
}

const WRAP = { maxWidth: 1180, margin: '0 auto', padding: '0 32px', width: '100%', boxSizing: 'border-box' };

function Nav({ theme, onToggleTheme, onBookDemo }) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY || document.documentElement.scrollTop || 0;
      setScrolled(y > 8);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const links = useMemo(
    () => [
      ['Platform', '#how'],
      ['How it works', '#how'],
      ['Features', '#features'],
      ['FAQ', '#faq']
    ],
    []
  );

  const jump = (sel) => {
    const el = document.querySelector(sel);
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    setMobileOpen(false);
  };

  return (
    <header
      style={{
        position: 'sticky',
        top: 0,
        zIndex: 50,
        background: scrolled ? 'color-mix(in srgb, var(--bg) 82%, transparent)' : 'transparent',
        backdropFilter: scrolled ? 'blur(12px)' : 'none',
        borderBottom: scrolled ? '1px solid var(--line)' : '1px solid transparent',
        transition: 'background .2s, border-color .2s'
      }}
    >
      <div style={{ ...WRAP, height: 64, display: 'flex', alignItems: 'center', gap: 28 }}>
        <a
          href="#"
          onClick={(e) => {
            e.preventDefault();
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          aria-label="Aarivix — back to top"
          style={{ display: 'flex', alignItems: 'center', gap: 9, textDecoration: 'none' }}
        >
          <img src="/assets/aarivix-mark.webp" alt="Aarivix" style={{ height: 26 }} />
          <span style={{ fontFamily: 'var(--font-display)', fontWeight: 600, fontSize: 19, color: 'var(--fg1)', letterSpacing: '-0.01em' }}>
            Aarivix
          </span>
        </a>
        <nav className="nav-links" style={{ display: 'flex', gap: 26, marginLeft: 8 }}>
          {links.map(([label, sel]) => (
            <a
              key={label}
              href={sel}
              onClick={(e) => {
                e.preventDefault();
                jump(sel);
              }}
              className="nav-link"
              style={{ fontFamily: 'var(--font-display)', fontSize: 14.5, fontWeight: 500, color: 'var(--fg2)', textDecoration: 'none' }}
            >
              {label}
            </a>
          ))}
        </nav>
        <div style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: 12 }}>
          <button
            onClick={onToggleTheme}
            aria-label="Toggle theme"
            style={{
              width: 36,
              height: 36,
              borderRadius: 'var(--r-sm)',
              border: '1px solid var(--line-strong)',
              background: 'transparent',
              color: 'var(--fg2)',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0
            }}
          >
            <Icon name={theme === 'dark' ? 'sun' : 'moon'} size={17} />
          </button>
          <Btn variant={theme === 'dark' ? 'signal' : 'primary'} size="sm" iconRight="arrow-right" className="nav-cta" onClick={onBookDemo}>
            Book a demo
          </Btn>
          <button
            className="nav-burger"
            onClick={() => setMobileOpen((v) => !v)}
            aria-label="Menu"
            style={{
              width: 36,
              height: 36,
              borderRadius: 'var(--r-sm)',
              border: '1px solid var(--line-strong)',
              background: 'transparent',
              color: 'var(--fg1)',
              cursor: 'pointer',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            <Icon name={mobileOpen ? 'x' : 'menu'} size={18} />
          </button>
        </div>
      </div>
      {mobileOpen && (
        <div className="mobile-menu" style={{ borderTop: '1px solid var(--line)', background: 'var(--bg-raised)', padding: '14px 24px 20px' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            {links.map(([label, sel]) => (
              <a
                key={label}
                href={sel}
                onClick={(e) => {
                  e.preventDefault();
                  jump(sel);
                }}
                style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: 16,
                  fontWeight: 500,
                  color: 'var(--fg1)',
                  textDecoration: 'none',
                  padding: '11px 0',
                  borderBottom: '1px solid var(--line)'
                }}
              >
                {label}
              </a>
            ))}
          </div>
          <div style={{ marginTop: 16 }}>
            <Btn variant={theme === 'dark' ? 'signal' : 'primary'} size="md" iconRight="arrow-right" style={{ width: '100%' }} onClick={onBookDemo}>
              Book a demo
            </Btn>
          </div>
        </div>
      )}
    </header>
  );
}

function ProductShot() {
  const src = '/assets/hero-product-light.webp';
  return (
    <div
      style={{
        borderRadius: 'var(--r-lg)',
        overflow: 'hidden',
        background: '#FFFFFF',
        border: '1px solid var(--line-strong)',
        boxShadow: 'var(--shadow-3)'
      }}
    >
      <div
        style={{
          height: 38,
          background: 'var(--bg-sunken)',
          borderBottom: '1px solid var(--line)',
          display: 'flex',
          alignItems: 'center',
          gap: 8,
          padding: '0 14px'
        }}
      >
        <div style={{ display: 'flex', gap: 7 }}>
          {['#D2502E', '#E8A317', '#2F9E6B'].map((c) => (
            <span key={c} style={{ width: 11, height: 11, borderRadius: '50%', background: c, opacity: 0.9 }} />
          ))}
        </div>
        <div
          style={{
            flex: 1,
            maxWidth: 340,
            margin: '0 auto',
            height: 23,
            borderRadius: 'var(--r-sm)',
            background: 'var(--surface)',
            border: '1px solid var(--line)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 7,
            padding: '0 10px',
            whiteSpace: 'nowrap',
            overflow: 'hidden'
          }}
        >
          <Icon name="lock" size={11} color="var(--fg3)" />
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: 11.5, color: 'var(--fg3)' }}>app.aarivix.com/ripna-quarry</span>
        </div>
        <div style={{ width: 54 }} />
      </div>
      <img src={src} alt="Aarivix workspace — quarry survey with area measurement" style={{ display: 'block', width: '100%', height: 'auto' }} />
    </div>
  );
}

function Hero({ motion = true, onBookDemo }) {
  return (
    <section style={{ position: 'relative', overflow: 'hidden' }}>
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          inset: 0,
          backgroundImage: 'linear-gradient(var(--grid-line) 1px, transparent 1px), linear-gradient(90deg, var(--grid-line) 1px, transparent 1px)',
          backgroundSize: '32px 32px',
          maskImage: 'radial-gradient(120% 90% at 72% 0%, #000 40%, transparent 85%)'
        }}
      />
      <div
        style={{
          ...WRAP,
          position: 'relative',
          paddingTop: 72,
          paddingBottom: 64,
          display: 'grid',
          gridTemplateColumns: '0.95fr 1.15fr',
          gap: 46,
          alignItems: 'center',
          textAlign: 'left'
        }}
        className="hero-grid"
      >
        <div>
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 9,
              padding: '5px 12px 5px 7px',
              border: '1px solid var(--line-strong)',
              borderRadius: 'var(--r-pill)',
              background: 'var(--bg-raised)'
            }}
          >
            <span
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: 10,
                fontWeight: 600,
                letterSpacing: '0.04em',
                background: 'var(--signal-500)',
                color: 'var(--petrol-900)',
                padding: '2px 7px',
                borderRadius: 'var(--r-pill)'
              }}
            >
              NEW
            </span>
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: 12, color: 'var(--fg2)', letterSpacing: '0.02em' }}>
              Compare every capture, milestone to milestone
            </span>
          </div>
          <h1
            className="hero-title"
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: 58,
              fontWeight: 600,
              lineHeight: 1.0,
              letterSpacing: '-0.03em',
              color: 'var(--fg1)',
              margin: '20px 0 0'
            }}
          >
            See exactly where your project stands against the plan.
          </h1>
          <p
            className="hero-sub"
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: 19,
              lineHeight: 1.55,
              color: 'var(--fg2)',
              margin: '22px 0 0',
              maxWidth: 540
            }}
          >
            Aarivix turns each site capture — by drone or 360 camera — into a measured
            reality model, aligned to your design and tracked across every milestone.
            One objective source of truth for developers and project managers.
          </p>
          <div style={{ display: 'flex', gap: 12, marginTop: 30, flexWrap: 'wrap' }}>
            <Btn variant="primary" size="lg" iconRight="arrow-right" onClick={onBookDemo}>
              Book a demo
            </Btn>
          </div>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 14,
              marginTop: 28,
              flexWrap: 'wrap',
              fontFamily: 'var(--font-mono)',
              fontSize: 12,
              color: 'var(--fg3)'
            }}
          >
            {['Independent verification', 'Drone & 360 capture', 'Milestone audit trail'].map((item, index) => (
              <span key={item} style={{ paddingLeft: index ? 14 : 0, borderLeft: index ? '1px solid var(--line-strong)' : 'none' }}>
                {item}
              </span>
            ))}
          </div>
        </div>
        <div style={{ width: '100%' }}>
          <ProductShot />
        </div>
      </div>
    </section>
  );
}

function TrustStrip() {
  const names = ['SHEVI CONSTRUCTION'];
  return (
    <section style={{ borderTop: '1px solid var(--line)', borderBottom: '1px solid var(--line)', background: 'var(--bg-raised)' }}>
      <div
        style={{
          ...WRAP,
          padding: '20px 32px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: 18
        }}
      >
        <span style={{ fontFamily: 'var(--font-mono)', fontSize: 11, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--fg3)', whiteSpace: 'nowrap' }}>
          Trusted on site by
        </span>
        <div style={{ display: 'flex', gap: 30, flexWrap: 'wrap', alignItems: 'center' }}>
          {names.map((name) => (
            <span key={name} style={{ fontFamily: 'var(--font-display)', fontWeight: 600, fontSize: 14.5, letterSpacing: '0.02em', color: 'var(--fg3)', whiteSpace: 'nowrap' }}>
              {name}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}

function HowItWorks({ motion = true }) {
  const [ref, seen] = useInView();
  const steps = useMemo(
    () => [
      {
        n: '01',
        icon: 'scan-line',
        eyebrow: 'Capture',
        title: 'Capture the site, any way you can reach it',
        body: 'Fly it by drone or walk it with a 360 camera. Aarivix turns the capture into a measured orthomosaic, terrain model and point cloud — registered to your control points — for open ground, interiors and vertical structures alike.'
      },
      {
        n: '02',
        icon: 'layers',
        eyebrow: 'Align',
        title: 'Align reality to the design',
        body: 'Aarivix locks each capture to your as-designed plan and to earlier captures — one shared coordinate frame — so every bench, surface and structure is compared like-for-like.'
      },
      {
        n: '03',
        icon: 'flag',
        eyebrow: 'Flag',
        title: 'Measure what changed, flag what’s off',
        body: 'Volumes, levels and deviations are computed automatically. Every change from the plan is flagged with a signed figure and a clear audit trail — ready to drop into a progress or payment report.'
      }
    ],
    []
  );

  return (
    <section id="how" style={{ ...WRAP, padding: '92px 32px 8px' }}>
      <div style={{ maxWidth: 640 }}>
        <Eyebrow>The workflow</Eyebrow>
        <h2
          style={{
            fontFamily: 'var(--font-display)',
            fontSize: 38,
            fontWeight: 600,
            letterSpacing: '-0.025em',
            color: 'var(--fg1)',
            margin: '14px 0 0',
            lineHeight: 1.06
          }}
        >
          Capture, align, flag. Three steps from site to source of truth.
        </h2>
        <p style={{ fontFamily: 'var(--font-body)', fontSize: 18, lineHeight: 1.55, color: 'var(--fg2)', margin: '16px 0 0' }}>
          No more guesswork between site visits. Aarivix turns every capture into a measured,
          versioned record of exactly how your site stands.
        </p>
      </div>
      <div
        ref={ref}
        className="how-grid"
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: 1,
          background: 'var(--line)',
          border: '1px solid var(--line)',
          borderRadius: 'var(--r-lg)',
          overflow: 'hidden',
          marginTop: 44
        }}
      >
        {steps.map((step) => (
          <div key={step.n} style={{ background: 'var(--surface)', padding: '30px 28px 32px', display: 'flex', flexDirection: 'column' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <span
                style={{
                  width: 40,
                  height: 40,
                  borderRadius: 'var(--r-md)',
                  border: '1px solid var(--line-strong)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'var(--fg1)'
                }}
              >
                <Icon name={step.icon} size={20} />
              </span>
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: 13, color: 'var(--info)', fontWeight: 500 }}>{step.n}</span>
            </div>
            <Eyebrow style={{ marginTop: 22, color: 'var(--fg3)' }}>{step.eyebrow}</Eyebrow>
            <h3
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: 21,
                fontWeight: 600,
                letterSpacing: '-0.015em',
                color: 'var(--fg1)',
                margin: '9px 0 0',
                lineHeight: 1.2
              }}
            >
              {step.title}
            </h3>
            <p style={{ fontFamily: 'var(--font-body)', fontSize: 14.5, lineHeight: 1.55, color: 'var(--fg2)', margin: '11px 0 0' }}>{step.body}</p>
          </div>
        ))}
      </div>
      <MetricBand seen={seen} motion={motion} />
    </section>
  );
}

function MetricStat({ stat, seen, motion }) {
  const value = useCountUp(stat.target, { start: seen, decimals: stat.decimals ?? 0, enabled: motion });
  return (
    <div style={{ background: 'var(--bg-raised)', padding: '26px 24px' }}>
      <div
        style={{
          fontFamily: 'var(--font-mono)',
          fontSize: 33,
          fontWeight: 500,
          color: 'var(--fg1)',
          letterSpacing: '0.01em',
          fontFeatureSettings: '"tnum" 1, "zero" 1'
        }}
      >
        {stat.pre || ''}
        {value}
        <span style={{ fontSize: 18, color: 'var(--fg3)' }}>{stat.unit}</span>
      </div>
      <div style={{ fontFamily: 'var(--font-body)', fontSize: 13.5, color: 'var(--fg2)', marginTop: 8, lineHeight: 1.4 }}>
        {stat.label}
      </div>
    </div>
  );
}

function MetricBand({ seen, motion = true }) {
  const stats = useMemo(
    () => [
      { target: 2, unit: '', label: 'Capture methods — drone & 360' },
      { target: 100, unit: '%', label: 'Captures registered to your control points' },
      { target: 4, unit: ' hrs', label: 'From capture to aligned model' },
      { target: 52.4, decimals: 1, unit: ' ha', label: 'Mapped per capture' }
    ],
    []
  );

  return (
    <div
      className="metric-band"
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(4, 1fr)',
        gap: 1,
        background: 'var(--line)',
        border: '1px solid var(--line)',
        borderRadius: 'var(--r-lg)',
        overflow: 'hidden',
        marginTop: 40
      }}
    >
      {stats.map((stat, index) => (
        <MetricStat key={index} stat={stat} seen={seen} motion={motion} />
      ))}
    </div>
  );
}

function Features() {
  const feats = useMemo(
    () => [
      {
        step: '01',
        eyebrow: 'Capture',
        title: 'A measured reality model, not a flat photo.',
        body: 'Capture by drone or 360 camera. Aarivix fuses imagery into a georeferenced point cloud and orthomosaic, then registers it to your site control points.',
        points: ['Drone and 360 camera capture', 'Auto-registration to survey control', 'Orthomosaic, DSM and point cloud outputs']
      },
      {
        step: '02',
        eyebrow: 'Align',
        title: 'Lock reality and design in one shared frame.',
        body: 'Import IFC, DWG or your design surface, and Aarivix aligns every capture to the same project coordinate system for consistent milestone comparison.',
        points: ['IFC / DWG / design-surface import', 'Shared coordinate frame across captures', 'Versioned milestone comparison']
      },
      {
        step: '03',
        eyebrow: 'Flag',
        title: 'Signed deviations, volumes and QA-ready reports.',
        body: 'Aarivix computes cut / fill volumes, level checks and off-plan deviations automatically, with a clear audit trail for progress and payment decisions.',
        points: ['Signed Δ with tolerance band', 'Volume and level checks', 'QA/QC reporting ready']
      }
    ],
    []
  );

  return (
    <section id="features" style={{ ...WRAP, padding: '84px 32px 24px' }}>
      <div style={{ maxWidth: 680, marginBottom: 44 }}>
        <Eyebrow>Platform</Eyebrow>
        <h2
          style={{
            fontFamily: 'var(--font-display)',
            fontSize: 38,
            fontWeight: 600,
            letterSpacing: '-0.025em',
            color: 'var(--fg1)',
            margin: '14px 0 0',
            lineHeight: 1.08
          }}
        >
          One platform for capture, alignment and site-quality decisions.
        </h2>
        <p style={{ fontFamily: 'var(--font-body)', fontSize: 18, lineHeight: 1.6, color: 'var(--fg2)', margin: '18px 0 0' }}>
          Aarivix removes manual site checks and delivers the one objective record every team can trust — from drone flight to deviation report.
        </p>
      </div>
      <div style={{ display: 'grid', gap: 24 }}>
        {feats.map((feature) => (
          <div
            key={feature.step}
            style={{
              borderRadius: 'var(--r-lg)',
              border: '1px solid var(--line)',
              background: 'var(--bg-raised)',
              padding: '32px',
              boxShadow: 'var(--shadow-1)'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
              <span
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: 13,
                  color: 'var(--info)',
                  fontWeight: 500,
                  minWidth: 44
                }}
              >
                {feature.step}
              </span>
              <Eyebrow style={{ color: 'var(--fg3)' }}>{feature.eyebrow}</Eyebrow>
            </div>
            <h3
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: 28,
                fontWeight: 600,
                letterSpacing: '-0.02em',
                color: 'var(--fg1)',
                margin: '16px 0 0',
                lineHeight: 1.2
              }}
            >
              {feature.title}
            </h3>
            <p style={{ fontFamily: 'var(--font-body)', fontSize: 16.5, lineHeight: 1.7, color: 'var(--fg2)', margin: '16px 0 0' }}>
              {feature.body}
            </p>
            <ul style={{ listStyle: 'none', padding: 0, margin: '22px 0 0', display: 'grid', gap: 10 }}>
              {feature.points.map((point) => (
                <li key={point} style={{ display: 'flex', alignItems: 'center', gap: 10, fontFamily: 'var(--font-body)', fontSize: 15, color: 'var(--fg1)' }}>
                  <Icon name="check" size={18} color="var(--ok)" />
                  <span>{point}</span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
}

function FAQItem({ q, a, open, onClick }) {
  return (
    <div style={{ borderBottom: '1px solid var(--line)' }}>
      <button
        onClick={onClick}
        style={{
          width: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: 20,
          padding: '22px 4px',
          background: 'transparent',
          border: 'none',
          cursor: 'pointer',
          textAlign: 'left'
        }}
      >
        <span style={{ fontFamily: 'var(--font-display)', fontSize: 18, fontWeight: 500, color: 'var(--fg1)', letterSpacing: '-0.01em' }}>{q}</span>
        <span style={{ flexShrink: 0, color: 'var(--fg3)', transition: 'transform .2s', transform: open ? 'rotate(45deg)' : 'none' }}>
          <Icon name="plus" size={20} />
        </span>
      </button>
      <div style={{ maxHeight: open ? 240 : 0, overflow: 'hidden', transition: 'max-height .25s cubic-bezier(0.2,0.8,0.2,1)' }}>
        <p style={{ fontFamily: 'var(--font-body)', fontSize: 15.5, lineHeight: 1.6, color: 'var(--fg2)', margin: '0 0 22px', maxWidth: 680 }}>{a}</p>
      </div>
    </div>
  );
}

function FAQ() {
  const [open, setOpen] = useState(0);
  const items = useMemo(
    () => [
      {
        q: 'How accurate is the survey?',
        a: 'Aarivix produces a survey-grade reality model, registered to your established ground control points. Every deviation from the plan is reported as a signed figure with its tolerance band — so you, your PMC and your contractor see not just that something moved, but how far and in which direction. One independent record everyone works from.'
      },
      {
        q: 'What capture hardware do we need?',
        a: 'A survey-grade drone or a 360 camera — whatever suits the site. Aarivix is hardware-agnostic: it ingests the imagery, registers it to your control points, and builds the reality model regardless of how the site was captured. Drone for open ground, 360 camera for interiors and vertical structures.'
      },
      {
        q: 'Which design formats can I align against?',
        a: 'Import IFC, DWG and design surfaces (DTM / TIN). Aarivix locks the as-built capture to your as-designed intent in a single shared coordinate frame, then versions every comparison against your project milestones.'
      },
      {
        q: 'How long does it take to get a report?',
        a: 'Roughly four hours from capture to an aligned reality model for a typical site. From there a progress or payment report — flagged deviations, cut/fill volumes and level checks with a full audit trail — is one click away.'
      },
      {
        q: 'Is our site data secure?',
        a: 'Reality models, imagery and designs are encrypted in transit and at rest, with role-based access per project. Aarivix is the objective record of your site, and that record stays yours.'
      }
    ],
    []
  );

  return (
    <section id="faq" style={{ ...WRAP, padding: '92px 32px 24px' }}>
      <div className="faq-grid" style={{ display: 'grid', gridTemplateColumns: '0.8fr 1.2fr', gap: 56, alignItems: 'start' }}>
        <div>
          <Eyebrow>FAQ</Eyebrow>
          <h2
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: 36,
              fontWeight: 600,
              letterSpacing: '-0.025em',
              color: 'var(--fg1)',
              margin: '14px 0 0',
              lineHeight: 1.08
            }}
          >
            Questions, measured answers.
          </h2>
          <p style={{ fontFamily: 'var(--font-body)', fontSize: 16.5, lineHeight: 1.55, color: 'var(--fg2)', margin: '16px 0 0' }}>
            Everything developers and project managers ask before their first capture.
          </p>
        </div>
        <div>
          {items.map((item, index) => (
            <FAQItem key={index} {...item} open={open === index} onClick={() => setOpen(open === index ? -1 : index)} />
          ))}
        </div>
      </div>
    </section>
  );
}

function CTABand({ onBookDemo }) {
  return (
    <section style={{ ...WRAP, padding: '80px 32px 88px' }}>
      <div
        style={{
          position: 'relative',
          overflow: 'hidden',
          borderRadius: 'var(--r-xl)',
          background: 'var(--petrol-900)',
          padding: '68px 56px'
        }}
      >
        <div
          aria-hidden="true"
          style={{
            position: 'absolute',
            inset: 0,
            backgroundImage: 'linear-gradient(rgba(174,208,201,0.09) 1px, transparent 1px), linear-gradient(90deg, rgba(174,208,201,0.09) 1px, transparent 1px)',
            backgroundSize: '30px 30px',
            maskImage: 'radial-gradient(120% 130% at 85% 0%, #000 30%, transparent 75%)'
          }}
        />
        <div
          aria-hidden="true"
          style={{
            position: 'absolute',
            top: 0,
            bottom: 0,
            right: '16%',
            width: 2,
            background: 'linear-gradient(rgba(255,251,8,0.0), rgba(255,251,8,0.5), rgba(255,251,8,0.0))'
          }}
        />
        <div style={{ position: 'relative', maxWidth: 660 }}>
          <Eyebrow color="var(--mint-500)">Reality, Measured.</Eyebrow>
          <h2
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: 42,
              fontWeight: 600,
              letterSpacing: '-0.025em',
              color: 'var(--paper-50)',
              margin: '14px 0 0',
              lineHeight: 1.06
            }}
          >
            Stop guessing between site visits. Measure the site.
          </h2>
          <p style={{ fontFamily: 'var(--font-body)', fontSize: 18, lineHeight: 1.6, color: 'var(--petrol-200)', margin: '16px 0 30px', maxWidth: 560 }}>
            Bring one objective source of truth to your next milestone — the record you, your
            PMC and your contractor all work from.
          </p>
          <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
            <Btn variant="signal" size="lg" iconRight="arrow-right" onClick={onBookDemo}>
              Book a demo
            </Btn>
          </div>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer style={{ borderTop: '1px solid var(--line)', background: 'var(--bg-raised)' }}>
      <div style={{ ...WRAP, padding: '52px 32px 40px', display: 'grid', gap: 28 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <img src="/assets/aarivix-mark.webp" alt="Aarivix" style={{ height: 28 }} />
          <span style={{ fontFamily: 'var(--font-display)', fontWeight: 600, fontSize: 19, color: 'var(--fg1)' }}>Aarivix</span>
        </div>
        <p style={{ maxWidth: 520, fontFamily: 'var(--font-body)', fontSize: 15, lineHeight: 1.7, color: 'var(--fg2)' }}>
          Aarivix brings the objective record of site progress to your team — from capture through deviation verification and milestone reporting.
        </p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8, color: 'var(--fg3)', fontFamily: 'var(--font-body)', fontSize: 14 }}>
          <span>aarivix.tech@gmail.com</span>
          <span>© 2026 Aarivix.</span>
        </div>
      </div>
    </footer>
  );
}

function DemoModal({ open, onClose }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [company, setCompany] = useState('');
  const [message, setMessage] = useState('');
  const [status, setStatus] = useState('idle');
  const [error, setError] = useState('');

  const accessKey = process.env.NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY;

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError('');
    if (!accessKey) {
      setError('Web3Forms access key is not configured. Please set NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY in .env.local.');
      setStatus('error');
      return;
    }

    setStatus('submitting');
    try {
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          access_key: accessKey,
          subject: 'Aarivix demo request',
          name,
          email,
          message,
          data: { company }
        })
      });

      if (!response.ok) {
        const payload = await response.json().catch(() => ({}));
        throw new Error(payload.message || 'Unable to submit request.');
      }

      setStatus('success');
      setName('');
      setEmail('');
      setCompany('');
      setMessage('');
    } catch (err) {
      setError(err.message || 'Something went wrong.');
      setStatus('error');
    }
  };

  if (!open) return null;

  return (
    <div className="modal-backdrop" role="dialog" aria-modal="true" onClick={onClose}>
      <div className="modal-panel" onClick={(event) => event.stopPropagation()}>
        <button className="modal-close" onClick={onClose} aria-label="Close demo request form">
          <Icon name="x" size={18} />
        </button>
        <div style={{ marginBottom: 18 }}>
          <Eyebrow style={{ color: 'var(--mint-500)' }}>Book a demo</Eyebrow>
          <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 32, fontWeight: 600, color: 'var(--fg1)', margin: '12px 0 0', lineHeight: 1.1 }}>
            Tell us about your project and we’ll schedule a walkthrough.
          </h2>
        </div>
        <form className="modal-form" onSubmit={handleSubmit}>
          <label>
            Name
            <input type="text" value={name} onChange={(e) => setName(e.target.value)} required />
          </label>
          <label>
            Email
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
          </label>
          <label>
            Company
            <input value={company} onChange={(e) => setCompany(e.target.value)} />
          </label>
          <label>
            Project details
            <textarea rows={4} value={message} onChange={(e) => setMessage(e.target.value)} required />
          </label>
          {status === 'success' && <div className="modal-success">Thanks! We’ll be in touch soon.</div>}
          {error && <div className="modal-error">{error}</div>}
          <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: 18 }}>
            <button type="submit" className="btn btn-primary" disabled={status === 'submitting'}>
              {status === 'submitting' ? 'Sending…' : 'Send request'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default function Home() {
  const [theme, setTheme] = useState('light');
  const [motion] = useState(true);
  const [demoOpen, setDemoOpen] = useState(false);

  useEffect(() => {
    try {
      const stored = localStorage.getItem('aarivix-theme');
      if (stored === 'dark' || stored === 'light') {
        setTheme(stored);
      }
    } catch (error) {
      // ignore
    }
  }, []);

  useEffect(() => {
    const attr = theme === 'dark' ? 'dark' : 'light';
    document.documentElement.setAttribute('data-theme', attr);
    document.body.setAttribute('data-theme', attr);
    try {
      localStorage.setItem('aarivix-theme', attr);
    } catch (error) {
      // ignore
    }
  }, [theme]);

  const toggleTheme = () => setTheme((value) => (value === 'dark' ? 'light' : 'dark'));
  const onBookDemo = () => setDemoOpen(true);

  return (
    <div id="scrollroot">
      <Nav theme={theme} onToggleTheme={toggleTheme} onBookDemo={onBookDemo} />
      <Hero motion={motion} onBookDemo={onBookDemo} />
      <TrustStrip />
      <HowItWorks motion={motion} />
      <Features />
      <FAQ />
      <CTABand onBookDemo={onBookDemo} />
      <Footer />
      <DemoModal open={demoOpen} onClose={() => setDemoOpen(false)} />
    </div>
  );
}
