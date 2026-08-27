import React from 'react';
import {
  Shield,
  PhoneCall,
  Bot,
  Globe,
  Radio,
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
    <header className="sticky top-0 z-40 w-full border-b border-white/[0.08] bg-[#080a0f]/80 backdrop-blur-3xl transition-all">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3.5 sm:px-6">
        {/* Brand & Logo */}
        <div className="flex items-center gap-3.5">
          <div className="relative flex h-10 w-10 items-center justify-center rounded-2xl bg-gradient-to-b from-white/20 via-white/5 to-white/0 p-[1px] shadow-lg shadow-sky-500/10">
            <div className="flex h-full w-full items-center justify-center rounded-[15px] bg-[#121622] border border-white/10">
              <Shield className="h-5 w-5 text-sky-400" />
            </div>
            <span className="absolute -top-0.5 -right-0.5 flex h-2.5 w-2.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-sky-400 opacity-75"></span>
              <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-sky-400 ring-2 ring-[#080a0f]"></span>
            </span>
          </div>

          <div>
            <div className="flex items-center gap-2">
              <h1 className="font-heading text-lg font-bold tracking-tight text-white flex items-center gap-1.5">
                <span>RAKSHA</span>
                <span className="bg-gradient-to-r from-sky-300 via-sky-400 to-cyan-300 bg-clip-text text-transparent font-black">AI</span>
              </h1>
              <span className="rounded-full border border-white/15 bg-white/[0.04] px-2.5 py-0.5 text-[10px] font-medium text-slate-300 font-sans backdrop-blur-md">
                ರಕ್ಷಾ ಕವಚ
              </span>
              <span className="hidden sm:inline-flex items-center gap-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 px-2.5 py-0.5 text-[10px] font-medium text-emerald-400">
                <Radio className="h-2.5 w-2.5 animate-pulse" />
                SYSTEM ONLINE
              </span>
            </div>
            <p className="hidden text-[11px] text-slate-400 md:block font-sans">
              {language === 'kn'
                ? 'ರಾಷ್ಟ್ರೀಯ ಸೈಬರ್ ರಕ್ಷಣಾ ಕಮಾಂಡ್ • 1930 ತುರ್ತು ಪ್ರೋಟೋಕಾಲ್'
                : 'National Cyber Defense Command • Indic Threat Intelligence'}
            </p>
          </div>
        </div>

        {/* Tactical Actions */}
        <div className="flex items-center gap-2 sm:gap-2.5">
          {/* 1930 Golden Hour Emergency Button */}
          <button
            type="button"
            onClick={onOpenGoldenHour}
            className="group relative flex items-center gap-2 overflow-hidden rounded-full bg-gradient-to-r from-rose-600 via-rose-500 to-pink-600 px-4 py-2 text-xs font-bold text-white shadow-lg shadow-rose-500/25 transition-all duration-200 hover:scale-[1.02] hover:shadow-rose-500/40 active:scale-[0.98] cursor-pointer"
            title="National Cyber Crime Reporting Helpline 1930"
          >
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-white opacity-90"></span>
              <span className="relative inline-flex h-2 w-2 rounded-full bg-white"></span>
            </span>
            <PhoneCall className="h-3.5 w-3.5 transition-transform group-hover:rotate-12" />
            <span className="font-heading font-extrabold tracking-wider">
              1930 {language === 'kn' ? 'ತುರ್ತು ಫ್ರೀಜ್' : 'GOLDEN HOUR'}
            </span>
          </button>

          {/* Senior Voice Protection Mode Toggle */}
          <button
            type="button"
            onClick={onToggleSeniorMode}
            className={`flex items-center gap-1.5 rounded-full border px-3.5 py-2 text-xs font-medium transition-all duration-200 cursor-pointer ${
              seniorMode
                ? 'border-amber-400/50 bg-amber-500/15 text-amber-200 shadow-md shadow-amber-500/10'
                : 'border-white/10 bg-white/[0.04] text-slate-300 hover:border-white/20 hover:bg-white/[0.08] hover:text-white'
            }`}
            title="Senior Citizen Kannada Voice Assistance & High-Contrast Mode"
          >
            <Eye className="h-3.5 w-3.5 text-amber-400" />
            <span className="hidden md:inline font-sans">
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
            className="flex items-center gap-1.5 rounded-full border border-white/10 bg-white/[0.04] px-3.5 py-2 text-xs font-medium text-slate-200 transition-all duration-200 hover:border-white/20 hover:bg-white/[0.08] hover:text-white cursor-pointer"
          >
            <Globe className="h-3.5 w-3.5 text-sky-400" />
            <span className="font-mono text-[11px]">
              {language === 'kn' ? 'ಕನ್ನಡ (KN)' : 'English (EN)'}
            </span>
          </button>

          {/* AI Copilot Button */}
          <button
            type="button"
            onClick={onOpenCopilot}
            className="flex items-center gap-1.5 rounded-full border border-sky-400/30 bg-sky-500/10 px-4 py-2 text-xs font-bold font-heading text-sky-200 shadow-sm shadow-sky-500/10 transition-all duration-200 hover:border-sky-400/60 hover:bg-sky-500/20 hover:text-white cursor-pointer"
          >
            <Bot className="h-4 w-4 text-sky-400" />
            <span className="hidden sm:inline">AI Copilot</span>
          </button>
        </div>
      </div>

      {/* Live Cyber Ticker */}
      <div className="border-t border-white/[0.06] bg-[#06080d]/80 px-4 py-1.5 text-[11px] text-slate-400">
        <div className="mx-auto flex max-w-7xl items-center justify-between">
          <div className="flex items-center gap-2.5 overflow-hidden">
            <span className="inline-flex items-center gap-1.5 font-mono font-bold text-sky-400 shrink-0">
              <span className="h-1.5 w-1.5 rounded-full bg-sky-400 animate-pulse"></span>
              INTEL:
            </span>
            <div className="truncate text-slate-300 font-sans text-xs">
              {language === 'kn'
                ? 'ಬೆಂಗಳೂರು & ಮಂಗಳೂರಿನಲ್ಲಿ ನಕಲಿ BESCOM ಮತ್ತು FedEx ಡಿಜಿಟಲ್ ಅರೆಸ್ಟ್ ಕರೆಗಳ ತೀವ್ರ ಹೆಚ್ಚಳ • 1930 ಗೋಲ್ಡನ್ ಅವರ್ ಸಕ್ರಿಯವಾಗಿದೆ.'
                : 'Smishing alert active in Karnataka: Fake BESCOM Power Cut & FedEx Digital Arrest • 1930 Rapid Freeze Active'}
            </div>
          </div>
          <div className="hidden shrink-0 items-center gap-4 font-mono text-[10.5px] sm:flex">
            <span className="text-emerald-400 flex items-center gap-1.5">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400"></span>
              1,120 MULE TRAPS ACTIVE
            </span>
            <span className="text-slate-400">NCRP SYNC OK</span>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
