"use client";

import { useState } from "react";
import { Hand, Menu, X } from "lucide-react";

interface NavbarProps {
  onLaunch: (demoMode: boolean) => void;
}

export function Navbar({ onLaunch }: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false);

  const scrollToSection = (id: string) => {
    setIsOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  const scrollToTop = () => {
    setIsOpen(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-[#060608]/80 backdrop-blur-md border-b border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <div className="flex items-center gap-2 cursor-pointer" onClick={scrollToTop}>
            <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center">
              <Hand className="w-5 h-5 text-emerald-400" />
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-emerald-400 to-teal-500 bg-clip-text text-transparent">
              GestureOS
            </span>
          </div>

          {/* Desktop Navigation Links */}
          <div className="hidden md:flex items-center gap-8">
            <button 
              onClick={scrollToTop}
              className="text-sm font-medium text-gray-400 hover:text-white transition-colors cursor-pointer"
            >
              Home
            </button>
            <button 
              onClick={() => scrollToSection("about-section")}
              className="text-sm font-medium text-gray-400 hover:text-white transition-colors cursor-pointer"
            >
              About
            </button>
            <button
              onClick={() => onLaunch(false)}
              className="px-5 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-black font-semibold text-sm transition-all shadow-[0_0_20px_rgba(16,185,129,0.2)] hover:shadow-[0_0_25px_rgba(16,185,129,0.4)] cursor-pointer"
            >
              Let's Start
            </button>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 rounded-xl bg-white/5 border border-white/10 text-gray-400 hover:text-white focus:outline-none cursor-pointer"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden border-t border-white/5 bg-[#060608]/95 backdrop-blur-lg px-4 pt-2 pb-6 space-y-3">
          <button
            onClick={scrollToTop}
            className="block w-full text-left px-4 py-2.5 text-base font-medium text-gray-400 hover:text-white hover:bg-white/5 rounded-xl transition-all cursor-pointer"
          >
            Home
          </button>
          <button
            onClick={() => scrollToSection("about-section")}
            className="block w-full text-left px-4 py-2.5 text-base font-medium text-gray-400 hover:text-white hover:bg-white/5 rounded-xl transition-all cursor-pointer"
          >
            About
          </button>
          <div className="pt-2 px-4">
            <button
              onClick={() => {
                setIsOpen(false);
                onLaunch(false);
              }}
              className="block w-full text-center px-5 py-3 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-black font-semibold text-base transition-all shadow-[0_0_20px_rgba(16,185,129,0.2)] cursor-pointer"
            >
              Let's Start
            </button>
          </div>
        </div>
      )}
    </nav>
  );
}
