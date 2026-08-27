import type {
  IOC,
  PhishingAnalysis,
  UrlAnalysis,
  VoiceForensicResult,
  ApkAnalysis,
  BankFreezeNotice,
  CENStation,
  ScamDnaNode,
  ScamDnaEdge,
  DistrictThreat,
  FamilyMember,
  SimulationScenario,
  QuizQuestion,
  TelemetryStats,
  HoneypotMessage,
  ScamArchetype,
  ThreatLevel,
  CoercionTrigger,
} from './types';

/* ═══════════════════════════════════════════════════════════
   HELPER UTILITIES
   ═══════════════════════════════════════════════════════════ */

const delay = (ms: number) => new Promise((r) => setTimeout(r, ms));
const rand = (min: number, max: number) => Math.floor(Math.random() * (max - min + 1)) + min;
const pick = <T>(arr: T[]): T => arr[Math.floor(Math.random() * arr.length)];

/* ═══════════════════════════════════════════════════════════
   MOCK IOCs
   ═══════════════════════════════════════════════════════════ */

export const mockIOCs: IOC[] = [
  { id: 'ioc-1', type: 'PHONE', value: '+91-98456-XXXXX', firstSeen: '2026-07-12', lastSeen: '2026-08-20', riskScore: 92, linkedScamArchetype: 'FEDEX_DIGITAL_ARREST', reportCount: 47 },
  { id: 'ioc-2', type: 'UPI', value: 'scammer@ybl', firstSeen: '2026-06-03', lastSeen: '2026-08-18', riskScore: 88, linkedScamArchetype: 'UPI_REVERSE_PAYMENT', reportCount: 31 },
  { id: 'ioc-3', type: 'URL', value: 'http://sbi-yono-verify.top/kyc', firstSeen: '2026-08-01', lastSeen: '2026-08-22', riskScore: 95, linkedScamArchetype: 'SBI_YONO_KYC', reportCount: 156 },
  { id: 'ioc-4', type: 'BANK_ACCOUNT', value: 'XXXX-XXXX-4521', firstSeen: '2026-05-15', lastSeen: '2026-08-19', riskScore: 78, linkedScamArchetype: 'LOAN_APP_BLACKMAIL', reportCount: 22 },
  { id: 'ioc-5', type: 'PHONE', value: '+91-77609-XXXXX', firstSeen: '2026-08-10', lastSeen: '2026-08-23', riskScore: 85, linkedScamArchetype: 'BESCOM_POWER_CUT', reportCount: 63 },
  { id: 'ioc-6', type: 'EMAIL', value: 'customs.officer@gov-india.xyz', firstSeen: '2026-07-20', lastSeen: '2026-08-21', riskScore: 90, linkedScamArchetype: 'CUSTOMS_IMPERSONATION', reportCount: 38 },
  { id: 'ioc-7', type: 'TELEGRAM', value: '@invest_guru_returns', firstSeen: '2026-06-28', lastSeen: '2026-08-22', riskScore: 82, linkedScamArchetype: 'INVESTMENT_PONZI', reportCount: 94 },
  { id: 'ioc-8', type: 'IP', value: '103.25.XX.XX', firstSeen: '2026-08-05', lastSeen: '2026-08-23', riskScore: 76, linkedScamArchetype: 'AADHAAR_LINK_FRAUD', reportCount: 15 },
];

/* ═══════════════════════════════════════════════════════════
   MOCK DISTRICT THREATS
   ═══════════════════════════════════════════════════════════ */

export const mockDistrictThreats: DistrictThreat[] = [
  { district: 'Bengaluru Urban', totalCases: 4521, activeCampaigns: 12, topScamType: 'INVESTMENT_PONZI', trend: 'rising', recentSpike: true },
  { district: 'Mysuru', totalCases: 1230, activeCampaigns: 5, topScamType: 'SBI_YONO_KYC', trend: 'stable', recentSpike: false },
  { district: 'Mangaluru (DK)', totalCases: 890, activeCampaigns: 4, topScamType: 'FEDEX_DIGITAL_ARREST', trend: 'rising', recentSpike: true },
  { district: 'Hubballi-Dharwad', totalCases: 675, activeCampaigns: 3, topScamType: 'LOAN_APP_BLACKMAIL', trend: 'declining', recentSpike: false },
  { district: 'Belagavi', totalCases: 512, activeCampaigns: 2, topScamType: 'BESCOM_POWER_CUT', trend: 'stable', recentSpike: false },
  { district: 'Kalaburagi', totalCases: 398, activeCampaigns: 3, topScamType: 'UPI_REVERSE_PAYMENT', trend: 'rising', recentSpike: true },
  { district: 'Tumakuru', totalCases: 267, activeCampaigns: 1, topScamType: 'OTP_THEFT', trend: 'declining', recentSpike: false },
  { district: 'Shivamogga', totalCases: 189, activeCampaigns: 2, topScamType: 'AADHAAR_LINK_FRAUD', trend: 'stable', recentSpike: false },
];

/* ═══════════════════════════════════════════════════════════
   MOCK CEN STATIONS
   ═══════════════════════════════════════════════════════════ */

export const mockCENStations: CENStation[] = [
  { district: 'Bengaluru Urban', stationName: 'CEN Police Station, Bengaluru City', address: 'CID Building, Carlton House, Palace Road, Bengaluru - 560001', phone: '080-22942346', email: 'cen-blrcity@ksp.gov.in' },
  { district: 'Mysuru', stationName: 'CEN Police Station, Mysuru', address: 'SP Office Compound, Mysuru - 570001', phone: '0821-2418100', email: 'cen-mysuru@ksp.gov.in' },
  { district: 'Mangaluru (DK)', stationName: 'CEN Police Station, Mangaluru', address: 'SP Office, Pandeshwar, Mangaluru - 575001', phone: '0824-2220501', email: 'cen-mangaluru@ksp.gov.in' },
  { district: 'Hubballi-Dharwad', stationName: 'CEN Police Station, Hubballi', address: 'CP Office Compound, Hubballi - 580020', phone: '0836-2233500', email: 'cen-hubballi@ksp.gov.in' },
  { district: 'Belagavi', stationName: 'CEN Police Station, Belagavi', address: 'SP Office, Khanapur Road, Belagavi - 590001', phone: '0831-2405100', email: 'cen-belagavi@ksp.gov.in' },
  { district: 'Kalaburagi', stationName: 'CEN Police Station, Kalaburagi', address: 'SP Office, Station Bazaar, Kalaburagi - 585101', phone: '08472-278100', email: 'cen-kalaburagi@ksp.gov.in' },
];

