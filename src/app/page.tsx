"use client";

import { useState, useCallback } from "react";
import { LandingHero } from "@/components/LandingHero";
import { AboutSection } from "@/components/AboutSection";
import { Navbar } from "@/components/Navbar";
import { WebcamFeed } from "@/components/WebcamFeed";
import { SlideViewer } from "@/components/SlideViewer";
import { GestureStatus } from "@/components/GestureStatus";
import { PDFUploader } from "@/components/PDFUploader";
import { usePresentation } from "@/hooks/usePresentation";
import { detectGesture } from "@/utils/gestureDetection";
import { NormalizedLandmark } from "@mediapipe/tasks-vision";
import { GestureType, Slide } from "@/types/gesture";
import { ArrowLeft, Sparkles } from "lucide-react";

export default function Home() {
  const [viewMode, setViewMode] = useState<"landing" | "app">("landing");
  const [currentGesture, setCurrentGesture] = useState<GestureType>("none");
  const [isCustomDeck, setIsCustomDeck] = useState(false);

  const {
    state,
    handleGesture,
    setCustomSlides,
    resetToDefault,
    startPresentation,
    stopPresentation
  } = usePresentation();

  // Launching the presentation workspace
  const handleLaunch = (demoMode: boolean) => {
    if (demoMode) {
      resetToDefault();
      setIsCustomDeck(false);
      startPresentation();
    } else {
      // Start in a clean/paused state where they can upload a PDF or choose a demo
      resetToDefault();
      setIsCustomDeck(false);
      stopPresentation();
    }
    setViewMode("app");
  };

  const handleSlidesLoaded = (slides: Slide[]) => {
    setCustomSlides(slides);
    setIsCustomDeck(true);
    startPresentation(); // Auto-start once custom PDF is loaded
  };

  const handleResetToDefault = () => {
    resetToDefault();
    setIsCustomDeck(false);
    startPresentation();
  };

  const onLandmarks = useCallback((landmarks: NormalizedLandmark[]) => {
    const detected = detectGesture(landmarks);
    setCurrentGesture(detected);
    handleGesture(detected);
  }, [handleGesture]);

  return (
    <div className="min-h-screen bg-[#070213] text-white overflow-x-hidden relative selection:bg-violet-500/30 selection:text-violet-200 font-sans">
      
      {/* Dynamic Ambient Background Lighting */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
        <div className="absolute -top-[20%] -left-[10%] w-[70vw] h-[70vw] bg-violet-600/10 rounded-full blur-[150px] mix-blend-screen" />
        <div className="absolute top-[40%] -right-[20%] w-[60vw] h-[60vw] bg-fuchsia-600/10 rounded-full blur-[150px] mix-blend-screen" />
        <div className="absolute -bottom-[20%] left-[20%] w-[80vw] h-[80vw] bg-indigo-600/10 rounded-full blur-[150px] mix-blend-screen" />
        {/* Subtle grid pattern with mask */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff02_1px,transparent_1px),linear-gradient(to_bottom,#ffffff02_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_80%_80%_at_50%_50%,#000_40%,transparent_100%)]" />
      </div>
      
      {viewMode === "landing" ? (
        /* Landing Screen */
        <div className="w-full relative z-10">
          <Navbar onLaunch={handleLaunch} />
          <LandingHero onLaunch={handleLaunch} />
          <AboutSection />
        </div>
      ) : (
        /* Presentation Workspace App Screen */
        <div className="w-full max-w-[1400px] mx-auto px-4 md:px-8 py-8 relative z-10 flex flex-col min-h-screen">
          {/* Header */}
          <header className="mb-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 z-20">
            <div className="flex items-center gap-4">
              <button
                onClick={() => setViewMode("landing")}
                className="p-3 rounded-2xl bg-white/[0.02] border border-white/[0.05] shadow-[inset_0_1px_0_rgba(255,255,255,0.05)] hover:bg-white/[0.04] transition-all flex items-center justify-center cursor-pointer group backdrop-blur-xl"
              >
                <ArrowLeft className="w-5 h-5 text-violet-300/70 group-hover:text-white group-hover:-translate-x-1 transition-transform" />
              </button>
              <div>
                <div className="flex items-center gap-3">
                  <span className="text-2xl font-bold bg-gradient-to-r from-violet-400 via-fuchsia-400 to-indigo-400 bg-clip-text text-transparent tracking-tight">
                    GestureOS
                  </span>
                  <span className="px-2.5 py-1 text-[10px] tracking-[0.2em] font-semibold uppercase bg-white/[0.03] border border-white/[0.05] text-violet-200/80 rounded-md shadow-[inset_0_1px_0_rgba(255,255,255,0.05)]">
                    Workspace
                  </span>
                </div>
                <p className="text-[13px] text-white/40 mt-1 font-medium tracking-wide">
                  {isCustomDeck ? "Custom Deck Active" : "Demo Mode Active"}
                </p>
              </div>
            </div>

            {/* Status indicator */}
            <div className="flex items-center gap-3 bg-white/[0.02] border border-white/[0.05] shadow-[inset_0_1px_0_rgba(255,255,255,0.05)] px-5 py-3 rounded-2xl backdrop-blur-xl">
              <div className={`w-2.5 h-2.5 rounded-full ${state.isRunning ? 'bg-violet-500 animate-pulse shadow-[0_0_15px_rgba(139,92,246,0.8)]' : 'bg-white/20'}`} />
              <span className="text-[11px] font-bold text-white/80 uppercase tracking-[0.15em]">
                {state.isRunning ? "Control Active" : "Controls Paused"}
              </span>
            </div>
          </header>

          {/* Layout Grid */}
          <div className="flex-1 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start pb-10">
            {/* Left Control Workspace */}
            <div className="lg:col-span-4 flex flex-col gap-6 sticky top-8">
              <WebcamFeed onLandmarks={onLandmarks} />
              
              <GestureStatus gesture={currentGesture} />
              
              <PDFUploader onSlidesLoaded={handleSlidesLoaded} />
              
              {/* Gesture Map Guidelines */}
              <div className="p-6 rounded-3xl bg-white/[0.01] border border-white/[0.03] backdrop-blur-2xl shadow-[inset_0_1px_0_rgba(255,255,255,0.02),0_20px_40px_rgba(0,0,0,0.4)] space-y-5">
                <h3 className="text-[10px] font-bold text-violet-300/80 tracking-[0.2em] uppercase flex items-center gap-2">
                  <Sparkles className="w-3.5 h-3.5 text-violet-400" />
                  Reference Map
                </h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-3 rounded-2xl bg-white/[0.02] border border-white/[0.03] hover:bg-white/[0.04] transition-colors group">
                    <span className="text-sm text-white/60 font-medium group-hover:text-white/90 transition-colors">Launch / Play</span>
                    <span className="text-[11px] tracking-wider font-semibold bg-violet-500/10 border border-violet-500/20 text-violet-300 px-3 py-1.5 rounded-xl shadow-[inset_0_1px_0_rgba(139,92,246,0.2)]">
                      Open Palm
                    </span>
                  </div>
                  <div className="flex items-center justify-between p-3 rounded-2xl bg-white/[0.02] border border-white/[0.03] hover:bg-white/[0.04] transition-colors group">
                    <span className="text-sm text-white/60 font-medium group-hover:text-white/90 transition-colors">Next Slide</span>
                    <span className="text-[11px] tracking-wider font-semibold bg-indigo-500/10 border border-indigo-500/20 text-indigo-300 px-3 py-1.5 rounded-xl shadow-[inset_0_1px_0_rgba(99,102,241,0.2)]">
                      Thumbs Up
                    </span>
                  </div>
                  <div className="flex items-center justify-between p-3 rounded-2xl bg-white/[0.02] border border-white/[0.03] hover:bg-white/[0.04] transition-colors group">
                    <span className="text-sm text-white/60 font-medium group-hover:text-white/90 transition-colors">Previous Slide</span>
                    <span className="text-[11px] tracking-wider font-semibold bg-fuchsia-500/10 border border-fuchsia-500/20 text-fuchsia-300 px-3 py-1.5 rounded-xl shadow-[inset_0_1px_0_rgba(217,70,239,0.2)]">
                      Fist
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Slide Viewer */}
            <div className="lg:col-span-8 flex flex-col h-[60vh] lg:h-[85vh] min-h-[600px] z-10">
              <SlideViewer
                slides={state.slides}
                currentSlide={state.currentSlide}
                isRunning={state.isRunning}
                onTogglePlay={() => {
                  if (state.isRunning) stopPresentation();
                  else startPresentation();
                }}
                activeGesture={currentGesture}
                onReset={handleResetToDefault}
                isCustomDeck={isCustomDeck}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
