import React from 'react';
import {
  ShieldAlert,
  PhoneCall,
  Bot,
  Globe2,
  Zap,
  Eye,
} from 'lucide-react';
import type { Language, ActivePillar } from '../types';

interface NavbarProps {
  language: Language;
  onToggleLanguage: () => void;
  activePillar: ActivePillar;
  onSelectPillar: (pillar: ActivePillar) => void;
  seniorMode: boolean;
  onToggleSeniorMode: () => void;
  onOpenCopilot: () => void;
  onOpenGoldenHour: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  language,
  onToggleLanguage,
  activePillar: _activePillar,
  onSelectPillar: _onSelectPillar,
  seniorMode,
  onToggleSeniorMode,
  onOpenCopilot,
  onOpenGoldenHour,
}) => {
  return (
    <header className="sticky top-0 z-40 w-full border-b border-slate-800/80 bg-slate-950/80 backdrop-blur-xl transition-all">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6">
        {/* Brand & Logo */}
        <div className="flex items-center gap-3">
          <div className="relative flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-cyan-400 via-teal-500 to-emerald-500 p-0.5 shadow-lg shadow-cyan-500/20 ring-1 ring-white/20">
            <div className="flex h-full w-full items-center justify-center rounded-[10px] bg-slate-950">
              <ShieldAlert className="h-5 w-5 text-cyan-400 animate-pulse" />
            </div>
            <span className="absolute -top-1 -right-1 flex h-3 w-3">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex h-3 w-3 rounded-full bg-emerald-500"></span>
            </span>
          </div>

          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-lg font-black tracking-wider text-slate-100 uppercase">
                RAKSHA <span className="text-cyan-400">AI</span>
              </h1>
              <span className="rounded-md border border-cyan-500/30 bg-cyan-950/60 px-1.5 py-0.5 text-[10px] font-bold text-cyan-300 font-sans">
                ರಕ್ಷಾ AI
              </span>
              <span className="hidden sm:inline-flex items-center rounded-full bg-red-500/10 px-2 py-0.5 text-[10px] font-semibold text-red-400 ring-1 ring-inset ring-red-500/20">
                DEFCON-2 KARNATAKA
              </span>
            </div>
            <p className="hidden text-[11px] text-slate-400 md:block">
              {language === 'kn'
                ? 'ರಾಷ್ಟ್ರೀಯ ಸೈಬರ್ ರಕ್ಷಣಾ ಕಮಾಂಡ್ • 1930 ತುರ್ತು ಪ್ರೋಟೋಕಾಲ್'
                : 'National Cyber Defense Command • Multilingual Indic Threat Intel'}
            </p>
          </div>
        </div>

        {/* Tactical Actions */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* 1930 Golden Hour Emergency Button */}
          <button
            type="button"
            onClick={onOpenGoldenHour}
            className="group relative flex items-center gap-2 overflow-hidden rounded-lg bg-gradient-to-r from-red-600 to-rose-700 px-3 py-1.5 text-xs font-bold text-white shadow-lg shadow-red-600/30 transition-all hover:scale-105 hover:shadow-red-600/50 active:scale-95"
            title="National Cyber Crime Reporting Helpline 1930"
          >
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-white opacity-80"></span>
              <span className="relative inline-flex h-2 w-2 rounded-full bg-white"></span>
            </span>
            <PhoneCall className="h-3.5 w-3.5" />
            <span>1930 {language === 'kn' ? 'ತುರ್ತು ಫ್ರೀಜ್' : 'GOLDEN HOUR'}</span>
          </button>

          {/* Senior Voice Protection Mode Toggle */}
          <button
            type="button"
            onClick={onToggleSeniorMode}
            className={`flex items-center gap-1.5 rounded-lg border px-2.5 py-1.5 text-xs font-semibold transition-all ${
              seniorMode
                ? 'border-amber-400 bg-amber-500/20 text-amber-300 shadow-md shadow-amber-500/20'
                : 'border-slate-800 bg-slate-900/80 text-slate-300 hover:border-slate-700 hover:text-white'
            }`}
            title="Senior Citizen Kannada Voice Assistance & High-Contrast Mode"
          >
            <Eye className="h-3.5 w-3.5 text-amber-400" />
            <span className="hidden md:inline">
              {seniorMode
                ? language === 'kn'
                  ? 'ಹಿರಿಯ ನಾಗರಿಕರ ಮೋಡ್ ON'
                  : 'Senior Mode ON'
                : language === 'kn'
                  ? 'ಹಿರಿಯ ನಾಗರಿಕರ ಮೋಡ್'
                  : 'Senior Voice Mode'}
            </span>
          </button>

          {/* Language Switcher (Kannada / English) */}
          <button
            type="button"
            onClick={onToggleLanguage}
            className="flex items-center gap-1.5 rounded-lg border border-slate-800 bg-slate-900/80 px-2.5 py-1.5 text-xs font-semibold text-slate-200 transition-all hover:border-cyan-500/50 hover:bg-slate-800 hover:text-cyan-300"
          >
            <Globe2 className="h-3.5 w-3.5 text-cyan-400" />
            <span className="font-mono">{language === 'kn' ? 'ಕನ್ನಡ (KN)' : 'English (EN)'}</span>
          </button>

          {/* AI Copilot Drawer Trigger */}
          <button
            type="button"
            onClick={onOpenCopilot}
            className="flex items-center gap-1.5 rounded-lg border border-cyan-500/40 bg-cyan-950/40 px-3 py-1.5 text-xs font-bold text-cyan-300 shadow-sm shadow-cyan-500/10 transition-all hover:border-cyan-400 hover:bg-cyan-900/50 hover:text-cyan-200"
          >
            <Bot className="h-4 w-4 text-cyan-400 animate-pulse" />
            <span className="hidden sm:inline">AI Copilot</span>
          </button>
        </div>
      </div>

      {/* Live Cyber Ticker */}
      <div className="border-t border-slate-900 bg-slate-950/90 px-4 py-1 text-[11px] text-slate-400">
        <div className="mx-auto flex max-w-7xl items-center justify-between">
          <div className="flex items-center gap-2 overflow-hidden">
            <span className="inline-flex items-center gap-1 font-mono font-bold text-cyan-400">
              <Zap className="h-3 w-3 animate-bounce" /> LIVE INTEL:
            </span>
            <div className="truncate text-slate-300 font-sans">
              {language === 'kn'
                ? 'ಬೆಂಗಳೂರು & ಮಂಗಳೂರಿನಲ್ಲಿ ನಕಲಿ BESCOM ಮತ್ತು FedEx ಡಿಜಿಟಲ್ ಅರೆಸ್ಟ್ ಕರೆಗಳ ತೀವ್ರ ಹೆಚ್ಚಳ • 1930 ಗೋಲ್ಡನ್ ಅವರ್ ಸಕ್ರಿಯವಾಗಿದೆ.'
                : 'Smishing spike detected in Bengaluru Urban & Mangaluru: Fake BESCOM Power Cut & FedEx Digital Arrest • 1930 Active Protocol'}
            </div>
          </div>
          <div className="hidden shrink-0 items-center gap-3 font-mono text-[10px] text-slate-400 sm:flex">
            <span className="text-emerald-400">● MULE TRAPS ACTIVE (1,120)</span>
            <span className="text-cyan-400">● NCRP SYNC OK</span>
          </div>
        </div>
      </div>
    </header>
  );
};
