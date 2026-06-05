import React, { useState, useEffect } from "react";
import { initializeApp, getApps } from "firebase/app";
import { getAuth, signInWithEmailAndPassword, onAuthStateChanged, signOut } from "firebase/auth";
import { getFirestore, doc, getDoc } from "firebase/firestore";
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell, Legend
} from "recharts";
import { ShieldCheck, LogOut, Users, MousePointerClick, TrendingUp, BarChart2, RefreshCw, Loader2, AlertCircle, ExternalLink } from "lucide-react";

const firebaseConfig = {
  apiKey: "AIzaSyAlvCd7GblYcJAVKTWjMyM8Wwk1ehCQC4A",
  authDomain: "ar-flash-cards.firebaseapp.com",
  projectId: "ar-flash-cards",
  storageBucket: "ar-flash-cards.firebasestorage.app",
  messagingSenderId: "844789383381",
  appId: "1:844789383381:web:193a730fe12d94cfbf625c",
};

function getFirebase() {
  const app = getApps().length ? getApps()[0] : initializeApp(firebaseConfig);
  return { auth: getAuth(app), db: getFirestore(app) };
}

const COLORS = ["#FF6B35", "#00C9A7", "#845EC2", "#FFD93D", "#2D6A4F", "#3182ce", "#e53e3e", "#38a169"];

const CLICK_LABELS = {
  install_app: "Install App (Hero)",
  try_demo: "Try Demo (Home)",
  buy_cards: "Buy Cards (Home)",
  download_nav: "Download (Nav)",
  download_mobile_menu: "Download (Mobile Menu)",
  download_app_cta: "Download App (CTA)",
  try_demo_purchase: "Try Demo (Purchase)",
  buy_now_hero: "Buy Now (Purchase)",
  buy_now_cta: "Buy Now (CTA)",
};

