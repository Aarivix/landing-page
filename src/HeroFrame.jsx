/* Hero product shot — the real Aarivix workspace, recolored to brand, shown in a
   themed browser frame. Light/dark images swap with the page theme. */

function ProductShot({ theme = "light" }) {
  const dark = theme === "dark";
  const src = dark ? "assets/hero-product-dark.png" : "assets/hero-product-light.png";
  return (
    <div style={{ borderRadius: "var(--r-lg)", overflow: "hidden",
      background: dark ? "#062A3D" : "#FFFFFF",
      border: "1px solid var(--line-strong)", boxShadow: "var(--shadow-3)" }}>
      {/* browser chrome */}
      <div style={{ height: 38, background: dark ? "#04202F" : "var(--bg-sunken)",
        borderBottom: "1px solid var(--line)", display: "flex", alignItems: "center",
        gap: 8, padding: "0 14px" }}>
        <div style={{ display: "flex", gap: 7 }}>
          {["#D2502E", "#E8A317", "#2F9E6B"].map((c) => (
            <span key={c} style={{ width: 11, height: 11, borderRadius: "50%", background: c, opacity: 0.9 }} />
          ))}
        </div>
        <div style={{ flex: 1, maxWidth: 340, margin: "0 auto", height: 23, borderRadius: "var(--r-sm)",
          background: dark ? "#062A3D" : "var(--surface)", border: "1px solid var(--line)",
          display: "flex", alignItems: "center", justifyContent: "center", gap: 7, padding: "0 10px",
          whiteSpace: "nowrap", overflow: "hidden" }}>
          <Icon name="lock" size={11} color="var(--fg3)" />
          <span style={{ fontFamily: "var(--font-mono)", fontSize: 11.5, color: "var(--fg3)" }}>app.aarivix.com/ripna-quarry</span>
        </div>
        <div style={{ width: 54 }} />
      </div>
      {/* the recolored product screenshot */}
      <img src={src} alt="Aarivix workspace — quarry survey with area measurement"
        style={{ display: "block", width: "100%", height: "auto" }} />
    </div>
  );
}

Object.assign(window, { ProductShot });
