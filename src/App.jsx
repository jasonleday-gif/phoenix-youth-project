import { useState, useEffect, useRef } from "react";

const COLORS = {
  black: "#0a0a0a",
  charcoal: "#141414",
  darkGray: "#1e1e1e",
  ember: "#c2410c",
  fire: "#ea580c",
  amber: "#f59e0b",
  gold: "#fbbf24",
  cream: "#fef3c7",
  white: "#fafafa",
  muted: "#9ca3af",
};

const googleFonts = `
  @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Crimson+Pro:ital,wght@0,300;0,400;0,600;1,300;1,400&family=Rajdhani:wght@400;500;600;700&display=swap');
`;

const styles = `
  ${googleFonts}
  * { box-sizing: border-box; margin: 0; padding: 0; }
  html { scroll-behavior: smooth; }
  body { background: ${COLORS.black}; color: ${COLORS.white}; }

  .font-display { font-family: 'Bebas Neue', sans-serif; }
  .font-body { font-family: 'Crimson Pro', Georgia, serif; }
  .font-ui { font-family: 'Rajdhani', sans-serif; }

  .fire-text {
    background: linear-gradient(135deg, ${COLORS.amber} 0%, ${COLORS.fire} 50%, ${COLORS.ember} 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }

  .hero-bg {
    background:
      radial-gradient(ellipse 80% 60% at 50% 100%, rgba(194,65,12,0.35) 0%, transparent 70%),
      radial-gradient(ellipse 50% 40% at 70% 80%, rgba(245,158,11,0.15) 0%, transparent 60%),
      radial-gradient(ellipse 60% 50% at 30% 90%, rgba(234,88,12,0.2) 0%, transparent 60%),
      ${COLORS.black};
  }

  .section-bg-alt { background: ${COLORS.charcoal}; }
  .section-bg { background: ${COLORS.black}; }
  .card-bg { background: ${COLORS.darkGray}; }

  .ember-border { border: 1px solid rgba(245,158,11,0.3); }
  .ember-border-top { border-top: 1px solid rgba(245,158,11,0.3); }

  .nav-blur {
    backdrop-filter: blur(20px);
    -webkit-backdrop-filter: blur(20px);
    background: rgba(10,10,10,0.85);
    border-bottom: 1px solid rgba(245,158,11,0.15);
  }

  .flame-divider {
    width: 60px;
    height: 3px;
    background: linear-gradient(90deg, ${COLORS.fire}, ${COLORS.amber});
    border-radius: 2px;
  }

  .program-card {
    background: ${COLORS.darkGray};
    border: 1px solid rgba(245,158,11,0.12);
    transition: all 0.35s ease;
    position: relative;
    overflow: hidden;
  }
  .program-card::before {
    content: '';
    position: absolute;
    bottom: 0; left: 0; right: 0;
    height: 2px;
    background: linear-gradient(90deg, ${COLORS.fire}, ${COLORS.amber});
    transform: scaleX(0);
    transition: transform 0.35s ease;
  }
  .program-card:hover::before { transform: scaleX(1); }
  .program-card:hover {
    border-color: rgba(245,158,11,0.35);
    transform: translateY(-4px);
    box-shadow: 0 20px 60px rgba(194,65,12,0.2);
  }

  .donate-btn {
    background: linear-gradient(135deg, ${COLORS.fire} 0%, ${COLORS.amber} 100%);
    color: ${COLORS.black};
    font-family: 'Rajdhani', sans-serif;
    font-weight: 700;
    letter-spacing: 0.1em;
    transition: all 0.3s ease;
    position: relative;
    overflow: hidden;
  }
  .donate-btn::after {
    content: '';
    position: absolute;
    inset: 0;
    background: rgba(255,255,255,0);
    transition: background 0.3s ease;
  }
  .donate-btn:hover::after { background: rgba(255,255,255,0.1); }
  .donate-btn:hover { transform: translateY(-2px); box-shadow: 0 10px 40px rgba(234,88,12,0.5); }

  .ghost-btn {
    border: 1px solid rgba(245,158,11,0.5);
    color: ${COLORS.amber};
    font-family: 'Rajdhani', sans-serif;
    font-weight: 600;
    letter-spacing: 0.08em;
    transition: all 0.3s ease;
  }
  .ghost-btn:hover {
    background: rgba(245,158,11,0.1);
    border-color: ${COLORS.amber};
    box-shadow: 0 0 20px rgba(245,158,11,0.2);
  }

  .stat-card {
    background: linear-gradient(135deg, rgba(30,30,30,0.8), rgba(20,20,20,0.9));
    border: 1px solid rgba(245,158,11,0.15);
  }

  .cycling-card {
    background: ${COLORS.darkGray};
    border: 1px solid rgba(245,158,11,0.15);
    transition: all 0.3s ease;
  }
  .cycling-card:hover {
    border-color: rgba(245,158,11,0.4);
    box-shadow: 0 8px 30px rgba(194,65,12,0.15);
  }

  .timeline-line {
    position: absolute;
    left: 20px;
    top: 0; bottom: 0;
    width: 1px;
    background: linear-gradient(180deg, ${COLORS.fire}, ${COLORS.amber}, transparent);
  }
  .timeline-dot {
    width: 10px; height: 10px;
    background: ${COLORS.amber};
    border-radius: 50%;
    box-shadow: 0 0 12px rgba(245,158,11,0.7);
    flex-shrink: 0;
  }

  .hero-phoenix {
    position: absolute;
    bottom: -10%;
    left: 50%;
    transform: translateX(-50%);
    width: 600px;
    height: 600px;
    background: radial-gradient(ellipse at center bottom, rgba(234,88,12,0.12) 0%, transparent 70%);
    pointer-events: none;
  }

  @keyframes flicker {
    0%, 100% { opacity: 1; }
    50% { opacity: 0.85; }
  }
  @keyframes rise {
    from { opacity: 0; transform: translateY(40px); }
    to { opacity: 1; transform: translateY(0); }
  }
  @keyframes fadeIn {
    from { opacity: 0; }
    to { opacity: 1; }
  }
  .animate-rise { animation: rise 0.9s ease forwards; }
  .animate-rise-delay { animation: rise 0.9s 0.2s ease both; }
  .animate-rise-delay2 { animation: rise 0.9s 0.4s ease both; }
  .animate-rise-delay3 { animation: rise 0.9s 0.6s ease both; }
  .animate-fade { animation: fadeIn 1.2s ease forwards; }

  .placeholder-img {
    background: linear-gradient(135deg, ${COLORS.darkGray}, ${COLORS.charcoal});
    border: 1px dashed rgba(245,158,11,0.3);
    display: flex;
    align-items: center;
    justify-content: center;
    color: rgba(245,158,11,0.5);
    font-family: 'Rajdhani', sans-serif;
    font-size: 0.85rem;
    letter-spacing: 0.1em;
    text-transform: uppercase;
  }

  .nav-link {
    font-family: 'Rajdhani', sans-serif;
    font-weight: 600;
    letter-spacing: 0.08em;
    font-size: 0.85rem;
    text-transform: uppercase;
    color: rgba(250,250,250,0.7);
    transition: color 0.2s ease;
    cursor: pointer;
  }
  .nav-link:hover, .nav-link.active { color: ${COLORS.amber}; }

  .mobile-menu {
    background: rgba(10,10,10,0.98);
    border-top: 1px solid rgba(245,158,11,0.15);
  }

  .quote-mark {
    font-family: 'Bebas Neue', sans-serif;
    font-size: 8rem;
    line-height: 0.5;
    color: rgba(245,158,11,0.12);
    pointer-events: none;
  }

  section { scroll-margin-top: 70px; }
`;

