import React, { useState } from 'react';
import {
  Gamepad2,
  ShieldCheck,
  ArrowRight,
  RotateCcw,
  CheckCircle2,
  XCircle,
} from 'lucide-react';
import type { Language } from '../types';
import { simulationScenarios } from '../data/karnatakaScamData';

interface ScamSimulationLabProps {
  language: Language;
}

export const ScamSimulationLab: React.FC<ScamSimulationLabProps> = ({
  language,
}) => {
  const [selectedScenarioIndex, setSelectedScenarioIndex] = useState(0);
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [userScore, setUserScore] = useState(0);
  const [selectedAction, setSelectedAction] = useState<string | null>(null);
  const [feedback, setFeedback] = useState<{ isCorrect: boolean; text: string } | null>(null);
  const [isCompleted, setIsCompleted] = useState(false);

  const scenario = simulationScenarios[selectedScenarioIndex] || simulationScenarios[0];
  const step = scenario.steps[currentStepIndex];

  const actions: ('BLOCK' | 'REPORT' | 'IGNORE' | 'VERIFY' | 'RESPOND')[] = [
    'BLOCK',
    'REPORT',
    'IGNORE',
    'VERIFY',
    'RESPOND',
  ];

  const handleAction = (action: typeof actions[number]) => {
    if (feedback) return;
    setSelectedAction(action);

    const isCorrect = action === step.correctAction;
    if (isCorrect) {
      setUserScore((prev) => prev + 100);
      setFeedback({
        isCorrect: true,
        text: language === 'kn' ? 'ಸರಿಯಾದ ನಿರ್ಧಾರ! ' + (step.hintKn || '') : 'Correct Action! ' + (step.hint || ''),
      });
    } else {
      setFeedback({
        isCorrect: false,
        text: language === 'kn' ? 'ತಪ್ಪು ನಿರ್ಧಾರ! ಸರಿಯಾದ ಕ್ರಮ: ' + step.correctAction + '. ' + (step.hintKn || '') : 'Wrong Action! The safer response is ' + step.correctAction + '. ' + (step.hint || ''),
      });
    }
  };

  const handleNextStep = () => {
    setSelectedAction(null);
    setFeedback(null);

    if (currentStepIndex + 1 < scenario.steps.length) {
      setCurrentStepIndex((prev) => prev + 1);
    } else {
      setIsCompleted(true);
    }
  };

  const handleResetScenario = (idx: number) => {
    setSelectedScenarioIndex(idx);
    setCurrentStepIndex(0);
    setUserScore(0);
    setSelectedAction(null);
    setFeedback(null);
    setIsCompleted(false);
  };

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="mb-6 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-sky-500/20 text-sky-400">
              <Gamepad2 className="h-4 w-4" />
            </span>
            <h2 className="text-xl font-bold text-slate-100 sm:text-2xl">
              {language === 'kn'
                ? 'ಸೈಬರ್ ವಂಚನೆ ತಡೆ ಸಿಮ್ಯುಲೇಶನ್ ಲ್ಯಾಬ್'
                : 'Interactive Scam Simulation & Roleplay Lab'}
            </h2>
          </div>
          <p className="mt-1 text-xs text-slate-400 sm:text-sm">
            {language === 'kn'
              ? 'ನೈಜ ವಂಚನಾ ಸನ್ನಿವೇಶಗಳಲ್ಲಿ ಸುರಕ್ಷಿತ ನಿರ್ಧಾರಗಳನ್ನು ತೆಗೆದುಕೊಳ್ಳುವ ಅಭ್ಯಾಸ ನಡೆಸಿ.'
              : 'Practice making tactical counter-decisions in realistic multi-step scam scenarios.'}
          </p>
        </div>

        <div className="flex items-center gap-2 font-mono text-xs text-cyan-400 bg-slate-900/80 border border-slate-800 px-3.5 py-1.5 rounded-xl">
          <span>TRAINING SCORE: {userScore} PTS</span>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
        {/* Left: Scenarios Selector (4 cols) */}
        <div className="lg:col-span-4 flex flex-col gap-3">
          {simulationScenarios.map((sc, idx) => (
            <button
              key={sc.id}
              type="button"
              onClick={() => handleResetScenario(idx)}
              className={`flex flex-col items-start rounded-2xl border p-4 text-left transition-all ${
                selectedScenarioIndex === idx
                  ? 'border-sky-500 bg-sky-950/40 text-slate-100 shadow-md'
                  : 'border-slate-800 bg-slate-950/60 text-slate-400 hover:border-slate-700 hover:text-slate-200'
              }`}
            >
              <div className="flex w-full items-center justify-between">
                <span className="text-xs font-bold text-slate-200">
                  {language === 'kn' ? sc.titleKn : sc.title}
                </span>
                <span className="rounded bg-slate-800 px-2 py-0.5 font-mono text-[9px] font-bold text-sky-400">
                  {sc.difficulty}
                </span>
              </div>
              <p className="mt-1.5 text-[11px] text-slate-400 line-clamp-2">
                {language === 'kn' ? sc.descriptionKn : sc.description}
              </p>
            </button>
          ))}
        </div>

        {/* Right: Simulation Interactive Stage (8 cols) */}
        <div className="lg:col-span-8">
          <div className="rounded-2xl border border-slate-800 bg-slate-900/80 p-6 backdrop-blur-md">
            {!isCompleted ? (
              <div>
                <div className="flex items-center justify-between border-b border-slate-800 pb-3 mb-4">
                  <span className="font-mono text-xs text-slate-400">
                    Step {currentStepIndex + 1} of {scenario.steps.length}
                  </span>
                  <span className="text-xs font-bold text-sky-400 font-mono">
                    SCAMMER TRANSMISSION
                  </span>
                </div>

                {/* Scammer Incoming Prompt Bubble */}
                <div className="rounded-2xl border border-red-500/40 bg-red-950/30 p-4 text-red-100 text-sm leading-relaxed mb-6">
                  <div className="text-[10px] font-bold uppercase text-red-400 mb-1 font-mono">
                    Incoming Message:
                  </div>
                  "{language === 'kn' ? step.messageKn : step.message}"
                </div>

                {/* Action Buttons */}
                <div className="mb-6">
                  <div className="text-xs font-bold uppercase text-slate-300 mb-3">
                    {language === 'kn' ? 'ನಿಮ್ಮ ತಕ್ಷಣದ ಪ್ರತಿಕ್ರಿಯೆಯನ್ನು ಆರಿಸಿ:' : 'Choose Your Tactical Defense Action:'}
                  </div>
                  <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
                    {actions.map((act) => (
                      <button
                        key={act}
                        type="button"
                        onClick={() => handleAction(act)}
                        disabled={feedback !== null}
                        className={`rounded-xl border py-2.5 text-xs font-bold transition-all ${
                          selectedAction === act
                            ? 'border-sky-400 bg-sky-500 text-slate-950 shadow-md'
                            : 'border-slate-800 bg-slate-950 text-slate-300 hover:border-sky-500/60 hover:text-white'
                        }`}
                      >
                        {act}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Feedback Box */}
                {feedback && (
                  <div
                    className={`rounded-xl border p-4 text-xs leading-relaxed mb-4 ${
                      feedback.isCorrect
                        ? 'border-emerald-500/50 bg-emerald-950/40 text-emerald-200'
                        : 'border-red-500/50 bg-red-950/40 text-red-200'
                    }`}
                  >
                    <div className="flex items-center gap-2 font-bold mb-1">
                      {feedback.isCorrect ? (
                        <CheckCircle2 className="h-4 w-4 text-emerald-400" />
                      ) : (
                        <XCircle className="h-4 w-4 text-red-400" />
                      )}
                      <span>{feedback.isCorrect ? 'SUCCESSFUL DEFENSE' : 'RISKY RESPONSE'}</span>
                    </div>
                    <span>{feedback.text}</span>
                  </div>
                )}

                {/* Advance Button */}
                {feedback && (
                  <div className="flex justify-end">
                    <button
                      type="button"
                      onClick={handleNextStep}
                      className="flex items-center gap-1.5 rounded-xl bg-gradient-to-r from-sky-500 to-cyan-500 px-5 py-2 text-xs font-bold text-slate-950 shadow-md hover:scale-105"
                    >
                      <span>
                        {currentStepIndex + 1 < scenario.steps.length
                          ? language === 'kn'
                            ? 'ಮುಂದಿನ ಹಂತ'
                            : 'Next Step'
                          : language === 'kn'
                          ? 'ಫಲಿತಾಂಶ ನೋಡಿ'
                          : 'Complete Scenario'}
                      </span>
                      <ArrowRight className="h-4 w-4" />
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center py-10 text-center">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-emerald-500/20 text-emerald-400 mb-3">
                  <ShieldCheck className="h-8 w-8" />
                </div>
                <h3 className="text-xl font-bold text-slate-100">
                  {language === 'kn' ? 'ಸಿಮ್ಯುಲೇಶನ್ ಯಶಸ್ವಿಯಾಗಿ ಪೂರ್ಣಗೊಂಡಿದೆ!' : 'Scenario Successfully Cleared!'}
                </h3>
                <p className="mt-1 text-xs text-slate-400 max-w-sm">
                  {language === 'kn'
                    ? `ನೀವು ಗಳಿಸಿದ ಅಂಕಗಳು: ${userScore} PTS. ನೀವು ವಂಚಕರ ಒತ್ತಡ ತಂತ್ರಗಳನ್ನು ಯಶಸ್ವಿಯಾಗಿ ಹಿಮ್ಮೆಟ್ಟಿಸಿದ್ದೀರಿ.`
                    : `Final Score: ${userScore} PTS. You successfully defended against psychological pressure and syndicate traps.`}
                </p>

                <button
                  type="button"
                  onClick={() => handleResetScenario(selectedScenarioIndex)}
                  className="mt-6 flex items-center gap-1.5 rounded-xl bg-slate-800 border border-slate-700 px-4 py-2 text-xs font-bold text-slate-200 hover:text-white"
                >
                  <RotateCcw className="h-3.5 w-3.5" />
                  <span>Replay Scenario</span>
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
