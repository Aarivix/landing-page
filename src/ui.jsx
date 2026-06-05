/* Aarivix landing — primitives & hooks */
const { useState, useRef, useEffect, useCallback } = React;

/* Lucide icon */
function Icon({ name, size = 18, strokeWidth = 1.75, color, style }) {
  const ref = useRef(null);
  useEffect(() => {
    if (ref.current && window.lucide) {
      ref.current.innerHTML = "";
      const el = document.createElement("i");
      el.setAttribute("data-lucide", name);
      ref.current.appendChild(el);
      window.lucide.createIcons({ attrs: { width: size, height: size, "stroke-width": strokeWidth } });
    }
  }, [name, size, strokeWidth]);
  return <span ref={ref} style={{ display: "inline-flex", color: color || "currentColor", lineHeight: 0, ...style }} />;
}

/* Button */
function Btn({ variant = "primary", size = "md", icon, iconRight, children, href = "#", style, onClick, className }) {
  const base = {
    fontFamily: "var(--font-display)", fontWeight: 500, letterSpacing: "-0.01em",
    border: "1px solid transparent", borderRadius: "var(--r-sm)", cursor: "pointer",
    display: "inline-flex", alignItems: "center", justifyContent: "center", gap: 8, textDecoration: "none",
    transition: "background .15s, border-color .15s, transform .08s, color .15s", whiteSpace: "nowrap",
  };
  const sizes = {
    sm: { fontSize: 14, padding: "8px 14px" },
    md: { fontSize: 15, padding: "11px 20px" },
    lg: { fontSize: 16.5, padding: "14px 26px" },
  };
  const variants = {
    primary:     { background: "var(--accent)", color: "var(--accent-fg)" },
    signal:      { background: "var(--signal-500)", color: "var(--petrol-900)" },
    secondary:   { background: "transparent", color: "var(--fg1)", borderColor: "var(--line-strong)" },
    ghost:       { background: "transparent", color: "var(--fg2)" },
    onDark:      { background: "var(--signal-500)", color: "var(--petrol-900)" },
    onDarkGhost: { background: "transparent", color: "var(--paper-100)", borderColor: "rgba(174,208,201,0.35)" },
  };
  return (
    <a href={href} className={className}
      onClick={(e) => { e.preventDefault(); onClick && onClick(); }}
      style={{ ...base, ...sizes[size], ...variants[variant], ...style }}
      onMouseDown={(e) => (e.currentTarget.style.transform = "translateY(1px)")}
      onMouseUp={(e) => (e.currentTarget.style.transform = "")}
      onMouseLeave={(e) => (e.currentTarget.style.transform = "")}>
      {icon && <Icon name={icon} size={size === "lg" ? 19 : 17} />}
      {children}
      {iconRight && <Icon name={iconRight} size={size === "lg" ? 19 : 17} />}
    </a>
  );
}

function Eyebrow({ children, color, style }) {
  return <div style={{ fontFamily: "var(--font-mono)", fontSize: 12, fontWeight: 500,
    letterSpacing: "0.1em", textTransform: "uppercase", color: color || "var(--info)", ...style }}>{children}</div>;
}

/* measurement-tick rule — house divider device */
function TickRule({ color = "var(--line-strong)", style }) {
  return <div aria-hidden="true" style={{ height: 12,
    backgroundImage: `repeating-linear-gradient(90deg, ${color} 0 1px, transparent 1px 13px)`,
    backgroundSize: "13px 12px", backgroundRepeat: "repeat-x", opacity: 0.55, ...style }} />;
}

/* flips true once the element is within the viewport. Uses a setInterval rect
   poll (fires even when rAF is throttled in background/capture contexts) plus an
   immediate check, so it's reliable everywhere. */
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
      if (r.top < vh - margin && r.bottom > 0) { setSeen(true); return true; }
      return false;
    };
    if (check()) return;
    const onScroll = () => check();
    window.addEventListener("scroll", onScroll, { passive: true, capture: true });
    window.addEventListener("resize", onScroll);
    const iv = setInterval(check, 200);
    return () => {
      window.removeEventListener("scroll", onScroll, { capture: true });
      window.removeEventListener("resize", onScroll);
      clearInterval(iv);
    };
  }, [seen]);
  return [ref, seen];
}

/* count-up to a number once `start` flips true. Resting value is the TARGET, so
   if motion is off/reduced or rAF is throttled the real number always shows. A
   setTimeout fallback guarantees the final value lands even without rAF ticks. */
function useCountUp(target, { start, duration = 1100, decimals = 0, enabled = true } = {}) {
  const reduce = typeof window !== "undefined" &&
    window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const animate = enabled && !reduce;
  const [val, setVal] = useState(animate ? 0 : target);
  useEffect(() => {
    if (!animate) { setVal(target); return; }
    if (!start) return;
    let raf, t0;
    const ease = (p) => 1 - Math.pow(1 - p, 3);
    const loop = (t) => {
      if (!t0) t0 = t;
      const p = Math.min((t - t0) / duration, 1);
      setVal(target * ease(p));
      if (p < 1) raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    const fallback = setTimeout(() => setVal(target), duration + 500);
    return () => { cancelAnimationFrame(raf); clearTimeout(fallback); };
  }, [start, target, animate]);
  return Number(val).toFixed(decimals);
}

const WRAP = { maxWidth: 1180, margin: "0 auto", padding: "0 32px", width: "100%", boxSizing: "border-box" };

Object.assign(window, { Icon, Btn, Eyebrow, TickRule, useInView, useCountUp, WRAP,
  useState, useRef, useEffect, useCallback });
