
import React from 'react';
import { Wifi, Bluetooth, Radio, Moon, Sun, Volume2, Airplay, Layers, Battery, ChevronRight } from 'lucide-react';
import { useSystem } from '../context/SystemContext';
import { GITHUB_AVATAR_URL, OWNER_NAME } from '../constants';

const ControlCenter: React.FC = () => {
  const { controlCenterOpen, theme, toggleTheme, lowPowerMode, toggleLowPowerMode } = useSystem();

  if (!controlCenterOpen) return null;

  return (
    <div className="fixed top-9 right-4 w-[320px] bg-white/70 dark:bg-[#1d1d1f]/80 backdrop-blur-3xl rounded-[2rem] p-4 shadow-2xl border border-white/30 dark:border-white/10 z-[2000] animate-in fade-in zoom-in-95 duration-200 select-none">
      
      {/* User Identity Section */}
      <div className="bg-white/50 dark:bg-white/5 p-3 rounded-2xl flex items-center gap-3 mb-3 border border-white/20 hover:bg-white/60 dark:hover:bg-white/10 transition-colors cursor-pointer group">
        <img 
          src={GITHUB_AVATAR_URL} 
          alt="Profile" 
          className="w-10 h-10 rounded-full border border-white/20 shadow-md group-hover:scale-105 transition-transform"
        />
        <div className="flex-1">
          <div className="text-xs font-black text-slate-800 dark:text-white leading-tight">{OWNER_NAME} Emeka</div>
          <div className="text-[10px] text-slate-500 dark:text-white/40 font-medium">Fullstack Architect</div>
        </div>
        <ChevronRight size={14} className="text-slate-400" />
      </div>

      <div className="grid grid-cols-2 gap-3 mb-3">
        {/* Connectivity Block */}
        <div className="bg-white/50 dark:bg-white/5 p-4 rounded-2xl flex flex-col gap-4 border border-white/20">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center shadow-lg shadow-blue-500/20">
              <Wifi size={14} className="text-white" />
            </div>
            <div className="flex flex-col">
              <span className="text-[11px] font-bold text-slate-800 dark:text-white">Wi-Fi</span>
              <span className="text-[9px] text-slate-500 dark:text-white/60">Victor_Studio_5G</span>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-indigo-500 rounded-full flex items-center justify-center shadow-lg shadow-indigo-500/20">
              <Bluetooth size={14} className="text-white" />
            </div>
            <div className="flex flex-col">
              <span className="text-[11px] font-bold text-slate-800 dark:text-white">Bluetooth</span>
              <span className="text-[9px] text-slate-500 dark:text-white/60">Connected</span>
            </div>
          </div>
          <div className="flex items-center gap-3 opacity-60">
            <div className="w-8 h-8 bg-gray-500/50 rounded-full flex items-center justify-center">
              <Airplay size={14} className="text-white" />
            </div>
            <div className="flex flex-col">
              <span className="text-[11px] font-bold text-slate-800 dark:text-white">AirDrop</span>
              <span className="text-[9px] text-slate-500 dark:text-white/60">Off</span>
            </div>
          </div>
        </div>

        {/* Focus & Theme Toggles */}
        <div className="grid grid-rows-2 gap-3">
          <div 
            onClick={(e) => {
              e.stopPropagation();
              toggleTheme();
            }}
            className={`p-4 rounded-2xl flex flex-col justify-between cursor-pointer transition-all duration-300 border border-white/20 active:scale-95 ${theme === 'dark' ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-500/20' : 'bg-white/50 text-slate-800 hover:bg-white/80'}`}
          >
            <div className={`w-8 h-8 rounded-full flex items-center justify-center ${theme === 'dark' ? 'bg-white/20' : 'bg-slate-200'}`}>
              <Moon size={16} fill={theme === 'dark' ? 'white' : 'none'} />
            </div>
            <span className="text-[11px] font-black uppercase tracking-tight">Dark Mode</span>
          </div>
          <div 
            onClick={(e) => {
              e.stopPropagation();
              toggleLowPowerMode();
            }}
            className={`p-4 rounded-2xl flex flex-col justify-between cursor-pointer transition-all duration-300 border border-white/20 active:scale-95 ${lowPowerMode ? 'bg-yellow-500 text-white shadow-lg shadow-yellow-500/20' : 'bg-white/50 text-slate-800 hover:bg-white/80'}`}
          >
            <div className={`w-8 h-8 rounded-full flex items-center justify-center ${lowPowerMode ? 'bg-white/20' : 'bg-slate-200'}`}>
              <Battery size={16} fill={lowPowerMode ? 'white' : 'none'} />
            </div>
            <span className="text-[11px] font-black uppercase tracking-tight">Low Power</span>
          </div>
        </div>
      </div>

      {/* Sliders */}
      <div className="space-y-3">
        <div className="bg-white/50 dark:bg-white/5 p-4 rounded-2xl border border-white/20 shadow-sm">
          <div className="flex items-center justify-between mb-3">
            <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">Display</span>
            <span className="text-[10px] font-bold text-slate-500">80%</span>
          </div>
          <div className="flex items-center gap-4">
            <Sun size={14} className="text-orange-400" />
            <div className="flex-1 h-6 bg-slate-200 dark:bg-black/30 rounded-full relative overflow-hidden shadow-inner">
              <div className="absolute inset-y-0 left-0 w-[80%] bg-white dark:bg-white/80 rounded-full" />
            </div>
          </div>
        </div>
        <div className="bg-white/50 dark:bg-white/5 p-4 rounded-2xl border border-white/20 shadow-sm">
          <div className="flex items-center justify-between mb-3">
            <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">Audio</span>
            <span className="text-[10px] font-bold text-slate-500">45%</span>
          </div>
          <div className="flex items-center gap-4">
            <Volume2 size={14} className="text-blue-500" />
            <div className="flex-1 h-6 bg-slate-200 dark:bg-black/30 rounded-full relative overflow-hidden shadow-inner">
              <div className="absolute inset-y-0 left-0 w-[45%] bg-white dark:bg-white/80 rounded-full" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ControlCenter;
