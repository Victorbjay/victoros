
import React from 'react';
import { Folder, Terminal, Compass, Music, Settings } from 'lucide-react';
import { useSystem } from '../context/SystemContext';
import { AppID } from '../types';

interface DockIconProps {
  id: AppID;
  icon: React.ReactNode;
  color: string;
}

const DockIcon: React.FC<DockIconProps> = ({ id, icon, color }) => {
  const { launchApp, openWindows, activeApp } = useSystem();
  const isOpen = openWindows.some(w => w.id === id);
  const isActive = activeApp === id;

  return (
    <div 
      onClick={() => launchApp(id)}
      className="group relative flex flex-col items-center transition-all duration-300 ease-out cursor-pointer dock-item-hover"
    >
      <div className={`w-12 h-12 rounded-xl flex items-center justify-center shadow-lg transition-transform group-active:scale-90 ${color}`}>
        {icon}
      </div>
      {isOpen && (
        <div className={`absolute -bottom-1 w-1 h-1 rounded-full ${isActive ? 'bg-white' : 'bg-white/40'}`} />
      )}
      <div className="absolute -top-10 opacity-0 group-hover:opacity-100 transition-opacity bg-black/50 backdrop-blur px-2 py-1 rounded text-white text-[10px] pointer-events-none whitespace-nowrap">
        {id.charAt(0).toUpperCase() + id.slice(1)}
      </div>
    </div>
  );
};

const Dock: React.FC = () => {
  return (
    <div className="fixed bottom-4 left-1/2 -translate-x-1/2 z-[1000]">
      <div className="bg-white/10 dark:bg-black/20 backdrop-blur-2xl border border-white/20 p-2 rounded-2xl flex items-center gap-2 shadow-2xl">
        <DockIcon id={AppID.FINDER} icon={<Folder className="text-white" />} color="bg-blue-500" />
        <DockIcon id={AppID.TERMINAL} icon={<Terminal className="text-white" />} color="bg-gray-800" />
        <DockIcon id={AppID.SAFARI} icon={<Compass className="text-white" />} color="bg-sky-400" />
        <DockIcon id={AppID.MUSIC} icon={<Music className="text-white" />} color="bg-pink-500" />
        <div className="w-[1px] h-8 bg-white/20 mx-1" />
        <DockIcon id={AppID.SETTINGS} icon={<Settings className="text-white" />} color="bg-slate-400" />
      </div>
    </div>
  );
};

export default Dock;
