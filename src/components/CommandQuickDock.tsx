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
    <div className="fixed bottom-4 left-1/2 z-40 -translate-x-1/2">
      <div className="flex items-center gap-1.5 rounded-2xl border border-slate-700/80 bg-slate-950/85 p-1.5 shadow-2xl shadow-cyan-950/40 backdrop-blur-xl ring-1 ring-white/10">
        <button
          type="button"
          onClick={() => onSelectPillar('phishing')}
          className={`flex items-center gap-1.5 rounded-xl px-3 py-2 text-xs font-bold transition-all ${
            activePillar === 'phishing'
              ? 'bg-cyan-500 text-slate-950 shadow-md shadow-cyan-500/30'
              : 'text-slate-300 hover:bg-slate-800/80 hover:text-white'
          }`}
          title="Analyze SMS & URLs"
        >
          <FileSearch className="h-4 w-4" />
          <span className="hidden sm:inline">{language === 'kn' ? 'ಸ್ಕ್ಯಾನ್' : 'Scan'}</span>
        </button>

        <button
          type="button"
          onClick={() => onSelectPillar('voice')}
          className={`flex items-center gap-1.5 rounded-xl px-3 py-2 text-xs font-bold transition-all ${
            activePillar === 'voice'
              ? 'bg-cyan-500 text-slate-950 shadow-md shadow-cyan-500/30'
              : 'text-slate-300 hover:bg-slate-800/80 hover:text-white'
          }`}
          title="Voice Deepfake Guard"
        >
          <Mic className="h-4 w-4" />
          <span className="hidden sm:inline">{language === 'kn' ? 'ಧ್ವನಿ' : 'Voice'}</span>
        </button>

        <button
          type="button"
          onClick={() => onSelectPillar('honeypot')}
          className={`flex items-center gap-1.5 rounded-xl px-3 py-2 text-xs font-bold transition-all ${
            activePillar === 'honeypot'
              ? 'bg-purple-500 text-slate-950 shadow-md shadow-purple-500/30'
              : 'text-slate-300 hover:bg-slate-800/80 hover:text-white'
          }`}
          title="AI Honeypot Trap"
        >
          <Cpu className="h-4 w-4" />
          <span className="hidden sm:inline">{language === 'kn' ? 'ಹನಿಪಾಟ್' : 'Honeypot'}</span>
        </button>

        <button
          type="button"
          onClick={() => onSelectPillar('golden-hour')}
          className={`flex items-center gap-1.5 rounded-xl px-3 py-2 text-xs font-bold transition-all ${
            activePillar === 'golden-hour'
              ? 'bg-red-600 text-white shadow-md shadow-red-600/40 animate-pulse'
              : 'bg-red-950/40 text-red-300 hover:bg-red-900/60 hover:text-white'
          }`}
          title="1930 Golden Hour Emergency Freeze"
        >
          <Flame className="h-4 w-4" />
          <span>1930 {language === 'kn' ? 'ಫ್ರೀಜ್' : 'Freeze'}</span>
        </button>

        <button
          type="button"
          onClick={() => onSelectPillar('cen-stations')}
          className={`flex items-center gap-1.5 rounded-xl px-3 py-2 text-xs font-bold transition-all ${
            activePillar === 'cen-stations'
              ? 'bg-cyan-500 text-slate-950 shadow-md shadow-cyan-500/30'
              : 'text-slate-300 hover:bg-slate-800/80 hover:text-white'
          }`}
          title="Karnataka CEN Police Stations & FIR"
        >
          <span className="text-xs">🚨</span>
          <span className="hidden sm:inline">{language === 'kn' ? 'CEN ಠಾಣೆ' : 'CEN SOS'}</span>
        </button>

        <button
          type="button"
          onClick={() => onSelectPillar('intelligence')}
          className={`flex items-center gap-1.5 rounded-xl px-3 py-2 text-xs font-bold transition-all ${
            activePillar === 'intelligence'
              ? 'bg-amber-500 text-slate-950 shadow-md shadow-amber-500/30'
              : 'text-slate-300 hover:bg-slate-800/80 hover:text-white'
          }`}
          title="Scam DNA & Radar"
        >
          <Network className="h-4 w-4" />
          <span className="hidden md:inline">{language === 'kn' ? 'ರೇಡಾರ್' : 'Radar'}</span>
        </button>

        <button
          type="button"
          onClick={() => onSelectPillar('education')}
          className={`flex items-center gap-1.5 rounded-xl px-3 py-2 text-xs font-bold transition-all ${
            activePillar === 'education'
              ? 'bg-sky-500 text-slate-950 shadow-md shadow-sky-500/30'
              : 'text-slate-300 hover:bg-slate-800/80 hover:text-white'
          }`}
          title="Cyber Tutor & Lab"
        >
          <GraduationCap className="h-4 w-4" />
          <span className="hidden md:inline">{language === 'kn' ? 'ಶಿಕ್ಷಣ' : 'Tutor'}</span>
        </button>

        <button
          type="button"
          onClick={() => onSelectPillar('report')}
          className={`flex items-center gap-1.5 rounded-xl px-3 py-2 text-xs font-bold transition-all ${
            activePillar === 'report'
              ? 'bg-red-600 text-white shadow-md shadow-red-600/40'
              : 'bg-red-950/40 text-red-300 hover:bg-red-900/60 hover:text-white'
          }`}
          title="File Incident Report"
        >
          <FileWarning className="h-4 w-4" />
          <span className="hidden md:inline">{language === 'kn' ? 'ವರದಿ' : 'Report'}</span>
        </button>

        <button
          type="button"
          onClick={() => onSelectPillar('cyber-health')}
          className={`flex items-center gap-1.5 rounded-xl px-3 py-2 text-xs font-bold transition-all ${
            activePillar === 'cyber-health'
              ? 'bg-rose-500 text-slate-950 shadow-md shadow-rose-500/30'
              : 'text-slate-300 hover:bg-slate-800/80 hover:text-white'
          }`}
          title="Cyber Health Score"
        >
          <HeartPulse className="h-4 w-4" />
          <span className="hidden md:inline">{language === 'kn' ? 'ಆರೋಗ್ಯ' : 'Health'}</span>
        </button>

        <div className="h-5 w-px bg-slate-800" />

        <button
          type="button"
          onClick={onOpenCopilot}
          className="flex items-center gap-1.5 rounded-xl bg-gradient-to-r from-cyan-600 to-teal-600 px-3.5 py-2 text-xs font-bold text-white shadow-md shadow-cyan-600/30 transition-all hover:scale-105 active:scale-95"
          title="Open AI Cyber Copilot"
        >
          <Bot className="h-4 w-4 animate-spin" />
          <span>Copilot</span>
        </button>
      </div>
    </div>
  );
};
