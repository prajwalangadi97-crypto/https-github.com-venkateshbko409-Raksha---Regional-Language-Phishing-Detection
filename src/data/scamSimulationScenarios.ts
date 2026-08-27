import type { ScamArchetype } from '../types';

export interface SimulationOption {
  id: string;
  text: string;
  textKn: string;
  scoreDelta: number;
  isOptimal: boolean;
  feedbackEn: string;
  feedbackKn: string;
}

export interface SimulationStep {
  stepIndex: number;
  senderName: string;
  senderRole: string;
  senderAvatar: string;
  messageEn: string;
  messageKn: string;
  hasVoiceNote?: boolean;
  voiceNoteDuration?: string;
  coercionType: 'AUTHORITY_IMPERSONATION' | 'ARTIFICIAL_URGENCY' | 'PANIC' | 'GREED' | 'SHAME_THREAT';
  options: SimulationOption[];
}

export interface InteractiveSimulationScenario {
  id: string;
  title: string;
  titleKn: string;
  category: string;
  scamType: ScamArchetype;
  difficulty: 'BEGINNER' | 'INTERMEDIATE' | 'ADVANCED';
  estimatedMinutes: number;
  descriptionEn: string;
  descriptionKn: string;
  attackerName: string;
  attackerHandle: string;
  initialScore: number;
  steps: SimulationStep[];
  goldenRuleEn: string;
  goldenRuleKn: string;
}

