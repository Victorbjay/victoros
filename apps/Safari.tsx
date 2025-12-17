
import React, { useState } from 'react';
import { 
  ChevronLeft, 
  ChevronRight, 
  RotateCcw, 
  Lock, 
  Share2, 
  LayoutGrid, 
  ArrowUpRight, 
  Globe, 
  Github, 
  Linkedin, 
  Cpu, 
  Layout, 
  Database, 
  Mail, 
  Phone, 
  MapPin, 
  ExternalLink,
  Code2,
  Sparkles,
  Download,
  Home,
  MessageCircle,
  TrendingUp,
  Zap,
  Terminal as TerminalIcon
} from 'lucide-react';
import { UBUNTU_LINK } from '../constants';

const SafariApp: React.FC = () => {
  const [activeTab, setActiveTab] = useState('about');

  return (
    <div className="flex flex-col h-full bg-white dark:bg-[#0a0a0b] text-slate-900 dark:text-slate-100 transition-colors duration-500">
      {/* Browser Toolbar */}
      <div className="h-14 border-b border-slate-200 dark:border-white/5 flex items-center px-4 gap-6 bg-white/90 dark:bg-[#0a0a0b]/90 backdrop-blur-md sticky top-0 z-50">
        <div className="flex items-center gap-4 text-slate-400">
          <ChevronLeft 
            size={18} 
            className="hover:text-slate-800 dark:hover:text-white cursor-pointer transition-colors" 
            onClick={() => setActiveTab('about')}
          />
          <ChevronRight size={18} />
        </div>
        <div className="flex-1 max-w-2xl mx-auto h-9 bg-slate-100 dark:bg-white/5 rounded-xl flex items-center px-4 gap-2 border border-slate-200 dark:border-white/10 shadow-sm">
          <Lock size={12} className="text-emerald-500" />
          <span className="text-[13px] text-slate-600 dark:text-slate-400 truncate flex-1 text-center font-medium tracking-tight">victoremeka.dev/{activeTab}</span>
          <RotateCcw size={12} className="text-slate-400 hover:text-slate-800 dark:hover:text-white cursor-pointer" />
        </div>
        <div className="flex items-center gap-4 text-slate-400">
          <Home 
            size={18} 
            className="hover:text-blue-500 cursor-pointer transition-colors" 
            onClick={() => setActiveTab('about')}
          />
          <Share2 size={18} className="hover:text-slate-800 dark:hover:text-white cursor-pointer" />
          <LayoutGrid size={18} className="hover:text-slate-800 dark:hover:text-white cursor-pointer" />
        </div>
      </div>

      {/* Internal Navigation Tabs */}
      <div className="flex bg-slate-50 dark:bg-black/20 border-b border-slate-200 dark:border-white/5 overflow-x-auto no-scrollbar shadow-inner">
        {['about', 'tech', 'work'].map(tab => (
          <div
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-8 py-3 text-[11px] font-black uppercase tracking-widest cursor-pointer transition-all border-r border-slate-200 dark:border-white/5 whitespace-nowrap ${activeTab === tab ? 'bg-white dark:bg-white/10 text-blue-600 dark:text-blue-400 border-b-2 border-b-blue-600 dark:border-b-blue-400' : 'text-slate-400 hover:bg-slate-200/40 dark:hover:bg-white/5'}`}
          >
            {tab}
          </div>
        ))}
      </div>

      {/* Browser Content */}
      <div className="flex-1 overflow-auto p-4 md:p-8 lg:p-12 custom-scrollbar bg-slate-50 dark:bg-[#0a0a0b]">
        <div className="max-w-6xl mx-auto">
          {activeTab === 'about' && (
            <div className="grid grid-cols-1 md:grid-cols-6 lg:grid-cols-12 gap-6 animate-in fade-in slide-in-from-bottom-6 duration-1000">
              
              {/* Main Identity Card */}
              <div className="md:col-span-6 lg:col-span-8 bg-white dark:bg-[#141416] p-8 md:p-12 rounded-[3.5rem] border border-slate-200 dark:border-white/5 shadow-2xl shadow-blue-500/5 relative overflow-hidden group">
                <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-600/10 dark:bg-blue-400/10 blur-[120px] -mr-40 -mt-40 transition-transform duration-1000 group-hover:scale-110" />
                
                <div className="relative z-10 h-full flex flex-col justify-between">
                  <div>
                    <div className="flex items-center gap-2 text-blue-600 dark:text-blue-400 font-bold text-xs uppercase tracking-[0.3em] mb-10">
                      <Sparkles size={16} className="animate-pulse" />
                      Engineering Excellence
                    </div>
                    <h1 className="text-7xl lg:text-[100px] font-black text-slate-900 dark:text-white tracking-tighter leading-[0.8] mb-12">
                      Victor <br/>
                      <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-500 dark:from-blue-400 dark:to-indigo-300">Emeka Okpe</span>
                    </h1>
                    <p className="text-2xl text-slate-500 dark:text-slate-400 max-w-2xl leading-relaxed font-medium tracking-tight">
                      Abuja-based Fullstack Architect building high-performance cloud ecosystems and intelligent products like <strong>Aura Afribot</strong>. 
                      Merging technical rigour with high-end aesthetic.
                    </p>
                  </div>

                  <div className="mt-20 flex flex-wrap gap-5">
                    <a 
                      href="./resume.pdf" 
                      download="Victor_Emeka_Okpe_Resume.pdf"
                      className="px-10 py-5 bg-slate-900 dark:bg-white text-white dark:text-slate-900 rounded-[2.5rem] font-black text-sm flex items-center gap-4 hover:scale-[1.03] active:scale-95 transition-all shadow-2xl shadow-slate-900/20"
                    >
                      Download Resume <Download size={20} />
                    </a>
                    <div className="flex gap-4">
                      <a href="https://github.com/victorbjay" target="_blank" className="w-16 h-16 bg-slate-100 dark:bg-white/5 rounded-[2rem] flex items-center justify-center text-slate-600 dark:text-white hover:bg-blue-600 hover:text-white dark:hover:bg-blue-500 transition-all duration-300 group shadow-sm">
                        <Github size={28} className="group-hover:rotate-12 transition-transform" />
                      </a>
                      <a href="https://linkedin.com/in/emkajnr" target="_blank" className="w-16 h-16 bg-slate-100 dark:bg-white/5 rounded-[2rem] flex items-center justify-center text-slate-600 dark:text-white hover:bg-blue-600 hover:text-white dark:hover:bg-blue-500 transition-all duration-300 group shadow-sm">
                        <Linkedin size={28} className="group-hover:-rotate-12 transition-transform" />
                      </a>
                    </div>
                  </div>
                </div>
              </div>

              {/* Aura Afribot Feature Card */}
              <div className="md:col-span-6 lg:col-span-4 bg-gradient-to-br from-indigo-600 to-purple-700 p-10 rounded-[3.5rem] text-white flex flex-col items-center justify-between text-center shadow-3xl shadow-indigo-500/30 relative overflow-hidden group">
                <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 blur-3xl rounded-full -mr-16 -mt-16" />
                
                <div className="flex flex-col items-center mt-4">
                  <div className="w-20 h-20 bg-white/20 rounded-[2rem] flex items-center justify-center mb-6 backdrop-blur-lg border border-white/20">
                    <TrendingUp size={36} />
                  </div>
                  <h3 className="text-3xl font-black tracking-tight mb-2">Aura Afribot</h3>
                  <p className="text-indigo-100 text-xs font-bold uppercase tracking-[0.2em] mb-6 opacity-80">Telegram Ecosystem</p>
                  <p className="text-sm font-medium leading-relaxed mb-8 opacity-90 px-2">
                    Teaches crypto, simulates virtual trades, provides TA signals, and real-time alerts.
                  </p>
                </div>

                <a 
                  href="https://t.me/auraafribot" 
                  target="_blank" 
                  className="w-full py-4 bg-white text-indigo-700 rounded-3xl font-black flex items-center justify-center gap-3 hover:scale-[1.02] transition-transform shadow-xl"
                >
                  Visit @auraafribot <MessageCircle size={18} />
                </a>
              </div>

              {/* Contact Bento */}
              <div className="md:col-span-3 lg:col-span-4 bg-white dark:bg-[#141416] p-10 rounded-[3.5rem] border border-slate-200 dark:border-white/5 shadow-xl group hover:border-blue-500 transition-all duration-500">
                <div className="w-16 h-16 bg-blue-50 dark:bg-blue-500/10 rounded-3xl flex items-center justify-center mb-8 text-blue-600 dark:text-blue-400 group-hover:scale-110 group-hover:bg-blue-600 group-hover:text-white transition-all duration-500">
                  <Mail size={28} />
                </div>
                <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400 mb-3">Abuja Base</h4>
                <a href="mailto:okpevictor84@gmail.com" className="text-xl font-black tracking-tighter text-slate-800 dark:text-slate-100 hover:text-blue-600 transition-colors break-all leading-none">
                  okpevictor84@gmail.com
                </a>
              </div>

              <div className="md:col-span-3 lg:col-span-4 bg-white dark:bg-[#141416] p-10 rounded-[3.5rem] border border-slate-200 dark:border-white/5 shadow-xl group hover:border-emerald-500 transition-all duration-500">
                <div className="w-16 h-16 bg-emerald-50 dark:bg-emerald-500/10 rounded-3xl flex items-center justify-center mb-8 text-emerald-600 dark:text-emerald-400 group-hover:scale-110 group-hover:bg-emerald-600 group-hover:text-white transition-all duration-500">
                  <Phone size={28} />
                </div>
                <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400 mb-3">WhatsApp / Direct</h4>
                <a href="tel:+2347063949519" className="text-xl font-black tracking-tighter text-slate-800 dark:text-slate-100 hover:text-emerald-600 transition-colors leading-none">
                  +234 706 394 9519
                </a>
              </div>

              {/* Ubuntu Flex Card - Linked to live URL */}
              <a 
                href={UBUNTU_LINK}
                target="_blank"
                className="md:col-span-6 lg:col-span-4 bg-[#E95420] p-10 rounded-[3.5rem] text-white flex flex-col justify-between overflow-hidden relative group cursor-pointer shadow-2xl hover:scale-[1.02] transition-transform"
              >
                 <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent pointer-events-none" />
                 <div className="relative z-10">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-white text-[10px] font-black uppercase tracking-widest mb-6 border border-white/20">
                       Alternative View
                    </div>
                    <h4 className="text-3xl font-black mb-4 tracking-tighter leading-none">Ubuntu <br/>Experience</h4>
                    <p className="text-white/80 text-base font-medium leading-relaxed">
                      Prefer the Linux vibe? Experience my Ubuntu-inspired ecosystem.
                    </p>
                 </div>
                 <div className="mt-8 flex justify-end">
                    <div className="w-12 h-12 rounded-2xl bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors border border-white/10">
                       <TerminalIcon size={20} />
                    </div>
                 </div>
              </a>

            </div>
          )}

          {activeTab === 'tech' && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
              <TechCard icon={<Layout className="text-blue-500" />} title="Modern UI" items={['React 19', 'Next.js 15', 'TypeScript', 'Tailwind CSS', 'Framer Motion', 'Three.js']} />
              <TechCard icon={<Database className="text-emerald-500" />} title="Backend Core" items={['Node.js', 'Go (Golang)', 'PostgreSQL', 'Redis', 'Docker', 'GraphQL']} />
              <TechCard icon={<Cpu className="text-purple-500" />} title="AI Intelligence" items={['Gemini 3', 'LangChain', 'Vector Search', 'OpenAI SDK', 'PyTorch']} />
            </div>
          )}

          {activeTab === 'work' && (
            <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
              <ProjectListItem title="Aura Afribot" type="Fintech Product Ecosystem" date="2024" description="AI bot for simulated trades, signals, and crypto alerts with high user engagement." />
              <ProjectListItem title="VictorOS" type="Window Manager Framework" date="2024" description="A pixel-perfect macOS Ventura simulation with integrated AI command center." />
              <ProjectListItem title="Ubuntu Portfolio" type="Linux UI Framework" date="2023" description="A functional replica of the Ubuntu Linux Desktop built with React and Tailwind." />
            </div>
          )}

          {/* Contact Footer Section */}
          <div className="mt-32 text-center py-24 border-t border-slate-200 dark:border-white/5 animate-in fade-in slide-in-from-bottom-10 duration-1000">
             <h2 className="text-6xl lg:text-7xl font-black tracking-tighter mb-8 leading-tight">Ready to build <br/><span className="text-blue-600">the next big thing?</span></h2>
             <p className="text-slate-500 dark:text-slate-400 text-xl mb-12 max-w-2xl mx-auto font-medium tracking-tight">
               Based in Abuja, available for high-impact collaborations globally. Let's engineer the future.
             </p>
             <div className="flex flex-col md:flex-row items-center justify-center gap-6">
               <a 
                 href="mailto:okpevictor84@gmail.com" 
                 className="inline-flex items-center gap-4 px-12 py-6 bg-blue-600 text-white rounded-[2.5rem] font-black text-lg hover:scale-[1.05] active:scale-95 transition-all shadow-3xl shadow-blue-600/30"
               >
                 Initiate Project <Mail size={24} />
               </a>
               <a 
                 href="https://linkedin.com/in/emkajnr" 
                 target="_blank"
                 className="inline-flex items-center gap-4 px-12 py-6 bg-slate-100 dark:bg-white/5 text-slate-800 dark:text-white rounded-[2.5rem] font-black text-lg hover:bg-slate-200 dark:hover:bg-white/10 transition-all"
               >
                 LinkedIn <Linkedin size={24} />
               </a>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const TechCard = ({ icon, title, items }: { icon: any, title: string, items: string[] }) => (
  <div className="bg-white dark:bg-[#141416] p-12 rounded-[4rem] border border-slate-200 dark:border-white/5 hover:border-blue-500 dark:hover:border-blue-400 transition-all group shadow-xl hover:shadow-3xl duration-700">
    <div className="w-20 h-20 bg-slate-50 dark:bg-white/5 rounded-[2rem] flex items-center justify-center mb-10 group-hover:scale-110 group-hover:bg-blue-600 group-hover:text-white transition-all duration-500 shadow-sm border border-slate-100 dark:border-white/5">
      {icon}
    </div>
    <h3 className="text-3xl font-black mb-8 tracking-tight text-slate-900 dark:text-white">{title}</h3>
    <div className="flex flex-wrap gap-3">
      {items.map(i => (
        <span key={i} className="px-5 py-2.5 bg-slate-50 dark:bg-white/5 rounded-2xl text-xs font-black text-slate-500 dark:text-slate-400 hover:bg-blue-50 dark:hover:bg-blue-500/10 hover:text-blue-600 dark:hover:text-blue-400 transition-all cursor-default tracking-wide">{i}</span>
      ))}
    </div>
  </div>
);

const ProjectListItem = ({ title, type, date, description }: { title: string, type: string, date: string, description: string }) => (
  <div className="bg-white dark:bg-[#141416] p-10 rounded-[3.5rem] border border-slate-200 dark:border-white/5 flex flex-col md:flex-row md:items-center justify-between group hover:shadow-3xl hover:border-blue-500 dark:hover:border-blue-400 transition-all duration-500 cursor-pointer">
    <div className="flex items-center gap-10 mb-6 md:mb-0">
      <div className="w-24 h-24 bg-slate-50 dark:bg-white/5 rounded-[2.5rem] flex items-center justify-center font-black text-4xl text-slate-200 dark:text-slate-700 group-hover:text-blue-500 dark:group-hover:text-blue-400 group-hover:bg-blue-50 dark:group-hover:bg-blue-500/10 transition-all duration-500 shadow-inner">
        {title.charAt(0)}
      </div>
      <div>
        <div className="flex items-center gap-4 mb-2">
          <h4 className="text-2xl font-black tracking-tighter">{title}</h4>
          <span className="text-[10px] font-black uppercase tracking-[0.2em] text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-500/10 px-3 py-1 rounded-full border border-blue-100 dark:border-blue-500/20">Active</span>
        </div>
        <p className="text-base text-slate-500 dark:text-slate-400 font-bold mb-2 tracking-tight">{type}</p>
        <p className="text-sm text-slate-400 dark:text-slate-500 max-lg leading-relaxed">{description}</p>
      </div>
    </div>
    <div className="flex items-center gap-10">
      <div className="text-slate-200 dark:text-white/5 font-black text-4xl group-hover:text-blue-500/10 transition-colors hidden lg:block">{date}</div>
      <div className="w-16 h-16 rounded-full bg-slate-50 dark:bg-white/5 flex items-center justify-center opacity-0 group-hover:opacity-100 group-hover:bg-blue-600 group-hover:text-white transition-all shadow-xl group-hover:scale-110">
        <ArrowUpRight size={28} />
      </div>
    </div>
  </div>
);

export default SafariApp;
