import React from "react";
import { X, Smartphone, Download, AlertCircle, CheckCircle2, Info } from "lucide-react";

export default function DownloadModal({ isOpen, onClose }) {
  if (!isOpen) return null;

  const downloadLink = "https://github.com/oqulix-projects/ar-flash-cards-app/releases/download/V.1.0.0/Magic.Lenz.AR.apk";

  return (
    <div style={{
      position: "fixed", inset: 0, zIndex: 1000,
      background: "rgba(10,20,15,0.6)",
      backdropFilter: "blur(8px)",
      display: "flex", alignItems: "center", justifyContent: "center",
      padding: "16px",
    }} onClick={e => e.target === e.currentTarget && onClose()}>
      
      <div style={{
        background: "white", borderRadius: 32,
        width: "100%", maxWidth: 460,
        maxHeight: "92vh", overflowY: "auto",
        boxShadow: "0 40px 100px rgba(0,0,0,0.3)",
        position: "relative",
        animation: "slideUp 0.4s cubic-bezier(0.22, 1, 0.36, 1) both",
      }}>
        <style>{`
          @keyframes slideUp { from{opacity:0; transform:translateY(30px) scale(0.95);} to{opacity:1; transform:translateY(0) scale(1);} }
          .step-card { background: #f8f9fa; border-radius: 16px; padding: 14px; margin-bottom: 10px; border: 1.5px solid #eee; transition: all 0.2s; }
          .step-card:hover { background: #f1f3f5; border-color: #ddd; }
        `}</style>
        
        {/* Header Image/Icon */}
        <div style={{ 
          background: "linear-gradient(135deg, #FF6B35, #FFD93D)", 
          height: 140, display: "flex", alignItems: "center", justifyContent: "center",
          position: "relative"
        }}>
          <img src="/appicon.png" width={"100px"} alt="" style={{ filter: "drop-shadow(0 0px 10px rgba(0,0,0,0.45))" }} />
          <button onClick={onClose} style={{
            position: "absolute", top: 16, right: 16,
            background: "rgba(0,0,0,0.2)", border: "none", borderRadius: "50%",
            width: 36, height: 36, cursor: "pointer",
            display: "flex", alignItems: "center", justifyContent: "center",
            color: "white"
          }}>
            <X size={20} />
          </button>
        </div>

        <div style={{ padding: "28px 24px" }}>
          <h2 style={{ fontSize: 32, color: "#1A3A2A", marginBottom: 12, textAlign: "center", fontFamily: "Boogaloo, cursive" }}>
            Get Happy Lenz App
          </h2>
          
          <p style={{ color: "#666", fontSize: 15, lineHeight: 1.6, textAlign: "center", marginBottom: 24, fontWeight: 600, fontFamily: "Nunito, sans-serif" }}>
            Unleash 3D animals in your living room! Scan Oqulix cards to see magic happen in real-time.
          </p>

          {/* Availability Block */}
          <div style={{ 
            display: "flex", gap: 12, marginBottom: 24, padding: "16px", 
            borderRadius: 20, background: "#f0fdf4", border: "1.5px solid #dcfce7" 
          }}>
            <div style={{ 
              background: "#2D6A4F", color: "white", padding: 8, borderRadius: 12, 
              display: "flex", alignItems: "center", justifyContent: "center", height: "fit-content" 
            }}>
              <Smartphone size={20} />
            </div>
            <div>
              <div style={{ fontWeight: 800, fontSize: 14, color: "#1A3A2A", display: "flex", alignItems: "center", gap: 6 }}>
                Android Version <span style={{ fontSize: 10, background: "#2D6A4F", color: "white", padding: "2px 6px", borderRadius: 4 }}>v1.0.0</span>
              </div>
              <div style={{ fontSize: 13, color: "#4a7c5f", fontWeight: 600, marginTop: 2 }}>
                Available for Android 8.0 or higher.
              </div>
              <div style={{ fontSize: 12, color: "#FF6B35", fontWeight: 800, marginTop: 4,display:'flex',alignItems:'center',gap:2 }}>
                <img src="/apple.png" width={"20px"} alt="" /> iOS version coming soon!
              </div>
            </div>
          </div>

          <div style={{ marginBottom: 20 }}>
            <h3 style={{ fontSize: 14, fontWeight: 800, color: "#1A3A2A", textTransform: "uppercase", letterSpacing: 0.5, marginBottom: 12, display: "flex", alignItems: "center", gap: 6 }}>
              <Info size={16} color="#FF6B35" /> Installation Guide
            </h3>
            
            <div className="step-card">
              <div style={{ display: "flex", gap: 12 }}>
                <div style={{ background: "#FF6B35", color: "white", width: 24, height: 24, borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 12, fontWeight: 900, flexShrink: 0 }}>1</div>
                <div style={{ fontSize: 13, color: "#555", fontWeight: 600 }}>Download the APK using the button below.</div>
              </div>
            </div>
            
            <div className="step-card">
              <div style={{ display: "flex", gap: 12 }}>
                <div style={{ background: "#FF6B35", color: "white", width: 24, height: 24, borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 12, fontWeight: 900, flexShrink: 0 }}>2</div>
                <div style={{ fontSize: 13, color: "#555", fontWeight: 600 }}>
                  If your phone blocks the install, go to <b>Settings &gt; Security</b> and enable <b>"Install Unknown Apps"</b> for your browser.
                </div>
              </div>
            </div>
            
            <div className="step-card">
              <div style={{ display: "flex", gap: 12 }}>
                <div style={{ background: "#FF6B35", color: "white", width: 24, height: 24, borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 12, fontWeight: 900, flexShrink: 0 }}>3</div>
                <div style={{ fontSize: 13, color: "#555", fontWeight: 600 }}>Open the downloaded file and click <b>Install</b>. You're ready to play!</div>
              </div>
            </div>
          </div>

          <a href={downloadLink} style={{ textDecoration: "none" }}>
            <button style={{
              width: "100%", background: "#FF6B35", color: "white", border: "none",
              padding: "18px", borderRadius: 20, fontSize: 18, fontWeight: 900,
              cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: 10,
              boxShadow: "0 8px 0 #c43e0f", transition: "all 0.1s",
              fontFamily: "Nunito, sans-serif"
            }}
            onMouseDown={e => { e.currentTarget.style.transform = "translateY(4px)"; e.currentTarget.style.boxShadow = "0 4px 0 #c43e0f"; }}
            onMouseUp={e => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "0 8px 0 #c43e0f"; }}
            >
              <Download size={22} /> Click here to Download
            </button>
          </a>
          
          <div style={{ textAlign: "center", marginTop: 24, fontSize: 12, color: "#aaa", fontWeight: 700 }}>
            <CheckCircle2 size={12} color="#00C9A7" style={{ display: "inline", marginRight: 4 }} />
             100% Safe & Virus Free
          </div>
        </div>
      </div>
    </div>
  );
}
