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
        return { icon: Hand, label: "Open Palm", color: "text-emerald-400", bg: "bg-emerald-500/20", border: "border-emerald-500/30" };
      case "thumbs_up":
        return { icon: ThumbsUp, label: "Thumbs Up", color: "text-blue-400", bg: "bg-blue-500/20", border: "border-blue-500/30" };
      case "fist":
        return { icon: Grab, label: "Fist", color: "text-rose-400", bg: "bg-rose-500/20", border: "border-rose-500/30" };
      default:
        return { icon: Minus, label: "None", color: "text-gray-500", bg: "bg-gray-800/50", border: "border-white/5" };
    }
  };

  const config = getGestureConfig();
  const Icon = config.icon;

  return (
    <div className="p-6 rounded-2xl bg-black/40 border border-white/10 backdrop-blur-xl shadow-2xl flex flex-col items-center justify-center gap-4">
      <p className="text-gray-400 text-sm font-medium tracking-widest uppercase">Detected Gesture</p>
      <motion.div 
        key={gesture}
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className={`w-20 h-20 rounded-full flex items-center justify-center ${config.bg} ${config.border} border shadow-lg`}
      >
        <Icon className={`w-10 h-10 ${config.color}`} />
      </motion.div>
      <h3 className={`text-xl font-bold ${config.color} tracking-wide`}>{config.label}</h3>
    </div>
  );
}