/* ═══════════════════════════════════════════════════════════
   MOCK BANK FREEZE NOTICES
   ═══════════════════════════════════════════════════════════ */

export const mockBankNotices: BankFreezeNotice[] = [
  { bankName: 'State Bank of India', nodalOfficerEmail: 'nodal.officer@sbi.co.in', nodalOfficerPhone: '1800-111-109', smsCode: 'FREEZE', emailTemplate: 'Dear Nodal Officer,\n\nI am a victim of cyber fraud. I request immediate freezing of the below beneficiary account under RBI Circular on Cyber Fraud:\n\nBeneficiary Account: {accountNumber}\nTransaction UTR: {utr}\nAmount: ₹{amount}\nScammer UPI: {scammerUPI}\n\nKindly take immediate action within the Golden Hour.\n\nRegards,\n{victimName}\nPhone: {victimPhone}' },
  { bankName: 'HDFC Bank', nodalOfficerEmail: 'nodal.officer@hdfcbank.com', nodalOfficerPhone: '1800-266-4332', emailTemplate: 'Dear Nodal Officer,\n\nI am a victim of cyber fraud. I request immediate freezing of the below beneficiary account under RBI Circular on Cyber Fraud:\n\nBeneficiary Account: {accountNumber}\nTransaction UTR: {utr}\nAmount: ₹{amount}\nScammer UPI: {scammerUPI}\n\nKindly take immediate action within the Golden Hour.\n\nRegards,\n{victimName}\nPhone: {victimPhone}' },
  { bankName: 'ICICI Bank', nodalOfficerEmail: 'headoffice@icicibank.com', nodalOfficerPhone: '1800-200-3344', emailTemplate: 'Dear Nodal Officer,\n\nI am a victim of cyber fraud. I request immediate freezing of the below beneficiary account under RBI Circular on Cyber Fraud:\n\nBeneficiary Account: {accountNumber}\nTransaction UTR: {utr}\nAmount: ₹{amount}\nScammer UPI: {scammerUPI}\n\nKindly take immediate action within the Golden Hour.\n\nRegards,\n{victimName}\nPhone: {victimPhone}' },
  { bankName: 'Axis Bank', nodalOfficerEmail: 'nodal.officer@axisbank.com', nodalOfficerPhone: '1800-209-5577', emailTemplate: 'Dear Nodal Officer,\n\nI am a victim of cyber fraud. I request immediate freezing of the below beneficiary account under RBI Circular on Cyber Fraud:\n\nBeneficiary Account: {accountNumber}\nTransaction UTR: {utr}\nAmount: ₹{amount}\nScammer UPI: {scammerUPI}\n\nKindly take immediate action within the Golden Hour.\n\nRegards,\n{victimName}\nPhone: {victimPhone}' },
  { bankName: 'Canara Bank', nodalOfficerEmail: 'nodalofficer@canarabank.com', nodalOfficerPhone: '1800-425-0018', emailTemplate: 'Dear Nodal Officer,\n\nI am a victim of cyber fraud. I request immediate freezing of the below beneficiary account under RBI Circular on Cyber Fraud:\n\nBeneficiary Account: {accountNumber}\nTransaction UTR: {utr}\nAmount: ₹{amount}\nScammer UPI: {scammerUPI}\n\nKindly take immediate action within the Golden Hour.\n\nRegards,\n{victimName}\nPhone: {victimPhone}' },
  { bankName: 'Union Bank of India', nodalOfficerEmail: 'nodalofficer@unionbankofindia.co.in', nodalOfficerPhone: '1800-222-244', emailTemplate: 'Dear Nodal Officer,\n\nI am a victim of cyber fraud. I request immediate freezing of the below beneficiary account under RBI Circular on Cyber Fraud:\n\nBeneficiary Account: {accountNumber}\nTransaction UTR: {utr}\nAmount: ₹{amount}\nScammer UPI: {scammerUPI}\n\nKindly take immediate action within the Golden Hour.\n\nRegards,\n{victimName}\nPhone: {victimPhone}' },
];

/* ═══════════════════════════════════════════════════════════
   MOCK SCAM DNA GRAPH
   ═══════════════════════════════════════════════════════════ */

export const mockScamDnaNodes: ScamDnaNode[] = [
  { id: 'n1', label: 'Campaign: YONO KYC', type: 'SCAM_CAMPAIGN', risk: 'CRITICAL', x: 400, y: 250 },
  { id: 'n2', label: '+91-98456-XXXXX', type: 'PHONE', risk: 'HIGH', x: 200, y: 100 },
  { id: 'n3', label: 'scammer@ybl', type: 'UPI', risk: 'HIGH', x: 600, y: 100 },
  { id: 'n4', label: 'XXXX-4521', type: 'BANK_ACCOUNT', risk: 'CRITICAL', x: 600, y: 400 },
  { id: 'n5', label: 'sbi-yono-verify.top', type: 'URL', risk: 'CRITICAL', x: 200, y: 400 },
  { id: 'n6', label: '+91-77609-XXXXX', type: 'PHONE', risk: 'MEDIUM', x: 100, y: 250 },
  { id: 'n7', label: 'customs.officer@gov-india.xyz', type: 'EMAIL', risk: 'HIGH', x: 700, y: 250 },
  { id: 'n8', label: 'Campaign: Digital Arrest', type: 'SCAM_CAMPAIGN', risk: 'CRITICAL', x: 400, y: 450 },
  { id: 'n9', label: '@invest_guru', type: 'TELEGRAM', risk: 'MEDIUM', x: 300, y: 550 },
  { id: 'n10', label: '103.25.XX.XX', type: 'IP', risk: 'HIGH', x: 500, y: 550 },
];

export const mockScamDnaEdges: ScamDnaEdge[] = [
  { source: 'n2', target: 'n1', relation: 'operates' },
  { source: 'n3', target: 'n1', relation: 'receives funds' },
  { source: 'n4', target: 'n1', relation: 'launders via' },
  { source: 'n5', target: 'n1', relation: 'phishing domain' },
  { source: 'n6', target: 'n2', relation: 'linked SIM' },
  { source: 'n7', target: 'n8', relation: 'impersonation email' },
  { source: 'n2', target: 'n8', relation: 'also operates' },
  { source: 'n4', target: 'n8', relation: 'mule account' },
  { source: 'n9', target: 'n8', relation: 'recruiting channel' },
  { source: 'n10', target: 'n5', relation: 'hosts' },
  { source: 'n10', target: 'n8', relation: 'C2 server' },
];

/* ═══════════════════════════════════════════════════════════
   MOCK FAMILY MEMBERS
   ═══════════════════════════════════════════════════════════ */

