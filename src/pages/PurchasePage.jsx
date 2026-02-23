import React, { useState, useEffect, useRef } from "react";
import {
  TreePine, Download, Menu, X, Star, ShieldCheck,
  Sparkles, Package, Smartphone, CheckCircle2, ChevronDown,
  Truck, RefreshCcw, Lock, ArrowRight, Zap, ScanLine
} from "lucide-react";
import RazorpayButton from "../components/RazorpayButton";

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

const faqs = [
  { q: "What's inside the pack?", a: "You get 30 beautifully illustrated animal cards plus 1 special 'Get the App' scan card that guides you to download Oqulix on your phone." },
  { q: "How do the interactive animals work?", a: "Open the Oqulix app, point your camera at any card, and a fully animated 3D animal springs to life in your real environment. Each animal has unique movements and sounds." },
  { q: "Is the app free to download?", a: "Yes! The Oqulix app is completely free. The card pack is the only purchase you need — no subscriptions, no in-app purchases, no hidden costs ever." },
  { q: "How long does shipping take?", a: "We ship across India within 3–10 business days. You'll receive a tracking link via WhatsApp and email once your order is dispatched." },
];

function FAQ({ item }) {
  const [open, setOpen] = useState(false);
  return (
    <div style={{
      borderRadius: 18, border: "2px solid rgba(0,0,0,0.07)", overflow: "hidden",
      transition: "box-shadow 0.2s",
      boxShadow: open ? "0 8px 24px rgba(0,0,0,0.08)" : "none",
      background: "white",
    }}>
      <button onClick={() => setOpen(!open)} style={{
        width: "100%", display: "flex", justifyContent: "space-between", alignItems: "center",
        padding: "20px 24px", background: "none", border: "none", cursor: "pointer", textAlign: "left", gap: 16,
      }}>
        <span style={{ fontWeight: 800, fontSize: 15, color: "var(--green-dark)", fontFamily: "var(--font-body)", lineHeight: 1.4 }}>
          {item.q}
        </span>
        <div style={{
          width: 32, height: 32, borderRadius: "50%",
          background: open ? "var(--orange)" : "rgba(0,0,0,0.06)",
          display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0,
          transition: "background 0.2s, transform 0.3s",
          transform: open ? "rotate(180deg)" : "rotate(0deg)",
        }}>
          <ChevronDown size={16} color={open ? "white" : "var(--green-dark)"} />
        </div>
      </button>
      {open && (
        <div style={{ padding: "0 24px 20px", color: "#666", fontSize: 14, lineHeight: 1.75, fontFamily: "var(--font-body)", fontWeight: 600 }}>
          {item.a}
        </div>
      )}
    </div>
  );
}

