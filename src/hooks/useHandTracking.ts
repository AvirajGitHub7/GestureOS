"use client";

import { useEffect, useRef, useState } from 'react';
import { FilesetResolver, HandLandmarker, NormalizedLandmark } from '@mediapipe/tasks-vision';

export function useHandTracking(
  videoRef: React.RefObject<HTMLVideoElement | null>,
  canvasRef: React.RefObject<HTMLCanvasElement | null>,
  onLandmarks: (landmarks: NormalizedLandmark[]) => void
) {
  const [isReady, setIsReady] = useState(false);
  const handLandmarkerRef = useRef<HandLandmarker | null>(null);
  const animationRef = useRef<number>(0);

  useEffect(() => {
    let active = true;

    async function init() {
      try {
        const vision = await FilesetResolver.forVisionTasks(
          "https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@0.10.14/wasm"
        );
        const handLandmarker = await HandLandmarker.createFromOptions(vision, {
          baseOptions: {
            modelAssetPath: "https://storage.googleapis.com/mediapipe-models/hand_landmarker/hand_landmarker/float16/1/hand_landmarker.task",
            delegate: "GPU"
          },
          runningMode: "VIDEO",
          numHands: 1
        });
        if (active) {
          handLandmarkerRef.current = handLandmarker;
          setIsReady(true);
        }
      } catch (error) {
        console.error("Error initializing MediaPipe:", error);
      }
    }
    init();

    return () => {
      active = false;
      if (handLandmarkerRef.current) {
        handLandmarkerRef.current.close();
      }
    };
  }, []);

  useEffect(() => {
    if (!isReady || !videoRef.current || !canvasRef.current) return;

    const video = videoRef.current;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');

    const renderLoop = () => {
      if (video.readyState >= 2 && video.videoWidth > 0 && video.videoHeight > 0 && handLandmarkerRef.current) {
        // Match canvas size to video size
        if (canvas.width !== video.videoWidth || canvas.height !== video.videoHeight) {
          canvas.width = video.videoWidth;
          canvas.height = video.videoHeight;
        }

        const results = handLandmarkerRef.current.detectForVideo(video, performance.now());
        
        ctx?.clearRect(0, 0, canvas.width, canvas.height);
        
        if (results.landmarks && results.landmarks.length > 0) {
          onLandmarks(results.landmarks[0]);
          
          if (ctx) {
            ctx.fillStyle = "#10b981"; // Emerald 500
            ctx.strokeStyle = "#059669"; // Emerald 600
            ctx.lineWidth = 2;

            // Draw simple landmarks
            for (const landmark of results.landmarks[0]) {
              const x = landmark.x * canvas.width;
              const y = landmark.y * canvas.height;
              ctx.beginPath();
              ctx.arc(x, y, 4, 0, 2 * Math.PI);
              ctx.fill();
            }
          }
        } else {
          onLandmarks([]);
        }
      }
      animationRef.current = requestAnimationFrame(renderLoop);
    };

    video.addEventListener("loadeddata", renderLoop);
    if (video.readyState >= 2) renderLoop();

    return () => {
      video.removeEventListener("loadeddata", renderLoop);
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
    };
  }, [isReady, videoRef, canvasRef, onLandmarks]);

  return { isReady };
}
