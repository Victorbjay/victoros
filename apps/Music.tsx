
import React, { useState, useEffect } from 'react';
import { Play, Pause, SkipBack, SkipForward, Repeat, Shuffle, Volume2, ListMusic } from 'lucide-react';
import { PLAYLIST } from '../constants';
import { useSystem } from '../context/SystemContext';

const MusicApp: React.FC = () => {
  const { isPlaying, setIsPlaying, currentTrackIndex, setCurrentTrackIndex } = useSystem();
  const currentSong = PLAYLIST[currentTrackIndex];

  const handleNext = () => {
    setCurrentTrackIndex((currentTrackIndex + 1) % PLAYLIST.length);
  };

  const handlePrev = () => {
    setCurrentTrackIndex((currentTrackIndex - 1 + PLAYLIST.length) % PLAYLIST.length);
  };

  return (
    <div className="flex h-full bg-[#0a0a0a] text-white">
      {/* Sidebar */}
      <div className="w-48 bg-black/40 border-r border-white/5 p-4 flex flex-col">
        <div className="flex items-center gap-2 px-2 mb-8">
          <div className="w-6 h-6 bg-pink-500 rounded-lg flex items-center justify-center">
            <ListMusic size={14} className="text-white" />
          </div>
          <span className="font-bold text-sm tracking-tight">Music</span>
        </div>
        
        <h3 className="text-[10px] font-bold text-white/30 uppercase mb-4 px-2 tracking-widest">Library</h3>
        <div className="space-y-1">
          {['Listen Now', 'Browse', 'Radio', 'Made For You'].map(item => (
            <div key={item} className={`px-3 py-2 rounded-xl text-sm transition-colors cursor-pointer ${item === 'Listen Now' ? 'bg-white/10 text-white' : 'text-white/50 hover:bg-white/5 hover:text-white'}`}>
              {item}
            </div>
          ))}
        </div>
        
        <h3 className="text-[10px] font-bold text-white/30 uppercase mt-8 mb-4 px-2 tracking-widest">Playlists</h3>
        <div className="space-y-1">
          <div className="px-3 py-2 rounded-xl text-sm bg-pink-600/20 text-pink-500 font-bold cursor-pointer">
            Coding Focus
          </div>
          <div className="px-3 py-2 rounded-xl text-sm text-white/50 hover:bg-white/5 cursor-pointer">
            Late Night Sessions
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col p-10 items-center justify-center relative overflow-hidden">
        {/* Background Blur Gradient */}
        <div className="absolute inset-0 z-0 opacity-20 blur-[120px] pointer-events-none">
          <div className="absolute top-0 left-0 w-96 h-96 bg-pink-500 rounded-full -translate-x-1/2 -translate-y-1/2" />
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-blue-500 rounded-full translate-x-1/2 translate-y-1/2" />
        </div>

        <div className="relative z-10 flex flex-col items-center">
          <div className={`relative group w-72 h-72 mb-10 transition-transform duration-1000 ease-out ${isPlaying ? 'scale-100 shadow-[0_40px_80px_rgba(0,0,0,0.6)]' : 'scale-90 opacity-60'}`}>
            <img 
              src={currentSong.cover} 
              alt="Album Cover" 
              className="w-full h-full rounded-[2rem] object-cover shadow-2xl"
            />
            {isPlaying && (
              <div className="absolute inset-x-0 bottom-6 flex items-end justify-center gap-1.5 h-12">
                {[...Array(12)].map((_, i) => (
                  <div 
                    key={i} 
                    className="w-1 bg-white/80 rounded-full animate-bounce" 
                    style={{ 
                      animationDuration: `${0.6 + Math.random() * 0.5}s`,
                      height: `${30 + Math.random() * 70}%` 
                    }}
                  />
                ))}
              </div>
            )}
          </div>

          <div className="text-center mb-10 max-w-sm">
            <h2 className="text-3xl font-black mb-1 tracking-tighter truncate">{currentSong.title}</h2>
            <p className="text-white/40 font-medium tracking-tight">{currentSong.artist}</p>
          </div>

          {/* Controls */}
          <div className="flex items-center gap-10 mb-10">
            <Shuffle size={18} className="text-white/20 hover:text-white transition-colors cursor-pointer" />
            <SkipBack 
              size={32} 
              className="fill-white hover:scale-110 active:scale-95 transition-all cursor-pointer" 
              onClick={handlePrev}
            />
            <div 
              onClick={() => setIsPlaying(!isPlaying)}
              className="w-16 h-16 rounded-full bg-white flex items-center justify-center text-black hover:scale-110 active:scale-90 transition-all cursor-pointer shadow-xl shadow-white/10"
            >
              {isPlaying ? <Pause size={28} fill="black" /> : <Play size={28} fill="black" className="ml-1" />}
            </div>
            <SkipForward 
              size={32} 
              className="fill-white hover:scale-110 active:scale-95 transition-all cursor-pointer" 
              onClick={handleNext}
            />
            <Repeat size={18} className="text-white/20 hover:text-white transition-colors cursor-pointer" />
          </div>

          <div className="flex items-center gap-4 w-48 text-white/30">
            <Volume2 size={16} />
            <div className="flex-1 h-1.5 bg-white/10 rounded-full overflow-hidden">
              <div className="h-full w-2/3 bg-white/60 rounded-full" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MusicApp;
