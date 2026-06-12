# GestureOS 🖐️✨

GestureOS is a portfolio-grade, web-based presentation control suite that enables users to navigate slideshows and PDF decks in real-time using hand gestures. Powered by hardware-accelerated computer vision and client-side processing, it runs entirely inside the browser without uploading any video or document data to external servers.

---

## 🚀 Key Features

* **Real-time Hand Tracking:** Uses MediaPipe Tasks Vision WebAssembly library to track 21 landmarks on your hand at up to 60fps.
* **Responsive Workspace Dashboard:** Camera feedback and live tracking overlay on the left, slide deck presentation area on the right.
* **Drag-and-Drop PDF Uploader:** Upload your own presentations (PDFs) directly, rendered locally into high-quality slide images via PDF.js.
* **Browser Fullscreen Slide Mode:** Toggle presentations into true full-screen mode while maintaining gesture recognition and displaying a custom floating heads-up display (HUD).
* **100% Client-Side Privacy:** No telemetry, video streams, or user files are sent to servers. Everything executes inside the user's browser.

---

## 🖐️ Gesture Reference Map

Our detection algorithms parse relative finger positions and coordinates to identify gestures. To minimize false positives, a **1-second cooldown** is enforced between command triggers.

| Gesture | Action | Description |
| :--- | :--- | :--- |
| ✋ **Open Palm** | **Start / Reset** | Extends all five fingers. Activates presentation mode and resets to Slide 1. |
| 👍 **Thumbs Up** | **Next Slide** | Folds other fingers while pointing the thumb upwards. Advances to the next slide. |
| ✊ **Closed Fist** | **Previous Slide** | Curls all fingers completely. Navigates back to the preceding slide. |

---

## 🛠️ Technology Stack

* **Framework:** Next.js 15 (App Router, React 19)
* **Language:** TypeScript
* **Styling:** Tailwind CSS (Fluid Grid Layout, Dark Glassmorphism, Neon Glow Accents)
* **Animations:** Framer Motion
* **Computer Vision:** `@mediapipe/tasks-vision` (WebAssembly & WebGL hand landmarker)
* **PDF Rendering:** `pdfjs-dist` (Mozilla PDF.js client-side parser)
* **Icons:** Lucide React

---

## 📦 Getting Started

### Prerequisites
Make sure you have Node.js (version 18 or higher) installed.

### 1. Clone & Install Dependencies
```bash
git clone https://github.com/YOUR_USERNAME/gestureos.git
cd gestureos
npm install
```

### 2. Run the Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

### 3. Build for Production
```bash
npm run build
npm run start
```

---

## 🔒 Privacy & Safety First
GestureOS initializes the webcam local stream using the standard browser `getUserMedia` API.
* No video frames, coordinates, or pixel data are uploaded to servers.
* No cookies, analytics trackers, or user telemetry exist.
* The PDF document upload parses files entirely within a local browser `ArrayBuffer`.

---

## 📄 License
This project is open-source and licensed under the MIT License.
