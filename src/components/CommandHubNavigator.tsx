import React from 'react';
import {
  LayoutDashboard,
  FileSearch,
  Mic,
  Cpu,
  Smartphone,
  Flame,
  Network,
  GraduationCap,
  HeartPulse,
  ShieldOff,
  Megaphone,
  FileWarning,
  Building2,
} from 'lucide-react';
import type { ActivePillar, Language } from '../types';

interface CommandHubNavigatorProps {
  activePillar: ActivePillar;
  onSelectPillar: (pillar: ActivePillar) => void;
  language: Language;
}

export const CommandHubNavigator: React.FC<CommandHubNavigatorProps> = ({
  activePillar,
  onSelectPillar,
  language,
}) => {
  const pillars: {
    id: ActivePillar;
    name: string;
    nameKn: string;
    desc: string;
    descKn: string;
    icon: React.ComponentType<{ className?: string }>;
    accent: 'ice' | 'white' | 'purple' | 'emerald' | 'rose' | 'amber' | 'sky';
    badge?: string;
  }[] = [
    {
      id: 'dashboard',
      name: 'Command HQ',
      nameKn: 'ಕಮಾಂಡ್ ಕೇಂದ್ರ',
      desc: 'Threat Telemetry & HUD',
      descKn: 'ರಾಷ್ಟ್ರೀಯ ಬೆದರಿಕೆ ಅವಲೋಕನ',
      icon: LayoutDashboard,
      accent: 'ice',
    },
    {
      id: 'phishing',
      name: 'Indic NLP Triage',
      nameKn: 'ಫಿಶಿಂಗ್ ಸ್ಕ್ಯಾನರ್',
      desc: '12-Lang SMS / URL Scanner',
      descKn: '12 ಭಾಷೆಗಳ ಎಸ್‌ಎಂಎಸ್ / ಲಿಂಕ್',
      icon: FileSearch,
      accent: 'ice',
      badge: 'OCR VISION',
    },
    {
      id: 'voice',
      name: 'Voice Forensics',
      nameKn: 'ಧ್ವನಿ ಕ್ಲೋನ್ ತಪಾಸಣೆ',
      desc: 'Deepfake Voice Detector',
      descKn: 'ಡೀಪ್‌ಫೇಕ್ ಆಡಿಯೋ ತಪಾಸಣೆ',
      icon: Mic,
      accent: 'ice',
      badge: 'LIVE MIC',
    },
    {
      id: 'honeypot',
      name: 'AI Honeypot',
      nameKn: 'AI ಹನಿಪಾಟ್ ಟ್ರ್ಯಾಪ್',
      desc: 'Autonomous Scammer Trap',
      descKn: 'ವಂಚಕರ ಬಲೆ & ಮ್ಯೂಲ್ ಬೇಟೆ',
      icon: Cpu,
      accent: 'purple',
      badge: 'AUTONOMOUS',
    },
    {
      id: 'apk',
      name: 'APK Sandbox',
      nameKn: 'APK ಮಾಲ್‌ವೇರ್ ಲ್ಯಾಬ್',
      desc: 'Permission & C2 Inspector',
      descKn: 'ಆ್ಯಪ್ & C2 ಸರ್ವರ್ ತಪಾಸಣೆ',
      icon: Smartphone,
      accent: 'emerald',
      badge: 'SANDBOX',
    },
    {
      id: 'golden-hour',
      name: '1930 Rapid Freeze',
      nameKn: '1930 ಗೋಲ್ಡನ್ ಅವರ್',
      desc: 'Emergency Account Freeze',
      descKn: 'ಬ್ಯಾಂಕ್ ಖಾತೆ ತುರ್ತು ಫ್ರೀಜ್',
      icon: Flame,
      accent: 'rose',
      badge: 'URGENT',
    },
    {
      id: 'cen-stations',
      name: 'CEN Stations',
      nameKn: 'CEN ಠಾಣೆಗಳು & FIR',
      desc: '31 Karnataka Cyber Police',
      descKn: 'ಕರ್ನಾಟಕ ಸೈಬರ್ ಪೊಲೀಸ್',
      icon: Building2,
      accent: 'ice',
      badge: 'SOS',
    },
    {
      id: 'intelligence',
      name: 'Threat Radar & DNA',
      nameKn: 'ಸ್ಕ್ಯಾಮ್ DNA ಮತ್ತು ರೇಡಾರ್',
      desc: 'Syndicate Memory Graph',
      descKn: 'ಕರ್ನಾಟಕ ಜಿಲ್ಲಾ ಬೆದರಿಕೆ ರೇಡಾರ್',
      icon: Network,
      accent: 'amber',
    },
    {
      id: 'education',
      name: 'Cyber Academy',
      nameKn: 'ಸೈಬರ್ ಶಿಕ್ಷಣ & ಸಿಮ್ಯುಲೇಶನ್',
      desc: 'Roleplay & Quizzes',
      descKn: 'ನಾಗರಿಕ ಜಾಗೃತಿ ಮತ್ತು ಲ್ಯಾಬ್',
      icon: GraduationCap,
      accent: 'sky',
    },
    {
      id: 'cyber-health',
      name: 'Cyber Health',
      nameKn: 'ಸೈಬರ್ ಆರೋಗ್ಯ',
      desc: 'Risk Assessment Score',
      descKn: 'ವೈಯಕ್ತಿಕ ಸುರಕ್ಷತಾ ಮೌಲ್ಯಮಾಪನ',
      icon: HeartPulse,
      accent: 'rose',
      badge: 'SCORE',
    },
    {
      id: 'breach-check',
      name: 'Leak Checker',
      nameKn: 'ಸೋರಿಕೆ ಪರೀಕ್ಷೆ',
      desc: 'Dark Web Breach Scan',
      descKn: 'ಡಾರ್ಕ್ ವೆಬ್ ಡೇಟಾ ಸೋರಿಕೆ',
      icon: ShieldOff,
      accent: 'purple',
    },
    {
      id: 'community',
      name: 'Alert Wall',
      nameKn: 'ಸಮುದಾಯ ಎಚ್ಚರಿಕೆ',
      desc: 'Crowdsourced Reports',
      descKn: 'ಸಮುದಾಯ ವಂಚನೆ ವರದಿ',
      icon: Megaphone,
      accent: 'amber',
      badge: 'LIVE',
    },
    {
      id: 'report',
      name: 'Incident Wizard',
      nameKn: 'ವರದಿ ಸಲ್ಲಿಸಿ',
      desc: '1930 NCRP Docket Filing',
      descKn: 'ಘಟನೆ ವರದಿ & 1930 ದೂರು',
      icon: FileWarning,
      accent: 'rose',
    },
  ];

  return (
    <div className="border-b border-white/[0.08] bg-[#0c0f17]/70 px-4 py-3 sm:px-6 backdrop-blur-2xl">
      <div className="mx-auto max-w-7xl">
        <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
          {pillars.map((pillar) => {
            const Icon = pillar.icon;
            const isActive = activePillar === pillar.id;

            return (
              <button
                key={pillar.id}
                type="button"
                onClick={() => onSelectPillar(pillar.id)}
                className={`group relative flex shrink-0 items-center gap-2.5 rounded-2xl px-3.5 py-2 text-left transition-all duration-200 cursor-pointer ${
                  isActive
                    ? 'border border-sky-400/40 bg-gradient-to-b from-white/[0.12] to-white/[0.04] text-white shadow-lg shadow-sky-500/10 ring-1 ring-white/15 backdrop-blur-xl'
                    : 'border border-white/[0.06] bg-white/[0.02] text-slate-400 hover:border-white/15 hover:bg-white/[0.05] hover:text-slate-200'
                }`}
              >
                <div
                  className={`flex h-7 w-7 items-center justify-center rounded-xl transition-all duration-200 ${
                    isActive
                      ? 'bg-sky-400/20 text-sky-300 ring-1 ring-sky-400/30'
                      : 'bg-white/[0.04] text-slate-400 group-hover:text-slate-200 group-hover:bg-white/[0.08]'
                  }`}
                >
                  <Icon className="h-4 w-4" />
                </div>

                <div className="flex flex-col">
                  <div className="flex items-center gap-1.5">
                    <span
                      className={`font-heading text-xs font-bold tracking-tight whitespace-nowrap ${
                        isActive ? 'text-white' : 'text-slate-300'
                      }`}
                    >
                      {language === 'kn' ? pillar.nameKn : pillar.name}
                    </span>
                    {pillar.badge && (
                      <span
                        className={`rounded-full px-1.5 py-0.2 text-[8px] font-mono font-bold uppercase tracking-wider ${
                          pillar.accent === 'rose'
                            ? 'bg-rose-500/20 text-rose-300 border border-rose-500/30'
                            : 'bg-sky-400/15 text-sky-300 border border-sky-400/25'
                        }`}
                      >
                        {pillar.badge}
                      </span>
                    )}
                  </div>
                  <span className="hidden text-[10px] text-slate-400 lg:block font-sans whitespace-nowrap">
                    {language === 'kn' ? pillar.descKn : pillar.desc}
                  </span>
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default CommandHubNavigator;