export const mockFamilyMembers: FamilyMember[] = [
  { id: 'f1', name: 'Amma', relation: 'Mother', phone: '+91-98XXX-XXXXX', riskLevel: 'HIGH', lastAlert: 'Received BESCOM scam SMS', isOnline: true },
  { id: 'f2', name: 'Appa', relation: 'Father', phone: '+91-94XXX-XXXXX', riskLevel: 'MEDIUM', isOnline: true },
  { id: 'f3', name: 'Ajji', relation: 'Grandmother', phone: '+91-80XXX-XXXXX', riskLevel: 'CRITICAL', lastAlert: 'Clicked suspicious link', isOnline: false },
  { id: 'f4', name: 'Thambi', relation: 'Younger Brother', phone: '+91-96XXX-XXXXX', riskLevel: 'LOW', isOnline: true },
];

/* ═══════════════════════════════════════════════════════════
   MOCK SIMULATION SCENARIOS
   ═══════════════════════════════════════════════════════════ */

export const mockSimulations: SimulationScenario[] = [
  {
    id: 'sim-1',
    title: 'BESCOM Power Disconnection Scam',
    titleKn: 'ಬೆಸ್ಕಾಂ ವಿದ್ಯುತ್ ಸಂಪರ್ಕ ಕಡಿತ ವಂಚನೆ',
    description: 'A scammer pretends to be from BESCOM and threatens to cut your electricity.',
    scamType: 'BESCOM_POWER_CUT',
    difficulty: 'BEGINNER',
    steps: [
      { message: 'Dear Customer, Your BESCOM electricity bill of ₹4,523 is overdue. Your power will be disconnected in 2 hours. Pay now: bescom-pay.link/urgent', messageKn: 'ಆತ್ಮೀಯ ಗ್ರಾಹಕರೇ, ನಿಮ್ಮ ₹4,523 ವಿದ್ಯುತ್ ಬಿಲ್ ಬಾಕಿಯಿದೆ. 2 ಗಂಟೆಯಲ್ಲಿ ವಿದ್ಯುತ್ ಕಡಿತವಾಗುತ್ತದೆ.', isScammer: true, correctAction: 'IGNORE' },
      { message: 'Sir please pay immediately otherwise we will disconnect. This is final warning from BESCOM head office.', messageKn: 'ಸರ್ ದಯವಿಟ್ಟು ತಕ್ಷಣ ಪಾವತಿಸಿ ಇಲ್ಲದಿದ್ದರೆ ನಾವು ಸಂಪರ್ಕ ಕಡಿತ ಮಾಡುತ್ತೇವೆ.', isScammer: true, correctAction: 'BLOCK' },
      { message: 'Okay sir I am sending you OTP. Please share OTP to cancel disconnection.', messageKn: 'ಸರಿ ಸರ್ ನಾನು OTP ಕಳುಹಿಸುತ್ತಿದ್ದೇನೆ. ಸಂಪರ್ಕ ಕಡಿತ ರದ್ದುಗೊಳಿಸಲು OTP ಹಂಚಿಕೊಳ್ಳಿ.', isScammer: true, correctAction: 'REPORT' },
    ],
  },
  {
    id: 'sim-2',
    title: 'FedEx Digital Arrest Scam',
    titleKn: 'ಫೆಡೆಕ್ಸ್ ಡಿಜಿಟಲ್ ಅರೆಸ್ಟ್ ವಂಚನೆ',
    description: 'A caller claims your FedEx parcel contains contraband and threatens arrest.',
    scamType: 'FEDEX_DIGITAL_ARREST',
    difficulty: 'INTERMEDIATE',
    steps: [
      { message: 'This is FedEx Courier Service. A parcel in your name containing 5 fake passports and 200g MDMA has been seized by Mumbai Customs. Press 1 to speak to the officer.', messageKn: 'ಇದು ಫೆಡೆಕ್ಸ್ ಕೊರಿಯರ್ ಸೇವೆ. ನಿಮ್ಮ ಹೆಸರಿನ ಪಾರ್ಸೆಲ್‌ನಲ್ಲಿ 5 ನಕಲಿ ಪಾಸ್‌ಪೋರ್ಟ್‌ಗಳು ಮತ್ತು MDMA ವಶಪಡಿಸಿಕೊಳ್ಳಲಾಗಿದೆ.', isScammer: true, correctAction: 'BLOCK' },
      { message: 'I am Inspector Sharma from CBI. Your Aadhaar is linked to money laundering case FIR No. 2026/CBI/4521. You must stay on video call for digital arrest verification. Do not tell anyone.', messageKn: 'ನಾನು CBI ಯ ಇನ್ಸ್ಪೆಕ್ಟರ್ ಶರ್ಮಾ. ನಿಮ್ಮ ಆಧಾರ್ ಹಣ ಅಕ್ರಮ ವರ್ಗಾವಣೆ ಪ್ರಕರಣಕ್ಕೆ ಲಿಂಕ್ ಆಗಿದೆ.', isScammer: true, correctAction: 'REPORT' },
      { message: 'Transfer ₹2,50,000 to RBI verification account for clearance. Once verified, money will be returned in 24 hours. Account: XXXX-XXXX-8834', messageKn: 'RBI ಪರಿಶೀಲನಾ ಖಾತೆಗೆ ₹2,50,000 ವರ್ಗಾಯಿಸಿ. ಪರಿಶೀಲಿಸಿದ ನಂತರ ಹಣ 24 ಗಂಟೆಯಲ್ಲಿ ಹಿಂತಿರುಗಿಸಲಾಗುತ್ತದೆ.', isScammer: true, correctAction: 'BLOCK' },
    ],
  },
  {
    id: 'sim-3',
    title: 'YouTube Job Offer Scam',
    titleKn: 'ಯೂಟ್ಯೂಬ್ ಉದ್ಯೋಗ ವಂಚನೆ',
    description: 'Scammers offer easy money for liking YouTube videos, then ask for investment.',
    scamType: 'YOUTUBE_JOB',
    difficulty: 'ADVANCED',
    steps: [
      { message: 'Hi! I am HR from YouTube partner company. We are hiring part-time workers. Earn ₹500-5000 daily by liking videos. Interested? Join our Telegram group.', messageKn: 'ಹಾಯ್! ನಾನು YouTube ಪಾಲುದಾರ ಕಂಪನಿಯ HR. ನಾವು ಅರೆಕಾಲಿಕ ಕೆಲಸಗಾರರನ್ನು ನೇಮಿಸಿಕೊಳ್ಳುತ್ತಿದ್ದೇವೆ. ವೀಡಿಯೊಗಳಿಗೆ ಲೈಕ್ ಮಾಡಿ ₹500-5000 ಗಳಿಸಿ.', isScammer: true, correctAction: 'IGNORE' },
      { message: 'Great! Here is your first task. Like these 3 videos and send screenshot. We will send ₹150 to your UPI immediately as proof.', messageKn: 'ಅದ್ಭುತ! ಇಲ್ಲಿ ನಿಮ್ಮ ಮೊದಲ ಕಾರ್ಯ. ಈ 3 ವೀಡಿಯೊಗಳಿಗೆ ಲೈಕ್ ಮಾಡಿ ಸ್ಕ್ರೀನ್‌ಶಾಟ್ ಕಳುಹಿಸಿ.', isScammer: true, correctAction: 'VERIFY' },
      { message: 'You have earned ₹2,340! To withdraw, you need to complete VIP task. Deposit ₹5,000 to prepaid task wallet. You will get ₹15,000 back within 1 hour.', messageKn: 'ನೀವು ₹2,340 ಗಳಿಸಿದ್ದೀರಿ! ಹಿಂಪಡೆಯಲು VIP ಕಾರ್ಯ ಪೂರ್ಣಗೊಳಿಸಿ. ₹5,000 ಠೇವಣಿ ಮಾಡಿ.', isScammer: true, correctAction: 'REPORT' },
    ],
  },
];

