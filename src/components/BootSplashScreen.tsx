import React, { useState, useEffect } from 'react';
import { Shield } from 'lucide-react';

/**
 * BootSplashScreen — Minimalist Apple-style dark luxury loading screen.
 */
export const BootSplashScreen: React.FC<{ onComplete: () => void }> = ({ onComplete }) => {
  const [phase, setPhase] = useState<'logo' | 'text' | 'status' | 'fadeout'>('logo');

  useEffect(() => {
    const t1 = setTimeout(() => setPhase('text'), 180);
    const t2 = setTimeout(() => setPhase('status'), 550);
    const t3 = setTimeout(() => setPhase('fadeout'), 1150);
    const t4 = setTimeout(() => onComplete(), 1450);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
      clearTimeout(t4);
    };
  }, [onComplete]);

  return (
    <div
      className={`fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-[#080a0f] transition-opacity duration-300 ${
        phase === 'fadeout' ? 'opacity-0 pointer-events-none' : 'opacity-100'
      }`}
    >
      {/* Subtle ambient glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full bg-sky-400/[0.06] blur-3xl" />

      {/* Logo */}
      <div
        className={`relative transition-all duration-400 ease-out ${
          phase === 'logo' ? 'scale-75 opacity-0' : 'scale-100 opacity-100'
        }`}
      >
        <div className="flex h-20 w-20 items-center justify-center rounded-3xl bg-gradient-to-b from-white/20 via-white/5 to-white/0 p-[1px] shadow-2xl shadow-sky-500/10">
          <div className="flex h-full w-full items-center justify-center rounded-[23px] bg-[#121622] border border-white/10">
            <Shield className="h-10 w-10 text-sky-400" />
          </div>
        </div>
        <span className="absolute -top-1 -right-1 flex h-3.5 w-3.5">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-sky-400 opacity-75" />
          <span className="relative inline-flex h-3.5 w-3.5 rounded-full bg-sky-400 ring-2 ring-[#080a0f]" />
        </span>
      </div>

      {/* Title */}
      <div
        className={`mt-6 text-center transition-all duration-300 ${
          ['text', 'status', 'fadeout'].includes(phase) ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'
        }`}
      >
        <h1 className="font-heading text-3xl font-extrabold tracking-tight text-white">
          RAKSHA <span className="bg-gradient-to-r from-sky-300 via-sky-400 to-cyan-300 bg-clip-text text-transparent">AI</span>
        </h1>
        <p className="mt-1 text-xs font-mono text-slate-400 tracking-widest uppercase">
          OMNIKON • ರಕ್ಷಾ ಕವಚ
        </p>
      </div>

      {/* Status line */}
      <div
        className={`mt-6 flex flex-col items-center gap-3 transition-all duration-300 ${
          ['status', 'fadeout'].includes(phase) ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'
        }`}
      >
        {/* Loading bar */}
        <div className="w-48 h-1 rounded-full bg-white/[0.08] overflow-hidden">
          <div
            className="h-full rounded-full bg-gradient-to-r from-sky-400 via-white to-sky-400 transition-all duration-[750ms] ease-out"
            style={{ width: ['status', 'fadeout'].includes(phase) ? '100%' : '0%' }}
          />
        </div>
      </div>
    </div>
  );
};

export default BootSplashScreen;
