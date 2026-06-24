"use client";

import { 
  Camera, Cpu, Hand, Play, 
  Layers, Sliders, FileText, ShieldCheck, Zap
} from "lucide-react";
import { motion } from "framer-motion";

const STEPS = [
  {
    icon: Camera,
    title: "Capture Feed",
    description: "The application initializes your webcam stream completely client-side. No video data leaves your device."
  },
  {
    icon: Cpu,
    title: "Detect Hand",
    description: "MediaPipe HandLandmarker tracks 21 coordinates on your hand using hardware-accelerated WebAssembly."
  },
  {
    icon: Hand,
    title: "Rule Parsing",
    description: "Our algorithms evaluate finger joints angles and thumb positions to classify active gestures in real-time."
  },
  {
    icon: Play,
    title: "Control Slides",
    description: "Transitions are triggered via state hooks, applying slide navigation with a 1-second cooldown."
  }
];

const GESTURES = [
  {
    icon: Hand,
    title: "Open Palm",
    action: "Start / Reset",
    color: "violet",
    desc: "Extend all five fingers. This activates control mode and initializes slide 1."
  },
  {
    icon: Cpu,
    title: "Thumbs Up",
    action: "Next Slide",
    color: "indigo",
    desc: "Extend your thumb pointing upwards. Advances the deck to the next slide."
  },
  {
    icon: Layers,
    title: "Closed Fist",
    action: "Previous Slide",
    color: "fuchsia",
    desc: "Curl all fingers completely. Navigates back to the preceding slide."
  }
];

const FEATURES = [
  {
    icon: Zap,
    title: "Real-time Tracking",
    description: "Runs at up to 60fps inside the browser using WebGL and WASM compilation.",
    colSpan: "md:col-span-2 lg:col-span-1"
  },
  {
    icon: Sliders,
    title: "Intuitive Gestures",
    description: "Uses Thumbs Up, Fist, and Open Palm to map naturally to standard slide controllers.",
    colSpan: "md:col-span-2 lg:col-span-2"
  },
  {
    icon: FileText,
    title: "PDF Support",
    description: "Drag and drop any PDF presentation to control it directly with hand movements.",
    colSpan: "md:col-span-2 lg:col-span-2"
  },
  {
    icon: ShieldCheck,
    title: "100% Secure",
    description: "No servers, no telemetry, no image uploads. All intelligence happens on-device.",
    colSpan: "md:col-span-2 lg:col-span-1"
  }
];

