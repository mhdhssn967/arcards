import React from "react";
import {
  ScanLine,
  Volume2,
  Sparkles,
  ShieldCheck,
  Download,
  Star,
  PlayCircle,
  Gamepad2,
  Heart,
  Zap
} from "lucide-react";

function HomePage() {
  const cards = [1, 2, 3, 4, 5, 6];

  return (
    <div className="min-h-screen bg-[#FFFDF5] text-slate-900 font-sans selection:bg-emerald-200">
      
      {/* ================= NAVIGATION ================= */}
      <nav className="flex justify-between items-center px-6 md:px-20 py-6 sticky top-0 bg-[#FFFDF5]/80 backdrop-blur-md z-50">
        <div className="text-3xl flex align-middle gap-2 font-black text-emerald-600 " style={{ fontFamily: '"Luckiest Guy", cursive' }}>
            <img className="w-15 invert" src="./OQ72.png" alt="" />
          OQULIX
        </div>
        
      </nav>

      {/* ================= HERO: THE ENCHANTED FOREST ================= */}
      <section className="relative px-6 md:px-20 py-20 overflow-hidden">
        {/* Background Decorative Blobs */}
        <div className="absolute top-[-10%] left-[-10%] w-96 h-96 bg-emerald-100 rounded-full blur-3xl opacity-50 -z-10" />
        <div className="absolute bottom-[10%] right-[-5%] w-80 h-80 bg-orange-100 rounded-full blur-3xl opacity-50 -z-10" />

        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            <div className="inline-flex items-center gap-2 bg-emerald-100 text-emerald-700 px-4 py-2 rounded-full text-sm font-bold uppercase tracking-wider">
              <Sparkles size={16} /> Magical Augmented Reality
            </div>
            
            <h1
              className="text-7xl md:text-8xl text-emerald-900 leading-[0.9]"
              style={{ fontFamily: '"Luckiest Guy", cursive' }}
            >
              Wild <span className="text-orange-500 italic text-6xl md:text-7xl block mt-2">Adventures</span> 
              In Your Living Room
            </h1>

            <p className="text-xl text-slate-600 leading-relaxed max-w-lg">
              Transform your floor into a safari. Oqulix uses cutting-edge AR to 
              bring 3D animals to life with just a simple card scan.
            </p>

            <div className="flex flex-col sm:flex-row gap-5">
              <a
                href="https://drive.google.com/uc?export=download&id=1e6KIiuRQL8Ia2z2AhJ2xb_iVwCCYq9U4"
                className="group relative bg-orange-500 text-white px-10 py-5 rounded-2xl font-bold text-lg flex items-center justify-center gap-3 shadow-[0_10px_0_rgb(194,103,13)] hover:translate-y-[2px] hover:shadow-[0_8px_0_rgb(194,103,13)] active:translate-y-[10px] active:shadow-none transition-all"
              >
                <Download size={22} />
                Install Free App
              </a>
              <button className="flex items-center justify-center gap-3 px-10 py-5 rounded-2xl font-bold text-slate-700 border-2 border-slate-200 hover:bg-white hover:border-emerald-400 transition-all">
                <PlayCircle size={22} className="text-emerald-500" />
                See the Magic
              </button>
            </div>

            {/* Social Proof Mini */}
            <div className="flex items-center gap-4 pt-4">
              {/* <div className="flex -space-x-3">
                {[1, 2, 3, 4].map(i => (
                  <div key={i} className="w-10 h-10 rounded-full border-4 border-[#FFFDF5] bg-slate-200 overflow-hidden">
                    <img src={`https://i.pravatar.cc/100?img=${i+10}`} alt="user" />
                  </div>
                ))}
              </div> */}
              {/* <p className="text-sm font-medium text-slate-500">
                <span className="text-slate-900 font-bold">10,000+</span> happy little explorers
              </p> */}
            </div>
          </div>

          <div className="relative">
            <div className="absolute -inset-4 bg-gradient-to-tr from-emerald-200 to-orange-200 rounded-[3rem] blur-2xl opacity-30 animate-pulse" />
            <div className="relative bg-white p-4 rounded-[3rem] shadow-2xl rotate-2 hover:rotate-0 transition-transform duration-500">
              <img
                src="./webbg.png"
                alt="App Interface"
                className="rounded-[2.2rem] w-full object-cover"
              />
              {/* Floating Badge */}
              <div className="absolute -bottom-6 -left-6 bg-white p-4 rounded-2xl shadow-xl flex items-center gap-3 animate-bounce">
                <div className="bg-emerald-500 p-2 rounded-lg text-white">
                  <Zap fill="white" size={20} />
                </div>
                <div className="pr-4">
                  <p className="text-xs text-slate-400 uppercase font-bold">Latency</p>
                  <p className="text-sm font-black text-slate-800">Ultra Fast AR</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ================= STATS BAR ================= */}
      <section className="bg-emerald-900 py-12">
        <div className="px-6 md:px-20 flex justify-center gap-35 text-center">
          {[
            { label: "Safe Score", val: "100%" },
            { label: "Rating", val: "4.9/5" },
          ].map((stat, i) => (
            <div key={i} className="text-white">
              <div className="text-3xl font-black text-orange-400">{stat.val}</div>
              <div className="text-emerald-300 text-sm uppercase tracking-widest font-bold">{stat.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ================= FEATURES: BENTO GRID STYLE ================= */}
      <section className="px-6 md:px-20 py-32">
        <div className="text-center mb-20">
          <h2 className="text-5xl text-emerald-900 mb-4" style={{ fontFamily: '"Luckiest Guy", cursive' }}>
            Built for Curious Minds
          </h2>
          <p className="text-slate-500 max-w-xl mx-auto">Modern learning doesn't happen in a book. It happens in the air, on the table, and in their imagination.</p>
        </div>

        <div className="grid md:grid-cols-12 gap-6">
          <div className="md:col-span-8 bg-emerald-50 p-10 rounded-[2.5rem] border border-emerald-100 flex flex-col justify-between group overflow-hidden relative">
            <div className="relative z-10">
              <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center text-emerald-600 shadow-sm mb-6 group-hover:scale-110 transition-transform">
                <Sparkles size={32} />
              </div>
              <h3 className="text-3xl font-bold text-emerald-900 mb-4">Hyper-Realistic 3D Models</h3>
              <p className="text-emerald-800/70 text-lg max-w-md">Our animals aren't just pictures. They breathe, roar, and move exactly like they do in the wild.</p>
            </div>
            <div className="absolute right-[-10%] bottom-[-10%] opacity-10 group-hover:rotate-12 transition-transform">
                <Gamepad2 size={300} />
            </div>
          </div>

          <div className="md:col-span-4 bg-orange-500 p-10 rounded-[2.5rem] text-white flex flex-col justify-center items-center text-center">
             <div className="w-20 h-20 bg-orange-400 rounded-full flex items-center justify-center mb-6">
                <Volume2 size={40} />
             </div>
             <h3 className="text-2xl font-bold mb-2">Phonetic Audio</h3>
             <p className="text-orange-100 text-sm">Every scan triggers clear, professional narration to help with pronunciation.</p>
          </div>

          <div className="md:col-span-4 bg-slate-900 p-10 rounded-[2.5rem] text-white">
             <ShieldCheck size={40} className="text-emerald-400 mb-6" />
             <h3 className="text-2xl font-bold mb-2">Privacy First</h3>
             <p className="text-slate-400 text-sm">No data tracking. No ads. Just pure learning.</p>
          </div>

          </div>
      </section>

      {/* ================= PRODUCT: THE GALLERY ================= */}
      <section className="px-6 md:px-20 py-24 bg-white rounded-[4rem] mx-4 shadow-sm border border-slate-100">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
          <div className="max-w-xl">
            <h2 className="text-5xl text-emerald-900 mb-4" style={{ fontFamily: '"Luckiest Guy", cursive' }}>
              The Collection
            </h2>
            <p className="text-slate-500">Collect all cards</p>
          </div>
         
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-6">
          {cards.map((card) => (
            <div key={card} className="group cursor-pointer">
              <div className="relative overflow-hidden rounded-2xl  bg-slate-100 mb-4">
                <img
                  src={`/${card}.jpg`}
                  alt={`Animal Card ${card}`}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-emerald-900/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-4">
                    {/* <span className="text-white font-bold text-sm">Scan to Play</span> */}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ================= TESTIMONIAL: FLOATING CARD ================= */}
      <section className="px-6 md:px-20 py-32 flex justify-center">
        <div className="relative w-full max-w-4xl">
          <div className="absolute -top-10 -left-10 text-emerald-100">
            <Heart size={160} fill="currentColor" />
          </div>
          <div className="relative bg-white border-2 border-emerald-50 p-10 md:p-20 rounded-[4rem] shadow-2xl shadow-emerald-100/50 text-center">
            <div className="flex justify-center gap-1 mb-8">
              {[1, 2, 3, 4, 5].map((s) => (
                <Star key={s} size={28} fill="#fb923c" className="text-orange-400" />
              ))}
            </div>
            <blockquote className="text-2xl md:text-3xl font-medium text-emerald-950 italic leading-snug">
              “Oqulix has completely changed how we spend our evenings. It’s the only 'screen time' I feel good about because my daughter is moving, speaking, and learning.”
            </blockquote>
            <div className="mt-10">
              <p className="font-black text-emerald-600 text-xl">Sarah Jenkins</p>
              <p className="text-slate-400 font-bold uppercase text-xs tracking-widest mt-1">Kindergarten Teacher & Mom</p>
            </div>
          </div>
        </div>
      </section>

      {/* ================= FINAL CTA: BUBBLE DESIGN ================= */}
      <section id="download" className="mx-6 md:mx-20 mb-20 bg-emerald-600 rounded-[3rem] p-12 md:p-24 text-center text-white relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
            <div className="absolute top-10 left-10 w-32 h-32 border-8 border-white rounded-full" />
            <div className="absolute bottom-20 right-20 w-64 h-64 border-[16px] border-white rounded-full" />
        </div>
        
        <h2 className="text-5xl md:text-7xl mb-8 relative z-10" style={{ fontFamily: '"Luckiest Guy", cursive' }}>
          Start Your <span className="text-orange-400">Safari</span> Today
        </h2>
        <p className="text-emerald-100 text-xl mb-12 max-w-2xl mx-auto relative z-10">
          The app is free to download. Start exploring now.
        </p>

        <div className="flex flex-col sm:flex-row justify-center gap-6 relative z-10">
          <a
            href="https://drive.google.com/uc?export=download&id=1e6KIiuRQL8Ia2z2AhJ2xb_iVwCCYq9U4"
            className="bg-white text-emerald-600 px-12 py-5 rounded-2xl text-xl font-black shadow-xl hover:scale-105 transition-transform flex items-center justify-center gap-3"
          >
            <Download />
            App Store
          </a>
          <a
            href="#"
            className="bg-emerald-900/40 backdrop-blur-md border-2 border-emerald-400/30 text-white px-12 py-5 rounded-2xl text-xl font-black hover:bg-emerald-800/60 transition-all flex items-center justify-center gap-3"
          >
            Get the Cards
          </a>
        </div>
      </section>

      {/* ================= FOOTER ================= */}
      <footer className="px-6 md:px-20 py-12 border-t border-slate-100">
        <div className="flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="text-2xl font-black text-emerald-600" style={{ fontFamily: '"Luckiest Guy", cursive' }}>
            OQULIX<span className="text-orange-500">.</span>
          </div>
          <div className="flex gap-8 text-slate-400 font-bold text-sm uppercase">
            <a href="#" className="hover:text-emerald-600 transition">Privacy</a>
            <a href="#" className="hover:text-emerald-600 transition">Support</a>
            <a href="#" className="hover:text-emerald-600 transition">Instagram</a>
          </div>
          <div className="text-slate-400 text-sm">
            © 2026 Oqulix Labs. <span className="text-orange-400">Stay Wild.</span>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default HomePage;