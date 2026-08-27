import React from 'react';
import {
  ShieldAlert,
  Mic,
  Cpu,
  Flame,
  ArrowRight,
  Sparkles,
  FileSearch,
  Activity,
  UserCheck,
  PhoneOff,
  Link2,
  Lock,
} from 'lucide-react';
import type { Language, ActivePillar, TelemetryStats } from '../types';
import { presetPhishingSamples } from '../data/karnatakaScamData';
import { useAnimatedCounter } from '../hooks/useProductionHooks';

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
  const animThreats = useAnimatedCounter(telemetry.threatsBlocked);
  const animScams = useAnimatedCounter(telemetry.scamsIntercepted);
  const animCitizens = useAnimatedCounter(telemetry.citizensProtected);
  const animMules = useAnimatedCounter(telemetry.muleTrapTriggers);
  const animPhishing = useAnimatedCounter(telemetry.phishingUrlsDetected);
  const animDeepfakes = useAnimatedCounter(telemetry.deepfakeCallsDetected);

  return (
    <div className="relative overflow-hidden border-b border-white/[0.08] bg-gradient-to-b from-[#0e121b] via-[#080a0f] to-[#080a0f] py-14 px-4 sm:px-6 lg:px-8">
      {/* Background Titanium Ambient Spotlight */}
      <div className="pointer-events-none absolute -top-40 left-1/2 -z-10 h-[500px] w-[800px] -translate-x-1/2 rounded-full bg-gradient-to-b from-sky-400/10 via-sky-500/5 to-transparent blur-3xl" />
      <div className="pointer-events-none absolute top-1/2 right-12 -z-10 h-72 w-72 rounded-full bg-white/[0.02] blur-3xl" />

      <div className="mx-auto max-w-7xl">
        {/* Title & Badge */}
        <div className="text-center max-w-4xl mx-auto">
          <div className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/[0.05] px-4 py-1.5 text-xs font-medium text-slate-200 backdrop-blur-2xl shadow-sm">
            <Sparkles className="h-3.5 w-3.5 text-sky-400" />
            <span className="font-heading tracking-wide">
              {language === 'kn'
                ? 'ಕರ್ನಾಟಕದ ಪ್ರಥಮ ಬಹುಭಾಷಾ AI ಸೈಬರ್ ತನಿಖಾಧಿಕಾರಿ'
                : 'National Indic AI Cyber Defense & Rapid Counter-Intelligence Command'}
            </span>
          </div>

          <h1 className="mt-6 text-4xl font-extrabold tracking-tight text-white sm:text-6xl lg:text-7xl font-heading leading-[1.08]">
            {language === 'kn' ? (
              <>
                ನಿಮ್ಮ ಕುಟುಂಬಕ್ಕೆ <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-sky-200 to-sky-400">ರಕ್ಷಾ ಕವಚ</span>
              </>
            ) : (
              <>
                Autonomous Indic <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-sky-200 to-sky-400">Cyber Defense</span> for Every Citizen
              </>
            )}
          </h1>

          <p className="mx-auto mt-5 max-w-2xl text-sm leading-relaxed text-slate-400 sm:text-base font-sans">
            {language === 'kn'
              ? 'ಫಿಶಿಂಗ್ ಸಂದೇಶಗಳು, AI ವಾಯ್ಸ್ ಕ್ಲೋನ್ ನಕಲಿ ಕರೆಗಳು, ಸೈಡ್‌ಲೋಡ್ ಸಾಲದ ಆ್ಯಪ್‌ಗಳು ಮತ್ತು ಬ್ಯಾಂಕಿಂಗ್ ವಂಚನೆಗಳನ್ನು ತಕ್ಷಣ ತಡೆಹಿಡಿಯಿರಿ. 1930 ಗೋಲ್ಡನ್ ಅವರ್ ಪ್ರೋಟೋಕಾಲ್ ಮೂಲಕ ನಿಮ್ಮ ಹಣವನ್ನು ರಕ್ಷಿಸಿ.'
              : 'Real-time Indic NLP triage across 12 languages, acoustic voice clone forensics, autonomous honeypot syndicate traps, and 1930 NCRP Golden Hour rapid freeze command.'}
          </p>

          {/* Quick Primary Actions (Apple-style pill buttons) */}
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3 sm:gap-3.5">
            <button
              type="button"
              onClick={() => onSelectPillar('phishing')}
              className="flex items-center gap-2 rounded-full bg-white px-6 py-3.5 text-sm font-heading font-bold text-slate-950 shadow-xl shadow-white/10 transition-all duration-200 hover:scale-105 hover:bg-sky-50 hover:text-sky-950 active:scale-95 cursor-pointer"
            >
              <FileSearch className="h-4 w-4 text-sky-600" />
              <span>{language === 'kn' ? 'ಸಂದೇಶ / ಲಿಂಕ್ ಸ್ಕ್ಯಾನ್ ಮಾಡಿ' : 'Analyze SMS / Link / QR'}</span>
              <ArrowRight className="h-4 w-4 text-slate-500" />
            </button>

            <button
              type="button"
              onClick={() => onSelectPillar('voice')}
              className="flex items-center gap-2 rounded-full border border-white/15 bg-white/[0.04] px-5 py-3.5 text-sm font-heading font-semibold text-slate-200 backdrop-blur-2xl transition-all duration-200 hover:border-sky-400/40 hover:bg-white/[0.08] hover:text-white cursor-pointer"
            >
              <Mic className="h-4 w-4 text-sky-400" />
              <span>{language === 'kn' ? 'AI ಧ್ವನಿ ಕ್ಲೋನ್ ಪರೀಕ್ಷೆ' : 'Deepfake Voice Guard'}</span>
            </button>

            <button
              type="button"
              onClick={() => onSelectPillar('honeypot')}
              className="flex items-center gap-2 rounded-full border border-white/15 bg-white/[0.04] px-5 py-3.5 text-sm font-heading font-semibold text-slate-200 backdrop-blur-2xl transition-all duration-200 hover:border-purple-400/40 hover:bg-white/[0.08] hover:text-white cursor-pointer"
            >
              <Cpu className="h-4 w-4 text-purple-400" />
              <span>{language === 'kn' ? 'AI ಹನಿಪಾಟ್ ಟ್ರ್ಯಾಪ್' : 'Deploy Honeypot Trap'}</span>
            </button>

            <button
              type="button"
              onClick={() => onSelectPillar('golden-hour')}
              className="flex items-center gap-2 rounded-full border border-rose-500/40 bg-rose-500/10 px-5 py-3.5 text-sm font-heading font-bold text-rose-300 backdrop-blur-2xl transition-all duration-200 hover:bg-rose-500/20 hover:border-rose-500 cursor-pointer"
            >
              <Flame className="h-4 w-4 text-rose-400 animate-pulse" />
              <span>{language === 'kn' ? '1930 ಗೋಲ್ಡನ್ ಅವರ್' : '1930 Emergency Freeze'}</span>
            </button>
          </div>
        </div>

        {/* Live Telemetry Cards (Curved Titanium Glass) */}
        <div className="mt-14 grid grid-cols-2 gap-3.5 sm:grid-cols-3 lg:grid-cols-6">
          <div className="figma-card p-4 text-center group cursor-default">
            <div className="flex justify-center mb-2">
              <div className="h-8 w-8 rounded-xl bg-white/[0.05] border border-white/10 flex items-center justify-center text-sky-400">
                <Activity className="h-4 w-4" />
              </div>
            </div>
            <div className="font-mono text-2xl font-black text-white tracking-tight group-hover:scale-105 transition-transform">
              {animThreats.toLocaleString()}
            </div>
            <div className="mt-1 text-[11px] font-medium text-slate-400 font-heading">
              {language === 'kn' ? 'ತಡೆದ ಬೆದರಿಕೆಗಳು' : 'Threats Blocked'}
            </div>
          </div>

          <div className="figma-card p-4 text-center group cursor-default">
            <div className="flex justify-center mb-2">
              <div className="h-8 w-8 rounded-xl bg-white/[0.05] border border-white/10 flex items-center justify-center text-emerald-400">
                <ShieldAlert className="h-4 w-4" />
              </div>
            </div>
            <div className="font-mono text-2xl font-black text-emerald-300 tracking-tight group-hover:scale-105 transition-transform">
              {animScams.toLocaleString()}
            </div>
            <div className="mt-1 text-[11px] font-medium text-slate-400 font-heading">
              {language === 'kn' ? 'ತಡೆದ ವಂಚನೆಗಳು' : 'Scams Neutralized'}
            </div>
          </div>

          <div className="figma-card p-4 text-center group cursor-default">
            <div className="flex justify-center mb-2">
              <div className="h-8 w-8 rounded-xl bg-white/[0.05] border border-white/10 flex items-center justify-center text-purple-400">
                <UserCheck className="h-4 w-4" />
              </div>
            </div>
            <div className="font-mono text-2xl font-black text-purple-300 tracking-tight group-hover:scale-105 transition-transform">
              {animCitizens.toLocaleString()}
            </div>
            <div className="mt-1 text-[11px] font-medium text-slate-400 font-heading">
              {language === 'kn' ? 'ರಕ್ಷಿತ ನಾಗರಿಕರು' : 'Citizens Shielded'}
            </div>
          </div>

          <div className="figma-card p-4 text-center group cursor-default">
            <div className="flex justify-center mb-2">
              <div className="h-8 w-8 rounded-xl bg-white/[0.05] border border-white/10 flex items-center justify-center text-amber-400">
                <Lock className="h-4 w-4" />
              </div>
            </div>
            <div className="font-mono text-2xl font-black text-amber-300 tracking-tight group-hover:scale-105 transition-transform">
              {animMules.toLocaleString()}
            </div>
            <div className="mt-1 text-[11px] font-medium text-slate-400 font-heading">
              {language === 'kn' ? 'ಬಂಧಿತ ಮ್ಯೂಲ್ ಖಾತೆಗಳು' : 'Mule Traps Set'}
            </div>
          </div>

          <div className="figma-card p-4 text-center group cursor-default">
            <div className="flex justify-center mb-2">
              <div className="h-8 w-8 rounded-xl bg-white/[0.05] border border-white/10 flex items-center justify-center text-rose-400">
                <Link2 className="h-4 w-4" />
              </div>
            </div>
            <div className="font-mono text-2xl font-black text-rose-300 tracking-tight group-hover:scale-105 transition-transform">
              {animPhishing.toLocaleString()}
            </div>
            <div className="mt-1 text-[11px] font-medium text-slate-400 font-heading">
              {language === 'kn' ? 'ಪತ್ತೆಯಾದ URLಗಳು' : 'Phishing URLs Blocked'}
            </div>
          </div>

          <div className="figma-card p-4 text-center group cursor-default">
            <div className="flex justify-center mb-2">
              <div className="h-8 w-8 rounded-xl bg-white/[0.05] border border-white/10 flex items-center justify-center text-sky-400">
                <PhoneOff className="h-4 w-4" />
              </div>
            </div>
            <div className="font-mono text-2xl font-black text-sky-300 tracking-tight group-hover:scale-105 transition-transform">
              {animDeepfakes.toLocaleString()}
            </div>
            <div className="mt-1 text-[11px] font-medium text-slate-400 font-heading">
              {language === 'kn' ? 'ಡೀಪ್‌ಫೇಕ್ ಕರೆಗಳು' : 'Deepfakes Flagged'}
            </div>
          </div>
        </div>

        {/* 1-Click Incident Audit Presets */}
        <div className="mt-10 figma-card-static p-6 sm:p-7">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-white/[0.08] pb-4">
            <div className="flex items-center gap-2.5">
              <div className="h-8 w-8 rounded-xl bg-white/[0.05] border border-white/10 flex items-center justify-center text-sky-400">
                <ShieldAlert className="h-4 w-4" />
              </div>
              <div>
                <h3 className="text-sm font-bold tracking-tight text-white font-heading">
                  {language === 'kn'
                    ? 'ತ್ವರಿತ ಪರೀಕ್ಷಾ ಮಾದರಿಗಳು (1-Click Scam Audit Presets)'
                    : 'Verified Threat Vectors for 1-Click Forensic Triage'}
                </h3>
                <p className="text-xs text-slate-400 font-sans">
                  {language === 'kn' ? 'ಯಾವುದಾದರೂ ಮಾದರಿಯ ಮೇಲೆ ಕ್ಲಿಕ್ ಮಾಡಿ' : 'Click any preset below to run real-time Indic ML analysis'}
                </p>
              </div>
            </div>
          </div>

          <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {presetPhishingSamples.map((preset, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => {
                  onSelectPreset(preset.text);
                  onSelectPillar('phishing');
                }}
                className="group flex flex-col items-start rounded-2xl border border-white/[0.07] bg-white/[0.02] p-4 text-left transition-all duration-200 hover:border-sky-400/40 hover:bg-white/[0.06] hover:shadow-xl hover:shadow-sky-500/5 cursor-pointer"
              >
                <div className="flex w-full items-center justify-between">
                  <span className="rounded-full bg-white/[0.06] border border-white/10 px-2.5 py-0.5 font-mono text-[9.5px] font-semibold text-sky-300">
                    {preset.category}
                  </span>
                  <span className="text-[10.5px] font-medium text-slate-500 group-hover:text-sky-300 transition-colors">
                    {preset.language.toUpperCase()} →
                  </span>
                </div>
                <h4 className="mt-2.5 text-xs font-bold text-slate-200 group-hover:text-white transition-colors font-heading">
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

export default HeroSection;
