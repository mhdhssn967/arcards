import React, { useState, useEffect, useRef } from "react";
import {
  ScanLine, Volume2, Sparkles, ShieldCheck, Download,
  Star, PlayCircle, Gamepad2, Heart, Zap, ArrowRight,
  TreePine, Menu, X,
  StoreIcon
} from "lucide-react";
import { Link } from "react-router-dom";

function useIsMobile() {
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);
  return isMobile;
}

function AnimalCard({ card, index }) {
  const [hovered, setHovered] = useState(false);
  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        cursor: "pointer",
        transform: hovered ? "translateY(-10px) rotate(0deg)" : `rotate(${index % 2 === 0 ? -2 : 2}deg)`,
        transition: "all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)",
      }}
    >
      <div style={{
        position: "relative", overflow: "hidden", borderRadius: 20,
        boxShadow: hovered
          ? "0 24px 48px rgba(0,0,0,0.25), 0 0 0 3px #FF6B35"
          : "0 8px 24px rgba(0,0,0,0.12)",
        transition: "box-shadow 0.3s ease",
      }}>
        <img
          src={`/${card}.jpg`}
          alt={`Animal Card ${card}`}
          style={{
            width: "100%", display: "block", objectFit: "cover",
            transform: hovered ? "scale(1.08)" : "scale(1)",
            transition: "transform 0.5s ease",
          }}
        />
        <div style={{
          position: "absolute", inset: 0,
          background: "linear-gradient(to top, rgba(0,0,0,0.7) 0%, transparent 60%)",
          opacity: hovered ? 1 : 0,
          transition: "opacity 0.3s ease",
          display: "flex", alignItems: "flex-end", padding: 12,
        }}>
          <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
            <ScanLine size={14} color="white" />
            <span style={{ color: "white", fontWeight: 800, fontSize: 12, letterSpacing: 1 }}>SCAN & PLAY</span>
          </div>
        </div>
      </div>
    </div>
  );
}

function CountUp({ target, suffix = "" }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        let start = 0;
        const step = target / 60;
        const timer = setInterval(() => {
          start += step;
          if (start >= target) { setCount(target); clearInterval(timer); }
          else setCount(Math.floor(start));
        }, 16);
      }
    });
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [target]);
  return <span ref={ref}>{count}{suffix}</span>;
}

