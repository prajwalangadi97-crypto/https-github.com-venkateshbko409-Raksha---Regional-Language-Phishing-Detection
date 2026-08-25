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
    accent: string;
    badge?: string;
  }[] = [
    {
      id: 'dashboard',
      name: 'Command HQ',
      nameKn: 'ಕಮಾಂಡ್ ಕೇಂದ್ರ',
      desc: 'National Threat Telemetry & HUD',
      descKn: 'ರಾಷ್ಟ್ರೀಯ ಬೆದರಿಕೆ ಅವಲೋಕನ',
      icon: LayoutDashboard,
      accent: 'cyan',
    },
    {
      id: 'phishing',
      name: 'Indic NLP Triage',
      nameKn: 'ಫಿಶಿಂಗ್ ಸ್ಕ್ಯಾನರ್',
      desc: 'Multimodal 12-Language SMS / URL Scanner',
      descKn: '12 ಭಾಷೆಗಳ ಎಸ್‌ಎಂಎಸ್ / ಲಿಂಕ್ ವಿಶ್ಲೇಷಣೆ',
      icon: FileSearch,
      accent: 'teal',
      badge: 'MULTIMODAL',
    },
    {
      id: 'voice',
      name: 'Voice Forensics',
      nameKn: 'ಧ್ವನಿ ಕ್ಲೋನ್ ತಪಾಸಣೆ',
      desc: 'Acoustic Deepfake Analyzer & Safe Word',
      descKn: 'ಡೀಪ್‌ಫೇಕ್ ಆಡಿಯೋ & ಸೇಫ್ ವರ್ಡ್',
      icon: Mic,
      accent: 'blue',
      badge: 'SPECTRAL AI',
    },
    {
      id: 'honeypot',
      name: 'AI Honeypot Trap',
      nameKn: 'AI ಹನಿಪಾಟ್ ಟ್ರ್ಯಾಪ್',
      desc: 'Autonomous Baiting & Mule Harvester',
      descKn: 'ಸ್ವಯಂಚಾಲಿತ ವಂಚಕರ ಬಲೆ & ಮ್ಯೂಲ್ ಖಾತೆ ಬೇಟೆ',
      icon: Cpu,
      accent: 'purple',
      badge: 'AUTONOMOUS',
    },
    {
      id: 'apk',
      name: 'APK Sandbox',
      nameKn: 'APK ಮಾಲ್‌ವೇರ್ ಲ್ಯಾಬ್',
      desc: 'Sideload Permission & C2 Inspector',
      descKn: 'ಸೈಡ್‌ಲೋಡ್ ಆ್ಯಪ್ & C2 ಸರ್ವರ್ ತಪಾಸಣೆ',
      icon: Smartphone,
      accent: 'emerald',
    },
    {
      id: 'golden-hour',
      name: '1930 Rapid Freeze',
      nameKn: '1930 ಗೋಲ್ಡನ್ ಅವರ್',
      desc: '2-Hour Critical Window Bank Freeze Notice',
      descKn: 'ಬ್ಯಾಂಕ್ ಖಾತೆ ತುರ್ತು ಫ್ರೀಜ್ ನೋಟಿಸ್',
      icon: Flame,
      accent: 'red',
      badge: 'URGENT',
    },
    {
      id: 'intelligence',
      name: 'Scam DNA & Radar',
      nameKn: 'ಸ್ಕ್ಯಾಮ್ DNA ಮತ್ತು ರೇಡಾರ್',
      desc: 'Syndicate Memory Graph & Karnataka Radar',
      descKn: 'ಕರ್ನಾಟಕ ಜಿಲ್ಲಾ ಬೆದರಿಕೆ ರೇಡಾರ್',
      icon: Network,
      accent: 'amber',
    },
    {
      id: 'education',
      name: 'Cyber Tutor & Lab',
      nameKn: 'ಸೈಬರ್ ಶಿಕ್ಷಣ & ಸಿಮ್ಯುಲೇಶನ್',
      desc: 'Interactive Roleplay & Citizen Quizzes',
      descKn: 'ನಾಗರಿಕ ಜಾಗೃತಿ ಮತ್ತು ಸಿಮ್ಯುಲೇಶನ್',
      icon: GraduationCap,
      accent: 'sky',
    },
  ];

  return (
    <div className="border-b border-slate-800/80 bg-slate-950/90 px-4 py-3 sm:px-6 backdrop-blur-md">
      <div className="mx-auto max-w-7xl">
        <div className="flex items-center justify-between gap-4 overflow-x-auto pb-2 scrollbar-none sm:pb-0">
          <div className="flex items-center gap-2">
            {pillars.map((pillar) => {
              const Icon = pillar.icon;
              const isActive = activePillar === pillar.id;

              return (
                <button
                  key={pillar.id}
                  type="button"
                  onClick={() => onSelectPillar(pillar.id)}
                  className={`group relative flex shrink-0 items-center gap-2.5 rounded-xl px-3.5 py-2.5 text-left transition-all ${
                    isActive
                      ? 'border border-cyan-500/50 bg-gradient-to-r from-cyan-950/80 to-slate-900 text-cyan-300 shadow-md shadow-cyan-500/10'
                      : 'border border-slate-800/60 bg-slate-900/40 text-slate-400 hover:border-slate-700 hover:bg-slate-900/80 hover:text-slate-200'
                  }`}
                >
                  <div
                    className={`flex h-8 w-8 items-center justify-center rounded-lg transition-all ${
                      isActive
                        ? 'bg-cyan-500/20 text-cyan-400 shadow-sm shadow-cyan-500/30'
                        : 'bg-slate-800/80 text-slate-400 group-hover:text-slate-200'
                    }`}
                  >
                    <Icon className="h-4 w-4" />
                  </div>

                  <div className="flex flex-col">
                    <div className="flex items-center gap-1.5">
                      <span
                        className={`text-xs font-bold ${
                          isActive ? 'text-cyan-300' : 'text-slate-200'
                        }`}
                      >
                        {language === 'kn' ? pillar.nameKn : pillar.name}
                      </span>
                      {pillar.badge && (
                        <span
                          className={`rounded px-1 py-0.2 text-[9px] font-mono font-extrabold ${
                            pillar.accent === 'red'
                              ? 'bg-red-500/20 text-red-400 border border-red-500/30 animate-pulse'
                              : 'bg-cyan-500/20 text-cyan-400 border border-cyan-500/30'
                          }`}
                        >
                          {pillar.badge}
                        </span>
                      )}
                    </div>
                    <span className="hidden text-[10px] text-slate-500 md:block">
                      {language === 'kn' ? pillar.descKn : pillar.desc}
                    </span>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
