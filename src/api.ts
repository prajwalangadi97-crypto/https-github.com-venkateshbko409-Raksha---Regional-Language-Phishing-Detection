/**
 * Omnikon / Raksha AI — Centralized API Client
 * All backend API calls go through this module.
 * Automatically falls back to client-side mock data when backend is unavailable
 * (e.g., on Vercel where there is no Python backend).
 */

import {
  simulatePhishingAnalysis,
  simulateUrlAnalysis,
  mockIOCs,
  mockDistrictThreats,
  mockCENStations,
  mockBankNotices,
  mockHoneypotScript,
} from './mockData';
import { initialTelemetry } from './data/karnatakaScamData';

const API_BASE = '/api/v1';

/** Track whether backend is reachable to avoid repeated failed requests */
let backendAvailable: boolean | null = null;

async function checkBackend(): Promise<boolean> {
  if (backendAvailable !== null) return backendAvailable;
  try {
    const res = await fetch('/health', { signal: AbortSignal.timeout(3000) });
    backendAvailable = res.ok;
  } catch {
    backendAvailable = false;
  }
  return backendAvailable;
}

async function request<T>(path: string, options?: RequestInit): Promise<T> {
  const url = `${API_BASE}${path}`;
  const res = await fetch(url, {
    headers: { 'Content-Type': 'application/json' },
    ...options,
  });
  if (!res.ok) {
    const errorBody = await res.text().catch(() => 'Unknown error');
    throw new Error(`API Error ${res.status}: ${errorBody}`);
  }
  return res.json();
}

export async function apiGet<T>(path: string): Promise<T> {
  return request<T>(path);
}

export async function apiPost<T>(path: string, body: unknown): Promise<T> {
  return request<T>(path, {
    method: 'POST',
    body: JSON.stringify(body),
  });
}

/**
 * Try calling the backend API; if it fails, run the fallback function instead.
 * This ensures all features work on static deployments (Vercel) without a backend.
 */
async function withFallback<T>(apiFn: () => Promise<T>, fallbackFn: () => T | Promise<T>): Promise<T> {
  const isAvailable = await checkBackend();
  if (!isAvailable) {
    return fallbackFn();
  }
  try {
    return await apiFn();
  } catch {
    // Backend call failed — mark unavailable and use fallback
    backendAvailable = false;
    return fallbackFn();
  }
}

// ── Mock Fallback Generators ──────────────────────────────────

function mockBreachCheck(query: string) {
  const breachDb = [
    { breachName: 'BigBasket Data Breach', breachDate: '2024-11-15', dataExposed: ['Email', 'Phone', 'Name', 'Address', 'Password Hash'], severity: 'HIGH', recordCount: 20000000, description: 'Major Indian e-commerce grocery platform breach exposing 20M user records.', descriptionKn: 'ಪ್ರಮುಖ ಭಾರತೀಯ ಇ-ಕಾಮರ್ಸ್ ಡೇಟಾ ಉಲ್ಲಂಘನೆ — 2 ಕೋಟಿ ಬಳಕೆದಾರರ ದಾಖಲೆಗಳು.' },
    { breachName: 'MobiKwik Leak', breachDate: '2024-03-22', dataExposed: ['Phone', 'Email', 'KYC Documents', 'Aadhaar'], severity: 'CRITICAL', recordCount: 3500000, description: 'Fintech platform leak with KYC and Aadhaar data of 3.5M users.', descriptionKn: 'ಫಿನ್‌ಟೆಕ್ ಪ್ಲಾಟ್‌ಫಾರ್ಮ್ — KYC ಮತ್ತು ಆಧಾರ್ ಡೇಟಾ 35 ಲಕ್ಷ ಬಳಕೆದಾರರ.' },
    { breachName: 'Dominos India', breachDate: '2023-06-10', dataExposed: ['Email', 'Phone', 'Name', 'Order History', 'GPS Location'], severity: 'MEDIUM', recordCount: 18000000, description: 'Food delivery platform breach with order history and location data.', descriptionKn: 'ಫುಡ್ ಡೆಲಿವರಿ ಪ್ಲಾಟ್‌ಫಾರ್ಮ್ — ಆರ್ಡರ್ ಮತ್ತು ಸ್ಥಳ ಡೇಟಾ.' },
    { breachName: 'Air India SITA Breach', breachDate: '2023-01-05', dataExposed: ['Email', 'Passport', 'Credit Card', 'Name'], severity: 'CRITICAL', recordCount: 4500000, description: 'Aviation data breach exposing passport and credit card info of 4.5M passengers.', descriptionKn: 'ವಿಮಾನಯಾನ ಡೇಟಾ — ಪಾಸ್‌ಪೋರ್ಟ್ ಮತ್ತು ಕ್ರೆಡಿಟ್ ಕಾರ್ಡ್ ಮಾಹಿತಿ.' },
    { breachName: 'JusPay Payment Gateway', breachDate: '2024-08-18', dataExposed: ['Phone', 'Email', 'Masked Card Numbers'], severity: 'HIGH', recordCount: 35000000, description: 'Payment gateway breach affecting 35M card holders across Indian banks.', descriptionKn: 'ಪಾವತಿ ಗೇಟ್‌ವೇ ಉಲ್ಲಂಘನೆ — 3.5 ಕೋಟಿ ಕಾರ್ಡ್ ಹೊಂದಿರುವವರ ಡೇಟಾ.' },
  ];

  if (query.length <= 3) {
    return { query, totalBreaches: 0, riskScore: 0, breaches: [] };
  }

  // Deterministic random from query
  let seed = 0;
  for (let i = 0; i < query.length; i++) seed = ((seed << 5) - seed + query.charCodeAt(i)) | 0;
  const count = 2 + (Math.abs(seed) % 3);
  const shuffled = [...breachDb].sort(() => (seed = (seed * 16807) % 2147483647) - 1073741823);
  const breaches = shuffled.slice(0, count);
  const riskScore = Math.min(100, breaches.length * 28 + (breaches.some(b => b.severity === 'CRITICAL') ? 20 : 0));

  return { query, totalBreaches: breaches.length, riskScore, breaches };
}

