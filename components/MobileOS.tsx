import React, { useState, useEffect } from "react";
import { useSystem } from "../context/SystemContext";
import { AppID } from "../types";
import {
  Folder,
  Terminal,
  Compass,
  Music,
  Settings,
  Search,
  Lock,
  ChevronUp,
  X,
  Sparkles,
  Lightbulb,
  Moon,
  Sun,
  Battery,
  ShieldCheck,
  Smartphone,
} from "lucide-react";
import FinderApp from "../apps/Finder";
import TerminalApp from "../apps/Terminal";
import SafariApp from "../apps/Safari";
import MusicApp from "../apps/Music";
import TipsApp from "../apps/Tips";
import { OWNER_NAME } from "../constants";

const MobileOS: React.FC = () => {
  const {
    activeMobileApp,
    setActiveMobileApp,
    theme,
    toggleTheme,
    launchApp,
    setSpotlightOpen,
    lowPowerMode,
    toggleLowPowerMode,
  } = useSystem();
  const [isLocked, setIsLocked] = useState(true);
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTime = (date: Date) =>
    date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  const formatDate = (date: Date) =>
    date.toLocaleDateString([], {
      weekday: "long",
      month: "long",
      day: "numeric",
    });

  if (isLocked) {
    return (
      <div className="fixed inset-0 z-[5000] flex flex-col items-center justify-between py-24 bg-black/40 backdrop-blur-3xl animate-in fade-in duration-700 select-none touch-none">
        <div className="absolute inset-0 z-0">
          <img
            src={
              theme === "dark"
                ? "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=2000&auto=format&fit=crop"
                : "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?q=80&w=2000&auto=format&fit=crop"
            }
            alt="Wallpaper"
            className="w-full h-full object-cover scale-110 blur-sm brightness-50 transition-all duration-1000"
          />
        </div>

        <div className="relative z-10 text-center">
          <div className="flex justify-center mb-4">
            <Lock size={20} className="text-white/60" />
          </div>
          <h1 className="text-8xl font-thin text-white mb-2 tracking-tighter">
            {formatTime(time)}
          </h1>
          <p className="text-xl font-medium text-white/70">
            {formatDate(time)}
          </p>
        </div>

        <div className="relative z-10 flex flex-col items-center gap-8 w-full px-12">
          <div className="flex justify-between w-full">
            <button
              onClick={toggleTheme}
              className="w-14 h-14 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center text-white active:scale-90 transition-transform border border-white/10"
            >
              {theme === "dark" ? <Moon size={24} /> : <Sun size={24} />}
            </button>
            <button className="w-14 h-14 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center text-white active:scale-90 transition-transform border border-white/10">
              <Smartphone size={24} />
            </button>
          </div>

          <div
            onClick={() => setIsLocked(false)}
            className="flex flex-col items-center gap-4 animate-bounce cursor-pointer group"
          >
            <ChevronUp
              size={24}
              className="text-white/40 group-hover:text-white transition-colors"
            />
            <span className="text-[10px] font-black text-white/60 uppercase tracking-[0.3em]">
              Swipe up to open
            </span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      className={`fixed inset-0 z-[1000] flex flex-col overflow-hidden transition-colors duration-700 ${
        theme === "dark" ? "bg-[#0f1115]" : "bg-slate-100"
      }`}
    >
      {/* Background Wallpaper */}
      <div className="absolute inset-0 z-0">
        <img
          src={
            theme === "dark"
              ? "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=2000&auto=format&fit=crop"
              : "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?q=80&w=2000&auto=format&fit=crop"
          }
          alt="Wallpaper"
          className="w-full h-full object-cover scale-110 pointer-events-none transition-all duration-1000"
        />
        <div
          className={`absolute inset-0 pointer-events-none transition-colors duration-1000 ${
            theme === "dark" ? "bg-black/40" : "bg-white/10"
          }`}
        />
      </div>

      {/* Top Status Bar */}
      <div className="relative z-20 h-12 flex items-end justify-between px-8 pb-1 text-white text-[13px] font-bold">
        <span>{formatTime(time)}</span>
        <div className="flex gap-2 items-center">
          <WifiSignal />
          <div
            className={`w-6 h-3 border rounded-[3px] relative ${
              lowPowerMode ? "border-yellow-400" : "border-white/40"
            }`}
          >
            <div
              className={`absolute top-0.5 left-0.5 bottom-0.5 right-1 rounded-[1px] ${
                lowPowerMode ? "bg-yellow-400" : "bg-white"
              }`}
            />
          </div>
        </div>
      </div>

      {/* Home Screen Content */}
      <main className="relative z-10 flex-1 p-6 flex flex-col justify-between pb-12">
        <div className="grid grid-cols-4 gap-6 mt-4">
          <MobileAppIcon
            id={AppID.FINDER}
            label="Finder"
            icon={<Folder className="text-white" />}
            color="bg-blue-500"
          />
          <MobileAppIcon
            id={AppID.TERMINAL}
            label="Terminal"
            icon={<Terminal className="text-white" />}
            color="bg-gray-800"
          />
          <MobileAppIcon
            id={AppID.SAFARI}
            label="Portfolio"
            icon={<Compass className="text-white" />}
            color="bg-sky-400"
          />
          <MobileAppIcon
            id={AppID.MUSIC}
            label="Music"
            icon={<Music className="text-white" />}
            color="bg-pink-500"
          />
          <MobileAppIcon
            id={AppID.SETTINGS}
            label="Settings"
            icon={<Settings className="text-white" />}
            color="bg-slate-400"
          />
          <MobileAppIcon
            id={AppID.TIPS}
            label="Guide"
            icon={<Lightbulb className="text-white" />}
            color="bg-yellow-500"
          />
        </div>

        {/* Search Bar mimicking iOS Spotlight */}
        <div
          onClick={() => setSpotlightOpen(true)}
          className="mx-4 h-12 bg-white/10 backdrop-blur-xl rounded-2xl flex items-center justify-center gap-2 border border-white/10 text-white/60 active:scale-95 transition-transform"
        >
          <Search size={16} />
          <span className="text-sm font-bold tracking-tight">
            Search VicBot
          </span>
        </div>
      </main>

      {/* Mobile App Container */}
      {activeMobileApp && (
        <div className="fixed inset-0 z-50 bg-black animate-in slide-in-from-bottom-10 duration-500 flex flex-col">
          <div className="h-14 flex items-center justify-between px-6 bg-black/20 border-b border-white/5 backdrop-blur-3xl">
            <span className="text-[10px] font-black text-white/30 uppercase tracking-[0.2em]">
              {activeMobileApp}
            </span>
            <button
              onClick={() => setActiveMobileApp(null)}
              className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-white active:bg-white/20"
            >
              <X size={16} />
            </button>
          </div>
          <div className="flex-1 overflow-auto custom-scrollbar bg-[#0a0a0a]">
            {activeMobileApp === AppID.FINDER && <FinderApp />}
            {activeMobileApp === AppID.TERMINAL && <TerminalApp />}
            {activeMobileApp === AppID.SAFARI && <SafariApp />}
            {activeMobileApp === AppID.MUSIC && <MusicApp />}
            {activeMobileApp === AppID.TIPS && <TipsApp />}
            {activeMobileApp === AppID.SETTINGS && (
              <div className="p-8 text-white h-full flex flex-col items-center">
                <div className="w-24 h-24 bg-gradient-to-br from-slate-700 to-slate-900 rounded-[2rem] flex items-center justify-center mb-6 shadow-2xl border border-white/10">
                  <Settings size={48} className="text-white/80" />
                </div>
                <h2 className="text-2xl font-black mb-1">Settings</h2>
                <p className="opacity-30 text-[10px] font-black uppercase tracking-[0.2em] mb-12">
                  VictorOS 14.2.1
                </p>

                <div className="w-full space-y-3">
                  <div className="bg-white/5 p-5 rounded-[1.5rem] border border-white/5">
                    <div className="flex items-center justify-between mb-6">
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 bg-indigo-500 rounded-xl flex items-center justify-center">
                          {theme === "dark" ? (
                            <Moon size={20} />
                          ) : (
                            <Sun size={20} />
                          )}
                        </div>
                        <span className="font-bold">Appearance</span>
                      </div>
                      <button
                        onClick={toggleTheme}
                        className={`w-14 h-8 rounded-full transition-colors relative ${
                          theme === "dark" ? "bg-indigo-600" : "bg-white/20"
                        }`}
                      >
                        <div
                          className={`absolute top-1 w-6 h-6 bg-white rounded-full transition-all ${
                            theme === "dark" ? "left-7" : "left-1"
                          }`}
                        />
                      </button>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 bg-yellow-500 rounded-xl flex items-center justify-center">
                          <Battery size={20} />
                        </div>
                        <span className="font-bold">Low Power Mode</span>
                      </div>
                      <button
                        onClick={toggleLowPowerMode}
                        className={`w-14 h-8 rounded-full transition-colors relative ${
                          lowPowerMode ? "bg-emerald-500" : "bg-white/20"
                        }`}
                      >
                        <div
                          className={`absolute top-1 w-6 h-6 bg-white rounded-full transition-all ${
                            lowPowerMode ? "left-7" : "left-1"
                          }`}
                        />
                      </button>
                    </div>
                  </div>

                  <div className="bg-white/5 p-5 rounded-[1.5rem] border border-white/5 space-y-4">
                    <div className="flex justify-between items-center">
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 bg-blue-500 rounded-xl flex items-center justify-center">
                          <ShieldCheck size={20} />
                        </div>
                        <span className="font-bold text-sm text-white/60">
                          Owner
                        </span>
                      </div>
                      <span className="font-bold text-sm">{OWNER_NAME}</span>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
          {/* Home Bar Indicator */}
          <div className="h-8 bg-black flex items-center justify-center pb-2">
            <div
              onClick={() => setActiveMobileApp(null)}
              className="w-36 h-1 bg-white/30 rounded-full cursor-pointer active:bg-white/60 transition-colors"
            />
          </div>
        </div>
      )}
    </div>
  );
};

const WifiSignal: React.FC = () => (
  <div className="flex items-end gap-[2px] h-3">
    <div className="w-[3px] h-[30%] bg-white rounded-[0.5px]" />
    <div className="w-[3px] h-[50%] bg-white rounded-[0.5px]" />
    <div className="w-[3px] h-[75%] bg-white rounded-[0.5px]" />
    <div className="w-[3px] h-[100%] bg-white rounded-[0.5px]" />
  </div>
);

const MobileAppIcon: React.FC<{
  id: AppID;
  label: string;
  icon: React.ReactElement;
  color: string;
}> = ({ id, label, icon, color }) => {
  const { launchApp } = useSystem();
  return (
    <div
      onClick={() => launchApp(id)}
      className="flex flex-col items-center gap-2 active:scale-90 transition-transform"
    >
      <div
        className={`w-16 h-16 ${color} rounded-[1.4rem] flex items-center justify-center shadow-2xl border border-white/10`}
      >
        {React.cloneElement(icon, { size: 34 } as any)}
      </div>
      <span className="text-[11px] font-bold text-white drop-shadow-md tracking-tight">
        {label}
      </span>
    </div>
  );
};

export default MobileOS;