// --- ICONS (inline SVG) ---
const IconLeaf = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" style={{width:28,height:28}}>
    <path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10z"/>
    <path d="M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12"/>
  </svg>
);

const IconHorse = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" style={{width:28,height:28}}>
    <path d="M12 2C6 2 3 7 3 12v6h2l1-3h12l1 3h2v-6c0-5-3-10-9-10z"/>
    <circle cx="9" cy="9" r="1" fill="currentColor"/>
  </svg>
);

const IconBook = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" style={{width:28,height:28}}>
    <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/>
    <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/>
  </svg>
);

const IconBriefcase = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" style={{width:28,height:28}}>
    <rect x="2" y="7" width="20" height="14" rx="2"/>
    <path d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2"/>
    <line x1="12" y1="12" x2="12" y2="12.01" strokeWidth="3"/>
  </svg>
);

const IconStar = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" style={{width:28,height:28}}>
    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
  </svg>
);

const IconHeart = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" style={{width:28,height:28}}>
    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
  </svg>
);

const IconBike = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" style={{width:28,height:28}}>
    <circle cx="5.5" cy="17.5" r="3.5"/>
    <circle cx="18.5" cy="17.5" r="3.5"/>
    <path d="M15 6a1 1 0 1 0 0-2 1 1 0 0 0 0 2zm-3 11.5L9 11l4-1 2 4h4.5"/>
    <path d="M5.5 17.5L8 11l4 0"/>
  </svg>
);

const IconTrophy = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" style={{width:28,height:28}}>
    <path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6"/>
    <path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18"/>
    <path d="M4 22h16"/>
    <path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22"/>
    <path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22"/>
    <path d="M18 2H6v7a6 6 0 0 0 12 0V2z"/>
  </svg>
);

const IconMap = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" style={{width:22,height:22}}>
    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
    <circle cx="12" cy="10" r="3"/>
  </svg>
);

const IconMail = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" style={{width:22,height:22}}>
    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
    <polyline points="22,6 12,13 2,6"/>
  </svg>
);

const IconMenu = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{width:24,height:24}}>
    <line x1="3" y1="6" x2="21" y2="6"/>
    <line x1="3" y1="12" x2="21" y2="12"/>
    <line x1="3" y1="18" x2="21" y2="18"/>
  </svg>
);

const IconX = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{width:24,height:24}}>
    <line x1="18" y1="6" x2="6" y2="18"/>
    <line x1="6" y1="6" x2="18" y2="18"/>
  </svg>
);

// Phoenix SVG Logo
const PhoenixLogo = ({ size = 40 }) => (
  <svg width={size} height={size} viewBox="0 0 80 80" fill="none">
    <defs>
      <linearGradient id="phoenix-grad" x1="0%" y1="100%" x2="100%" y2="0%">
        <stop offset="0%" stopColor="#c2410c"/>
        <stop offset="50%" stopColor="#ea580c"/>
        <stop offset="100%" stopColor="#fbbf24"/>
      </linearGradient>
    </defs>
    {/* Wings */}
    <path d="M40 55 C20 45, 5 35, 8 20 C15 28, 25 32, 35 38 C30 28, 28 18, 35 8 C38 18, 38 30, 40 40" fill="url(#phoenix-grad)" opacity="0.9"/>
    <path d="M40 55 C60 45, 75 35, 72 20 C65 28, 55 32, 45 38 C50 28, 52 18, 45 8 C42 18, 42 30, 40 40" fill="url(#phoenix-grad)" opacity="0.9"/>
    {/* Body/flame */}
    <path d="M40 70 C34 60, 32 50, 38 42 C39 48, 41 48, 42 42 C48 50, 46 60, 40 70Z" fill="#fbbf24"/>
    {/* Head */}
    <circle cx="40" cy="36" r="5" fill="#fbbf24"/>
    <path d="M38 32 L40 26 L42 32" fill="#ea580c"/>
  </svg>
);

