"use client";

import { useState, useCallback, useRef } from 'react';
import { GestureType, PresentationState, Slide } from '@/types/gesture';

const DEFAULT_SLIDES: Slide[] = [
  {
    id: 1,
    title: "GestureOS",
    subtitle: "Premium Hand-Controlled Presentations",
    content: "An interactive portfolio project combining Next.js 15, MediaPipe, and WebAssembly to create hands-free presentation experiences.",
    color: "from-emerald-600/30 to-teal-950/40"
  },
  {
    id: 2,
    title: "Gesture: Open Palm",
    subtitle: "Start & Activation Mode",
    content: "Raise an Open Palm towards your webcam to initialize control. A pulsing status bar indicates when GestureOS is actively listening.",
    color: "from-blue-600/30 to-indigo-950/40"
  },
  {
    id: 3,
    title: "Gesture: Thumbs Up",
    subtitle: "Next Slide / Go Forward",
    content: "Extend your thumb upwards while keeping other fingers closed to advance. A 1-second cooldown prevents accidental double-slides.",
    color: "from-purple-600/30 to-fuchsia-950/40"
  },
  {
    id: 4,
    title: "Gesture: Fist",
    subtitle: "Previous Slide / Go Backward",
    content: "Make a closed fist to return to the previous slide. This rule-based trigger ensures reliable, error-free navigation.",
    color: "from-orange-600/30 to-red-950/40"
  },
  {
    id: 5,
    title: "Zero Server Dependencies",
    subtitle: "100% Client-Side Edge AI",
    content: "Webcam feeds are processed fully inside your browser. No video frames, presentations, or data ever leave your machine.",
    color: "from-pink-600/30 to-rose-950/40"
  }
];

export function usePresentation() {
  const [state, setState] = useState<PresentationState>({
    currentSlide: 0,
    isRunning: false,
    totalSlides: DEFAULT_SLIDES.length,
    slides: DEFAULT_SLIDES
  });

  const lastActionTime = useRef<number>(0);
  const COOLDOWN_MS = 1000;

  const setCustomSlides = useCallback((newSlides: Slide[]) => {
    setState({
      currentSlide: 0,
      isRunning: false,
      totalSlides: newSlides.length,
      slides: newSlides
    });
  }, []);

  const resetToDefault = useCallback(() => {
    setState({
      currentSlide: 0,
      isRunning: false,
      totalSlides: DEFAULT_SLIDES.length,
      slides: DEFAULT_SLIDES
    });
  }, []);

  const startPresentation = useCallback(() => {
    setState(prev => ({ ...prev, isRunning: true, currentSlide: 0 }));
  }, []);

  const stopPresentation = useCallback(() => {
    setState(prev => ({ ...prev, isRunning: false }));
  }, []);

  const handleGesture = useCallback((gesture: GestureType) => {
    if (gesture === 'none') return;
    
    const now = Date.now();
    if (now - lastActionTime.current < COOLDOWN_MS) return;

    setState(prev => {
      const newState = { ...prev };
      let actionTaken = false;

      if (gesture === 'open_palm' && !prev.isRunning) {
        newState.isRunning = true;
        newState.currentSlide = 0;
        actionTaken = true;
      } else if (prev.isRunning) {
        if (gesture === 'thumbs_up' && prev.currentSlide < prev.totalSlides - 1) {
          newState.currentSlide += 1;
          actionTaken = true;
        } else if (gesture === 'fist' && prev.currentSlide > 0) {
          newState.currentSlide -= 1;
          actionTaken = true;
        }
      }

      if (actionTaken) {
        lastActionTime.current = now;
        return newState;
      }
      return prev;
    });
  }, []);

  return { 
    state, 
    handleGesture, 
    setCustomSlides, 
    resetToDefault,
    startPresentation,
    stopPresentation
  };
}
