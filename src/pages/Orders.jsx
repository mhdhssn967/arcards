import React, { useState, useEffect } from "react";
import { initializeApp, getApps } from "firebase/app";
import { getAuth, signInWithEmailAndPassword, signOut, onAuthStateChanged } from "firebase/auth";
import { getFirestore, collection, onSnapshot, doc, updateDoc, query, orderBy } from "firebase/firestore";
import { Package, LogOut, CheckCircle2, Clock, Truck, Search, RefreshCw, ChevronDown, X, Phone, Mail, MapPin, Hash, AlertCircle, ShieldCheck, Loader2 } from "lucide-react";

const firebaseConfig = {
  apiKey: "AIzaSyAlvCd7GblYcJAVKTWjMyM8Wwk1ehCQC4A",
  authDomain: "ar-flash-cards.firebaseapp.com",
  projectId: "ar-flash-cards",
  storageBucket: "ar-flash-cards.firebasestorage.app",
  messagingSenderId: "844789383381",
  appId: "1:844789383381:web:193a730fe12d94cfbf625c",
  measurementId: "G-Z5SEGG74CC"
};

function getFirebase() {
  const app = getApps().length ? getApps()[0] : initializeApp(firebaseConfig);
  return { auth: getAuth(app), db: getFirestore(app) };
}

const STATUS = {
  pending: {
    label: "Pending", icon: "clock",
    color: "#c53030", bg: "#fff5f5", border: "#feb2b2", cardBorder: "#fc8181",
    glow: "0 0 0 2px rgba(229,62,62,0.15), 0 4px 24px rgba(229,62,62,0.13)",
    dot: "#e53e3e", pulse: true,
  },
  confirmed: {
    label: "Confirmed", icon: "check",
    color: "#276749", bg: "#f0fff4", border: "#9ae6b4", cardBorder: "#68d391",
    glow: "0 0 0 2px rgba(56,161,105,0.12), 0 4px 24px rgba(56,161,105,0.10)",
    dot: "#38a169", pulse: false,
  },
  delivered: {
    label: "Delivered", icon: "truck",
    color: "#718096", bg: "#f7fafc", border: "#e2e8f0", cardBorder: "#cbd5e0",
    glow: "0 1px 6px rgba(0,0,0,0.06)",
    dot: "#a0aec0", pulse: false,
  },
};

function getStatus(order) {
  if (order.status === "delivered") return "delivered";
  if (order.status === "confirmed" || order.payment_confirmed === true) return "confirmed";
  return "pending";
}

