"use client";

import { motion } from "framer-motion";
import { Play, Sparkles, Hand, Cpu, ArrowRight } from "lucide-react";

interface LandingHeroProps {
  onLaunch: (demoMode: boolean) => void;
}

export function LandingHero({ onLaunch }: LandingHeroProps) {
  return (
    <section id="hero-section" className="relative min-h-screen flex flex-col items-center justify-center text-center px-4 overflow-hidden pt-28 pb-20">
      {/* Ambient background glows */}
      <div className="absolute top-1/4 left-1/4 w-[400px] h-[400px] bg-emerald-500/10 rounded-full blur-[120px] pointer-events-none animate-pulse" />
      <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-teal-500/10 rounded-full blur-[150px] pointer-events-none animate-pulse duration-5000" />
      
      {/* Decorative floating grids */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff03_1px,transparent_1px),linear-gradient(to_bottom,#ffffff03_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] pointer-events-none" />

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="relative z-10 max-w-4xl mx-auto flex flex-col items-center"
      >
        {/* Futuristic badge */}
        <motion.div 
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-semibold uppercase tracking-wider mb-8 backdrop-blur-md shadow-[0_0_15px_rgba(16,185,129,0.1)]"
        >
          <Sparkles className="w-3.5 h-3.5" />
          WebAssembly & Computer Vision Powered
        </motion.div>

        {/* Hero title */}
        <h1 className="text-5xl md:text-7xl lg:text-8xl font-extrabold tracking-tight mb-8 leading-tight">
          Control Presentations with
          <span className="block mt-2 bg-gradient-to-r from-emerald-400 via-teal-300 to-cyan-400 bg-clip-text text-transparent drop-shadow-sm">
            Hand Gestures.
          </span>
        </h1>

        {/* Subtitle */}
        <p className="text-gray-400 text-lg md:text-xl max-w-2xl mb-12 leading-relaxed font-light">
          Step away from your keyboard. GestureOS runs real-time edge AI to navigate slide decks and PDFs directly from your webcam. 100% secure and client-side.
        </p>

        {/* Action buttons */}
        <div className="flex flex-col sm:flex-row items-center gap-5 w-full sm:w-auto">
          <motion.button
            whileHover={{ scale: 1.03, y: -2 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => onLaunch(false)}
            className="w-full sm:w-auto px-8 py-4 rounded-xl bg-emerald-500 text-black font-semibold text-base shadow-[0_0_30px_rgba(16,185,129,0.3)] hover:shadow-[0_0_40px_rgba(16,185,129,0.5)] transition-all flex items-center justify-center gap-3 cursor-pointer group"
          >
            <Hand className="w-5 h-5 text-black" />
            Launch GestureOS
            <ArrowRight className="w-4 h-4 text-black transition-transform group-hover:translate-x-1" />
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.03, y: -2 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => onLaunch(true)}
            className="w-full sm:w-auto px-8 py-4 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 text-white font-medium text-base transition-all flex items-center justify-center gap-2 cursor-pointer backdrop-blur-md"
          >
            <Play className="w-4 h-4 text-emerald-400" />
            Try Demo Mode
          </motion.button>

          <motion.a
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.03, y: -2 }}
            whileTap={{ scale: 0.98 }}
            className="w-full sm:w-auto px-6 py-4 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 text-gray-300 font-medium text-base transition-all flex items-center justify-center gap-2 cursor-pointer backdrop-blur-md"
          >
            <svg className="w-4 h-4 fill-current text-white" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
            </svg>
            Source Code
          </motion.a>
        </div>
      </motion.div>

      {/* Floating abstract graphic representing hand/scan */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.4, duration: 1 }}
        className="relative w-72 h-72 mt-16 rounded-full border border-white/5 flex items-center justify-center bg-radial from-emerald-500/5 to-transparent shadow-[0_0_50px_rgba(0,0,0,0.5)]"
      >
        <div className="absolute inset-4 rounded-full border border-emerald-500/10 border-dashed animate-spin duration-10000" />
        <div className="absolute inset-10 rounded-full bg-emerald-500/5 backdrop-blur-md flex items-center justify-center border border-emerald-500/20">
          <Cpu className="w-12 h-12 text-emerald-400/80 animate-pulse" />
        </div>
      </motion.div>
    </section>
  );
}
