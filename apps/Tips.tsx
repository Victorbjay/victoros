
import React, { useState } from 'react';
import { Lightbulb, MousePointer2, Layout, Search, Command, Music, Terminal, Globe, ChevronRight, ChevronLeft } from 'lucide-react';

const TIPS_CONTENT = [
  {
    id: 'welcome',
    title: 'Welcome to VictorOS',
    description: 'A professional, interactive macOS simulation showcasing Victor Emeka\'s engineering expertise. Use this guide to learn how to navigate.',
    icon: <Lightbulb className="text-yellow-400" size={32} />,
    color: 'bg-yellow-500/10'
  },
  {
    id: 'windows',
    title: 'Managing Windows',
    description: 'Just like on a Mac, use the "Traffic Light" buttons in the top-left to Close (Red), Minimize (Yellow), or Zoom (Green). Drag the title bar to move windows.',
    icon: <Layout className="text-blue-400" size={32} />,
    color: 'bg-blue-500/10'
  },
  {
    id: 'spotlight',
    title: 'Meet VicBot (AI)',
    description: 'Need information quickly? Press Cmd+K (or click the search icon in the top bar) to open Spotlight. Ask VicBot anything about Victor\'s career or projects.',
    icon: <Search className="text-purple-400" size={32} />,
    color: 'bg-purple-500/10'
  },
  {
    id: 'apps',
    title: 'The Dock & Apps',
    description: 'The Dock at the bottom holds your primary apps. Open Finder to see GitHub projects, Safari to view the traditional portfolio, or Terminal for dev-mode.',
    icon: <Globe className="text-sky-400" size={32} />,
    color: 'bg-sky-500/10'
  },
  {
    id: 'music',
    title: 'Coding Focus',
    description: 'Listen to curated coding focus beats while exploring. Control playback using the Music app or the Control Center in the top right.',
    icon: <Music className="text-pink-400" size={32} />,
    color: 'bg-pink-500/10'
  }
];

const TipsApp: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const currentTip = TIPS_CONTENT[activeIndex];

  const next = () => setActiveIndex(prev => (prev + 1) % TIPS_CONTENT.length);
  const prev = () => setActiveIndex(prev => (prev - 1 + TIPS_CONTENT.length) % TIPS_CONTENT.length);

  return (
    <div className="h-full flex flex-col bg-white dark:bg-[#1e1e1e] text-slate-800 dark:text-white select-none">
      <div className="flex-1 flex flex-col items-center justify-center p-8 text-center animate-in fade-in zoom-in-95 duration-300" key={currentTip.id}>
        <div className={`w-20 h-20 ${currentTip.color} rounded-[2rem] flex items-center justify-center mb-6 shadow-sm border border-black/5 dark:border-white/5`}>
          {currentTip.icon}
        </div>
        <h2 className="text-3xl font-black tracking-tighter mb-4 leading-tight">{currentTip.title}</h2>
        <p className="text-slate-500 dark:text-slate-400 text-base font-medium max-w-sm leading-relaxed">
          {currentTip.description}
        </p>
      </div>

      <div className="h-20 border-t border-black/5 dark:border-white/5 flex items-center justify-between px-8 bg-slate-50 dark:bg-white/5">
        <div className="flex gap-1.5">
          {TIPS_CONTENT.map((_, i) => (
            <div 
              key={i} 
              className={`h-1.5 rounded-full transition-all duration-300 ${i === activeIndex ? 'w-6 bg-blue-500' : 'w-1.5 bg-slate-300 dark:bg-white/10'}`} 
            />
          ))}
        </div>
        
        <div className="flex gap-3">
          <button 
            onClick={prev}
            className="w-10 h-10 rounded-full bg-white dark:bg-white/10 border border-black/10 dark:border-white/10 flex items-center justify-center hover:bg-slate-100 dark:hover:bg-white/20 transition-colors"
          >
            <ChevronLeft size={20} />
          </button>
          <button 
            onClick={next}
            className="px-6 h-10 rounded-full bg-blue-600 text-white font-bold text-sm flex items-center gap-2 hover:bg-blue-700 transition-colors shadow-lg shadow-blue-500/20"
          >
            {activeIndex === TIPS_CONTENT.length - 1 ? 'Finish' : 'Next Tip'} <ChevronRight size={16} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default TipsApp;
