
import React, { useState, useRef, useEffect } from 'react';
import { Folder, FileText, Zap, Lightbulb } from 'lucide-react';
import { useSystem } from '../context/SystemContext';
import { AppID } from '../types';

interface DesktopIconProps {
  id: string;
  name: string;
  x: number;
  y: number;
}

const DesktopIcon: React.FC<DesktopIconProps> = ({ id, name, x, y }) => {
  const { updateDesktopItemPosition, launchApp, desktopItems, lowPowerMode } = useSystem();
  const [isDragging, setIsDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const [isSelected, setIsSelected] = useState(false);
  const lastClickRef = useRef<number>(0);

  const item = desktopItems.find(i => i.id === id);

  const handleMouseDown = (e: React.MouseEvent) => {
    e.stopPropagation();
    const now = Date.now();
    
    // Desktop Double Click Action
    if (now - lastClickRef.current < 300) {
      if (item?.type === 'link' && item.url) {
        if (item.iconType === 'resume') {
          const link = document.createElement('a');
          link.href = item.url;
          link.download = "Victor_Emeka_Okpe_Resume.pdf";
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
        } else {
          window.open(item.url, '_blank');
        }
      } else if (item?.type === 'app' && item.appId) {
        launchApp(item.appId);
      } else {
        launchApp(AppID.FINDER);
      }
      return;
    }
    lastClickRef.current = now;

    setIsDragging(true);
    setIsSelected(true);
    setDragOffset({
      x: e.clientX - x,
      y: e.clientY - y
    });
  };

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (isDragging) {
        updateDesktopItemPosition(id, e.clientX - dragOffset.x, e.clientY - dragOffset.y);
      }
    };

    const handleMouseUp = () => {
      setIsDragging(false);
    };

    if (isDragging) {
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseup', handleMouseUp);
    }

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging, dragOffset, id, updateDesktopItemPosition]);

  useEffect(() => {
    const handleClickOutside = () => setIsSelected(false);
    window.addEventListener('mousedown', handleClickOutside);
    return () => window.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const renderIcon = () => {
    switch (item?.iconType) {
      case 'resume':
        return (
          <div className="relative group-hover:scale-110 transition-transform">
            <div className="bg-red-500 rounded-lg p-2.5 shadow-lg border border-red-400">
              <FileText size={32} className="text-white" />
            </div>
            <div className="absolute -bottom-1 -right-1 bg-white dark:bg-slate-800 rounded-full p-1 shadow border border-slate-200 dark:border-slate-700">
               <span className="text-[8px] font-black text-red-500 px-0.5">PDF</span>
            </div>
          </div>
        );
      case 'aura':
        return (
          <div className={`bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl p-2.5 shadow-lg border border-indigo-400 group-hover:scale-110 transition-all ${!lowPowerMode ? 'animate-pulse-glow' : ''}`}>
            <Zap size={32} className="text-white" />
          </div>
        );
      case 'tips':
        return (
          <div className="bg-gradient-to-br from-yellow-400 to-orange-500 rounded-2xl p-2.5 shadow-lg border border-yellow-300 group-hover:scale-110 transition-transform">
            <Lightbulb size={32} className="text-white" />
          </div>
        );
      case 'folder':
      default:
        return (
          <Folder size={48} className="text-blue-400 fill-blue-400/50 drop-shadow-md group-hover:scale-105 transition-transform" />
        );
    }
  };

  return (
    <div
      onMouseDown={handleMouseDown}
      className={`absolute flex flex-col items-center justify-center p-2 rounded-xl cursor-default select-none transition-shadow group ${isSelected ? 'bg-blue-500/30' : 'hover:bg-white/10'}`}
      style={{
        left: x,
        top: y,
        width: 90,
        zIndex: isDragging ? 100 : 10,
      }}
    >
      {renderIcon()}
      <span className="mt-1 text-[11px] font-bold text-white text-center drop-shadow-[0_1px_3px_rgba(0,0,0,1)] tracking-tight px-1.5 rounded truncate w-full">
        {name}
      </span>
    </div>
  );
};

export default DesktopIcon;
