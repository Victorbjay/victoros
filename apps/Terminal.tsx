
import React, { useState, useRef, useEffect } from 'react';
import { TerminalLine } from '../types';
import { askVicBot } from '../services/gemini';
import { OWNER_NAME } from '../constants';

const TerminalApp: React.FC = () => {
  const [lines, setLines] = useState<TerminalLine[]>([
    { type: 'output', content: `Welcome to VictorOS Terminal v1.0.0` },
    { type: 'output', content: `Type 'help' for available commands.` }
  ]);
  const [input, setInput] = useState('');
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [lines]);

  const handleCommand = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    const cmd = input.trim().toLowerCase();
    const newLines: TerminalLine[] = [...lines, { type: 'input', content: input }];
    setLines(newLines);
    setInput('');

    if (cmd === 'help') {
      setLines(prev => [...prev, { type: 'output', content: 'Available commands: help, clear, neofetch, whoami, skills, aura, contact, sudo' }]);
    } else if (cmd === 'clear') {
      setLines([]);
    } else if (cmd === 'whoami') {
      setLines(prev => [...prev, { type: 'output', content: `${OWNER_NAME} - Fullstack Software Engineer and Creative Technologist.` }]);
    } else if (cmd === 'neofetch') {
      const fetchOutput = `
      .-.      victor@MacBook-Pro
     oo|       ------------------
    /` + '` ' + `\\      OS: VictorOS 14.2 (Sonoma)
   (/ /)     Host: MacBook Pro M3 Max
   ' '       Kernel: 23.2.0
             Uptime: ${Math.floor(Math.random() * 10) + 1} hours
             Packages: 420 (brew)
             Shell: zsh 5.9
             Resolution: 3024x1964
             DE: Quartz
             Terminal: VictorTerm
             CPU: Apple M3 Max (16)
             GPU: Apple M3 Max
             Memory: 64GB
      `;
      setLines(prev => [...prev, { type: 'output', content: fetchOutput }]);
    } else if (cmd === 'skills') {
      setLines(prev => [...prev, { type: 'output', content: 'Indexing technical capabilities...' }]);
      setTimeout(() => {
        setLines(prev => [...prev, { type: 'output', content: 'Languages: TypeScript, JavaScript, Go, Python, SQL, HTML/CSS\nFrameworks: React, Next.js, Node.js, Tailwind, Echo, Fiber\nInfrastructure: AWS, Docker, Kubernetes, Terraform, Nginx\nIntelligence: OpenAI SDK, Gemini API, LangChain, Pinecone' }]);
      }, 500);
    } else if (cmd === 'aura') {
      const auraArt = `
      █████╗ ██╗   ██╗██████╗  █████╗ 
     ██╔══██╗██║   ██║██╔══██╗██╔══██╗
     ███████║██║   ██║██████╔╝███████║
     ██╔══██║██║   ██║██╔══██╗██╔══██║
     ██║  ██║╚██████╔╝██║  ██║██║  ██║
     ╚═╝  ╚═╝ ╚═════╝ ╚═╝  ╚═╝╚═╝  ╚═╝
     Aura Afribot: Building the future of finance.
     Visit: https://t.me/auraafribot
      `;
      setLines(prev => [...prev, { type: 'output', content: auraArt }]);
    } else if (cmd === 'sudo') {
      setLines(prev => [...prev, { type: 'error', content: 'Nice try, but you don\'t have root access to Victor\'s brain yet. Request permission via email?' }]);
    } else if (cmd === 'contact') {
      setLines(prev => [...prev, { type: 'output', content: 'Email: okpevictor84@gmail.com | LinkedIn: /in/emkajnr' }]);
    } else {
      // AI Fallback
      setLines(prev => [...prev, { type: 'output', content: 'VicBot: Thinking...' }]);
      const response = await askVicBot(`Terminal command/query: ${cmd}`);
      setLines(prev => {
        const filtered = prev.filter(l => l.content !== 'VicBot: Thinking...');
        return [...filtered, { type: 'ai', content: `VicBot: ${response}` }];
      });
    }
  };

  return (
    <div className="flex flex-col h-full bg-[#1e1e1e] text-[#f0f0f0] font-mono text-sm p-4 custom-scrollbar">
      <div className="flex-1 overflow-auto">
        {lines.map((line, i) => (
          <div key={i} className="mb-1 whitespace-pre-wrap">
            {line.type === 'input' ? (
              <span className="text-green-400">victor@MacBook-Pro:~ $ <span className="text-white">{line.content}</span></span>
            ) : line.type === 'ai' ? (
              <span className="text-blue-400">{line.content}</span>
            ) : line.type === 'error' ? (
              <span className="text-red-400">{line.content}</span>
            ) : (
              <span>{line.content}</span>
            )}
          </div>
        ))}
        <div ref={scrollRef} />
      </div>
      <form onSubmit={handleCommand} className="flex mt-2">
        <span className="text-green-400 mr-2">victor@MacBook-Pro:~ $</span>
        <input
          autoFocus
          value={input}
          onChange={e => setInput(e.target.value)}
          className="flex-1 bg-transparent border-none outline-none text-white"
        />
      </form>
    </div>
  );
};

export default TerminalApp;