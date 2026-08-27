import React from 'react';
import { Wifi, WifiOff, Clock, Activity, Database, Shield } from 'lucide-react';
import type { Language } from '../types';
import { useApiHealth, useCurrentTime } from '../hooks/useProductionHooks';

/**
 * SystemStatusBar — Minimalist Titanium Live API connection status.
 */
export const SystemStatusBar: React.FC<{ language: Language }> = ({ language }) => {
  const { status, latency } = useApiHealth(20000);
  const time = useCurrentTime();

  const statusConfig = {
    connected: {
      icon: <Wifi className="h-3 w-3 text-emerald-400" />,
      text: language === 'kn' ? 'ಸಂಪರ್ಕಿತ' : 'SYSTEM OPERATIONAL',
      color: 'text-emerald-400',
      dot: 'bg-emerald-400',
    },
    connecting: {
      icon: <Activity className="h-3 w-3 text-amber-400 animate-pulse" />,
      text: language === 'kn' ? 'ಸಂಪರ್ಕಿಸುತ್ತಿದೆ' : 'CONNECTING',
      color: 'text-amber-400',
      dot: 'bg-amber-400',
    },
    disconnected: {
      icon: <WifiOff className="h-3 w-3 text-rose-400" />,
      text: language === 'kn' ? 'ಆಫ್‌ಲೈನ್' : 'OFFLINE',
      color: 'text-rose-400',
      dot: 'bg-rose-400',
    },
  };

  const cfg = statusConfig[status];

  return (
    <div className="border-b border-white/[0.06] bg-[#07090e]/90 backdrop-blur-md px-4 py-1.5">
      <div className="mx-auto flex max-w-7xl items-center justify-between text-[10.5px] font-mono text-slate-400">
        {/* Left — API Status */}
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1.5">
            <span className="relative flex h-1.5 w-1.5">
              {status === 'connected' && (
                <span className={`absolute inline-flex h-full w-full animate-ping rounded-full ${cfg.dot} opacity-75`} />
              )}
              <span className={`relative inline-flex h-1.5 w-1.5 rounded-full ${cfg.dot}`} />
            </span>
            {cfg.icon}
            <span className={`font-semibold tracking-wider ${cfg.color}`}>{cfg.text}</span>
          </div>

          {latency !== null && (
            <div className="flex items-center gap-1 text-slate-400">
              <Activity className="h-2.5 w-2.5 text-sky-400" />
              <span>{latency}ms</span>
            </div>
          )}

          <div className="hidden sm:flex items-center gap-1 text-slate-400">
            <Database className="h-2.5 w-2.5 text-slate-400" />
            <span>{language === 'kn' ? 'ML ಮಾಡೆಲ್ ಸಕ್ರಿಯ' : 'ML Pipeline Active'}</span>
          </div>

          <div className="hidden md:flex items-center gap-1 text-slate-400">
            <Shield className="h-2.5 w-2.5 text-sky-400" />
            <span>TF-IDF + Indic NLP Engine</span>
          </div>
        </div>

        {/* Right — Clock */}
        <div className="flex items-center gap-3">
          <span className="text-slate-500 hidden sm:inline">
            {language === 'kn' ? 'ಕರ್ನಾಟಕ CEN ಕಮಾಂಡ್' : 'Karnataka Cyber Command'}
          </span>
          <div className="flex items-center gap-1.5 text-slate-300">
            <Clock className="h-3 w-3 text-slate-400" />
            <span className="tabular-nums font-semibold">{time} IST</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SystemStatusBar;
