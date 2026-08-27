import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import {
  ArrowLeft,
  RotateCcw,
  Copy,
  Check,
  HeartPulse,
  AlertTriangle,
  Lock,
  Sparkles,
} from 'lucide-react';
import type { Language, CyberHealthQuestion, CyberHealthTier } from '../types';

interface CyberHealthScoreProps {
  language: Language;
}

const QUESTIONS: CyberHealthQuestion[] = [
  {
    id: 'ch1',
    question: 'Do you share your UPI PIN or OTP with anyone over the phone?',
    questionKn: 'ನೀವು ಫೋನ್ ಮೂಲಕ ಯಾರಿಗಾದರೂ ನಿಮ್ಮ UPI PIN ಅಥವಾ OTP ಹಂಚಿಕೊಳ್ಳುತ್ತೀರಾ?',
    options: [
      { text: 'Never, I know no one should ask for this', textKn: 'ಎಂದಿಗೂ ಇಲ್ಲ, ಯಾರೂ ಕೇಳಬಾರದು ಎಂದು ನನಗೆ ಗೊತ್ತು', score: 10 },
      { text: 'Only with bank officials who call me', textKn: 'ನನಗೆ ಕರೆ ಮಾಡುವ ಬ್ಯಾಂಕ್ ಅಧಿಕಾರಿಗಳಿಗೆ ಮಾತ್ರ', score: 3, flag: 'OTP Sharing' },
      { text: 'Yes, if they say it is urgent', textKn: 'ಹೌದು, ತುರ್ತು ಎಂದು ಹೇಳಿದರೆ', score: 0, flag: 'OTP Sharing' },
    ],
  },
  {
    id: 'ch2',
    question: 'Do you click links received in SMS or WhatsApp from unknown numbers?',
    questionKn: 'ಅಪರಿಚಿತ ಸಂಖ್ಯೆಗಳಿಂದ SMS ಅಥವಾ WhatsApp ನಲ್ಲಿ ಬರುವ ಲಿಂಕ್‌ಗಳನ್ನು ಕ್ಲಿಕ್ ಮಾಡುತ್ತೀರಾ?',
    options: [
      { text: 'Never, I verify the source first', textKn: 'ಎಂದಿಗೂ ಇಲ್ಲ, ಮೊದಲು ಮೂಲವನ್ನು ಪರಿಶೀಲಿಸುತ್ತೇನೆ', score: 10 },
      { text: 'Sometimes, if it looks official', textKn: 'ಕೆಲವೊಮ್ಮೆ, ಅಧಿಕೃತವಾಗಿ ಕಾಣಿಸಿದರೆ', score: 4, flag: 'Link Clicking' },
      { text: 'Yes, I usually click to check', textKn: 'ಹೌದು, ಸಾಮಾನ್ಯವಾಗಿ ಪರಿಶೀಲಿಸಲು ಕ್ಲಿಕ್ ಮಾಡುತ್ತೇನೆ', score: 0, flag: 'Link Clicking' },
    ],
  },
  {
    id: 'ch3',
    question: 'How many apps on your phone have access to your contacts and camera?',
    questionKn: 'ನಿಮ್ಮ ಫೋನ್‌ನಲ್ಲಿ ಎಷ್ಟು ಆ್ಯಪ್‌ಗಳು ನಿಮ್ಮ ಸಂಪರ್ಕಗಳು ಮತ್ತು ಕ್ಯಾಮೆರಾ ಪ್ರವೇಶ ಹೊಂದಿವೆ?',
    options: [
      { text: 'I regularly review and restrict permissions', textKn: 'ನಿಯಮಿತವಾಗಿ ಪರಿಶೀಲಿಸಿ ನಿರ್ಬಂಧಿಸುತ್ತೇನೆ', score: 10 },
      { text: 'I am not sure, maybe many', textKn: 'ನನಗೆ ಖಚಿತವಿಲ್ಲ, ಬಹುಶಃ ಅನೇಕ', score: 4, flag: 'App Permissions' },
      { text: 'I give permission to every app that asks', textKn: 'ಕೇಳುವ ಪ್ರತಿ ಆ್ಯಪ್‌ಗೆ ಅನುಮತಿ ನೀಡುತ್ತೇನೆ', score: 0, flag: 'App Permissions' },
    ],
  },
  {
    id: 'ch4',
    question: 'Do you use the same password across multiple accounts?',
    questionKn: 'ಅನೇಕ ಖಾತೆಗಳಲ್ಲಿ ಒಂದೇ ಪಾಸ್‌ವರ್ಡ್ ಬಳಸುತ್ತೀರಾ?',
    options: [
      { text: 'No, I use unique passwords with a password manager', textKn: 'ಇಲ್ಲ, ಪಾಸ್‌ವರ್ಡ್ ಮ್ಯಾನೇಜರ್ ಬಳಸಿ ವಿಶಿಷ್ಟ ಪಾಸ್‌ವರ್ಡ್ ಬಳಸುತ್ತೇನೆ', score: 10 },
      { text: 'I have 2-3 passwords I rotate', textKn: '2-3 ಪಾಸ್‌ವರ್ಡ್‌ಗಳನ್ನು ಬದಲಾಯಿಸುತ್ತಾ ಬಳಸುತ್ತೇನೆ', score: 5, flag: 'Password Reuse' },
      { text: 'Yes, same password everywhere', textKn: 'ಹೌದು, ಎಲ್ಲೆಡೆ ಒಂದೇ ಪಾಸ್‌ವರ್ಡ್', score: 0, flag: 'Password Reuse' },
    ],
  },
  {
    id: 'ch5',
    question: 'If someone calls claiming to be from the police/CBI and says you are under "Digital Arrest", what would you do?',
    questionKn: 'ಯಾರಾದರೂ ಪೊಲೀಸ್/CBI ಎಂದು ಕರೆ ಮಾಡಿ ನೀವು "ಡಿಜಿಟಲ್ ಅರೆಸ್ಟ್" ಆಗಿದ್ದೀರಿ ಎಂದರೆ ನೀವು ಏನು ಮಾಡುತ್ತೀರಿ?',
    options: [
      { text: 'Hang up immediately — Digital Arrest is fake', textKn: 'ತಕ್ಷಣ ಕರೆ ಕಡಿತಗೊಳಿಸುತ್ತೇನೆ — ಡಿಜಿಟಲ್ ಅರೆಸ್ಟ್ ನಕಲಿ', score: 10 },
      { text: 'Listen first, then decide', textKn: 'ಮೊದಲು ಕೇಳುತ್ತೇನೆ, ನಂತರ ನಿರ್ಧರಿಸುತ್ತೇನೆ', score: 3, flag: 'Scam Awareness' },
      { text: 'Follow their instructions, they sound official', textKn: 'ಅವರ ಸೂಚನೆಗಳನ್ನು ಅನುಸರಿಸುತ್ತೇನೆ, ಅಧಿಕೃತವಾಗಿ ಧ್ವನಿಸುತ್ತದೆ', score: 0, flag: 'Scam Awareness' },
    ],
  },
  {
    id: 'ch6',
    question: 'Have you installed apps from outside the Google Play Store (sideloaded APKs)?',
    questionKn: 'Google Play Store ಹೊರಗಿನಿಂದ ಆ್ಯಪ್‌ಗಳನ್ನು ಸ್ಥಾಪಿಸಿದ್ದೀರಾ (sideloaded APK)?',
    options: [
      { text: 'Never, I only use the official Play Store', textKn: 'ಎಂದಿಗೂ ಇಲ್ಲ, ಅಧಿಕೃತ Play Store ಮಾತ್ರ ಬಳಸುತ್ತೇನೆ', score: 10 },
      { text: 'Once or twice, from links sent by friends', textKn: 'ಒಂದೆರಡು ಬಾರಿ, ಸ್ನೇಹಿತರು ಕಳುಹಿಸಿದ ಲಿಂಕ್‌ಗಳಿಂದ', score: 3, flag: 'Sideloaded Apps' },
      { text: 'Yes, I install loan apps and others from links', textKn: 'ಹೌದು, ಲಿಂಕ್‌ಗಳಿಂದ ಸಾಲ ಆ್ಯಪ್‌ಗಳನ್ನು ಸ್ಥಾಪಿಸುತ್ತೇನೆ', score: 0, flag: 'Sideloaded Apps' },
    ],
  },
  {
    id: 'ch7',
    question: 'Do you know what "1930" is and when to call it?',
    questionKn: '"1930" ಏನೆಂದು ಮತ್ತು ಯಾವಾಗ ಕರೆ ಮಾಡಬೇಕೆಂದು ನಿಮಗೆ ಗೊತ್ತೇ?',
    options: [
      { text: 'Yes — National Cyber Crime Helpline, call within Golden Hour', textKn: 'ಹೌದು — ರಾಷ್ಟ್ರೀಯ ಸೈಬರ್ ಅಪರಾಧ ಸಹಾಯವಾಣಿ, ಗೋಲ್ಡನ್ ಅವರ್‌ನಲ್ಲಿ ಕರೆ ಮಾಡಿ', score: 10 },
      { text: 'I have heard of it but don\'t know details', textKn: 'ಕೇಳಿದ್ದೇನೆ ಆದರೆ ವಿವರ ಗೊತ್ತಿಲ್ಲ', score: 5, flag: '1930 Awareness' },
      { text: 'No, I have never heard of it', textKn: 'ಇಲ್ಲ, ಕೇಳಿಲ್ಲ', score: 0, flag: '1930 Awareness' },
    ],
  },
  {
    id: 'ch8',
    question: 'Do you verify UPI payment requests before entering your PIN?',
    questionKn: 'PIN ನಮೂದಿಸುವ ಮೊದಲು UPI ಪಾವತಿ ವಿನಂತಿಗಳನ್ನು ಪರಿಶೀಲಿಸುತ್ತೀರಾ?',
    options: [
      { text: 'Always — I check if it is a collect request vs. payment', textKn: 'ಯಾವಾಗಲೂ — ಕಲೆಕ್ಟ್ ರಿಕ್ವೆಸ್ಟ್ ಅಥವಾ ಪಾವತಿ ಎಂದು ಪರಿಶೀಲಿಸುತ್ತೇನೆ', score: 10 },
      { text: 'Usually, but I rush sometimes', textKn: 'ಸಾಮಾನ್ಯವಾಗಿ, ಆದರೆ ಕೆಲವೊಮ್ಮೆ ಅವಸರಿಸುತ್ತೇನೆ', score: 5, flag: 'UPI Habits' },
      { text: 'I just enter PIN when asked', textKn: 'ಕೇಳಿದಾಗ PIN ನಮೂದಿಸುತ್ತೇನೆ', score: 0, flag: 'UPI Habits' },
    ],
  },
  {
    id: 'ch9',
    question: 'Are your social media profiles set to private?',
    questionKn: 'ನಿಮ್ಮ ಸಾಮಾಜಿಕ ಮಾಧ್ಯಮ ಪ್ರೊಫೈಲ್‌ಗಳು ಖಾಸಗಿಯಾಗಿವೆಯೇ?',
    options: [
      { text: 'Yes, all profiles are private with limited info', textKn: 'ಹೌದು, ಎಲ್ಲಾ ಪ್ರೊಫೈಲ್‌ಗಳು ಸೀಮಿತ ಮಾಹಿತಿಯೊಂದಿಗೆ ಖಾಸಗಿ', score: 10 },
      { text: 'Some are public, some private', textKn: 'ಕೆಲವು ಸಾರ್ವಜನಿಕ, ಕೆಲವು ಖಾಸಗಿ', score: 5, flag: 'Social Privacy' },
      { text: 'Everything is public', textKn: 'ಎಲ್ಲವೂ ಸಾರ್ವಜನಿಕ', score: 0, flag: 'Social Privacy' },
    ],
  },
  {
    id: 'ch10',
    question: 'Do you have a "family safe word" for emergency verification calls?',
    questionKn: 'ತುರ್ತು ಪರಿಶೀಲನಾ ಕರೆಗಳಿಗೆ "ಫ್ಯಾಮಿಲಿ ಸೇಫ್ ವರ್ಡ್" ಹೊಂದಿದ್ದೀರಾ?',
    options: [
      { text: 'Yes, we have an agreed-upon offline safe word', textKn: 'ಹೌದು, ಒಪ್ಪಿಕೊಂಡ ಆಫ್‌ಲೈನ್ ಸೇಫ್ ವರ್ಡ್ ಹೊಂದಿದ್ದೇವೆ', score: 10 },
      { text: 'No, but I will create one', textKn: 'ಇಲ್ಲ, ಆದರೆ ಒಂದನ್ನು ರಚಿಸುತ್ತೇನೆ', score: 5, flag: 'Family Safe Word' },
      { text: 'What is a safe word?', textKn: 'ಸೇಫ್ ವರ್ಡ್ ಎಂದರೇನು?', score: 0, flag: 'Family Safe Word' },
    ],
  },
];

