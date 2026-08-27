import React from 'react';
import {
  ShieldAlert,
  Mic,
  Cpu,
  Flame,
  ArrowRight,
  Sparkles,
  FileSearch,
} from 'lucide-react';
import type { Language, ActivePillar, TelemetryStats } from '../types';
import { presetPhishingSamples } from '../data/karnatakaScamData';

interface HeroSectionProps {
  language: Language;
  telemetry: TelemetryStats;
  onSelectPillar: (pillar: ActivePillar) => void;
  onSelectPreset: (presetText: string) => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  language,
  telemetry,
  onSelectPillar,
  onSelectPreset,
}) => {
  return (
    <div className="relative overflow-hidden border-b border-slate-800/80 bg-gradient-to-b from-slate-950 via-slate-900/60 to-slate-950 py-10 px-4 sm:px-6 lg:px-8">
      {/* Background Decorative Glow */}
      <div className="pointer-events-none absolute -top-40 left-1/2 -z-10 h-96 w-[600px] -translate-x-1/2 rounded-full bg-cyan-500/10 blur-3xl" />
      <div className="pointer-events-none absolute top-1/2 right-10 -z-10 h-72 w-72 rounded-full bg-red-500/5 blur-3xl" />

      <div className="mx-auto max-w-7xl">
        {/* Title & Badge */}
        <div className="text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-cyan-500/30 bg-cyan-950/40 px-3.5 py-1 text-xs font-semibold text-cyan-300 backdrop-blur-md">
            <Sparkles className="h-3.5 w-3.5 text-cyan-400 animate-spin" />
            <span>
              {language === 'kn'
                ? 'ಕರ್ನಾಟಕದ ಪ್ರಥಮ ಬಹುಭಾಷಾ AI ಸೈಬರ್ ತನಿಖಾಧಿಕಾರಿ'
                : 'National Indic AI Cyber Investigation & Rapid Counter-Intelligence Command'}
            </span>
          </div>

          <h1 className="mt-4 text-3xl font-extrabold tracking-tight text-white sm:text-5xl lg:text-6xl">
            {language === 'kn' ? (
              <>
                ನಿಮ್ಮ ಕುಟುಂಬಕ್ಕೆ <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-teal-300 to-emerald-400">ರಕ್ಷಾ ಕವಚ</span>
              </>
            ) : (
              <>
                Autonomous Indic <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-teal-300 to-emerald-400">Cyber Defense</span> for Every Citizen
              </>
            )}
          </h1>

          <p className="mx-auto mt-4 max-w-3xl text-sm leading-relaxed text-slate-300 sm:text-base">
            {language === 'kn'
              ? 'ಫಿಶಿಂಗ್ ಸಂದೇಶಗಳು, AI ವಾಯ್ಸ್ ಕ್ಲೋನ್ ನಕಲಿ ಕರೆಗಳು, ಸೈಡ್‌ಲೋಡ್ ಸಾಲದ ಆ್ಯಪ್‌ಗಳು ಮತ್ತು ಬ್ಯಾಂಕಿಂಗ್ ವಂಚನೆಗಳನ್ನು ತಕ್ಷಣ ತಡೆಹಿಡಿಯಿರಿ. 1930 ಗೋಲ್ಡನ್ ಅವರ್ ಪ್ರೋಟೋಕಾಲ್ ಮೂಲಕ ನಿಮ್ಮ ಹಣವನ್ನು ರಕ್ಷಿಸಿ.'
              : 'Real-time Indic NLP triage for 12 Indian languages, acoustic voice clone forensics, autonomous AI honeypot syndicate traps, and 1930 NCRP Golden Hour rapid freeze command.'}
          </p>

          {/* Quick Primary Actions */}
          <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
            <button
              type="button"
              onClick={() => onSelectPillar('phishing')}
              className="flex items-center gap-2 rounded-xl bg-gradient-to-r from-cyan-500 to-teal-600 px-5 py-2.5 text-sm font-bold text-slate-950 shadow-lg shadow-cyan-500/25 transition-all hover:scale-105 hover:shadow-cyan-500/40"
            >
              <FileSearch className="h-4 w-4" />
              <span>{language === 'kn' ? 'ಸಂದೇಶ / ಲಿಂಕ್ ಸ್ಕ್ಯಾನ್ ಮಾಡಿ' : 'Analyze SMS / Link / QR'}</span>
              <ArrowRight className="h-4 w-4" />
            </button>

            <button
              type="button"
              onClick={() => onSelectPillar('voice')}
              className="flex items-center gap-2 rounded-xl border border-slate-700 bg-slate-900/90 px-4 py-2.5 text-sm font-semibold text-slate-200 transition-all hover:border-cyan-500/50 hover:bg-slate-800"
            >
              <Mic className="h-4 w-4 text-cyan-400" />
              <span>{language === 'kn' ? 'AI ಧ್ವನಿ ಕ್ಲೋನ್ ಪರೀಕ್ಷೆ' : 'Deepfake Voice Guard'}</span>
            </button>

            <button
              type="button"
              onClick={() => onSelectPillar('honeypot')}
              className="flex items-center gap-2 rounded-xl border border-purple-500/30 bg-purple-950/30 px-4 py-2.5 text-sm font-semibold text-purple-200 transition-all hover:border-purple-500/60 hover:bg-purple-900/40"
            >
              <Cpu className="h-4 w-4 text-purple-400" />
              <span>{language === 'kn' ? 'AI ಹನಿಪಾಟ್ ಟ್ರ್ಯಾಪ್' : 'Deploy Honeypot Trap'}</span>
            </button>

            <button
              type="button"
              onClick={() => onSelectPillar('golden-hour')}
              className="flex items-center gap-2 rounded-xl border border-red-500/40 bg-red-950/30 px-4 py-2.5 text-sm font-bold text-red-300 transition-all hover:border-red-500 hover:bg-red-900/40"
            >
              <Flame className="h-4 w-4 text-red-400 animate-pulse" />
              <span>{language === 'kn' ? '1930 ಗೋಲ್ಡನ್ ಅವರ್' : '1930 Emergency Freeze'}</span>
            </button>
          </div>
        </div>

        {/* Live Telemetry Cards */}
        <div className="mt-8 grid grid-cols-2 gap-3.5 sm:grid-cols-3 lg:grid-cols-6">
          <div className="figma-card p-3.5 text-center group cursor-default">
            <div className="font-mono text-xl font-extrabold text-cyan-400 sm:text-2xl tracking-tight group-hover:scale-105 transition-transform">
              {telemetry.threatsBlocked.toLocaleString()}
            </div>
            <div className="mt-1 text-[11px] font-semibold text-slate-300">
              {language === 'kn' ? 'ತಡೆದ ಬೆದರಿಕೆಗಳು' : 'Threats Blocked'}
            </div>
          </div>

          <div className="figma-card p-3.5 text-center group cursor-default">
            <div className="font-mono text-xl font-extrabold text-emerald-400 sm:text-2xl tracking-tight group-hover:scale-105 transition-transform">
              {telemetry.scamsIntercepted.toLocaleString()}
            </div>
            <div className="mt-1 text-[11px] font-semibold text-slate-300">
              {language === 'kn' ? 'ತಡೆದ ವಂಚನೆಗಳು' : 'Scams Neutralized'}
            </div>
          </div>

          <div className="figma-card p-3.5 text-center group cursor-default">
            <div className="font-mono text-xl font-extrabold text-purple-400 sm:text-2xl tracking-tight group-hover:scale-105 transition-transform">
              {telemetry.citizensProtected.toLocaleString()}
            </div>
            <div className="mt-1 text-[11px] font-semibold text-slate-300">
              {language === 'kn' ? 'ರಕ್ಷಿತ ನಾಗರಿಕರು' : 'Citizens Shielded'}
            </div>
          </div>

          <div className="figma-card p-3.5 text-center group cursor-default">
            <div className="font-mono text-xl font-extrabold text-amber-400 sm:text-2xl tracking-tight group-hover:scale-105 transition-transform">
              {telemetry.muleTrapTriggers.toLocaleString()}
            </div>
            <div className="mt-1 text-[11px] font-semibold text-slate-300">
              {language === 'kn' ? 'ಬಂಧಿತ ಮ್ಯೂಲ್ ಖಾತೆಗಳು' : 'Mule Accounts Trapped'}
            </div>
          </div>

          <div className="figma-card p-3.5 text-center group cursor-default">
            <div className="font-mono text-xl font-extrabold text-rose-400 sm:text-2xl tracking-tight group-hover:scale-105 transition-transform">
              {telemetry.phishingUrlsDetected.toLocaleString()}
            </div>
            <div className="mt-1 text-[11px] font-semibold text-slate-300">
              {language === 'kn' ? 'ಪತ್ತೆಯಾದ URLಗಳು' : 'Phishing URLs Blocked'}
            </div>
          </div>

          <div className="figma-card p-3.5 text-center group cursor-default">
            <div className="font-mono text-xl font-extrabold text-blue-400 sm:text-2xl tracking-tight group-hover:scale-105 transition-transform">
              {telemetry.deepfakeCallsDetected.toLocaleString()}
            </div>
            <div className="mt-1 text-[11px] font-semibold text-slate-300">
              {language === 'kn' ? 'ಡೀಪ್‌ಫೇಕ್ ಕರೆಗಳು' : 'Deepfakes Flagged'}
            </div>
          </div>
        </div>

        {/* 1-Click Incident Audit Presets */}
        <div className="mt-8 figma-card-static p-5 sm:p-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800/80 pb-3">
            <div className="flex items-center gap-2">
              <ShieldAlert className="h-4 w-4 text-cyan-400" />
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-200">
                {language === 'kn'
                  ? 'ತ್ವರಿತ ಪರೀಕ್ಷಾ ಮಾದರಿಗಳು (1-Click Scam Audit Presets)'
                  : 'Live Threat Presets for 1-Click Forensic Triage'}
              </h3>
            </div>
            <span className="text-[11px] text-slate-400">
              {language === 'kn' ? 'ಯಾವುದಾದರೂ ಮಾದರಿಯ ಮೇಲೆ ಕ್ಲಿಕ್ ಮಾಡಿ' : 'Click any preset to run immediate AI analysis'}
            </span>
          </div>

          <div className="mt-3 grid grid-cols-1 gap-2 sm:grid-cols-2 lg:grid-cols-3">
            {presetPhishingSamples.map((preset, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => {
                  onSelectPreset(preset.text);
                  onSelectPillar('phishing');
                }}
                className="group flex flex-col items-start rounded-xl border border-slate-800/80 bg-slate-950/70 p-3.5 text-left transition-all hover:border-cyan-500/50 hover:bg-slate-900 hover:shadow-lg hover:shadow-cyan-500/5"
              >
                <div className="flex w-full items-center justify-between">
                  <span className="rounded-md bg-slate-800/90 border border-slate-700/60 px-2 py-0.5 font-mono text-[10px] font-bold text-cyan-300">
                    {preset.category}
                  </span>
                  <span className="text-[10px] font-bold text-slate-500 group-hover:text-cyan-400 transition-colors">
                    {preset.language.toUpperCase()} →
                  </span>
                </div>
                <h4 className="mt-2 text-xs font-bold text-slate-200 group-hover:text-cyan-300 transition-colors">
                  {language === 'kn' ? preset.titleKn : preset.title}
                </h4>
                <p className="mt-1 line-clamp-2 text-[11px] text-slate-400 font-sans leading-relaxed">
                  {preset.text}
                </p>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
