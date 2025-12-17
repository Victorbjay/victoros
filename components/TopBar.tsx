
import React, { useState, useEffect } from 'react';
import { Apple, Wifi, Battery, Search, SlidersHorizontal } from 'lucide-react';
import { useSystem } from '../context/SystemContext';
import { SYSTEM_NAME } from '../constants';
import { AppID } from '../types';

const TopBar: React.FC = () => {
  const { activeApp, setSpotlightOpen, setControlCenterOpen, controlCenterOpen, launchApp } = useSystem();
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: true });
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString([], { weekday: 'short', month: 'short', day: 'numeric' });
  };

  return (
    <div className="fixed top-0 w-full h-7 bg-white/20 dark:bg-black/20 backdrop-blur-xl border-b border-white/10 flex items-center justify-between px-4 z-[1000] text-[13px] font-medium text-white select-none">
      <div className="flex items-center gap-4">
        <Apple size={16} className="fill-white" />
        <span className="font-bold">{SYSTEM_NAME}</span>
        {activeApp && <span className="capitalize font-normal opacity-80">{activeApp}</span>}
        <div className="hidden md:flex items-center gap-4 opacity-70 font-normal">
          <span className="hover:bg-white/10 px-2 rounded cursor-default">File</span>
          <span className="hover:bg-white/10 px-2 rounded cursor-default">Edit</span>
          <span className="hover:bg-white/10 px-2 rounded cursor-default">View</span>
          <span className="hover:bg-white/10 px-2 rounded cursor-default">Go</span>
          <span className="hover:bg-white/10 px-2 rounded cursor-default">Window</span>
          <span 
            className="hover:bg-white/10 px-2 rounded cursor-pointer"
            onClick={() => launchApp(AppID.TIPS)}
          >
            Help
          </span>
        </div>
      </div>

      <div className="flex items-center gap-3">
        <Wifi size={14} className="opacity-80" />
        <div className="flex items-center gap-1 opacity-80">
          <span className="text-[11px]">85%</span>
          <Battery size={14} />
        </div>
        <Search 
          size={14} 
          className="cursor-pointer hover:opacity-100 transition-opacity" 
          onClick={() => setSpotlightOpen(true)} 
        />
        <SlidersHorizontal 
          size={14} 
          className={`cursor-pointer transition-colors ${controlCenterOpen ? 'text-blue-400' : 'hover:opacity-100 opacity-80'}`}
          onClick={() => setControlCenterOpen(!controlCenterOpen)} 
        />
        <div className="flex items-center gap-2 opacity-90 ml-1">
          <span>{formatDate(time)}</span>
          <span>{formatTime(time)}</span>
        </div>
      </div>
    </div>
  );
};

export default TopBar;