/* ═══════════════════════════════════════════════════════════
   MOCK QUIZ QUESTIONS
   ═══════════════════════════════════════════════════════════ */

export const mockQuizQuestions: QuizQuestion[] = [
  {
    id: 'q1',
    question: 'You receive a call from "CBI" saying your Aadhaar is linked to a drug case. What should you do?',
    questionKn: 'ನಿಮ್ಮ ಆಧಾರ್ ಡ್ರಗ್ ಕೇಸ್‌ಗೆ ಲಿಂಕ್ ಆಗಿದೆ ಎಂದು "CBI" ಯಿಂದ ಕರೆ ಬರುತ್ತದೆ. ನೀವು ಏನು ಮಾಡಬೇಕು?',
    options: [
      { text: 'Stay on the call and follow instructions', textKn: 'ಕರೆಯಲ್ಲಿ ಇರಿ ಮತ್ತು ಸೂಚನೆಗಳನ್ನು ಅನುಸರಿಸಿ', isCorrect: false },
      { text: 'Hang up and call 1930 (Cyber Crime Helpline)', textKn: 'ಕರೆ ಕಡಿತಗೊಳಿಸಿ ಮತ್ತು 1930 ಗೆ ಕರೆ ಮಾಡಿ', isCorrect: true },
      { text: 'Transfer money to the "verification account"', textKn: '"ಪರಿಶೀಲನಾ ಖಾತೆ"ಗೆ ಹಣ ವರ್ಗಾಯಿಸಿ', isCorrect: false },
      { text: 'Share your Aadhaar number to verify', textKn: 'ಪರಿಶೀಲಿಸಲು ನಿಮ್ಮ ಆಧಾರ್ ಸಂಖ್ಯೆ ಹಂಚಿಕೊಳ್ಳಿ', isCorrect: false },
    ],
    explanation: 'CBI/Police never call to demand money or threaten "digital arrest". This is a common impersonation scam. Always call the official Cyber Crime Helpline 1930.',
    explanationKn: 'CBI/ಪೊಲೀಸರು ಎಂದಿಗೂ ಹಣ ಕೇಳಲು ಅಥವಾ "ಡಿಜಿಟಲ್ ಅರೆಸ್ಟ್" ಎಂದು ಬೆದರಿಸಲು ಕರೆ ಮಾಡುವುದಿಲ್ಲ. ಯಾವಾಗಲೂ 1930 ಗೆ ಕರೆ ಮಾಡಿ.',
    difficulty: 'EASY',
  },
  {
    id: 'q2',
    question: 'What is the "Golden Hour" in cyber fraud?',
    questionKn: 'ಸೈಬರ್ ವಂಚನೆಯಲ್ಲಿ "ಗೋಲ್ಡನ್ ಅವರ್" ಎಂದರೇನು?',
    options: [
      { text: 'The first hour after fraud — critical window to freeze funds', textKn: 'ವಂಚನೆ ನಂತರದ ಮೊದಲ ಗಂಟೆ — ಹಣ ಫ್ರೀಜ್ ಮಾಡಲು ನಿರ್ಣಾಯಕ ಸಮಯ', isCorrect: true },
      { text: 'The best time to invest in cryptocurrency', textKn: 'ಕ್ರಿಪ್ಟೋಕರೆನ್ಸಿಯಲ್ಲಿ ಹೂಡಿಕೆ ಮಾಡಲು ಉತ್ತಮ ಸಮಯ', isCorrect: false },
      { text: 'The time when banks are open for complaints', textKn: 'ದೂರುಗಳಿಗೆ ಬ್ಯಾಂಕ್‌ಗಳು ತೆರೆದಿರುವ ಸಮಯ', isCorrect: false },
      { text: 'A special police operation timing', textKn: 'ವಿಶೇಷ ಪೊಲೀಸ್ ಕಾರ್ಯಾಚರಣೆ ಸಮಯ', isCorrect: false },
    ],
    explanation: 'The Golden Hour refers to the first 60 minutes after a cyber fraud. Reporting to 1930 and your bank immediately can help freeze the scammer\'s account before funds are withdrawn.',
    explanationKn: 'ಗೋಲ್ಡನ್ ಅವರ್ ಎಂದರೆ ಸೈಬರ್ ವಂಚನೆ ನಂತರದ ಮೊದಲ 60 ನಿಮಿಷಗಳು. 1930 ಮತ್ತು ಬ್ಯಾಂಕ್‌ಗೆ ತಕ್ಷಣ ವರದಿ ಮಾಡಿ.',
    difficulty: 'EASY',
  },
  {
    id: 'q3',
    question: 'Which URL is most likely a phishing attempt?',
    questionKn: 'ಯಾವ URL ಫಿಶಿಂಗ್ ಪ್ರಯತ್ನವಾಗಿರಬಹುದು?',
    options: [
      { text: 'https://www.onlinesbi.sbi/', textKn: 'https://www.onlinesbi.sbi/', isCorrect: false },
      { text: 'http://sbi-yono-update.top/verify', textKn: 'http://sbi-yono-update.top/verify', isCorrect: true },
      { text: 'https://yonosbi.sbi/', textKn: 'https://yonosbi.sbi/', isCorrect: false },
      { text: 'https://sbi.co.in/', textKn: 'https://sbi.co.in/', isCorrect: false },
    ],
    explanation: 'The URL "sbi-yono-update.top" uses a suspicious .top TLD, HTTP instead of HTTPS, and mimics SBI\'s branding. Always verify the domain is an official .sbi or .co.in address.',
    explanationKn: '"sbi-yono-update.top" ಅನುಮಾನಾಸ್ಪದ .top TLD, HTTPS ಬದಲಿಗೆ HTTP ಬಳಸುತ್ತದೆ. ಯಾವಾಗಲೂ ಅಧಿಕೃತ .sbi ಅಥವಾ .co.in ಡೊಮೇನ್ ಪರಿಶೀಲಿಸಿ.',
    difficulty: 'MEDIUM',
  },
  {
    id: 'q4',
    question: 'An app asks for SMS, Camera, Contacts, and Accessibility permissions. What does this indicate?',
    questionKn: 'ಒಂದು ಆ್ಯಪ್ SMS, ಕ್ಯಾಮೆರಾ, ಸಂಪರ್ಕಗಳು ಮತ್ತು ಅಕ್ಸೆಸಿಬಿಲಿಟಿ ಅನುಮತಿಗಳನ್ನು ಕೇಳುತ್ತದೆ. ಇದು ಏನನ್ನು ಸೂಚಿಸುತ್ತದೆ?',
    options: [
      { text: 'Completely normal for any app', textKn: 'ಯಾವುದೇ ಆ್ಯಪ್‌ಗೆ ಸಂಪೂರ್ಣ ಸಾಮಾನ್ಯ', isCorrect: false },
      { text: 'Likely a loan/spy app that can steal data', textKn: 'ಡೇಟಾ ಕದಿಯಬಹುದಾದ ಸಾಲ/ಸ್ಪೈ ಆ್ಯಪ್ ಆಗಿರಬಹುದು', isCorrect: true },
      { text: 'Required for Google Play verification', textKn: 'Google Play ಪರಿಶೀಲನೆಗೆ ಅಗತ್ಯ', isCorrect: false },
      { text: 'Needed for app updates', textKn: 'ಆ್ಯಪ್ ಅಪ್‌ಡೇಟ್‌ಗಳಿಗೆ ಅಗತ್ಯ', isCorrect: false },
    ],
    explanation: 'Excessive permissions (especially Accessibility + SMS + Contacts) are red flags for predatory loan apps or spyware. They can read your OTPs, steal contacts, and take screenshots.',
    explanationKn: 'ಅತಿಯಾದ ಅನುಮತಿಗಳು (ವಿಶೇಷವಾಗಿ ಅಕ್ಸೆಸಿಬಿಲಿಟಿ + SMS + ಸಂಪರ್ಕಗಳು) ಹಿಂಸಾತ್ಮಕ ಸಾಲ ಆ್ಯಪ್‌ಗಳ ಕೆಂಪು ಧ್ವಜಗಳು.',
    difficulty: 'MEDIUM',
  },
  {
    id: 'q5',
    question: 'You get an SMS: "Your UPI has received ₹10,000. Click to accept." What should you do?',
    questionKn: 'ನಿಮಗೆ SMS ಬರುತ್ತದೆ: "ನಿಮ್ಮ UPI ₹10,000 ಸ್ವೀಕರಿಸಿದೆ. ಒಪ್ಪಿಕೊಳ್ಳಲು ಕ್ಲಿಕ್ ಮಾಡಿ." ನೀವು ಏನು ಮಾಡಬೇಕು?',
    options: [
      { text: 'Click to accept the money', textKn: 'ಹಣ ಒಪ್ಪಿಕೊಳ್ಳಲು ಕ್ಲಿಕ್ ಮಾಡಿ', isCorrect: false },
      { text: 'Ignore — UPI credits never need "acceptance"', textKn: 'ನಿರ್ಲಕ್ಷಿಸಿ — UPI ಕ್ರೆಡಿಟ್‌ಗಳಿಗೆ "ಒಪ್ಪಿಗೆ" ಅಗತ್ಯವಿಲ್ಲ', isCorrect: true },
      { text: 'Forward to friends so they can accept too', textKn: 'ಸ್ನೇಹಿತರಿಗೆ ಫಾರ್ವರ್ಡ್ ಮಾಡಿ', isCorrect: false },
      { text: 'Call the number mentioned in SMS', textKn: 'SMS ನಲ್ಲಿ ಉಲ್ಲೇಖಿಸಿದ ಸಂಖ್ಯೆಗೆ ಕರೆ ಮಾಡಿ', isCorrect: false },
    ],
    explanation: 'UPI payments are automatically credited — there is no "accept" step. This is a UPI Reverse Payment scam where clicking the link actually sends money FROM your account.',
    explanationKn: 'UPI ಪಾವತಿಗಳು ಸ್ವಯಂಚಾಲಿತವಾಗಿ ಕ್ರೆಡಿಟ್ ಆಗುತ್ತವೆ — "ಒಪ್ಪಿಕೊಳ್ಳಿ" ಹಂತವಿಲ್ಲ. ಲಿಂಕ್ ಕ್ಲಿಕ್ ಮಾಡುವುದು ನಿಮ್ಮ ಖಾತೆಯಿಂದ ಹಣ ಕಳುಹಿಸುತ್ತದೆ.',
    difficulty: 'HARD',
  },
];

