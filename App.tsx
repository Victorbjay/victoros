
import React, { useState, useEffect } from 'react';
import { SystemProvider, useSystem } from './context/SystemContext';
import TopBar from './components/TopBar';
import Dock from './components/Dock';
import Window from './components/Window';
import Spotlight from './components/Spotlight';
import ControlCenter from './components/ControlCenter';
import DesktopContextMenu from './components/DesktopContextMenu';
import DesktopIcon from './components/DesktopIcon';
import MobileOS from './components/MobileOS';
import { AppID } from './types';
import FinderApp from './apps/Finder';
import TerminalApp from './apps/Terminal';
import SafariApp from './apps/Safari';
import MusicApp from './apps/Music';
import TipsApp from './apps/Tips';
import { Apple, Cpu, MemoryStick, Fingerprint, Globe, ShieldCheck } from 'lucide-react';
import { GITHUB_AVATAR_URL } from './constants';

const BootScreen: React.FC<{ onComplete: () => void }> = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(timer);
          setTimeout(onComplete, 500);
          return 100;
        }
        return prev + 1;
      });
    }, 30);
    return () => clearInterval(timer);
  }, [onComplete]);

  return (
    <div className="fixed inset-0 bg-black flex flex-col items-center justify-center z-[5000]">
      <Apple size={80} className="fill-white mb-12" />
      <div className="w-64 h-[3px] bg-white/20 rounded-full overflow-hidden">
        <div className="h-full bg-white transition-all duration-300 ease-out" style={{ width: `${progress}%` }} />
      </div>
    </div>
  );
};

