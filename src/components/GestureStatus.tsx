"use client";

import { GestureType } from "@/types/gesture";
import { Hand, ThumbsUp, Grab, Minus } from "lucide-react";
import { motion } from "framer-motion";

interface GestureStatusProps {
  gesture: GestureType;
}

export function GestureStatus({ gesture }: GestureStatusProps) {
  const getGestureConfig = () => {
    switch (gesture) {
      case "open_palm":
        return { icon: Hand, label: "Open Palm", color: "text-violet-400", bg: "bg-violet-500/10", border: "border-violet-500/30", shadow: "shadow-[inset_0_1px_0_rgba(139,92,246,0.2),0_0_40px_rgba(139,92,246,0.3)]" };
      case "thumbs_up":
        return { icon: ThumbsUp, label: "Thumbs Up", color: "text-indigo-400", bg: "bg-indigo-500/10", border: "border-indigo-500/30", shadow: "shadow-[inset_0_1px_0_rgba(99,102,241,0.2),0_0_40px_rgba(99,102,241,0.3)]" };
      case "fist":
        return { icon: Grab, label: "Fist", color: "text-fuchsia-400", bg: "bg-fuchsia-500/10", border: "border-fuchsia-500/30", shadow: "shadow-[inset_0_1px_0_rgba(217,70,239,0.2),0_0_40px_rgba(217,70,239,0.3)]" };
      default:
        return { icon: Minus, label: "Scanning", color: "text-white/20", bg: "bg-white/[0.02]", border: "border-white/[0.05]", shadow: "shadow-[inset_0_1px_0_rgba(255,255,255,0.02)]" };
    }
  };

  const config = getGestureConfig();
  const Icon = config.icon;

  return (
    <div className="p-8 rounded-[2rem] bg-white/[0.01] border border-white/[0.05] backdrop-blur-3xl shadow-[inset_0_1px_0_rgba(255,255,255,0.05),0_20px_40px_rgba(0,0,0,0.5)] flex flex-col items-center justify-center gap-6 relative overflow-hidden">
      <div className="absolute top-0 w-full h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent" />
      <p className="text-[10px] text-white/40 font-bold tracking-[0.2em] uppercase">Status Feed</p>
      
      <motion.div 
        key={gesture}
        initial={{ scale: 0.8, opacity: 0, rotate: -10 }}
        animate={{ scale: 1, opacity: 1, rotate: 0 }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
        className={`w-24 h-24 rounded-full flex items-center justify-center ${config.bg} ${config.border} border backdrop-blur-md ${config.shadow}`}
      >
        <Icon className={`w-10 h-10 ${config.color} drop-shadow-lg`} />
      </motion.div>
      
      <h3 className={`text-xl font-bold ${config.color} tracking-tight uppercase`}>{config.label}</h3>
    </div>
  );
}
