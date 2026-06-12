import { NormalizedLandmark } from "@mediapipe/tasks-vision";
import { GestureType } from "@/types/gesture";

export function detectGesture(landmarks: NormalizedLandmark[]): GestureType {
  if (!landmarks || landmarks.length !== 21) return "none";

  // Landmark indices
  const WRIST = 0;
  const THUMB_MCP = 2;
  const THUMB_TIP = 4;
  
  const INDEX_MCP = 5;
  const INDEX_PIP = 6;
  const INDEX_TIP = 8;
  
  const MIDDLE_MCP = 9;
  const MIDDLE_PIP = 10;
  const MIDDLE_TIP = 12;
  
  const RING_MCP = 13;
  const RING_PIP = 14;
  const RING_TIP = 16;
  
  const PINKY_MCP = 17;
  const PINKY_PIP = 18;
  const PINKY_TIP = 20;

  // Helper to check if a finger is extended (for index, middle, ring, pinky)
  // Usually, a finger is extended if its tip is further from the wrist than its PIP/MCP.
  // In screen coordinates, y=0 is top, y=1 is bottom.
  // So if tip.y < pip.y, the finger is pointing up.
  // We can just check if tip is higher (y is smaller) than the PIP joint.
  // This assumes the hand is upright.
  const isFingerExtended = (tip: number, pip: number, mcp: number) => {
    return landmarks[tip].y < landmarks[pip].y && landmarks[tip].y < landmarks[mcp].y;
  };

  const isIndexExtended = isFingerExtended(INDEX_TIP, INDEX_PIP, INDEX_MCP);
  const isMiddleExtended = isFingerExtended(MIDDLE_TIP, MIDDLE_PIP, MIDDLE_MCP);
  const isRingExtended = isFingerExtended(RING_TIP, RING_PIP, RING_MCP);
  const isPinkyExtended = isFingerExtended(PINKY_TIP, PINKY_PIP, PINKY_MCP);

  // Thumb is extended if it's pointing up and away from the hand
  // A simple check for thumbs up: thumb tip is higher than thumb mcp, and other fingers are curled
  const isThumbPointingUp = landmarks[THUMB_TIP].y < landmarks[THUMB_MCP].y && landmarks[THUMB_TIP].y < landmarks[WRIST].y;

  // For open palm, the thumb should also be extended, usually outwards, but for simplicity, we just check if it's somewhat away from the MCP.
  // Let's just check if it's "away" from the index finger horizontally or vertically.
  // We can just use the other 4 fingers for Open Palm / Fist mostly.

  const extendedFingersCount = [isIndexExtended, isMiddleExtended, isRingExtended, isPinkyExtended].filter(Boolean).length;

  if (extendedFingersCount >= 3) {
    return "open_palm";
  }

  if (extendedFingersCount === 0) {
    if (isThumbPointingUp && landmarks[THUMB_TIP].y < landmarks[INDEX_MCP].y) {
      return "thumbs_up";
    }
    return "fist";
  }

  return "none";
}
