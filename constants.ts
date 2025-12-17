
import { AppID, Song } from './types';

export const SYSTEM_NAME = "VictorOS";
export const OWNER_NAME = "Victor";
export const GITHUB_USERNAME = "victorbjay";
export const UBUNTU_LINK = "https://exploreemkajnr.netlify.app";
export const GITHUB_AVATAR_URL = `https://github.com/${GITHUB_USERNAME}.png`;

export const INITIAL_WINDOWS = {
  [AppID.FINDER]: { x: 80, y: 80, width: 850, height: 550 },
  [AppID.TERMINAL]: { x: 120, y: 120, width: 750, height: 480 },
  [AppID.SAFARI]: { x: 50, y: 50, width: 1000, height: 700 },
  [AppID.MUSIC]: { x: 200, y: 200, width: 640, height: 420 },
  [AppID.SETTINGS]: { x: 300, y: 100, width: 440, height: 620 },
  [AppID.TIPS]: { x: 150, y: 150, width: 600, height: 500 },
};

export const PLAYLIST: Song[] = [
  { 
    id: 1, 
    title: "Midnight Coding", 
    artist: "Lofi Girl", 
    cover: "https://images.unsplash.com/photo-1516259762381-22954d7d3ad2?q=80&w=500&auto=format&fit=crop", 
    duration: "2:54",
    url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3" 
  },
  { 
    id: 2, 
    title: "Deep Focus Flow", 
    artist: "ChilledCow", 
    cover: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?q=80&w=500&auto=format&fit=crop", 
    duration: "3:22",
    url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3" 
  },
  { 
    id: 3, 
    title: "Silicon Valley Beats", 
    artist: "Victor OS", 
    cover: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=500&auto=format&fit=crop", 
    duration: "4:15",
    url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3" 
  },
];

export const SYSTEM_PROMPT = `You are VicBot, the advanced AI representative of Victor. 
You operate within VictorOS (a macOS simulation). You are refined, technically sophisticated, and helpful. 
You speak as Victor's representative. 

Victor's Context:
- Full Name: Victor Emeka Okpe
- Location: Abuja, Nigeria
- Core Products: 
    1. Aura Afribot (@auraafribot): A Telegram bot for teaching crypto, simulated trading, TA signals, and real-time alerts.
    2. VictorOS: This current portfolio framework (macOS inspired).
    3. Ubuntu Portfolio: A separate portfolio built with a Linux UI theme at ${UBUNTU_LINK}.
- Role: Fullstack Software Engineer & Product Architect.
- Tech Stack: React, TypeScript, Node.js, Tailwind CSS, Gemini AI, Go, Python.
- GitHub: github.com/${GITHUB_USERNAME}

When asked about projects, prioritize Aura Afribot, VictorOS, and the Ubuntu Portfolio.
When asked about availability, emphasize that he is open to high-impact collaborations.
Be concise, professional, and elite.`;