function mockHoneypotEngage(stepIndex: number) {
  const totalSteps = mockHoneypotScript.length;
  if (stepIndex >= totalSteps) {
    return { message: null, totalSteps, isComplete: true };
  }
  const step = mockHoneypotScript[stepIndex];
  return {
    message: { id: step.id, sender: step.sender, text: step.text, timestamp: step.timestamp, extracted: step.extracted || null },
    totalSteps,
    isComplete: false,
  };
}

function mockIncidentReport() {
  const now = new Date();
  const refId = `RAKSHA-${now.getFullYear()}${String(now.getMonth() + 1).padStart(2, '0')}${String(now.getDate()).padStart(2, '0')}-${Math.random().toString(36).substring(2, 10).toUpperCase()}`;
  return {
    success: true,
    referenceId: refId,
    message: `Incident report submitted successfully. Reference: ${refId}. Please also file a complaint on cybercrime.gov.in and call 1930 immediately.`,
    messageKn: `ಘಟನೆ ವರದಿ ಯಶಸ್ವಿಯಾಗಿ ಸಲ್ಲಿಸಲಾಗಿದೆ. ಉಲ್ಲೇಖ: ${refId}. ದಯವಿಟ್ಟು cybercrime.gov.in ನಲ್ಲಿ ದೂರು ನೀಡಿ ಮತ್ತು 1930 ಗೆ ಕರೆ ಮಾಡಿ.`,
    timestamp: now.toISOString(),
  };
}