const RECOMMENDATIONS: Record<string, { text: string; textKn: string }> = {
  'OTP Sharing': { text: 'CRITICAL: Never share OTP or PIN with anyone, including bank officials. Real banks never ask for OTP over phone.', textKn: 'ಗಂಭೀರ: ಬ್ಯಾಂಕ್ ಅಧಿಕಾರಿಗಳು ಸೇರಿದಂತೆ ಯಾರಿಗೂ OTP ಅಥವಾ PIN ಹಂಚಿಕೊಳ್ಳಬೇಡಿ.' },
  'Link Clicking': { text: 'Never click links from unknown senders. Always type bank URLs directly in the browser.', textKn: 'ಅಪರಿಚಿತರಿಂದ ಲಿಂಕ್ ಕ್ಲಿಕ್ ಮಾಡಬೇಡಿ. ಬ್ಯಾಂಕ್ URL ನೇರವಾಗಿ ಬ್ರೌಸರ್‌ನಲ್ಲಿ ಟೈಪ್ ಮಾಡಿ.' },
  'App Permissions': { text: 'Review app permissions monthly. Revoke camera/contacts access from apps that don\'t need it.', textKn: 'ಮಾಸಿಕ ಆ್ಯಪ್ ಅನುಮತಿಗಳನ್ನು ಪರಿಶೀಲಿಸಿ. ಅಗತ್ಯವಿಲ್ಲದ ಆ್ಯಪ್‌ಗಳಿಂದ ಕ್ಯಾಮೆರಾ/ಸಂಪರ್ಕ ಪ್ರವೇಶ ಹಿಂತೆಗೆದುಕೊಳ್ಳಿ.' },
  'Password Reuse': { text: 'Use a password manager and enable 2-Factor Authentication on all bank and email accounts.', textKn: 'ಪಾಸ್‌ವರ್ಡ್ ಮ್ಯಾನೇಜರ್ ಬಳಸಿ ಮತ್ತು ಎಲ್ಲಾ ಬ್ಯಾಂಕ್ ಮತ್ತು ಇಮೇಲ್ ಖಾತೆಗಳಲ್ಲಿ 2FA ಸಕ್ರಿಯಗೊಳಿಸಿ.' },
  'Scam Awareness': { text: '"Digital Arrest" is 100% fake. Police never call to demand money or threaten over video. Hang up and call 1930.', textKn: '"ಡಿಜಿಟಲ್ ಅರೆಸ್ಟ್" 100% ನಕಲಿ. ಪೊಲೀಸರು ಎಂದಿಗೂ ಹಣ ಕೇಳಲು ಕರೆ ಮಾಡುವುದಿಲ್ಲ. ಕರೆ ಕಟ್ ಮಾಡಿ 1930 ಗೆ ಕರೆ ಮಾಡಿ.' },
  'Sideloaded Apps': { text: 'NEVER install APKs from links or WhatsApp. Predatory loan apps steal your contacts and photos for blackmail.', textKn: 'ಲಿಂಕ್ ಅಥವಾ WhatsApp ನಿಂದ APK ಸ್ಥಾಪಿಸಬೇಡಿ. ಸಾಲ ಆ್ಯಪ್‌ಗಳು ನಿಮ್ಮ ಸಂಪರ್ಕ ಮತ್ತು ಫೋಟೋ ಕದಿಯುತ್ತವೆ.' },
  '1930 Awareness': { text: 'Save 1930 in your phone NOW. It is the National Cyber Crime Helpline — call within the Golden Hour to freeze stolen funds.', textKn: 'ಈಗಲೇ 1930 ಅನ್ನು ನಿಮ್ಮ ಫೋನ್‌ನಲ್ಲಿ ಸೇವ್ ಮಾಡಿ. ಗೋಲ್ಡನ್ ಅವರ್‌ನಲ್ಲಿ ಕರೆ ಮಾಡಿ ಕಳುವಾದ ಹಣವನ್ನು ಫ್ರೀಜ್ ಮಾಡಿ.' },
  'UPI Habits': { text: 'You NEVER need to enter UPI PIN to receive money. Always read the collect request details carefully.', textKn: 'ಹಣ ಸ್ವೀಕರಿಸಲು ನೀವು ಎಂದಿಗೂ UPI PIN ನಮೂದಿಸುವ ಅಗತ್ಯವಿಲ್ಲ. ಕಲೆಕ್ಟ್ ರಿಕ್ವೆಸ್ಟ್ ವಿವರಗಳನ್ನು ಎಚ್ಚರಿಕೆಯಿಂದ ಓದಿ.' },
  'Social Privacy': { text: 'Set all social media to private. Scammers harvest your photos, name, and relationships for impersonation attacks.', textKn: 'ಎಲ್ಲಾ ಸಾಮಾಜಿಕ ಮಾಧ್ಯಮವನ್ನು ಖಾಸಗಿ ಮಾಡಿ. ವಂಚಕರು ನಿಮ್ಮ ಫೋಟೋ ಮತ್ತು ಸಂಬಂಧಗಳನ್ನು ನಕಲಿಗೆ ಬಳಸುತ್ತಾರೆ.' },
  'Family Safe Word': { text: 'Create a family safe word that only your family knows. Use it to verify emergency calls before sending money.', textKn: 'ನಿಮ್ಮ ಕುಟುಂಬಕ್ಕೆ ಮಾತ್ರ ತಿಳಿದಿರುವ ಫ್ಯಾಮಿಲಿ ಸೇಫ್ ವರ್ಡ್ ರಚಿಸಿ. ಹಣ ಕಳುಹಿಸುವ ಮೊದಲು ತುರ್ತು ಕರೆಗಳನ್ನು ಪರಿಶೀಲಿಸಲು ಬಳಸಿ.' },
};

