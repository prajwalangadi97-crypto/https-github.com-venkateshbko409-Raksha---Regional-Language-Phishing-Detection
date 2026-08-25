import React, { useState } from 'react';
import {
  GraduationCap,
  BookOpen,
  Gamepad2,
  Trophy,
  ArrowRight,
  CheckCircle,
} from 'lucide-react';
import type { Language } from '../types';
import { ScamSimulationLab } from './ScamSimulationLab';
import { LiveChallenge } from './LiveChallenge';

interface CyberTutorSectionProps {
  language: Language;
}

export const CyberTutorSection: React.FC<CyberTutorSectionProps> = ({
  language,
}) => {
  const [activeSubTab, setActiveSubTab] = useState<'modules' | 'sim' | 'quiz'>(
    'modules'
  );

  const modules = [
    {
      id: 'm1',
      title: 'Digital Arrest & CBI Extortion Calls',
      titleKn: 'ಡಿಜಿಟಲ್ ಅರೆಸ್ಟ್ & ಸಿಬಿಐ ಬೆದರಿಕೆ ಕರೆಗಳು',
      icon: '👮🏽‍♂️',
      summary: 'Learn why Digital Arrest is legally impossible in India and how to handle video call threats.',
      summaryKn: 'ಭಾರತದಲ್ಲಿ ಡಿಜಿಟಲ್ ಅರೆಸ್ಟ್ ಏಕೆ ಅಸಾಧ್ಯ ಮತ್ತು ವಿಡಿಯೋ ಕರೆ ಬೆದರಿಕೆಗಳನ್ನು ಹೇಗೆ ನಿರ್ವಹಿಸಬೇಕು ತಿಳಿಯಿರಿ.',
      keyTakeaways: [
        'No police officer conducts interrogations on Skype or WhatsApp video.',
        'Never transfer funds to "RBI clearance escrow" accounts.',
        'Disconnect and immediately dial 1930.',
      ],
    },
    {
      id: 'm2',
      title: 'UPI Reverse Payment & QR Traps',
      titleKn: 'UPI ರಿವರ್ಸ್ ಪಾವತಿ ಮತ್ತು QR ವಂಚನೆ',
      icon: '💸',
      summary: 'Master the fundamental rule of UPI: PIN is never required to receive money.',
      summaryKn: 'UPI ನ ಮೂಲ ನಿಯಮ: ನಿಮ್ಮ ಖಾತೆಗೆ ಹಣ ಬರಲು ಎಂದಿಗೂ ಪಿನ್ ಹಾಕುವ ಅಗತ್ಯವಿಲ್ಲ.',
      keyTakeaways: [
        'Entering UPI PIN strictly sends money OUT of your account.',
        'QR codes sent on WhatsApp to "claim cashback" are debit requests.',
        'Never approve unexpected PhonePe/GPay collect requests.',
      ],
    },
    {
      id: 'm3',
      title: 'AI Voice Cloning & Family Safe Words',
      titleKn: 'AI ಧ್ವನಿ ಕ್ಲೋನಿಂಗ್ & ಸೇಫ್ ವರ್ಡ್ ರಕ್ಷಣೆ',
      icon: '🎙️',
      summary: 'How scammers clone family voices in 3 seconds and how offline safe words defeat them.',
      summaryKn: 'ಕೇವಲ 3 ಸೆಕೆಂಡ್‌ನಲ್ಲಿ ಧ್ವನಿ ಕ್ಲೋನ್ ಮಾಡುವ ವಂಚಕರನ್ನು ರಹಸ್ಯ ಪದದಿಂದ ಹಿಮ್ಮೆಟ್ಟಿಸಿ.',
      keyTakeaways: [
        'AI can replicate distress tone, crying, and background noise.',
        'Establish an offline secret family safe word immediately.',
        'Always call back the family member directly on their saved number.',
      ],
    },
    {
      id: 'm4',
      title: 'Rogue Sideload Loan APKs & OTP Theft',
      titleKn: 'ಸೈಡ್‌ಲೋಡ್ ಸಾಲ ಆ್ಯಪ್‌ಗಳು & OTP ಕಳ್ಳತನ',
      icon: '📱',
      summary: 'Inspect how malicious permissions allow predatory loan apps to steal contacts and gallery photos.',
      summaryKn: 'ಆ್ಯಪ್ ಅನುಮತಿಗಳನ್ನು ದುರುಪಯೋಗಪಡಿಸಿಕೊಂಡು ಫೋಟೋ ಕದಿಯುವ ತಂತ್ರಗಳನ್ನು ತಡೆಯಿರಿ.',
      keyTakeaways: [
        'Never install APK files sent on WhatsApp or Telegram.',
        'Never grant "Accessibility" or "SMS" permissions to untrusted apps.',
        'Use Android Safe Mode to remove persistent rogue admin apps.',
      ],
    },
  ];

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="mb-6 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-sky-500/20 text-sky-400">
              <GraduationCap className="h-4 w-4" />
            </span>
            <h2 className="text-xl font-bold text-slate-100 sm:text-2xl">
              {language === 'kn'
                ? 'ಸೈಬರ್ ಶಿಕ್ಷಣ & ನಾಗರಿಕ ಜಾಗೃತಿ ಅಕಾಡೆಮಿ'
                : 'Cyber Tutor Academy & Threat Simulator'}
            </h2>
          </div>
          <p className="mt-1 text-xs text-slate-400 sm:text-sm">
            {language === 'kn'
              ? 'ಕರ್ನಾಟಕದ ಪ್ರಮುಖ ಸೈಬರ್ ವಂಚನೆಗಳ ಬಗ್ಗೆ ತಿಳಿಯಿರಿ, ಸಿಮ್ಯುಲೇಶನ್ ಅಭ್ಯಾಸ ನಡೆಸಿ ಮತ್ತು ಪ್ರಮಾಣಪತ್ರ ಪಡೆಯಿರಿ.'
              : 'Interactive safety curriculum, roleplay simulation labs, and real-time scam spotter quizzes.'}
          </p>
        </div>

        {/* Sub Navigation Switcher */}
        <div className="flex items-center gap-1.5 rounded-xl border border-slate-800 bg-slate-900/80 p-1">
          <button
            type="button"
            onClick={() => setActiveSubTab('modules')}
            className={`flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-bold transition-all ${
              activeSubTab === 'modules'
                ? 'bg-sky-500 text-slate-950 shadow-md'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <BookOpen className="h-3.5 w-3.5" />
            <span>{language === 'kn' ? 'ಪಾಠಗಳು' : 'Modules'}</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveSubTab('sim')}
            className={`flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-bold transition-all ${
              activeSubTab === 'sim'
                ? 'bg-sky-500 text-slate-950 shadow-md'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Gamepad2 className="h-3.5 w-3.5" />
            <span>{language === 'kn' ? 'ಸಿಮ್ಯುಲೇಶನ್ ಲ್ಯಾಬ್' : 'Simulation Lab'}</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveSubTab('quiz')}
            className={`flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-bold transition-all ${
              activeSubTab === 'quiz'
                ? 'bg-sky-500 text-slate-950 shadow-md'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Trophy className="h-3.5 w-3.5" />
            <span>{language === 'kn' ? 'ಸ್ಪಾಟರ್ ಸವಾಲು' : 'Spotter Quiz'}</span>
          </button>
        </div>
      </div>

      {activeSubTab === 'modules' && (
        <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
          {modules.map((mod) => (
            <div
              key={mod.id}
              className="flex flex-col justify-between rounded-2xl border border-slate-800 bg-slate-900/70 p-6 backdrop-blur-md transition-all hover:border-sky-500/40"
            >
              <div>
                <div className="flex items-center gap-3 mb-3">
                  <span className="text-3xl">{mod.icon}</span>
                  <div>
                    <h3 className="text-base font-bold text-slate-100">
                      {language === 'kn' ? mod.titleKn : mod.title}
                    </h3>
                  </div>
                </div>

                <p className="text-xs text-slate-300 leading-relaxed mb-4">
                  {language === 'kn' ? mod.summaryKn : mod.summary}
                </p>

                <div className="space-y-2 border-t border-slate-800/80 pt-3">
                  <div className="text-[10px] font-bold uppercase text-sky-400 font-mono">
                    Essential Defense Rules:
                  </div>
                  {mod.keyTakeaways.map((point, idx) => (
                    <div
                      key={idx}
                      className="flex items-start gap-2 text-xs text-slate-200 font-sans"
                    >
                      <CheckCircle className="h-3.5 w-3.5 text-emerald-400 shrink-0 mt-0.5" />
                      <span>{point}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-5 pt-4 border-t border-slate-800/80 flex justify-end">
                <button
                  type="button"
                  onClick={() => setActiveSubTab('sim')}
                  className="flex items-center gap-1 text-xs font-bold text-sky-400 hover:text-sky-300"
                >
                  <span>Practice In Sim Lab</span>
                  <ArrowRight className="h-3.5 w-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {activeSubTab === 'sim' && <ScamSimulationLab language={language} />}
      {activeSubTab === 'quiz' && <LiveChallenge language={language} />}
    </div>
  );
};