// ============================================================
// SECTIONS
// ============================================================

function NavBar({ activeSection, scrollTo }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 30);
    window.addEventListener("scroll", handler);
    return () => window.removeEventListener("scroll", handler);
  }, []);

  const links = [
    { id: "mission", label: "Mission" },
    { id: "programs", label: "Programs" },
    { id: "story", label: "Our Story" },
    { id: "brandon", label: "Brandon's Journey" },
    { id: "contact", label: "Contact" },
  ];

  return (
    <nav style={{
      position: "fixed", top: 0, left: 0, right: 0, zIndex: 100,
      transition: "all 0.3s ease",
    }} className={scrolled ? "nav-blur" : ""}>
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 24px" }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", height: 70 }}>
          {/* Logo */}
          <div style={{ display: "flex", alignItems: "center", gap: 12, cursor: "pointer" }}
               onClick={() => scrollTo("hero")}>
            <PhoenixLogo size={38} />
            <div>
              <div className="font-display" style={{ fontSize: "1.3rem", letterSpacing: "0.05em", lineHeight: 1, color: COLORS.white }}>
                PHOENIX
              </div>
              <div className="font-ui" style={{ fontSize: "0.6rem", letterSpacing: "0.2em", color: COLORS.amber, lineHeight: 1 }}>
                YOUTH PROJECT
              </div>
            </div>
          </div>

          {/* Desktop Links */}
          <div style={{ display: "flex", gap: 32, alignItems: "center" }}
               className="hidden-mobile">
            {links.map(l => (
              <span key={l.id} className={`nav-link ${activeSection === l.id ? "active" : ""}`}
                    onClick={() => scrollTo(l.id)}>
                {l.label}
              </span>
            ))}
            <button className="donate-btn" style={{ padding: "8px 22px", borderRadius: 4, border: "none", cursor: "pointer", fontSize: "0.85rem" }}
                    onClick={() => scrollTo("donate")}>
              DONATE
            </button>
          </div>

          {/* Mobile Toggle */}
          <button onClick={() => setMenuOpen(!menuOpen)}
                  style={{ background: "none", border: "none", color: COLORS.white, cursor: "pointer", display: "none" }}
                  className="mobile-toggle">
            {menuOpen ? <IconX /> : <IconMenu />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="mobile-menu" style={{ padding: "16px 24px 24px" }}>
          {links.map(l => (
            <div key={l.id} className="nav-link" style={{ padding: "12px 0", borderBottom: "1px solid rgba(255,255,255,0.05)" }}
                 onClick={() => { scrollTo(l.id); setMenuOpen(false); }}>
              {l.label}
            </div>
          ))}
          <button className="donate-btn" style={{ marginTop: 20, padding: "12px 28px", borderRadius: 4, border: "none", cursor: "pointer", fontSize: "0.9rem", width: "100%" }}
                  onClick={() => { scrollTo("donate"); setMenuOpen(false); }}>
            DONATE NOW
          </button>
        </div>
      )}

      <style>{`
        @media (max-width: 768px) {
          .hidden-mobile { display: none !important; }
          .mobile-toggle { display: block !important; }
        }
      `}</style>
    </nav>
  );
}

