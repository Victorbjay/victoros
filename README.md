
#  VictorOS — Fullstack Engineer Portfolio

> A high-performance, pixel-perfect macOS Ventura/Sonoma inspired web ecosystem showcasing the engineering craft of Victor (@victorbjay).

![VictorOS Desktop Preview](https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=1000&auto=format&fit=crop)

## 🚀 Overview

VictorOS is not just a portfolio; it's a specialized **React-based Window Management System** designed to demonstrate fullstack proficiency, UI/UX precision, and AI integration. It features a dual-mode architecture that seamlessly transitions between a desktop "macOS" experience and a mobile "iOS" experience.

### Key Features
- **🪟 Window Manager**: Multi-tasking environment with z-index management, dragging, and minimizing.
- **🤖 VicBot Core**: Deep integration with **Gemini 2.5 Flash** for a natural language shell and interactive spotlight search.
- **📱 Responsive OS Switcher**: Automatically adapts to a touch-first MobileOS (iOS-inspired) on smaller viewports.
- **🐚 Intelligent Terminal**: iTerm2-style terminal supporting custom commands (`neofetch`, `skills`, `aura`) with AI fallback.
- **📂 Finder & Safari**: Real-time GitHub API integration for project exploration and a "browser-within-a-browser" portfolio experience.
- **🎵 Music Player**: Functional Apple Music-style player with coding focus playlists.

---

## 🛠 Tech Stack

- **Frontend**: React 19, TypeScript
- **Styling**: Tailwind CSS (Glassmorphism, Dark/Light system themes)
- **Intelligence**: Google Gemini AI (@google/genai)
- **Icons**: Lucide React
- **Deployment**: Vercel / Netlify

---

## 📦 Local Development

### Prerequisites
- Node.js (v18 or higher)
- A Google AI Studio API Key (Get it at [ai.google.dev](https://ai.google.dev/))

### Setup Steps
1. **Clone the repository**
   ```bash
   git clone https://github.com/victorbjay/victoros.git
   cd victoros
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure Environment Variables**
   Create a `.env` file in the root directory:
   ```env
   API_KEY=your_gemini_api_key_here
   ```

4. **Run the development server**
   ```bash
   npm run dev
   ```

---

## 🌐 Deployment Guide (Vercel)

VictorOS is optimized for zero-config deployment on Vercel.

1. **Push to GitHub**: Push your local repository to a new GitHub repo.
2. **Import to Vercel**: Connect your GitHub account to Vercel and import the `victoros` project.
3. **Set Environment Variables**:
   - During the import process, go to the **Environment Variables** section.
   - Add `API_KEY` and paste your Gemini API Key.
4. **Deploy**: Click "Deploy". Vercel will automatically build the project and provide a live URL.

### Troubleshooting AI Connection
If VicBot fails to respond after deployment, ensure that:
1. The `API_KEY` environment variable is exactly named `API_KEY`.
2. You have credits/quota available in your Google AI Studio account.

---

## 🎨 UI/UX Philosophy
The system follows the **Apple Design Language** (ADL):
- **Glassmorphism**: Heavy use of `backdrop-blur-xl` and semi-transparent alpha layers.
- **Typography**: Optimized for San Francisco (system) and Inter fonts.
- **Micro-interactions**: Hover magnification on the Dock and traffic light animations for window controls.

---

## 🤝 Contact & Collaborations
Victor is open to high-impact collaborations and software architecture roles.

- **LinkedIn**: [/in/emkajnr](https://linkedin.com/in/emkajnr)
- **GitHub**: [@victorbjay](https://github.com/victorbjay)
- **Email**: okpevictor84@gmail.com

---
*Built with ❤️ in Abuja, Nigeria.*
