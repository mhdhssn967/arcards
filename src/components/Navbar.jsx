import React, { useState } from "react";
import { Menu, X, Download, Sparkles } from "lucide-react";

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="fixed top-4 inset-x-0 z-[100] px-4 sm:px-4">
      {/* Main Navbar Container */}
      <div className="max-w-7xl mx-auto bg-white/80 backdrop-blur-lg border border-emerald-100 shadow-[0_8px_32px_rgba(5,150,105,0.15)] rounded-[2rem] px-5 py-1 transition-all duration-300">
        <div className="flex items-center justify-between">
          
          {/* ===== Logo Section ===== */}
          <div className="flex items-center gap-3 group cursor-pointer">
            <div className="relative">
              <div className="absolute -inset-1  rounded-xl blur opacity-25 group-hover:opacity-50 transition duration-300"></div>
              <div className="relative w-25 h-25  rounded-xl flex items-center justify-center overflow-hidden ">
                 <img
                  src="/OQ72.png"
                  alt="Oqulix Logo"
                  className="w-full h-full object-contain brightness-0 "
                />
              </div>
            </div>
            
          </div>

          {/* ===== Desktop Navigation ===== */}
          <div className="hidden md:flex items-center gap-8">
            {["Home", "Animals", "How it Works", "Parents"].map((item) => (
              <a
                key={item}
                href={`#${item.toLowerCase().replace(/\s+/g, "-")}`}
                className="text-sm font-bold text-slate-600 hover:text-emerald-600 transition-colors"
              >
                {item}
              </a>
            ))}
          </div>
          

          {/* ===== CTA Section ===== */}
          
        </div>

        {/* ===== Mobile Menu ===== */}
        <div className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${isOpen ? 'max-h-80 mt-4 pb-4' : 'max-h-0'}`}>
            
          <div className="flex flex-col gap-4 border-t border-emerald-50 pt-4">
            {["Home", "Animals", "How it Works", "Parents"].map((item) => (
              <a
                key={item}
                href={`#${item.toLowerCase()}`}
                className="text-lg font-bold text-slate-700 px-2"
                onClick={() => setIsOpen(false)}
              >
                {item}
              </a>
            ))}
            <a
              href="#"
              className="flex items-center justify-center gap-2 bg-emerald-600 text-white py-4 rounded-2xl font-black shadow-lg"
            >
              <Sparkles size={20} />
              GET THE APP
            </a>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;