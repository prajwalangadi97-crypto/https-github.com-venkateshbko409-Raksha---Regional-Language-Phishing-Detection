import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import {
  Trophy,
  CheckCircle2,
  XCircle,
  RotateCcw,
  ArrowRight,
} from 'lucide-react';
import type { Language, QuizQuestion } from '../types';
import { cyberTutorQuiz } from '../data/karnatakaScamData';

interface LiveChallengeProps {
  language: Language;
}

export const LiveChallenge: React.FC<LiveChallengeProps> = ({ language }) => {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [isAnswered, setIsAnswered] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);

  const question: QuizQuestion = cyberTutorQuiz[currentIdx] || cyberTutorQuiz[0];

  const handleSelectOption = (idx: number) => {
    if (isAnswered) return;
    setSelectedOption(idx);
    setIsAnswered(true);

    if (question.options[idx].isCorrect) {
      setScore((prev) => prev + 20);
    }
  };

  const handleNext = () => {
    setSelectedOption(null);
    setIsAnswered(false);

    if (currentIdx + 1 < cyberTutorQuiz.length) {
      setCurrentIdx((prev) => prev + 1);
    } else {
      setIsCompleted(true);
      confetti({
        particleCount: 120,
        spread: 70,
        origin: { y: 0.6 },
      });
    }
  };

  const handleRestart = () => {
    setCurrentIdx(0);
    setSelectedOption(null);
    setScore(0);
    setIsAnswered(false);
    setIsCompleted(false);
  };

  return (
    <div className="mx-auto max-w-4xl px-4 py-8 sm:px-6">
      <div className="rounded-3xl border border-slate-800 bg-slate-900/80 p-6 sm:p-8 backdrop-blur-xl shadow-2xl">
        {!isCompleted ? (
          <div>
            {/* Top Bar */}
            <div className="flex items-center justify-between border-b border-slate-800 pb-4 mb-6">
              <div className="flex items-center gap-2">
                <span className="flex h-8 w-8 items-center justify-center rounded-xl bg-amber-500/20 text-amber-400">
                  <Trophy className="h-4 w-4" />
                </span>
                <span className="font-mono text-xs font-bold uppercase text-slate-300">
                  {language === 'kn' ? 'ಲೈವ್ ಸೈಬರ್ ಸ್ಪಾಟರ್ ಸವಾಲು' : 'Live Indic Scam Spotter Challenge'}
                </span>
              </div>

              <div className="flex items-center gap-3 font-mono text-xs">
                <span className="text-slate-400">
                  Question {currentIdx + 1}/{cyberTutorQuiz.length}
                </span>
                <span className="rounded-lg bg-slate-800 px-2 py-0.5 font-bold text-amber-400">
                  Score: {score}
                </span>
              </div>
            </div>

            {/* Question */}
            <h3 className="text-base sm:text-lg font-bold text-slate-100 leading-relaxed mb-6">
              {language === 'kn' ? question.questionKn : question.question}
            </h3>

            {/* Options */}
            <div className="space-y-3 mb-6">
              {question.options.map((opt, idx) => {
                const isSelected = selectedOption === idx;
                let optionStyle =
                  'border-slate-800 bg-slate-950 text-slate-200 hover:border-slate-700 hover:bg-slate-900';

                if (isAnswered) {
                  if (opt.isCorrect) {
                    optionStyle = 'border-emerald-500 bg-emerald-950/50 text-emerald-200';
                  } else if (isSelected) {
                    optionStyle = 'border-red-500 bg-red-950/50 text-red-200';
                  }
                }

                return (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => handleSelectOption(idx)}
                    disabled={isAnswered}
                    className={`w-full flex items-center justify-between rounded-xl border p-4 text-left text-xs sm:text-sm font-semibold transition-all ${optionStyle}`}
                  >
                    <span>{language === 'kn' ? opt.textKn : opt.text}</span>
                    {isAnswered && opt.isCorrect && (
                      <CheckCircle2 className="h-5 w-5 text-emerald-400 shrink-0 ml-2" />
                    )}
                    {isAnswered && isSelected && !opt.isCorrect && (
                      <XCircle className="h-5 w-5 text-red-400 shrink-0 ml-2" />
                    )}
                  </button>
                );
              })}
            </div>

            {/* Explanation Box */}
            {isAnswered && (
              <div className="rounded-xl border border-slate-800 bg-slate-950/80 p-4 text-xs text-slate-300 leading-relaxed mb-6">
                <div className="font-bold text-cyan-400 mb-1">
                  {language === 'kn' ? 'AI ತನಿಖಾ ವಿವರಣೆ:' : 'Forensic Rationale:'}
                </div>
                <p>{language === 'kn' ? question.explanationKn : question.explanation}</p>
              </div>
            )}

            {/* Next Button */}
            {isAnswered && (
              <div className="flex justify-end">
                <button
                  type="button"
                  onClick={handleNext}
                  className="flex items-center gap-2 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 px-6 py-2.5 text-xs font-bold text-slate-950 shadow-md hover:scale-105"
                >
                  <span>
                    {currentIdx + 1 < cyberTutorQuiz.length
                      ? language === 'kn'
                        ? 'ಮುಂದಿನ ಪ್ರಶ್ನೆ'
                        : 'Next Question'
                      : language === 'kn'
                      ? 'ಫಲಿತಾಂಶ ನೋಡಿ'
                      : 'View Results'}
                  </span>
                  <ArrowRight className="h-4 w-4" />
                </button>
              </div>
            )}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-10 text-center">
            <div className="flex h-20 w-20 items-center justify-center rounded-full bg-amber-500/20 text-amber-400 mb-4 ring-8 ring-amber-500/10">
              <Trophy className="h-10 w-10 animate-bounce" />
            </div>

            <h3 className="text-2xl font-black text-white">
              {language === 'kn' ? 'ಅಭಿನಂದನೆಗಳು! ರಕ್ಷಾ ಸವಾಲು ಪೂರ್ಣಗೊಂಡಿದೆ!' : 'Challenge Complete!'}
            </h3>

            <p className="mt-2 text-sm text-slate-300">
              {language === 'kn'
                ? `ನಿಮ್ಮ ಒಟ್ಟು ಅಂಕ: 100 ರಲ್ಲಿ ${score}. ನೀವು ಕರ್ನಾಟಕದ ಸೈಬರ್ ರಕ್ಷಕರಾಗಿದ್ದೀರಿ.`
                : `You scored ${score} / 100. You are certified as a Vigilant Cyber Citizen!`}
            </p>

            <div className="mt-6 flex gap-3">
              <button
                type="button"
                onClick={handleRestart}
                className="flex items-center gap-1.5 rounded-xl border border-slate-700 bg-slate-800 px-5 py-2.5 text-xs font-bold text-slate-200 hover:text-white"
              >
                <RotateCcw className="h-4 w-4" />
                <span>{language === 'kn' ? 'ಮತ್ತೆ ಪ್ರಯತ್ನಿಸಿ' : 'Retake Quiz'}</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
