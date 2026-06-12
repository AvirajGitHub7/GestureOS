"use client";

import { 
  Camera, Cpu, Hand, Play, 
  Layers, Sliders, FileText, ShieldCheck, Zap
} from "lucide-react";

const STEPS = [
  {
    icon: Camera,
    title: "1. Capture Feed",
    description: "The application initializes your webcam stream completely client-side. No video data leaves your device."
  },
  {
    icon: Cpu,
    title: "2. Detect Hand",
    description: "MediaPipe HandLandmarker tracks 21 coordinates on your hand using hardware-accelerated WebAssembly."
  },
  {
    icon: Hand,
    title: "3. Rule Parsing",
    description: "Our algorithms evaluate finger joints angles and thumb positions to classify active gestures in real-time."
  },
  {
    icon: Play,
    title: "4. Control Slides",
    description: "Transitions are triggered via state hooks, applying slide navigation with a 1-second cooldown."
  }
];

const GESTURES = [
  {
    icon: Hand,
    title: "Open Palm",
    action: "Start / Reset Presentation",
    color: "border-emerald-500/20 text-emerald-400 bg-emerald-500/5",
    desc: "Extend all five fingers. This activates control mode and initializes slide 1."
  },
  {
    icon: Cpu,
    title: "Thumbs Up",
    action: "Next Slide (Go Forward)",
    color: "border-blue-500/20 text-blue-400 bg-blue-500/5",
    desc: "Extend your thumb pointing upwards. Advances the deck to the next slide."
  },
  {
    icon: Layers,
    title: "Closed Fist",
    action: "Previous Slide (Go Backward)",
    color: "border-rose-500/20 text-rose-400 bg-rose-500/5",
    desc: "Curl all fingers completely. Navigates back to the preceding slide."
  }
];

const FEATURES = [
  {
    icon: Zap,
    title: "Real-time Tracking",
    description: "Runs at up to 60fps inside the browser using WebGL and WASM compilation."
  },
  {
    icon: Sliders,
    title: "Intuitive Gestures",
    description: "Uses Thumbs Up, Fist, and Open Palm to map naturally to standard slide controllers."
  },
  {
    icon: FileText,
    title: "PDF Presentation Support",
    description: "Drag and drop any PDF presentation to control it directly with hand movements."
  },
  {
    icon: ShieldCheck,
    title: "100% Privacy Secure",
    description: "No servers, no telemetry, no image uploads. All intelligence happens on-device."
  }
];

export function AboutSection() {
  return (
    <section id="about-section" className="relative z-10 max-w-6xl mx-auto px-4 py-24 space-y-32">
      {/* 1. Timeline Section */}
      <div className="space-y-16">
        <div className="text-center space-y-4">
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight">How GestureOS Works</h2>
          <p className="text-gray-400 max-w-xl mx-auto">
            A look behind the curtain of our zero-latency browser interface pipeline.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 relative">
          {STEPS.map((step, idx) => {
            const Icon = step.icon;
            return (
              <div
                key={idx}
                className="p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md shadow-lg flex flex-col items-center text-center space-y-4"
              >
                <div className="w-12 h-12 rounded-full bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400">
                  <Icon className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold text-white">{step.title}</h3>
                <p className="text-gray-400 text-sm leading-relaxed">{step.description}</p>
              </div>
            );
          })}
        </div>
      </div>

      {/* 2. Supported Gestures */}
      <div className="space-y-16">
        <div className="text-center space-y-4">
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight">Interactive Gestures</h2>
          <p className="text-gray-400 max-w-xl mx-auto">
            Three core postures optimized to prevent false triggers.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {GESTURES.map((gest, idx) => {
            const Icon = gest.icon;
            return (
              <div
                key={idx}
                className={`p-8 rounded-2xl border flex flex-col justify-between space-y-6 shadow-xl ${gest.color}`}
              >
                <div className="space-y-4">
                  <div className="w-14 h-14 rounded-full bg-white/5 border border-white/10 flex items-center justify-center">
                    <Icon className="w-7 h-7" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white mb-1">{gest.title}</h3>
                    <p className="text-xs font-mono uppercase tracking-wider opacity-80">{gest.action}</p>
                  </div>
                  <p className="text-gray-400 text-sm leading-relaxed">{gest.desc}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* 3. Core Features */}
      <div className="space-y-16">
        <div className="text-center space-y-4">
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight">Key Capabilities</h2>
          <p className="text-gray-400 max-w-xl mx-auto font-light">
            Engineered for seamless user experience, performance, and accessibility.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {FEATURES.map((feat, idx) => {
            const Icon = feat.icon;
            return (
              <div
                key={idx}
                className="p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md flex items-start gap-5 shadow-lg"
              >
                <div className="p-3 bg-emerald-500/10 rounded-xl border border-emerald-500/20 text-emerald-400 flex-shrink-0">
                  <Icon className="w-6 h-6" />
                </div>
                <div className="space-y-1">
                  <h3 className="text-lg font-bold text-white">{feat.title}</h3>
                  <p className="text-gray-400 text-sm leading-relaxed">{feat.description}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
