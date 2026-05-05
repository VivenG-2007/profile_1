# 🌌 Viven Gorantla — Stellar Portfolio

A high-performance, immersive portfolio experience designed to showcase "Logic turned into Magic." This project features a real-time 2D canvas starfield, interactive AI integration, and state-of-the-art animations.

---

## 🚀 Key Features

### 🤖 AI Assistant (Groq Powered)
Integrated with **Groq's Llama 3.1-8b** model for a lightning-fast, intelligent chat experience. Visitors can interact with an AI version of me to learn about my skills, projects, and professional background in real-time.

### 🎭 Motion & Visuals
- **GSAP & ScrollTrigger**: Smooth, high-performance scroll animations and entrance effects.
- **Interactive Starfield**: A dynamic 2D Canvas galaxy that reacts to user interactions and focus.
- **Glassmorphism UI**: Modern, premium design with backdrop blurs and subtle gradients.

### 🕒 Interactive Timeline
A deep dive into my journey, structured with GSAP-driven scrolling that brings my experience to life.

### 🎵 Immersive Audio
Seamless atmospheric background music with a custom-engineered concentric-ring toggle.
- **Smart Autoplay**: Standard-compliant strategy that unmutes on your first interaction.
- **Visual Feedback**: Pulsing animations that sync with the audio state.

---

## 🛠️ Tech Stack

- **Core**: React 18, Vite
- **AI**: Groq API (Llama 3.1-8B-Instant)
- **Animation**: GSAP (GreenSock), ScrollTrigger, ScrollToPlugin
- **Styling**: SCSS (Sass), Modern CSS Variables
- **Icons**: Custom SVG animations

---

## 🔧 Installation & Local Development

1. **Clone the repository**:
   ```bash
   git clone https://github.com/VivenG-2007/profile_1.git
   cd Profile
   ```

2. **Setup Environment**:
   Create a `.env` file in the root and add your Groq API key:
   ```env
   VITE_GROQ_API_KEY=your_groq_api_key_here
   ```

3. **Install dependencies**:
   ```bash
   npm install
   ```

4. **Run the development server**:
   ```bash
   npm run dev
   ```

---

## 📦 Project Architecture

```text
├── src/
│   ├── components/
│   │   ├── ChatBot/       # AI Assistant logic & UI
│   │   ├── Hero/          # Landing section with entrance animations
│   │   ├── Timeline/      # GSAP-driven experience journey
│   │   ├── Skills/        # Animated skill grid
│   │   ├── Projects/      # Work showcase
│   │   └── wrap/          # Background Canvas Starfield & Audio
│   ├── constants/         # Data configuration for easy updates
│   ├── App.jsx            # Main assembly & GSAP registration
│   └── index.css          # Global design tokens
```

---

## 🚀 Deployment

The project is optimized for **Vercel**. 
- Ensure you add the `VITE_GROQ_API_KEY` in the Vercel Dashboard under **Project Settings > Environment Variables**.

---

## 🤝 Contact

- **GitHub**: [@VivenG-2007](https://github.com/VivenG-2007)
- **LinkedIn**: [Viven Gorantla](https://www.linkedin.com/in/viven-gorantla-19a73b3ab)

---

> "Turning Logic into Magic" — Viven Gorantla