/* ═══════════════════════════════════════════════════════════
   MOCK HONEYPOT SCRIPT
   ═══════════════════════════════════════════════════════════ */

export const mockHoneypotScript: HoneypotMessage[] = [
  { id: 'h1', sender: 'SCAMMER', text: 'Hello sir, this is from SBI bank. Your KYC has expired. Please update immediately or account will be blocked.', timestamp: '14:23:01' },
  { id: 'h2', sender: 'AGENT', text: 'Oh no! My KYC expired? What should I do sir? I have my salary coming next week, please don\'t block!', timestamp: '14:23:15' },
  { id: 'h3', sender: 'SCAMMER', text: 'Don\'t worry sir. Just click this link and enter your details: sbi-yono-verify.top/kyc', timestamp: '14:23:32', extracted: { type: 'URL', value: 'sbi-yono-verify.top/kyc' } },
  { id: 'h4', sender: 'AGENT', text: 'Okay sir I am opening. But it is asking for my ATM card number. Is that safe?', timestamp: '14:23:55' },
  { id: 'h5', sender: 'SCAMMER', text: 'Yes sir fully safe. This is official SBI process. Enter card number, expiry, CVV, and OTP. I will guide you. My supervisor ID is SBI/KYC/2026.', timestamp: '14:24:18' },
  { id: 'h6', sender: 'AGENT', text: 'Okay sir typing now... Can you also give me your phone number in case call drops? I want to make sure I can reach you.', timestamp: '14:24:45' },
  { id: 'h7', sender: 'SCAMMER', text: 'Yes sure. Call me on 98456-XXXXX or send on WhatsApp. You can also pay pending KYC fee of ₹299 to this UPI: scammer@ybl', timestamp: '14:25:02', extracted: { type: 'PHONE', value: '+91-98456-XXXXX' } },
  { id: 'h8', sender: 'AGENT', text: 'Got it sir! One moment, transferring now...', timestamp: '14:25:20' },
  { id: 'h9', sender: 'SCAMMER', text: 'Good. Also share the OTP you received. It is for verification only.', timestamp: '14:25:38' },
  { id: 'h10', sender: 'AGENT', text: '🛡️ TRAP COMPLETE — All IOCs extracted. Phone: +91-98456-XXXXX, UPI: scammer@ybl, URL: sbi-yono-verify.top/kyc. Forwarding to CEN.', timestamp: '14:25:55', extracted: { type: 'UPI', value: 'scammer@ybl' } },
];