const getTier = (score: number): CyberHealthTier => {
  if (score >= 90) return 'FORTRESS';
  if (score >= 70) return 'VIGILANT';
  if (score >= 50) return 'AT_RISK';
  if (score >= 30) return 'VULNERABLE';
  return 'CRITICAL';
};

const TIER_CONFIG: Record<CyberHealthTier, { label: string; labelKn: string; color: string; gradient: string }> = {
  FORTRESS: { label: 'Cyber Fortress', labelKn: 'ಸೈಬರ್ ಕೋಟೆ', color: 'text-emerald-400', gradient: 'from-emerald-500 to-teal-500' },
  VIGILANT: { label: 'Vigilant Guardian', labelKn: 'ಜಾಗರೂಕ ರಕ್ಷಕ', color: 'text-cyan-400', gradient: 'from-cyan-500 to-blue-500' },
  AT_RISK: { label: 'At Risk', labelKn: 'ಅಪಾಯದಲ್ಲಿ', color: 'text-amber-400', gradient: 'from-amber-500 to-orange-500' },
  VULNERABLE: { label: 'Vulnerable', labelKn: 'ದುರ್ಬಲ', color: 'text-orange-400', gradient: 'from-orange-500 to-red-500' },
  CRITICAL: { label: 'Critical Exposure', labelKn: 'ಗಂಭೀರ ಅಪಾಯ', color: 'text-red-400', gradient: 'from-red-500 to-rose-600' },
};