export const interactiveScamScenarios: InteractiveSimulationScenario[] = [
  {
    id: 'sim-cbi-digital-arrest',
    title: 'CBI & Mumbai Police Digital Arrest Threat',
    titleKn: 'ಸಿಬಿಐ ಮತ್ತು ಮುಂಬೈ ಪೊಲೀಸ್ "ಡಿಜಿಟಲ್ ಅರೆಸ್ಟ್" ಬೆದರಿಕೆ',
    category: 'High-Stakes Extortion',
    scamType: 'FEDEX_DIGITAL_ARREST',
    difficulty: 'ADVANCED',
    estimatedMinutes: 4,
    descriptionEn: 'Scammers impersonate Customs & CBI officers claiming a seized FedEx parcel containing 14 fake passports and MDMA drugs is registered under your Aadhaar number.',
    descriptionKn: 'ನಿಮ್ಮ ಆಧಾರ್ ಸಂಖ್ಯೆಯ ಪಾರ್ಸೆಲ್‌ನಲ್ಲಿ ನಿಷೇಧಿತ ಡ್ರಗ್ಸ್ ಪತ್ತೆಯಾಗಿದೆ ಎಂದು ಹೇಳಿ ಸಿಬಿಐ ಹೆಸರಿನಲ್ಲಿ ಹೆದರಿಸಿ ಹಣ ಸುಲಿಗೆ ಮಾಡುವ ಸನ್ನಿವೇಶ.',
    attackerName: 'Inspector Vijay Rathore (Cyber Crime Cell)',
    attackerHandle: '+91 99823 44102',
    initialScore: 50,
    goldenRuleEn: 'Indian Law Enforcement NEVER issues "Digital Arrest" warrants or demands video call interrogations or money transfer to "RBI clearance accounts".',
    goldenRuleKn: 'ಭಾರತೀಯ ಪೊಲೀಸರು ಎಂದಿಗೂ ವೀಡಿಯೊ ಕರೆ ಮೂಲಕ "ಡಿಜಿಟಲ್ ಬಂಧನ" ಮಾಡುವುದಿಲ್ಲ ಅಥವಾ "ಆರ್‌ಬಿಐ ಪರಿಶೀಲನಾ ಖಾತೆ"ಗೆ ಹಣ ಕಳುಹಿಸಲು ಕೇಳುವುದಿಲ್ಲ.',
    steps: [
      {
        stepIndex: 0,
        senderName: 'FedEx Customs Desk',
        senderRole: 'Automated Bot / Impersonator',
        senderAvatar: '📦',
        messageEn: 'URGENT NOTICE: FedEx Parcel #FX-882910 from Mumbai to Taiwan was intercepted. Found 14 fake passports and 200g MDMA narcotics linked to your Aadhaar. Mumbai Police Cyber Cell is taking over.',
        messageKn: 'ತುರ್ತು ಸೂಚನೆ: ಮುಂಬೈನಿಂದ ತೈವಾನ್‌ಗೆ ಹೋಗುತ್ತಿದ್ದ ನಿಮ್ಮ ಆಧಾರ್ ಸಂಖ್ಯೆಯ ಪಾರ್ಸೆಲ್‌ನಲ್ಲಿ 14 ನಕಲಿ ಪಾಸ್‌ಪೋರ್ಟ್ ಮತ್ತು 200 ಗ್ರಾಂ MDMA ಡ್ರಗ್ಸ್ ಪತ್ತೆಯಾಗಿದೆ. ಮುಂಬೈ ಸೈಬರ್ ಪೊಲೀಸ್ ಇದನ್ನು ವಶಕ್ಕೆ ಪಡೆದಿದೆ.',
        hasVoiceNote: true,
        voiceNoteDuration: '0:22',
        coercionType: 'PANIC',
        options: [
          {
            id: 'cbi-1-a',
            text: 'Panic and ask: "Sir, I never sent any parcel! Please don\'t arrest me, what should I do?"',
            textKn: '"ಸರ್ ನಾನು ಯಾವುದೇ ಪಾರ್ಸೆಲ್ ಕಳುಹಿಸಿಲ್ಲ! ದಯವಿಟ್ಟು ಬಂಧಿಸಬೇಡಿ, ನಾನು ಏನು ಮಾಡಬೇಕು?" ಎಂದು ಭಯಪಡುವುದು',
            scoreDelta: -20,
            isOptimal: false,
            feedbackEn: 'Showing fear signals to the scammer that you are susceptible to psychological coercion.',
            feedbackKn: 'ಭಯ ವ್ಯಕ್ತಪಡಿಸುವುದು ದಾಳಿಕೋರರಿಗೆ ನಿಮ್ಮನ್ನು ಸುಲಭವಾಗಿ ಬ್ಲಾಕ್‌ಮೇಲ್ ಮಾಡಲು ಅವಕಾಶ ನೀಡುತ್ತದೆ.',
          },
          {
            id: 'cbi-1-b',
            text: 'Assertive Defense: "I have not sent any parcel. If an FIR is filed, share the official Crime Number and I will visit my local CEN Police Station directly."',
            textKn: '"ನಾನು ಯಾವುದೇ ಪಾರ್ಸೆಲ್ ಕಳುಹಿಸಿಲ್ಲ. FIR ದಾಖಲಾಗಿದ್ದರೆ ಅಧಿಕೃತ ಸಂಖ್ಯೆ ನೀಡಿ, ನಾನು ನೇರವಾಗಿ ಸ್ಥಳೀಯ ಸಿಇಎನ್ ಪೊಲೀಸ್ ಠಾಣೆಗೆ ಭೇಟಿ ನೀಡುತ್ತೇನೆ."',
            scoreDelta: +40,
            isOptimal: true,
            feedbackEn: 'Excellent! Insisting on local police station verification immediately breaks the scammer\'s control.',
            feedbackKn: 'ಅತ್ಯುತ್ತಮ! ಸ್ಥಳೀಯ ಪೊಲೀಸ್ ಠಾಣೆಗೆ ಭೇಟಿ ನೀಡುವುದಾಗಿ ಹೇಳುವುದು ಸ್ಕ್ಯಾಮರ್‌ನ ಹಿಡಿತವನ್ನು ಮುರಿಯುತ್ತದೆ.',
          },
        ],
      },
      {
        stepIndex: 1,
        senderName: 'Inspector Vijay Rathore',
        senderRole: 'Fake CBI Officer',
        senderAvatar: '👮‍♂️',
        messageEn: 'Do not disconnect! You are placed under DIGITAL ARREST under Sec 41A CrPC. You must remain on video call in a private room without telling family members, or immediate SWAT team will be sent to your home.',
        messageKn: 'ಫೋನ್ ಕಟ್ ಮಾಡಬೇಡಿ! ನಿಮ್ಮನ್ನು CrPC ಕಲಂ 41A ಅಡಿಯಲ್ಲಿ ಡಿಜಿಟಲ್ ಬಂಧನದಲ್ಲಿ ಇರಿಸಲಾಗಿದೆ. ಯಾರಿಗೂ ತಿಳಿಸದೆ ಏಕಾಂತ ಕೊಠಡಿಯಲ್ಲಿ ವೀಡಿಯೊ ಕರೆಯಲ್ಲಿ ಇರಬೇಕು, ಇಲ್ಲದಿದ್ದರೆ ಮನೆಗೆ ಪೊಲೀಸ್ ತಂಡ ಕಳುಹಿಸುತ್ತೇವೆ.',
        coercionType: 'AUTHORITY_IMPERSONATION',
        options: [
          {
            id: 'cbi-2-a',
            text: 'Isolate yourself in the bedroom and turn on video call to prove your innocence.',
            textKn: 'ರೂಮ್‌ಗೆ ಹೋಗಿ ಬಾಗಿಲು ಹಾಕಿ ವಿಡಿಯೋ ಕರೆ ಆನ್ ಮಾಡುವುದು',
            scoreDelta: -50,
            isOptimal: false,
            feedbackEn: 'Fatal mistake! Isolation prevents family members from helping you see through the deception.',
            feedbackKn: 'ದೊಡ್ಡ ತಪ್ಪು! ಏಕಾಂತದಲ್ಲಿ ಇರುವುದು ನಿಮ್ಮ ಕುಟುಂಬದವರ ಸಹಾಯ ಪಡೆಯುವುದನ್ನು ತಡೆಯುತ್ತದೆ.',
          },
          {
            id: 'cbi-2-b',
            text: 'Recognize the fraud: Disconnect the call immediately and dial 1930 National Cyber Helpline.',
            textKn: 'ಕರೆ ಕಡಿತಗೊಳಿಸಿ ತಕ್ಷಣ 1930 ರಾಷ್ಟ್ರೀಯ ಸೈಬರ್ ಹೆಲ್ಪ್‌ಲೈನ್‌ಗೆ ದೂರು ನೀಡುವುದು.',
            scoreDelta: +50,
            isOptimal: true,
            feedbackEn: 'Perfect countermove! Digital arrest does not exist under Indian Law. Hanging up and calling 1930 protects you completely.',
            feedbackKn: 'ಸರಿಯಾದ ನಿರ್ಧಾರ! ಭಾರತೀಯ ಕಾನೂನಿನಲ್ಲಿ "ಡಿಜಿಟಲ್ ಬಂಧನ" ಎಂಬ ಯಾವುದೇ ನಿಯಮವಿಲ್ಲ. 1930 ಗೆ ಕರೆ ಮಾಡಿ.',
          },
        ],
      },
    ],
  },
  {
    id: 'sim-bescom-bill',
    title: 'BESCOM Tonight 9:30 PM Power Cut Threat',
    titleKn: 'ಬೆಸ್ಕಾಂ ಇಂದು ರಾತ್ರಿ 9:30ಕ್ಕೆ ವಿದ್ಯುತ್ ಸಂಪರ್ಕ ಕಡಿತ ಸಂದೇಶ',
    category: 'Utility Phishing & Malware',
    scamType: 'BESCOM_POWER_CUT',
    difficulty: 'BEGINNER',
    estimatedMinutes: 3,
    descriptionEn: 'Fake electricity board notice claiming previous month bill is unpaid and power will be cut tonight at 9:30 PM unless a remote support APK is installed.',
    descriptionKn: 'ವಿದ್ಯುತ್ ಬಿಲ್ ಬಾಕಿ ಇದೆ ಎಂದು ಸುಳ್ಳು ಸಂದೇಶ ಕಳುಹಿಸಿ ನಕಲಿ APK ಆ್ಯಪ್ ಸ್ಥಾಪಿಸಲು ಒತ್ತಾಯಿಸುವ ಸನ್ನಿವೇಶ.',
    attackerName: 'BESCOM Officer Desk',
    attackerHandle: '+91 98450 12938',
    initialScore: 50,
    goldenRuleEn: 'BESCOM/KPTCL NEVER sends disconnection notices via random personal mobile numbers or asks you to install APK files for bill verification.',
    goldenRuleKn: 'ಬೆಸ್ಕಾಂ ಎಂದಿಗೂ ವೈಯಕ್ತಿಕ ಮೊಬೈಲ್ ಸಂಖ್ಯೆಗಳಿಂದ ಸಂದೇಶ ಕಳುಹಿಸುವುದಿಲ್ಲ ಅಥವಾ APK ಆ್ಯಪ್ ಡೌನ್‌ಲೋಡ್ ಮಾಡಲು ಹೇಳುವುದಿಲ್ಲ.',
    steps: [
      {
        stepIndex: 0,
        senderName: 'BESCOM Alert Desk',
        senderRole: 'Fake Utility Officer',
        senderAvatar: '⚡',
        messageEn: 'Dear Consumer, your electricity connection RR-NO: E-48192 will be disconnected tonight at 9:30 PM from sub-station. Update your bill status immediately by installing official verification app: https://bescom-karnataka-bill.top/pay.apk',
        messageKn: 'ಗ್ರಾಹಕರೇ, ನಿಮ್ಮ ಹಿಂದಿನ ತಿಂಗಳ ವಿದ್ಯುತ್ ಬಿಲ್ ಅಪ್‌ಡೇಟ್ ಆಗದ ಕಾರಣ ಇಂದು ರಾತ್ರಿ 9:30ಕ್ಕೆ ಬೆಸ್ಕಾಂ ವಿದ್ಯುತ್ ಸಂಪರ್ಕ ಕಡಿತಗೊಳಿಸಲಾಗುವುದು. ಪರಿಶೀಲನೆಗಾಗಿ ಈ ಆ್ಯಪ್ ಡೌನ್‌ಲೋಡ್ ಮಾಡಿ: https://bescom-karnataka-bill.top/pay.apk',
        coercionType: 'ARTIFICIAL_URGENCY',
        options: [
          {
            id: 'bescom-1-a',
            text: 'Click the link and install the APK so power is not cut tonight.',
            textKn: 'ಲಿಂಕ್ ಕ್ಲಿಕ್ ಮಾಡಿ APK ಆ್ಯಪ್ ಇನ್‌ಸ್ಟಾಲ್ ಮಾಡುವುದು',
            scoreDelta: -40,
            isOptimal: false,
            feedbackEn: 'Dangerous! The APK contains an SMS Stealer and Banking Trojan.',
            feedbackKn: 'ಅಪಾಯಕಾರಿ! ಈ ಆ್ಯಪ್ ನಿಮ್ಮ ಬ್ಯಾಂಕ್ OTP ಮತ್ತು ಪಾಸ್‌ವರ್ಡ್ ಕದಿಯುವ ಮಾಲ್‌ವೇರ್ ಆಗಿದೆ.',
          },
          {
            id: 'bescom-1-b',
            text: 'Check your official electricity bill on the official BESCOM website / BESCOM Mithra App or verify via 1912 BESCOM helpline.',
            textKn: 'ಅಧಿಕೃತ ಬೆಸ್ಕಾಂ ವೆಬ್‌ಸೈಟ್/ಮಿತ್ರ ಆ್ಯಪ್ ಮೂಲಕ ಅಥವಾ 1912 ಗೆ ಕರೆ ಮಾಡಿ ಬಿಲ್ ಪರಿಶೀಲಿಸುವುದು.',
            scoreDelta: +40,
            isOptimal: true,
            feedbackEn: 'Spot on! Always verify utility status via official 1912 helpline or the official portal.',
            feedbackKn: 'ಉತ್ತಮ! ಅಧಿಕೃತ 1912 ಬೆಸ್ಕಾಂ ಹೆಲ್ಪ್‌ಲೈನ್ ಮೂಲಕ ಮಾತ್ರ ಮಾಹಿತಿ ಖಚಿತಪಡಿಸಿಕೊಳ್ಳಿ.',
          },
        ],
      },
    ],
  },
  {
    id: 'sim-youtube-job',
    title: 'Telegram Work-From-Home & YouTube Like Scam',
    titleKn: 'ಟೆಲಿಗ್ರಾಮ್ ಯೂಟ್ಯೂಬ್ ಲೈಕ್ ಮತ್ತು ಪಾರ್ಟ್-ಟೈಮ್ ಜಾಬ್ ವಂಚನೆ',
    category: 'Prepaid Task Fraud',
    scamType: 'YOUTUBE_JOB',
    difficulty: 'INTERMEDIATE',
    estimatedMinutes: 3,
    descriptionEn: 'Scammers offer ₹5,000/day for liking YouTube videos, pay ₹150 for initial test, and then demand ₹50,000 "crypto deposit" for VIP task unlocking.',
    descriptionKn: 'ಯೂಟ್ಯೂಬ್ ವಿಡಿಯೋ ಲೈಕ್ ಮಾಡಿದರೆ ದಿನಕ್ಕೆ ₹5000 ಎಂದು ಆರಂಭದಲ್ಲಿ ₹150 ನೀಡಿ, ನಂತರ ₹50,000 ಠೇವಣಿ ಇಡಲು ಹೇಳಿ ವಂಚಿಸುವ ಜಾಲ.',
    attackerName: 'Pooja HR (Global Digital Media)',
    attackerHandle: '@pooja_hr_digital',
    initialScore: 50,
    goldenRuleEn: 'No legitimate company will ever ask you to pay money/deposit in order to receive salary or complete simple online tasks.',
    goldenRuleKn: 'ಯಾವುದೇ ನಿಜವಾದ ಕಂಪನಿಯು ಕೆಲಸ ನೀಡಲು ಅಥವಾ ಸಂಬಳ ನೀಡಲು ನಿಮ್ಮಿಂದ ಮುಂಗಡ ಹಣ ಕೇಳುವುದಿಲ್ಲ.',
    steps: [
      {
        stepIndex: 0,
        senderName: 'Pooja HR',
        senderRole: 'Recruiter Scammer',
        senderAvatar: '💼',
        messageEn: 'Hi! We noticed your resume on LinkedIn. Earn ₹3,000 - ₹8,000 daily from home by liking 3 YouTube videos. As a trial bonus, send us your UPI ID to receive ₹150 immediately.',
        messageKn: 'ನಮಸ್ಕಾರ! ದಿನಕ್ಕೆ 3 ಯೂಟ್ಯೂಬ್ ವೀಡಿಯೊ ಲೈಕ್ ಮಾಡಿ ಮನೆಯಿಂದಲೇ ₹3,000 - ₹8,000 ಗಳಿಸಿ. ಪ್ರಾಯೋಗಿಕವಾಗಿ ₹150 ಪಡೆಯಲು ನಿಮ್ಮ UPI ID ಕಳುಹಿಸಿ.',
        coercionType: 'GREED',
        options: [
          {
            id: 'job-1-a',
            text: 'Send UPI ID and think "There is no harm in receiving free ₹150 trial money".',
            textKn: 'ಉಚಿತವಾಗಿ ₹150 ಬರುತ್ತದಲ್ಲವೇ ಎಂದು UPI ID ಕಳುಹಿಸುವುದು',
            scoreDelta: -30,
            isOptimal: false,
            feedbackEn: 'Scammers use the initial ₹150 bait to build false trust before defrauding you of thousands later.',
            feedbackKn: 'ಮೊದಲ ₹150 ನಿಮ್ಮ ನಂಬಿಕೆ ಗಳಿಸಲು ನೀಡುವ ಆಮಿಷ ಮಾತ್ರ. ನಂತರ ದೊಡ್ಡ ಮೊತ್ತ ಸುಲಿಗೆ ಮಾಡುತ್ತಾರೆ.',
          },
          {
            id: 'job-1-b',
            text: 'Recognize task-based fraud pattern, block the sender, and report the Telegram handle to Cyber Police.',
            textKn: 'ಇದು ಟಾಸ್ಕ್ ಆಧಾರಿತ ವಂಚನೆ ಎಂದು ಗುರುತಿಸಿ, ನಂಬರ್ ಬ್ಲಾಕ್ ಮಾಡಿ ಸೈಬರ್ ಪೊಲೀಸರಿಗೆ ವರದಿ ಮಾಡುವುದು.',
            scoreDelta: +40,
            isOptimal: true,
            feedbackEn: 'Well done! Prepaid task scams are one of the most widespread fraud campaigns in India.',
            feedbackKn: 'ಉತ್ತಮ! ಇಂತಹ ಸಂದೇಶಗಳನ್ನು ತಕ್ಷಣ ಬ್ಲಾಕ್ ಮಾಡುವುದೇ ಸುರಕ್ಷಿತ.',
          },
        ],
      },
    ],
  },
  {
    id: 'sim-upi-reverse',
    title: 'OLX / Buyer "Scan to Receive Money" Trap',
    titleKn: 'OLX ನಲ್ಲಿ ವಸ್ತು ಮಾರುವಾಗ "ಹಣ ಪಡೆಯಲು QR ಸ್ಕ್ಯಾನ್ ಮಾಡಿ" ವಂಚನೆ',
    category: 'Payment Reverse Engineering',
    scamType: 'UPI_REVERSE_PAYMENT',
    difficulty: 'INTERMEDIATE',
    estimatedMinutes: 3,
    descriptionEn: 'A fake buyer on OLX agrees to purchase your old sofa without bargaining and sends a QR code claiming "Scan this QR and enter UPI PIN to receive ₹18,000 in your account".',
    descriptionKn: 'ವಸ್ತು ಖರೀದಿಸುವ ಸೋಗಿನಲ್ಲಿ ನಕಲಿ ಖರೀದಿದಾರನು "ನಿಮ್ಮ ಖಾತೆಗೆ ಹಣ ಜಮೆ ಆಗಲು ಈ QR ಸ್ಕ್ಯಾನ್ ಮಾಡಿ UPI ಪಿನ್ ಹಾಕಿ" ಎಂದು ವಂಚಿಸುವುದು.',
    attackerName: 'Army Officer Rohit Verma',
    attackerHandle: '+91 91122 33445',
    initialScore: 50,
    goldenRuleEn: 'UPI PIN is ONLY required to SEND money. You NEVER need to scan a QR code or enter your UPI PIN to RECEIVE payment.',
    goldenRuleKn: 'UPI ಪಿನ್ ಹಣ ಕಳುಹಿಸಲು ಮಾತ್ರ ಬೇಕು. ಹಣ ಪಡೆಯಲು ಎಂದಿಗೂ QR ಸ್ಕ್ಯಾನ್ ಮಾಡಬೇಕಿಲ್ಲ ಅಥವಾ ಪಿನ್ ನಮೂದಿಸಬೇಕಿಲ್ಲ.',
    steps: [
      {
        stepIndex: 0,
        senderName: 'Rohit Verma (Fake Army Buyer)',
        senderRole: 'Impersonating Army Officer',
        senderAvatar: '🎖️',
        messageEn: 'I have transferred ₹18,000 through Military Merchant Canteen Portal. To credit the amount to your bank, scan this merchant QR on PhonePe / GPay and enter your UPI PIN.',
        messageKn: 'ನಾನು ಮಿಲಿಟರಿ ಮರ್ಚೆಂಟ್ ಪೋರ್ಟಲ್ ಮೂಲಕ ₹18,000 ಕಳುಹಿಸಿದ್ದೇನೆ. ನಿಮ್ಮ ಖಾತೆಗೆ ಹಣ ಜಮೆ ಆಗಲು ಈ QR ಸ್ಕ್ಯಾನ್ ಮಾಡಿ UPI ಪಿನ್ ಹಾಕಿ.',
        coercionType: 'AUTHORITY_IMPERSONATION',
        options: [
          {
            id: 'upi-1-a',
            text: 'Scan the QR and enter your 6-digit UPI PIN thinking it will deposit the cash.',
            textKn: 'ಹಣ ಬರುತ್ತದೆ ಎಂದು ಭಾವಿಸಿ QR ಸ್ಕ್ಯಾನ್ ಮಾಡಿ UPI ಪಿನ್ ನಮೂದಿಸುವುದು',
            scoreDelta: -50,
            isOptimal: false,
            feedbackEn: 'Fatal mistake! Entering UPI PIN authorized a debit of ₹18,000 FROM your account.',
            feedbackKn: 'ದೊಡ್ಡ ತಪ್ಪು! UPI ಪಿನ್ ನಮೂದಿಸಿದರೆ ನಿಮ್ಮ ಖಾತೆಯಿಂದ ₹18,000 ಕಡಿತವಾಗುತ್ತದೆ.',
          },
          {
            id: 'upi-1-b',
            text: 'Reject firmly: "UPI PIN is only used for debiting money. If you want to pay, transfer directly to my phone number or bank account."',
            textKn: '"ಹಣ ಕಳುಹಿಸಲು ಮಾತ್ರ UPI ಪಿನ್ ಬೇಕು. ಹಣ ವರ್ಗಾಯಿಸಬೇಕಾದರೆ ನೇರವಾಗಿ ನನ್ನ ಮೊಬೈಲ್ ನಂಬರ್‌ಗೆ ಕಳುಹಿಸಿ."',
            scoreDelta: +50,
            isOptimal: true,
            feedbackEn: 'Masterclass defense! Remembering the golden rule of UPI PIN saves millions of rupees daily.',
            feedbackKn: 'ಅತ್ಯುತ್ತಮ! ಹಣ ಪಡೆಯಲು ಎಂದಿಗೂ ಪಿನ್ ಬೇಕಿಲ್ಲ ಎಂಬುದನ್ನು ನೆನಪಿಡಿ.',
          },
        ],
      },
    ],
  },
];