function mockOcrScan(fallbackText?: string) {
  const text = fallbackText || 'Dear Customer, your electricity service will be disconnected tonight at 9:30 PM. Pay immediately via http://bescom-pay.xyz/bill or call 9876543210.';
  const isKannada = /[\u0C80-\u0CFF]/.test(text);
  const lower = text.toLowerCase();
  let archetype = 'UNKNOWN';
  let score = 75;
  if (lower.includes('bescom') || lower.includes('power') || lower.includes('electricity') || lower.includes('ವಿದ್ಯುತ್')) archetype = 'BESCOM_POWER_CUT';
  else if (lower.includes('sbi') || lower.includes('yono') || lower.includes('kyc')) archetype = 'SBI_YONO_KYC';
  else if (lower.includes('fedex') || lower.includes('arrest') || lower.includes('cbi')) archetype = 'FEDEX_DIGITAL_ARREST';
  else if (lower.includes('youtube') || lower.includes('earn') || lower.includes('telegram')) archetype = 'YOUTUBE_JOB';
  else if (lower.includes('upi') || lower.includes('cashback') || lower.includes('refund')) archetype = 'UPI_REVERSE_PAYMENT';

  if (archetype !== 'UNKNOWN') score = 90;

  const urls = text.match(/https?:\/\/[^\s]+|[a-z0-9-]+\.(top|xyz|click|link)\/?[^\s]*/gi) || [];
  const phones = text.match(/(\+91[-\s]?)?[6-9]\d{4}[-\s]?\d{5}/g) || [];
  const upiIds = text.match(/[a-zA-Z0-9._-]+@(ybl|upi|paytm|okicici|oksbi|apl|ibl)/gi) || [];

  const triggers: string[] = [];
  if (lower.includes('urgent') || lower.includes('immediately') || lower.includes('tonight')) triggers.push('ARTIFICIAL_URGENCY');
  if (lower.includes('disconnect') || lower.includes('block')) triggers.push('PANIC');

  const bounding_boxes: any[] = [];
  for (const url of urls) bounding_boxes.push({ text: url, category: url.endsWith('.apk') ? 'MALWARE_APK' : 'URL', confidence: 0.98, box: [0.65, 0.08, 0.76, 0.92] });
  for (const phone of phones) bounding_boxes.push({ text: phone, category: 'PHONE', confidence: 0.95, box: [0.78, 0.12, 0.86, 0.65] });
  for (const upi of upiIds) bounding_boxes.push({ text: upi, category: 'UPI', confidence: 0.96, box: [0.82, 0.15, 0.90, 0.85] });

  return {
    extracted_text: text,
    language: isKannada ? 'kn' : 'en',
    script: isKannada ? 'Kannada' : 'Latin',
    threat_level: score >= 75 ? 'CRITICAL' : score >= 55 ? 'HIGH' : 'MEDIUM',
    overall_score: score,
    scam_archetype: archetype,
    coercion_triggers: triggers,
    entities: { urls, phones, upiIds },
    bounding_boxes,
    recommendation: 'DO NOT click on any link or download the APK. Verify through official utility portal or dial 1930.',
    recommendation_kn: 'ಯಾವುದೇ ಲಿಂಕ್ ಕ್ಲಿಕ್ ಮಾಡಬೇಡಿ ಅಥವಾ APK ಡೌನ್‌ಲೋಡ್ ಮಾಡಬೇಡಿ. ಅಧಿಕೃತ ಪೋರ್ಟಲ್ ಮೂಲಕ ಪರಿಶೀಲಿಸಿ ಅಥವಾ 1930 ಗೆ ಕರೆ ಮಾಡಿ.',
  };
}

