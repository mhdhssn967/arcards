import React, { useState, useEffect } from "react";
import { initializeApp, getApps } from "firebase/app";
import { getAuth, signInAnonymously } from "firebase/auth";
import { getFirestore, collection, addDoc, doc, updateDoc, serverTimestamp } from "firebase/firestore";
import { X, MapPin, User, Phone, ChevronRight, Loader2, CheckCircle2, Lock, Shield, ArrowLeft, Home, Building2, Navigation } from "lucide-react";
import RazorpayButton from "../components/RazorpayButton";

// ─── Firebase Config ──────────────────────────────────────────────
const firebaseConfig = {
  apiKey: "AIzaSyAlvCd7GblYcJAVKTWjMyM8Wwk1ehCQC4A",
  authDomain: "ar-flash-cards.firebaseapp.com",
  projectId: "ar-flash-cards",
  storageBucket: "ar-flash-cards.firebasestorage.app",
  messagingSenderId: "844789383381",
  appId: "1:844789383381:web:193a730fe12d94cfbf625c",
  measurementId: "G-Z5SEGG74CC"
};
// ─── Razorpay Config ──────────────────────────────────────────────
const RAZORPAY_KEY = "YOUR_RAZORPAY_KEY_ID"; // rzp_live_xxx or rzp_test_xxx

function getFirebase() {
  const app = getApps().length ? getApps()[0] : initializeApp(firebaseConfig);
  const auth = getAuth(app);
  const db = getFirestore(app);
  return { auth, db };
}

// ─── Step indicator ───────────────────────────────────────────────
function StepDot({ num, label, active, done }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 5 }}>
      <div style={{
        width: 34, height: 34, borderRadius: "50%",
        background: done ? "#00C9A7" : active ? "#FF6B35" : "rgba(0,0,0,0.08)",
        display: "flex", alignItems: "center", justifyContent: "center",
        transition: "all 0.35s cubic-bezier(0.34,1.56,0.64,1)",
        boxShadow: active ? "0 0 0 5px rgba(255,107,53,0.15)" : done ? "0 0 0 4px rgba(0,201,167,0.15)" : "none",
      }}>
        {done
          ? <CheckCircle2 size={18} color="white" strokeWidth={2.5} />
          : <span style={{ fontSize: 13, fontWeight: 900, color: active ? "white" : "#bbb", fontFamily: "Nunito, sans-serif" }}>{num}</span>
        }
      </div>
      <span style={{ fontSize: 10, fontWeight: 800, color: active ? "#FF6B35" : done ? "#00C9A7" : "#bbb", letterSpacing: 0.5, textTransform: "uppercase", fontFamily: "Nunito, sans-serif" }}>{label}</span>
    </div>
  );
}

function StepLine({ done }) {
  return (
    <div style={{ flex: 1, height: 3, borderRadius: 2, marginBottom: 18, background: done ? "#00C9A7" : "rgba(0,0,0,0.08)", transition: "background 0.4s ease" }} />
  );
}

// ─── Input field ──────────────────────────────────────────────────
function Field({ label, icon, error, ...props }) {
  const [focused, setFocused] = useState(false);
  return (
    <div style={{ marginBottom: 16 }}>
      <label style={{ display: "block", fontSize: 11, fontWeight: 800, color: "#888", textTransform: "uppercase", letterSpacing: 0.8, marginBottom: 6, fontFamily: "Nunito, sans-serif" }}>
        {label}
      </label>
      <div style={{ position: "relative" }}>
        {icon && (
          <div style={{ position: "absolute", left: 14, top: "50%", transform: "translateY(-50%)", color: focused ? "#FF6B35" : "#bbb", transition: "color 0.2s" }}>
            {icon}
          </div>
        )}
        <input
          {...props}
          onFocus={e => { setFocused(true); props.onFocus && props.onFocus(e); }}
          onBlur={e => { setFocused(false); props.onBlur && props.onBlur(e); }}
          style={{
            width: "100%", padding: icon ? "13px 14px 13px 42px" : "13px 14px",
            borderRadius: 14, border: `2px solid ${error ? "#ff4d4d" : focused ? "#FF6B35" : "rgba(0,0,0,0.1)"}`,
            fontSize: 14, fontWeight: 700, fontFamily: "Nunito, sans-serif",
            background: focused ? "#fff" : "#fafafa",
            outline: "none", transition: "all 0.2s", color: "#1A3A2A",
            boxShadow: focused ? "0 0 0 4px rgba(255,107,53,0.10)" : "none",
            ...props.style,
          }}
        />
      </div>
      {error && <p style={{ fontSize: 11, color: "#ff4d4d", fontWeight: 700, marginTop: 4, fontFamily: "Nunito, sans-serif" }}>{error}</p>}
    </div>
  );
}

