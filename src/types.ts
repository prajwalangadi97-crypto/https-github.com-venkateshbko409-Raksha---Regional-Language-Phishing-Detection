/* ─── Scam Archetype Enum ───────────────────────────────── */
export type ScamArchetype =
  | 'BESCOM_POWER_CUT'
  | 'SBI_YONO_KYC'
  | 'YOUTUBE_JOB'
  | 'FEDEX_DIGITAL_ARREST'
  | 'LOAN_APP_BLACKMAIL'
  | 'UPI_REVERSE_PAYMENT'
  | 'CUSTOMS_IMPERSONATION'
  | 'AADHAAR_LINK_FRAUD'
  | 'OTP_THEFT'
  | 'INVESTMENT_PONZI'
  | 'UNKNOWN';

/* ─── Threat Level ──────────────────────────────────────── */
export type ThreatLevel = 'CRITICAL' | 'HIGH' | 'MEDIUM' | 'LOW' | 'SAFE';

/* ─── Coercion Triggers ─────────────────────────────────── */
export type CoercionTrigger =
  | 'PANIC'
  | 'ARTIFICIAL_URGENCY'
  | 'AUTHORITY_IMPERSONATION'
  | 'FALSE_EXCLUSIVITY'
  | 'GREED'
  | 'SHAME_THREAT';

/* ─── Language ──────────────────────────────────────────── */
export type Language = 'en' | 'kn';

/* ─── Active View / Tab ─────────────────────────────────── */
export type ActivePillar =
  | 'dashboard'
  | 'phishing'
  | 'voice'
  | 'honeypot'
  | 'apk'
  | 'golden-hour'
  | 'cen-stations'
  | 'intelligence'
  | 'education'
  | 'cyber-health'
  | 'breach-check'
  | 'community'
  | 'report';

/* ─── IOC (Indicator of Compromise) ─────────────────────── */
export interface IOC {
  id: string;
  type: 'PHONE' | 'UPI' | 'BANK_ACCOUNT' | 'URL' | 'EMAIL' | 'TELEGRAM' | 'IP';
  value: string;
  firstSeen: string;
  lastSeen: string;
  riskScore: number; // 0-100
  linkedScamArchetype: ScamArchetype;
  reportCount: number;
}

/* ─── Phishing Analysis Result ──────────────────────────── */
export interface PhishingAnalysis {
  inputText: string;
  language: string;
  threatLevel: ThreatLevel;
  overallScore: number;
  scamArchetype: ScamArchetype;
  coercionTriggers: CoercionTrigger[];
  suspiciousEntities: {
    urls: string[];
    phones: string[];
    upiIds: string[];
  };
  explanation: string;
  explanationKn: string;
  recommendations?: string[];
  recommendationsKn?: string[];
}

/* ─── URL Analysis ──────────────────────────────────────── */
export interface UrlAnalysis {
  url: string;
  domain: string;
  tld: string;
  isPunycode: boolean;
  isHttps: boolean;
  registrationAge: string;
  threatLevel: ThreatLevel;
  riskScore: number;
  flags: string[];
}

/* ─── Voice Forensic Result ─────────────────────────────── */
export interface VoiceForensicResult {
  isDeepfake: boolean;
  confidence: number;
  spectralJitter: number;
  respirationDetected: boolean;
  vocoderArtifacts: boolean;
  biologicalScore: number;
  flags: string[];
}

/* ─── APK Analysis ──────────────────────────────────────── */
export interface ApkAnalysis {
  packageName: string;
  appName: string;
  threatLevel: ThreatLevel;
  dangerousPermissions: string[];
  c2Servers: {
    ip: string;
    port: number;
    country: string;
    hosting: string;
  }[];
  exfiltrationNumbers: string[];
  riskScore: number;
  removalSteps: string[];
}

/* ─── Bank Freeze Notice ────────────────────────────────── */
export interface BankFreezeNotice {
  bankName: string;
  nodalOfficerEmail: string;
  nodalOfficerPhone: string;
  smsCode?: string;
  emailTemplate: string;
}