const DesktopLayout: React.FC = () => {
  const { openWindows, desktopItems } = useSystem();
  return (
    <>
      <TopBar />
      <main className="relative w-full h-full pt-7 pb-20 pointer-events-none">
        <div className="w-full h-full pointer-events-auto relative">
          {desktopItems.map(item => (
            <DesktopIcon 
              key={item.id} 
              id={item.id} 
              name={item.name} 
              x={item.x} 
              y={item.y} 
            />
          ))}

          {openWindows.map(window => (
            <Window key={window.id} id={window.id} title={window.title}>
              {window.id === AppID.FINDER && <FinderApp />}
              {window.id === AppID.TERMINAL && <TerminalApp />}
              {window.id === AppID.SAFARI && <SafariApp />}
              {window.id === AppID.MUSIC && <MusicApp />}
              {window.id === AppID.TIPS && <TipsApp />}
              {window.id === AppID.SETTINGS && (
                <div className="p-8 text-white h-full flex flex-col items-center bg-black/40 backdrop-blur-3xl custom-scrollbar overflow-auto">
                  <div className="relative group mb-6">
                    <div className="absolute inset-0 bg-blue-500 blur-3xl opacity-30 group-hover:opacity-50 transition-opacity" />
                    <div className="w-36 h-36 rounded-full overflow-hidden border-4 border-white/20 relative z-10 bg-gray-900 shadow-2xl ring-4 ring-blue-500/20">
                      <video 
                        className="w-full h-full object-cover" 
                        autoPlay 
                        loop 
                        muted 
                        playsInline
                        poster={GITHUB_AVATAR_URL}
                      >
                        <source src="https://assets.mixkit.co/videos/preview/mixkit-abstract-flowing-light-particles-loop-3038-large.mp4" type="video/mp4" />
                      </video>
                      <img 
                        src={GITHUB_AVATAR_URL} 
                        alt="Profile" 
                        className="absolute inset-0 w-full h-full object-cover opacity-60 mix-blend-overlay pointer-events-none"
                      />
                    </div>
                    <div className="absolute -bottom-2 -right-2 bg-emerald-500 rounded-full p-2 z-20 border-2 border-[#1e1e1e] shadow-lg">
                      <ShieldCheck size={18} className="text-white" />
                    </div>
                  </div>

                  <h2 className="text-3xl font-black mb-1 tracking-tighter">VictorOS <span className="text-blue-400">Sonoma</span></h2>
                  <p className="opacity-40 text-xs font-black uppercase tracking-[0.2em] mb-8">Version 14.2.1 • Late 2024</p>
                  
                  <div className="w-full max-w-sm space-y-3 text-left">
                    <div className="bg-white/5 p-4 rounded-2xl flex items-center gap-4 border border-white/10 hover:bg-white/10 transition-colors group">
                      <div className="w-10 h-10 bg-indigo-500/20 rounded-xl flex items-center justify-center text-indigo-400 group-hover:scale-110 transition-transform">
                        <Cpu size={20} />
                      </div>
                      <div className="flex-1">
                        <div className="text-[10px] text-white/40 uppercase font-black tracking-widest">Processor</div>
                        <div className="text-sm font-bold">Apple M3 Max (16-core)</div>
                      </div>
                    </div>

                    <div className="bg-white/5 p-4 rounded-2xl flex items-center gap-4 border border-white/10 hover:bg-white/10 transition-colors group">
                      <div className="w-10 h-10 bg-emerald-500/20 rounded-xl flex items-center justify-center text-emerald-400 group-hover:scale-110 transition-transform">
                        <MemoryStick size={20} />
                      </div>
                      <div className="flex-1">
                        <div className="text-[10px] text-white/40 uppercase font-black tracking-widest">Memory</div>
                        <div className="text-sm font-bold">64 GB Unified LPDDR5x</div>
                      </div>
                    </div>

                    <div className="bg-white/5 p-4 rounded-2xl flex items-center gap-4 border border-white/10 hover:bg-white/10 transition-colors group">
                      <div className="w-10 h-10 bg-pink-500/20 rounded-xl flex items-center justify-center text-pink-400 group-hover:scale-110 transition-transform">
                        <Fingerprint size={20} />
                      </div>
                      <div className="flex-1">
                        <div className="text-[10px] text-white/40 uppercase font-black tracking-widest">System Serial</div>
                        <div className="text-sm font-mono font-bold">V1CT-0RBJ-AY24-OSXV</div>
                      </div>
                    </div>

                    <div className="bg-white/5 p-4 rounded-2xl flex items-center gap-4 border border-white/10 hover:bg-white/10 transition-colors group">
                      <div className="w-10 h-10 bg-blue-500/20 rounded-xl flex items-center justify-center text-blue-400 group-hover:scale-110 transition-transform">
                        <Globe size={20} />
                      </div>
                      <div className="flex-1">
                        <div className="text-[10px] text-white/40 uppercase font-black tracking-widest">Region</div>
                        <div className="text-sm font-bold">Abuja, Nigeria (GMT+1)</div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </Window>
          ))}
        </div>
      </main>
      <Dock />
      <DesktopContextMenu />
    </>
  );
};

const Desktop: React.FC = () => {
  const { isBooted, boot, theme, lowPowerMode, isMobile } = useSystem();

  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
      document.body.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
      document.body.classList.remove('dark');
    }

    if (lowPowerMode) {
      document.body.classList.add('low-power');
    } else {
      document.body.classList.remove('low-power');
    }
  }, [theme, lowPowerMode]);

  if (!isBooted) {
    return <BootScreen onComplete={boot} />;
  }

  return (
    <div className={`relative w-screen h-screen overflow-hidden transition-colors duration-700 ${theme === 'dark' ? 'dark bg-[#0f1115]' : 'bg-slate-100'}`}>
      
      {/* Universal Desktop Wallpaper (hidden on mobile home screen but used for overall theme) */}
      {!isMobile && (
        <div id="desktop-bg" className="absolute inset-0 z-0">
          <img 
            src={theme === 'dark' 
              ? "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=2000&auto=format&fit=crop" 
              : "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?q=80&w=2000&auto=format&fit=crop"
            } 
            alt="Wallpaper" 
            className="w-full h-full object-cover scale-105 pointer-events-none transition-all duration-1000"
          />
          <div className={`absolute inset-0 pointer-events-none transition-colors duration-1000 ${theme === 'dark' ? 'bg-black/60' : 'bg-white/10'}`} />
        </div>
      )}

      {isMobile ? <MobileOS /> : <DesktopLayout />}

      <Spotlight />
      <ControlCenter />
    </div>
  );
};

const App: React.FC = () => {
  return (
    <SystemProvider>
      <Desktop />
    </SystemProvider>
  );
};

export default App;