export function AboutSection() {
  return (
    <section id="about-section" className="relative z-10 max-w-6xl mx-auto px-4 py-32 space-y-40">
      {/* 1. Timeline Section */}
      <div className="space-y-16">
        <div className="text-center md:text-left md:flex justify-between items-end">
          <div className="space-y-4 max-w-2xl">
            <h2 className="text-[10px] tracking-[0.3em] font-bold text-violet-400 uppercase">Architecture</h2>
            <h3 className="text-4xl md:text-6xl font-light tracking-tight text-white leading-tight">
              Zero-latency <strong className="font-bold">inference pipeline.</strong>
            </h3>
          </div>
          <p className="text-white/40 max-w-sm text-sm hidden md:block leading-relaxed">
            A look behind the curtain of our browser interface pipeline, executing entirely on the edge.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {STEPS.map((step, idx) => {
            const Icon = step.icon;
            return (
              <div
                key={idx}
                className="relative p-8 rounded-[2rem] bg-white/[0.02] border border-white/[0.03] backdrop-blur-2xl shadow-[inset_0_1px_0_rgba(255,255,255,0.05),0_20px_40px_rgba(0,0,0,0.2)] hover:bg-white/[0.04] transition-all group overflow-hidden"
              >
                {/* Massive background number */}
                <span className="absolute -top-10 -right-4 text-[150px] font-bold text-white/[0.02] group-hover:text-violet-500/[0.05] transition-colors pointer-events-none select-none">
                  {idx + 1}
                </span>

                <div className="relative z-10">
                  <div className="w-12 h-12 rounded-2xl bg-white/[0.02] border border-white/[0.1] flex items-center justify-center text-white/50 group-hover:text-violet-400 group-hover:border-violet-500/50 transition-all mb-8 shadow-[inset_0_1px_0_rgba(255,255,255,0.05)]">
                    <Icon className="w-5 h-5" />
                  </div>
                  <h4 className="text-xl font-bold text-white mb-3 tracking-tight">{step.title}</h4>
                  <p className="text-white/40 text-sm leading-relaxed">{step.description}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* 2. Supported Gestures */}
      <div className="space-y-16">
        <div className="text-center space-y-4">
          <h2 className="text-[10px] tracking-[0.3em] font-bold text-fuchsia-400 uppercase">Interaction Models</h2>
          <h3 className="text-4xl md:text-6xl font-light tracking-tight text-white leading-tight">
            Optimized <strong className="font-bold">postures.</strong>
          </h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {GESTURES.map((gest, idx) => {
            const Icon = gest.icon;
            // Define styling dynamically based on the color string
            const isViolet = gest.color === "violet";
            const isIndigo = gest.color === "indigo";
            
            const glowClass = isViolet ? "group-hover:shadow-[0_0_40px_rgba(139,92,246,0.15)]" : 
                              isIndigo ? "group-hover:shadow-[0_0_40px_rgba(99,102,241,0.15)]" : 
                              "group-hover:shadow-[0_0_40px_rgba(217,70,239,0.15)]";
                              
            const textClass = isViolet ? "text-violet-400" : isIndigo ? "text-indigo-400" : "text-fuchsia-400";
            const bgClass = isViolet ? "bg-violet-500/10 border-violet-500/20" : 
                            isIndigo ? "bg-indigo-500/10 border-indigo-500/20" : 
                            "bg-fuchsia-500/10 border-fuchsia-500/20";

            return (
              <div
                key={idx}
                className={`p-10 rounded-[2.5rem] bg-white/[0.01] border border-white/[0.05] backdrop-blur-2xl flex flex-col justify-between space-y-10 shadow-[inset_0_1px_0_rgba(255,255,255,0.02)] hover:bg-white/[0.03] transition-all group ${glowClass}`}
              >
                <div className="space-y-6">
                  <div className={`w-16 h-16 rounded-3xl flex items-center justify-center border shadow-[inset_0_1px_0_rgba(255,255,255,0.1)] transition-transform group-hover:scale-110 ${bgClass}`}>
                    <Icon className={`w-7 h-7 ${textClass}`} />
                  </div>
                  <div>
                    <h4 className="text-2xl font-bold text-white mb-2">{gest.title}</h4>
                    <p className={`text-[10px] font-bold uppercase tracking-[0.2em] ${textClass}`}>{gest.action}</p>
                  </div>
                  <p className="text-white/50 text-sm leading-relaxed">{gest.desc}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* 3. Core Features with Asymmetrical Grid */}
      <div id="features-section" className="space-y-16">
        <div className="text-center space-y-4">
          <h2 className="text-[10px] tracking-[0.3em] font-bold text-indigo-400 uppercase">Capabilities</h2>
          <h3 className="text-4xl md:text-6xl font-light tracking-tight text-white leading-tight">
            Engineered for <strong className="font-bold">performance.</strong>
          </h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {FEATURES.map((feat, idx) => {
            const Icon = feat.icon;
            return (
              <div
                key={idx}
                className={`p-8 rounded-[2rem] bg-white/[0.02] border border-white/[0.03] backdrop-blur-2xl flex flex-col md:flex-row items-start gap-6 shadow-[inset_0_1px_0_rgba(255,255,255,0.05)] hover:bg-white/[0.04] transition-all group ${feat.colSpan}`}
              >
                <div className="p-4 bg-white/[0.03] rounded-2xl border border-white/[0.05] text-white/50 group-hover:text-indigo-400 group-hover:border-indigo-500/30 transition-all shadow-[inset_0_1px_0_rgba(255,255,255,0.05)] flex-shrink-0">
                  <Icon className="w-6 h-6" />
                </div>
                <div className="space-y-3 mt-1">
                  <h4 className="text-xl font-bold text-white tracking-tight">{feat.title}</h4>
                  <p className="text-white/40 text-sm leading-relaxed">{feat.description}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
