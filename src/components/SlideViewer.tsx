"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useRef, useEffect } from "react";
import { Maximize, Minimize, Play, Pause, RefreshCw, Hand, ThumbsUp, Grab, Minus } from "lucide-react";
import { Slide } from "@/types/gesture";

interface SlideViewerProps {
  slides: Slide[];
  currentSlide: number;
  isRunning: boolean;
  onTogglePlay: () => void;
  activeGesture: string;
  onReset: () => void;
  isCustomDeck: boolean;
}

export function SlideViewer({
  slides,
  currentSlide,
  isRunning,
  onTogglePlay,
  activeGesture,
  onReset,
  isCustomDeck
}: SlideViewerProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isFullscreen, setIsFullscreen] = useState(false);

  const toggleFullscreen = () => {
    if (!containerRef.current) return;
    if (!document.fullscreenElement) {
      containerRef.current.requestFullscreen().catch(err => {
        console.error("Fullscreen error:", err);
      });
    } else {
      document.exitFullscreen();
    }
  };

  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };
    document.addEventListener("fullscreenchange", handleFullscreenChange);
    return () => {
      document.removeEventListener("fullscreenchange", handleFullscreenChange);
    };
  }, []);

  const slide = slides[currentSlide];

  // Helper values to show gesture HUD in fullscreen
  const getGestureIcon = (g: string) => {
    switch (g) {
      case "open_palm": return Hand;
      case "thumbs_up": return ThumbsUp;
      case "fist": return Grab;
      default: return Minus;
    }
  };

  const getGestureColor = (g: string) => {
    switch (g) {
      case "open_palm": return "text-emerald-400";
      case "thumbs_up": return "text-blue-400";
      case "fist": return "text-rose-400";
      default: return "text-gray-500";
    }
  };

  const getGestureLabel = (g: string) => {
    switch (g) {
      case "open_palm": return "Open Palm (Start)";
      case "thumbs_up": return "Thumbs Up (Next)";
      case "fist": return "Fist (Prev)";
      default: return "None";
    }
  };

  const GestureIcon = getGestureIcon(activeGesture);

  return (
    <div 
      ref={containerRef}
      className={`relative w-full h-full rounded-2xl border border-white/10 overflow-hidden bg-[#0d0d0d] shadow-2xl flex flex-col ${
        isFullscreen ? "p-0 rounded-none border-none" : ""
      }`}
    >
      {/* HUD Bar for Slide Controls */}
      <div className="absolute top-4 right-4 z-30 flex items-center gap-2">
        <button
          onClick={onTogglePlay}
          className="p-2.5 rounded-lg bg-black/60 border border-white/10 hover:border-emerald-500/30 text-white transition-all backdrop-blur-md cursor-pointer"
          title={isRunning ? "Pause Controls" : "Start Controls"}
        >
          {isRunning ? <Pause className="w-4 h-4 text-emerald-400" /> : <Play className="w-4 h-4 text-gray-400" />}
        </button>

        {isCustomDeck && (
          <button
            onClick={onReset}
            className="p-2.5 rounded-lg bg-black/60 border border-white/10 hover:border-emerald-500/30 text-white transition-all backdrop-blur-md cursor-pointer"
            title="Reset to Demo Deck"
          >
            <RefreshCw className="w-4 h-4 text-gray-400" />
          </button>
        )}

        <button
          onClick={toggleFullscreen}
          className="p-2.5 rounded-lg bg-black/60 border border-white/10 hover:border-emerald-500/30 text-white transition-all backdrop-blur-md cursor-pointer"
          title={isFullscreen ? "Exit Fullscreen" : "Enter Fullscreen"}
        >
          {isFullscreen ? <Minimize className="w-4 h-4 text-emerald-400" /> : <Maximize className="w-4 h-4 text-gray-400" />}
        </button>
      </div>

      {/* Fullscreen Overlay HUD for Gesture Tracking */}
      {isFullscreen && (
        <>
          <div className="absolute top-6 left-6 z-50 flex items-center gap-3 bg-black/60 backdrop-blur-md px-4 py-2.5 rounded-full border border-white/10 shadow-2xl">
            <div className={`w-2.5 h-2.5 rounded-full ${isRunning ? "bg-emerald-500 animate-pulse shadow-[0_0_10px_#10b981]" : "bg-rose-500"}`} />
            <span className="text-xs font-semibold text-white uppercase tracking-wider">
              {isRunning ? "Control Active" : "Paused"}
            </span>
          </div>

          <div className="absolute top-6 right-20 z-50 flex items-center gap-4 bg-black/60 backdrop-blur-md px-4 py-2 rounded-xl border border-white/10 shadow-2xl">
            <div className="text-right">
              <p className="text-[10px] text-gray-400 uppercase tracking-widest font-mono">Gesture HUD</p>
              <p className="text-xs font-bold text-white mt-0.5">{getGestureLabel(activeGesture)}</p>
            </div>
            <div className={`w-8 h-8 rounded-full flex items-center justify-center bg-white/5 border border-white/10 ${getGestureColor(activeGesture)}`}>
              <GestureIcon className="w-4 h-4" />
            </div>
          </div>
        </>
      )}

      {/* Main Slide Presentation Content */}
      <div className="flex-1 w-full h-full relative overflow-hidden">
        {slides.length === 0 ? (
          <div className="absolute inset-0 flex flex-col items-center justify-center p-12 text-center">
            <p className="text-gray-400">No slides loaded. Drop a PDF file to begin.</p>
          </div>
        ) : (
          <>
            {!isRunning ? (
              <div className="absolute inset-0 flex flex-col items-center justify-center p-12 text-center bg-gradient-to-b from-[#111] to-[#050505]">
                <div className="w-20 h-20 rounded-full bg-emerald-500/10 flex items-center justify-center mx-auto mb-6 border border-emerald-500/20 shadow-[0_0_40px_rgba(16,185,129,0.15)]">
                  <Hand className="w-9 h-9 text-emerald-400" />
                </div>
                <h2 className="text-3xl md:text-4xl font-extrabold text-white mb-3 tracking-tight">Presentation Mode Paused</h2>
                <p className="text-gray-400 text-base max-w-md mx-auto leading-relaxed">
                  Raise an <strong className="text-emerald-400 font-semibold">Open Palm</strong> to launch slides control, or use the top-right trigger.
                </p>
              </div>
            ) : (
              <div className="absolute inset-0 w-full h-full">
                {slide.image ? (
                  /* Custom PDF Page slide */
                  <div className="w-full h-full flex items-center justify-center bg-neutral-900 p-2">
                    <img
                      src={slide.image}
                      alt={`Slide ${currentSlide + 1}`}
                      className="max-w-full max-h-full object-contain shadow-2xl rounded-lg border border-white/5"
                    />
                  </div>
                ) : (
                  /* Default Demo Text slides */
                  <div className={`w-full h-full flex flex-col justify-center items-start p-12 md:p-20 bg-gradient-to-br ${slide.color || "from-neutral-900 to-black"}`}>
                    <h2 className="text-4xl md:text-6xl font-extrabold text-white mb-6 leading-tight tracking-tight drop-shadow-md">
                      {slide.title}
                    </h2>
                    <h4 className="text-xl md:text-2xl text-emerald-400 font-semibold mb-6 tracking-wide">
                      {slide.subtitle}
                    </h4>
                    <p className="text-lg md:text-xl text-gray-300 max-w-3xl leading-relaxed font-light">
                      {slide.content}
                    </p>
                  </div>
                )}
              </div>
            )}
          </>
        )}
      </div>

      {/* Progress Footer */}
      {slides.length > 0 && (
        <div className="p-4 border-t border-white/5 bg-black/40 flex items-center justify-between z-20">
          <div className="w-full max-w-[150px] md:max-w-xs bg-white/5 h-1 rounded-full overflow-hidden">
            <div 
              className="bg-emerald-500 h-full transition-all duration-300"
              style={{ width: `${((currentSlide + 1) / slides.length) * 100}%` }}
            />
          </div>
          <span className="text-xs font-mono text-gray-400">
            Slide {currentSlide + 1} of {slides.length}
          </span>
        </div>
      )}
    </div>
  );
}