export default function PurchasePage() {
  const isMobile = useIsMobile();
  const [menuOpen, setMenuOpen] = useState(false);
  const [buyPressed, setBuyPressed] = useState(false);

  const handleBuyNow = () => {
    setBuyPressed(true);
    setTimeout(() => setBuyPressed(false), 500);
    // Replace with your payment link:
    // window.location.href = "YOUR_RAZORPAY_OR_PAYMENT_LINK";
    alert("Redirecting to checkout… 🎉");
  };

  const chipFeatures = [
    { icon: "🃏", label: "30 AR Animal Cards" },
    { icon: "📲", label: "1 App Scan Card" },
    { icon: "🦁", label: "Fully Interactive Animals" },
    { icon: "🔊", label: "Sounds & Animations" },
    { icon: "📶", label: "Works Offline" },
    { icon: "🔠", label: "Learn spellings" },
  ];

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Boogaloo&family=Nunito:wght@400;600;700;800;900&display=swap');
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        :root {
          --cream: #FEFAE8; --green-dark: #1A3A2A; --green-mid: #2D6A4F;
          --green-bright: #52B788; --orange: #FF6B35; --yellow: #FFD93D;
          --teal: #00C9A7; --purple: #845EC2;
          --font-display: 'Boogaloo', cursive; --font-body: 'Nunito', sans-serif;
        }
        html { scroll-behavior: smooth; }
        body { background: var(--cream); font-family: var(--font-body); overflow-x: hidden; }
        img { max-width: 100%; height: auto; }
        .display { font-family: var(--font-display); }

        @keyframes fadeUp { from { opacity:0; transform:translateY(28px); } to { opacity:1; transform:translateY(0); } }
        .fade-up { animation: fadeUp 0.75s cubic-bezier(0.22,1,0.36,1) both; }
        .d1{animation-delay:0.08s;} .d2{animation-delay:0.18s;} .d3{animation-delay:0.28s;} .d4{animation-delay:0.38s;} .d5{animation-delay:0.5s;}

        @keyframes spinSlow { to { transform: rotate(360deg); } }
        .spin-slow { animation: spinSlow 22s linear infinite; }

        @keyframes cardFloat1 { 0%,100%{transform:rotate(-14deg) translateY(0);} 50%{transform:rotate(-14deg) translateY(-10px);} }
        @keyframes cardFloat2 { 0%,100%{transform:rotate(-3deg) translateY(0);} 50%{transform:rotate(-3deg) translateY(-14px);} }
        @keyframes cardFloat3 { 0%,100%{transform:rotate(9deg) translateY(0);} 50%{transform:rotate(9deg) translateY(-8px);} }
        .cf1{animation:cardFloat1 4s ease-in-out infinite;}
        .cf2{animation:cardFloat2 4s ease-in-out infinite 0.5s;}
        .cf3{animation:cardFloat3 4s ease-in-out infinite 1s;}

        @keyframes marquee { from{transform:translateX(0);} to{transform:translateX(-50%);} }
        .marquee-track { display:flex; animation:marquee 22s linear infinite; width:max-content; }

        @keyframes buyPop { 0%{transform:scale(1);} 40%{transform:scale(0.96) translateY(5px);} 100%{transform:scale(1);} }
        .buy-pop { animation: buyPop 0.4s ease; }

        .badge {
          display:inline-flex; align-items:center; gap:6px;
          background:var(--orange); color:white;
          padding:6px 16px; border-radius:999px;
          font-size:13px; font-weight:800; text-transform:uppercase; letter-spacing:0.08em;
          font-family:var(--font-body);
        }

        .buy-btn {
          background:var(--orange); color:white; border:none; cursor:pointer;
          font-weight:900; font-family:var(--font-body);
          display:inline-flex; align-items:center; justify-content:center; gap:10px;
          box-shadow:0 7px 0 #c43e0f; transition:transform 0.15s, box-shadow 0.15s;
          text-decoration:none; border-radius:20px; width:100%; padding:20px 28px; font-size:20px;
        }
        .buy-btn:hover { transform:translateY(3px); box-shadow:0 4px 0 #c43e0f; }
        .buy-btn:active { transform:translateY(7px); box-shadow:none; }

        .nav-link {
          font-weight:800; font-size:15px; color:var(--green-dark);
          text-decoration:none; position:relative; transition:color 0.2s;
        }
        .nav-link::after {
          content:''; position:absolute; bottom:-4px; left:0; right:0;
          height:3px; background:var(--orange); border-radius:2px;
          transform:scaleX(0); transition:transform 0.2s;
        }
        .nav-link:hover { color:var(--orange); }
        .nav-link:hover::after { transform:scaleX(1); }

        .chip {
          display:flex; align-items:center; gap:10px;
          background:white; border-radius:14px; padding:12px 14px;
          border:2px solid rgba(0,0,0,0.06); font-weight:800; font-size:13px; color:var(--green-dark);
          transition:transform 0.25s, box-shadow 0.25s;
        }
        .chip:hover { transform:translateY(-3px); box-shadow:0 8px 20px rgba(0,0,0,0.08); }

        .sticky-bar {
          position:fixed; bottom:0; left:0; right:0; z-index:90;
          background:white; border-top:3px solid rgba(0,0,0,0.08);
          padding:12px 18px; display:none; align-items:center; gap:14px;
          box-shadow:0 -8px 32px rgba(0,0,0,0.12);
        }

        /* Layout */
        .hero-grid { display:grid; grid-template-columns:1fr 1fr; gap:64px; align-items:start; max-width:1200px; margin:0 auto; }
        .chips-grid { display:grid; grid-template-columns:1fr 1fr; gap:10px; }
        .inside-grid { display:grid; grid-template-columns:1fr 1fr; gap:20px; max-width:980px; margin:0 auto 40px; }
        .highlight-grid { display:grid; grid-template-columns:repeat(4,1fr); gap:14px; max-width:880px; margin:0 auto; }
        .steps-grid { display:grid; grid-template-columns:repeat(3,1fr); gap:20px; max-width:940px; margin:0 auto; }
        .stats-row { display:flex; gap:32px; justify-content:center; flex-wrap:wrap; }
        .faq-stack { display:flex; flex-direction:column; gap:12px; max-width:760px; margin:0 auto; }
        .desktop-nav { display:flex; gap:32px; align-items:center; }
        .mob-burger { display:none; }
        .card-vis { display:flex; }

        @media(max-width:767px){
          .hero-grid { grid-template-columns:1fr !important; gap:0 !important; }
          .card-vis { display:none !important; }
          .desktop-nav { display:none !important; }
          .mob-burger { display:flex !important; align-items:center; justify-content:center; }
          .inside-grid { grid-template-columns:1fr !important; }
          .highlight-grid { grid-template-columns:1fr 1fr !important; }
          .steps-grid { grid-template-columns:1fr !important; }
          .sticky-bar { display:flex !important; }
          .footer-inner { flex-direction:column !important; text-align:center !important; }
        }
        @media(max-width:480px){
          .chips-grid { grid-template-columns:1fr 1fr !important; }
        }
      `}</style>

      <div style={{ background: "var(--cream)", minHeight: "100vh" }}>

        {/* Mobile Menu */}
        {menuOpen && (
          <div style={{
            position: "fixed", inset: 0, zIndex: 500, background: "var(--green-dark)",
            display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 40,
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
              { label: "What's Inside", href: "#whats-inside" },
              { label: "How It Works", href: "#how" },
              { label: "FAQs", href: "#faq" },
            ].map(l => (
              <a key={l.label} href={l.href} onClick={() => setMenuOpen(false)} style={{
                fontFamily: "var(--font-display)", fontSize: 38, color: "white",
                textDecoration: "none",
              }}
                onMouseEnter={e => e.currentTarget.style.color = "var(--orange)"}
                onMouseLeave={e => e.currentTarget.style.color = "white"}
              >{l.label}</a>
            ))}
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
          <a href="/" style={{ display: "flex", alignItems: "center", gap: 10, textDecoration: "none" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <div style={{ width: 38, height: 38, borderRadius: 11, display: "flex", alignItems: "center", justifyContent: "center" }}>
              <img src="./OQ72.png" alt="" style={{filter:'invert(1)'}}/>
            </div>
            <span className="display" style={{ fontSize: 24, color: "var(--green-dark)", letterSpacing: 1 }}>
              OQU<span style={{ color: "var(--orange)" }}>LIX</span>
            </span>
          </div>
           
          </a>

          <div className="desktop-nav">
            <a href="#whats-inside" className="nav-link">What's Inside</a>
            <a href="#how" className="nav-link">How It Works</a>
            <a href="#faq" className="nav-link">FAQs</a>
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <a href="https://drive.google.com/uc?export=download&id=1e6KIiuRQL8Ia2z2AhJ2xb_iVwCCYq9U4"
              style={{
                background: "var(--green-mid)", color: "white",
                padding: "9px 18px", borderRadius: 12, fontSize: 14,
                fontWeight: 800, textDecoration: "none", display: "flex", alignItems: "center", gap: 7,
                fontFamily: "var(--font-body)",
              }}>
              <Download size={14} /> Free App
            </a>
            <button className="mob-burger" onClick={() => setMenuOpen(true)} style={{
              background: "rgba(0,0,0,0.06)", border: "none", borderRadius: 10,
              width: 40, height: 40, cursor: "pointer",
            }}>
              <Menu size={20} color="var(--green-dark)" />
            </button>
          </div>
        </nav>

        {/* ===== HERO / PURCHASE ===== */}
        <section id="hero" style={{ padding: isMobile ? "44px 5% 52px" : "72px 5% 72px", position: "relative", overflow: "hidden" }}>
          {/* Aurora bg */}
          <div style={{
            position: "absolute", inset: 0, pointerEvents: "none",
            background: `radial-gradient(ellipse 70% 60% at 10% 50%, rgba(0,201,167,0.09) 0%, transparent 60%),
                         radial-gradient(ellipse 60% 50% at 90% 20%, rgba(255,107,53,0.08) 0%, transparent 60%),
                         radial-gradient(ellipse 50% 40% at 55% 90%, rgba(255,217,61,0.06) 0%, transparent 60%)`,
          }} />
          {!isMobile && (
            <div className="spin-slow" style={{
              position: "absolute", top: -130, right: -130, width: 520, height: 520,
              borderRadius: "50%", border: "42px solid rgba(82,183,136,0.06)", pointerEvents: "none",
            }} />
          )}

          <div className="hero-grid" style={{ position: "relative", zIndex: 1 }}>

            {/* LEFT: Card fan visual */}
            <div className="card-vis" style={{ position: "relative", alignItems: "center", justifyContent: "center", minHeight: 500 }}>
              {/* Glow blob */}
              <div style={{
                position: "absolute", inset: -30,
                background: "radial-gradient(ellipse, rgba(255,107,53,0.16) 0%, rgba(82,183,136,0.12) 45%, transparent 72%)",
                filter: "blur(28px)", borderRadius: "50%",
              }} />

              {/* Back card left */}
              <div className="cf1" style={{
                position: "absolute", left: "2%", top: "12%",
                width: "50%",
    
                borderRadius: 10, boxShadow: "0 20px 50px rgba(0,0,0,0.18)",
                display: "flex", alignItems: "center", justifyContent: "center",
              }}>
                                <img src="/Tiger.png" alt="Animal Card" style={{ width: "100%", height: "100%", objectFit: "cover", borderRadius: 5, display: "block" }} />

              </div>

              {/* Back card right */}
              <div className="cf3" style={{
                position: "absolute", right: "2%", top: "16%",
                width: "48%",
                
                borderRadius: 10, boxShadow: "0 20px 50px rgba(0,0,0,0.18)",
                display: "flex", alignItems: "center", justifyContent: "center",
              }}>
                                <img src="/Dog.png" alt="Animal Card" style={{ width: "100%", height: "100%", objectFit: "cover", borderRadius: 5, display: "block" }} />

                <Sparkles size={60} color="rgba(255,255,255,0.18)" />
              </div>

              {/* Front card */}
              <div className="cf2" style={{
                position: "relative", zIndex: 5,
                width: "55%",
                 borderRadius: 10, padding: 12,
                boxShadow: " 0 0 0 1px rgba(0,0,0,0.04)",
              }}>
                <img src="/Deer.png" alt="Animal Card" style={{ width: "100%", height: "100%", objectFit: "cover", borderRadius: 5, display: "block" }} />
                {/* Sticker */}
                <div style={{
                  position: "absolute", bottom: -16, right: -12, zIndex: 10,
                  background: "var(--yellow)", color: "var(--green-dark)",
                  padding: "7px 14px", borderRadius: 999, fontSize: 12, fontWeight: 900,
                  fontFamily: "var(--font-display)", boxShadow: "3px 3px 0 rgba(0,0,0,0.13)",
                  transform: "rotate(5deg)", whiteSpace: "nowrap",
                }}>30 Cards! ✦</div>
              </div>

              {/* Floating scan badge */}
              <div style={{
                position: "absolute", bottom: "10%", left: "4%", zIndex: 8,
                background: "var(--green-dark)", borderRadius: 18, padding: "12px 16px",
                display: "flex", alignItems: "center", gap: 10,
                boxShadow: "0 12px 32px rgba(0,0,0,0.22)",
                animation: "cardFloat3 4s ease-in-out infinite 1.4s",
              }}>
                <div style={{ background: "var(--teal)", borderRadius: 10, padding: 8 }}>
                  <ScanLine size={17} color="white" />
                </div>
                <div>
                  <div style={{ fontSize: 9, fontWeight: 800, color: "#999", textTransform: "uppercase", letterSpacing: 1 }}>Scan to See</div>
                  <div style={{ fontSize: 12, fontWeight: 900, color: "white" }}>Live AR Animal</div>
                </div>
              </div>
            </div>

            {/* RIGHT: Purchase panel */}
            <div>
              {/* Breadcrumb */}
              <div className="fade-up" style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 18, fontSize: 13, fontWeight: 700, color: "#aaa" }}>
                <a href="/" style={{ color: "var(--green-mid)", textDecoration: "none" }}>Home</a>
                <span>›</span>
                <span style={{ color: "var(--green-dark)" }}>Safari Card Pack</span>
              </div>

              <div className="badge fade-up" style={{ background: "var(--teal)", marginBottom: 16 }}>
                ✦ In Stock — Ships Across India
              </div>

              <h1 className="display fade-up d1" style={{ fontSize: isMobile ? 42 : 54, color: "var(--green-dark)", lineHeight: 1.03, marginBottom: 14 }}>
                Oqulix <span style={{ color: "var(--orange)" ,fontWeight:'800'}}>AR Flash Cards</span><br />Card Pack
              </h1>

              <img src="/img.png" style={{border:'solid var(--orange)',borderRadius:'10px'}} alt="" />

              <p className="fade-up d2" style={{ fontSize: isMobile ? 14 : 16, color: "#666", lineHeight: 1.75, marginBottom: 22, fontWeight: 600, maxWidth: 440 }}>
                31 cards. Infinite adventures. Scan each card with the free Oqulix app to unleash a living, breathing, fully animated animal right in your room.
              </p>

              {/* Rating */}
              <div className="fade-up d2" style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 26 }}>
                <div style={{ display: "flex", gap: 3 }}>
                  {[1,2,3,4,5].map(s => <Star key={s} size={16} fill="#FFD93D" color="#FFD93D" />)}
                </div>
                <span style={{ fontWeight: 800, fontSize: 14, color: "var(--green-dark)" }}>4.9</span>
                <span style={{ color: "#ccc" }}>/5</span>
                <span style={{ color: "#bbb", fontSize: 13, fontWeight: 600 }}>· 200+ happy families</span>
              </div>

              {/* Price block */}
              <div className="fade-up d3" style={{
                background: "white", borderRadius: 22, padding: "22px 22px 18px",
                border: "3px solid rgba(255,107,53,0.14)",
                marginBottom: 18,
                boxShadow: "0 8px 32px rgba(255,107,53,0.07)",
              }}>
                <div style={{ display: "flex", alignItems: "flex-end", gap: 16, marginBottom: 6 }}>
                  <div className="display" style={{ fontSize: isMobile ? 54 : 64, color: "var(--orange)", lineHeight: 1 }}>
                    ₹499
                  </div>
                  <div style={{ paddingBottom: 8 }}>
                    <div style={{ fontSize: 14, color: "#bbb", textDecoration: "line-through", fontWeight: 700 }}>₹799</div>
                    <div style={{
                      fontSize: 12, background: "var(--yellow)", color: "var(--green-dark)",
                      borderRadius: 8, padding: "2px 9px", fontWeight: 900, display: "inline-block",
                    }}>38% OFF</div>
                  </div>
                </div>
                <div style={{ fontSize: 13, color: "#888", fontWeight: 700 }}>
                  Free shipping across India · No hidden charges
                </div>
              </div>

              {/* Feature chips */}
              <div className="chips-grid fade-up d3" style={{ marginBottom: 22 }}>
                {chipFeatures.map((f, i) => (
                  <div key={i} className="chip">
                    <span style={{ fontSize: 17 }}>{f.icon}</span>
                    <span>{f.label}</span>
                  </div>
                ))}
              </div>

              {/* BUY NOW button */}
              <div className="fade-up d4">

                <div className="flex justify-center border-2 border-[#1e40a0] bg-[#072654] rounded-2xl" style={{padding:'5px'}}>
                  <RazorpayButton/>
                </div>

                {/* Trust row */}
                <div style={{ display: "flex", gap: 18, justifyContent: "center", flexWrap: "wrap" }}>
                  {[
                    { icon: <Lock size={13} color="var(--green-mid)" />, label: "Secure Payment" },
                    { icon: <Truck size={13} color="var(--green-mid)" />, label: "Free Delivery" },
                  ].map((t, i) => (
                    <div key={i} style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 12, fontWeight: 700, color: "#777" }}>
                      {t.icon} {t.label}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

       

        {/* ===== WHAT'S INSIDE ===== */}
        <section id="whats-inside" style={{ padding: isMobile ? "60px 5%" : "100px 5%", background: "white" }}>
          <div style={{ textAlign: "center", marginBottom: isMobile ? 36 : 56 }}>
            <div className="badge" style={{ background: "var(--green-mid)", marginBottom: 14 }}>✦ What's Inside</div>
            <h2 className="display" style={{ fontSize: isMobile ? 36 : 50, color: "var(--green-dark)", lineHeight: 1.1, marginBottom: 12 }}>
              31 Cards. One Wild World.
            </h2>
            <p style={{ color: "#666", fontSize: isMobile ? 14 : 16, maxWidth: 480, margin: "0 auto", lineHeight: 1.7, fontWeight: 600 }}>
              Every card is a doorway to a different living creature. Point, scan, and let the wild in.
            </p>
          </div>

          <div className="inside-grid">
            {/* 30 AR Cards */}
            <div style={{
              background: "linear-gradient(135deg, #E8F8F0, #C8EDD8)",
              borderRadius: 28, padding: isMobile ? "32px 24px" : "44px 36px",
              position: "relative", overflow: "hidden",
            }}>
              <div style={{ position: "absolute", right: -16, top: -16, fontSize: 110, opacity: 0.07, pointerEvents: "none" }}>🃏</div>
              <div style={{
                width: 54, height: 54, background: "white", borderRadius: 16,
                display: "flex", alignItems: "center", justifyContent: "center",
                boxShadow: "0 4px 12px rgba(0,0,0,0.08)", marginBottom: 18,
              }}>
                <Package size={24} color="var(--green-mid)" />
              </div>
              <div className="display" style={{ fontSize: isMobile ? 52 : 64, color: "var(--green-dark)", lineHeight: 1, marginBottom: 6 }}>30</div>
              <h3 style={{ fontWeight: 900, fontSize: isMobile ? 18 : 21, color: "var(--green-dark)", marginBottom: 12 }}>AR Animal Cards</h3>
              <p style={{ color: "#4a7c5f", fontSize: 14, lineHeight: 1.7, fontWeight: 600, marginBottom: 20 }}>
                From lions to octopuses — each card unlocks a unique, fully animated 3D animal. They move, breathe, and have natural sounds.
              </p>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 7 }}>
                {["🦁", "🐘", "🦜", "🐬", "🦋", "🐼", "🦊", "🐢", "🦅", "🐙"].map((e, i) => (
                  <span key={i} style={{ fontSize: 20 }}>{e}</span>
                ))}
                <span style={{ fontSize: 13, fontWeight: 800, color: "var(--green-mid)", alignSelf: "center", marginLeft: 4 }}>+20 more</span>
              </div>
            </div>

            {/* 1 App Card */}
            <div style={{
              background: "linear-gradient(135deg, #1A3A2A, #2D6A4F)",
              borderRadius: 28, padding: isMobile ? "32px 24px" : "44px 36px",
              position: "relative", overflow: "hidden",
            }}>
              <div style={{ position: "absolute", right: -16, top: -16, fontSize: 110, opacity: 0.06, pointerEvents: "none" }}>📲</div>
              <div style={{
                width: 54, height: 54, background: "rgba(255,255,255,0.1)", borderRadius: 16,
                display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 18,
              }}>
                <Smartphone size={24} color="var(--teal)" />
              </div>
              <div className="display" style={{ fontSize: isMobile ? 52 : 64, color: "var(--teal)", lineHeight: 1, marginBottom: 6 }}>1</div>
              <h3 style={{ fontWeight: 900, fontSize: isMobile ? 18 : 21, color: "white", marginBottom: 12 }}>App Scan Card</h3>
              <p style={{ color: "rgba(255,255,255,0.62)", fontSize: 14, lineHeight: 1.7, fontWeight: 600, marginBottom: 20 }}>
                New to Oqulix? Scan this card first. It instantly guides you to download the free app on your smart phone — you're exploring in seconds.
              </p>
              <div style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "rgba(0,201,167,0.15)", borderRadius: 12, padding: "9px 14px" }}>
                <Download size={13} color="var(--teal)" />
                <span style={{ color: "var(--teal)", fontWeight: 800, fontSize: 12 }}>App is 100% Free Forever</span>
              </div>
            </div>
          </div>

          {/* 4 highlights */}
         
        </section>

        {/* ===== HOW IT WORKS ===== */}
        <section id="how" style={{ padding: isMobile ? "60px 5%" : "100px 5%", background: "var(--green-dark)" }}>
          <div style={{ textAlign: "center", marginBottom: isMobile ? 36 : 56 }}>
            <div className="badge" style={{ background: "var(--orange)", marginBottom: 14 }}>✦ How It Works</div>
            <h2 className="display" style={{ fontSize: isMobile ? 36 : 50, color: "white", lineHeight: 1.1 }}>
              Scan. Watch. Wonder.
            </h2>
          </div>

          <div className="steps-grid">
            {[
              { step: "01", emoji: "📦", title: "Unbox Your Pack", desc: "Open your Oqulix Safari Pack and find 30 uniquely illustrated animal cards + 1 app card inside." },
              { step: "02", emoji: "📱", title: "Get the Free App", desc: "Scan the App Card or search 'Oqulix' on the App Store or Play Store. Free, always." },
              { step: "03", emoji: "🦁", title: "Bring Animals to Life", desc: "Hold any card in front of your phone and watch a living, breathing animal jump into your world." },
            ].map((item, i) => (
              <div key={i} style={{
                textAlign: "center", padding: isMobile ? "28px 20px" : "38px 26px",
                background: "rgba(255,255,255,0.05)", borderRadius: 26,
                border: "1px solid rgba(255,255,255,0.08)",
                transition: "background 0.3s, transform 0.3s",
              }}
                onMouseEnter={e => { e.currentTarget.style.background = "rgba(255,255,255,0.10)"; e.currentTarget.style.transform = "translateY(-6px)"; }}
                onMouseLeave={e => { e.currentTarget.style.background = "rgba(255,255,255,0.05)"; e.currentTarget.style.transform = "translateY(0)"; }}
              >
                <div style={{ fontSize: 42, marginBottom: 14 }}>{item.emoji}</div>
                <div className="display" style={{ fontSize: 14, color: "var(--orange)", marginBottom: 10, letterSpacing: 2 }}>STEP {item.step}</div>
                <h3 className="display" style={{ fontSize: 26, color: "white", marginBottom: 10 }}>{item.title}</h3>
                <p style={{ color: "rgba(255,255,255,0.58)", fontSize: 14, lineHeight: 1.7, fontWeight: 600 }}>{item.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ===== STATS ===== */}
        

        {/* ===== FINAL CTA ===== */}
        <section style={{ padding: isMobile ? "0 4% 60px" : "0 5% 80px" }}>
          <div style={{
            background: "linear-gradient(135deg, #1A3A2A 0%, #2D6A4F 60%, #1a4a35 100%)",
            borderRadius: isMobile ? 28 : 40,
            padding: isMobile ? "44px 24px" : "70px 60px",
            display: isMobile ? "block" : "grid",
            gridTemplateColumns: "1fr auto",
            gap: 48, alignItems: "center",
            position: "relative", overflow: "hidden",
            maxWidth: 1100, margin: "0 auto",marginTop:'80px'
          }}>
            <div style={{ position: "absolute", top: -30, right: -30, width: 100, height: 100, borderRadius: "50%", border: "10px solid rgba(255,255,255,0.07)", pointerEvents: "none" }} />
            <div style={{ position: "absolute", bottom: -40, left: -40, width: 160, height: 160, borderRadius: "50%", border: "16px solid rgba(255,255,255,0.04)", pointerEvents: "none" }} />

            <div style={{ position: "relative", zIndex: 1, marginBottom: isMobile ? 28 : 0 }}>
              <div className="display" style={{ fontSize: isMobile ? 34 : 46, color: "white", lineHeight: 1.1, marginBottom: 12 }}>
                Ready to Start the <span style={{ color: "var(--orange)" }}>Safari?</span>
              </div>
              <p style={{ color: "rgba(255,255,255,0.62)", fontSize: isMobile ? 14 : 15, lineHeight: 1.7, fontWeight: 600, maxWidth: 440, marginBottom: 16 }}>
                One pack. 31 cards. The free app handles all the magic — just scan and be amazed.
              </p>
              <div style={{ display: "flex", gap: 18, flexWrap: "wrap" }}>
                {["✓ Free App", "✓ Free Shipping", "✓ Easy Returns"].map(t => (
                  <span key={t} style={{ color: "var(--teal)", fontWeight: 800, fontSize: 14 }}>{t}</span>
                ))}
              </div>
            </div>

            <div style={{ position: "relative", zIndex: 1, textAlign: isMobile ? "center" : "right", flexShrink: 0 }}>
              <div style={{ marginBottom: 14 }}>
                <div style={{ fontSize: 13, color: "rgba(255,255,255,0.4)", textDecoration: "line-through", fontWeight: 700, marginBottom: 2 }}>₹799</div>
                <div className="display" style={{ fontSize: isMobile ? 56 : 68, color: "var(--yellow)", lineHeight: 1 }}>₹499</div>
              </div>
              <a href="#hero">
                <button className="buy-btn" 
                  style={{ width: isMobile ? "100%" : "auto", paddingLeft: 36, paddingRight: 36, fontSize: 18 }}>
                  <Zap size={19} fill="white" /> Buy Now
                </button>
              </a>
            </div>
          </div>
        </section>

        {/* ===== FAQ ===== */}
        <section id="faq" style={{ padding: isMobile ? "56px 5% 60px" : "80px 5% 100px" }}>
          <div style={{ textAlign: "center", marginBottom: isMobile ? 32 : 48 }}>
            <div className="badge" style={{ background: "var(--purple)", marginBottom: 14 }}>✦ FAQ</div>
            <h2 className="display" style={{ fontSize: isMobile ? 34 : 48, color: "var(--green-dark)", lineHeight: 1.1 }}>
              Got Questions?
            </h2>
          </div>
          <div className="faq-stack">
            {faqs.map((item, i) => <FAQ key={i} item={item} />)}
          </div>
        </section>

        {/* ===== FOOTER ===== */}
        <footer style={{ padding: isMobile ? "36px 5% 100px" : "44px 5%", borderTop: "2px solid rgba(0,0,0,0.06)" }}>
          <div className="footer-inner" style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 20, maxWidth: 1200, margin: "0 auto" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
             
              <div style={{ width: 36, height: 36, borderRadius: 10, display: "flex", alignItems: "center", justifyContent: "center" }}>
                <img src="./OQ72.png" alt="" style={{filter:'invert(1)'}}/>
              </div>
              <span className="display" style={{ fontSize: 22, color: "var(--green-dark)" }}>
                OQU<span style={{ color: "var(--orange)" }}>LIX</span><span style={{ color: "var(--orange)" }}>.</span>
              </span>
            </div>
            <div style={{ display: "flex", gap: isMobile ? 18 : 28, flexWrap: "wrap", justifyContent: "center" }}>
              {["Privacy", "Support", "Instagram", "Terms"].map(link => (
                <a key={link} href="#" style={{ color: "#888", fontWeight: 700, fontSize: 13, textDecoration: "none" }}
                  onMouseEnter={e => e.currentTarget.style.color = "var(--orange)"}
                  onMouseLeave={e => e.currentTarget.style.color = "#888"}
                >{link}</a>
              ))}
            </div>
            <div style={{ color: "#aaa", fontSize: 13, fontWeight: 600 }}>
              © 2026 Oqulix Labs — <span style={{ color: "var(--orange)" }}>Stay Wild 🌿</span>
            </div>
          </div>
        </footer>

        {/* ===== STICKY MOBILE BUY BAR ===== */}
        <div className="sticky-bar">
          <div style={{ flexShrink: 0 }}>
            <div style={{ fontSize: 10, color: "#bbb", textDecoration: "line-through", fontWeight: 700 }}>₹799</div>
            <div className="display" style={{ fontSize: 26, color: "var(--orange)", lineHeight: 1 }}>₹499</div>
          </div>
          <button className="buy-btn" onClick={handleBuyNow} style={{ flex: 1, fontSize: 16, padding: "13px 18px", borderRadius: 16 }}>
            <Zap size={17} fill="white" />
          </button>
        </div>

      </div>
    </>
  );
}