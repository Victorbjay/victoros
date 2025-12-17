
import React, { useState, useEffect, useRef } from 'react';
import { Search, Loader2 } from 'lucide-react';
import { useSystem } from '../context/SystemContext';
import { askVicBot } from '../services/gemini';

const Spotlight: React.FC = () => {
  const { spotlightOpen, setSpotlightOpen } = useSystem();
  const [query, setQuery] = useState('');
  const [answer, setAnswer] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (spotlightOpen) {
      inputRef.current?.focus();
      setQuery('');
      setAnswer(null);
    }
  }, [spotlightOpen]);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;

    setIsLoading(true);
    const response = await askVicBot(query);
    setAnswer(response);
    setIsLoading(false);
  };

  if (!spotlightOpen) return null;

  return (
    <div 
      className="fixed inset-0 z-[2000] flex items-start justify-center pt-[15vh] bg-black/10 backdrop-blur-sm"
      onClick={() => setSpotlightOpen(false)}
    >
      <div 
        className="w-[600px] bg-[#2d2d2d]/90 backdrop-blur-2xl rounded-2xl shadow-2xl border border-white/20 overflow-hidden"
        onClick={e => e.stopPropagation()}
      >
        <form onSubmit={handleSearch} className="flex items-center px-4 h-14 border-b border-white/10">
          <Search size={22} className="text-white/60 mr-3" />
          <input
            ref={inputRef}
            value={query}
            onChange={e => setQuery(e.target.value)}
            placeholder="Ask VicBot anything about Victor..."
            className="flex-1 bg-transparent border-none outline-none text-white text-lg placeholder:text-white/40"
          />
          {isLoading && <Loader2 size={20} className="text-white animate-spin" />}
        </form>
        
        {answer && (
          <div className="p-5 max-h-[400px] overflow-auto custom-scrollbar">
            <div className="text-white/40 text-[10px] uppercase font-bold tracking-widest mb-2">VicBot Response</div>
            <div className="text-white/90 text-sm leading-relaxed whitespace-pre-wrap">
              {answer}
            </div>
          </div>
        )}

        {!answer && !isLoading && (
          <div className="p-4 text-white/40 text-xs text-center border-t border-white/5">
            Press enter to search or escape to close
          </div>
        )}
      </div>
    </div>
  );
};

export default Spotlight;
