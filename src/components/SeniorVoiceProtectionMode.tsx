import React, { useState } from 'react';
import {
  Volume2,
  PhoneCall,
  Sparkles,
} from 'lucide-react';
import type { Language } from '../types';

interface SeniorVoiceProtectionModeProps {
  language: Language;
}

export const SeniorVoiceProtectionMode: React.FC<SeniorVoiceProtectionModeProps> = ({
  language,
}) => {
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [activeAdvice, setActiveAdvice] = useState<string | null>(null);

  const speakText = (text: string) => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = 0.9;
      utterance.pitch = 1.0;
      utterance.onend = () => setIsSpeaking(false);
      utterance.onerror = () => setIsSpeaking(false);
      setIsSpeaking(true);
      window.speechSynthesis.speak(utterance);
    }
  };

  const handleScenarioClick = (
    adviceKn: string,
    adviceEn: string
  ) => {
    const textToSpeak = language === 'kn' ? adviceKn : adviceEn;
    setActiveAdvice(textToSpeak);
    speakText(textToSpeak);
  };

  return (
    <div className="mx-auto max-w-5xl px-4 py-8 sm:px-6">
      {/* Senior Mode Banner */}
      <div className="rounded-3xl border-2 border-amber-400 bg-gradient-to-b from-amber-950/40 via-slate-950 to-slate-950 p-6 sm:p-8 shadow-2xl shadow-amber-950/50 backdrop-blur-xl">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-amber-500/30 pb-6">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full bg-amber-500/20 px-3 py-1 text-sm font-bold text-amber-300">
              <Sparkles className="h-4 w-4" />
              <span>
                {language === 'kn' ? 'ಹಿರಿಯ ನಾಗರಿಕರ ಧ್ವನಿ ರಕ್ಷಾ ಕವಚ' : 'Senior Citizen Voice Protection'}
              </span>
            </div>
            <h2 className="mt-2 text-2xl font-black text-amber-300 sm:text-4xl">
              {language === 'kn' ? 'ಯಾರಾದರೂ ನಿಮಗೆ ಕರೆ ಮಾಡಿ ಬೆದರಿಸುತ್ತಿದ್ದಾರೆಯೇ?' : 'Did Someone Call and Threaten You?'}
            </h2>
            <p className="mt-2 text-sm sm:text-base text-slate-200">
              {language === 'kn'
                ? 'ಗಾಬರಿಯಾಗಬೇಡಿ. ಕೆಳಗಿನ ಬಟನ್‌ಗಳಲ್ಲಿ ಯಾವುದಾದರೂ ಒಂದನ್ನು ಒತ್ತಿರಿ — ನಾವು ನಿಮಗೆ ಧ್ವನಿ ಮೂಲಕ ನೇರ ಮಾರ್ಗದರ್ಶನ ನೀಡುತ್ತೇವೆ.'
                : 'Do not panic. Tap any situation below to hear immediate voice guidance in simple words.'}
            </p>
          </div>

          <a
            href="tel:1930"
            className="flex items-center justify-center gap-3 rounded-2xl bg-red-600 px-6 py-4 text-lg font-black text-white shadow-xl shadow-red-600/40 hover:bg-red-500 active:scale-95"
          >
            <PhoneCall className="h-6 w-6 animate-bounce" />
            <span>1930 CALL</span>
          </a>
        </div>

        {/* 4 Big Senior-Friendly Scenario Buttons */}
        <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-4">
          <button
            type="button"
            onClick={() =>
              handleScenarioClick(
                'ಗಾಬರಿಯಾಗಬೇಡಿ. ಬೆಸ್ಕಾಂ ರಾತ್ರಿ ವೇಳೆ ಕರೆಂಟ್ ಕಟ್ ಮಾಡಲ್ಲ. ಯಾರಿಗೂ ಫೋನ್ ಮೂಲಕ ಹಣ ಕಳುಹಿಸಬೇಡಿ ಅಥವಾ ಓಟಿಪಿ ಹೇಳಬೇಡಿ. ತಕ್ಷಣ ಕರೆ ಕಟ್ ಮಾಡಿ.',
                'Do not panic. BESCOM never disconnects power at night via phone calls. Never send money or share OTP over phone. Hang up immediately.'
              )
            }
            className="flex flex-col items-start rounded-2xl border-2 border-amber-500/40 bg-slate-900/90 p-5 text-left transition-all hover:border-amber-400 hover:bg-amber-950/30 hover:scale-[1.02]"
          >
            <div className="text-2xl mb-2">⚡</div>
            <h3 className="text-lg font-bold text-amber-300">
              {language === 'kn'
                ? '೧. "ಕರೆಂಟ್ ಕಟ್ ಮಾಡ್ತೀವಿ" ಅಂತ ಕರೆ ಬಂದಿದೆ'
                : '1. "Power will be cut in 2 hours" Call'}
            </h3>
            <p className="mt-1 text-xs text-slate-300">
              {language === 'kn'
                ? 'ವಿದ್ಯುತ್ ಬಿಲ್ ಬಾಕಿ ನೆಪದಲ್ಲಿ ಕರೆ ಮಾಡಿ ಲಿಂಕ್ ಕಳುಹಿಸಿದರೆ ಇಲ್ಲಿ ಒತ್ತಿರಿ.'
                : 'Threatening electricity disconnection if bill is not paid.'}
            </p>
          </button>

          <button
            type="button"
            onClick={() =>
              handleScenarioClick(
                'ಭಾರತದಲ್ಲಿ ಡಿಜಿಟಲ್ ಅರೆಸ್ಟ್ ಎಂಬ ಕಾನೂನೇ ಇಲ್ಲ. ಪೊಲೀಸರು ಎಂದಿಗೂ ವಿಡಿಯೋ ಕರೆ ಮಾಡಿ ಹಣ ಕೇಳಲ್ಲ. ಯಾರಿಗೂ ಹಣ ವರ್ಗಾಯಿಸಬೇಡಿ. 1930 ಗೆ ಕರೆ ಮಾಡಿ.',
                'Digital arrest does not exist in Indian law. Police never demand money over video calls. Do not transfer any money. Dial 1930 immediately.'
              )
            }
            className="flex flex-col items-start rounded-2xl border-2 border-red-500/40 bg-slate-900/90 p-5 text-left transition-all hover:border-red-400 hover:bg-red-950/30 hover:scale-[1.02]"
          >
            <div className="text-2xl mb-2">👮🏽‍♂️</div>
            <h3 className="text-lg font-bold text-red-400">
              {language === 'kn'
                ? '೨. "ಪೊಲೀಸ್ / ಸಿಬಿಐ ಕೇಸ್" ಅಂತ ಬೆದರಿಕೆ ಕರೆ'
                : '2. "CBI / Police Digital Arrest" Call'}
            </h3>
            <p className="mt-1 text-xs text-slate-300">
              {language === 'kn'
                ? 'ಆಧಾರ್ ದುರ್ಬಳಕೆ ಅಥವಾ ಕೊರಿಯರ್‌ನಲ್ಲಿ ಡ್ರಗ್ಸ್ ಸಿಕ್ಕಿದೆ ಎಂದು ಹೆದರಿಸಿದರೆ ಇಲ್ಲಿ ಒತ್ತಿರಿ.'
                : 'Caller claiming parcel seized or money laundering warrant.'}
            </p>
          </button>

          <button
            type="button"
            onClick={() =>
              handleScenarioClick(
                'ಬ್ಯಾಂಕ್ ಎಂದಿಗೂ ಎಸ್‌ಎಂಎಸ್ ಲಿಂಕ್ ಮೂಲಕ ಕೆವೈಸಿ ಅಪ್‌ಡೇಟ್ ಕೇಳುವುದಿಲ್ಲ. ಅಪರಿಚಿತ ಲಿಂಕ್ ಕ್ಲಿಕ್ ಮಾಡಬೇಡಿ, ಎಟಿಎಂ ಪಿನ್ ನಮೂದಿಸಬೇಡಿ.',
                'Banks never ask for KYC updates via SMS links. Never click unknown links or enter your ATM PIN or netbanking passwords.'
              )
            }
            className="flex flex-col items-start rounded-2xl border-2 border-cyan-500/40 bg-slate-900/90 p-5 text-left transition-all hover:border-cyan-400 hover:bg-cyan-950/30 hover:scale-[1.02]"
          >
            <div className="text-2xl mb-2">🏦</div>
            <h3 className="text-lg font-bold text-cyan-300">
              {language === 'kn'
                ? '೩. "ಬ್ಯಾಂಕ್ KYC ಅಪ್‌ಡೇಟ್ ಮಾಡಿ" ಅಂತ SMS ಬಂದಿದೆ'
                : '3. "SBI YONO Account Suspended" SMS'}
            </h3>
            <p className="mt-1 text-xs text-slate-300">
              {language === 'kn'
                ? 'ಖಾತೆ ಸ್ಥಗಿತಗೊಳ್ಳುತ್ತದೆ ಎಂದು ಲಿಂಕ್ ಕಳುಹಿಸಿದರೆ ಇಲ್ಲಿ ಒತ್ತಿರಿ.'
                : 'Fake SMS with phishing link claiming account lock.'}
            </p>
          </button>

          <button
            type="button"
            onClick={() =>
              handleScenarioClick(
                'ಗಮನಿಸಿ: ನಿಮ್ಮ ಖಾತೆಗೆ ಹಣ ಬರಲು ನೀವು ಎಂದಿಗೂ ಯುಪಿಐ ಪಿನ್ ಹಾಕುವ ಅಗತ್ಯವಿಲ್ಲ. ಪಿನ್ ಹಾಕಿದರೆ ನಿಮ್ಮ ಖಾತೆಯಿಂದ ಹಣ ಕಡಿತವಾಗುತ್ತದೆ!',
                'CRITICAL RULE: You NEVER need to enter your UPI PIN to receive money. Entering your PIN transfers money OUT of your account!'
              )
            }
            className="flex flex-col items-start rounded-2xl border-2 border-emerald-500/40 bg-slate-900/90 p-5 text-left transition-all hover:border-emerald-400 hover:bg-emerald-950/30 hover:scale-[1.02]"
          >
            <div className="text-2xl mb-2">💰</div>
            <h3 className="text-lg font-bold text-emerald-300">
              {language === 'kn'
                ? '೪. "ಹಣ ಸ್ವೀಕರಿಸಲು PIN ಹಾಕಿ" ಅಂತಾರೆ'
                : '4. "Enter PIN to Receive Money"'}
            </h3>
            <p className="mt-1 text-xs text-slate-300">
              {language === 'kn'
                ? 'Google Pay ಅಥವಾ PhonePe ನಲ್ಲಿ ಹಣ ಸ್ವೀಕರಿಸುವ ನೆಪದಲ್ಲಿ ಮೋಸ.'
                : 'Scammers sending collect requests or reverse QR codes.'}
            </p>
          </button>
        </div>

        {/* Spoken Advice Display Card */}
        {activeAdvice && (
          <div className="mt-6 rounded-2xl border-2 border-amber-400 bg-slate-950 p-5 animate-slide-up">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2 text-amber-400 font-bold text-sm">
                <Volume2 className={`h-5 w-5 ${isSpeaking ? 'animate-bounce' : ''}`} />
                <span>{language === 'kn' ? 'AI ಧ್ವನಿ ಸಲಹೆ:' : 'AI Voice Guidance:'}</span>
              </div>
              <button
                type="button"
                onClick={() => speakText(activeAdvice)}
                className="rounded-lg bg-amber-500 px-3 py-1 text-xs font-bold text-slate-950"
              >
                {language === 'kn' ? 'ಮತ್ತೆ ಆಲಿಸಿ' : 'Replay Audio'}
              </button>
            </div>
            <p className="text-base sm:text-lg font-bold text-white leading-relaxed">
              "{activeAdvice}"
            </p>
          </div>
        )}
      </div>
    </div>
  );
};