export default function HomePage() {
  const cards = [1, 2, 3, 4, 5, 6];
  const isMobile = useIsMobile();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Boogaloo&family=Nunito:wght@400;600;700;800;900&display=swap');

        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

        :root {
          --cream: #FEFAE8;
          --green-dark: #1A3A2A;
          --green-mid: #2D6A4F;
          --green-bright: #52B788;
          --orange: #FF6B35;
          --yellow: #FFD93D;
          --teal: #00C9A7;
          --purple: #845EC2;
          --font-display: 'Boogaloo', cursive;
          --font-body: 'Nunito', sans-serif;
        }

        html { scroll-behavior: smooth; }
        body { background: var(--cream); font-family: var(--font-body); overflow-x: hidden; }
        img { max-width: 100%; height: auto; }

        .display { font-family: var(--font-display); }

        @keyframes marquee { from { transform: translateX(0); } to { transform: translateX(-50%); } }
        .marquee-track { display: flex; animation: marquee 22s linear infinite; width: max-content; }

        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .fade-up { animation: fadeUp 0.8s cubic-bezier(0.22, 1, 0.36, 1) both; }
        .delay-1 { animation-delay: 0.1s; }
        .delay-2 { animation-delay: 0.25s; }
        .delay-3 { animation-delay: 0.4s; }
        .delay-4 { animation-delay: 0.55s; }

        @keyframes spinSlow { to { transform: rotate(360deg); } }
        .spin-slow { animation: spinSlow 20s linear infinite; }

        @keyframes bob { 0%,100% { transform: translateY(0); } 50% { transform: translateY(-10px); } }
        .bob { animation: bob 3s ease-in-out infinite; }

        @keyframes scrollHint { 0%,100% { transform: translateY(0); opacity:1; } 50% { transform: translateY(10px); opacity:0.4; } }
        .scroll-hint { animation: scrollHint 2s ease infinite; }

        .badge {
          display: inline-flex; align-items: center; gap: 6px;
          background: var(--orange); color: white;
          padding: 6px 16px; border-radius: 999px;
          font-size: 13px; font-weight: 800; text-transform: uppercase; letter-spacing: 0.08em;
          font-family: var(--font-body);
        }

        .btn-primary {
          background: var(--orange); color: white;
          padding: 16px 28px; border-radius: 16px;
          font-weight: 900; font-size: 16px; border: none; cursor: pointer;
          box-shadow: 0 7px 0 #c43e0f;
          transition: all 0.15s;
          display: inline-flex; align-items: center; gap: 10px;
          text-decoration: none; font-family: var(--font-body);
          white-space: nowrap;
        }
        .btn-primary:hover { transform: translateY(3px); box-shadow: 0 4px 0 #c43e0f; }
        .btn-primary:active { transform: translateY(7px); box-shadow: none; }

        .btn-secondary {
          background: transparent; color: var(--green-dark);
          padding: 16px 28px; border-radius: 16px;
          font-weight: 800; font-size: 16px;
          border: 3px solid var(--green-mid); cursor: pointer;
          transition: all 0.2s;
          display: inline-flex; align-items: center; gap: 10px;
          text-decoration: none; font-family: var(--font-body);
          white-space: nowrap;
        }
        .btn-secondary:hover { background: var(--green-dark); color: white; border-color: var(--green-dark); }

        .feat-card {
          border-radius: 26px; padding: 32px;
          position: relative; overflow: hidden;
          transition: transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
        }
        .feat-card:hover { transform: translateY(-6px); }

        .quote-card {
          background: white; border-radius: 32px; padding: 48px;
          position: relative;
          box-shadow: 0 40px 80px rgba(0,0,0,0.08);
          border: 3px solid #f0f0f0;
        }

        .nav-link {
          font-weight: 800; font-size: 15px; color: var(--green-dark);
          text-decoration: none; position: relative; letter-spacing: 0.03em;
          transition: color 0.2s;
        }
        .nav-link::after {
          content: ''; position: absolute; bottom: -4px; left: 0; right: 0;
          height: 3px; background: var(--orange); border-radius: 2px;
          transform: scaleX(0); transition: transform 0.2s;
        }
        .nav-link:hover { color: var(--orange); }
        .nav-link:hover::after { transform: scaleX(1); }

        /* ---- LAYOUT GRIDS ---- */
        .hero-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 60px;
          align-items: center;
          max-width: 1200px;
          margin: 0 auto;
        }
        .stats-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 20px;
          max-width: 900px;
          margin: 0 auto;
        }
        .feat-grid {
          display: grid;
          grid-template-columns: repeat(12, 1fr);
          gap: 18px;
          max-width: 1200px;
          margin: 0 auto;
        }
        .feat-col-7 { grid-column: span 7; }
        .feat-col-5 { grid-column: span 5; }
        .feat-col-4 { grid-column: span 4; }
        .steps-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 24px;
          max-width: 960px;
          margin: 0 auto;
        }
        .cards-grid {
          display: grid;
          grid-template-columns: repeat(6, 1fr);
          gap: 14px;
          max-width: 1200px;
          margin: 0 auto;
        }
        .mini-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 16px;
          max-width: 1200px;
          margin: 0 auto;
        }
        .hero-btns { display: flex; gap: 14px; flex-wrap: wrap; }
        .cta-btns { display: flex; gap: 16px; justify-content: center; flex-wrap: wrap; }
        .collection-header { display: flex; justify-content: space-between; align-items: flex-end; margin-bottom: 36px; gap: 16px; max-width: 1200px; margin: 0 auto 36px; }
        .footer-inner { display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 20px; max-width: 1200px; margin: 0 auto; }

        /* ---- RESPONSIVE ---- */
        @media (max-width: 1024px) {
          .feat-grid { grid-template-columns: 1fr 1fr; }
          .feat-col-7 { grid-column: span 2; }
          .feat-col-5 { grid-column: span 2; }
          .feat-col-4 { grid-column: span 1; }
          .cards-grid { grid-template-columns: repeat(3, 1fr); }
        }

        @media (max-width: 767px) {
          /* Hero: single column */
          .hero-grid { grid-template-columns: 1fr !important; gap: 0 !important; }
          .hero-mockup { display: none !important; }

          /* Stats: single column */
          .stats-grid { grid-template-columns: 1fr !important; }

          /* Features: single column */
          .feat-grid { grid-template-columns: 1fr !important; }
          .feat-col-7, .feat-col-5, .feat-col-4 { grid-column: span 1 !important; }

          /* Steps: single column */
          .steps-grid { grid-template-columns: 1fr !important; }

          /* Cards: 2 columns */
          .cards-grid { grid-template-columns: repeat(2, 1fr) !important; gap: 12px !important; }

          /* Mini grid: 2 columns */
          .mini-grid { grid-template-columns: repeat(2, 1fr) !important; gap: 12px !important; }

          /* Buttons: full width stacked */
          .hero-btns { flex-direction: column !important; }
          .hero-btns a, .hero-btns button { width: 100% !important; justify-content: center !important; }
          .cta-btns { flex-direction: column !important; align-items: stretch !important; }
          .cta-btns a { justify-content: center !important; }

          /* Collection header: stack */
          .collection-header { flex-direction: column !important; align-items: flex-start !important; }

          /* Footer: center stack */
          .footer-inner { flex-direction: column !important; text-align: center !important; justify-content: center !important; }

          /* Quote card */
          .quote-card { padding: 28px 20px !important; border-radius: 24px !important; }

          /* Desktop nav */
          .desktop-nav { display: none !important; }
          .mobile-hamburger { display: flex !important; }
        }

        .desktop-nav { display: flex; gap: 32px; align-items: center; }
        .mobile-hamburger { display: none; align-items: center; justify-content: center; }
      `}</style>

      <div style={{ background: "var(--cream)", minHeight: "100vh" }}>

        {/* Mobile Full-Screen Menu */}
        {menuOpen && (
          <div style={{
            position: "fixed", inset: 0, zIndex: 500,
            background: "var(--green-dark)",
            display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
            gap: 40,
          }}>
            <button onClick={() => setMenuOpen(false)} style={{
              position: "absolute", top: 20, right: 20,
              background: "rgba(255,255,255,0.1)", border: "none", borderRadius: 12,
              width: 48, height: 48, cursor: "pointer",
              display: "flex", alignItems: "center", justifyContent: "center",
            }}>
              <X size={24} color="white" />
            </button>
            {[
              { label: "Features", href: "#features" },
              { label: "Cards", href: "#collection" },
              { label: "How It Works", href: "#howto" },
            ].map(link => (
              <a key={link.label} href={link.href} onClick={() => setMenuOpen(false)} style={{
                fontFamily: "var(--font-display)", fontSize: 42, color: "white",
                textDecoration: "none", transition: "color 0.2s",
              }}
                onMouseEnter={e => e.currentTarget.style.color = "var(--orange)"}
                onMouseLeave={e => e.currentTarget.style.color = "white"}
              >{link.label}</a>
            ))}
            <a href="https://drive.google.com/uc?export=download&id=1e6KIiuRQL8Ia2z2AhJ2xb_iVwCCYq9U4"
              onClick={() => setMenuOpen(false)}
              className="btn-primary" style={{ marginTop: 8 }}>
              <Download size={18} /> Download Free
            </a>
          </div>
        )}

        {/* ===== NAV ===== */}
        <nav style={{
          position: "sticky", top: 0, zIndex: 100,
          background: "rgba(254,250,232,0.92)", backdropFilter: "blur(16px)",
          borderBottom: "2px solid rgba(0,0,0,0.06)",
          padding: "0 5%", display: "flex", alignItems: "center",
          justifyContent: "space-between", height: 68,
        }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <div style={{ width: 38, height: 38, borderRadius: 11, display: "flex", alignItems: "center", justifyContent: "center" }}>
              <img src="./OQ72.png" alt="" style={{filter:'invert(1)'}}/>
            </div>
            <span className="display" style={{ fontSize: 24, color: "var(--green-dark)", letterSpacing: 1 }}>
              OQU<span style={{ color: "var(--orange)" }}>LIX</span>
            </span>
          </div>

          <div className="desktop-nav">
            <a href="#features" className="nav-link">Features</a>
            <a href="#collection" className="nav-link">Cards</a>
            <a href="#howto" className="nav-link">How It Works</a>
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <a href="https://drive.google.com/uc?export=download&id=1e6KIiuRQL8Ia2z2AhJ2xb_iVwCCYq9U4"
              className="btn-primary"
              style={{ padding: "9px 18px", fontSize: 14, borderRadius: 12, boxShadow: "0 5px 0 #c43e0f" }}>
              <Download size={14} /> Download
            </a>
            <button className="mobile-hamburger" onClick={() => setMenuOpen(true)} style={{
              background: "rgba(0,0,0,0.06)", border: "none", borderRadius: 10,
              width: 40, height: 40, cursor: "pointer",
            }}>
              <Menu size={20} color="var(--green-dark)" />
            </button>
          </div>
        </nav>

        {/* ===== HERO ===== */}
        <section style={{ padding: isMobile ? "52px 5% 40px" : "80px 5% 56px", position: "relative", overflow: "hidden" }}>
          <div style={{
            position: "absolute", inset: 0, pointerEvents: "none", zIndex: 0,
            background: `radial-gradient(ellipse 80% 60% at 20% 40%, rgba(0,201,167,0.10) 0%, transparent 60%),
                         radial-gradient(ellipse 60% 50% at 80% 20%, rgba(255,107,53,0.08) 0%, transparent 60%)`,
          }} />
          {!isMobile && (
            <div className="spin-slow" style={{
              position: "absolute", top: -120, right: -120, width: 500, height: 500,
              borderRadius: "50%", border: "40px solid rgba(82,183,136,0.07)", pointerEvents: "none",
            }} />
          )}

          <div className="hero-grid" style={{ position: "relative", zIndex: 1 }}>
            {/* Left content */}
            <div>
              <div className="badge fade-up" style={{ marginBottom: 20 }}>
                <Sparkles size={13} /> Magical AR Experience
              </div>

              <h1
                className="display fade-up delay-1"
                style={{ fontSize: isMobile ? 52 : 76, lineHeight: 1.0, color: "var(--green-dark)", marginBottom: 20 }}
              >
                Wild<br />
                <span style={{ color: "var(--orange)" }}>Adventures</span><br />
                <span style={{ fontSize: isMobile ? "0.78em" : "0.72em", color: "var(--green-mid)" }}>In Your Living Room</span>
              </h1>

              <p className="fade-up delay-2" style={{ fontSize: isMobile ? 15 : 18, lineHeight: 1.7, color: "#555", maxWidth: 460, marginBottom: 32 }}>
                Transform your floor into a safari. Oqulix uses cutting-edge AR to bring 3D animals to life with just a simple card scan.
              </p>

              <div className="hero-btns fade-up delay-3" style={{ marginBottom: 32 }}>
                <a href="https://drive.google.com/uc?export=download&id=1e6KIiuRQL8Ia2z2AhJ2xb_iVwCCYq9U4" className="btn-primary">
                  <Download size={18} /> Install Free App
                </a>
                <button className="btn-secondary">
                 <Link to="/purchase" className="flex gap-1.5" style={{alignItems:'center'}}> <StoreIcon size={18} /> Buy Cards</Link>
                </button>
              </div>

              <div className="fade-up delay-4" style={{ display: "flex", alignItems: "center", gap: 14, flexWrap: "wrap" }}>
                <div style={{ display: "flex", gap: 3 }}>
                  {[1,2,3,4,5].map(s => <Star key={s} size={17} fill="#FFD93D" color="#FFD93D" />)}
                </div>
                <span style={{ fontWeight: 700, color: "#333", fontSize: 14 }}>4.9 / 5 Rating</span>
                <span style={{ color: "#ccc" }}>|</span>
                <span style={{ fontWeight: 700, color: "#333", fontSize: 14 }}>100% Safe for Kids</span>
              </div>
            </div>

            {/* Right — hidden mobile */}
            <div className="hero-mockup" style={{ position: "relative" }}>
              <div style={{
                position: "absolute", top: "2%", right: "-4%", zIndex: 10,
                fontFamily: "var(--font-display)", transform: "rotate(8deg)",
                background: "var(--yellow)", color: "var(--green-dark)",
                padding: "8px 18px", borderRadius: 999, fontSize: 14, fontWeight: 700,
                boxShadow: "3px 3px 0 rgba(0,0,0,0.15)", whiteSpace: "nowrap",
              }}>🦁 Interactive Animals!</div>
              <div style={{
                position: "absolute", bottom: "14%", left: "-5%", zIndex: 10,
                fontFamily: "var(--font-display)", transform: "rotate(-6deg)",
                background: "var(--teal)", color: "white",
                padding: "8px 18px", borderRadius: 999, fontSize: 16, fontWeight: 200,
                boxShadow: "3px 3px 0 rgba(0,0,0,0.15)", whiteSpace: "nowrap",
              }}>Free to Download ✨</div>
              <div style={{ position: "absolute", inset: -20, background: "radial-gradient(ellipse, rgba(82,183,136,0.22) 0%, transparent 70%)", borderRadius: "50%", filter: "blur(24px)" }} />
              <div className="bob" style={{ background: "white", borderRadius: 44, padding: 14, boxShadow: "0 40px 80px rgba(0,0,0,0.14), 0 0 0 1px rgba(0,0,0,0.04)", position: "relative" }}>
                <img src="./webbg.png" alt="App Interface" style={{ borderRadius: 32, width: "100%", display: "block" }} />
                <div style={{
                  position: "absolute", bottom: -22, right: 20,
                  background: "white", borderRadius: 18, padding: "12px 18px",
                  boxShadow: "0 12px 32px rgba(0,0,0,0.14)",
                  display: "flex", alignItems: "center", gap: 10,
                }}>
                  <div style={{ background: "var(--orange)", padding: 8, borderRadius: 10 }}>
                    <Zap size={16} color="white" fill="white" />
                  </div>
                  <div>
                    <div style={{ fontSize: 10, fontWeight: 800, color: "#999", textTransform: "uppercase", letterSpacing: 1 }}>Latency</div>
                    <div style={{ fontSize: 13, fontWeight: 900, color: "#222" }}>Ultra Fast AR</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

        </section>

        {/* ===== MARQUEE ===== */}
        <div style={{ background: "var(--green-dark)", padding: "16px 0", overflow: "hidden", borderTop: "4px solid var(--orange)", borderBottom: "4px solid var(--orange)" }}>
          <div className="marquee-track">
            {[...Array(2)].map((_, rep) =>
             ["🐯 Tiger", "🐘 Elephant", "🐧 Penguin", "🐮 Cow", "🦊 Fox", "🐏 Sheep", "🐺 Wolf", "🐢 Tortoise", "🦏 Rhino", "🐶 Dog","🐈‍⬛ Cat","🦌 Deer"].map((item, i) => (
                <span key={`${rep}-${i}`} style={{
                  color: i % 3 === 0 ? "var(--orange)" : i % 3 === 1 ? "var(--yellow)" : "var(--teal)",
                  fontSize: 17, marginRight: 36, whiteSpace: "nowrap", fontFamily: "var(--font-display)",
                }}>
                  {item} <span >✨</span>
                </span>
              ))
            )}
          </div>
        </div>

        {/* ===== STATS ===== */}
        <section style={{ padding: isMobile ? "52px 5%" : "80px 5%", background: "white" }}>
          <div className="stats-grid">
            {[
              { val: 100, suffix: "%", label: "Child Safe", color: "var(--teal)", desc: "No ads, no tracking" },
              { val: 4.9, suffix: "/5", label: "App Rating", color: "var(--orange)", desc: "Loved by parents & kids" },
              { val: 30, suffix: "+", label: "AR Cards", color: "var(--purple)", desc: " Cards with inetractive animals" },
            ].map((stat, i) => (
              <div key={i} style={{
                background: "var(--cream)", borderRadius: 22, padding: isMobile ? "24px 16px" : "40px 24px",
                textAlign: "center", border: `3px solid ${stat.color}22`,
                transition: "transform 0.3s",
              }}
                onMouseEnter={e => e.currentTarget.style.transform = "translateY(-6px)"}
                onMouseLeave={e => e.currentTarget.style.transform = "translateY(0)"}
              >
                <div className="display" style={{ color: stat.color, marginBottom: 8, fontSize: isMobile ? 44 : 60, lineHeight: 1 }}>
                  <CountUp target={stat.val} suffix={stat.suffix} />
                </div>
                <div style={{ fontWeight: 900, fontSize: isMobile ? 15 : 19, color: "var(--green-dark)", marginBottom: 6 }}>{stat.label}</div>
                <div style={{ fontSize: 13, color: "#888", fontWeight: 600 }}>{stat.desc}</div>
              </div>
            ))}
          </div>
        </section>

        {/* ===== FEATURES ===== */}
        <section id="features" style={{ padding: isMobile ? "60px 5%" : "100px 5%" }}>
          <div style={{ textAlign: "center", marginBottom: isMobile ? 36 : 60 }}>
            <div className="badge" style={{ background: "var(--green-mid)", marginBottom: 16 }}>✦ Features</div>
            <h2 className="display" style={{ fontSize: isMobile ? 36 : 54, color: "var(--green-dark)", lineHeight: 1.1, marginBottom: 14 }}>
              Built for Curious Minds
            </h2>
            <p style={{ color: "#666", fontSize: isMobile ? 15 : 17, maxWidth: 500, margin: "0 auto", lineHeight: 1.7 }}>
              Modern learning doesn't happen in a book — it happens in the air, on the table, and in their imagination.
            </p>
          </div>

          <div className="feat-grid">
            <div className="feat-card feat-col-7" style={{ background: "linear-gradient(135deg, #E8F8F0, #D4F0E4)" }}>
              <div style={{ width: 56, height: 56, background: "white", borderRadius: 16, display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "0 4px 12px rgba(0,0,0,0.08)", marginBottom: 18 }}>
                <Sparkles size={26} color="var(--green-mid)" />
              </div>
              <h3 className="display" style={{ fontSize: isMobile ? 26 : 32, color: "var(--green-dark)", marginBottom: 12 }}>Hyper-Realistic 3D Models</h3>
              <p style={{ color: "#4a7c5f", fontSize: isMobile ? 14 : 16, lineHeight: 1.7, maxWidth: 360 }}>
                Our animals breathe, roar, and move exactly like they do in the wild. 
              </p>
              <div style={{ position: "absolute", right: -20, bottom: -20, opacity: 0.06 }}>
                <Gamepad2 size={isMobile ? 120 : 180} color="var(--green-dark)" />
              </div>
            </div>

            <div className="feat-card feat-col-5" style={{ background: "var(--orange)" }}>
              <div style={{ width: 68, height: 68, background: "rgba(255,255,255,0.2)", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 18 }}>
                <Volume2 size={32} color="white" />
              </div>
              <h3 className="display" style={{ fontSize: 28, color: "white", marginBottom: 10 }}>Phonetic Audio</h3>
              <p style={{ color: "rgba(255,255,255,0.85)", fontSize: 14, lineHeight: 1.7 }}>Every scan triggers clear, professional narration</p>
              
            </div>

            <div className="feat-card feat-col-4" style={{ background: "var(--green-dark)" }}>
              <ShieldCheck size={36} color="var(--teal)" style={{ marginBottom: 16 }} />
              <h3 className="display" style={{ fontSize: 24, color: "white", marginBottom: 10 }}>Privacy First</h3>
              <p style={{ color: "#aaa", fontSize: 14, lineHeight: 1.7 }}>No data tracking. No ads. No subscriptions. Just pure learning.</p>
              
            </div>

            <div className="feat-card feat-col-4" style={{ background: "var(--yellow)" }}>
              <ScanLine size={36} color="var(--green-dark)" style={{ marginBottom: 16 }} />
              <h3 className="display" style={{ fontSize: 24, color: "var(--green-dark)", marginBottom: 10 }}>Instant Scan</h3>
              <p style={{ color: "#555", fontSize: 14, lineHeight: 1.7 }}>Point. Scan. Marvel. AR launches in under a second — zero setup.</p>
            </div>

            <div className="feat-card feat-col-4" style={{ background: "linear-gradient(135deg, #e8e0ff, #d4c8ff)" }}>
              <Zap size={36} color="var(--purple)" style={{ marginBottom: 16 }} />
              <h3 className="display" style={{ fontSize: 24, color: "var(--green-dark)", marginBottom: 10 }}>Works Offline</h3>
              <p style={{ color: "#666", fontSize: 14, lineHeight: 1.7 }}>Adventures continue even without a signal — perfect for travel.</p>
            </div>
          </div>
        </section>

        {/* ===== HOW IT WORKS ===== */}
        <section id="howto" style={{ padding: isMobile ? "60px 5%" : "100px 5%", background: "var(--green-dark)", position: "relative", overflow: "hidden" }}>
          <div style={{ textAlign: "center", marginBottom: isMobile ? 36 : 60 }}>
            <div className="badge" style={{ background: "var(--orange)", marginBottom: 16 }}>✦ How It Works</div>
            <h2 className="display" style={{ fontSize: isMobile ? 36 : 54, color: "white", lineHeight: 1.1 }}>3 Steps to Wonder</h2>
          </div>

          <div className="steps-grid">
            {[
              { step: "01", emoji: "📦", title: "Get the Cards", desc: "Order your physical Oqulix card pack — beautifully illustrated & built to last." },
              { step: "02", emoji: "📱", title: "Open the App", desc: "Launch Oqulix on any modern Android device. No account needed." },
              { step: "03", emoji: "✨", title: "Watch Magic Happen", desc: "Scan any card and watch your animal leap into the real world in full 3D!" },
            ].map((item, i) => (
              <div key={i} style={{
                textAlign: "center", padding: isMobile ? "28px 20px" : "40px 28px",
                background: "rgba(255,255,255,0.05)", borderRadius: 26,
                border: "1px solid rgba(255,255,255,0.08)",
                transition: "background 0.3s, transform 0.3s",
              }}
                onMouseEnter={e => { e.currentTarget.style.background = "rgba(255,255,255,0.1)"; e.currentTarget.style.transform = "translateY(-6px)"; }}
                onMouseLeave={e => { e.currentTarget.style.background = "rgba(255,255,255,0.05)"; e.currentTarget.style.transform = "translateY(0)"; }}
              >
                <div style={{ fontSize: 44, marginBottom: 14 }}>{item.emoji}</div>
                <div className="display" style={{ fontSize: 15, color: "var(--orange)", marginBottom: 10, letterSpacing: 2 }}>STEP {item.step}</div>
                <h3 className="display" style={{ fontSize: 26, color: "white", marginBottom: 12 }}>{item.title}</h3>
                <p style={{ color: "rgba(255,255,255,0.6)", fontSize: 14, lineHeight: 1.7 }}>{item.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ===== COLLECTION ===== */}
        <section id="collection" style={{ padding: isMobile ? "60px 5%" : "100px 5%", background: "white" }}>
          <div className="collection-header">
            <div>
              <div className="badge" style={{ background: "var(--teal)", marginBottom: 14 }}>✦ The Collection</div>
              <h2 className="display" style={{ fontSize: isMobile ? 36 : 52, color: "var(--green-dark)", lineHeight: 1.1 }}>Collect Them All</h2>
            </div>
            <p style={{ color: "#888", fontSize: 14, maxWidth: 240, fontWeight: 600, lineHeight: 1.6 }}>
              Every card unlocks a unique AR experience. 
            </p>
          </div>

          <div className="cards-grid">
            {cards.map((card, index) => (
              <AnimalCard key={card} card={card} index={index} />
            ))}
          </div>

          <div style={{ textAlign: "center", marginTop: 36 }}>
            <p className="display" style={{ fontSize: 28, color: "var(--green-mid)" }}>And many more 🎉</p>
           
          </div>
        </section>

        {/* ===== TESTIMONIAL ===== */}
        <section style={{ padding: isMobile ? "60px 5%" : "100px 5%", position: "relative" }}>
          {!isMobile && (
            <div style={{ position: "absolute", top: 40, left: "5%", color: "rgba(82,183,136,0.10)", pointerEvents: "none" }}>
              <Heart size={160} fill="currentColor" />
            </div>
          )}
          <div style={{ maxWidth: 780, margin: "0 auto", position: "relative" }}>
            <div className="quote-card">
              <div style={{ display: "flex", justifyContent: "center", gap: 4, marginBottom: 20 }}>
                {[1,2,3,4,5].map(s => <Star key={s} size={22} fill="#FFD93D" color="#FFD93D" />)}
              </div>
              <div className="display" style={{ fontSize: isMobile ? 72 : 100, color: "var(--green-bright)", opacity: 0.18, lineHeight: 0.5, marginBottom: 16 }}>"</div>
              <blockquote style={{ fontSize: isMobile ? 16 : 21, fontStyle: "italic", color: "var(--green-dark)", lineHeight: 1.7, textAlign: "center", fontWeight: 700, marginBottom: 28 }}>
                Oqulix has completely changed how we spend our evenings. It's the only 'screen time' I feel good about because my daughter is moving, speaking, and learning.
              </blockquote>
              <div style={{ textAlign: "center" }}>
                <div style={{ width: 52, height: 52, borderRadius: "50%", background: "linear-gradient(135deg, var(--green-bright), var(--teal))", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 12px", fontSize: 24 }}>👩‍🏫</div>
                <div style={{ fontWeight: 900, fontSize: 17, color: "var(--green-dark)" }}>Sarah Jenkins</div>
                <div style={{ color: "#999", fontWeight: 700, fontSize: 11, textTransform: "uppercase", letterSpacing: 2, marginTop: 4 }}>Kindergarten Teacher & Mom</div>
              </div>
            </div>
          </div>
        </section>

        {/* ===== MINI FEATURES ===== */}
        <section style={{ padding: isMobile ? "0 5% 60px" : "0 5% 100px" }}>
          <div className="mini-grid">
            {[
              { emoji: "🤳", title: "Interactive", desc: "Touch & Interactable" },
              { emoji: "🔋", title: "Battery Friendly", desc: "Optimized AR engine" },
              { emoji: "📡", title: "Offline Mode", desc: "Works without internet" },
              { emoji: "🔠", title: "Learn mode", desc: "Learn spellings" },
            ].map((f, i) => (
              <div key={i} style={{
                background: "var(--cream)", borderRadius: 20, padding: isMobile ? "22px 14px" : "30px 22px",
                textAlign: "center", border: "2px solid rgba(0,0,0,0.05)",
                transition: "transform 0.3s ease",
              }}
                onMouseEnter={e => e.currentTarget.style.transform = "translateY(-6px)"}
                onMouseLeave={e => e.currentTarget.style.transform = "translateY(0)"}
              >
                <div style={{ fontSize: isMobile ? 32 : 38, marginBottom: 10 }}>{f.emoji}</div>
                <div style={{ fontWeight: 900, fontSize: isMobile ? 14 : 16, color: "var(--green-dark)", marginBottom: 6 }}>{f.title}</div>
                <div style={{ color: "#888", fontSize: 12, fontWeight: 600 }}>{f.desc}</div>
              </div>
            ))}
          </div>
        </section>

        {/* ===== CTA ===== */}
        <section style={{ padding: isMobile ? "0 4% 60px" : "0 5% 80px" }}>
          <div style={{
            background: "linear-gradient(135deg, #1A3A2A 0%, #2D6A4F 60%, #1a4a35 100%)",
            borderRadius: isMobile ? 28 : 44,
            padding: isMobile ? "48px 24px" : "80px 60px",
            textAlign: "center", position: "relative", overflow: "hidden",
            maxWidth: 1200, margin: "0 auto",
          }}>
            <div style={{ position: "absolute", top: -30, left: -30, width: 120, height: 120, borderRadius: "50%", border: "12px solid rgba(255,255,255,0.07)", pointerEvents: "none" }} />
            <div style={{ position: "absolute", bottom: -50, right: -50, width: 200, height: 200, borderRadius: "50%", border: "20px solid rgba(255,255,255,0.04)", pointerEvents: "none" }} />

            <div style={{ position: "relative", zIndex: 1 }}>
              <div className="badge" style={{ background: "var(--orange)", marginBottom: 20 }}>🦁 Free to Download</div>
              <h2 className="display" style={{ fontSize: isMobile ? 42 : 64, color: "white", lineHeight: 1.05, marginBottom: 16 }}>
                Start Your <span style={{ color: "var(--orange)" }}>Safari</span> Today
              </h2>
              <p style={{ color: "rgba(255,255,255,0.7)", fontSize: isMobile ? 15 : 18, marginBottom: 36, maxWidth: 440, margin: "0 auto 36px", lineHeight: 1.6 }}>
                The app is completely free. Order your cards and unlock a world of wonder.
              </p>
              <div className="cta-btns">
                <a href="https://drive.google.com/uc?export=download&id=1e6KIiuRQL8Ia2z2AhJ2xb_iVwCCYq9U4" style={{
                  background: "white", color: "var(--green-dark)",
                  padding: isMobile ? "16px 28px" : "20px 44px", borderRadius: 20,
                  fontWeight: 900, fontSize: isMobile ? 16 : 19, textDecoration: "none",
                  display: "inline-flex", alignItems: "center", gap: 10,
                  boxShadow: "0 12px 32px rgba(0,0,0,0.18)", transition: "transform 0.2s",
                  fontFamily: "var(--font-body)",
                }}
                  onMouseEnter={e => e.currentTarget.style.transform = "scale(1.04)"}
                  onMouseLeave={e => e.currentTarget.style.transform = "scale(1)"}
                >
                  <Download size={19} /> Download App
                </a>
                <a href="#" style={{
                  background: "rgba(255,255,255,0.1)", color: "white",
                  padding: isMobile ? "16px 28px" : "20px 44px", borderRadius: 20,
                  fontWeight: 900, fontSize: isMobile ? 16 : 19, textDecoration: "none",
                  display: "inline-flex", alignItems: "center", gap: 10,
                  border: "2px solid rgba(255,255,255,0.2)", transition: "background 0.2s",
                  fontFamily: "var(--font-body)",
                }}
                  onMouseEnter={e => e.currentTarget.style.background = "rgba(255,255,255,0.18)"}
                  onMouseLeave={e => e.currentTarget.style.background = "rgba(255,255,255,0.1)"}
                >
                  <ArrowRight size={19} /> Get the Cards
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* ===== FOOTER ===== */}
        <footer style={{ padding: isMobile ? "36px 5%" : "44px 5%", borderTop: "2px solid rgba(0,0,0,0.06)" }}>
          <div className="footer-inner">
            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <div style={{ width: 36, height: 36, borderRadius: 10, display: "flex", alignItems: "center", justifyContent: "center" }}>
                <img src="./OQ72.png" alt="" style={{filter:'invert(1)'}}/>
              </div>
              <span className="display" style={{ fontSize: 22, color: "var(--green-dark)" }}>
                OQU<span style={{ color: "var(--orange)" }}>LIX</span><span style={{ color: "var(--orange)" }}>.</span>
              </span>
            </div>
            <div style={{ display: "flex", gap: isMobile ? 20 : 28, flexWrap: "wrap", justifyContent: "center" }}>
              {["Privacy", "Support", "Instagram", "Terms"].map(link => (
                <a key={link} href="#" style={{ color: "#888", fontWeight: 700, fontSize: 13, textDecoration: "none", transition: "color 0.2s" }}
                  onMouseEnter={e => e.currentTarget.style.color = "var(--orange)"}
                  onMouseLeave={e => e.currentTarget.style.color = "#888"}
                >{link}</a>
              ))}
            </div>
            <div style={{ color: "#aaa", fontSize: 13, fontWeight: 600 }}>
              © 2026 Oqulix Pvt Ltd — <span style={{ color: "var(--orange)" }}>Stay Wild 🌿</span>
            </div>
          </div>
        </footer>

      </div>
    </>
  );
}