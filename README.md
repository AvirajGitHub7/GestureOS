# 🖐️ GestureOS

[![Next.js](https://img.shields.io/badge/Next.js-15-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-blue?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.x-38bdf8?style=for-the-badge&logo=tailwind-css)](https://tailwindcss.com/)
[![MediaPipe](https://img.shields.io/badge/MediaPipe-Tasks--Vision-007f8b?style=for-the-badge&logo=google)](https://developers.google.com/mediapipe)

**GestureOS** is a premium, portfolio-grade web application designed to control presentations and PDF slide decks using hand gestures. Powered by hardware-accelerated client-side computer vision, it runs entirely on-device, offering zero-latency controls, custom PDF uploads, and full-screen workspace HUD displays.

---

## ✨ Key Features

*   **⚡ Real-Time Tracking:** Harnesses Google MediaPipe's WebAssembly & WebGL hand landmarker pipeline to track 21 discrete coordinate points on the hand at up to 60fps.
*   **📂 Local PDF Compiler:** Drag, drop, and convert multi-page PDF documents entirely client-side using Mozilla's `pdfjs-dist` engine.
*   **🖥️ Fullscreen HUD Overlay:** Enter fullscreen presentation mode and use floating, glassmorphic heads-up display overlays showing active connection statuses and hand posture updates.
*   **🛡️ Local Privacy First:** Zero cloud uploads. All webcam feed processing and document rendering happen locally inside the sandbox.

---

## 🖐️ Gesture Reference & Control Scheme

To prevent accidental page turns, GestureOS features a robust **1-second cooldown lock** between navigation actions.

| Gesture | Mapped Action | Mechanics & Detection Rule |
| :--- | :--- | :--- |
| ✋ **Open Palm** | **Start / Reset Control** | Tracks if all 5 fingers are fully extended (y-coordinate of tips is above joint knuckles). Activates control loop and resets deck to Slide 1. |
| 👍 **Thumbs Up** | **Next Slide (Forward)** | Measures if the index, middle, ring, and pinky are fully curled down while the thumb is pointed upward above the hand bounding box. |
| ✊ **Closed Fist** | **Previous Slide (Backward)** | Measures if all 5 fingers are tightly curled (y-coordinate of tips is below joint knuckles). Navigates backward. |

---

## 🧠 Under the Hood: Gesture Classification logic

GestureOS parses hand landmarks based on coordinate relationships. The 21 hand landmarks tracked by MediaPipe are compared relative to one another in `src/utils/gestureDetection.ts`:

1.  **Tip vs Knuckle Check:** A finger is classified as **extended** if its tip landmark's $y$-coordinate is less than its PIP joint's $y$-coordinate (for standard upright cameras).
    *   *Index:* `Landmark 8.y < Landmark 6.y`
    *   *Middle:* `Landmark 12.y < Landmark 10.y`
    *   *Ring:* `Landmark 16.y < Landmark 14.y`
    *   *Pinky:* `Landmark 20.y < Landmark 18.y`
2.  **Thumbs Up Logic:** 
    *   Index, Middle, Ring, and Pinky are verified as **curled** (tips below knuckles).
    *   Thumb tip (`Landmark 4`) is verified as pointing **upward** and extended above the hand center (`Landmark 4.y < Landmark 2.y`).
3.  **Fist Logic:**
    *   Index, Middle, Ring, Pinky, and Thumb tips are all verified as **curled** below their respective joints.

---

## 📁 Repository Structure

```text
gestureos/
├── public/
│   └── models/          # MediaPipe task models and custom static decks
├── src/
│   ├── app/
│   │   ├── layout.tsx   # Global setup and fonts loader
│   │   ├── page.tsx     # Landing page & Workspace view routing orchestrator
│   │   └── globals.css  # CSS utility definitions (custom glow utilities)
│   ├── components/
│   │   ├── Navbar.tsx        # Responsive landing page header with scroll anchors
│   │   ├── LandingHero.tsx   # Hero typography & visual particle graphic
│   │   ├── AboutSection.tsx  # How-it-works visual timeline & feature cards
│   │   ├── WebcamFeed.tsx    # Live camera capture & hand landmark Canvas overlays
│   │   ├── SlideViewer.tsx   # Fullscreen API slides viewport & HUD overlay
│   │   ├── GestureStatus.tsx # Gesture identification status panel
│   │   └── PDFUploader.tsx   # Client-side PDF-to-canvas image pipeline
│   ├── hooks/
│   │   ├── useHandTracking.ts  # Stream loop listener, MediaPipe loading & canvas drawing
│   │   └── usePresentation.ts  # Cooldown triggers and slide index hooks
│   ├── types/
│   │   └── gesture.ts   # Slide structures & posture typings
│   └── utils/
│       └── gestureDetection.ts # Coordinate parsing heuristics
```

---

## 🚀 Installation & Local Setup

Ensure you have **Node.js 18.x+** installed on your system.

1.  **Clone the Repository**
    ```bash
    git clone https://github.com/AvirajGitHub7/GestureOS.git
    cd gestureos
    ```

2.  **Install Dependencies**
    ```bash
    npm install
    ```

3.  **Run Development Server**
    ```bash
    npm run dev
    ```
    Access the application at [http://localhost:3000](http://localhost:3000).

4.  **Production Compilation**
    ```bash
    npm run build
    npm run start
    ```

---

## 📄 License

This project is open-source and available under the [MIT License](LICENSE).
