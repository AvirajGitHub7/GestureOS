"use client";

import { useRef, useState, useEffect } from "react";
import Webcam from "react-webcam";
import { useHandTracking } from "@/hooks/useHandTracking";
import { NormalizedLandmark } from "@mediapipe/tasks-vision";
import { Loader2, CameraOff } from "lucide-react";

interface WebcamFeedProps {
  onLandmarks: (landmarks: NormalizedLandmark[]) => void;
}

export function WebcamFeed({ onLandmarks }: WebcamFeedProps) {
  const webcamRef = useRef<Webcam>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [hasPermission, setHasPermission] = useState<boolean | null>(null);

  useEffect(() => {
    if (webcamRef.current && webcamRef.current.video) {
      videoRef.current = webcamRef.current.video;
    }
  }, [webcamRef.current?.video]);

  const { isReady } = useHandTracking(videoRef, canvasRef, onLandmarks);

  return (
    <div className="relative w-full aspect-video rounded-[2rem] overflow-hidden bg-black/40 border border-white/[0.05] shadow-[inset_0_1px_0_rgba(255,255,255,0.05),0_20px_40px_rgba(0,0,0,0.5)] backdrop-blur-3xl group">
      <Webcam
        ref={webcamRef}
        audio={false}
        mirrored={true}
        onUserMedia={() => setHasPermission(true)}
        onUserMediaError={() => setHasPermission(false)}
        className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
      />
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full object-cover pointer-events-none z-10"
        style={{ transform: "scaleX(-1)" }} 
      />

      {/* Decorative inner vignette to blend edges */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_40%,#070213_120%)] pointer-events-none z-10" />

      {hasPermission === false && (
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-[#070213]/90 backdrop-blur-md z-20 gap-3">
          <CameraOff className="w-10 h-10 text-rose-500" />
          <p className="text-white/60 font-medium text-sm">Camera access denied.</p>
        </div>
      )}

      {(!isReady || hasPermission === null) && hasPermission !== false && (
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-[#070213]/80 backdrop-blur-xl z-20 gap-4">
          <Loader2 className="w-8 h-8 text-violet-500 animate-spin" />
          <p className="text-[10px] font-bold text-violet-300 uppercase tracking-[0.2em]">Initializing Vision Models</p>
        </div>
      )}
    </div>
  );
}
