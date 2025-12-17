
import React, { useState, useRef, useEffect } from 'react';
import { useSystem } from '../context/SystemContext';
import { AppID } from '../types';

interface WindowProps {
  id: AppID;
  title: string;
  children: React.ReactNode;
}

const Window: React.FC<WindowProps> = ({ id, title, children }) => {
  const { openWindows, activeApp, focusApp, closeApp, minimizeApp, updateWindowPosition, updateWindowSize, theme } = useSystem();
  const windowState = openWindows.find(w => w.id === id);
  const [isDragging, setIsDragging] = useState(false);
  const [isResizing, setIsResizing] = useState(false);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const [initialSize, setInitialSize] = useState({ w: 0, h: 0 });
  const windowRef = useRef<HTMLDivElement>(null);

  if (!windowState || windowState.isMinimized) return null;

  const handleMouseDown = (e: React.MouseEvent) => {
    focusApp(id);
    if ((e.target as HTMLElement).closest('.window-titlebar')) {
      setIsDragging(true);
      setDragOffset({
        x: e.clientX - windowState.x,
        y: e.clientY - windowState.y
      });
    }
  };

  const handleResizeStart = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsResizing(true);
    setDragOffset({ x: e.clientX, y: e.clientY });
    setInitialSize({ w: windowState.width, h: windowState.height });
  };

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (isDragging) {
        updateWindowPosition(id, e.clientX - dragOffset.x, e.clientY - dragOffset.y);
      } else if (isResizing) {
        const deltaX = e.clientX - dragOffset.x;
        const deltaY = e.clientY - dragOffset.y;
        updateWindowSize(id, Math.max(300, initialSize.w + deltaX), Math.max(200, initialSize.h + deltaY));
      }
    };

    const handleMouseUp = () => {
      setIsDragging(false);
      setIsResizing(false);
    };

    if (isDragging || isResizing) {
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseup', handleMouseUp);
    }

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging, isResizing, dragOffset, initialSize, id, updateWindowPosition, updateWindowSize]);

  const isActive = activeApp === id;

  return (
    <div
      ref={windowRef}
      onMouseDown={handleMouseDown}
      className={`absolute rounded-xl overflow-hidden glass window-shadow flex flex-col transition-[box-shadow,ring] duration-200 border border-white/20 ${isActive ? 'ring-1 ring-white/30 z-[50]' : 'opacity-95 z-[40]'}`}
      style={{
        left: windowState.x,
        top: windowState.y,
        width: windowState.width,
        height: windowState.height,
        zIndex: windowState.zIndex,
      }}
    >
      {/* Title Bar */}
      <div className={`window-titlebar h-10 flex items-center px-4 cursor-default select-none border-b transition-colors duration-500 ${theme === 'dark' ? 'bg-[#2d2d2d]/60 border-white/5 text-white/80' : 'bg-white/60 border-black/5 text-slate-700'}`}>
        <div className="flex gap-2 mr-4">
          <div 
            onClick={(e) => { e.stopPropagation(); closeApp(id); }}
            className="w-3.5 h-3.5 rounded-full bg-[#FF5F56] border border-black/10 hover:brightness-90 cursor-pointer flex items-center justify-center group" 
          >
            <div className="w-1.5 h-1.5 opacity-0 group-hover:opacity-100 transition-opacity">
              <svg viewBox="0 0 10 10" className="w-full h-full fill-black/60"><path d="M1 1l8 8M1 9l8-8" stroke="currentColor" strokeWidth="1.2" /></svg>
            </div>
          </div>
          <div 
            onClick={(e) => { e.stopPropagation(); minimizeApp(id); }}
            className="w-3.5 h-3.5 rounded-full bg-[#FFBD2E] border border-black/10 hover:brightness-90 cursor-pointer flex items-center justify-center group" 
          >
            <div className="w-1.5 h-1.5 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity" style={{ height: '1px', width: '6px' }} />
          </div>
          <div className="w-3.5 h-3.5 rounded-full bg-[#27C93F] border border-black/10 hover:brightness-90 cursor-pointer flex items-center justify-center group">
             <div className="w-1.5 h-1.5 opacity-0 group-hover:opacity-100 transition-opacity">
              <svg viewBox="0 0 10 10" className="w-full h-full fill-black/60"><path d="M1 5l3 3 5-7" stroke="currentColor" strokeWidth="1.2" fill="none" /></svg>
            </div>
          </div>
        </div>
        <div className="flex-1 text-center text-[13px] font-bold tracking-tight pr-12">
          {title}
        </div>
      </div>

      {/* Content */}
      <div className={`flex-1 overflow-hidden transition-colors duration-500 ${theme === 'dark' ? 'bg-[#1e1e1e]/90' : 'bg-white/90'}`}>
        {children}
      </div>

      {/* Resize Handle */}
      <div 
        onMouseDown={handleResizeStart}
        className="absolute bottom-0 right-0 w-5 h-5 cursor-nwse-resize z-[60]"
      />
    </div>
  );
};

export default Window;