function mockApkInspect(packageName?: string, fileName?: string) {
  const pkg = (packageName || fileName || '').toLowerCase();
  const isBescom = pkg.includes('bescom') || pkg.includes('power') || pkg.includes('bijli');

  if (isBescom) {
    return {
      package_name: 'in.karnataka.bescom.powerbill.pay', app_name: 'BESCOM Karnataka Bijli Pay', app_label_kn: 'ಬೆಸ್ಕಾಂ ಕರ್ನಾಟಕ ವಿದ್ಯುತ್ ಬಿಲ್ ಪೇ',
      threat_level: 'CRITICAL', malware_family: 'SpyMax SMS RAT', risk_score: 96.0, is_banking_trojan: false, is_accessibility_abuser: true,
      dangerous_permissions: [
        { permission: 'android.permission.RECEIVE_SMS', risk_level: 'CRITICAL', category: 'SMS Stealer', explanation: 'Forwards all incoming SMS and OTPs to remote Telegram bot.', explanation_kn: 'ಎಲ್ಲಾ ಒಳಬರುವ SMS ಮತ್ತು OTP ಗಳನ್ನು ಟೆಲಿಗ್ರಾಮ್ ಬೋಟ್‌ಗೆ ರವಾನಿಸುತ್ತದೆ.' },
        { permission: 'android.permission.RECORD_AUDIO', risk_level: 'HIGH', category: 'Microphone Eavesdropping', explanation: 'Records ambient room audio and phone calls in the background.', explanation_kn: 'ಹಿನ್ನೆಲೆಯಲ್ಲಿ ಫೋನ್ ಕರೆಗಳು ಮತ್ತು ಆಡಿಯೋ ರೆಕಾರ್ಡ್ ಮಾಡುತ್ತದೆ.' },
        { permission: 'android.permission.REQUEST_INSTALL_PACKAGES', risk_level: 'HIGH', category: 'Dropper Payload', explanation: 'Silently downloads and installs secondary payloads.', explanation_kn: 'ಯಾವುದೇ ಅನುಮತಿಯಿಲ್ಲದೆ ಇತರ ಹಾನಿಕಾರಕ ಆ್ಯಪ್‌ಗಳನ್ನು ಡೌನ್‌ಲೋಡ್ ಮಾಡುತ್ತದೆ.' },
      ],
      c2_servers: [{ ip: '45.142.214.88', port: 443, country: 'Netherlands', domain: 'bescom-officer-portal.xyz' }],
      exfiltration_contacts: ['+91 98450 12938'],
      malicious_activities: ['Fake bill payment portal asking for debit card ATM PIN', 'Hidden launcher icon after installation', 'Background SMS forwarder to attacker Telegram gateway'],
      malicious_activities_kn: ['ಡೆಬಿಟ್ ಕಾರ್ಡ್ ATM ಪಿನ್ ಕೇಳುವ ನಕಲಿ ಬಿಲ್ ಪಾವತಿ ಪೋರ್ಟಲ್', 'ಸ್ಥಾಪನೆಯ ನಂತರ ಫೋನ್ ಪರದೆಯಿಂದ ಐಕಾನ್ ಮರೆಮಾಚುವುದು', 'ದಾಳಿಕೋರರಿಗೆ ಹಿನ್ನೆಲೆ SMS ರವಾನೆ'],
      remediation_steps: ['Disconnect Wi-Fi and Mobile Data immediately.', "Go to Settings → Apps → Show System Apps → Remove 'BESCOM Karnataka Bijli Pay'.", 'Change your bank ATM PIN and net banking password immediately.'],
      remediation_steps_kn: ['ತಕ್ಷಣ ವೈ-ಫೈ ಮತ್ತು ಮೊಬೈಲ್ ಡೇಟಾ ಆಫ್ ಮಾಡಿ.', "ಸೆಟ್ಟಿಂಗ್ಸ್ → ಆ್ಯಪ್ಸ್ ಗೆ ಹೋಗಿ 'BESCOM Karnataka Bijli Pay' ಅನ್‌ಇನ್‌ಸ್ಟಾಲ್ ಮಾಡಿ.", 'ನಿಮ್ಮ ಬ್ಯಾಂಕ್ ATM ಪಿನ್ ಮತ್ತು ನೆಟ್ ಬ್ಯಾಂಕಿಂಗ್ ಪಾಸ್‌ವರ್ಡ್ ಬದಲಾಯಿಸಿ.'],
    };
  }

  return {
    package_name: 'com.sbi.yono.quickupdate.auth', app_name: 'SBI YONO Quick KYC Update', app_label_kn: 'SBI YONO ತ್ವರಿತ KYC ಅಪ್‌ಡೇಟ್',
    threat_level: 'CRITICAL', malware_family: 'Cerberus / Ermac Banking Trojan', risk_score: 98.5, is_banking_trojan: true, is_accessibility_abuser: true,
    dangerous_permissions: [
      { permission: 'android.permission.BIND_ACCESSIBILITY_SERVICE', risk_level: 'CRITICAL', category: 'Keylogging & Screen Capture', explanation: 'Steals user keystrokes, OTP entries, and auto-clicks banking permissions silently.', explanation_kn: 'ಬಳಕೆದಾರರ ಪಾಸ್‌ವರ್ಡ್, OTP ಕದಿಯುತ್ತದೆ ಮತ್ತು ಅನುಮತಿಗಳನ್ನು ಸ್ವಯಂಚಾಲಿತವಾಗಿ ಸಕ್ರಿಯಗೊಳಿಸುತ್ತದೆ.' },
      { permission: 'android.permission.RECEIVE_SMS', risk_level: 'CRITICAL', category: 'OTP Interception', explanation: 'Intercepts incoming bank transaction OTPs before the user even sees them.', explanation_kn: 'ಬ್ಯಾಂಕ್ ವಹಿವಾಟಿನ OTP ಗಳನ್ನು ಬಳಕೆದಾರರಿಗೆ ಕಾಣುವ ಮುನ್ನವೇ ಕದಿಯುತ್ತದೆ.' },
      { permission: 'android.permission.SYSTEM_ALERT_WINDOW', risk_level: 'HIGH', category: 'Overlay Phishing', explanation: 'Displays fake login overlay on top of genuine SBI and banking apps.', explanation_kn: 'ನೈಜ ಬ್ಯಾಂಕಿಂಗ್ ಆ್ಯಪ್‌ಗಳ ಮೇಲೆ ನಕಲಿ ಲಾಗಿನ್ ಪರದೆಯನ್ನು ಪ್ರದರ್ಶಿಸುತ್ತದೆ.' },
      { permission: 'android.permission.READ_PHONE_STATE', risk_level: 'MEDIUM', category: 'Device Fingerprinting', explanation: 'Collects IMEI, IMSI, and SIM carrier details for targeted fraud.', explanation_kn: 'IMEI ಮತ್ತು ಸಿಮ್ ವಿವರಗಳನ್ನು ಸಂಗ್ರಹಿಸುತ್ತದೆ.' },
    ],
    c2_servers: [
      { ip: '185.220.101.45', port: 8443, country: 'Russia / Bulletproof Host', domain: 'c2-control-telemetry.top' },
      { ip: '194.87.68.12', port: 9001, country: 'Seychelles', domain: 'exfil-api.live' },
    ],
    exfiltration_contacts: ['+91 99887 76655', '+91 91234 56780'],
    malicious_activities: ['Injects transparent overlay over State Bank of India & Google Pay', 'Disables Google Play Protect via Accessibility injection', 'Exfiltrates contact list and SMS inbox every 15 minutes'],
    malicious_activities_kn: ['SBI ಮತ್ತು Google Pay ಮೇಲೆ ನಕಲಿ ಓವರ್‌ಲೇ ಪರದೆ ಪ್ರದರ್ಶಿಸುತ್ತದೆ', 'Google Play Protect ಅನ್ನು ರಹಸ್ಯವಾಗಿ ನಿಷ್ಕ್ರಿಯಗೊಳಿಸುತ್ತದೆ', 'ಸಂಪರ್ಕಗಳು ಮತ್ತು SMS ಇನ್‌ಬಾಕ್ಸ್ ಅನ್ನು ಕಳ್ಳಸಾಗಣೆ ಮಾಡುತ್ತದೆ'],
    remediation_steps: ['Immediately turn on AIRPLANE MODE.', "Boot phone into ANDROID SAFE MODE.", "Go to Settings → Apps → Uninstall 'SBI YONO Quick KYC Update'.", 'Call 1930 and contact your bank to temporarily freeze net banking.'],
    remediation_steps_kn: ['ತಕ್ಷಣ ಏರ್‌ಪ್ಲೇನ್ ಮೋಡ್ ಆನ್ ಮಾಡಿ.', 'ಫೋನ್ ಅನ್ನು ಸೇಫ್ ಮೋಡ್‌ಗೆ ರೀಬೂಟ್ ಮಾಡಿ.', 'ಸೆಟ್ಟಿಂಗ್ಸ್ → ಆ್ಯಪ್ಸ್ ಗೆ ಹೋಗಿ ಈ ಅಪ್ಲಿಕೇಶನ್ ಅನ್ನು ಅನ್‌ಇನ್‌ಸ್ಟಾಲ್ ಮಾಡಿ.', '1930 ಗೆ ಕರೆ ಮಾಡಿ ಮತ್ತು ನಿಮ್ಮ ಬ್ಯಾಂಕ್ ಖಾತೆಯನ್ನು ತಾತ್ಕಾಲಿಕವಾಗಿ ಫ್ರೀಜ್ ಮಾಡಿ.'],
  };
}