function HeroSection() {
  return (
    <section id="hero" className="hero-bg" style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", position: "relative", overflow: "hidden", paddingTop: 70 }}>
      {/* Decorative elements */}
      <div style={{ position: "absolute", inset: 0, backgroundImage: "radial-gradient(rgba(245,158,11,0.03) 1px, transparent 1px)", backgroundSize: "40px 40px", pointerEvents: "none" }} />
      <div className="hero-phoenix" />

      <div style={{ textAlign: "center", maxWidth: 900, padding: "0 24px", position: "relative", zIndex: 2 }}>
        <div className="animate-rise" style={{ marginBottom: 24 }}>
          <PhoenixLogo size={80} />
        </div>

        <div className="animate-rise-delay font-ui" style={{ color: COLORS.amber, letterSpacing: "0.3em", fontSize: "0.8rem", marginBottom: 16, textTransform: "uppercase" }}>
          Est. 2025 · Katy, Texas · 501(c)(3) Approved
        </div>

        <h1 className="animate-rise-delay font-display" style={{ fontSize: "clamp(3.5rem, 10vw, 8rem)", lineHeight: 0.95, letterSpacing: "0.02em", marginBottom: 24 }}>
          <span style={{ display: "block", color: COLORS.white }}>RISE FROM</span>
          <span className="fire-text" style={{ display: "block" }}>THE ASHES</span>
        </h1>

        <p className="animate-rise-delay2 font-body" style={{ fontSize: "1.35rem", color: "rgba(254,243,199,0.8)", lineHeight: 1.7, maxWidth: 620, margin: "0 auto 40px", fontStyle: "italic" }}>
          Empowering children and teenagers in foster care to discover their strength,
          build their future, and rise — just like the phoenix.
        </p>

        <div className="animate-rise-delay3" style={{ display: "flex", gap: 16, justifyContent: "center", flexWrap: "wrap" }}>
          <button className="donate-btn" style={{ padding: "15px 40px", borderRadius: 4, border: "none", cursor: "pointer", fontSize: "1rem" }}>
            DONATE NOW
          </button>
          <button className="ghost-btn" style={{ padding: "15px 40px", borderRadius: 4, background: "transparent", cursor: "pointer", fontSize: "1rem" }}
                  onClick={() => document.getElementById("mission")?.scrollIntoView({ behavior: "smooth" })}>
            OUR MISSION
          </button>
        </div>

        <div className="animate-fade" style={{ marginTop: 80, display: "flex", gap: 48, justifyContent: "center", flexWrap: "wrap" }}>
          {[["501(c)(3)", "Federally Approved"], ["EIN", "39-5149790"], ["Texas", "Registered Nonprofit"]].map(([title, sub]) => (
            <div key={title} className="font-ui" style={{ textAlign: "center" }}>
              <div style={{ color: COLORS.amber, fontSize: "1rem", fontWeight: 700, letterSpacing: "0.1em" }}>{title}</div>
              <div style={{ color: "rgba(255,255,255,0.4)", fontSize: "0.75rem", letterSpacing: "0.1em", textTransform: "uppercase" }}>{sub}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Scroll indicator */}
      <div style={{ position: "absolute", bottom: 32, left: "50%", transform: "translateX(-50%)", display: "flex", flexDirection: "column", alignItems: "center", gap: 8 }}>
        <div className="font-ui" style={{ color: "rgba(255,255,255,0.3)", fontSize: "0.7rem", letterSpacing: "0.2em" }}>SCROLL</div>
        <div style={{ width: 1, height: 40, background: "linear-gradient(180deg, rgba(245,158,11,0.6), transparent)" }} />
      </div>
    </section>
  );
}

function MissionSection() {
  return (
    <section id="mission" className="section-bg-alt" style={{ padding: "100px 24px" }}>
      <div style={{ maxWidth: 1100, margin: "0 auto" }}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 60, alignItems: "center" }}>
          <div>
            <div className="font-ui" style={{ color: COLORS.amber, letterSpacing: "0.25em", fontSize: "0.75rem", textTransform: "uppercase", marginBottom: 16 }}>
              Our Mission
            </div>
            <div className="flame-divider" style={{ marginBottom: 28 }} />
            <h2 className="font-display" style={{ fontSize: "clamp(2.5rem, 5vw, 4rem)", lineHeight: 1, color: COLORS.white, marginBottom: 28, letterSpacing: "0.02em" }}>
              BUILDING FUTURES,<br />
              <span className="fire-text">ONE LIFE AT A TIME</span>
            </h2>
            <p className="font-body" style={{ fontSize: "1.15rem", color: "rgba(254,243,199,0.75)", lineHeight: 1.8, marginBottom: 24 }}>
              The Phoenix Youth Project is dedicated to empowering children and teenagers in foster care
              residing in residential treatment centers and general residential organizations across Texas.
            </p>
            <p className="font-body" style={{ fontSize: "1.1rem", color: "rgba(255,255,255,0.55)", lineHeight: 1.8 }}>
              We believe every child deserves the opportunity to rise. Through essential life skills,
              academic support, therapeutic interventions, and workforce preparation, we bridge
              the gap between where they are and where they deserve to be.
            </p>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
            {[
              { icon: "🔥", title: "Resilience-First", desc: "Programs designed around the phoenix principle — that strength emerges from adversity" },
              { icon: "🌱", title: "Whole-Child Approach", desc: "Life skills, academics, behavioral therapy, career development, and emotional wellbeing" },
              { icon: "🤝", title: "Community Partnership", desc: "Partnering with residential centers across Texas to bring resources directly to youth" },
              { icon: "📋", title: "Fully Compliant", desc: "IRS 501(c)(3) approved · EIN 39-5149790 · Texas Secretary of State registered" },
            ].map(item => (
              <div key={item.title} className="program-card" style={{ padding: "20px 24px", borderRadius: 8, display: "flex", gap: 16, alignItems: "flex-start" }}>
                <span style={{ fontSize: "1.5rem", flexShrink: 0, marginTop: 2 }}>{item.icon}</span>
                <div>
                  <div className="font-ui" style={{ color: COLORS.amber, fontWeight: 700, letterSpacing: "0.05em", marginBottom: 4 }}>{item.title}</div>
                  <div className="font-body" style={{ color: "rgba(255,255,255,0.55)", fontSize: "0.95rem", lineHeight: 1.6 }}>{item.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function ProgramsSection() {
  const programs = [
    { icon: <IconLeaf />, title: "Horticulture Therapy", desc: "Cultivating healing through nature. Youth learn to grow plants and gardens as a tool for mindfulness, patience, and emotional regulation.", tag: "Behavioral Therapy" },
    { icon: <IconHorse />, title: "Equine Interventions", desc: "Building trust, confidence, and communication skills through supervised interaction with horses — a powerful therapeutic modality.", tag: "Behavioral Therapy" },
    { icon: <IconBook />, title: "Academic Tutoring", desc: "One-on-one and small group tutoring to help foster youth build academic foundations and confidence in their educational journey.", tag: "Education" },
    { icon: <IconBriefcase />, title: "Career & Workforce Development", desc: "Resume building, interview prep, vocational training, and mentorship to equip youth with the tools they need to enter the workforce.", tag: "Career" },
    { icon: <IconStar />, title: "Leadership & Life Skills", desc: "Practical life skills and leadership programs — budgeting, communication, decision-making, and goal-setting for independent living.", tag: "Life Skills" },
    { icon: <IconHeart />, title: "Events & Community", desc: "Holiday celebrations, field trips, and communal meals — because joy, normalcy, and belonging are foundations of healing.", tag: "Community" },
  ];

  return (
    <section id="programs" className="section-bg" style={{ padding: "100px 24px" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: 64 }}>
          <div className="font-ui" style={{ color: COLORS.amber, letterSpacing: "0.25em", fontSize: "0.75rem", textTransform: "uppercase", marginBottom: 16 }}>
            What We Do
          </div>
          <div className="flame-divider" style={{ margin: "0 auto 28px" }} />
          <h2 className="font-display" style={{ fontSize: "clamp(2.5rem, 5vw, 4.5rem)", color: COLORS.white, letterSpacing: "0.02em", lineHeight: 1 }}>
            OUR <span className="fire-text">PROGRAMS</span>
          </h2>
          <p className="font-body" style={{ color: "rgba(255,255,255,0.5)", marginTop: 20, fontSize: "1.1rem", maxWidth: 560, margin: "20px auto 0", lineHeight: 1.7 }}>
            Every program is designed with one goal: giving foster youth the resources,
            relationships, and resilience to rise.
          </p>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: 24 }}>
          {programs.map(p => (
            <div key={p.title} className="program-card" style={{ padding: "36px 32px", borderRadius: 10 }}>
              <div style={{ color: COLORS.amber, marginBottom: 16 }}>{p.icon}</div>
              <div className="font-ui" style={{ color: "rgba(245,158,11,0.6)", fontSize: "0.7rem", letterSpacing: "0.15em", textTransform: "uppercase", marginBottom: 8 }}>
                {p.tag}
              </div>
              <h3 className="font-ui" style={{ color: COLORS.white, fontSize: "1.25rem", fontWeight: 700, letterSpacing: "0.03em", marginBottom: 14 }}>{p.title}</h3>
              <p className="font-body" style={{ color: "rgba(255,255,255,0.55)", lineHeight: 1.7, fontSize: "1rem" }}>{p.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function OurStorySection() {
  const timeline = [
    { year: "2021", title: "The Spark", desc: "Brandon Adams stood in front of a mirror — 106 pounds heavier, physically tired, emotionally drained. In that moment, something ignited. No more waiting. No more wishing. It was time to rise." },
    { year: "2022", title: "The First Mile", desc: "A friend suggested cycling. Brandon bought his first bike and rode 9 miles. That was all he could handle — but it was the beginning. One mile at a time, he pushed forward." },
    { year: "2023", title: "Phoenix Racing Born", desc: "Group rides turned into endurance challenges. Brandon completed the Hotter'N Hell 100 through his hometown of Electra, TX — a symbol of coming full circle. Then came triathlons, and Phoenix Racing was born." },
    { year: "2024–25", title: "Competing at the Highest Level", desc: "Competitive cycling. Crit racing. The Tulsa Tough. Sharing the field with pro rider Neilson Powless. A full transformation — body, mind, and spirit — now channeled into purpose." },
    { year: "2025", title: "The Phoenix Youth Project", desc: "The internal change became a calling. If resilience, reinvention, and community could transform one life, they could transform thousands. The Phoenix Youth Project was born." },
  ];

  return (
    <section id="story" className="section-bg-alt" style={{ padding: "100px 24px" }}>
      <div style={{ maxWidth: 1100, margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: 64 }}>
          <div className="font-ui" style={{ color: COLORS.amber, letterSpacing: "0.25em", fontSize: "0.75rem", textTransform: "uppercase", marginBottom: 16 }}>
            The Origin
          </div>
          <div className="flame-divider" style={{ margin: "0 auto 28px" }} />
          <h2 className="font-display" style={{ fontSize: "clamp(2.5rem, 5vw, 4.5rem)", color: COLORS.white, letterSpacing: "0.02em", lineHeight: 1 }}>
            HOW THE <span className="fire-text">PHOENIX RISES</span>
          </h2>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: 60, alignItems: "start" }}>
          {/* Quote block */}
          <div style={{ position: "relative" }}>
            <div className="quote-mark" style={{ position: "absolute", top: -20, left: -10 }}>"</div>
            <div className="font-body" style={{ fontSize: "1.25rem", color: "rgba(254,243,199,0.85)", lineHeight: 1.8, fontStyle: "italic", position: "relative", zIndex: 1, paddingTop: 40 }}>
              The Phoenix rises from the ashes, not because it's easy, but because it's necessary.
              And so can you.
            </div>
            <div style={{ marginTop: 24 }}>
              <div className="font-ui" style={{ color: COLORS.amber, fontWeight: 700, letterSpacing: "0.05em" }}>— Brandon Adams</div>
              <div className="font-ui" style={{ color: "rgba(255,255,255,0.4)", fontSize: "0.8rem", letterSpacing: "0.1em", textTransform: "uppercase", marginTop: 4 }}>Founder & Inspiration</div>
            </div>

            <div style={{ marginTop: 40, maxWidth: 360 }}>
              <img
                src="/images/PYP_BRANDON_ADAMS.jpeg"
                alt="Brandon Adams — Founder of The Phoenix Youth Project"
                style={{ width: "100%", aspectRatio: "3/4", objectFit: "cover", objectPosition: "center top", borderRadius: 8, display: "block" }}
              />
            </div>
          </div>

          {/* Timeline */}
          <div style={{ position: "relative", paddingLeft: 48 }}>
            <div className="timeline-line" />
            {timeline.map((item, i) => (
              <div key={i} style={{ position: "relative", marginBottom: 36, display: "flex", gap: 20, alignItems: "flex-start" }}>
                <div className="timeline-dot" style={{ position: "absolute", left: -44, top: 6 }} />
                <div>
                  <div className="font-ui" style={{ color: COLORS.amber, fontSize: "0.75rem", letterSpacing: "0.15em", textTransform: "uppercase", marginBottom: 4 }}>{item.year}</div>
                  <div className="font-ui" style={{ color: COLORS.white, fontWeight: 700, fontSize: "1.05rem", marginBottom: 8 }}>{item.title}</div>
                  <div className="font-body" style={{ color: "rgba(255,255,255,0.55)", fontSize: "0.95rem", lineHeight: 1.7 }}>{item.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function BrandonCyclingSection() {
  const achievements = [
    { icon: <IconBike />, title: "Category 3 Racer", desc: "Competing at Cat 3 level in Texas — one of the most competitive amateur cycling circuits in the country." },
    { icon: <IconTrophy />, title: "Tulsa Tough", desc: "Competed at the legendary Tulsa Tough, one of the premier criterium events in the nation." },
    { icon: <IconStar />, title: "Hotter'N Hell 100", desc: "Completed the iconic 100-mile ride through Electra, TX — full circle honoring his roots and forging a new path." },
    { icon: <IconBike />, title: "Phoenix Racing", desc: "Founded Phoenix Racing — a competitive cycling team born from personal transformation and community." },
  ];

  return (
    <section id="brandon" style={{ background: COLORS.black, padding: "100px 24px" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: 64 }}>
          <div className="font-ui" style={{ color: COLORS.amber, letterSpacing: "0.25em", fontSize: "0.75rem", textTransform: "uppercase", marginBottom: 16 }}>
            Brandon's Journey
          </div>
          <div className="flame-divider" style={{ margin: "0 auto 28px" }} />
          <h2 className="font-display" style={{ fontSize: "clamp(2.5rem, 5vw, 4.5rem)", color: COLORS.white, letterSpacing: "0.02em", lineHeight: 1 }}>
            THE RACE THAT <span className="fire-text">CHANGED EVERYTHING</span>
          </h2>
          <p className="font-body" style={{ color: "rgba(255,255,255,0.5)", marginTop: 20, fontSize: "1.1rem", maxWidth: 580, margin: "20px auto 0", lineHeight: 1.7 }}>
            From 9 miles on a first bike ride to competing with professional cyclists — Brandon's story
            is proof that transformation is earned, not given.
          </p>
        </div>

        {/* Hero cycling image placeholder */}
        <img
          src="/images/PYP_BRANDON_ADAMS_RACE.jpeg"
          alt="Brandon Adams racing in a cycling criterium"
          style={{ width: "100%", aspectRatio: "21/9", objectFit: "cover", objectPosition: "center center", borderRadius: 12, marginBottom: 48, display: "block" }}
        />

        {/* Achievements */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: 20, marginBottom: 60 }}>
          {achievements.map(a => (
            <div key={a.title} className="cycling-card" style={{ padding: "28px 24px", borderRadius: 10 }}>
              <div style={{ color: COLORS.amber, marginBottom: 14 }}>{a.icon}</div>
              <div className="font-ui" style={{ color: COLORS.white, fontWeight: 700, fontSize: "1.05rem", marginBottom: 10, letterSpacing: "0.03em" }}>{a.title}</div>
              <div className="font-body" style={{ color: "rgba(255,255,255,0.5)", fontSize: "0.95rem", lineHeight: 1.6 }}>{a.desc}</div>
            </div>
          ))}
        </div>

        {/* Gallery placeholders */}
        <div style={{ marginBottom: 16 }}>
          <div className="font-ui" style={{ color: COLORS.amber, letterSpacing: "0.15em", fontSize: "0.8rem", textTransform: "uppercase", marginBottom: 20 }}>Race Gallery</div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))", gap: 12 }}>
            <div style={{ aspectRatio: "3/4", borderRadius: 8, overflow: "hidden" }}>
              <img src="/images/PYP_TULSA_TOUGH.png" alt="Brandon Adams competing at Tulsa Tough 2025 criterium race" style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "center top" }} />
            </div>
            <div style={{ aspectRatio: "3/4", borderRadius: 8, overflow: "hidden" }}>
              <img src="/images/PYP_BRANDON_ADAMS_AFTER.jpeg" alt="Brandon Adams at Hotter'N Hell 100" style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "center top" }} />
            </div>
            <div style={{ aspectRatio: "3/4", borderRadius: 8, overflow: "hidden" }}>
              <img src="/images/PYP_BRANDON_ADAMS_BIKE.jpeg" alt="Brandon Adams cycling in a crit race in Texas" style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "center 20%" }} />
            </div>
            <div style={{ aspectRatio: "3/4", borderRadius: 8, overflow: "hidden" }}>
              <img src="/images/PYP_BRANDON_ADAMS_JASON.png" alt="Phoenix Racing Team" style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "center top" }} />
            </div>
            <div style={{ aspectRatio: "3/4", borderRadius: 8, overflow: "hidden" }}>
              <img src="/images/PYP_BRANDON_ADAMS_BIKE_BEFORE.jpeg" alt="Trek Houston community ride" style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "center 20%" }} />
            </div>
            <div style={{ aspectRatio: "3/4", borderRadius: 8, overflow: "hidden" }}>
              <img src="/images/PYP_BRANDON_ADAMS_BEFORE.jpeg" alt="Brandon Adams training session" style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "center center" }} />
            </div>
          </div>
        </div>

        {/* Trek Houston mention */}
        <div style={{ marginTop: 48, padding: "32px 36px", background: "rgba(245,158,11,0.06)", border: "1px solid rgba(245,158,11,0.2)", borderRadius: 10, textAlign: "center" }}>
          <div className="font-ui" style={{ color: "rgba(255,255,255,0.4)", fontSize: "0.75rem", letterSpacing: "0.2em", textTransform: "uppercase", marginBottom: 12 }}>
            A Special Thank You
          </div>
          <p className="font-body" style={{ color: "rgba(254,243,199,0.8)", fontSize: "1.2rem", fontStyle: "italic", lineHeight: 1.7, maxWidth: 680, margin: "0 auto" }}>
            "Trek Houston and its incredible community gave me the support and tools I needed early on —
            from bikes to training to encouragement. They played a huge role in shaping the foundation of this journey."
          </p>
          <div className="font-ui" style={{ color: COLORS.amber, marginTop: 16, fontWeight: 600, letterSpacing: "0.05em" }}>— Brandon Adams</div>
        </div>
      </div>
    </section>
  );
}

