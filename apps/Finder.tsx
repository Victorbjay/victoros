
import React, { useState, useEffect } from 'react';
import { Folder, Star, Github, ExternalLink, Code2, Clock, BrainCircuit, Rocket } from 'lucide-react';
import { GithubRepo } from '../types';
import { GITHUB_USERNAME } from '../constants';

const FinderApp: React.FC = () => {
  const [repos, setRepos] = useState<GithubRepo[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'projects' | 'aura'>('projects');

  useEffect(() => {
    const fetchRepos = async () => {
      try {
        const response = await fetch(`https://api.github.com/users/${GITHUB_USERNAME}/repos?sort=updated&per_page=12`);
        const data = await response.json();
        if (Array.isArray(data)) {
          setRepos(data);
        }
      } catch (error) {
        console.error("Error fetching repos:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchRepos();
  }, []);

  return (
    <div className="flex h-full text-white">
      {/* Sidebar */}
      <div className="w-48 bg-black/20 border-r border-white/10 p-4 space-y-6">
        <div>
          <h3 className="text-[11px] font-bold text-white/40 uppercase mb-2">Favorites</h3>
          <div className="space-y-1">
            <div 
              onClick={() => setActiveTab('projects')}
              className={`flex items-center gap-2 px-2 py-1.5 rounded cursor-pointer transition-colors ${activeTab === 'projects' ? 'bg-white/10 text-white' : 'text-white/60 hover:bg-white/5'}`}
            >
              <Folder size={14} className="text-blue-400 fill-blue-400" />
              <span className="text-sm">Projects</span>
            </div>
            <div 
              onClick={() => setActiveTab('aura')}
              className={`flex items-center gap-2 px-2 py-1.5 rounded cursor-pointer transition-colors ${activeTab === 'aura' ? 'bg-white/10 text-white' : 'text-white/60 hover:bg-white/5'}`}
            >
              <BrainCircuit size={14} className="text-purple-400" />
              <span className="text-sm">Aura Intelligence</span>
            </div>
          </div>
        </div>
        <div>
          <h3 className="text-[11px] font-bold text-white/40 uppercase mb-2">Github</h3>
          <div className="flex items-center gap-2 px-2 py-1 text-sm text-white/60">
            <Github size={14} />
            <span>@{GITHUB_USERNAME}</span>
          </div>
        </div>
      </div>

      {/* Main Grid */}
      <div className="flex-1 p-6 overflow-auto custom-scrollbar">
        {activeTab === 'aura' ? (
          <div className="max-w-2xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
             <div className="bg-gradient-to-br from-indigo-600/20 to-purple-600/20 p-8 rounded-[2rem] border border-white/10 text-center">
                <Rocket size={48} className="mx-auto mb-4 text-purple-400" />
                <h2 className="text-2xl font-black mb-2 tracking-tight">Aura Afribot Intelligence</h2>
                <p className="text-white/60 text-sm mb-6">Flagship product ecosystem for real-time crypto signals.</p>
                <div className="grid grid-cols-2 gap-4 text-left">
                   <div className="bg-white/5 p-4 rounded-xl border border-white/5">
                      <div className="text-[10px] uppercase font-bold text-white/40 mb-1">Status</div>
                      <div className="text-sm font-bold text-emerald-400">Scaling (Live)</div>
                   </div>
                   <div className="bg-white/5 p-4 rounded-xl border border-white/5">
                      <div className="text-[10px] uppercase font-bold text-white/40 mb-1">Market</div>
                      <div className="text-sm font-bold">Fintech / Web3</div>
                   </div>
                </div>
             </div>

             <div className="space-y-4">
                <h3 className="text-xs font-black uppercase tracking-widest text-white/30">Executive Summary</h3>
                <div className="bg-white/5 p-6 rounded-2xl border border-white/5 space-y-4 text-sm text-white/80 leading-relaxed">
                   <p>Aura Afribot leverages a hybrid technical analysis engine to deliver high-fidelity signals to users via Telegram.</p>
                   <p>Integrated with simulated trading features, it acts as both an educational platform and a high-utility alert system for the African market and beyond.</p>
                </div>
             </div>
          </div>
        ) : loading ? (
          <div className="flex items-center justify-center h-full">
            <div className="animate-pulse text-white/40">Loading projects...</div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {repos.map(repo => (
              <a 
                key={repo.id}
                href={repo.html_url}
                target="_blank"
                rel="noopener noreferrer"
                className="group p-4 bg-white/5 border border-white/10 rounded-xl hover:bg-white/10 transition-colors"
              >
                <div className="flex justify-between items-start mb-2">
                  <Folder className="text-blue-400 group-hover:scale-110 transition-transform" />
                  <ExternalLink size={14} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
                <h4 className="font-semibold text-sm mb-1 truncate">{repo.name}</h4>
                <p className="text-xs text-white/60 mb-3 line-clamp-2 min-h-[32px]">
                  {repo.description || "No description provided."}
                </p>
                <div className="flex items-center gap-4 text-[10px] text-white/40">
                  <div className="flex items-center gap-1">
                    <Star size={10} />
                    <span>{repo.stargazers_count}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Code2 size={10} />
                    <span>{repo.language || "Unknown"}</span>
                  </div>
                </div>
              </a>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default FinderApp;