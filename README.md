# 🌌 Stellar Profile

A high-performance, immersive portfolio experience featuring a real-time 2D canvas starfield, interactive audio, and smooth GSAP-driven transitions.

---

## ✨ Features

- **🚀 Interactive Starfield**: A dynamic, responsive 2D canvas galaxy that reacts to user focus and movement.
- **🎵 immersive Audio**: Seamless ambient background sound with a custom-engineered concentric-ring toggle.
  - *Muted Autoplay*: Standard-compliant autoplay strategy that unmutes on your first interact.
  - *Looping*: Infinite atmospheric audio for a continuous experience.
- **🎨 Premium Aesthetic**: 
  - Glassmorphic UI components.
  - Smooth concentric animations (spinning/pulsing centers).
  - Modern typography using **Audiowide** and **Roboto**.
- **🛠️ Tech Stack**:
  - **React 18** + **Vite**
  - **GSAP (GreenSock)**: Professional-grade animation engine.
  - **Sass (SCSS)**: Modular, structured styling.

---

## 🛠️ Installation & Setup

1. **Clone the repository**:
   ```bash
   git clone [your-repo-link]
   cd Profile
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Start the development server**:
   ```bash
   npm run dev
   ```

4. **Build for production**:
   ```bash
   npm run build
   ```

---

## 📂 Project Structure

```text
├── public/                 # Static assets (MP3, Icons)
├── src/
│   ├── components/
│   │   └── wrap/          # Main Starfield & UI Logic
│   │       ├── wrap.jsx   # Core logic & Canvas engine
│   │       └── wrap.scss  # Styling & Animations
│   ├── App.jsx            # Multi-plugin GSAP initialisation
│   └── main.jsx           # React Entry point
└── vite.config.js         # Vite & Tailwind configuration
```

---

## 🎹 Interaction Guide

| Action | Result |
| :--- | :--- |
| **Reload** | Starfield initializes; sound starts muted (Autoplay). |
| **Click/Any Key** | Unmutes audio instantly. |
| **Bottom Right Toggle** | Manual Play/Pause control with visual feedback. |
| **Hover Toggle** | Expands icon and triggers subtle glow effects. |

checking n8n workflows