export type GestureType = "open_palm" | "thumbs_up" | "fist" | "none";

export interface Slide {
  id: number;
  title?: string;
  subtitle?: string;
  content?: string;
  color?: string;
  image?: string; // PDF page rendered as data URL/canvas image
}

export interface PresentationState {
  currentSlide: number;
  isRunning: boolean;
  totalSlides: number;
  slides: Slide[];
}
