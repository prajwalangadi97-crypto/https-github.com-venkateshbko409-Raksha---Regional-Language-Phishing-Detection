import React, { useState, useEffect } from 'react';
import {
  Gamepad2,
  ShieldCheck,
  ArrowRight,
  RotateCcw,
  CheckCircle2,
  XCircle,
  Flame,
  Volume2,
  Award,
  Sparkles,
} from 'lucide-react';
import type { Language } from '../types';
import {
  interactiveScamScenarios,
  type InteractiveSimulationScenario,
  type SimulationOption,
} from '../data/scamSimulationScenarios';

interface ScamSimulationLabProps {
  language: Language;
}

export const ScamSimulationLab: React.FC<ScamSimulationLabProps> = ({
  language,
}) => {
  const isKn = language === 'kn';
  const [selectedScenarioIndex, setSelectedScenarioIndex] = useState(0);
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [userScore, setUserScore] = useState(100);
  const [selectedOption, setSelectedOption] = useState<SimulationOption | null>(null);
  const [isCompleted, setIsCompleted] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);

  const scenario: InteractiveSimulationScenario =
    interactiveScamScenarios[selectedScenarioIndex] || interactiveScamScenarios[0];
  const step = scenario.steps[currentStepIndex] || scenario.steps[0];

  useEffect(() => {
    let active = true;
    const startTimer = setTimeout(() => {
      if (active) setIsTyping(true);
    }, 0);
    const stopTimer = setTimeout(() => {
      if (active) setIsTyping(false);
    }, 600);
    return () => {
      active = false;
      clearTimeout(startTimer);
      clearTimeout(stopTimer);
    };
  }, [currentStepIndex, selectedScenarioIndex]);

  const handleSelectOption = (option: SimulationOption) => {
    if (selectedOption) return;
    setSelectedOption(option);
    setUserScore((prev) => Math.max(0, prev + option.scoreDelta));
  };

  const handleNextStep = () => {
    setSelectedOption(null);
    if (currentStepIndex + 1 < scenario.steps.length) {
      setCurrentStepIndex((prev) => prev + 1);
    } else {
      setIsCompleted(true);
    }
  };

  const handleResetScenario = (idx: number) => {
    setSelectedScenarioIndex(idx);
    setCurrentStepIndex(0);
    setUserScore(100);
    setSelectedOption(null);
    setIsCompleted(false);
    window.speechSynthesis?.cancel();
    setIsPlayingAudio(false);
  };

  const playSimulatedVoiceNote = (text: string) => {
    if (isPlayingAudio) {
      window.speechSynthesis?.cancel();
      setIsPlayingAudio(false);
      return;
    }
    setIsPlayingAudio(true);
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.pitch = 0.9;
      utterance.rate = 1.05;
      utterance.onend = () => setIsPlayingAudio(false);
      utterance.onerror = () => setIsPlayingAudio(false);
      window.speechSynthesis.speak(utterance);
    } else {
      setTimeout(() => setIsPlayingAudio(false), 3000);
    }
  };

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8 space-y-8 animate-fade-in text-slate-100">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="flex h-8 w-8 items-center justify-center rounded-xl bg-sky-500/20 text-sky-400 border border-sky-500/30">
              <Gamepad2 className="h-5 w-5" />
            </span>
            <h2 className="text-xl font-bold text-slate-100 sm:text-2xl">
              {isKn
                ? 'ಸೈಬರ್ ವಂಚನೆ ತಡೆ ಸಿಮ್ಯುಲೇಶನ್ ಲ್ಯಾಬ್ & ಚಾಟ್ ಗೇಮ್'
                : 'Interactive Scammer Chat Simulator & Defense Lab'}
            </h2>
          </div>
          <p className="mt-1 text-xs text-slate-400 sm:text-sm">
            {isKn
              ? 'ಲೈವ್ ವಾಟ್ಸಾಪ್ ಮತ್ತು ಟೆಲಿಗ್ರಾಮ್ ವಂಚನಾ ಚಾಟ್‌ಗಳನ್ನು ಎದುರಿಸಿ ಸರಿಯಾದ ನಿರ್ಧಾರ ತೆಗೆದುಕೊಳ್ಳುವ ಕೌಶಲ ಬೆಳೆಸಿಕೊಳ್ಳಿ.'
              : 'Face off against realistic simulated scam conversations and practice psychological counter-defenses.'}
          </p>
        </div>

        {/* Score Multiplier Badge */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 font-mono text-xs text-cyan-300 bg-slate-900 border border-cyan-500/30 px-4 py-2 rounded-xl shadow-lg">
            <Award className="h-4 w-4 text-amber-400" />
            <span>CYBER DEFENSE SCORE: <strong className="text-white text-sm">{userScore} PTS</strong></span>
          </div>
        </div>
      </div>

      {/* Scenario Selector Carousel Bar */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
        {interactiveScamScenarios.map((sc, idx) => {
          const isSelected = selectedScenarioIndex === idx;
          return (
            <button
              key={sc.id}
              onClick={() => handleResetScenario(idx)}
              className={`p-3.5 rounded-xl border text-left transition-all relative overflow-hidden ${
                isSelected
                  ? 'border-cyan-500 bg-cyan-950/40 shadow-lg shadow-cyan-950/40'
                  : 'border-slate-800 bg-slate-900/60 hover:bg-slate-800/60'
              }`}
            >
              <div className="flex items-center justify-between text-[10px] font-mono text-slate-400">
                <span>{sc.category}</span>
                <span className="px-1.5 py-0.5 rounded bg-slate-800 text-cyan-300 font-bold">
                  {sc.difficulty}
                </span>
              </div>
              <h4 className="text-xs font-bold text-white mt-1 line-clamp-1">
                {isKn ? sc.titleKn : sc.title}
              </h4>
              <p className="text-[11px] text-slate-400 line-clamp-2 mt-1">
                {isKn ? sc.descriptionKn : sc.descriptionEn}
              </p>
            </button>
          );
        })}
      </div>

      {/* Main Simulation Simulator Screen */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: WhatsApp / Messenger Style Chat Screen (7 cols) */}
        <div className="lg:col-span-7 flex flex-col">
          <div className="rounded-2xl border border-slate-800 bg-slate-950 overflow-hidden shadow-2xl flex flex-col h-[560px]">
            {/* Top Scammer Contact Header */}
            <div className="p-3.5 bg-slate-900 border-b border-slate-800 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-full bg-slate-800 flex items-center justify-center text-xl border border-slate-700">
                  {step.senderAvatar}
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-bold text-white">{step.senderName}</span>
                    <span className="text-[10px] px-1.5 py-0.5 rounded bg-rose-500/20 text-rose-300 font-mono font-bold">
                      UNVERIFIED
                    </span>
                  </div>
                  <span className="text-xs text-slate-400 font-mono">{scenario.attackerHandle}</span>
                </div>
              </div>

              {/* Psychological coercion tag */}
              <div className="flex items-center gap-1.5 text-xs px-2.5 py-1 rounded-lg bg-rose-950/80 border border-rose-500/30 text-rose-300 font-mono">
                <Flame className="h-3.5 w-3.5 text-rose-400 animate-pulse" />
                <span>{step.coercionType}</span>
              </div>
            </div>

            {/* Chat Body Stream */}
            <div className="flex-1 p-4 overflow-y-auto space-y-4 bg-gradient-to-b from-slate-950 via-slate-950 to-slate-900/60">
              {/* System encryption notice */}
              <div className="text-center">
                <span className="text-[10px] font-mono text-slate-500 bg-slate-900/80 px-3 py-1 rounded-full border border-slate-800">
                  ⚠️ SIMULATED ADVERSARY THREAT ENCOUNTER • STEP {currentStepIndex + 1} OF {scenario.steps.length}
                </span>
              </div>

              {/* Attacker Message Bubble */}
              <div className="flex items-start gap-2.5 max-w-[85%]">
                <div className="h-7 w-7 rounded-full bg-slate-800 flex items-center justify-center text-sm shrink-0 mt-1">
                  {step.senderAvatar}
                </div>
                <div className="space-y-1.5">
                  <div className="p-3.5 rounded-2xl rounded-tl-none bg-slate-900 border border-slate-800 text-xs sm:text-sm text-slate-100 leading-relaxed shadow-lg">
                    {isKn ? step.messageKn : step.messageEn}
                  </div>

                  {/* Voice Note attachment if available */}
                  {step.hasVoiceNote && (
                    <div className="p-2.5 rounded-xl bg-slate-900/80 border border-cyan-500/30 flex items-center justify-between gap-3 text-xs">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => playSimulatedVoiceNote(isKn ? step.messageKn : step.messageEn)}
                          className="h-7 w-7 rounded-full bg-cyan-500 text-slate-950 flex items-center justify-center hover:scale-105 transition-all"
                        >
                          <Volume2 className="h-3.5 w-3.5" />
                        </button>
                        <span className="text-cyan-300 font-mono">Voice Note ({step.voiceNoteDuration})</span>
                      </div>
                      <span className="text-[10px] text-slate-500 font-mono">Simulated Audio</span>
                    </div>
                  )}

                  <span className="text-[10px] text-slate-500 block font-mono pl-1">Delivered • Just now</span>
                </div>
              </div>

              {/* Typing indicator */}
              {isTyping && (
                <div className="flex items-center gap-1.5 text-xs text-slate-400 pl-10 font-mono">
                  <span className="h-1.5 w-1.5 rounded-full bg-cyan-400 animate-bounce" />
                  <span className="h-1.5 w-1.5 rounded-full bg-cyan-400 animate-bounce [animation-delay:0.2s]" />
                  <span className="h-1.5 w-1.5 rounded-full bg-cyan-400 animate-bounce [animation-delay:0.4s]" />
                  <span>{step.senderName} is typing...</span>
                </div>
              )}

              {/* User Chosen Option Bubble if answered */}
              {selectedOption && (
                <div className="flex items-end justify-end gap-2 max-w-[85%] ml-auto animate-fade-in">
                  <div className="p-3.5 rounded-2xl rounded-tr-none bg-cyan-600 text-slate-950 font-medium text-xs sm:text-sm leading-relaxed shadow-lg">
                    {isKn ? selectedOption.textKn : selectedOption.text}
                  </div>
                </div>
              )}
            </div>

            {/* Chat Bottom Bar */}
            <div className="p-3 bg-slate-900 border-t border-slate-800 text-xs text-slate-400 flex items-center justify-between">
              <span className="font-mono text-[11px]">Select your defensive countermove on the right panel 👉</span>
              <button
                onClick={() => handleResetScenario(selectedScenarioIndex)}
                className="flex items-center gap-1 text-[11px] hover:text-white transition-all text-slate-400"
              >
                <RotateCcw className="h-3 w-3" />
                Reset
              </button>
            </div>
          </div>
        </div>

        {/* Right Column: Countermeasure Decision Deck & Feedback (5 cols) */}
        <div className="lg:col-span-5 flex flex-col gap-4">
          {!isCompleted ? (
            <div className="rounded-2xl border border-slate-800 bg-slate-900/90 p-5 backdrop-blur-md shadow-xl flex-1 flex flex-col justify-between space-y-4">
              <div>
                <div className="flex items-center justify-between border-b border-slate-800 pb-3 mb-4">
                  <h3 className="text-xs font-bold uppercase tracking-wider text-slate-200 flex items-center gap-2">
                    <ShieldCheck className="h-4 w-4 text-cyan-400" />
                    <span>{isKn ? 'ನಿಮ್ಮ ರಕ್ಷಣಾತ್ಮಕ ಪ್ರತಿಕ್ರಿಯೆಯನ್ನು ಆರಿಸಿ' : 'Choose Your Defense Response'}</span>
                  </h3>
                  <span className="text-xs font-mono text-slate-400">Step {currentStepIndex + 1} of {scenario.steps.length}</span>
                </div>

                <div className="space-y-3">
                  {step.options.map((opt) => {
                    const isPicked = selectedOption?.id === opt.id;
                    return (
                      <button
                        key={opt.id}
                        disabled={selectedOption !== null}
                        onClick={() => handleSelectOption(opt)}
                        className={`w-full text-left p-4 rounded-xl border text-xs sm:text-sm transition-all relative ${
                          isPicked
                            ? opt.isOptimal
                              ? 'border-emerald-500 bg-emerald-950/40 text-white shadow-lg'
                              : 'border-rose-500 bg-rose-950/40 text-white shadow-lg'
                            : selectedOption
                            ? 'border-slate-800 bg-slate-950/40 text-slate-500 cursor-not-allowed'
                            : 'border-slate-800 bg-slate-950/80 hover:bg-slate-800 hover:border-cyan-500/60 text-slate-200'
                        }`}
                      >
                        <div className="flex items-start gap-2.5">
                          <span className="h-5 w-5 rounded-full border border-slate-700 flex items-center justify-center shrink-0 text-xs font-bold text-cyan-400 mt-0.5">
                            {opt.isOptimal ? '✓' : '!'}
                          </span>
                          <span className="leading-relaxed">{isKn ? opt.textKn : opt.text}</span>
                        </div>
                      </button>
                    );
                  })}
                </div>

                {/* Instant Feedback Analysis */}
                {selectedOption && (
                  <div
                    className={`mt-4 p-4 rounded-xl border animate-fade-in ${
                      selectedOption.isOptimal
                        ? 'bg-emerald-950/40 border-emerald-500/40 text-emerald-200'
                        : 'bg-rose-950/40 border-rose-500/40 text-rose-200'
                    }`}
                  >
                    <div className="flex items-center gap-2 font-bold text-xs">
                      {selectedOption.isOptimal ? (
                        <CheckCircle2 className="h-4 w-4 text-emerald-400" />
                      ) : (
                        <XCircle className="h-4 w-4 text-rose-400" />
                      )}
                      <span>
                        {selectedOption.isOptimal
                          ? isKn
                            ? 'ಅತ್ಯುತ್ತಮ ರಕ್ಷಣಾತ್ಮಕ ನಿರ್ಧಾರ (+40 ಅಂಕಗಳು)'
                            : 'TACTICAL CYBER DEFENSE MOVE (+40 PTS)'
                          : isKn
                          ? 'ಅಪಾಯಕಾರಿ ತಪ್ಪು (-50 ಅಂಕಗಳು)'
                          : 'FATAL COERCION TRAP TRIGGERED (-50 PTS)'}
                      </span>
                    </div>
                    <p className="text-xs mt-1.5 leading-relaxed text-slate-200">
                      {isKn ? selectedOption.feedbackKn : selectedOption.feedbackEn}
                    </p>
                  </div>
                )}
              </div>

              {/* Next Step Action Button */}
              {selectedOption && (
                <button
                  onClick={handleNextStep}
                  className="w-full py-3 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs flex items-center justify-center gap-2 shadow-lg shadow-cyan-500/20 transition-all"
                >
                  <span>{currentStepIndex + 1 < scenario.steps.length ? (isKn ? 'ಮುಂದಿನ ಹಂತಕ್ಕೆ ಹೋಗಿ' : 'Proceed to Next Step') : (isKn ? 'ಫಲಿತಾಂಶ ವೀಕ್ಷಿಸಿ' : 'View Mission Debrief')}</span>
                  <ArrowRight className="h-4 w-4" />
                </button>
              )}
            </div>
          ) : (
            /* Mission Complete Debrief Card */
            <div className="rounded-2xl border border-cyan-500/40 bg-slate-900/90 p-6 backdrop-blur-md shadow-2xl flex-1 flex flex-col justify-between space-y-4 animate-fade-in">
              <div className="space-y-4">
                <div className="text-center space-y-2">
                  <div className="h-14 w-14 rounded-2xl bg-cyan-500/20 border border-cyan-500/40 flex items-center justify-center text-cyan-400 mx-auto">
                    <Sparkles className="h-7 w-7" />
                  </div>
                  <h3 className="text-lg font-bold text-white">
                    {isKn ? 'ಸಿಮ್ಯುಲೇಶನ್ ಯಶಸ್ವಿಯಾಗಿ ಪೂರ್ಣಗೊಂಡಿದೆ!' : 'Simulation Mission Accomplished!'}
                  </h3>
                  <p className="text-xs text-slate-400">
                    {isKn ? 'ನಿಮ್ಮ ಸೈಬರ್ ರಕ್ಷಣಾ ಕೌಶಲಗಳು ಪರಿಶೀಲಿಸಲ್ಪಟ್ಟಿವೆ.' : 'You have completed this adversary engagement drill.'}
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
                  <span className="text-[11px] font-mono text-cyan-400 font-bold uppercase block">
                    {isKn ? 'ಮುಖ್ಯ ಸುರಕ್ಷತಾ ಸೂತ್ರ (Golden Rule):' : 'Golden Rule & Defense Takeaway:'}
                  </span>
                  <p className="text-xs text-slate-200 leading-relaxed font-medium">
                    {isKn ? scenario.goldenRuleKn : scenario.goldenRuleEn}
                  </p>
                </div>
              </div>

              <button
                onClick={() => {
                  const nextIdx = (selectedScenarioIndex + 1) % interactiveScamScenarios.length;
                  handleResetScenario(nextIdx);
                }}
                className="w-full py-3 rounded-xl bg-gradient-to-r from-blue-500 to-cyan-500 text-slate-950 font-bold text-xs flex items-center justify-center gap-2 shadow-lg shadow-cyan-500/20 transition-all"
              >
                <span>{isKn ? 'ಮುಂದಿನ ಸನ್ನಿವೇಶ ಪ್ಲೇ ಮಾಡಿ' : 'Play Next Scenario Drill'}</span>
                <ArrowRight className="h-4 w-4" />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