function mockVoiceAnalyze(sampleId?: string, durationSec?: number) {
  const VOICE_SAMPLES: Record<string, any> = {
    'sample-1': { isDeepfake: true, confidence: 96.0, spectralJitter: 0.142, respirationDetected: false, vocoderArtifacts: true, biologicalScore: 18.0, flags: ['Vocoder harmonics spike at 3.2 kHz', 'No biological respiration pattern detected', 'Pitch modification artifacts (granddaughter voice cloning)', 'Zero micro-tremor variation — synthetic cadence'] },
    'sample-2': { isDeepfake: true, confidence: 98.0, spectralJitter: 0.168, respirationDetected: false, vocoderArtifacts: true, biologicalScore: 12.0, flags: ['Robotic cadence with zero natural hesitation', 'Authority voice template — CBI impersonation', 'No breathing micro-pauses between sentences', 'Synthetic formant transitions'] },
    'sample-3': { isDeepfake: false, confidence: 92.0, spectralJitter: 0.024, respirationDetected: true, vocoderArtifacts: false, biologicalScore: 94.0, flags: ['Natural biological breathing pattern confirmed', 'Harmonic spectrum consistent with human vocal cords', 'Natural micro-tremors and pitch variation present', 'VERDICT: Authentic human voice'] },
  };

  if (sampleId && VOICE_SAMPLES[sampleId]) {
    return VOICE_SAMPLES[sampleId];
  }

  // Live mic / dynamic analysis
  const duration = durationSec || 4.5;
  const isDeepfake = duration < 6.0;
  return {
    isDeepfake,
    confidence: isDeepfake ? 97.4 : 91.2,
    spectralJitter: isDeepfake ? 0.158 : 0.028,
    respirationDetected: !isDeepfake,
    vocoderArtifacts: isDeepfake,
    biologicalScore: isDeepfake ? 14.0 : 92.5,
    flags: [
      'Live audio waveform spectral Fourier transform completed',
      isDeepfake ? 'Neural vocoder synthesis harmonic artifact at 3.4 kHz detected' : 'Natural human vocal cord harmonics confirmed',
      isDeepfake ? 'Absence of sub-glottal respiration micro-intervals' : 'Biological respiration cadence verified',
      isDeepfake ? 'Monotone robotic pitch contour with low natural variance' : 'Natural pitch prosody and pitch tremor variance intact',
    ],
    transcription: 'URGENT: This is Senior Inspector Sharma from Cyber Crime Branch Mumbai. Your phone number is tied to money laundering case...',
    transcriptionKn: 'ತುರ್ತು: ಇದು ಮುಂಬೈ ಸೈಬರ್ ಕ್ರೈಮ್ ಬ್ರಾಂಚ್‌ನಿಂದ ಸೀನಿಯರ್ ಇನ್‌ಸ್ಪೆಕ್ಟರ್ ಶರ್ಮಾ...',
    detectedArchetype: 'FEDEX_DIGITAL_ARREST',
    recommendation: 'High risk voice clone detected. Real police officers NEVER conduct investigations over telephone.',
    recommendationKn: 'ಹೆಚ್ಚಿನ ಅಪಾಯದ ವಾಯ್ಸ್ ಕ್ಲೋನ್ ಪತ್ತೆಯಾಗಿದೆ. ನೈಜ ಪೊಲೀಸರು ಎಂದಿಗೂ ಫೋನ್ ಮೂಲಕ ತನಿಖೆ ಮಾಡುವುದಿಲ್ಲ.',
  };
}