/* ═══════════════════════════════════════════════════════════
   MOCK TELEMETRY
   ═══════════════════════════════════════════════════════════ */

export const mockTelemetry: TelemetryStats = {
  threatsBlocked: 12847,
  scamsIntercepted: 3291,
  citizensProtected: 48523,
  muleTrapTriggers: 891,
  phishingUrlsDetected: 7634,
  deepfakeCallsDetected: 456,
};

/* ═══════════════════════════════════════════════════════════
   ANALYSIS SIMULATORS
   ═══════════════════════════════════════════════════════════ */

const SCAM_KEYWORDS: Record<string, { archetype: ScamArchetype; weight: number }> = {
  'bescom': { archetype: 'BESCOM_POWER_CUT', weight: 30 },
  'power cut': { archetype: 'BESCOM_POWER_CUT', weight: 25 },
  'electricity': { archetype: 'BESCOM_POWER_CUT', weight: 15 },
  'yono': { archetype: 'SBI_YONO_KYC', weight: 30 },
  'kyc': { archetype: 'SBI_YONO_KYC', weight: 20 },
  'sbi': { archetype: 'SBI_YONO_KYC', weight: 15 },
  'youtube': { archetype: 'YOUTUBE_JOB', weight: 25 },
  'like video': { archetype: 'YOUTUBE_JOB', weight: 30 },
  'part time': { archetype: 'YOUTUBE_JOB', weight: 15 },
  'fedex': { archetype: 'FEDEX_DIGITAL_ARREST', weight: 30 },
  'digital arrest': { archetype: 'FEDEX_DIGITAL_ARREST', weight: 35 },
  'parcel': { archetype: 'FEDEX_DIGITAL_ARREST', weight: 15 },
  'cbi': { archetype: 'FEDEX_DIGITAL_ARREST', weight: 20 },
  'loan app': { archetype: 'LOAN_APP_BLACKMAIL', weight: 30 },
  'blackmail': { archetype: 'LOAN_APP_BLACKMAIL', weight: 25 },
  'morphed photo': { archetype: 'LOAN_APP_BLACKMAIL', weight: 30 },
  'upi': { archetype: 'UPI_REVERSE_PAYMENT', weight: 15 },
  'reverse payment': { archetype: 'UPI_REVERSE_PAYMENT', weight: 30 },
  'accept money': { archetype: 'UPI_REVERSE_PAYMENT', weight: 25 },
  'customs': { archetype: 'CUSTOMS_IMPERSONATION', weight: 30 },
  'aadhaar': { archetype: 'AADHAAR_LINK_FRAUD', weight: 20 },
  'otp': { archetype: 'OTP_THEFT', weight: 20 },
  'share otp': { archetype: 'OTP_THEFT', weight: 35 },
  'invest': { archetype: 'INVESTMENT_PONZI', weight: 20 },
  'guaranteed return': { archetype: 'INVESTMENT_PONZI', weight: 30 },
  'daily profit': { archetype: 'INVESTMENT_PONZI', weight: 25 },
};

const COERCION_PATTERNS: Record<string, CoercionTrigger> = {
  'urgent': 'ARTIFICIAL_URGENCY',
  'immediately': 'ARTIFICIAL_URGENCY',
  'last warning': 'ARTIFICIAL_URGENCY',
  'expire': 'ARTIFICIAL_URGENCY',
  '2 hours': 'ARTIFICIAL_URGENCY',
  'disconnect': 'PANIC',
  'block': 'PANIC',
  'arrest': 'PANIC',
  'fir': 'PANIC',
  'police': 'AUTHORITY_IMPERSONATION',
  'officer': 'AUTHORITY_IMPERSONATION',
  'inspector': 'AUTHORITY_IMPERSONATION',
  'cbi': 'AUTHORITY_IMPERSONATION',
  'rbi': 'AUTHORITY_IMPERSONATION',
  'exclusive': 'FALSE_EXCLUSIVITY',
  'selected': 'FALSE_EXCLUSIVITY',
  'lucky': 'FALSE_EXCLUSIVITY',
  'earn': 'GREED',
  'profit': 'GREED',
  'return': 'GREED',
  'lakh': 'GREED',
  'photo': 'SHAME_THREAT',
  'video leak': 'SHAME_THREAT',
  'contacts': 'SHAME_THREAT',
};

