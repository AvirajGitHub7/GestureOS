<div align="center">
  <img src="https://raw.githubusercontent.com/lucide-icons/lucide/main/icons/hand.svg" width="80" alt="GestureOS Logo">
  
  <h1 align="center">GestureOS</h1>
  <p align="center">
    <strong>Zero-latency, edge AI presentation control powered by your webcam.</strong>
    <br />
    Step away from the keyboard and navigate slide decks using natural hand gestures.
  </p>

  <p align="center">
    <a href="#features">Features</a> •
    <a href="#tech-stack">Tech Stack</a> •
    <a href="#getting-started">Getting Started</a> •
    <a href="#gestures">Supported Gestures</a>
  </p>
</div>

---

## ⚡ Features

- **✋ Zero-Latency Tracking:** Powered by Google's MediaPipe HandLandmarker, tracking 21 coordinates on your hand at 60FPS using hardware-accelerated WebAssembly.
- **🔒 100% Privacy & Edge AI:** The entire inference pipeline runs directly in your browser. No video frames, presentations, or telemetry data ever leave your device.
- **📄 Native PDF Support:** Drag and drop any PDF presentation to control it instantly with hand movements.
- **🔐 Secure Authentication:** Gated workspace access using NextAuth (Google Provider) backed by MongoDB Atlas.
- **🎨 Premium UI/UX:** A stunning, responsive interface built with Tailwind CSS, featuring dark-mode glassmorphism, ambient radial gradients, and fluid Framer Motion animations.

## 🛠️ Tech Stack

- **Framework:** [Next.js 15+](https://nextjs.org/) (App Router)
- **AI & Vision:** [MediaPipe Tasks Vision](https://developers.google.com/mediapipe) / WebAssembly
- **Styling:** [Tailwind CSS](https://tailwindcss.com/)
- **Animations:** [Framer Motion](https://www.framer.com/motion/)
- **Authentication:** [NextAuth.js](https://next-auth.js.org/)
- **Database:** [MongoDB](https://www.mongodb.com/) & [Mongoose](https://mongoosejs.com/)
- **PDF Rendering:** [PDF.js](https://mozilla.github.io/pdf.js/)

---

## 📸 Screenshots

*(To be added: Take a few screenshots of your running app and place them in `public/screenshots/`!)*

<p align="center">
  <img src="/screenshots/hero.png" width="48%" alt="Landing Page Hero Section" style="border-radius: 12px; border: 1px solid #333;" />
  <img src="/screenshots/workspace.png" width="48%" alt="Gesture Workspace" style="border-radius: 12px; border: 1px solid #333;" />
</p>

---

## 🚀 Getting Started

Follow these steps to set up GestureOS on your local machine.

### 1. Clone the repository
```bash
git clone https://github.com/yourusername/gestureos.git
cd gestureos
```

### 2. Install dependencies
```bash
npm install
```

### 3. Set up Environment Variables
Create a `.env.local` file in the root directory and configure your NextAuth and MongoDB credentials:

```env
GOOGLE_CLIENT_ID="your_google_client_id"
GOOGLE_CLIENT_SECRET="your_google_client_secret"

MONGODB_URI="your_mongodb_atlas_connection_string"

NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="a_secure_random_string"
```

### 4. Run the development server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 🖐️ Supported Gestures

GestureOS evaluates finger joint angles and thumb positions to classify gestures in real-time.

1. **Open Palm (Launch):** Extend all five fingers. Activates control mode and initializes slide 1.
2. **Thumbs Up (Next Slide):** Extend your thumb pointing upwards. Advances the deck to the next slide.
3. **Closed Fist (Previous Slide):** Curl all fingers completely. Navigates back to the preceding slide.

*(A 1-second cooldown is enforced between slide transitions to prevent accidental double-skips).*

---

<div align="center">
  <p>Built with ❤️ for modern presentations.</p>
</div>