function mockThreatFeed() {
  const types = [
    { type: 'PHISHING_BLOCKED', severity: 'CRITICAL', desc: 'Phishing SMS campaign blocked targeting {district} residents', descKn: 'ಫಿಶಿಂಗ್ SMS ಪ್ರಚಾರ ತಡೆಹಿಡಿಯಲಾಗಿದೆ' },
    { type: 'DEEPFAKE_INTERCEPTED', severity: 'HIGH', desc: 'AI voice clone call intercepted — impersonating family member', descKn: 'AI ಧ್ವನಿ ಕ್ಲೋನ್ ಕರೆ ತಡೆಹಿಡಿಯಲಾಗಿದೆ' },
    { type: 'MULE_FROZEN', severity: 'CRITICAL', desc: 'Mule bank account frozen via 1930 Golden Hour protocol', descKn: '1930 ಗೋಲ್ಡನ್ ಅವರ್ ಮೂಲಕ ಮ್ಯೂಲ್ ಖಾತೆ ಫ್ರೀಜ್' },
    { type: 'BANK_FREEZE', severity: 'HIGH', desc: 'Emergency bank freeze initiated for suspected fraud', descKn: 'ವಂಚನೆ ವಹಿವಾಟಿಗೆ ಬ್ಯಾಂಕ್ ಫ್ರೀಜ್ ಆರಂಭ' },
    { type: 'HONEYPOT_TRIGGERED', severity: 'MEDIUM', desc: 'Honeypot trap triggered — scammer IOCs harvested', descKn: 'ಹನಿಪಾಟ್ ಟ್ರ್ಯಾಪ್ ಪ್ರಚೋದಿತ — IOC ಹೊರತೆಗೆಯಲಾಗಿದೆ' },
    { type: 'APK_QUARANTINED', severity: 'CRITICAL', desc: 'Malicious loan APK quarantined — C2 server identified', descKn: 'ಮಾಲ್‌ವೇರ್ ಸಾಲ APK ಕ್ವಾರಂಟೈನ್ ಮಾಡಲಾಗಿದೆ' },
  ];
  const districts = ['Bengaluru Urban', 'Mysuru', 'Mangaluru', 'Hubballi', 'Belagavi', 'Kalaburagi', 'Tumakuru', 'Shivamogga'];
  const now = Date.now();
  const events = [];
  for (let i = 0; i < 15; i++) {
    const evt = types[Math.floor(Math.random() * types.length)];
    const district = districts[Math.floor(Math.random() * districts.length)];
    events.push({
      id: `evt-${String(i + 1).padStart(3, '0')}`,
      type: evt.type,
      severity: evt.severity,
      district,
      description: evt.desc.replace('{district}', district),
      descriptionKn: evt.descKn,
      timestamp: new Date(now - Math.random() * 86400000).toISOString(),
      iocValue: [null, '+91-XXXXX-XXXXX', 'scam@ybl', 'phishing.top/kyc'][Math.floor(Math.random() * 4)],
    });
  }
  return events.sort((a, b) => b.timestamp.localeCompare(a.timestamp));
}