export async function simulatePhishingAnalysis(text: string): Promise<PhishingAnalysis> {
  await delay(rand(1200, 2000));

  const lower = text.toLowerCase();
  let score = 0;
  let bestArchetype: ScamArchetype = 'UNKNOWN';
  let bestWeight = 0;

  for (const [keyword, { archetype, weight }] of Object.entries(SCAM_KEYWORDS)) {
    if (lower.includes(keyword)) {
      score += weight;
      if (weight > bestWeight) {
        bestWeight = weight;
        bestArchetype = archetype;
      }
    }
  }

  const triggers = new Set<CoercionTrigger>();
  for (const [pattern, trigger] of Object.entries(COERCION_PATTERNS)) {
    if (lower.includes(pattern)) triggers.add(trigger);
  }

  score = Math.min(score, 100);
  const urls = text.match(/https?:\/\/[^\s]+|[a-z0-9-]+\.(top|xyz|click|link|info|online)\/[^\s]*/gi) || [];
  const phones = text.match(/(\+91[-\s]?)?[6-9]\d{4}[-\s]?\d{5}/g) || [];
  const upiIds = text.match(/[a-zA-Z0-9._-]+@(ybl|upi|paytm|okicici|oksbi|apl|ibl)/gi) || [];

  if (urls.length > 0) score = Math.min(score + 15, 100);
  if (phones.length > 0) score = Math.min(score + 5, 100);
  if (upiIds.length > 0) score = Math.min(score + 10, 100);

  let threatLevel: ThreatLevel;
  if (score >= 75) threatLevel = 'CRITICAL';
  else if (score >= 55) threatLevel = 'HIGH';
  else if (score >= 35) threatLevel = 'MEDIUM';
  else if (score >= 15) threatLevel = 'LOW';
  else threatLevel = 'SAFE';

  const archetypeDescriptions: Record<ScamArchetype, { en: string; kn: string }> = {
    BESCOM_POWER_CUT: { en: 'This message impersonates BESCOM and threatens power disconnection to create panic. BESCOM never sends payment links via SMS.', kn: 'ಈ ಸಂದೇಶವು ಬೆಸ್ಕಾಂ ಅನ್ನು ಅನುಕರಿಸಿ ವಿದ್ಯುತ್ ಕಡಿತದ ಬೆದರಿಕೆ ಹಾಕುತ್ತದೆ. ಬೆಸ್ಕಾಂ ಎಂದಿಗೂ SMS ಮೂಲಕ ಪಾವತಿ ಲಿಂಕ್ ಕಳುಹಿಸುವುದಿಲ್ಲ.' },
    SBI_YONO_KYC: { en: 'This is a fake SBI YONO KYC update scam. SBI never sends KYC links via SMS. Always use the official SBI YONO app.', kn: 'ಇದು ನಕಲಿ SBI YONO KYC ಅಪ್‌ಡೇಟ್ ವಂಚನೆ. SBI ಎಂದಿಗೂ SMS ಮೂಲಕ KYC ಲಿಂಕ್ ಕಳುಹಿಸುವುದಿಲ್ಲ.' },
    YOUTUBE_JOB: { en: 'This is a task-based job scam. They pay small amounts initially to build trust, then demand large deposits. No legitimate company pays for liking videos.', kn: 'ಇದು ಕಾರ್ಯ ಆಧಾರಿತ ಉದ್ಯೋಗ ವಂಚನೆ. ನಂಬಿಕೆ ಬೆಳೆಸಲು ಸಣ್ಣ ಮೊತ್ತ ಪಾವತಿಸಿ ನಂತರ ದೊಡ್ಡ ಠೇವಣಿ ಕೇಳುತ್ತಾರೆ.' },
    FEDEX_DIGITAL_ARREST: { en: 'This is a Digital Arrest scam. No law enforcement agency conducts arrests via phone/video call. CBI/Police will never ask for money transfers.', kn: 'ಇದು ಡಿಜಿಟಲ್ ಅರೆಸ್ಟ್ ವಂಚನೆ. ಯಾವ ಕಾನೂನು ಜಾರಿ ಸಂಸ್ಥೆಯೂ ಫೋನ್/ವೀಡಿಯೋ ಕರೆ ಮೂಲಕ ಬಂಧಿಸುವುದಿಲ್ಲ.' },
    LOAN_APP_BLACKMAIL: { en: 'This is a predatory loan app scam. They access your contacts and photos to blackmail you. Uninstall the app and report to police.', kn: 'ಇದು ಹಿಂಸಾತ್ಮಕ ಸಾಲ ಆ್ಯಪ್ ವಂಚನೆ. ಅವರು ನಿಮ್ಮ ಸಂಪರ್ಕಗಳು ಮತ್ತು ಫೋಟೋಗಳನ್ನು ಬ್ಲ್ಯಾಕ್‌ಮೇಲ್‌ಗೆ ಬಳಸುತ್ತಾರೆ.' },
    UPI_REVERSE_PAYMENT: { en: 'This is a UPI reverse payment scam. UPI credits are automatic — there is no "accept" button. The link sends money FROM your account.', kn: 'ಇದು UPI ರಿವರ್ಸ್ ಪೇಮೆಂಟ್ ವಂಚನೆ. UPI ಕ್ರೆಡಿಟ್‌ಗಳು ಸ್ವಯಂಚಾಲಿತ — "ಒಪ್ಪಿಕೊಳ್ಳಿ" ಬಟನ್ ಇಲ್ಲ.' },
    CUSTOMS_IMPERSONATION: { en: 'This is a customs impersonation scam. Indian Customs never calls to threaten arrest or demand immediate payment.', kn: 'ಇದು ಕಸ್ಟಮ್ಸ್ ಅನುಕರಣೆ ವಂಚನೆ. ಭಾರತೀಯ ಕಸ್ಟಮ್ಸ್ ಎಂದಿಗೂ ಬಂಧನ ಬೆದರಿಕೆ ಹಾಕಲು ಕರೆ ಮಾಡುವುದಿಲ್ಲ.' },
    AADHAAR_LINK_FRAUD: { en: 'This is an Aadhaar linking fraud. UIDAI never asks for Aadhaar details over phone or SMS.', kn: 'ಇದು ಆಧಾರ್ ಲಿಂಕಿಂಗ್ ವಂಚನೆ. UIDAI ಎಂದಿಗೂ ಫೋನ್ ಅಥವಾ SMS ಮೂಲಕ ಆಧಾರ್ ವಿವರಗಳನ್ನು ಕೇಳುವುದಿಲ್ಲ.' },
    OTP_THEFT: { en: 'This is an OTP theft attempt. Never share OTP with anyone. Banks and companies never ask for OTP over phone.', kn: 'ಇದು OTP ಕಳ್ಳತನ ಪ್ರಯತ್ನ. ಯಾರಿಗೂ OTP ಹಂಚಿಕೊಳ್ಳಬೇಡಿ.' },
    INVESTMENT_PONZI: { en: 'This is a Ponzi/investment scam. No legitimate investment guarantees fixed daily returns. You will lose all invested money.', kn: 'ಇದು ಪೋಂಜಿ/ಹೂಡಿಕೆ ವಂಚನೆ. ಯಾವ ಕಾನೂನುಬದ್ಧ ಹೂಡಿಕೆಯೂ ಸ್ಥಿರ ದೈನಂದಿನ ಆದಾಯವನ್ನು ಖಾತ್ರಿಪಡಿಸುವುದಿಲ್ಲ.' },
    UNKNOWN: { en: 'This message contains some suspicious patterns but does not match a known scam archetype. Exercise caution.', kn: 'ಈ ಸಂದೇಶವು ಕೆಲವು ಅನುಮಾನಾಸ್ಪದ ಮಾದರಿಗಳನ್ನು ಹೊಂದಿದೆ. ಜಾಗರೂಕರಾಗಿರಿ.' },
  };

  const desc = archetypeDescriptions[bestArchetype];

  return {
    inputText: text,
    language: /[\u0C80-\u0CFF]/.test(text) ? 'kn' : 'en',
    threatLevel,
    overallScore: score,
    scamArchetype: bestArchetype,
    coercionTriggers: Array.from(triggers),
    suspiciousEntities: { urls, phones, upiIds },
    explanation: desc.en,
    explanationKn: desc.kn,
  };
}