function DonateSection() {
  return (
    <section id="donate" style={{
      padding: "100px 24px",
      background: "linear-gradient(135deg, rgba(194,65,12,0.15) 0%, rgba(10,10,10,1) 40%, rgba(10,10,10,1) 60%, rgba(245,158,11,0.1) 100%)",
      position: "relative",
      overflow: "hidden"
    }}>
      <div style={{ position: "absolute", inset: 0, backgroundImage: "radial-gradient(rgba(245,158,11,0.04) 1px, transparent 1px)", backgroundSize: "30px 30px", pointerEvents: "none" }} />

      <div style={{ maxWidth: 800, margin: "0 auto", textAlign: "center", position: "relative", zIndex: 1 }}>
        <PhoenixLogo size={56} />
        <h2 className="font-display" style={{ fontSize: "clamp(2.5rem, 6vw, 5rem)", color: COLORS.white, letterSpacing: "0.02em", lineHeight: 1, margin: "24px 0 20px" }}>
          FUEL THE <span className="fire-text">PHOENIX</span>
        </h2>
        <p className="font-body" style={{ color: "rgba(254,243,199,0.7)", fontSize: "1.2rem", lineHeight: 1.7, marginBottom: 16 }}>
          Your donation directly funds programs that change lives — therapeutic sessions, tutoring,
          career development, and moments of joy for youth who need it most.
        </p>
        <p className="font-ui" style={{ color: COLORS.amber, fontSize: "0.85rem", letterSpacing: "0.1em", marginBottom: 48 }}>
          100% TAX DEDUCTIBLE · EIN 39-5149790 · IRS 501(c)(3) APPROVED
        </p>

        <div style={{ display: "flex", gap: 16, justifyContent: "center", flexWrap: "wrap", marginBottom: 48 }}>
          {["$25", "$50", "$100", "$250", "$500"].map(amt => (
            <button key={amt} className="ghost-btn" style={{ padding: "12px 24px", borderRadius: 6, background: "transparent", cursor: "pointer", fontSize: "1rem" }}>
              {amt}
            </button>
          ))}
        </div>

        <button className="donate-btn" style={{ padding: "18px 64px", borderRadius: 6, border: "none", cursor: "pointer", fontSize: "1.1rem" }}>
          DONATE NOW
        </button>
        <div className="font-ui" style={{ color: "rgba(255,255,255,0.3)", fontSize: "0.75rem", marginTop: 16, letterSpacing: "0.1em" }}>
          [ PAYMENT INTEGRATION PLACEHOLDER ]
        </div>

        <div style={{ marginTop: 60, display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: 24 }}>
          {[
            { amount: "$25", impact: "Provides one tutoring session for a foster youth" },
            { amount: "$100", impact: "Sponsors a full week of horticulture therapy" },
            { amount: "$500", impact: "Funds a field trip for 10 youth residents" },
            { amount: "$1,000", impact: "Supports career development for a youth for one month" },
          ].map(item => (
            <div key={item.amount} className="stat-card" style={{ padding: "20px", borderRadius: 8, textAlign: "left" }}>
              <div className="font-display" style={{ fontSize: "1.8rem", color: COLORS.amber, lineHeight: 1 }}>{item.amount}</div>
              <div className="font-body" style={{ color: "rgba(255,255,255,0.5)", fontSize: "0.9rem", marginTop: 8, lineHeight: 1.5 }}>{item.impact}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function ContactSection() {
  return (
    <section id="contact" className="section-bg-alt" style={{ padding: "100px 24px" }}>
      <div style={{ maxWidth: 1100, margin: "0 auto" }}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: 60 }}>
          <div>
            <div className="font-ui" style={{ color: COLORS.amber, letterSpacing: "0.25em", fontSize: "0.75rem", textTransform: "uppercase", marginBottom: 16 }}>
              Get In Touch
            </div>
            <div className="flame-divider" style={{ marginBottom: 28 }} />
            <h2 className="font-display" style={{ fontSize: "clamp(2rem, 4vw, 3.5rem)", color: COLORS.white, letterSpacing: "0.02em", lineHeight: 1, marginBottom: 24 }}>
              JOIN THE<br /><span className="fire-text">MOVEMENT</span>
            </h2>
            <p className="font-body" style={{ color: "rgba(255,255,255,0.55)", fontSize: "1.05rem", lineHeight: 1.8, marginBottom: 36 }}>
              Whether you're interested in volunteering, partnering, joining the board, or making a donation —
              we'd love to connect. The phoenix rises with community behind it.
            </p>

            <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
              {[
                { icon: <IconMap />, label: "Address", value: "28085 Morton Rd, Katy, TX 77493" },
                { icon: <IconMail />, label: "Email", value: "jason@phoenixyouthproject.org" },
              ].map(item => (
                <div key={item.label} style={{ display: "flex", gap: 14, alignItems: "flex-start" }}>
                  <div style={{ color: COLORS.amber, marginTop: 2, flexShrink: 0 }}>{item.icon}</div>
                  <div>
                    <div className="font-ui" style={{ color: "rgba(255,255,255,0.35)", fontSize: "0.7rem", letterSpacing: "0.15em", textTransform: "uppercase", marginBottom: 2 }}>{item.label}</div>
                    <div className="font-body" style={{ color: "rgba(254,243,199,0.8)", fontSize: "1rem" }}>{item.value}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Contact form */}
          <div className="card-bg ember-border" style={{ padding: "40px 36px", borderRadius: 12 }}>
            <div className="font-ui" style={{ color: COLORS.white, fontWeight: 700, fontSize: "1.15rem", letterSpacing: "0.05em", marginBottom: 28 }}>
              SEND A MESSAGE
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
              {[["Name", "text", "Your full name"], ["Email", "email", "your@email.com"], ["Organization (optional)", "text", "Company or org"]].map(([label, type, placeholder]) => (
                <div key={label}>
                  <div className="font-ui" style={{ color: "rgba(245,158,11,0.7)", fontSize: "0.75rem", letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: 6 }}>{label}</div>
                  <input type={type} placeholder={placeholder} style={{
                    width: "100%", padding: "12px 16px",
                    background: "rgba(255,255,255,0.04)",
                    border: "1px solid rgba(245,158,11,0.15)",
                    borderRadius: 6, color: COLORS.white,
                    fontFamily: "'Crimson Pro', serif", fontSize: "1rem",
                    outline: "none",
                  }} />
                </div>
              ))}
              <div>
                <div className="font-ui" style={{ color: "rgba(245,158,11,0.7)", fontSize: "0.75rem", letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: 6 }}>Message</div>
                <textarea rows={4} placeholder="Tell us how you'd like to get involved..." style={{
                  width: "100%", padding: "12px 16px",
                  background: "rgba(255,255,255,0.04)",
                  border: "1px solid rgba(245,158,11,0.15)",
                  borderRadius: 6, color: COLORS.white,
                  fontFamily: "'Crimson Pro', serif", fontSize: "1rem",
                  outline: "none", resize: "vertical",
                }} />
              </div>
              <button className="donate-btn" style={{ padding: "14px", borderRadius: 6, border: "none", cursor: "pointer", fontSize: "0.95rem", marginTop: 8 }}>
                SEND MESSAGE
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer style={{ background: "#050505", padding: "48px 24px 32px", borderTop: "1px solid rgba(245,158,11,0.1)" }}>
      <div style={{ maxWidth: 1100, margin: "0 auto" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: 32, marginBottom: 40 }}>
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 16 }}>
              <PhoenixLogo size={32} />
              <div>
                <div className="font-display" style={{ fontSize: "1.1rem", color: COLORS.white, letterSpacing: "0.05em" }}>PHOENIX YOUTH PROJECT</div>
                <div className="font-ui" style={{ fontSize: "0.6rem", color: COLORS.amber, letterSpacing: "0.2em" }}>RISE FROM THE ASHES</div>
              </div>
            </div>
            <p className="font-body" style={{ color: "rgba(255,255,255,0.35)", fontSize: "0.9rem", maxWidth: 300, lineHeight: 1.7 }}>
              Empowering foster youth in Texas to discover their strength, build their future, and rise.
            </p>
          </div>

          <div style={{ display: "flex", gap: 48, flexWrap: "wrap" }}>
            <div>
              <div className="font-ui" style={{ color: COLORS.amber, fontSize: "0.7rem", letterSpacing: "0.2em", textTransform: "uppercase", marginBottom: 16 }}>Organization</div>
              {["Our Mission", "Programs", "Our Story", "Board of Directors"].map(l => (
                <div key={l} className="font-body" style={{ color: "rgba(255,255,255,0.4)", fontSize: "0.95rem", marginBottom: 10, cursor: "pointer" }}>{l}</div>
              ))}
            </div>
            <div>
              <div className="font-ui" style={{ color: COLORS.amber, fontSize: "0.7rem", letterSpacing: "0.2em", textTransform: "uppercase", marginBottom: 16 }}>Get Involved</div>
              {["Donate", "Volunteer", "Partner With Us", "Contact"].map(l => (
                <div key={l} className="font-body" style={{ color: "rgba(255,255,255,0.4)", fontSize: "0.95rem", marginBottom: 10, cursor: "pointer" }}>{l}</div>
              ))}
            </div>
            <div>
              <div className="font-ui" style={{ color: COLORS.amber, fontSize: "0.7rem", letterSpacing: "0.2em", textTransform: "uppercase", marginBottom: 16 }}>Legal</div>
              <div className="font-ui" style={{ color: "rgba(255,255,255,0.3)", fontSize: "0.8rem", lineHeight: 1.8 }}>
                EIN: 39-5149790<br />
                501(c)(3) Approved<br />
                Texas Nonprofit Corp<br />
                Katy, TX 77493
              </div>
            </div>
          </div>
        </div>

        <div style={{ borderTop: "1px solid rgba(255,255,255,0.06)", paddingTop: 24, display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: 12 }}>
          <div className="font-ui" style={{ color: "rgba(255,255,255,0.2)", fontSize: "0.75rem", letterSpacing: "0.05em" }}>
            © 2025 The Phoenix Youth Project. All rights reserved.
          </div>
          <div className="font-ui" style={{ color: "rgba(255,255,255,0.2)", fontSize: "0.75rem", letterSpacing: "0.05em" }}>
            Built with purpose · Katy, Texas
          </div>
        </div>
      </div>
    </footer>
  );
}

// ============================================================
// MAIN APP
// ============================================================
export default function App() {
  const [activeSection, setActiveSection] = useState("hero");

  const scrollTo = (id) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    const sections = ["hero", "mission", "programs", "story", "brandon", "donate", "contact"];
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(e => { if (e.isIntersecting) setActiveSection(e.target.id); });
      },
      { rootMargin: "-40% 0px -40% 0px" }
    );
    sections.forEach(id => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  return (
    <>
      <style>{styles}</style>
      <NavBar activeSection={activeSection} scrollTo={scrollTo} />
      <HeroSection />
      <MissionSection />
      <ProgramsSection />
      <OurStorySection />
      <BrandonCyclingSection />
      <DonateSection />
      <ContactSection />
      <Footer />
    </>
  );
}