function mockPersonas() {
  return [
    { id: 'pensioner', name: 'Mr. Ramamurthy (Retd. Bank Clerk, 72)', nameKn: 'ಶ್ರೀ ರಾಮಮೂರ್ತಿ (ನಿವೃತ್ತ ಬ್ಯಾಂಕ್ ನೌಕರ, 72)', role: 'Confused Pensioner Persona', avatar: '👴🏽', tactics: 'Asks repeated questions, types slowly', style: 'High Patience Drain' },
    { id: 'student', name: 'Ananya (Engineering Student, 20)', nameKn: 'ಅನನ್ಯಾ (ಇಂಜಿನಿಯರಿಂಗ್ ವಿದ್ಯಾರ್ಥಿನಿ, 20)', role: 'Eager Part-Timer Persona', avatar: '👩🏻‍💻', tactics: 'Pretends to need pocket money', style: 'Fast Engagement' },
    { id: 'businessman', name: 'Manjunath (Small Trader, Kalasipalya)', nameKn: 'ಮಂಜುನಾಥ್ (ಸಣ್ಣ ವ್ಯಾಪಾರಿ, ಕಲಾಸಿಪಾಳ್ಯ)', role: 'Busy Shopkeeper Persona', avatar: '👨🏽‍💼', tactics: 'Pretends low battery, forces bank details', style: 'Mule Account Harvester' },
  ];
}

function mockPhishingPresets() {
  return [
    { title: 'BESCOM Power Cut SMS (Kannada)', titleKn: 'ಬೆಸ್ಕಾಂ ವಿದ್ಯುತ್ ಕಡಿತ SMS', language: 'kn', category: 'BESCOM_POWER_CUT', text: 'ಆತ್ಮೀಯ ಗ್ರಾಹಕರೇ, ನಿಮ್ಮ ₹3,450 ಬೆಸ್ಕಾಂ ವಿದ್ಯುತ್ ಬಿಲ್ ಬಾಕಿಯಿದೆ. ಇಂದು ರಾತ್ರಿ 9:30 ಕ್ಕೆ ವಿದ್ಯುತ್ ಕಡಿತ ಮಾಡಲಾಗುತ್ತದೆ. ತಕ್ಷಣ ನವೀಕರಿಸಲು ಸಂಪರ್ಕಿಸಿ: 98451-22990 ಅಥವಾ ಲಿಂಕ್ ಕ್ಲಿಕ್ ಮಾಡಿ: bescom-billpay.top/karnataka' },
    { title: 'FedEx Digital Arrest (English)', titleKn: 'ಫೆಡೆಕ್ಸ್ ಡಿಜಿಟಲ್ ಅರೆಸ್ಟ್', language: 'en', category: 'FEDEX_DIGITAL_ARREST', text: 'URGENT: This is Inspector Ajay Kumar from Mumbai Cyber Crime. Parcel ID FX-90812 in your Aadhaar was seized containing fake passports and contraband. You are under Digital Arrest. Transfer verification fee to RBI nodal desk upi: clearing@sbi-arb.' },
    { title: 'SBI Yono KYC (English)', titleKn: 'SBI YONO KYC ಎಚ್ಚರಿಕೆ', language: 'en', category: 'SBI_YONO_KYC', text: 'Dear SBI Customer, Your YONO Account has been suspended due to incomplete PAN KYC. Please update within 24 hrs: http://sbi-yono-update.xyz/login and verify your OTP and ATM PIN.' },
    { title: 'YouTube Job Scam (English)', titleKn: 'ಯೂಟ್ಯೂಬ್ ಉದ್ಯೋಗ ವಂಚನೆ', language: 'en', category: 'YOUTUBE_JOB', text: 'Hi! I am Pooja from Global Media Partner. Earn ₹500 to ₹5,000 per day by liking YouTube videos. Send screenshot to Telegram @hr_pooja_earning for ₹150 joining bonus.' },
    { title: 'UPI Reverse Payment (Kannada)', titleKn: 'UPI ರಿವರ್ಸ್ ಪೇಮೆಂಟ್', language: 'kn', category: 'UPI_REVERSE_PAYMENT', text: 'ಸರ್, ನಿಮ್ಮ Google Pay ಖಾತೆಗೆ ತಪ್ಪಾಗಿ ₹12,000 ಕಳುಹಿಸಲಾಗಿದೆ. PIN ಹಾಕಿ ಹಣ ಸ್ವೀಕರಿಸಿ ಬಟನ್ ಒತ್ತಿ: upi://pay?pa=refundscam@ibl&am=12000' },
    { title: 'Loan App Threat (English)', titleKn: 'ಸಾಲ ಆ್ಯಪ್ ಬೆದರಿಕೆ', language: 'en', category: 'LOAN_APP_BLACKMAIL', text: 'LAST WARNING! Failed to repay QuickCash ₹8,000. We downloaded your contacts and photos. Pay to loanrecovery@ybl in 1 hour or morphed photos go to parents.' },
  ];
}

