"use client";

import { useState, useEffect } from "react";
import { Menu, X, ArrowRight, LogOut, User as UserIcon } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useSession, signOut } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Logo } from "./Logo";

interface NavbarProps {
  onLaunch: (demoMode: boolean) => void;
}

export function Navbar({ onLaunch }: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { data: session } = useSession();
  const router = useRouter();

  const handleLaunch = () => {
    setIsOpen(false);
    if (session) {
      onLaunch(false);
    } else {
      router.push("/auth/signin");
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

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
    <motion.nav 
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${scrolled ? "py-4" : "py-6"}`}
    >
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className={`flex items-center justify-between transition-all duration-500 ${scrolled ? "bg-white/[0.02] border border-white/[0.05] shadow-[0_20px_40px_rgba(0,0,0,0.5),inset_0_1px_0_rgba(255,255,255,0.05)] backdrop-blur-3xl rounded-full px-6 py-3" : "bg-transparent px-2"}`}>
          
          {/* Logo */}
          <div className="flex items-center gap-3 cursor-pointer group" onClick={scrollToTop}>
            <div className="w-10 h-10 rounded-2xl bg-white/[0.02] border border-white/[0.05] flex items-center justify-center group-hover:bg-white/[0.05] transition-colors shadow-[inset_0_1px_0_rgba(255,255,255,0.05)]">
              <Logo className="w-6 h-6 group-hover:scale-110 transition-transform" />
            </div>
            <span className="text-xl font-extrabold text-white tracking-tight">
              Gesture<span className="text-violet-400 font-light">OS</span>
            </span>
          </div>

          {/* Desktop Navigation Links */}
          <div className="hidden md:flex items-center gap-8 bg-white/[0.01] border border-white/[0.03] px-8 py-2 rounded-full backdrop-blur-md">
            <button 
              onClick={scrollToTop}
              className="text-[11px] uppercase tracking-[0.2em] font-semibold text-white/50 hover:text-white transition-colors cursor-pointer"
            >
              Home
            </button>
            <button 
              onClick={() => scrollToSection("about-section")}
              className="text-[11px] uppercase tracking-[0.2em] font-semibold text-white/50 hover:text-white transition-colors cursor-pointer"
            >
              How It Works
            </button>
            <button 
              onClick={() => scrollToSection("features-section")}
              className="text-[11px] uppercase tracking-[0.2em] font-semibold text-white/50 hover:text-white transition-colors cursor-pointer"
            >
              Features
            </button>
          </div>

          {/* CTA */}
          <div className="hidden md:flex items-center gap-4">
            {session ? (
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2 bg-white/[0.02] border border-white/[0.05] rounded-full pl-2 pr-4 py-1.5 shadow-[inset_0_1px_0_rgba(255,255,255,0.05)]">
                  {session.user?.image ? (
                    <img src={session.user.image} alt="User" className="w-6 h-6 rounded-full" referrerPolicy="no-referrer" />
                  ) : (
                    <div className="w-6 h-6 rounded-full bg-violet-500/20 flex items-center justify-center">
                      <UserIcon className="w-3 h-3 text-violet-400" />
                    </div>
                  )}
                  <span className="text-[11px] font-bold text-white tracking-widest uppercase">{session.user?.name?.split(' ')[0]}</span>
                </div>
                <button
                  onClick={() => signOut()}
                  className="p-2 rounded-full bg-white/[0.02] hover:bg-white/[0.05] border border-white/[0.05] hover:border-white/[0.1] text-white/50 hover:text-rose-400 transition-colors shadow-[inset_0_1px_0_rgba(255,255,255,0.02)] cursor-pointer"
                  title="Sign Out"
                >
                  <LogOut className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <Link
                href="/auth/signin"
                className="text-[11px] font-bold text-white/70 hover:text-white uppercase tracking-widest transition-colors mr-2 cursor-pointer"
              >
                Sign In
              </Link>
            )}

            <button
              onClick={handleLaunch}
              className="px-6 py-2.5 rounded-full bg-violet-600 hover:bg-violet-500 text-white font-bold text-[11px] uppercase tracking-[0.15em] transition-all shadow-[0_0_20px_rgba(124,58,237,0.3),inset_0_1px_0_rgba(255,255,255,0.2)] hover:shadow-[0_0_30px_rgba(124,58,237,0.5)] cursor-pointer flex items-center gap-2"
            >
              Start App <ArrowRight className="w-3 h-3" />
            </button>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2.5 rounded-full bg-white/[0.05] border border-white/[0.1] text-white/80 hover:text-white focus:outline-none cursor-pointer backdrop-blur-md"
            >
              {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="md:hidden absolute top-24 left-4 right-4 bg-[#0a0518]/95 border border-white/[0.05] shadow-2xl backdrop-blur-3xl rounded-3xl p-6 space-y-4"
          >
            <button
              onClick={scrollToTop}
              className="block w-full text-left px-4 py-3 text-sm tracking-widest uppercase font-semibold text-white/60 hover:text-white hover:bg-white/[0.03] rounded-2xl transition-all cursor-pointer"
            >
              Home
            </button>
            <button
              onClick={() => scrollToSection("about-section")}
              className="block w-full text-left px-4 py-3 text-sm tracking-widest uppercase font-semibold text-white/60 hover:text-white hover:bg-white/[0.03] rounded-2xl transition-all cursor-pointer"
            >
              How It Works
            </button>
            <div className="pt-4 mt-2 border-t border-white/[0.05] space-y-3">
              {session ? (
                <div className="flex items-center justify-between px-4 py-3 bg-white/[0.02] rounded-2xl border border-white/[0.05]">
                  <div className="flex items-center gap-3">
                    {session.user?.image ? (
                      <img src={session.user.image} alt="User" className="w-8 h-8 rounded-full" referrerPolicy="no-referrer" />
                    ) : (
                      <div className="w-8 h-8 rounded-full bg-violet-500/20 flex items-center justify-center">
                        <UserIcon className="w-4 h-4 text-violet-400" />
                      </div>
                    )}
                    <span className="text-sm font-bold text-white">{session.user?.name}</span>
                  </div>
                  <button onClick={() => signOut()} className="p-2 text-white/50 hover:text-rose-400">
                    <LogOut className="w-5 h-5" />
                  </button>
                </div>
              ) : (
                <Link
                  href="/auth/signin"
                  onClick={() => setIsOpen(false)}
                  className="block w-full text-center px-4 py-3 text-sm tracking-widest uppercase font-semibold text-white/70 hover:text-white hover:bg-white/[0.03] rounded-2xl transition-all cursor-pointer border border-white/[0.05]"
                >
                  Sign In
                </Link>
              )}

              <button
                onClick={handleLaunch}
                className="block w-full text-center px-6 py-4 rounded-2xl bg-violet-600 hover:bg-violet-500 text-white font-bold text-xs uppercase tracking-widest transition-all shadow-[0_0_20px_rgba(124,58,237,0.3)] cursor-pointer"
              >
                Start App
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
