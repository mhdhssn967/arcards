import React, { useState } from "react";
import { Menu, X, Download, Sparkles } from "lucide-react";

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
   <nav className="flex justify-between items-center px-6 md:px-20 py-6 sticky top-0 bg-[#FFFDF5]/80 backdrop-blur-md z-50">
        <div className="text-3xl flex align-middle gap-2 font-black text-emerald-600 " style={{ fontFamily: '"Luckiest Guy", cursive' }}>
            <img className="w-15 invert" src="./OQ72.png" alt="" />
          OQULIX
        </div>
        
      </nav>
  );
}

export default Navbar;