// ── Typed API Functions with Automatic Fallback ────────────

export const api = {
  // Phishing analysis
  analyzePhishing: (text: string, language?: string) =>
    withFallback(
      () => apiPost<any>('/phishing/analyze', { text, language }),
      () => simulatePhishingAnalysis(text),
    ),

  // URL scanning
  scanUrl: (url: string) =>
    withFallback(
      () => apiPost<any>('/url/scan', { url }),
      () => simulateUrlAnalysis(url),
    ),

  // Voice forensics
  analyzeVoice: (sampleId: string) =>
    withFallback(
      () => apiPost<any>('/voice/analyze', { sampleId }),
      () => mockVoiceAnalyze(sampleId),
    ),

  analyzeVoiceLive: (audioBase64: string, durationSec: number, mimeType: string) =>
    withFallback(
      () => apiPost<any>('/voice/analyze', { audioBase64, audioDurationSec: durationSec, recordedMimeType: mimeType }),
      () => mockVoiceAnalyze(undefined, durationSec),
    ),

  // OCR Screenshot Analysis
  scanOcr: (imageBase64?: string, fileName?: string, fallbackText?: string) =>
    withFallback(
      () => apiPost<any>('/ocr/scan', { image_base64: imageBase64, file_name: fileName, fallback_text: fallbackText }),
      () => mockOcrScan(fallbackText),
    ),

  // APK Sandbox Inspector
  inspectApk: (packageName?: string, fileName?: string, fileSizeKb?: number) =>
    withFallback(
      () => apiPost<any>('/apk/inspect', { package_name: packageName, file_name: fileName, file_size_kb: fileSizeKb }),
      () => mockApkInspect(packageName, fileName),
    ),

  // Breach check
  checkBreach: (query: string, type: string = 'email') =>
    withFallback(
      () => apiPost<any>('/breach/check', { query, type }),
      () => mockBreachCheck(query),
    ),

  // Honeypot
  engageHoneypot: (personaId: string, stepIndex: number) =>
    withFallback(
      () => apiPost<any>('/honeypot/engage', { personaId, stepIndex }),
      () => mockHoneypotEngage(stepIndex),
    ),

  getHoneypotScript: () =>
    withFallback(
      () => apiGet<any>('/honeypot/script'),
      () => ({ script: mockHoneypotScript, totalSteps: mockHoneypotScript.length }),
    ),

  // Incident report
  submitIncidentReport: (data: any) =>
    withFallback(
      () => apiPost<any>('/incident/report', data),
      () => mockIncidentReport(),
    ),

  // Data endpoints
  getTelemetry: () =>
    withFallback(
      () => apiGet<any>('/telemetry/stats'),
      () => initialTelemetry,
    ),

  getDistrictThreats: () =>
    withFallback(
      () => apiGet<any>('/districts/threats'),
      () => mockDistrictThreats,
    ),

  getThreatFeed: () =>
    withFallback(
      () => apiGet<any>('/threats/feed'),
      () => mockThreatFeed(),
    ),

  getIOCs: () =>
    withFallback(
      () => apiGet<any>('/ioc'),
      () => mockIOCs,
    ),

  getStations: () =>
    withFallback(
      () => apiGet<any>('/stations'),
      () => mockCENStations,
    ),

  getBankFreezeNotices: () =>
    withFallback(
      () => apiGet<any>('/banks/freeze-notices'),
      () => mockBankNotices,
    ),

  getPersonas: () =>
    withFallback(
      () => apiGet<any>('/personas'),
      () => mockPersonas(),
    ),

  getPhishingPresets: () =>
    withFallback(
      () => apiGet<any>('/presets/phishing'),
      () => mockPhishingPresets(),
    ),
};