// ── Login ──────────────────────────────────────────────────────────
function Login({ onLogin }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true); setError("");
    try {
      await signInWithEmailAndPassword(getFirebase().auth, email, password);
    } catch {
      setError("Invalid credentials. Please try again.");
      setLoading(false);
    }
  }

  return (
    <div style={{ minHeight: "100vh", background: "linear-gradient(135deg,#0f1923,#1a2e1a)", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "'Nunito',sans-serif", padding: 20 }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Boogaloo&family=Nunito:wght@600;700;800;900&display=swap');
        *{box-sizing:border-box;margin:0;padding:0;}
        @keyframes fadeUp{from{opacity:0;transform:translateY(20px)}to{opacity:1;transform:translateY(0)}}
        @keyframes spin{to{transform:rotate(360deg)}}
        .acard{animation:fadeUp 0.5s cubic-bezier(0.22,1,0.36,1) both;}
        .ainp{transition:border-color 0.2s,box-shadow 0.2s;outline:none;}
        .ainp:focus{border-color:#845EC2!important;box-shadow:0 0 0 3px rgba(132,94,194,0.18)!important;}
        .abtn{transition:all 0.15s;}
        .abtn:hover:not(:disabled){filter:brightness(1.1);transform:translateY(-1px);}
        .abtn:active{transform:translateY(2px);}
      `}</style>
      <div className="acard" style={{ background: "rgba(255,255,255,0.04)", backdropFilter: "blur(20px)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 28, padding: "44px 36px", width: "100%", maxWidth: 400, boxShadow: "0 32px 80px rgba(0,0,0,0.5)" }}>
        <div style={{ textAlign: "center", marginBottom: 32 }}>
          <div style={{ width: 60, height: 60, borderRadius: 20, background: "linear-gradient(135deg,#845EC2,#5c3d8f)", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 16px", boxShadow: "0 8px 24px rgba(132,94,194,0.4)" }}>
            <BarChart2 size={28} color="white" />
          </div>
          <h1 style={{ fontFamily: "'Boogaloo',cursive", fontSize: 30, color: "white", marginBottom: 4 }}>OQU<span style={{ color: "#FF6B35" }}>LIX</span> Analytics</h1>
          <p style={{ fontSize: 12, color: "rgba(255,255,255,0.4)", fontWeight: 700 }}>Restricted · Admin Only</p>
        </div>
        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: 14 }}>
            <label style={{ display: "block", fontSize: 11, fontWeight: 800, color: "rgba(255,255,255,0.4)", textTransform: "uppercase", letterSpacing: 0.8, marginBottom: 6 }}>Email</label>
            <input className="ainp" type="email" required value={email} onChange={e => setEmail(e.target.value)}
              style={{ width: "100%", padding: "12px 14px", border: "1.5px solid rgba(255,255,255,0.1)", borderRadius: 12, fontSize: 14, fontFamily: "'Nunito',sans-serif", fontWeight: 700, color: "white", background: "rgba(255,255,255,0.06)" }} />
          </div>
          <div style={{ marginBottom: 20 }}>
            <label style={{ display: "block", fontSize: 11, fontWeight: 800, color: "rgba(255,255,255,0.4)", textTransform: "uppercase", letterSpacing: 0.8, marginBottom: 6 }}>Password</label>
            <input className="ainp" type="password" required value={password} onChange={e => setPassword(e.target.value)}
              style={{ width: "100%", padding: "12px 14px", border: "1.5px solid rgba(255,255,255,0.1)", borderRadius: 12, fontSize: 14, fontFamily: "'Nunito',sans-serif", fontWeight: 700, color: "white", background: "rgba(255,255,255,0.06)" }} />
          </div>
          {error && (
            <div style={{ background: "rgba(229,62,62,0.12)", border: "1px solid rgba(229,62,62,0.3)", borderRadius: 10, padding: "10px 14px", marginBottom: 14, display: "flex", gap: 8, alignItems: "center" }}>
              <AlertCircle size={14} color="#fc8181" />
              <span style={{ fontSize: 13, color: "#fc8181", fontWeight: 700 }}>{error}</span>
            </div>
          )}
          <button className="abtn" type="submit" disabled={loading}
            style={{ width: "100%", padding: 14, background: loading ? "rgba(132,94,194,0.4)" : "linear-gradient(135deg,#845EC2,#5c3d8f)", border: "none", borderRadius: 12, cursor: loading ? "not-allowed" : "pointer", color: "white", fontFamily: "'Nunito',sans-serif", fontSize: 15, fontWeight: 900, display: "flex", alignItems: "center", justifyContent: "center", gap: 8, boxShadow: "0 4px 0 #3d2760" }}>
            {loading ? <><Loader2 size={16} style={{ animation: "spin 1s linear infinite" }} />Signing in…</> : "Sign In →"}
          </button>
        </form>
      </div>
    </div>
  );
}

// ── Stat Card ──────────────────────────────────────────────────────
function StatCard({ label, value, sub, icon, color, bg }) {
  return (
    <div style={{ background: "rgba(255,255,255,0.05)", border: `1px solid ${color}33`, borderRadius: 20, padding: "22px 24px", display: "flex", flexDirection: "column", gap: 10, backdropFilter: "blur(8px)" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <div style={{ width: 40, height: 40, borderRadius: 12, background: bg, display: "flex", alignItems: "center", justifyContent: "center" }}>{icon}</div>
        <span style={{ fontSize: 36, fontFamily: "'Boogaloo',cursive", color, lineHeight: 1 }}>{value ?? "—"}</span>
      </div>
      <div>
        <div style={{ fontWeight: 800, fontSize: 13, color: "rgba(255,255,255,0.8)" }}>{label}</div>
        {sub && <div style={{ fontSize: 11, color: "rgba(255,255,255,0.35)", fontWeight: 700, marginTop: 2 }}>{sub}</div>}
      </div>
    </div>
  );
}

// ── Custom Tooltip ─────────────────────────────────────────────────
function CustomTooltip({ active, payload, label }) {
  if (active && payload?.length) {
    return (
      <div style={{ background: "#1a2030", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 12, padding: "10px 14px" }}>
        <div style={{ fontSize: 12, fontWeight: 800, color: "rgba(255,255,255,0.6)", marginBottom: 4 }}>{label}</div>
        <div style={{ fontSize: 16, fontWeight: 900, color: "#FF6B35" }}>{payload[0].value} clicks</div>
      </div>
    );
  }
  return null;
}

// ── Dashboard ──────────────────────────────────────────────────────
function Dashboard({ user }) {
  const [visitors, setVisitors] = useState(null);
  const [clicks, setClicks] = useState(null);
  const [loading, setLoading] = useState(true);
  const [spinning, setSpinning] = useState(false);

  async function fetchData() {
    setLoading(true);
    const { db } = getFirebase();
    const [vSnap, cSnap] = await Promise.all([
      getDoc(doc(db, "analytics", "visitors")),
      getDoc(doc(db, "analytics", "clicks")),
    ]);
    setVisitors(vSnap.exists() ? vSnap.data() : {});
    setClicks(cSnap.exists() ? cSnap.data() : {});
    setLoading(false);
  }

  useEffect(() => { fetchData(); }, []);

  function refresh() {
    setSpinning(true);
    fetchData().then(() => setTimeout(() => setSpinning(false), 600));
  }

  // Build bar chart data from clicks
  const barData = clicks
    ? Object.entries(clicks)
        .filter(([k]) => k !== "lastClick")
        .sort((a, b) => b[1] - a[1])
        .map(([k, v]) => ({ name: CLICK_LABELS[k] || k, clicks: v }))
    : [];

  // Pie: group into categories
  const pieData = clicks
    ? [
        { name: "Install / Download", value: (clicks.install_app || 0) + (clicks.download_nav || 0) + (clicks.download_mobile_menu || 0) + (clicks.download_app_cta || 0) },
        { name: "Try Demo", value: (clicks.try_demo || 0) + (clicks.try_demo_purchase || 0) },
        { name: "Buy Cards", value: (clicks.buy_cards || 0) + (clicks.buy_now_hero || 0) + (clicks.buy_now_cta || 0) },
      ].filter(d => d.value > 0)
    : [];

  const totalClicks = barData.reduce((s, d) => s + d.clicks, 0);
  const conversionRate = visitors?.totalVisits
    ? (((clicks?.buy_now_hero || 0) + (clicks?.buy_now_cta || 0)) / visitors.totalVisits * 100).toFixed(1)
    : "0.0";

  return (
    <div style={{ minHeight: "100vh", background: "linear-gradient(135deg,#0f1923 0%,#1a2e1a 100%)", fontFamily: "'Nunito',sans-serif", color: "white" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Boogaloo&family=Nunito:wght@600;700;800;900&display=swap');
        *{box-sizing:border-box;}
        @keyframes spin{to{transform:rotate(360deg)}}
        @keyframes fadeIn{from{opacity:0;transform:translateY(12px)}to{opacity:1;transform:translateY(0)}}
        .arow{animation:fadeIn 0.4s cubic-bezier(0.22,1,0.36,1) both;}
        ::-webkit-scrollbar{width:4px;}
        ::-webkit-scrollbar-thumb{background:rgba(255,255,255,0.1);border-radius:3px;}
      `}</style>

      {/* Nav */}
      <nav style={{ background: "rgba(0,0,0,0.4)", backdropFilter: "blur(16px)", borderBottom: "1px solid rgba(255,255,255,0.07)", padding: "0 24px", height: 64, display: "flex", alignItems: "center", justifyContent: "space-between", position: "sticky", top: 0, zIndex: 50 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <div style={{ width: 34, height: 34, borderRadius: 10, background: "linear-gradient(135deg,#845EC2,#5c3d8f)", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <BarChart2 size={17} color="white" />
          </div>
          <span style={{ fontFamily: "'Boogaloo',cursive", fontSize: 22 }}>OQU<span style={{ color: "#FF6B35" }}>LIX</span> <span style={{ fontSize: 13, fontWeight: 700, color: "rgba(255,255,255,0.4)" }}>Analytics</span></span>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <a href="/orders" style={{ display: "flex", alignItems: "center", gap: 6, background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 9, padding: "7px 13px", color: "rgba(255,255,255,0.7)", fontSize: 12, fontWeight: 800, textDecoration: "none" }}>
            <ExternalLink size={12} /> Orders Dashboard
          </a>
          <button onClick={refresh} style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 9, width: 34, height: 34, display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer" }}>
            <RefreshCw size={14} color="rgba(255,255,255,0.5)" style={{ animation: spinning ? "spin 0.7s linear" : "none" }} />
          </button>
          <span style={{ fontSize: 11, color: "rgba(255,255,255,0.3)", fontWeight: 700 }}>{user.email}</span>
          <button onClick={() => signOut(getFirebase().auth)} style={{ display: "flex", alignItems: "center", gap: 5, background: "rgba(229,62,62,0.12)", border: "1px solid rgba(229,62,62,0.25)", borderRadius: 9, padding: "7px 12px", cursor: "pointer", color: "#fc8181", fontSize: 12, fontWeight: 800, fontFamily: "'Nunito',sans-serif" }}>
            <LogOut size={12} /> Sign Out
          </button>
        </div>
      </nav>

      <div style={{ maxWidth: 1100, margin: "0 auto", padding: "32px 20px" }}>

        {loading ? (
          <div style={{ textAlign: "center", padding: 80 }}>
            <Loader2 size={32} color="#845EC2" style={{ animation: "spin 1s linear infinite", marginBottom: 12 }} />
            <p style={{ color: "rgba(255,255,255,0.4)", fontWeight: 700 }}>Loading analytics…</p>
          </div>
        ) : (
          <>
            {/* Header */}
            <div className="arow" style={{ marginBottom: 28 }}>
              <h2 style={{ fontFamily: "'Boogaloo',cursive", fontSize: 32, marginBottom: 4 }}>Site Analytics</h2>
              <p style={{ fontSize: 13, color: "rgba(255,255,255,0.4)", fontWeight: 700 }}>Real-time data from Firestore · Refreshes manually</p>
            </div>

            {/* Stat Cards */}
            <div className="arow" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(200px,1fr))", gap: 14, marginBottom: 28 }}>
              <StatCard label="Total Visits" value={visitors?.totalVisits ?? 0} sub="All page loads" icon={<TrendingUp size={18} color="#00C9A7" />} color="#00C9A7" bg="rgba(0,201,167,0.15)" />
              <StatCard label="Unique Visitors" value={visitors?.uniqueVisits ?? 0} sub="First-time visitors" icon={<Users size={18} color="#845EC2" />} color="#845EC2" bg="rgba(132,94,194,0.15)" />
              <StatCard label="Total Clicks" value={totalClicks} sub="Across all buttons" icon={<MousePointerClick size={18} color="#FF6B35" />} color="#FF6B35" bg="rgba(255,107,53,0.15)" />
              <StatCard label="Buy Intent Rate" value={`${conversionRate}%`} sub="Buy Now clicks / visits" icon={<BarChart2 size={18} color="#FFD93D" />} color="#FFD93D" bg="rgba(255,217,61,0.15)" />
            </div>

            {/* Charts Row */}
            <div className="arow" style={{ display: "grid", gridTemplateColumns: barData.length > 0 ? "1fr 340px" : "1fr", gap: 18, marginBottom: 28 }}>

              {/* Bar Chart */}
              {barData.length > 0 && (
                <div style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 20, padding: "24px 20px" }}>
                  <div style={{ fontWeight: 900, fontSize: 15, marginBottom: 20, color: "rgba(255,255,255,0.85)" }}>Button Clicks Breakdown</div>
                  <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={barData} margin={{ top: 0, right: 10, left: -10, bottom: 60 }}>
                      <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
                      <XAxis dataKey="name" tick={{ fill: "rgba(255,255,255,0.4)", fontSize: 10, fontWeight: 700 }} angle={-40} textAnchor="end" interval={0} />
                      <YAxis tick={{ fill: "rgba(255,255,255,0.4)", fontSize: 11 }} allowDecimals={false} />
                      <Tooltip content={<CustomTooltip />} />
                      <Bar dataKey="clicks" radius={[6, 6, 0, 0]}>
                        {barData.map((_, i) => <Cell key={i} fill={COLORS[i % COLORS.length]} />)}
                      </Bar>
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              )}

              {/* Pie Chart */}
              {pieData.length > 0 && (
                <div style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 20, padding: "24px 20px" }}>
                  <div style={{ fontWeight: 900, fontSize: 15, marginBottom: 16, color: "rgba(255,255,255,0.85)" }}>Intent Categories</div>
                  <ResponsiveContainer width="100%" height={260}>
                    <PieChart>
                      <Pie data={pieData} cx="50%" cy="45%" outerRadius={90} dataKey="value" label={({ name, percent }) => `${(percent * 100).toFixed(0)}%`} labelLine={false}>
                        {pieData.map((_, i) => <Cell key={i} fill={COLORS[i % COLORS.length]} />)}
                      </Pie>
                      <Legend iconType="circle" iconSize={8} wrapperStyle={{ fontSize: 11, fontWeight: 700, color: "rgba(255,255,255,0.6)" }} />
                      <Tooltip formatter={(v) => [`${v} clicks`]} contentStyle={{ background: "#1a2030", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 10, color: "white" }} />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              )}
            </div>

            {/* Clicks Table */}
            {barData.length > 0 && (
              <div className="arow" style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 20, overflow: "hidden" }}>
                <div style={{ padding: "20px 24px", borderBottom: "1px solid rgba(255,255,255,0.06)", fontWeight: 900, fontSize: 15, color: "rgba(255,255,255,0.85)" }}>Click Events Detail</div>
                {barData.map((row, i) => (
                  <div key={i} style={{ display: "flex", alignItems: "center", padding: "14px 24px", borderBottom: i < barData.length - 1 ? "1px solid rgba(255,255,255,0.04)" : "none", gap: 14 }}>
                    <div style={{ width: 8, height: 8, borderRadius: "50%", background: COLORS[i % COLORS.length], flexShrink: 0 }} />
                    <span style={{ flex: 1, fontSize: 13, fontWeight: 700, color: "rgba(255,255,255,0.7)" }}>{row.name}</span>
                    <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                      <div style={{ width: Math.max(4, (row.clicks / barData[0].clicks) * 140), height: 6, borderRadius: 3, background: COLORS[i % COLORS.length], opacity: 0.7 }} />
                      <span style={{ fontFamily: "'Boogaloo',cursive", fontSize: 22, color: COLORS[i % COLORS.length], minWidth: 40, textAlign: "right" }}>{row.clicks}</span>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Empty state */}
            {barData.length === 0 && (
              <div style={{ textAlign: "center", padding: "60px 20px", background: "rgba(255,255,255,0.03)", borderRadius: 20, border: "1px dashed rgba(255,255,255,0.1)" }}>
                <BarChart2 size={40} color="rgba(255,255,255,0.1)" style={{ marginBottom: 14 }} />
                <p style={{ color: "rgba(255,255,255,0.3)", fontWeight: 700, fontSize: 16 }}>No click events yet</p>
                <p style={{ color: "rgba(255,255,255,0.2)", fontSize: 13, marginTop: 6 }}>They'll appear here once users start interacting</p>
              </div>
            )}

            <div style={{ textAlign: "center", padding: "24px 0 4px", fontSize: 12, fontWeight: 700, color: "rgba(255,255,255,0.18)" }}>
              Oqulix Analytics · Data from Firestore · {new Date().toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" })}
            </div>
          </>
        )}
      </div>
    </div>
  );
}

// ── Root ───────────────────────────────────────────────────────────
export default function AnalyticsDashboard() {
  const [user, setUser] = useState(null);
  const [checked, setChecked] = useState(false);

  useEffect(() => {
    return onAuthStateChanged(getFirebase().auth, u => { setUser(u); setChecked(true); });
  }, []);

  if (!checked) return (
    <div style={{ minHeight: "100vh", background: "#0f1923", display: "flex", alignItems: "center", justifyContent: "center" }}>
      <Loader2 size={28} color="#845EC2" style={{ animation: "spin 1s linear infinite" }} />
      <style>{`@keyframes spin{to{transform:rotate(360deg)}}`}</style>
    </div>
  );

  return user ? <Dashboard user={user} /> : <Login />;
}