// ─── Main Modal ───────────────────────────────────────────────────
export default function PurchaseModal({ isOpen, onClose }) {
  const [step, setStep] = useState(1); // 1=details, 2=address, 3=confirm
  const [loading, setLoading] = useState(false);
  const [authDone, setAuthDone] = useState(false);
  const [uid, setUid] = useState(null);
  const [orderId, setOrderId] = useState(null);
  const [paymentSuccess, setPaymentSuccess] = useState(false);

  const [details, setDetails] = useState({ name: "", phone: "", email: "" });
  const [address, setAddress] = useState({ line1: "", line2: "", city: "", state: "", pincode: "" });
  const [errors, setErrors] = useState({});

  // Firebase anonymous sign-in when modal opens
  useEffect(() => {
    if (isOpen && !authDone) {
      const { auth } = getFirebase();
      signInAnonymously(auth)
        .then(cred => { setUid(cred.user.uid); setAuthDone(true); })
        .catch(err => console.error("Auth error:", err));
    }
  }, [isOpen, authDone]);

  // Reset when closed
  useEffect(() => {
    if (!isOpen) {
      setStep(1); setLoading(false); setErrors({});
      setPaymentSuccess(false); setOrderId(null);
    }
  }, [isOpen]);

  // ── Validation ─────────────────────────────────────────────────
  function validateDetails() {
    const e = {};
    if (!details.name.trim() || details.name.trim().length < 2) e.name = "Please enter your full name";
    if (!/^[6-9]\d{9}$/.test(details.phone)) e.phone = "Enter a valid 10-digit Indian mobile number";
    if (details.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(details.email)) e.email = "Enter a valid email address";
    setErrors(e);
    return Object.keys(e).length === 0;
  }

  function validateAddress() {
    const e = {};
    if (!address.line1.trim()) e.line1 = "Street address is required";
    if (!address.city.trim()) e.city = "City is required";
    if (!address.state.trim()) e.state = "State is required";
    if (!/^\d{6}$/.test(address.pincode)) e.pincode = "Enter a valid 6-digit pincode";
    setErrors(e);
    return Object.keys(e).length === 0;
  }

  // ── Step 1: Save order with payment_confirmed: false ────────────
  // Called before Razorpay opens. Captures all user + address details immediately.
  async function createPendingOrder() {
    const { db } = getFirebase();
    const docRef = await addDoc(collection(db, "orders"), {
      uid,
      customer: {
        name: details.name,
        phone: details.phone,
        email: details.email || null,
      },
      shipping: {
        line1: address.line1,
        line2: address.line2 || null,
        city: address.city,
        state: address.state,
        pincode: address.pincode,
      },
      product: {
        name: "Oqulix AR Flash Cards Pack",
        price: 49900,
        currency: "INR",
      },
      payment_confirmed: false,   // ← false until Razorpay confirms
      payment: null,
      status: "pending",
      createdAt: serverTimestamp(),
    });
    return docRef.id;
  }

  // ── Step 2: Flip payment_confirmed → true after Razorpay success ─
  async function confirmOrder(firestoreDocId, razorpayResponse) {
    const { db } = getFirebase();
    await updateDoc(doc(db, "orders", firestoreDocId), {
      payment_confirmed: true,
      status: "paid",
      payment: {
        razorpay_payment_id: razorpayResponse.razorpay_payment_id,
        razorpay_order_id:   razorpayResponse.razorpay_order_id  || null,
        razorpay_signature:  razorpayResponse.razorpay_signature || null,
        paidAt: new Date().toISOString(),
      },
    });
  }

  // ── Launch: save first → open Razorpay → confirm on success ──────
  async function launchRazorpay() {
    setLoading(true);

    // Save details immediately with payment_confirmed: false
    let pendingDocId;
    try {
      pendingDocId = await createPendingOrder();
      setOrderId(pendingDocId);
    } catch (err) {
      console.error("Failed to create pending order:", err);
      setLoading(false);
      return;
    }
  }

  if (!isOpen) return null;

  // ── Success screen ────────────────────────────────────────────
  if (paymentSuccess) {
    return (
      <Overlay onClose={onClose}>
        <div style={{ textAlign: "center", padding: "48px 32px 40px" }}>
          <div style={{
            width: 80, height: 80, borderRadius: "50%",
            background: "linear-gradient(135deg, #00C9A7, #52B788)",
            display: "flex", alignItems: "center", justifyContent: "center",
            margin: "0 auto 20px",
            boxShadow: "0 0 0 12px rgba(0,201,167,0.12)",
            animation: "popIn 0.5s cubic-bezier(0.34,1.56,0.64,1)",
          }}>
            <CheckCircle2 size={38} color="white" strokeWidth={2.5} />
          </div>
          <h2 style={{ fontFamily: "Boogaloo, cursive", fontSize: 38, color: "#1A3A2A", marginBottom: 8 }}>
            Order Confirmed! 🎉
          </h2>
          <p style={{ fontFamily: "Nunito, sans-serif", fontSize: 15, color: "#666", fontWeight: 600, lineHeight: 1.6, marginBottom: 20 }}>
            Your Oqulix Safari Pack is on its way!<br />
            We'll send updates to your WhatsApp.
          </p>
          {orderId && (
            <div style={{ background: "#f5f5f5", borderRadius: 14, padding: "12px 20px", marginBottom: 24, display: "inline-block" }}>
              <span style={{ fontFamily: "Nunito, sans-serif", fontSize: 12, color: "#888", fontWeight: 700 }}>Order ID: </span>
              <span style={{ fontFamily: "Nunito, sans-serif", fontSize: 12, color: "#1A3A2A", fontWeight: 900 }}>{orderId.slice(0, 16).toUpperCase()}</span>
            </div>
          )}
          <div style={{ display: "flex", gap: 8, justifyContent: "center", flexWrap: "wrap", marginBottom: 28 }}>
            {["🦁 30 AR Cards", "📦 Free Shipping", "📱 Free App"].map(t => (
              <span key={t} style={{ fontFamily: "Nunito, sans-serif", fontSize: 12, fontWeight: 800, background: "rgba(82,183,136,0.12)", color: "#2D6A4F", padding: "5px 12px", borderRadius: 99 }}>{t}</span>
            ))}
          </div>
          <button onClick={onClose} style={{
            background: "#FF6B35", color: "white", border: "none", cursor: "pointer",
            fontFamily: "Nunito, sans-serif", fontWeight: 900, fontSize: 15,
            padding: "14px 36px", borderRadius: 14, width: "100%",
            boxShadow: "0 5px 0 #c43e0f",
          }}>
            Back to Home 🌿
          </button>
        </div>
      </Overlay>
    );
  }

  // ── Main flow ─────────────────────────────────────────────────
  return (
    <Overlay onClose={onClose}>
      <style>{`
        @keyframes popIn { from{transform:scale(0.5);opacity:0;} to{transform:scale(1);opacity:1;} }
        @keyframes slideUp { from{transform:translateY(12px);opacity:0;} to{transform:translateY(0);opacity:1;} }
        .modal-step { animation: slideUp 0.35s cubic-bezier(0.22,1,0.36,1) both; }
      `}</style>

      {/* Header */}
      <div style={{
        padding: "20px 24px 16px",
        borderBottom: "2px solid rgba(0,0,0,0.06)",
        display: "flex", alignItems: "center", justifyContent: "space-between",
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <div style={{ fontFamily: "Boogaloo, cursive", fontSize: 22, color: "#1A3A2A", lineHeight: 1 }}>
            OQU<span style={{ color: "#FF6B35" }}>LIX</span>
          </div>
          <div style={{ width: 1, height: 20, background: "rgba(0,0,0,0.12)" }} />
          <span style={{ fontFamily: "Nunito, sans-serif", fontSize: 13, fontWeight: 700, color: "#888" }}>Checkout</span>
        </div>
        <button onClick={onClose} style={{
          background: "rgba(0,0,0,0.06)", border: "none", cursor: "pointer",
          width: 34, height: 34, borderRadius: 10,
          display: "flex", alignItems: "center", justifyContent: "center",
        }}>
          <X size={16} color="#555" />
        </button>
      </div>

      {/* Step indicators */}
      <div style={{ padding: "18px 28px 0", display: "flex", alignItems: "center", gap: 0 }}>
        <StepDot num={1} label="You" active={step === 1} done={step > 1} />
        <StepLine done={step > 1} />
        <StepDot num={2} label="Address" active={step === 2} done={step > 2} />
        <StepLine done={step > 2} />
        <StepDot num={3} label="Pay" active={step === 3} done={false} />
      </div>

      {/* Product summary strip */}
      <div style={{
        margin: "14px 20px",
        background: "linear-gradient(135deg, #1A3A2A, #2D6A4F)",
        borderRadius: 16, padding: "12px 16px",
        display: "flex", alignItems: "center", justifyContent: "space-between",
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <div style={{ fontSize: 26 }}>🃏</div>
          <div>
            <div style={{ fontFamily: "Nunito, sans-serif", fontSize: 12, fontWeight: 800, color: "rgba(255,255,255,0.6)" }}>Oqulix Safari Pack</div>
            <div style={{ fontFamily: "Nunito, sans-serif", fontSize: 11, fontWeight: 700, color: "rgba(255,255,255,0.4)" }}>31 AR Cards · Free Delivery</div>
          </div>
        </div>
        <div style={{ textAlign: "right" }}>
          <div style={{ fontFamily: "Nunito, sans-serif", fontSize: 10, fontWeight: 700, color: "rgba(255,255,255,0.35)", textDecoration: "line-through" }}>₹799</div>
          <div style={{ fontFamily: "Boogaloo, cursive", fontSize: 26, color: "#FFD93D", lineHeight: 1 }}>₹499</div>
        </div>
      </div>

      {/* ── STEP 1: Personal Details ── */}
      {step === 1 && (
        <div className="modal-step" style={{ padding: "4px 20px 20px" }}>
          <h3 style={{ fontFamily: "Boogaloo, cursive", fontSize: 26, color: "#1A3A2A", marginBottom: 4 }}>
            Who's getting the safari? 🦁
          </h3>
          <p style={{ fontFamily: "Nunito, sans-serif", fontSize: 13, color: "#888", fontWeight: 600, marginBottom: 18 }}>
            We'll use this to confirm your order & keep you updated.
          </p>

          <Field
            label="Full Name *"
            icon={<User size={15} />}
            placeholder="e.g. Arjun Sharma"
            value={details.name}
            onChange={e => setDetails(d => ({ ...d, name: e.target.value }))}
            error={errors.name}
          />
          <Field
            label="WhatsApp / Phone *"
            icon={<Phone size={15} />}
            placeholder="10-digit mobile number"
            type="tel"
            maxLength={10}
            value={details.phone}
            onChange={e => setDetails(d => ({ ...d, phone: e.target.value.replace(/\D/g, "") }))}
            error={errors.phone}
          />
          <Field
            label="Email (optional)"
            placeholder="yourname@email.com"
            type="email"
            value={details.email}
            onChange={e => setDetails(d => ({ ...d, email: e.target.value }))}
            error={errors.email}
          />

          <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 18, padding: "10px 12px", background: "rgba(0,201,167,0.07)", borderRadius: 10 }}>
            <Shield size={12} color="#00C9A7" />
            <span style={{ fontFamily: "Nunito, sans-serif", fontSize: 11, color: "#00C9A7", fontWeight: 700 }}>
              Signed in securely · Your data is safe with us
            </span>
          </div>

          <button
            onClick={() => { if (validateDetails()) setStep(2); }}
            style={primaryBtnStyle}
          >
            Add Delivery Address <ChevronRight size={17} />
          </button>
        </div>
      )}

      {/* ── STEP 2: Address ── */}
      {step === 2 && (
        <div className="modal-step" style={{ padding: "4px 20px 20px" }}>
          <button onClick={() => setStep(1)} style={backBtnStyle}>
            <ArrowLeft size={14} /> Back
          </button>
          <h3 style={{ fontFamily: "Boogaloo, cursive", fontSize: 26, color: "#1A3A2A", marginBottom: 4 }}>
            Where should we ship? 📦
          </h3>
          <p style={{ fontFamily: "Nunito, sans-serif", fontSize: 13, color: "#888", fontWeight: 600, marginBottom: 18 }}>
            We ship across India — free delivery!
          </p>

          <Field
            label="Flat / House No. / Street *"
            icon={<Home size={15} />}
            placeholder="e.g. 42B, Gandhi Nagar"
            value={address.line1}
            onChange={e => setAddress(a => ({ ...a, line1: e.target.value }))}
            error={errors.line1}
          />
          <Field
            label="Area / Landmark (optional)"
            icon={<Building2 size={15} />}
            placeholder="e.g. Near SBI Bank"
            value={address.line2}
            onChange={e => setAddress(a => ({ ...a, line2: e.target.value }))}
          />

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
            <Field
              label="City *"
              placeholder="e.g. Kochi"
              value={address.city}
              onChange={e => setAddress(a => ({ ...a, city: e.target.value }))}
              error={errors.city}
            />
            <Field
              label="Pincode *"
              placeholder="6-digit"
              type="tel"
              maxLength={6}
              value={address.pincode}
              onChange={e => setAddress(a => ({ ...a, pincode: e.target.value.replace(/\D/g, "") }))}
              error={errors.pincode}
            />
          </div>
          <Field
            label="State *"
            icon={<Navigation size={15} />}
            placeholder="e.g. Kerala"
            value={address.state}
            onChange={e => setAddress(a => ({ ...a, state: e.target.value }))}
            error={errors.state}
          />

          <button
            onClick={() => { if (validateAddress()) setStep(3); }}
            style={primaryBtnStyle}
          >
            Review Order <ChevronRight size={17} />
          </button>
        </div>
      )}

      {/* ── STEP 3: Confirm + Pay ── */}
      {step === 3 && (
        <div className="modal-step" style={{ padding: "4px 20px 20px" }}>
          <button onClick={() => setStep(2)} style={backBtnStyle}>
            <ArrowLeft size={14} /> Back
          </button>
          <h3 style={{ fontFamily: "Boogaloo, cursive", fontSize: 26, color: "#1A3A2A", marginBottom: 14 }}>
            Confirm & Pay 🎉
          </h3>

          {/* Summary card */}
          <div style={{ background: "#f9f9f7", borderRadius: 18, border: "2px solid rgba(0,0,0,0.07)", overflow: "hidden", marginBottom: 16 }}>
            <SummaryRow icon="👤" label="Name" value={details.name} />
            <SummaryRow icon="📱" label="WhatsApp" value={details.phone} />
            {details.email && <SummaryRow icon="✉️" label="Email" value={details.email} />}
            <div style={{ height: 1, background: "rgba(0,0,0,0.06)", margin: "0 16px" }} />
            <SummaryRow icon="📍" label="Ship to" value={[address.line1, address.line2, address.city, address.state, address.pincode].filter(Boolean).join(", ")} />
          </div>

          {/* Price summary */}
          <div style={{ background: "white", borderRadius: 16, border: "2px solid rgba(255,107,53,0.15)", padding: "14px 16px", marginBottom: 16 }}>
            {[
              { label: "Oqulix AR Flash Cards (31 pcs)", value: "₹499" },
              { label: "Shipping", value: "FREE 🎁" },
              { label: "GST Included", value: "—" },
            ].map(r => (
              <div key={r.label} style={{ display: "flex", justifyContent: "space-between", marginBottom: 7 }}>
                <span style={{ fontFamily: "Nunito, sans-serif", fontSize: 13, fontWeight: 700, color: "#888" }}>{r.label}</span>
                <span style={{ fontFamily: "Nunito, sans-serif", fontSize: 13, fontWeight: 800, color: "#1A3A2A" }}>{r.value}</span>
              </div>
            ))}
            <div style={{ height: 1, background: "rgba(0,0,0,0.08)", margin: "10px 0" }} />
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <span style={{ fontFamily: "Nunito, sans-serif", fontSize: 15, fontWeight: 900, color: "#1A3A2A" }}>Total</span>
              <span style={{ fontFamily: "Boogaloo, cursive", fontSize: 28, color: "#FF6B35" }}>₹499</span>
            </div>
          </div>

          {/* PAY NOW button — Razorpay */}
          <button
            onClick={launchRazorpay}
            disabled={loading}
            
          >
            {loading
              ? <><Loader2 size={18} style={{ animation: "spin 1s linear infinite" }} /> Processing…</>
              : <div className="flex justify-center w-90 border-2 border-[#1e40a0] bg-[#072654] rounded-2xl" style={{padding:'5px'}}>
                                <RazorpayButton/>
                              </div>
            }
          </button>

          <div style={{ display: "flex", gap: 14, justifyContent: "center", marginTop: 12, flexWrap: "wrap" }}>
            {[
              { icon: <Lock size={11} color="#888" />, t: "256-bit Encrypted" },
              { icon: <Shield size={11} color="#888" />, t: "Razorpay Secured" },
            ].map((b, i) => (
              <div key={i} style={{ display: "flex", alignItems: "center", gap: 5, fontFamily: "Nunito, sans-serif", fontSize: 11, fontWeight: 700, color: "#aaa" }}>
                {b.icon} {b.t}
              </div>
            ))}
          </div>

          <style>{`
            @keyframes spin { to { transform: rotate(360deg); } }
          `}</style>
        </div>
      )}
    </Overlay>
  );
}

// ─── Sub-components ──────────────────────────────────────────────
function Overlay({ children, onClose }) {
  return (
    <div style={{
      position: "fixed", inset: 0, zIndex: 1000,
      background: "rgba(10,20,15,0.55)",
      backdropFilter: "blur(6px)",
      display: "flex", alignItems: "center", justifyContent: "center",
      padding: "16px",
      animation: "fadeIn 0.2s ease",
    }}
      onClick={e => { if (e.target === e.currentTarget) onClose(); }}
    >
      <style>{`@keyframes fadeIn{from{opacity:0}to{opacity:1}} @keyframes modalSlide{from{opacity:0;transform:translateY(20px) scale(0.97)}to{opacity:1;transform:translateY(0) scale(1)}}`}</style>
      <div style={{
        background: "white", borderRadius: 28,
        width: "100%", maxWidth: 440,
        maxHeight: "92vh", overflowY: "auto",
        boxShadow: "0 32px 80px rgba(0,0,0,0.25)",
        animation: "modalSlide 0.35s cubic-bezier(0.22,1,0.36,1) both",
      }}>
        {children}
      </div>
    </div>
  );
}

function SummaryRow({ icon, label, value }) {
  return (
    <div style={{ display: "flex", gap: 12, padding: "12px 16px", alignItems: "flex-start" }}>
      <span style={{ fontSize: 16, flexShrink: 0, marginTop: 1 }}>{icon}</span>
      <div>
        <div style={{ fontFamily: "Nunito, sans-serif", fontSize: 10, fontWeight: 800, color: "#bbb", textTransform: "uppercase", letterSpacing: 0.6 }}>{label}</div>
        <div style={{ fontFamily: "Nunito, sans-serif", fontSize: 13, fontWeight: 700, color: "#1A3A2A", lineHeight: 1.4 }}>{value}</div>
      </div>
    </div>
  );
}

const primaryBtnStyle = {
  width: "100%", padding: "16px 20px",
  background: "#FF6B35", color: "white", border: "none",
  borderRadius: 16, cursor: "pointer",
  fontFamily: "Nunito, sans-serif", fontSize: 16, fontWeight: 900,
  display: "flex", alignItems: "center", justifyContent: "center", gap: 8,
  boxShadow: "0 6px 0 #c43e0f",
  transition: "transform 0.15s, box-shadow 0.15s",
};

const backBtnStyle = {
  display: "flex", alignItems: "center", gap: 5,
  background: "none", border: "none", cursor: "pointer",
  fontFamily: "Nunito, sans-serif", fontSize: 13, fontWeight: 800, color: "#aaa",
  marginBottom: 10, padding: "4px 0",
};