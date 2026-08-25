import React, { useState, useEffect, useRef, useCallback } from 'react';
import {
  Radio,
  Pause,
  Play,
  ArrowDown,
  Filter,
  ShieldAlert,
  Mic,
  CreditCard,
  Bug,
  Cpu,
  Landmark,
  Search,
} from 'lucide-react';
import type { Language, ThreatEvent, ThreatEventType, ThreatLevel } from '../types';

interface ThreatActivityFeedProps {
  language: Language;
}

const DISTRICTS = ['Bengaluru Urban', 'Mysuru', 'Mangaluru', 'Hubballi-Dharwad', 'Belagavi', 'Kalaburagi', 'Tumakuru', 'Shivamogga', 'Udupi', 'Davanagere', 'Raichur', 'Hassan'];
const pick = <T,>(arr: T[]): T => arr[Math.floor(Math.random() * arr.length)];
const rand = (min: number, max: number) => Math.floor(Math.random() * (max - min + 1)) + min;

const EVENT_TEMPLATES: {
  type: ThreatEventType;
  severity: ThreatLevel;
  en: string[];
  kn: string[];
}[] = [
  {
    type: 'PHISHING_BLOCKED',
    severity: 'HIGH',
    en: [
      'Phishing URL blocked: sbi-yono-kyc-update.{tld}/verify — targeting {district}',
      'Smishing SMS intercepted: Fake BESCOM power cut notice in {district}',
      'Phishing domain quarantined: axis-bank-alert.{tld} — {n} victims prevented',
    ],
    kn: [
      'ಫಿಶಿಂಗ್ URL ತಡೆಹಿಡಿಯಲಾಗಿದೆ: sbi-yono-kyc-update.{tld}/verify — {district}',
      'ನಕಲಿ BESCOM ಕರೆಂಟ್ ಕಟ್ SMS ತಡೆಹಿಡಿಯಲಾಗಿದೆ — {district}',
      'ಫಿಶಿಂಗ್ ಡೊಮೈನ್ ಕ್ವಾರಂಟೈನ್: axis-bank-alert.{tld} — {n} ಬಲಿಪಶುಗಳನ್ನು ತಡೆಯಲಾಗಿದೆ',
    ],
  },
  {
    type: 'DEEPFAKE_INTERCEPTED',
    severity: 'CRITICAL',
    en: [
      'AI voice clone call intercepted: Impersonating family member — {district}',
      'Deepfake video call blocked: Fake CBI officer visual — {district}',
      'Voice synthesis detected: Spectral jitter {n}% above threshold — {district}',
    ],
    kn: [
      'AI ವಾಯ್ಸ್ ಕ್ಲೋನ್ ಕರೆ ತಡೆಹಿಡಿಯಲಾಗಿದೆ: ಕುಟುಂಬ ಸದಸ್ಯರ ನಕಲು — {district}',
      'ಡೀಪ್‌ಫೇಕ್ ವಿಡಿಯೋ ಕಾಲ್ ಬ್ಲಾಕ್: ನಕಲಿ CBI ಅಧಿಕಾರಿ — {district}',
      'ಧ್ವನಿ ಸಂಶ್ಲೇಷಣೆ ಪತ್ತೆ: ಸ್ಪೆಕ್ಟ್ರಲ್ ಜಿಟ್ಟರ್ {n}% ಮಿತಿ ಮೀರಿದೆ — {district}',
    ],
  },
  {
    type: 'MULE_FROZEN',
    severity: 'HIGH',
    en: [
      'Mule account frozen: A/C XXXX-{n} flagged by honeypot intelligence — {district}',
      'Money mule network disrupted: {n} accounts frozen across {district}',
    ],
    kn: [
      'ಮ್ಯೂಲ್ ಖಾತೆ ಫ್ರೀಜ್: A/C XXXX-{n} ಹನಿಪಾಟ್ ಗುಪ್ತಚರ ಮೂಲಕ ಫ್ಲ್ಯಾಗ್ — {district}',
      'ಹಣ ವರ್ಗಾವಣೆ ಜಾಲ ಭಗ್ನ: {n} ಖಾತೆಗಳನ್ನು ಫ್ರೀಜ್ ಮಾಡಲಾಗಿದೆ — {district}',
    ],
  },
  {
    type: 'BANK_FREEZE',
    severity: 'MEDIUM',
    en: [
      'Golden Hour freeze executed: ₹{amount} saved — SBI Nodal Officer notified — {district}',
      'RBI freeze directive issued: Beneficiary A/C XXXX-{n} — {district}',
    ],
    kn: [
      'ಗೋಲ್ಡನ್ ಅವರ್ ಫ್ರೀಜ್ ಕಾರ್ಯಗತ: ₹{amount} ಉಳಿಸಲಾಗಿದೆ — {district}',
      'RBI ಫ್ರೀಜ್ ನಿರ್ದೇಶನ ಹೊರಡಿಸಲಾಗಿದೆ: A/C XXXX-{n} — {district}',
    ],
  },
  {
    type: 'HONEYPOT_TRIGGERED',
    severity: 'HIGH',
    en: [
      'Honeypot trap triggered: Scammer engaged for {n} minutes — UPI extracted — {district}',
      'Bait persona activated: Scammer divulged bank A/C details — {district}',
    ],
    kn: [
      'ಹನಿಪಾಟ್ ಟ್ರ್ಯಾಪ್ ಸಕ್ರಿಯ: ವಂಚಕ {n} ನಿಮಿಷ ತೊಡಗಿಸಿಕೊಂಡ — {district}',
      'ಬೈಟ್ ಪರ್ಸೋನಾ ಸಕ್ರಿಯ: ವಂಚಕ ಬ್ಯಾಂಕ್ ವಿವರ ಬಹಿರಂಗಪಡಿಸಿದ — {district}',
    ],
  },
  {
    type: 'APK_QUARANTINED',
    severity: 'CRITICAL',
    en: [
      'Malicious APK quarantined: com.quick.loan.{n} — {district} — Accessibility exploit detected',
      'Sideloaded app blocked: Contacts exfiltration to C2 server 103.{n}.XX.XX — {district}',
    ],
    kn: [
      'ದುರುದ್ದೇಶಪೂರ್ಣ APK ಕ್ವಾರಂಟೈನ್: com.quick.loan.{n} — {district}',
      'ಸೈಡ್‌ಲೋಡ್ ಆ್ಯಪ್ ಬ್ಲಾಕ್: ಸಂಪರ್ಕ ಕಳ್ಳತನ C2 ಸರ್ವರ್‌ಗೆ — {district}',
    ],
  },
  {
    type: 'UPI_FRAUD_STOPPED',
    severity: 'HIGH',
    en: [
      'Reverse UPI collect request blocked: scammer@ybl — ₹{amount} — {district}',
      'Fake QR code payment intercepted: ₹{amount} saved — {district}',
    ],
    kn: [
      'ರಿವರ್ಸ್ UPI ಕಲೆಕ್ಟ್ ರಿಕ್ವೆಸ್ಟ್ ಬ್ಲಾಕ್: scammer@ybl — ₹{amount} — {district}',
      'ನಕಲಿ QR ಕೋಡ್ ಪಾವತಿ ತಡೆ: ₹{amount} ಉಳಿಸಲಾಗಿದೆ — {district}',
    ],
  },
  {
    type: 'IOC_DISCOVERED',
    severity: 'MEDIUM',
    en: [
      'New IOC discovered: Phone +91-{n}-XXXXX linked to Digital Arrest syndicate — {district}',
      'Threat intel update: Domain customs-gov-india.{tld} added to blocklist',
    ],
    kn: [
      'ಹೊಸ IOC ಪತ್ತೆ: ಫೋನ್ +91-{n}-XXXXX ಡಿಜಿಟಲ್ ಅರೆಸ್ಟ್ ಸಿಂಡಿಕೇಟ್ — {district}',
      'ಥ್ರೆಟ್ ಇಂಟೆಲ್ ಅಪ್‌ಡೇಟ್: customs-gov-india.{tld} ಬ್ಲಾಕ್‌ಲಿಸ್ಟ್‌ಗೆ ಸೇರಿಸಲಾಗಿದೆ',
    ],
  },
];

