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
    <div className="relative w-full aspect-video rounded-2xl overflow-hidden bg-black/40 border border-white/10 shadow-2xl backdrop-blur-md">
      <Webcam
        ref={webcamRef}
        audio={false}
        mirrored={true}
        onUserMedia={() => setHasPermission(true)}
        onUserMediaError={() => setHasPermission(false)}
        className="absolute inset-0 w-full h-full object-cover"
      />
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full object-cover pointer-events-none z-10"
        style={{ transform: "scaleX(-1)" }} 
      />

      {hasPermission === false && (
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/80 z-20 gap-3">
          <CameraOff className="w-10 h-10 text-red-400" />
          <p className="text-red-400 font-medium">Camera access denied.</p>
        </div>
      )}

      {(!isReady || hasPermission === null) && hasPermission !== false && (
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/60 z-20 gap-3">
          <Loader2 className="w-8 h-8 text-emerald-500 animate-spin" />
          <p className="text-emerald-400 text-sm font-medium">Loading Vision Models...</p>
        </div>
      )}
    </div>
  );
}
