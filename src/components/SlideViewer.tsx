"use client";

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
      case "open_palm": return "text-violet-400";
      case "thumbs_up": return "text-indigo-400";
      case "fist": return "text-fuchsia-400";
      default: return "text-white/30";
    }
  };

  const getGestureLabel = (g: string) => {
    switch (g) {
      case "open_palm": return "Launch";
      case "thumbs_up": return "Next";
      case "fist": return "Prev";
      default: return "Standby";
    }
  };

  const GestureIcon = getGestureIcon(activeGesture);

  return (
    <div 
      ref={containerRef}
      className={`relative w-full h-full rounded-[2.5rem] border border-white/[0.05] overflow-hidden bg-black/60 shadow-[inset_0_1px_0_rgba(255,255,255,0.05),0_30px_60px_rgba(0,0,0,0.6)] backdrop-blur-3xl flex flex-col ${
        isFullscreen ? "p-0 rounded-none border-none bg-[#070213]" : ""
      }`}
    >
      {/* HUD Bar for Slide Controls */}
      <div className="absolute top-6 right-6 z-30 flex items-center gap-3">
        <button
          onClick={onTogglePlay}
          className="p-3 rounded-2xl bg-white/[0.02] border border-white/[0.05] hover:border-violet-500/30 hover:bg-white/[0.04] text-white transition-all backdrop-blur-2xl cursor-pointer shadow-[inset_0_1px_0_rgba(255,255,255,0.05)]"
          title={isRunning ? "Pause Controls" : "Start Controls"}
        >
          {isRunning ? <Pause className="w-4 h-4 text-violet-400" /> : <Play className="w-4 h-4 text-white/50" />}
        </button>

        {isCustomDeck && (
          <button
            onClick={onReset}
            className="p-3 rounded-2xl bg-white/[0.02] border border-white/[0.05] hover:border-violet-500/30 hover:bg-white/[0.04] text-white transition-all backdrop-blur-2xl cursor-pointer shadow-[inset_0_1px_0_rgba(255,255,255,0.05)]"
            title="Reset to Demo Deck"
          >
            <RefreshCw className="w-4 h-4 text-white/50" />
          </button>
        )}

        <button
          onClick={toggleFullscreen}
          className="p-3 rounded-2xl bg-white/[0.02] border border-white/[0.05] hover:border-violet-500/30 hover:bg-white/[0.04] text-white transition-all backdrop-blur-2xl cursor-pointer shadow-[inset_0_1px_0_rgba(255,255,255,0.05)]"
          title={isFullscreen ? "Exit Fullscreen" : "Enter Fullscreen"}
        >
          {isFullscreen ? <Minimize className="w-4 h-4 text-violet-400" /> : <Maximize className="w-4 h-4 text-white/50" />}
        </button>
      </div>

      {/* Fullscreen Overlay HUD for Gesture Tracking */}
      {isFullscreen && (
        <>
          <div className="absolute top-8 left-8 z-50 flex items-center gap-4 bg-white/[0.02] backdrop-blur-3xl px-6 py-3 rounded-full border border-white/[0.05] shadow-[inset_0_1px_0_rgba(255,255,255,0.05),0_10px_20px_rgba(0,0,0,0.5)]">
            <div className={`w-2.5 h-2.5 rounded-full ${isRunning ? "bg-violet-500 animate-pulse shadow-[0_0_15px_rgba(139,92,246,0.8)]" : "bg-white/20"}`} />
            <span className="text-[10px] font-bold text-white uppercase tracking-[0.2em]">
              {isRunning ? "Control Active" : "Paused"}
            </span>
          </div>

          <div className="absolute top-8 right-28 z-50 flex items-center gap-5 bg-white/[0.02] backdrop-blur-3xl px-5 py-3 rounded-2xl border border-white/[0.05] shadow-[inset_0_1px_0_rgba(255,255,255,0.05),0_10px_20px_rgba(0,0,0,0.5)]">
            <div className="text-right">
              <p className="text-[9px] text-white/40 uppercase tracking-[0.2em] font-semibold">Sensor HUD</p>
              <p className="text-xs font-bold text-white mt-1 tracking-wider uppercase">{getGestureLabel(activeGesture)}</p>
            </div>
            <div className={`w-10 h-10 rounded-xl flex items-center justify-center bg-white/[0.02] border border-white/[0.05] shadow-[inset_0_1px_0_rgba(255,255,255,0.05)] ${getGestureColor(activeGesture)}`}>
              <GestureIcon className="w-5 h-5" />
            </div>
          </div>
        </>
      )}

      {/* Main Slide Presentation Content */}
      <div className="flex-1 w-full h-full relative overflow-hidden flex items-center justify-center">
        {slides.length === 0 ? (
          <div className="absolute inset-0 flex flex-col items-center justify-center p-12 text-center bg-[#070213]/40">
            <p className="text-white/40 text-sm tracking-widest uppercase">No slides loaded. Drop a PDF file to begin.</p>
          </div>
        ) : (
          <>
            {!isRunning ? (
              <div className="absolute inset-0 flex flex-col items-center justify-center p-12 text-center bg-[#070213]/80 backdrop-blur-md">
                <div className="w-24 h-24 rounded-[2rem] bg-violet-500/10 flex items-center justify-center mx-auto mb-8 border border-violet-500/20 shadow-[inset_0_1px_0_rgba(139,92,246,0.2),0_20px_40px_rgba(139,92,246,0.15)]">
                  <Hand className="w-10 h-10 text-violet-400" />
                </div>
                <h2 className="text-4xl md:text-5xl font-light text-white mb-4 tracking-tight">Presentation <strong className="font-bold">Paused</strong></h2>
                <p className="text-white/40 text-sm max-w-sm mx-auto leading-relaxed">
                  Raise an <strong className="text-violet-300 font-semibold">Open Palm</strong> to launch slides control, or use the top-right trigger.
                </p>
              </div>
            ) : (
              <div className="absolute inset-0 w-full h-full">
                {slide.image ? (
                  /* Custom PDF Page slide */
                  <div className="w-full h-full flex items-center justify-center bg-[#070213] p-4">
                    <img
                      src={slide.image}
                      alt={`Slide ${currentSlide + 1}`}
                      className="max-w-full max-h-full object-contain shadow-2xl rounded-xl border border-white/5"
                    />
                  </div>
                ) : (
                  /* Default Demo Text slides */
                  <div className={`w-full h-full flex flex-col justify-center items-start p-16 md:p-24 bg-gradient-to-br ${slide.color || "from-[#110825] to-[#070213]"}`}>
                    <h2 className="text-5xl md:text-7xl font-extrabold text-white mb-8 leading-[1.1] tracking-tighter drop-shadow-2xl">
                      {slide.title}
                    </h2>
                    <h4 className="text-2xl md:text-3xl text-fuchsia-400 font-semibold mb-8 tracking-wide">
                      {slide.subtitle}
                    </h4>
                    <p className="text-xl md:text-2xl text-white/60 max-w-4xl leading-relaxed font-light">
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
        <div className="px-8 py-5 border-t border-white/[0.05] bg-black/40 backdrop-blur-3xl flex items-center justify-between z-20">
          <div className="w-full max-w-md bg-white/5 h-[2px] rounded-full overflow-hidden">
            <div 
              className="bg-gradient-to-r from-violet-500 to-fuchsia-500 h-full transition-all duration-300 shadow-[0_0_10px_rgba(139,92,246,0.8)]"
              style={{ width: `${((currentSlide + 1) / slides.length) * 100}%` }}
            />
          </div>
          <span className="text-[10px] font-bold tracking-[0.2em] uppercase text-white/30">
            Slide <span className="text-white/80">{currentSlide + 1}</span> of {slides.length}
          </span>
        </div>
      )}
    </div>
  );
}