export async function simulateUrlAnalysis(url: string): Promise<UrlAnalysis> {
  await delay(rand(800, 1500));

  const domainMatch = url.match(/(?:https?:\/\/)?([^/\s]+)/);
  const domain = domainMatch ? domainMatch[1] : url;
  const tldMatch = domain.match(/\.([a-z]+)$/);
  const tld = tldMatch ? tldMatch[1] : 'unknown';

  const suspiciousTlds = ['top', 'xyz', 'click', 'link', 'info', 'online', 'buzz', 'loan', 'work'];
  const isHttps = url.startsWith('https');
  const isPunycode = domain.includes('xn--');

  let riskScore = 10;
  const flags: string[] = [];

  if (suspiciousTlds.includes(tld)) { riskScore += 30; flags.push(`Suspicious TLD: .${tld}`); }
  if (!isHttps) { riskScore += 15; flags.push('No HTTPS encryption'); }
  if (isPunycode) { riskScore += 25; flags.push('Punycode domain (homograph attack)'); }
  if (/sbi|hdfc|icici|axis|paytm|phonepe|gpay/i.test(domain) && !domain.endsWith('.sbi') && !domain.endsWith('.co.in')) {
    riskScore += 25; flags.push('Brand impersonation detected');
  }
  if (/verify|update|secure|login|kyc/i.test(url)) { riskScore += 10; flags.push('Contains urgency keywords in URL'); }
  if (domain.split('.').length > 3) { riskScore += 10; flags.push('Excessive subdomains'); }

  riskScore = Math.min(riskScore, 100);

  let threatLevel: ThreatLevel;
  if (riskScore >= 75) threatLevel = 'CRITICAL';
  else if (riskScore >= 55) threatLevel = 'HIGH';
  else if (riskScore >= 35) threatLevel = 'MEDIUM';
  else if (riskScore >= 15) threatLevel = 'LOW';
  else threatLevel = 'SAFE';

  const ages = ['2 days', '1 week', '3 weeks', '2 months', '6 months', '2 years', '5+ years'];
  const registrationAge = riskScore > 50 ? pick(ages.slice(0, 3)) : pick(ages.slice(3));

  return { url, domain, tld, isPunycode, isHttps, registrationAge, threatLevel, riskScore, flags };
}

export async function simulateVoiceForensics(): Promise<VoiceForensicResult> {
  await delay(rand(1800, 2500));

  const isDeepfake = Math.random() > 0.35;
  const confidence = isDeepfake ? rand(72, 98) : rand(65, 95);
  const spectralJitter = isDeepfake ? +(Math.random() * 0.15 + 0.08).toFixed(4) : +(Math.random() * 0.05 + 0.01).toFixed(4);
  const respirationDetected = !isDeepfake || Math.random() > 0.7;
  const vocoderArtifacts = isDeepfake && Math.random() > 0.3;
  const biologicalScore = isDeepfake ? rand(12, 45) : rand(68, 95);

  const flags: string[] = [];
  if (isDeepfake) {
    if (vocoderArtifacts) flags.push('Vocoder artifacts in 2-4kHz band');
    if (!respirationDetected) flags.push('No biological breathing pattern');
    if (spectralJitter > 0.1) flags.push('Abnormal spectral jitter');
    flags.push('Synthetic pitch transitions detected');
    if (biologicalScore < 30) flags.push('Low biological authenticity score');
  } else {
    if (respirationDetected) flags.push('Natural breathing pattern confirmed');
    flags.push('Consistent harmonic structure');
    flags.push('Biological voice characteristics present');
  }

  return { isDeepfake, confidence, spectralJitter, respirationDetected, vocoderArtifacts, biologicalScore, flags };
}

export async function simulateApkAnalysis(fileName: string): Promise<ApkAnalysis> {
  await delay(rand(2000, 3000));

  const maliciousApps = [
    {
      packageName: 'com.quickloan.instant',
      appName: 'QuickLoan Pro',
      dangerousPermissions: ['READ_SMS', 'READ_CONTACTS', 'CAMERA', 'READ_CALL_LOG', 'ACCESSIBILITY_SERVICE', 'WRITE_EXTERNAL_STORAGE', 'READ_PHONE_STATE'],
      c2Servers: [
        { ip: '103.25.41.XX', port: 8443, country: 'Myanmar', hosting: 'ShweHost' },
        { ip: '45.77.XX.XX', port: 443, country: 'Singapore', hosting: 'Vultr' },
      ],
      exfiltrationNumbers: ['+86-138-XXXX-XXXX', '+91-98XXX-XXXXX'],
      riskScore: 94,
      removalSteps: [
        'Go to Settings → Apps → QuickLoan Pro',
        'Tap "Force Stop" to prevent further data theft',
        'Revoke all permissions in App Permissions',
        'Uninstall the application',
        'Change all passwords for banking apps',
        'Report to cybercrime.gov.in with screenshots',
      ],
    },
    {
      packageName: 'com.track.myphone.secure',
      appName: 'SecureTracker',
      dangerousPermissions: ['ACCESS_FINE_LOCATION', 'RECORD_AUDIO', 'CAMERA', 'READ_SMS', 'PROCESS_OUTGOING_CALLS', 'BOOT_COMPLETED'],
      c2Servers: [
        { ip: '185.234.XX.XX', port: 9090, country: 'Russia', hosting: 'ProtonVPS' },
      ],
      exfiltrationNumbers: ['+91-70XXX-XXXXX'],
      riskScore: 88,
      removalSteps: [
        'Boot phone in Safe Mode',
        'Go to Settings → Apps → SecureTracker',
        'Remove Device Admin privileges if enabled',
        'Uninstall the application',
        'Factory reset recommended for complete removal',
        'File FIR at nearest CEN station',
      ],
    },
  ];

  const app = pick(maliciousApps);

  return {
    packageName: app.packageName,
    appName: fileName.replace('.apk', '') || app.appName,
    threatLevel: app.riskScore >= 80 ? 'CRITICAL' : 'HIGH',
    dangerousPermissions: app.dangerousPermissions,
    c2Servers: app.c2Servers,
    exfiltrationNumbers: app.exfiltrationNumbers,
    riskScore: app.riskScore,
    removalSteps: app.removalSteps,
  };
}