const TLDS = ['top', 'xyz', 'site', 'online', 'info', 'club'];

function generateEvent(): ThreatEvent {
  const template = pick(EVENT_TEMPLATES);
  const district = pick(DISTRICTS);
  const n = rand(1000, 9999);
  const amount = pick(['12,500', '25,000', '48,000', '1,50,000', '3,25,000', '75,000']);
  const tld = pick(TLDS);

  const enDesc = pick(template.en).replace('{district}', district).replace('{n}', String(n)).replace('{amount}', amount).replace('{tld}', tld);
  const knDesc = pick(template.kn).replace('{district}', district).replace('{n}', String(n)).replace('{amount}', amount).replace('{tld}', tld);

  return {
    id: `evt-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
    type: template.type,
    severity: template.severity,
    district,
    description: enDesc,
    descriptionKn: knDesc,
    timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' }),
  };
}

const EVENT_ICONS: Record<ThreatEventType, React.ReactNode> = {
  PHISHING_BLOCKED: <ShieldAlert className="h-3.5 w-3.5" />,
  DEEPFAKE_INTERCEPTED: <Mic className="h-3.5 w-3.5" />,
  MULE_FROZEN: <Landmark className="h-3.5 w-3.5" />,
  BANK_FREEZE: <Landmark className="h-3.5 w-3.5" />,
  HONEYPOT_TRIGGERED: <Cpu className="h-3.5 w-3.5" />,
  APK_QUARANTINED: <Bug className="h-3.5 w-3.5" />,
  UPI_FRAUD_STOPPED: <CreditCard className="h-3.5 w-3.5" />,
  IOC_DISCOVERED: <Search className="h-3.5 w-3.5" />,
};

const SEVERITY_STYLES: Record<ThreatLevel, string> = {
  CRITICAL: 'border-red-500/50 bg-red-950/30 text-red-300',
  HIGH: 'border-amber-500/40 bg-amber-950/20 text-amber-300',
  MEDIUM: 'border-cyan-500/30 bg-cyan-950/20 text-cyan-300',
  LOW: 'border-slate-700 bg-slate-900/50 text-slate-300',
  SAFE: 'border-emerald-500/30 bg-emerald-950/20 text-emerald-300',
};

const SEVERITY_BADGE: Record<ThreatLevel, string> = {
  CRITICAL: 'bg-red-500/20 text-red-400 border-red-500/40',
  HIGH: 'bg-amber-500/20 text-amber-400 border-amber-500/40',
  MEDIUM: 'bg-cyan-500/20 text-cyan-400 border-cyan-500/40',
  LOW: 'bg-slate-700/40 text-slate-400 border-slate-700',
  SAFE: 'bg-emerald-500/20 text-emerald-400 border-emerald-500/40',
};

const EVENT_TYPE_LABELS: Record<ThreatEventType, string> = {
  PHISHING_BLOCKED: 'Phishing',
  DEEPFAKE_INTERCEPTED: 'Deepfake',
  MULE_FROZEN: 'Mule Acct',
  BANK_FREEZE: 'Bank Freeze',
  HONEYPOT_TRIGGERED: 'Honeypot',
  APK_QUARANTINED: 'APK',
  UPI_FRAUD_STOPPED: 'UPI Fraud',
  IOC_DISCOVERED: 'IOC',
};

const MAX_EVENTS = 100;

export const ThreatActivityFeed: React.FC<ThreatActivityFeedProps> = ({ language }) => {
  const [events, setEvents] = useState<ThreatEvent[]>(() => {
    // Seed with 8 initial events
    return Array.from({ length: 8 }, () => generateEvent()).reverse();
  });
  const [isPaused, setIsPaused] = useState(false);
  const [filterType, setFilterType] = useState<ThreatEventType | 'ALL'>('ALL');
  const [isAtBottom, setIsAtBottom] = useState(true);
  const feedRef = useRef<HTMLDivElement>(null);

  // Generate new events every 2-5 seconds
  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(() => {
      setEvents(prev => {
        const newEvent = generateEvent();
        const updated = [...prev, newEvent];
        return updated.length > MAX_EVENTS ? updated.slice(-MAX_EVENTS) : updated;
      });
    }, rand(2000, 5000));
    return () => clearInterval(interval);
  }, [isPaused]);

  // Auto-scroll to bottom
  useEffect(() => {
    if (isAtBottom && feedRef.current) {
      feedRef.current.scrollTop = feedRef.current.scrollHeight;
    }
  }, [events, isAtBottom]);

  const handleScroll = useCallback(() => {
    if (!feedRef.current) return;
    const { scrollTop, scrollHeight, clientHeight } = feedRef.current;
    setIsAtBottom(scrollHeight - scrollTop - clientHeight < 40);
  }, []);

  const jumpToBottom = () => {
    if (feedRef.current) {
      feedRef.current.scrollTop = feedRef.current.scrollHeight;
      setIsAtBottom(true);
    }
  };

  const filteredEvents = filterType === 'ALL' ? events : events.filter(e => e.type === filterType);

  const filterOptions: (ThreatEventType | 'ALL')[] = ['ALL', ...Object.keys(EVENT_TYPE_LABELS) as ThreatEventType[]];

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <div className="mb-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div>
          <div className="flex items-center gap-2">
            <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-emerald-500/20 text-emerald-400">
              <Radio className="h-4 w-4 animate-pulse" />
            </span>
            <h2 className="text-xl font-bold text-slate-100 sm:text-2xl">
              {language === 'kn' ? 'ಲೈವ್ SIGINT ಥ್ರೆಟ್ ಫೀಡ್' : 'Live SIGINT Threat Activity Feed'}
            </h2>
          </div>
          <p className="mt-1 text-xs text-slate-400">
            {language === 'kn'
              ? 'ನೈಜ-ಸಮಯದ ಸೈಬರ್ ಕಾರ್ಯಾಚರಣೆ ಲಾಗ್ — ಫಿಲ್ಟರ್ ಮತ್ತು ಮಾನಿಟರ್'
              : 'Real-time cyber operations log — filter and monitor events as they happen'}
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setIsPaused(p => !p)}
            className={`flex items-center gap-1.5 rounded-lg border px-3 py-1.5 text-xs font-bold transition-all ${
              isPaused
                ? 'border-emerald-500/50 bg-emerald-950/30 text-emerald-400 hover:bg-emerald-900/40'
                : 'border-amber-500/40 bg-amber-950/20 text-amber-400 hover:bg-amber-900/30'
            }`}
          >
            {isPaused ? <Play className="h-3.5 w-3.5" /> : <Pause className="h-3.5 w-3.5" />}
            <span>{isPaused ? 'Resume' : 'Pause'}</span>
          </button>

          <span className="font-mono text-[10px] text-slate-500">
            {events.length} events
          </span>
        </div>
      </div>

      {/* Filter Bar */}
      <div className="mb-3 flex items-center gap-1.5 overflow-x-auto pb-1">
        <Filter className="h-3.5 w-3.5 text-slate-500 shrink-0" />
        {filterOptions.map(opt => (
          <button
            key={opt}
            type="button"
            onClick={() => setFilterType(opt)}
            className={`shrink-0 rounded-lg px-2.5 py-1 text-[10px] font-bold transition-all ${
              filterType === opt
                ? 'bg-cyan-500 text-slate-950'
                : 'border border-slate-800 bg-slate-950 text-slate-400 hover:border-slate-700 hover:text-slate-200'
            }`}
          >
            {opt === 'ALL' ? 'ALL' : EVENT_TYPE_LABELS[opt]}
          </button>
        ))}
      </div>

      {/* Feed Container */}
      <div className="relative rounded-2xl border border-slate-800 bg-slate-950/90 backdrop-blur-md overflow-hidden">
        {/* Scan line overlay */}
        <div className="scan-line absolute inset-0 pointer-events-none z-10" />

        <div
          ref={feedRef}
          onScroll={handleScroll}
          className="max-h-[420px] overflow-y-auto p-3 space-y-1.5 font-mono text-xs"
        >
          {filteredEvents.map(event => (
            <div
              key={event.id}
              className={`flex items-start gap-2.5 rounded-lg border p-2.5 transition-all animate-slide-up ${SEVERITY_STYLES[event.severity]}`}
            >
              {/* Icon */}
              <div className="shrink-0 mt-0.5 opacity-70">
                {EVENT_ICONS[event.type]}
              </div>

              {/* Content */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className={`rounded border px-1.5 py-0.5 text-[9px] font-bold ${SEVERITY_BADGE[event.severity]}`}>
                    {event.severity}
                  </span>
                  <span className="rounded bg-slate-800 px-1.5 py-0.5 text-[9px] font-semibold text-slate-400">
                    {EVENT_TYPE_LABELS[event.type]}
                  </span>
                  <span className="text-[10px] text-slate-500">{event.timestamp}</span>
                </div>
                <p className="mt-1 text-[11px] leading-relaxed break-words">
                  {language === 'kn' ? event.descriptionKn : event.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Jump to bottom */}
        {!isAtBottom && (
          <button
            type="button"
            onClick={jumpToBottom}
            className="absolute bottom-3 right-3 z-20 flex items-center gap-1.5 rounded-lg bg-cyan-500 px-3 py-1.5 text-[10px] font-bold text-slate-950 shadow-lg shadow-cyan-500/30 hover:bg-cyan-400 transition-all animate-slide-up"
          >
            <ArrowDown className="h-3 w-3" />
            <span>Latest</span>
          </button>
        )}

        {/* Status bar */}
        <div className="border-t border-slate-800 bg-slate-900/80 px-3 py-1.5 flex items-center justify-between text-[10px] font-mono text-slate-500">
          <div className="flex items-center gap-2">
            <span className={`h-1.5 w-1.5 rounded-full ${isPaused ? 'bg-amber-500' : 'bg-emerald-500 animate-pulse'}`} />
            <span>{isPaused ? 'PAUSED' : 'STREAMING'}</span>
          </div>
          <span>RAKSHA AI SIGINT • {filteredEvents.length} / {events.length} events</span>
        </div>
      </div>
    </div>
  );
};
