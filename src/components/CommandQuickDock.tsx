import React from 'react';
import {
  FileSearch,
  Mic,
  Cpu,
  Flame,
  Bot,
  Network,
  GraduationCap,
  HeartPulse,
  FileWarning,
} from 'lucide-react';
import type { ActivePillar, Language } from '../types';

interface CommandQuickDockProps {
  activePillar: ActivePillar;
  onSelectPillar: (pillar: ActivePillar) => void;
  language: Language;
  onOpenCopilot: () => void;
  seniorMode: boolean;
  onToggleSeniorMode: () => void;
}

export const CommandQuickDock: React.FC<CommandQuickDockProps> = ({
  activePillar,
  onSelectPillar,
  language,
  onOpenCopilot,
  seniorMode: _seniorMode,
  onToggleSeniorMode: _onToggleSeniorMode,
}) => {
  return (
    <div className="fixed bottom-4 left-1/2 z-40 -translate-x-1/2 max-w-[95vw]">
      <div className="flex items-center gap-1.5 rounded-full border border-white/[0.12] bg-[#0c101a]/85 p-1.5 shadow-2xl shadow-black/90 backdrop-blur-3xl ring-1 ring-white/10">
        <button
          type="button"
          onClick={() => onSelectPillar('phishing')}
          className={`flex items-center gap-1.5 rounded-full px-3.5 py-2 text-xs font-bold font-heading transition-all duration-200 cursor-pointer ${
            activePillar === 'phishing'
              ? 'bg-white text-slate-950 shadow-md shadow-white/20'
              : 'text-slate-300 hover:bg-white/[0.08] hover:text-white'
          }`}
          title="Analyze SMS & URLs"
        >
          <FileSearch className="h-4 w-4" />
          <span className="hidden sm:inline">{language === 'kn' ? 'ಸ್ಕ್ಯಾನ್' : 'Scan'}</span>
        </button>

        <button
          type="button"
          onClick={() => onSelectPillar('voice')}
          className={`flex items-center gap-1.5 rounded-full px-3.5 py-2 text-xs font-bold font-heading transition-all duration-200 cursor-pointer ${
            activePillar === 'voice'
              ? 'bg-white text-slate-950 shadow-md shadow-white/20'
              : 'text-slate-300 hover:bg-white/[0.08] hover:text-white'
          }`}
          title="Voice Deepfake Guard"
        >
          <Mic className="h-4 w-4" />
          <span className="hidden sm:inline">{language === 'kn' ? 'ಧ್ವನಿ' : 'Voice'}</span>
        </button>

        <button
          type="button"
          onClick={() => onSelectPillar('honeypot')}
          className={`flex items-center gap-1.5 rounded-full px-3.5 py-2 text-xs font-bold font-heading transition-all duration-200 cursor-pointer ${
            activePillar === 'honeypot'
              ? 'bg-purple-400 text-slate-950 shadow-md shadow-purple-400/20'
              : 'text-slate-300 hover:bg-white/[0.08] hover:text-white'
          }`}
          title="AI Honeypot Trap"
        >
          <Cpu className="h-4 w-4" />
          <span className="hidden sm:inline">{language === 'kn' ? 'ಹನಿಪಾಟ್' : 'Honeypot'}</span>
        </button>

        <button
          type="button"
          onClick={() => onSelectPillar('golden-hour')}
          className={`flex items-center gap-1.5 rounded-full px-4 py-2 text-xs font-bold font-heading transition-all duration-200 cursor-pointer ${
            activePillar === 'golden-hour'
              ? 'bg-gradient-to-r from-rose-600 to-pink-600 text-white shadow-lg shadow-rose-600/30 ring-1 ring-white/20'
              : 'bg-rose-500/15 text-rose-300 border border-rose-500/30 hover:bg-rose-500/25 hover:text-white'
          }`}
          title="1930 Golden Hour Emergency Freeze"
        >
          <Flame className="h-4 w-4 text-rose-400 animate-pulse" />
          <span>1930 {language === 'kn' ? 'ಫ್ರೀಜ್' : 'Freeze'}</span>
        </button>

        <button
          type="button"
          onClick={() => onSelectPillar('cen-stations')}
          className={`flex items-center gap-1.5 rounded-full px-3.5 py-2 text-xs font-bold font-heading transition-all duration-200 cursor-pointer ${
            activePillar === 'cen-stations'
              ? 'bg-white text-slate-950 shadow-md shadow-white/20'
              : 'text-slate-300 hover:bg-white/[0.08] hover:text-white'
          }`}
          title="Karnataka CEN Police Stations & FIR"
        >
          <span className="text-xs">🚨</span>
          <span className="hidden sm:inline">{language === 'kn' ? 'CEN ಠಾಣೆ' : 'CEN SOS'}</span>
        </button>

        <button
          type="button"
          onClick={() => onSelectPillar('intelligence')}
          className={`flex items-center gap-1.5 rounded-full px-3.5 py-2 text-xs font-bold font-heading transition-all duration-200 cursor-pointer ${
            activePillar === 'intelligence'
              ? 'bg-amber-400 text-slate-950 shadow-md shadow-amber-400/20'
              : 'text-slate-300 hover:bg-white/[0.08] hover:text-white'
          }`}
          title="Scam DNA & Radar"
        >
          <Network className="h-4 w-4" />
          <span className="hidden md:inline">{language === 'kn' ? 'ರೇಡಾರ್' : 'Radar'}</span>
        </button>

        <button
          type="button"
          onClick={() => onSelectPillar('education')}
          className={`flex items-center gap-1.5 rounded-full px-3.5 py-2 text-xs font-bold font-heading transition-all duration-200 cursor-pointer ${
            activePillar === 'education'
              ? 'bg-sky-400 text-slate-950 shadow-md shadow-sky-400/20'
              : 'text-slate-300 hover:bg-white/[0.08] hover:text-white'
          }`}
          title="Cyber Tutor & Lab"
        >
          <GraduationCap className="h-4 w-4" />
          <span className="hidden md:inline">{language === 'kn' ? 'ಶಿಕ್ಷಣ' : 'Tutor'}</span>
        </button>

        <button
          type="button"
          onClick={() => onSelectPillar('report')}
          className={`flex items-center gap-1.5 rounded-full px-3.5 py-2 text-xs font-bold font-heading transition-all duration-200 cursor-pointer ${
            activePillar === 'report'
              ? 'bg-rose-500 text-white shadow-md shadow-rose-500/25'
              : 'bg-rose-500/10 text-rose-300 hover:bg-rose-500/20 hover:text-white'
          }`}
          title="File Incident Report"
        >
          <FileWarning className="h-4 w-4" />
          <span className="hidden md:inline">{language === 'kn' ? 'ವರದಿ' : 'Report'}</span>
        </button>

        <button
          type="button"
          onClick={() => onSelectPillar('cyber-health')}
          className={`flex items-center gap-1.5 rounded-full px-3.5 py-2 text-xs font-bold font-heading transition-all duration-200 cursor-pointer ${
            activePillar === 'cyber-health'
              ? 'bg-pink-400 text-slate-950 shadow-md shadow-pink-400/20'
              : 'text-slate-300 hover:bg-white/[0.08] hover:text-white'
          }`}
          title="Cyber Health Score"
        >
          <HeartPulse className="h-4 w-4" />
          <span className="hidden md:inline">{language === 'kn' ? 'ಆರೋಗ್ಯ' : 'Health'}</span>
        </button>

        <div className="h-5 w-px bg-white/10" />

        <button
          type="button"
          onClick={onOpenCopilot}
          className="flex items-center gap-1.5 rounded-full bg-sky-400 px-4 py-2 text-xs font-bold font-heading text-slate-950 shadow-md shadow-sky-400/20 transition-all duration-200 hover:scale-105 hover:bg-sky-300 active:scale-95 cursor-pointer"
          title="Open AI Cyber Copilot"
        >
          <Bot className="h-4 w-4" />
          <span>Copilot</span>
        </button>
      </div>
    </div>
  );
};

export default CommandQuickDock;
