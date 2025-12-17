
import React, { useState, useEffect } from 'react';

const DesktopContextMenu: React.FC = () => {
  const [visible, setVisible] = useState(false);
  const [pos, setPos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleContextMenu = (e: MouseEvent) => {
      // Only show if clicking on the background (approximate check)
      if ((e.target as HTMLElement).id === 'desktop-bg') {
        e.preventDefault();
        setPos({ x: e.clientX, y: e.clientY });
        setVisible(true);
      } else {
        setVisible(false);
      }
    };

    const handleClick = () => setVisible(false);

    window.addEventListener('contextmenu', handleContextMenu);
    window.addEventListener('click', handleClick);
    return () => {
      window.removeEventListener('contextmenu', handleContextMenu);
      window.removeEventListener('click', handleClick);
    };
  }, []);

  if (!visible) return null;

  const MenuItem: React.FC<{ label: string; sub?: string; danger?: boolean }> = ({ label, sub, danger }) => (
    <div className={`px-3 py-1.5 rounded-md flex justify-between items-center text-[13px] transition-colors cursor-default ${danger ? 'text-red-400 hover:bg-red-500 hover:text-white' : 'hover:bg-blue-500 hover:text-white'}`}>
      <span>{label}</span>
      {sub && <span className="opacity-50 text-[11px]">{sub}</span>}
    </div>
  );

  return (
    <div 
      className="fixed z-[3000] w-64 bg-black/60 backdrop-blur-3xl rounded-xl p-1.5 border border-white/20 shadow-2xl text-white select-none animate-in fade-in zoom-in-95 duration-100"
      style={{ left: pos.x, top: pos.y }}
    >
      <MenuItem label="New Folder" />
      <div className="h-[1px] bg-white/10 my-1 mx-2" />
      <MenuItem label="Get Info" />
      <MenuItem label="Change Wallpaper..." />
      <div className="h-[1px] bg-white/10 my-1 mx-2" />
      <MenuItem label="Use Stacks" />
      <MenuItem label="Sort By" sub="Name" />
      <MenuItem label="Clean Up" />
      <div className="h-[1px] bg-white/10 my-1 mx-2" />
      <MenuItem label="Show View Options" />
    </div>
  );
};

export default DesktopContextMenu;