// ── Login ──────────────────────────────────────────────────────────
function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [showPass, setShowPass] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true); setError("");
    try {
      await signInWithEmailAndPassword(getFirebase().auth, email, password);
    } catch (err) {
      setError(
        err.code === "auth/invalid-credential" || err.code === "auth/wrong-password"
          ? "Wrong email or password."
          : err.code === "auth/too-many-requests"
          ? "Too many attempts. Try again later."
          : "Login failed. Please try again."
      );
      setLoading(false);
    }
  }

  return (
    <div style={{ minHeight:"100vh", background:"#f0f4ff", display:"flex", alignItems:"center", justifyContent:"center", padding:20, fontFamily:"Nunito,sans-serif" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Boogaloo&family=Nunito:wght@600;700;800;900&display=swap');
        *{box-sizing:border-box;margin:0;padding:0;}
        @keyframes fadeUp{from{opacity:0;transform:translateY(18px)}to{opacity:1;transform:translateY(0)}}
        @keyframes spin{to{transform:rotate(360deg)}}
        .lcard{animation:fadeUp 0.45s cubic-bezier(0.22,1,0.36,1) both;}
        .linp{transition:border-color 0.2s,box-shadow 0.2s;outline:none;}
        .linp:focus{border-color:#4f46e5!important;box-shadow:0 0 0 3px rgba(79,70,229,0.12)!important;}
        .lbtn{transition:all 0.15s;}
        .lbtn:hover:not(:disabled){filter:brightness(1.06);transform:translateY(1px);}
        .lbtn:active{transform:translateY(3px);}
      `}</style>
      <div className="lcard" style={{ background:"white", borderRadius:24, padding:"44px 36px", width:"100%", maxWidth:400, boxShadow:"0 20px 60px rgba(79,70,229,0.12), 0 1px 0 rgba(255,255,255,0.9)", border:"1px solid #e0e7ff" }}>
        <div style={{ textAlign:"center", marginBottom:32 }}>
          <div style={{ width:56, height:56, borderRadius:18, background:"linear-gradient(135deg,#1A3A2A,#2D6A4F)", display:"flex", alignItems:"center", justifyContent:"center", margin:"0 auto 14px", boxShadow:"0 8px 24px rgba(26,58,42,0.28)" }}>
            <ShieldCheck size={26} color="white" />
          </div>
          <h1 style={{ fontFamily:"Boogaloo,cursive", fontSize:32, color:"#1a202c", marginBottom:4 }}>OQU<span style={{color:"#FF6B35"}}>LIX</span> Admin</h1>
          <p style={{ fontSize:13, color:"#a0aec0", fontWeight:700 }}>Orders Dashboard · Restricted</p>
        </div>
        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom:14 }}>
            <label style={{ display:"block", fontSize:11, fontWeight:800, color:"#718096", textTransform:"uppercase", letterSpacing:0.8, marginBottom:6 }}>Email</label>
            <input className="linp" type="email" required value={email} onChange={e=>setEmail(e.target.value)} placeholder="admin@oqulix.com"
              style={{ width:"100%", padding:"12px 14px", border:"1.5px solid #e2e8f0", borderRadius:12, fontSize:14, fontFamily:"Nunito,sans-serif", fontWeight:700, color:"#1a202c", background:"#fafbff" }} />
          </div>
          <div style={{ marginBottom:20 }}>
            <label style={{ display:"block", fontSize:11, fontWeight:800, color:"#718096", textTransform:"uppercase", letterSpacing:0.8, marginBottom:6 }}>Password</label>
            <div style={{ position:"relative" }}>
              <input className="linp" type={showPass?"text":"password"} required value={password} onChange={e=>setPassword(e.target.value)} placeholder="••••••••"
                style={{ width:"100%", padding:"12px 46px 12px 14px", border:"1.5px solid #e2e8f0", borderRadius:12, fontSize:14, fontFamily:"Nunito,sans-serif", fontWeight:700, color:"#1a202c", background:"#fafbff" }} />
              <button type="button" onClick={()=>setShowPass(s=>!s)} style={{ position:"absolute", right:12, top:"50%", transform:"translateY(-50%)", background:"none", border:"none", cursor:"pointer", fontSize:10, fontWeight:800, color:"#a0aec0", fontFamily:"Nunito,sans-serif" }}>
                {showPass?"HIDE":"SHOW"}
              </button>
            </div>
          </div>
          {error && (
            <div style={{ background:"#fff5f5", border:"1px solid #fed7d7", borderRadius:10, padding:"10px 14px", marginBottom:14, display:"flex", gap:8, alignItems:"center" }}>
              <AlertCircle size={14} color="#e53e3e"/>
              <span style={{ fontSize:13, color:"#e53e3e", fontWeight:700 }}>{error}</span>
            </div>
          )}
          <button className="lbtn" type="submit" disabled={loading}
            style={{ width:"100%", padding:"14px", background:loading?"#c3dafe":"#4f46e5", border:"none", borderRadius:12, cursor:loading?"not-allowed":"pointer", color:"white", fontFamily:"Nunito,sans-serif", fontSize:15, fontWeight:900, display:"flex", alignItems:"center", justifyContent:"center", gap:8, boxShadow:"0 4px 0 #3730a3" }}>
            {loading ? <><Loader2 size={16} style={{animation:"spin 1s linear infinite"}}/>Signing in…</> : "Sign In →"}
          </button>
        </form>
      </div>
    </div>
  );
}

// ── Order Card ─────────────────────────────────────────────────────
function OrderCard({ order, onConfirm, onDeliver }) {
  const [expanded, setExpanded] = useState(false);
  const [busy, setBusy] = useState(false);
  const sk = getStatus(order);
  const s = STATUS[sk];

  const createdAt = order.createdAt?.toDate ? order.createdAt.toDate()
    : order.createdAt ? new Date(order.createdAt) : null;

  async function doConfirm() { setBusy(true); await onConfirm(order.id); setBusy(false); }
  async function doDeliver() { setBusy(true); await onDeliver(order.id); setBusy(false); }

  return (
    <div style={{ background:"white", borderRadius:18, border:`2px solid ${s.cardBorder}`, boxShadow:s.glow, overflow:"hidden", transition:"transform 0.18s" }}
      onMouseEnter={e=>e.currentTarget.style.transform="translateY(-2px)"}
      onMouseLeave={e=>e.currentTarget.style.transform="translateY(0)"}
    >
      {/* Top color strip */}
      <div style={{ height:4, background:`linear-gradient(90deg,${s.cardBorder},${s.dot})` }} />

      {/* Main row */}
      <div style={{ padding:"14px 16px", display:"flex", alignItems:"center", gap:10, flexWrap:"wrap" }}>

        {/* Pulse dot */}
        <div style={{ width:10, height:10, borderRadius:"50%", background:s.dot, flexShrink:0, animation:s.pulse?"pulseDot 1.8s ease-in-out infinite":"none" }} />

        {/* Name + contact */}
        <div style={{ flex:1, minWidth:110 }}>
          <div style={{ fontWeight:900, fontSize:14, color:"#1a202c", lineHeight:1.2 }}>{order.customer?.name||"—"}</div>
          <div style={{ fontSize:11, color:"#a0aec0", fontWeight:700, marginTop:2 }}>{order.customer?.phone}{order.customer?.email?` · ${order.customer.email}`:""}</div>
        </div>

        {/* Status badge */}
        <div style={{ display:"flex", alignItems:"center", gap:5, background:s.bg, color:s.color, border:`1.5px solid ${s.border}`, padding:"5px 11px", borderRadius:99, fontSize:11, fontWeight:800, flexShrink:0 }}>
          {sk==="pending" && <Clock size={11}/>}
          {sk==="confirmed" && <CheckCircle2 size={11}/>}
          {sk==="delivered" && <Truck size={11}/>}
          {s.label}
        </div>

        {/* Price */}
        <div style={{ fontFamily:"Boogaloo,cursive", fontSize:22, color:"#FF6B35", flexShrink:0 }}>₹499</div>

        {/* Date */}
        {createdAt && (
          <div style={{ fontSize:10, color:"#cbd5e0", fontWeight:700, flexShrink:0, textAlign:"right", lineHeight:1.5 }}>
            <div>{createdAt.toLocaleDateString("en-IN",{day:"numeric",month:"short",year:"2-digit"})}</div>
            <div>{createdAt.toLocaleTimeString("en-IN",{hour:"2-digit",minute:"2-digit"})}</div>
          </div>
        )}

        {/* Action buttons */}
        {sk==="pending" && (
          <button onClick={doConfirm} disabled={busy}
            style={{ padding:"8px 15px", background:busy?"#f0fff4":"#38a169", border:"none", borderRadius:10, cursor:busy?"not-allowed":"pointer", color:"white", fontSize:12, fontWeight:900, fontFamily:"Nunito,sans-serif", display:"flex", alignItems:"center", gap:5, flexShrink:0, boxShadow:"0 3px 0 #276749", transition:"all 0.15s" }}
            onMouseEnter={e=>{if(!busy){e.currentTarget.style.transform="translateY(2px)";e.currentTarget.style.boxShadow="0 1px 0 #276749";}}}
            onMouseLeave={e=>{e.currentTarget.style.transform="";e.currentTarget.style.boxShadow="0 3px 0 #276749";}}>
            {busy ? <Loader2 size={12} style={{animation:"spin 1s linear infinite"}}/> : <CheckCircle2 size={12}/>}
            {busy?"…":"Confirm"}
          </button>
        )}
        {sk==="confirmed" && (
          <button onClick={doDeliver} disabled={busy}
            style={{ padding:"8px 15px", background:busy?"#ebf8ff":"#3182ce", border:"none", borderRadius:10, cursor:busy?"not-allowed":"pointer", color:"white", fontSize:12, fontWeight:900, fontFamily:"Nunito,sans-serif", display:"flex", alignItems:"center", gap:5, flexShrink:0, boxShadow:"0 3px 0 #2c5282", transition:"all 0.15s" }}
            onMouseEnter={e=>{if(!busy){e.currentTarget.style.transform="translateY(2px)";e.currentTarget.style.boxShadow="0 1px 0 #2c5282";}}}
            onMouseLeave={e=>{e.currentTarget.style.transform="";e.currentTarget.style.boxShadow="0 3px 0 #2c5282";}}>
            {busy ? <Loader2 size={12} style={{animation:"spin 1s linear infinite"}}/> : <Truck size={12}/>}
            {busy?"…":"Delivered"}
          </button>
        )}
        {sk==="delivered" && (
          <div style={{ fontSize:11, fontWeight:700, color:"#a0aec0", display:"flex", alignItems:"center", gap:4, flexShrink:0 }}>
            <Truck size={12}/> Done
          </div>
        )}

        {/* Expand */}
        <button onClick={()=>setExpanded(e=>!e)} style={{ background:"#f7fafc", border:"1px solid #e2e8f0", borderRadius:9, width:30, height:30, display:"flex", alignItems:"center", justifyContent:"center", cursor:"pointer", flexShrink:0 }}>
          <ChevronDown size={14} color="#a0aec0" style={{ transition:"transform 0.25s", transform:expanded?"rotate(180deg)":"none" }}/>
        </button>
      </div>

      {/* Details */}
      {expanded && (
        <div style={{ padding:"0 16px 16px", borderTop:"1px solid #f0f4f8", animation:"slideDown 0.2s ease" }}>
          <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(180px,1fr))", gap:10, marginTop:12 }}>
            <DetailBox title="Contact">
              <DRow icon={<Phone size={11} color="#4f46e5"/>} val={order.customer?.phone||"—"}/>
              {order.customer?.email && <DRow icon={<Mail size={11} color="#4f46e5"/>} val={order.customer.email}/>}
            </DetailBox>
            <DetailBox title="Ship To">
              <DRow icon={<MapPin size={11} color="#FF6B35"/>} val={[order.shipping?.line1,order.shipping?.line2,order.shipping?.city,order.shipping?.state,order.shipping?.pincode].filter(Boolean).join(", ")}/>
            </DetailBox>
            <DetailBox title="Order">
              <DRow icon={<Hash size={11} color="#a0aec0"/>} val={`${order.id.slice(0,14).toUpperCase()}`}/>
              <DRow icon={<Package size={11} color="#a0aec0"/>} val="AR Flash Cards · 31pcs"/>
            </DetailBox>
          </div>
        </div>
      )}
    </div>
  );
}

function DetailBox({ title, children }) {
  return (
    <div style={{ background:"#f7fafc", borderRadius:12, padding:"12px 14px" }}>
      <div style={{ fontSize:9, fontWeight:800, color:"#a0aec0", textTransform:"uppercase", letterSpacing:0.8, marginBottom:8 }}>{title}</div>
      {children}
    </div>
  );
}

function DRow({ icon, val }) {
  return (
    <div style={{ display:"flex", gap:6, alignItems:"flex-start", marginBottom:6 }}>
      <div style={{ marginTop:1, flexShrink:0 }}>{icon}</div>
      <span style={{ fontSize:12, fontWeight:700, color:"#4a5568", lineHeight:1.4 }}>{val}</span>
    </div>
  );
}

// ── Dashboard ──────────────────────────────────────────────────────
export default function Orders() {
  const [user, setUser] = useState(null);
  const [authChecked, setAuthChecked] = useState(false);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("all");
  const [search, setSearch] = useState("");
  const [spinning, setSpinning] = useState(false);

  useEffect(() => {
    return onAuthStateChanged(getFirebase().auth, u => { setUser(u); setAuthChecked(true); });
  }, []);

  useEffect(() => {
    if (!user) return;
    const q = query(collection(getFirebase().db, "orders"), orderBy("createdAt", "desc"));
    return onSnapshot(q, snap => {
      setOrders(snap.docs.map(d => ({ id: d.id, ...d.data() })));
      setLoading(false);
    }, () => setLoading(false));
  }, [user]);

  async function handleConfirm(id) {
    await updateDoc(doc(getFirebase().db, "orders", id), { payment_confirmed:true, status:"confirmed" });
  }
  async function handleDeliver(id) {
    await updateDoc(doc(getFirebase().db, "orders", id), { status:"delivered" });
  }

  const counts = {
    all: orders.length,
    pending: orders.filter(o=>getStatus(o)==="pending").length,
    confirmed: orders.filter(o=>getStatus(o)==="confirmed").length,
    delivered: orders.filter(o=>getStatus(o)==="delivered").length,
  };

  const filtered = orders.filter(o => {
    const matchFilter = filter==="all" || getStatus(o)===filter;
    const q = search.toLowerCase();
    const matchSearch = !q || [o.customer?.name,o.customer?.phone,o.customer?.email,o.shipping?.city,o.shipping?.pincode,o.id].some(v=>v?.toLowerCase().includes(q));
    return matchFilter && matchSearch;
  });

  if (!authChecked) return (
    <div style={{ minHeight:"100vh", background:"#f0f4ff", display:"flex", alignItems:"center", justifyContent:"center" }}>
      <Loader2 size={28} color="#4f46e5" style={{animation:"spin 1s linear infinite"}}/>
      <style>{`@keyframes spin{to{transform:rotate(360deg)}}`}</style>
    </div>
  );

  if (!user) return <Login/>;

  return (
    <div style={{ minHeight:"100vh", background:"#f0f4ff", fontFamily:"Nunito,sans-serif" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Boogaloo&family=Nunito:wght@600;700;800;900&display=swap');
        *{box-sizing:border-box;margin:0;padding:0;}
        @keyframes spin{to{transform:rotate(360deg)}}
        @keyframes cardIn{from{opacity:0;transform:translateY(10px)}to{opacity:1;transform:translateY(0)}}
        @keyframes slideDown{from{opacity:0;transform:translateY(-6px)}to{opacity:1;transform:translateY(0)}}
        @keyframes pulseDot{0%,100%{box-shadow:0 0 0 3px rgba(229,62,62,0.25)}50%{box-shadow:0 0 0 7px rgba(229,62,62,0.05)}}
        .ocard{animation:cardIn 0.35s cubic-bezier(0.22,1,0.36,1) both;}
        .ftab{cursor:pointer;border:none;transition:all 0.15s;}
        .ftab:hover{filter:brightness(0.96);}
        ::-webkit-scrollbar{width:5px;}
        ::-webkit-scrollbar-thumb{background:#e2e8f0;border-radius:3px;}
        @media(max-width:600px){
          .sgrid{grid-template-columns:1fr 1fr!important;}
          .nemail{display:none!important;}
        }
        @media(max-width:420px){
          .ftabs{flex-wrap:wrap;}
        }
      `}</style>

      {/* Nav */}
      <nav style={{ background:"white", borderBottom:"1px solid #e2e8f0", padding:"0 20px", height:60, display:"flex", alignItems:"center", justifyContent:"space-between", position:"sticky", top:0, zIndex:50, boxShadow:"0 2px 12px rgba(79,70,229,0.07)" }}>
        <div style={{ display:"flex", alignItems:"center", gap:10 }}>
          <div style={{ width:34, height:34, borderRadius:10, background:"linear-gradient(135deg,#1A3A2A,#2D6A4F)", display:"flex", alignItems:"center", justifyContent:"center", boxShadow:"0 3px 10px rgba(26,58,42,0.25)" }}>
            <Package size={17} color="white"/>
          </div>
          <span style={{ fontFamily:"Boogaloo,cursive", fontSize:22, color:"#1a202c" }}>
            OQU<span style={{color:"#FF6B35"}}>LIX</span>
            <span style={{ fontFamily:"Nunito,sans-serif", fontSize:12, fontWeight:700, color:"#a0aec0", marginLeft:8 }}>Orders</span>
          </span>
        </div>
        <div style={{ display:"flex", alignItems:"center", gap:10 }}>
          <div style={{ display:"flex", alignItems:"center", gap:5 }}>
            <div style={{ width:7, height:7, borderRadius:"50%", background:"#38a169", animation:"pulseDot2 2s ease-in-out infinite" }}/>
            <span style={{ fontSize:10, fontWeight:800, color:"#a0aec0" }}>LIVE</span>
          </div>
          <button onClick={()=>{setSpinning(true);setTimeout(()=>setSpinning(false),700);}}
            style={{ background:"#f7fafc", border:"1px solid #e2e8f0", borderRadius:9, width:32, height:32, display:"flex", alignItems:"center", justifyContent:"center", cursor:"pointer" }}>
            <RefreshCw size={14} color="#718096" style={{animation:spinning?"spin 0.7s linear":"none"}}/>
          </button>
          <span className="nemail" style={{ fontSize:12, fontWeight:700, color:"#a0aec0" }}>{user.email}</span>
          <button onClick={()=>signOut(getFirebase().auth)}
            style={{ display:"flex", alignItems:"center", gap:5, background:"#fff5f5", border:"1px solid #fed7d7", borderRadius:9, padding:"7px 12px", cursor:"pointer", color:"#e53e3e", fontSize:12, fontWeight:800, fontFamily:"Nunito,sans-serif" }}>
            <LogOut size={12}/> Sign Out
          </button>
        </div>
      </nav>

      <div style={{ maxWidth:960, margin:"0 auto", padding:"24px 16px" }}>

        {/* Stat cards */}
        <div className="sgrid" style={{ display:"grid", gridTemplateColumns:"repeat(4,1fr)", gap:12, marginBottom:24 }}>
          {[
            { label:"Total",     val:counts.all,       col:"#4f46e5", bg:"#eef2ff", icon:<Package size={17} color="#4f46e5"/> },
            { label:"Pending",   val:counts.pending,   col:"#e53e3e", bg:"#fff5f5", icon:<Clock size={17} color="#e53e3e"/> },
            { label:"Confirmed", val:counts.confirmed, col:"#38a169", bg:"#f0fff4", icon:<CheckCircle2 size={17} color="#38a169"/> },
            { label:"Delivered", val:counts.delivered, col:"#718096", bg:"#f7fafc", icon:<Truck size={17} color="#718096"/> },
          ].map(st=>(
            <div key={st.label} style={{ background:"white", border:"1px solid #e2e8f0", borderRadius:16, padding:"16px 18px", boxShadow:"0 2px 8px rgba(0,0,0,0.04)" }}>
              <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:10 }}>
                <div style={{ width:34, height:34, borderRadius:10, background:st.bg, display:"flex", alignItems:"center", justifyContent:"center" }}>{st.icon}</div>
                <span style={{ fontFamily:"Boogaloo,cursive", fontSize:38, color:st.col, lineHeight:1 }}>{st.val}</span>
              </div>
              <div style={{ fontSize:11, fontWeight:800, color:"#a0aec0", textTransform:"uppercase", letterSpacing:0.6 }}>{st.label}</div>
            </div>
          ))}
        </div>

        {/* Legend */}
        <div style={{ display:"flex", gap:18, marginBottom:14, flexWrap:"wrap" }}>
          {[
            { dot:"#e53e3e", label:"Pending — red glow, needs action" },
            { dot:"#38a169", label:"Confirmed — green glow" },
            { dot:"#a0aec0", label:"Delivered — gray, completed" },
          ].map(l=>(
            <div key={l.label} style={{ display:"flex", alignItems:"center", gap:6 }}>
              <div style={{ width:8, height:8, borderRadius:"50%", background:l.dot }}/>
              <span style={{ fontSize:11, fontWeight:700, color:"#718096" }}>{l.label}</span>
            </div>
          ))}
        </div>

        {/* Toolbar */}
        <div style={{ background:"white", border:"1px solid #e2e8f0", borderRadius:16, padding:"12px 14px", marginBottom:16, display:"flex", gap:10, flexWrap:"wrap", alignItems:"center", boxShadow:"0 1px 4px rgba(0,0,0,0.04)" }}>
          <div style={{ position:"relative", flex:1, minWidth:160 }}>
            <Search size={13} color="#a0aec0" style={{ position:"absolute", left:11, top:"50%", transform:"translateY(-50%)" }}/>
            <input value={search} onChange={e=>setSearch(e.target.value)} placeholder="Search name, phone, city…"
              style={{ width:"100%", padding:"9px 30px 9px 30px", border:"1.5px solid #e2e8f0", borderRadius:10, fontSize:13, fontFamily:"Nunito,sans-serif", fontWeight:700, color:"#1a202c", outline:"none", background:"#fafbff", transition:"border-color 0.2s" }}
              onFocus={e=>e.target.style.borderColor="#4f46e5"}
              onBlur={e=>e.target.style.borderColor="#e2e8f0"}/>
            {search && <button onClick={()=>setSearch("")} style={{ position:"absolute", right:9, top:"50%", transform:"translateY(-50%)", background:"none", border:"none", cursor:"pointer" }}><X size={12} color="#a0aec0"/></button>}
          </div>
          <div className="ftabs" style={{ display:"flex", gap:5 }}>
            {[
              { key:"all",       label:"All",       col:"#4f46e5" },
              { key:"pending",   label:"Pending",   col:"#e53e3e" },
              { key:"confirmed", label:"Confirmed", col:"#38a169" },
              { key:"delivered", label:"Delivered", col:"#718096" },
            ].map(f=>(
              <button key={f.key} className="ftab" onClick={()=>setFilter(f.key)}
                style={{ padding:"7px 13px", borderRadius:9, background:filter===f.key?f.col:"#f7fafc", color:filter===f.key?"white":f.col, fontSize:12, fontWeight:800, fontFamily:"Nunito,sans-serif", border:`1.5px solid ${filter===f.key?f.col:"#e2e8f0"}`, display:"flex", alignItems:"center", gap:4 }}>
                {f.label}
                <span style={{ fontSize:10, background:filter===f.key?"rgba(255,255,255,0.22)":"#edf2f7", padding:"1px 5px", borderRadius:99, color:filter===f.key?"white":f.col, fontWeight:900 }}>{counts[f.key]}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Orders list */}
        {loading ? (
          <div style={{ textAlign:"center", padding:80 }}>
            <Loader2 size={28} color="#4f46e5" style={{animation:"spin 1s linear infinite",marginBottom:12}}/>
            <p style={{color:"#a0aec0",fontWeight:700}}>Loading orders…</p>
          </div>
        ) : filtered.length===0 ? (
          <div style={{ textAlign:"center", padding:"60px 20px", background:"white", borderRadius:18, border:"2px dashed #e2e8f0" }}>
            <Package size={36} color="#e2e8f0" style={{marginBottom:12}}/>
            <p style={{fontFamily:"Boogaloo,cursive",fontSize:22,color:"#cbd5e0",marginBottom:6}}>No orders found</p>
            <p style={{fontSize:13,color:"#cbd5e0",fontWeight:600}}>{search?"Try a different search":"Orders will appear in real-time"}</p>
          </div>
        ) : (
          <div style={{ display:"flex", flexDirection:"column", gap:10 }}>
            {filtered.map((order,i)=>(
              <div key={order.id} className="ocard" style={{animationDelay:`${i*0.03}s`}}>
                <OrderCard order={order} onConfirm={handleConfirm} onDeliver={handleDeliver}/>
              </div>
            ))}
          </div>
        )}

        <div style={{ textAlign:"center", padding:"28px 0 8px", fontSize:12, fontWeight:700, color:"#cbd5e0" }}>
          Oqulix Admin · {orders.length} orders · Real-time sync
        </div>
      </div>
    </div>
  );
}