/* ─── Victim Incident Report ────────────────────────────── */
export interface IncidentReport {
  victimName: string;
  victimPhone: string;
  victimEmail: string;
  victimDistrict: string;
  victimBank: string;
  accountNumber: string;
  amountLost: number;
  transactionUTR: string;
  transactionDate: string;
  scammerUPI: string;
  scammerPhone: string;
  scammerApp: string;
  scammerLinks: string;
  description: string;
  timestamp: string;
}

/* ─── Karnataka CEN Station ─────────────────────────────── */
export interface CENStation {
  id?: string;
  district: string;
  districtKn?: string;
  stationName: string;
  stationNameKn?: string;
  address: string;
  addressKn?: string;
  phone: string;
  emergencyDirect?: string;
  email: string;
  officerInCharge?: string;
  jurisdiction?: string;
  jurisdictionKn?: string;
  latitude?: number;
  longitude?: number;
}

/* ─── OCR Screenshot Scan ───────────────────────────────── */
export interface OcrBoundingBox {
  text: string;
  category: 'URGENCY' | 'URL' | 'PHONE' | 'UPI' | 'MALWARE_APK' | 'BANK_IMPERSONATION';
  confidence: number;
  box: [number, number, number, number]; // [ymin, xmin, ymax, xmax]
}

export interface OcrScanResult {
  extracted_text: string;
  language: string;
  script: string;
  threat_level: ThreatLevel;
  overall_score: number;
  scam_archetype: ScamArchetype;
  coercion_triggers: CoercionTrigger[];
  entities: {
    urls: string[];
    phones: string[];
    upiIds: string[];
  };
  bounding_boxes: OcrBoundingBox[];
  recommendation: string;
  recommendation_kn: string;
}

/* ─── Scam DNA Node ─────────────────────────────────────── */
export interface ScamDnaNode {
  id: string;
  label: string;
  type: IOC['type'] | 'SCAM_CAMPAIGN';
  risk: ThreatLevel;
  x: number;
  y: number;
  details?: string;
}

export interface ScamDnaEdge {
  source: string;
  target: string;
  relation: string;
}

/* ─── District Threat Data ──────────────────────────────── */
export interface DistrictThreat {
  district: string;
  districtKn?: string;
  totalCases: number;
  activeCampaigns: number;
  topScamType: ScamArchetype;
  trend: 'rising' | 'stable' | 'declining';
  recentSpike: boolean;
  description?: string;
  descriptionKn?: string;
}

/* ─── Family Protection ─────────────────────────────────── */
export interface FamilyMember {
  id: string;
  name: string;
  relation: string;
  phone: string;
  riskLevel: ThreatLevel;
  lastAlert?: string;
  isOnline: boolean;
}

/* ─── Simulation Scenario ───────────────────────────────── */
export interface SimulationScenario {
  id: string;
  title: string;
  titleKn: string;
  description: string;
  descriptionKn?: string;
  scamType: ScamArchetype;
  difficulty: 'BEGINNER' | 'INTERMEDIATE' | 'ADVANCED';
  steps: {
    message: string;
    messageKn: string;
    isScammer: boolean;
    correctAction: 'BLOCK' | 'REPORT' | 'IGNORE' | 'VERIFY' | 'RESPOND';
    hint?: string;
    hintKn?: string;
  }[];
}

/* ─── Quiz Question ─────────────────────────────────────── */
export interface QuizQuestion {
  id: string;
  question: string;
  questionKn: string;
  options: { text: string; textKn: string; isCorrect: boolean }[];
  explanation: string;
  explanationKn: string;
  difficulty: 'EASY' | 'MEDIUM' | 'HARD';
}

/* ─── Telemetry Stats ───────────────────────────────────── */
export interface TelemetryStats {
  threatsBlocked: number;
  scamsIntercepted: number;
  citizensProtected: number;
  muleTrapTriggers: number;
  phishingUrlsDetected: number;
  deepfakeCallsDetected: number;
}

