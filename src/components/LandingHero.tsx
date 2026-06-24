"use client";

import { motion } from "framer-motion";
import { Play, Sparkles, Hand, ArrowRight, Layers, Box } from "lucide-react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

interface LandingHeroProps {
  onLaunch: (demoMode: boolean) => void;
}

export function LandingHero({ onLaunch }: LandingHeroProps) {
  const { data: session } = useSession();
  const router = useRouter();

  const handleLaunch = () => {
    if (session) {
      onLaunch(false);
    } else {
      router.push("/auth/signin");
    }
  };

  return (
    <section id="hero-section" className="relative min-h-screen flex flex-col items-center justify-center text-center px-4 overflow-hidden pt-32 pb-20">
      
      {/* Decorative floating grids - Dribbble Style */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff03_1px,transparent_1px),linear-gradient(to_bottom,#ffffff03_1px,transparent_1px)] bg-[size:60px_60px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] pointer-events-none" />

      {/* Floating abstract graphic representing 3D Depth */}
      <motion.div
        initial={{ opacity: 0, y: 50, rotateX: 20 }}
        animate={{ opacity: 1, y: 0, rotateX: 0 }}
        transition={{ duration: 1.2, ease: "easeOut" }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-[80vh] pointer-events-none z-0 opacity-40"
      >
        <div className="absolute inset-0 border-[0.5px] border-violet-500/10 rounded-full scale-[1.5] animate-[spin_60s_linear_infinite] shadow-[inset_0_0_100px_rgba(139,92,246,0.1)]" />
        <div className="absolute inset-10 border-[0.5px] border-fuchsia-500/10 rounded-full scale-[1.2] animate-[spin_40s_linear_infinite_reverse]" />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="relative z-10 max-w-5xl mx-auto flex flex-col items-center w-full"
      >
        {/* Futuristic badge */}
        <motion.div 
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="flex items-center gap-2 px-5 py-2 rounded-full bg-white/[0.02] border border-white/[0.05] text-violet-300 text-[10px] font-bold uppercase tracking-[0.25em] mb-10 backdrop-blur-xl shadow-[inset_0_1px_0_rgba(255,255,255,0.05)]"
        >
          <Sparkles className="w-3.5 h-3.5 text-fuchsia-400" />
          Powered by Edge WebAssembly
        </motion.div>

        {/* Massive Hero Title */}
        <h1 className="text-6xl md:text-8xl lg:text-[100px] font-extrabold tracking-tighter mb-8 leading-[0.95] text-white/90 drop-shadow-2xl">
          <span className="font-light block mb-2 text-white/70">PRESENT WITH</span>
          <span className="bg-gradient-to-br from-white via-violet-100 to-violet-400 bg-clip-text text-transparent">
            PURE GESTURE.
          </span>
        </h1>

        {/* Subtitle */}
        <p className="text-white/50 text-lg md:text-xl max-w-2xl mb-14 leading-relaxed font-light tracking-wide">
          Step away from your keyboard. GestureOS runs real-time edge AI to navigate slide decks and PDFs directly from your webcam. <strong className="text-violet-300 font-medium">Zero latency, fully secure.</strong>
        </p>

        {/* Action buttons */}
        <div className="flex flex-col sm:flex-row items-center gap-6 w-full sm:w-auto relative z-20">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
            onClick={handleLaunch}
            className="w-full sm:w-auto px-10 py-4 rounded-full bg-violet-600 text-white font-bold text-sm tracking-widest uppercase shadow-[0_0_40px_rgba(124,58,237,0.4),inset_0_1px_0_rgba(255,255,255,0.2)] hover:shadow-[0_0_60px_rgba(124,58,237,0.6)] transition-all flex items-center justify-center gap-3 cursor-pointer group"
          >
            <Hand className="w-4 h-4 text-fuchsia-200" />
            Launch Workspace
            <ArrowRight className="w-4 h-4 text-violet-200 transition-transform group-hover:translate-x-1" />
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => onLaunch(true)}
            className="w-full sm:w-auto px-10 py-4 rounded-full bg-white/[0.03] border border-white/[0.1] hover:bg-white/[0.08] text-white font-semibold text-sm tracking-widest uppercase transition-all flex items-center justify-center gap-3 cursor-pointer backdrop-blur-2xl shadow-[inset_0_1px_0_rgba(255,255,255,0.05)]"
          >
            <Play className="w-4 h-4 text-fuchsia-400" />
            Try Demo
          </motion.button>
        </div>
      </motion.div>

      {/* Floating Stats / Info Cards mimicking the Dribbble design composition */}
      <div className="absolute w-full h-full inset-0 pointer-events-none overflow-hidden z-10 hidden lg:block">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.6, duration: 1 }}
          className="absolute top-[30%] left-[10%] p-5 rounded-3xl bg-white/[0.02] border border-white/[0.05] backdrop-blur-3xl shadow-[0_20px_40px_rgba(0,0,0,0.5),inset_0_1px_0_rgba(255,255,255,0.05)] w-48 rotate-[-6deg]"
        >
          <div className="w-10 h-10 rounded-2xl bg-fuchsia-500/20 border border-fuchsia-500/30 flex items-center justify-center mb-4">
            <Layers className="w-5 h-5 text-fuchsia-400" />
          </div>
          <p className="text-3xl font-light text-white mb-1">60<span className="text-violet-400 font-bold">FPS</span></p>
          <p className="text-[10px] text-white/40 uppercase tracking-widest font-semibold">Tracking Speed</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.8, duration: 1 }}
          className="absolute top-[40%] right-[10%] p-5 rounded-3xl bg-white/[0.02] border border-white/[0.05] backdrop-blur-3xl shadow-[0_20px_40px_rgba(0,0,0,0.5),inset_0_1px_0_rgba(255,255,255,0.05)] w-56 rotate-[4deg]"
        >
          <div className="w-10 h-10 rounded-2xl bg-violet-500/20 border border-violet-500/30 flex items-center justify-center mb-4">
            <Box className="w-5 h-5 text-violet-400" />
          </div>
          <p className="text-3xl font-light text-white mb-1">21<span className="text-fuchsia-400 font-bold">+</span></p>
          <p className="text-[10px] text-white/40 uppercase tracking-widest font-semibold">Hand Landmarks</p>
        </motion.div>
      </div>

    </section>
  );
}
