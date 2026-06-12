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
    <div className="min-h-screen bg-[#060608] text-white overflow-x-hidden relative selection:bg-emerald-500/30 selection:text-emerald-200">
      {/* Decorative background grid and lighting */}
      <div className="fixed inset-0 bg-[linear-gradient(to_right,#ffffff02_1px,transparent_1px),linear-gradient(to_bottom,#ffffff02_1px,transparent_1px)] bg-[size:50px_50px] pointer-events-none" />
      
      {viewMode === "landing" ? (
        /* Landing Screen */
        <div className="w-full relative z-10">
          <Navbar onLaunch={handleLaunch} />
          <LandingHero onLaunch={handleLaunch} />
          <AboutSection />
        </div>
      ) : (
        /* Presentation Workspace App Screen */
        <div className="w-full max-w-7xl mx-auto px-4 md:px-8 py-8 relative z-10 flex flex-col min-h-screen">
          {/* Header */}
          <header className="mb-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-white/5 pb-6">
            <div className="flex items-center gap-4">
              <button
                onClick={() => setViewMode("landing")}
                className="p-2 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 hover:border-white/20 transition-all flex items-center justify-center cursor-pointer group"
              >
                <ArrowLeft className="w-5 h-5 text-gray-400 group-hover:text-white group-hover:-translate-x-0.5 transition-transform" />
              </button>
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-2xl font-bold bg-gradient-to-r from-emerald-400 to-teal-500 bg-clip-text text-transparent">
                    GestureOS
                  </span>
                  <span className="px-2 py-0.5 text-[9px] font-mono uppercase bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 rounded-md">
                    Workspace
                  </span>
                </div>
                <p className="text-xs text-gray-400 mt-0.5">
                  {isCustomDeck ? "Custom PDF Mode" : "Demo Mode"}
                </p>
              </div>
            </div>

            {/* Status indicator */}
            <div className="flex items-center gap-3 bg-white/5 px-4 py-2.5 rounded-full border border-white/10 backdrop-blur-md">
              <div className={`w-2.5 h-2.5 rounded-full ${state.isRunning ? 'bg-emerald-500 animate-pulse shadow-[0_0_10px_#10b981]' : 'bg-rose-500'}`} />
              <span className="text-xs font-semibold text-gray-300 uppercase tracking-wider">
                {state.isRunning ? "Active Control" : "Controls Paused"}
              </span>
            </div>
          </header>

          {/* Layout Grid */}
          <div className="flex-1 grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch pb-10">
            {/* Left Control Workspace (Webcam, Gestures, PDF Uploader) */}
            <div className="lg:col-span-4 flex flex-col gap-6">
              <WebcamFeed onLandmarks={onLandmarks} />
              
              <GestureStatus gesture={currentGesture} />
              
              <PDFUploader onSlidesLoaded={handleSlidesLoaded} />
              
              {/* Gesture Map Guidelines */}
              <div className="p-6 rounded-2xl bg-black/40 border border-white/10 backdrop-blur-xl shadow-2xl space-y-4">
                <h3 className="text-xs font-semibold text-gray-300 tracking-widest uppercase flex items-center gap-2">
                  <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
                  Gesture Reference Map
                </h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-2.5 rounded-xl bg-white/[0.02] border border-white/5 hover:bg-white/[0.04] transition-colors">
                    <span className="text-sm text-gray-400">Launch / Play</span>
                    <span className="text-xs font-mono font-bold bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 px-3 py-1.5 rounded-lg">
                      Open Palm
                    </span>
                  </div>
                  <div className="flex items-center justify-between p-2.5 rounded-xl bg-white/[0.02] border border-white/5 hover:bg-white/[0.04] transition-colors">
                    <span className="text-sm text-gray-400">Next Slide</span>
                    <span className="text-xs font-mono font-bold bg-blue-500/10 border border-blue-500/20 text-blue-400 px-3 py-1.5 rounded-lg">
                      Thumbs Up
                    </span>
                  </div>
                  <div className="flex items-center justify-between p-2.5 rounded-xl bg-white/[0.02] border border-white/5 hover:bg-white/[0.04] transition-colors">
                    <span className="text-sm text-gray-400">Previous Slide</span>
                    <span className="text-xs font-mono font-bold bg-rose-500/10 border border-rose-500/20 text-rose-400 px-3 py-1.5 rounded-lg">
                      Fist
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Slide Viewer */}
            <div className="lg:col-span-8 flex flex-col h-[50vh] lg:h-auto min-h-[500px]">
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