/* ─── Honeypot Chat & Bait Persona ──────────────────────── */
export interface BaitPersona {
  id: string;
  name: string;
  nameKn: string;
  role: string;
  avatar: string;
  tactics: string;
  style: string;
}

export interface HoneypotMessage {
  id: string;
  sender: 'AGENT' | 'SCAMMER';
  text: string;
  timestamp: string;
  extracted?: {
    type: IOC['type'];
    value: string;
  };
}

/* ─── Payment / UPI Scam ────────────────────────────────── */
export interface PaymentScamAnalysis {
  type: 'REVERSE_UPI' | 'FAKE_RECEIPT' | 'QR_PHISHING' | 'COLLECT_REQUEST';
  riskScore: number;
  threatLevel: ThreatLevel;
  flags: string[];
  scammerUPI: string;
  suggestedAction: string;
  suggestedActionKn: string;
}

/* ─── AI Copilot Message ────────────────────────────────── */
export interface CopilotMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: string;
  actionLinks?: { label: string; tab: ActivePillar }[];
}

/* ═══════════════════════════════════════════════════════════
   NEW FEATURE TYPES
   ═══════════════════════════════════════════════════════════ */

/* ─── Threat Activity Feed Event ────────────────────────── */
export type ThreatEventType =
  | 'PHISHING_BLOCKED'
  | 'DEEPFAKE_INTERCEPTED'
  | 'MULE_FROZEN'
  | 'BANK_FREEZE'
  | 'HONEYPOT_TRIGGERED'
  | 'APK_QUARANTINED'
  | 'UPI_FRAUD_STOPPED'
  | 'IOC_DISCOVERED';

export interface ThreatEvent {
  id: string;
  type: ThreatEventType;
  severity: ThreatLevel;
  district: string;
  description: string;
  descriptionKn: string;
  timestamp: string;
  iocValue?: string;
}

/* ─── Cyber Health Score ────────────────────────────────── */
export interface CyberHealthQuestion {
  id: string;
  question: string;
  questionKn: string;
  options: {
    text: string;
    textKn: string;
    score: number; // 0 = worst, 10 = best
    flag?: string; // weak area tag
  }[];
}

export type CyberHealthTier = 'FORTRESS' | 'VIGILANT' | 'AT_RISK' | 'VULNERABLE' | 'CRITICAL';

export interface CyberHealthResult {
  score: number; // 0-100
  tier: CyberHealthTier;
  weakAreas: string[];
  recommendations: { text: string; textKn: string }[];
}

/* ─── Scam Pattern Timeline ─────────────────────────────── */
export interface ScamTimelineStage {
  stage: number;
  title: string;
  titleKn: string;
  description: string;
  descriptionKn: string;
  icon: string; // emoji
  redFlags: string[];
  redFlagsKn: string[];
  counterAction: string;
  counterActionKn: string;
  isInterventionPoint: boolean;
}

/* ─── Dark Web Leak Check ───────────────────────────────── */
export interface BreachRecord {
  breachName: string;
  breachDate: string;
  dataExposed: string[];
  severity: ThreatLevel;
  recordCount: number;
  description: string;
  descriptionKn: string;
}

/* ─── Community Scam Alert ──────────────────────────────── */
export interface CommunityAlert {
  id: string;
  reporterDistrict: string;
  scamType: ScamArchetype;
  title: string;
  titleKn: string;
  description: string;
  descriptionKn: string;
  timestamp: string;
  upvotes: number;
  verified: boolean;
  iocSnippet?: string;
}

/* ─── QR Threat Scan Result ─────────────────────────────── */
export interface QRScanResult {
  decodedUrl: string;
  domain: string;
  isShortened: boolean;
  redirectChain: string[];
  threatLevel: ThreatLevel;
  riskScore: number;
  flags: string[];
  verdict: string;
  verdictKn: string;
}

/* ─── Scam Statistics ───────────────────────────────────── */
export interface ScamStatEntry {
  label: string;
  labelKn: string;
  value: number;
  color: string;
}

