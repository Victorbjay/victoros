
import React, { createContext, useContext, useState, useCallback, useEffect, useRef } from 'react';
import { AppID, WindowState } from '../types';
import { INITIAL_WINDOWS, PLAYLIST } from '../constants';

export interface DesktopItem {
  id: string;
  name: string;
  type: 'folder' | 'link' | 'app';
  iconType: 'folder' | 'resume' | 'aura' | 'tips';
  x: number;
  y: number;
  url?: string;
  appId?: AppID;
}

interface SystemContextType {
  openWindows: WindowState[];
  activeApp: AppID | null;
  isBooted: boolean;
  spotlightOpen: boolean;
  controlCenterOpen: boolean;
  isPlaying: boolean;
  currentTrackIndex: number;
  theme: 'light' | 'dark';
  lowPowerMode: boolean;
  isMobile: boolean;
  activeMobileApp: AppID | null;
  desktopItems: DesktopItem[];
  toggleTheme: () => void;
  toggleLowPowerMode: () => void;
  setControlCenterOpen: (open: boolean) => void;
  setSpotlightOpen: (open: boolean) => void;
  setIsPlaying: (playing: boolean) => void;
  setCurrentTrackIndex: (index: number) => void;
  launchApp: (id: AppID) => void;
  closeApp: (id: AppID) => void;
  minimizeApp: (id: AppID) => void;
  focusApp: (id: AppID) => void;
  setActiveMobileApp: (id: AppID | null) => void;
  updateWindowPosition: (id: AppID, x: number, y: number) => void;
  updateWindowSize: (id: AppID, width: number, height: number) => void;
  updateDesktopItemPosition: (id: string, x: number, y: number) => void;
  boot: () => void;
}

const SystemContext = createContext<SystemContextType | undefined>(undefined);

export const SystemProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [openWindows, setOpenWindows] = useState<WindowState[]>([]);
  const [activeApp, setActiveApp] = useState<AppID | null>(null);
  const [activeMobileApp, setActiveMobileApp] = useState<AppID | null>(null);
  const [isBooted, setIsBooted] = useState(false);
  const [spotlightOpen, setSpotlightOpen] = useState(false);
  const [controlCenterOpen, setControlCenterOpen] = useState(false);
  const [maxZIndex, setMaxZIndex] = useState(50);
  const [theme, setTheme] = useState<'light' | 'dark'>('dark');
  const [lowPowerMode, setLowPowerMode] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  const [desktopItems, setDesktopItems] = useState<DesktopItem[]>([
    { id: 'projects', name: 'Projects', type: 'folder', iconType: 'folder', x: 20, y: 50 },
    { id: 'aura-link', name: 'Aura Afribot', type: 'link', iconType: 'aura', url: 'https://t.me/auraafribot', x: 20, y: 150 },
    { id: 'resume-link', name: 'My Resume', type: 'link', iconType: 'resume', url: './resume.pdf', x: 20, y: 250 },
    { id: 'user-guide', name: 'User Guide', type: 'app', iconType: 'tips', appId: AppID.TIPS, x: 20, y: 350 },
  ]);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Music State
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    if (!audioRef.current) {
      audioRef.current = new Audio(PLAYLIST[currentTrackIndex].url);
      audioRef.current.onended = () => {
        setCurrentTrackIndex(prev => (prev + 1) % PLAYLIST.length);
      };
    } else {
      audioRef.current.src = PLAYLIST[currentTrackIndex].url;
      if (isPlaying) audioRef.current.play().catch(() => setIsPlaying(false));
    }
  }, [currentTrackIndex]);

  useEffect(() => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.play().catch(() => setIsPlaying(false));
      } else {
        audioRef.current.pause();
      }
    }
  }, [isPlaying]);

  const toggleTheme = useCallback(() => {
    setTheme(prev => prev === 'light' ? 'dark' : 'light');
  }, []);

  const toggleLowPowerMode = useCallback(() => {
    setLowPowerMode(prev => !prev);
  }, []);

  const boot = useCallback(() => {
    setIsBooted(true);
  }, []);

  const focusApp = useCallback((id: AppID) => {
    if (isMobile) {
      setActiveMobileApp(id);
      return;
    }
    setOpenWindows(prev => prev.map(w => {
      if (w.id === id) {
        const nextZ = maxZIndex + 1;
        setMaxZIndex(nextZ);
        return { ...w, zIndex: nextZ, isMinimized: false };
      }
      return w;
    }));
    setActiveApp(id);
    setControlCenterOpen(false);
  }, [maxZIndex, isMobile]);

  const launchApp = useCallback((id: AppID) => {
    if (isMobile) {
      setActiveMobileApp(id);
      return;
    }
    setOpenWindows(prev => {
      const exists = prev.find(w => w.id === id);
      if (exists) {
        focusApp(id);
        return prev;
      }

      const config = INITIAL_WINDOWS[id];
      const nextZ = maxZIndex + 1;
      setMaxZIndex(nextZ);
      
      const newWindow: WindowState = {
        id,
        title: id.charAt(0).toUpperCase() + id.slice(1),
        isOpen: true,
        isMinimized: false,
        zIndex: nextZ,
        ...config
      };
      
      return [...prev, newWindow];
    });
    setActiveApp(id);
    setControlCenterOpen(false);
  }, [focusApp, maxZIndex, isMobile]);

  const closeApp = useCallback((id: AppID) => {
    setOpenWindows(prev => prev.filter(w => w.id !== id));
    if (activeApp === id) setActiveApp(null);
  }, [activeApp]);

  const minimizeApp = useCallback((id: AppID) => {
    setOpenWindows(prev => prev.map(w => w.id === id ? { ...w, isMinimized: true } : w));
    setActiveApp(null);
  }, []);

  const updateWindowPosition = useCallback((id: AppID, x: number, y: number) => {
    setOpenWindows(prev => prev.map(w => w.id === id ? { ...w, x, y } : w));
  }, []);

  const updateWindowSize = useCallback((id: AppID, width: number, height: number) => {
    setOpenWindows(prev => prev.map(w => w.id === id ? { ...w, width, height } : w));
  }, []);

  const updateDesktopItemPosition = useCallback((id: string, x: number, y: number) => {
    setDesktopItems(prev => prev.map(item => item.id === id ? { ...item, x, y } : item));
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setSpotlightOpen(prev => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <SystemContext.Provider value={{
      openWindows,
      activeApp,
      isBooted,
      spotlightOpen,
      controlCenterOpen,
      isPlaying,
      currentTrackIndex,
      theme,
      lowPowerMode,
      isMobile,
      activeMobileApp,
      desktopItems,
      toggleTheme,
      toggleLowPowerMode,
      setIsPlaying,
      setCurrentTrackIndex,
      setControlCenterOpen,
      setSpotlightOpen,
      launchApp,
      closeApp,
      minimizeApp,
      focusApp,
      setActiveMobileApp,
      updateWindowPosition,
      updateWindowSize,
      updateDesktopItemPosition,
      boot
    }}>
      {children}
    </SystemContext.Provider>
  );
};

export const useSystem = () => {
  const context = useContext(SystemContext);
  if (!context) throw new Error('useSystem must be used within SystemProvider');
  return context;
};