const gaugeColor = (tier: CyberHealthTier): string => {
  const map: Record<CyberHealthTier, string> = { FORTRESS: '#34d399', VIGILANT: '#22d3ee', AT_RISK: '#fbbf24', VULNERABLE: '#f97316', CRITICAL: '#ef4444' };
  return map[tier];
};

export const CyberHealthScore: React.FC<CyberHealthScoreProps> = ({ language }) => {
  const [currentQ, setCurrentQ] = useState(0);
  const [answers, setAnswers] = useState<number[]>([]);
  const [isComplete, setIsComplete] = useState(false);
  const [copied, setCopied] = useState(false);

  const progress = ((currentQ) / QUESTIONS.length) * 100;

  const handleAnswer = (scoreVal: number) => {
    const newAnswers = [...answers, scoreVal];
    setAnswers(newAnswers);
    if (currentQ + 1 < QUESTIONS.length) {
      setCurrentQ(prev => prev + 1);
    } else {
      setIsComplete(true);
      const totalScore = Math.round((newAnswers.reduce((a, b) => a + b, 0) / (QUESTIONS.length * 10)) * 100);
      if (getTier(totalScore) === 'FORTRESS') {
        confetti({ particleCount: 150, spread: 80, origin: { y: 0.6 } });
      }
    }
  };

  const handleBack = () => {
    if (currentQ > 0) {
      setCurrentQ(prev => prev - 1);
      setAnswers(prev => prev.slice(0, -1));
    }
  };

  const handleReset = () => {
    setCurrentQ(0);
    setAnswers([]);
    setIsComplete(false);
    setCopied(false);
  };

  // Calculate results
  const totalScore = isComplete ? Math.round((answers.reduce((a, b) => a + b, 0) / (QUESTIONS.length * 10)) * 100) : 0;
  const tier = getTier(totalScore);
  const tierConfig = TIER_CONFIG[tier];

  // Collect weak areas
  const weakAreas: string[] = [];
  if (isComplete) {
    QUESTIONS.forEach((q, i) => {
      const chosen = q.options.find(o => o.score === answers[i]);
      if (chosen?.flag && !weakAreas.includes(chosen.flag)) {
        weakAreas.push(chosen.flag);
      }
    });
  }

  const handleCopy = () => {
    const text = `🛡️ My Raksha AI Cyber Health Score: ${totalScore}/100 — ${tierConfig.label}\n\nCheck your cyber vulnerability: raksha.ai/health-score`;
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // SVG Gauge
  const radius = 65;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (totalScore / 100) * circumference;

  const question = QUESTIONS[currentQ];

  return (
    <div className="mx-auto max-w-4xl px-4 py-8 sm:px-6">
      <div className="rounded-3xl border border-slate-800 bg-slate-900/80 p-6 sm:p-8 backdrop-blur-xl shadow-2xl">
        {/* Header */}
        <div className="flex items-center gap-2 mb-6">
          <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-violet-500/20 text-violet-400">
            <HeartPulse className="h-4 w-4" />
          </span>
          <h2 className="text-xl font-bold text-slate-100 sm:text-2xl">
            {language === 'kn' ? 'ಸೈಬರ್ ಆರೋಗ್ಯ ಮೌಲ್ಯಾಂಕನ' : 'Cyber Health Score Assessment'}
          </h2>
        </div>

        {!isComplete ? (
          <div>
            {/* Progress Bar */}
            <div className="mb-6">
              <div className="flex items-center justify-between text-xs text-slate-400 mb-1.5">
                <span>{language === 'kn' ? `ಪ್ರಶ್ನೆ ${currentQ + 1} / ${QUESTIONS.length}` : `Question ${currentQ + 1} of ${QUESTIONS.length}`}</span>
                <span className="font-mono">{Math.round(progress)}%</span>
              </div>
              <div className="h-2 rounded-full bg-slate-800 overflow-hidden">
                <div
                  className="h-full rounded-full bg-gradient-to-r from-violet-500 to-cyan-500 transition-all duration-500 ease-out"
                  style={{ width: `${progress}%` }}
                />
              </div>
            </div>

            {/* Question */}
            <h3 className="text-base sm:text-lg font-bold text-slate-100 leading-relaxed mb-6">
              {language === 'kn' ? question.questionKn : question.question}
            </h3>

            {/* Options */}
            <div className="space-y-3 mb-6">
              {question.options.map((opt, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => handleAnswer(opt.score)}
                  className="w-full flex items-start gap-3 rounded-xl border border-slate-800 bg-slate-950/60 p-4 text-left text-sm font-semibold text-slate-200 transition-all hover:border-violet-500/50 hover:bg-slate-900/80 hover:text-white"
                >
                  <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-slate-700 bg-slate-900 text-[10px] font-bold text-slate-400">
                    {String.fromCharCode(65 + idx)}
                  </span>
                  <span>{language === 'kn' ? opt.textKn : opt.text}</span>
                </button>
              ))}
            </div>

            {/* Back button */}
            {currentQ > 0 && (
              <button
                type="button"
                onClick={handleBack}
                className="flex items-center gap-1.5 rounded-xl border border-slate-800 bg-slate-950 px-4 py-2 text-xs font-bold text-slate-400 hover:text-white"
              >
                <ArrowLeft className="h-3.5 w-3.5" />
                <span>{language === 'kn' ? 'ಹಿಂದೆ' : 'Back'}</span>
              </button>
            )}
          </div>
        ) : (
          <div className="animate-fade-in">
            {/* Result */}
            <div className="flex flex-col items-center text-center mb-8">
              {/* Animated SVG Gauge */}
              <div className="relative w-44 h-44 mb-4">
                <svg className="w-full h-full -rotate-90" viewBox="0 0 160 160">
                  <circle cx="80" cy="80" r={radius} fill="none" stroke="rgba(30,41,59,0.8)" strokeWidth="12" />
                  <circle
                    cx="80"
                    cy="80"
                    r={radius}
                    fill="none"
                    stroke={gaugeColor(tier)}
                    strokeWidth="12"
                    strokeLinecap="round"
                    strokeDasharray={circumference}
                    strokeDashoffset={strokeDashoffset}
                    className="transition-all duration-[1.5s] ease-out"
                  />
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <span className={`font-mono text-3xl font-black ${tierConfig.color}`}>{totalScore}</span>
                  <span className="text-[10px] font-semibold text-slate-400">/ 100</span>
                </div>
              </div>

              <div className={`inline-flex items-center gap-2 rounded-full bg-gradient-to-r ${tierConfig.gradient} px-4 py-1.5 text-sm font-bold text-white`}>
                {tier === 'FORTRESS' ? <Sparkles className="h-4 w-4" /> : tier === 'CRITICAL' ? <AlertTriangle className="h-4 w-4" /> : <Lock className="h-4 w-4" />}
                <span>{language === 'kn' ? tierConfig.labelKn : tierConfig.label}</span>
              </div>

              <p className="mt-3 text-xs text-slate-400 max-w-md">
                {tier === 'FORTRESS'
                  ? (language === 'kn' ? 'ಅಭಿನಂದನೆಗಳು! ನಿಮ್ಮ ಸೈಬರ್ ರಕ್ಷಣೆ ಅತ್ಯುತ್ತಮವಾಗಿದೆ.' : 'Outstanding! Your cyber defense posture is exceptional.')
                  : (language === 'kn' ? 'ನಿಮ್ಮ ಸೈಬರ್ ರಕ್ಷಣೆಯಲ್ಲಿ ಸುಧಾರಣೆ ಅಗತ್ಯವಿದೆ. ಕೆಳಗಿನ ಶಿಫಾರಸುಗಳನ್ನು ಅನುಸರಿಸಿ.' : 'Your cyber defense has gaps. Follow the recommendations below to strengthen your protection.')}
              </p>
            </div>

            {/* Recommendations */}
            {weakAreas.length > 0 && (
              <div className="mb-6">
                <h4 className="text-xs font-bold uppercase text-slate-300 mb-3">
                  {language === 'kn' ? 'ವೈಯಕ್ತಿಕ ಶಿಫಾರಸುಗಳು' : 'Personalized Recommendations'}
                </h4>
                <div className="space-y-2">
                  {weakAreas.slice(0, 5).map(area => {
                    const rec = RECOMMENDATIONS[area];
                    if (!rec) return null;
                    return (
                      <div key={area} className="rounded-xl border border-amber-500/30 bg-amber-950/20 p-3 text-xs leading-relaxed text-amber-200">
                        <span className="font-bold text-amber-400">{area}: </span>
                        {language === 'kn' ? rec.textKn : rec.text}
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Actions */}
            <div className="flex flex-wrap gap-3 justify-center">
              <button
                type="button"
                onClick={handleCopy}
                className="flex items-center gap-1.5 rounded-xl border border-cyan-500/40 bg-cyan-950/30 px-4 py-2 text-xs font-bold text-cyan-300 hover:bg-cyan-900/40"
              >
                {copied ? <Check className="h-3.5 w-3.5" /> : <Copy className="h-3.5 w-3.5" />}
                <span>{copied ? (language === 'kn' ? 'ನಕಲಿಸಲಾಗಿದೆ!' : 'Copied!') : (language === 'kn' ? 'ಸ್ಕೋರ್ ಹಂಚಿಕೊಳ್ಳಿ' : 'Share Score')}</span>
              </button>
              <button
                type="button"
                onClick={handleReset}
                className="flex items-center gap-1.5 rounded-xl border border-slate-700 bg-slate-800 px-4 py-2 text-xs font-bold text-slate-300 hover:text-white"
              >
                <RotateCcw className="h-3.5 w-3.5" />
                <span>{language === 'kn' ? 'ಮತ್ತೆ ಪ್ರಯತ್ನಿಸಿ' : 'Retake Assessment'}</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
