import React, { useState, useEffect } from 'react';
import {
  Megaphone,
  ThumbsUp,
  BadgeCheck,
  MapPin,
  Clock,
  Filter,
  PlusCircle,
  Send,
  TrendingUp,
  X,
} from 'lucide-react';
import type { Language, CommunityAlert, ScamArchetype } from '../types';

interface CommunityScamAlertWallProps {
  language: Language;
}

const DISTRICTS = ['Bengaluru Urban', 'Mysuru', 'Mangaluru', 'Hubballi-Dharwad', 'Belagavi', 'Kalaburagi', 'Tumakuru', 'Shivamogga', 'Udupi', 'Davanagere', 'Raichur', 'Hassan'];
const SCAM_TYPES: ScamArchetype[] = ['BESCOM_POWER_CUT', 'SBI_YONO_KYC', 'YOUTUBE_JOB', 'FEDEX_DIGITAL_ARREST', 'LOAN_APP_BLACKMAIL', 'UPI_REVERSE_PAYMENT', 'CUSTOMS_IMPERSONATION', 'AADHAAR_LINK_FRAUD', 'OTP_THEFT', 'INVESTMENT_PONZI'];
const pick = <T,>(arr: T[]): T => arr[Math.floor(Math.random() * arr.length)];

const SCAM_LABELS: Record<ScamArchetype, { en: string; kn: string }> = {
  BESCOM_POWER_CUT: { en: 'Fake BESCOM', kn: 'ನಕಲಿ BESCOM' },
  SBI_YONO_KYC: { en: 'SBI KYC Fraud', kn: 'SBI KYC ವಂಚನೆ' },
  YOUTUBE_JOB: { en: 'YouTube Job Scam', kn: 'ಯೂಟ್ಯೂಬ್ ಕೆಲಸ ವಂಚನೆ' },
  FEDEX_DIGITAL_ARREST: { en: 'Digital Arrest', kn: 'ಡಿಜಿಟಲ್ ಅರೆಸ್ಟ್' },
  LOAN_APP_BLACKMAIL: { en: 'Loan App Blackmail', kn: 'ಸಾಲದ ಆ್ಯಪ್ ಬ್ಲ್ಯಾಕ್‌ಮೇಲ್' },
  UPI_REVERSE_PAYMENT: { en: 'UPI Reverse Pay', kn: 'UPI ರಿವರ್ಸ್ ಪೇ' },
  CUSTOMS_IMPERSONATION: { en: 'Customs Fraud', kn: 'ಕಸ್ಟಮ್ಸ್ ವಂಚನೆ' },
  AADHAAR_LINK_FRAUD: { en: 'Aadhaar Fraud', kn: 'ಆಧಾರ್ ವಂಚನೆ' },
  OTP_THEFT: { en: 'OTP Theft', kn: 'OTP ಕಳ್ಳತನ' },
  INVESTMENT_PONZI: { en: 'Ponzi Scheme', kn: 'ಪೊನ್ಜಿ ಯೋಜನೆ' },
  UNKNOWN: { en: 'Unknown', kn: 'ಅಪರಿಚಿತ' },
};

const ALERT_TEMPLATES: { en: string[]; kn: string[]; title: string[]; titleKn: string[] }[] = [
  {
    title: ['Fake BESCOM call demanding immediate payment', 'BESCOM impersonation scam in my area'],
    titleKn: ['ನಕಲಿ BESCOM ಕರೆ — ತಕ್ಷಣ ಪಾವತಿ ಬೇಡಿಕೆ', 'ನಮ್ಮ ಪ್ರದೇಶದಲ್ಲಿ BESCOM ನಕಲಿ ವಂಚನೆ'],
    en: ['Received call from +91-9XX claiming power will be cut in 30 minutes unless ₹2,500 paid via PhonePe.', 'SMS received: "Your BESCOM bill is overdue. Pay now or face disconnection" with suspicious link.'],
    kn: ['30 ನಿಮಿಷದಲ್ಲಿ ಕರೆಂಟ್ ಕಟ್ ಆಗುತ್ತೆ ₹2,500 ಕೊಡಿ ಎಂದು ಕರೆ ಬಂದಿದೆ.', 'ನಿಮ್ಮ BESCOM ಬಿಲ್ ಬಾಕಿ ಇದೆ ಎಂಬ SMS ಮತ್ತು ಅನುಮಾನಾಸ್ಪದ ಲಿಂಕ್ ಬಂದಿದೆ.'],
  },
  {
    title: ['Digital Arrest call from fake CBI officer', 'Threatening video call claiming arrest warrant'],
    titleKn: ['ನಕಲಿ CBI ಅಧಿಕಾರಿಯಿಂದ ಡಿಜಿಟಲ್ ಅರೆಸ್ಟ್ ಕರೆ', 'ಬಂಧನ ವಾರಂಟ್ ಎಂದು ಬೆದರಿಕೆ ವಿಡಿಯೋ ಕಾಲ್'],
    en: ['Got a video call showing a fake police uniform. Said I have a warrant and need to pay ₹50,000 to "clear my name".', 'Someone called claiming to be from CBI, said my Aadhaar is linked to money laundering. Demanded ₹1 lakh.'],
    kn: ['ನಕಲಿ ಪೊಲೀಸ್ ಸಮವಸ್ತ್ರ ತೋರಿಸಿ ವಿಡಿಯೋ ಕಾಲ್. ₹50,000 ಕೊಡಿ ಎಂದು ಬೆದರಿಕೆ.', 'CBI ಯಿಂದ ಎಂದು ಕರೆ, ಆಧಾರ್ ಮನಿ ಲಾಂಡ್ರಿಂಗ್‌ಗೆ ಲಿಂಕ್ ಆಗಿದೆ ₹1 ಲಕ್ಷ ಕೊಡಿ.'],
  },
  {
    title: ['Loan app installed photos and contacts stolen', 'Blackmail from illegal lending app'],
    titleKn: ['ಸಾಲದ ಆ್ಯಪ್ ಫೋಟೋ ಮತ್ತು ಸಂಪರ್ಕಗಳನ್ನು ಕದ್ದಿದೆ', 'ಅಕ್ರಮ ಸಾಲ ಆ್ಯಪ್‌ನಿಂದ ಬ್ಲ್ಯಾಕ್‌ಮೇಲ್'],
    en: ['Downloaded "QuickCash" app for ₹5,000 loan. Now they morphed my photos and threatening to send to contacts.', 'Loan app accessed my gallery and contacts. Demanding ₹25,000 or they will share edited photos.'],
    kn: ['QuickCash ಆ್ಯಪ್‌ನಿಂದ ₹5,000 ಸಾಲ ತೆಗೆದುಕೊಂಡೆ. ಈಗ ಫೋಟೋ ಎಡಿಟ್ ಮಾಡಿ ಬೆದರಿಸುತ್ತಿದ್ದಾರೆ.', 'ಸಾಲ ಆ್ಯಪ್ ಗ್ಯಾಲರಿ ಮತ್ತು ಸಂಪರ್ಕ ಕದ್ದಿದೆ. ₹25,000 ಕೊಡಿ ಇಲ್ಲ ಫೋಟೋ ಶೇರ್ ಮಾಡುತ್ತೇವೆ.'],
  },
];

function generateAlert(): CommunityAlert {
  const template = pick(ALERT_TEMPLATES);
  const scamType = pick(SCAM_TYPES);
  const district = pick(DISTRICTS);
  const mins = Math.floor(Math.random() * 120);
  return {
    id: `alert-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`,
    reporterDistrict: district,
    scamType,
    title: pick(template.title),
    titleKn: pick(template.titleKn),
    description: pick(template.en),
    descriptionKn: pick(template.kn),
    timestamp: mins < 60 ? `${mins}m ago` : `${Math.floor(mins / 60)}h ago`,
    upvotes: Math.floor(Math.random() * 50),
    verified: Math.random() > 0.6,
    iocSnippet: Math.random() > 0.5 ? `+91-${Math.floor(Math.random() * 9000000000 + 1000000000)}` : undefined,
  };
}

export const CommunityScamAlertWall: React.FC<CommunityScamAlertWallProps> = ({ language }) => {
  const [alerts, setAlerts] = useState<CommunityAlert[]>(() => Array.from({ length: 8 }, generateAlert));
  const [filterDistrict, setFilterDistrict] = useState<string>('ALL');
  const [showForm, setShowForm] = useState(false);
  const [formTitle, setFormTitle] = useState('');
  const [formDesc, setFormDesc] = useState('');
  const [formDistrict, setFormDistrict] = useState('');
  const [upvoted, setUpvoted] = useState<Set<string>>(new Set());

  // Auto-add new alerts
  useEffect(() => {
    const interval = setInterval(() => {
      setAlerts(prev => [generateAlert(), ...prev].slice(0, 50));
    }, 8000 + Math.random() * 7000);
    return () => clearInterval(interval);
  }, []);

  const handleUpvote = (id: string) => {
    if (upvoted.has(id)) return;
    setUpvoted(prev => new Set(prev).add(id));
    setAlerts(prev => prev.map(a => a.id === id ? { ...a, upvotes: a.upvotes + 1 } : a));
  };

  const handleSubmit = () => {
    if (!formTitle.trim() || !formDesc.trim()) return;
    const newAlert: CommunityAlert = {
      id: `alert-${Date.now()}`,
      reporterDistrict: formDistrict || 'Bengaluru Urban',
      scamType: 'UNKNOWN',
      title: formTitle,
      titleKn: formTitle,
      description: formDesc,
      descriptionKn: formDesc,
      timestamp: '0m ago',
      upvotes: 0,
      verified: false,
    };
    setAlerts(prev => [newAlert, ...prev]);
    setFormTitle('');
    setFormDesc('');
    setShowForm(false);
  };

  const filtered = filterDistrict === 'ALL' ? alerts : alerts.filter(a => a.reporterDistrict === filterDistrict);

  // Trending scam types
  const trendingMap = new Map<ScamArchetype, number>();
  alerts.forEach(a => trendingMap.set(a.scamType, (trendingMap.get(a.scamType) || 0) + 1));
  const trending = [...trendingMap.entries()].sort((a, b) => b[1] - a[1]).slice(0, 5);

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="mb-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-orange-500/20 text-orange-400">
            <Megaphone className="h-5 w-5" />
          </span>
          <div>
            <h2 className="text-xl font-bold text-slate-100 sm:text-2xl">
              {language === 'kn' ? 'ಸಮುದಾಯ ವಂಚನೆ ಎಚ್ಚರಿಕೆ ಗೋಡೆ' : 'Community Scam Alert Wall'}
            </h2>
            <p className="text-xs text-slate-400">
              {language === 'kn' ? 'ನಾಗರಿಕರ ವರದಿಗಳು — ನೈಜ-ಸಮಯ' : 'Crowdsourced citizen reports — real-time'}
            </p>
          </div>
        </div>
        <button
          type="button"
          onClick={() => setShowForm(!showForm)}
          className="flex items-center gap-2 rounded-lg bg-gradient-to-r from-orange-500 to-amber-600 px-4 py-2 text-sm font-bold text-slate-950 shadow-lg shadow-orange-500/25 transition-all hover:scale-105"
        >
          <PlusCircle className="h-4 w-4" />
          {language === 'kn' ? 'ಎಚ್ಚರಿಕೆ ಸಲ್ಲಿಸಿ' : 'Submit Alert'}
        </button>
      </div>

      {/* Submit Form */}
      {showForm && (
        <div className="mb-4 rounded-2xl border border-orange-500/30 bg-orange-950/10 p-5 animate-slide-up">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-sm font-bold text-orange-300">{language === 'kn' ? 'ಹೊಸ ಎಚ್ಚರಿಕೆ ಸಲ್ಲಿಸಿ' : 'Submit New Scam Alert'}</h3>
            <button type="button" onClick={() => setShowForm(false)} className="text-slate-500 hover:text-slate-300"><X className="h-4 w-4" /></button>
          </div>
          <div className="space-y-3">
            <input
              className="w-full rounded-lg border border-slate-700 bg-slate-900/80 px-4 py-2.5 text-sm text-slate-100 placeholder-slate-500 outline-none focus:border-orange-500"
              placeholder={language === 'kn' ? 'ಶೀರ್ಷಿಕೆ — ಏನಾಯಿತು?' : 'Title — What happened?'}
              value={formTitle}
              onChange={e => setFormTitle(e.target.value)}
            />
            <textarea
              className="w-full rounded-lg border border-slate-700 bg-slate-900/80 px-4 py-2.5 text-sm text-slate-100 placeholder-slate-500 outline-none focus:border-orange-500 min-h-[80px] resize-y"
              placeholder={language === 'kn' ? 'ವಿವರವಾಗಿ ಬರೆಯಿರಿ...' : 'Describe the scam in detail...'}
              value={formDesc}
              onChange={e => setFormDesc(e.target.value)}
            />
            <div className="flex items-center gap-3">
              <select
                className="rounded-lg border border-slate-700 bg-slate-900/80 px-3 py-2 text-xs text-slate-200 outline-none"
                value={formDistrict}
                onChange={e => setFormDistrict(e.target.value)}
              >
                <option value="">{language === 'kn' ? 'ಜಿಲ್ಲೆ' : 'District'}</option>
                {DISTRICTS.map(d => <option key={d} value={d}>{d}</option>)}
              </select>
              <button
                type="button"
                onClick={handleSubmit}
                disabled={!formTitle.trim() || !formDesc.trim()}
                className="flex items-center gap-1.5 rounded-lg bg-orange-500 px-4 py-2 text-xs font-bold text-slate-950 transition-all hover:bg-orange-400 disabled:opacity-40"
              >
                <Send className="h-3.5 w-3.5" />
                {language === 'kn' ? 'ಸಲ್ಲಿಸಿ' : 'Post'}
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Main Feed */}
        <div className="lg:col-span-3">
          {/* District Filter */}
          <div className="mb-3 flex items-center gap-1.5 overflow-x-auto pb-1">
            <Filter className="h-3.5 w-3.5 text-slate-500 shrink-0" />
            <button
              type="button"
              onClick={() => setFilterDistrict('ALL')}
              className={`shrink-0 rounded-lg px-2.5 py-1 text-[10px] font-bold transition-all ${filterDistrict === 'ALL' ? 'bg-orange-500 text-slate-950' : 'border border-slate-800 text-slate-400 hover:text-slate-200'}`}
            >
              ALL
            </button>
            {DISTRICTS.slice(0, 6).map(d => (
              <button
                key={d}
                type="button"
                onClick={() => setFilterDistrict(d)}
                className={`shrink-0 rounded-lg px-2.5 py-1 text-[10px] font-bold transition-all ${filterDistrict === d ? 'bg-orange-500 text-slate-950' : 'border border-slate-800 text-slate-400 hover:text-slate-200'}`}
              >
                {d.split(' ')[0]}
              </button>
            ))}
          </div>

          {/* Alert Cards */}
          <div className="space-y-3 max-h-[560px] overflow-y-auto pr-1">
            {filtered.map(alert => (
              <div key={alert.id} className="rounded-xl border border-slate-800 bg-slate-950/90 p-4 transition-all hover:border-slate-700 animate-slide-up">
                <div className="flex items-start justify-between gap-3">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap mb-1">
                      <span className="rounded bg-slate-800 px-1.5 py-0.5 text-[9px] font-bold text-orange-300">
                        {language === 'kn' ? SCAM_LABELS[alert.scamType].kn : SCAM_LABELS[alert.scamType].en}
                      </span>
                      {alert.verified && (
                        <span className="flex items-center gap-0.5 rounded bg-emerald-500/20 px-1.5 py-0.5 text-[9px] font-bold text-emerald-400 border border-emerald-500/30">
                          <BadgeCheck className="h-2.5 w-2.5" />
                          {language === 'kn' ? 'ಪರಿಶೀಲಿಸಲಾಗಿದೆ' : 'Verified'}
                        </span>
                      )}
                      <span className="flex items-center gap-0.5 text-[10px] text-slate-500">
                        <MapPin className="h-2.5 w-2.5" />{alert.reporterDistrict}
                      </span>
                    </div>
                    <h4 className="text-sm font-bold text-slate-200">
                      {language === 'kn' ? alert.titleKn : alert.title}
                    </h4>
                    <p className="mt-1 text-xs text-slate-400 line-clamp-2">
                      {language === 'kn' ? alert.descriptionKn : alert.description}
                    </p>
                    {alert.iocSnippet && (
                      <span className="mt-1.5 inline-block rounded bg-red-950/30 px-2 py-0.5 font-mono text-[10px] text-red-400 border border-red-500/20">
                        IOC: {alert.iocSnippet}
                      </span>
                    )}
                  </div>
                  <div className="flex flex-col items-center gap-1 shrink-0">
                    <button
                      type="button"
                      onClick={() => handleUpvote(alert.id)}
                      className={`flex flex-col items-center rounded-lg px-2 py-1.5 transition-all ${
                        upvoted.has(alert.id)
                          ? 'bg-orange-500/20 text-orange-400'
                          : 'bg-slate-900 text-slate-500 hover:text-orange-400 hover:bg-slate-800'
                      }`}
                    >
                      <ThumbsUp className="h-3.5 w-3.5" />
                      <span className="text-[10px] font-bold mt-0.5">{alert.upvotes}</span>
                    </button>
                    <span className="flex items-center gap-0.5 text-[9px] text-slate-600">
                      <Clock className="h-2.5 w-2.5" />{alert.timestamp}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Trending Sidebar */}
        <div className="lg:col-span-1">
          <div className="rounded-2xl border border-slate-800 bg-slate-950/90 p-4 sticky top-24">
            <h3 className="text-xs font-bold uppercase text-slate-300 mb-3 flex items-center gap-1.5">
              <TrendingUp className="h-3.5 w-3.5 text-orange-400" />
              {language === 'kn' ? 'ಟ್ರೆಂಡಿಂಗ್ ವಂಚನೆಗಳು' : 'Trending Scam Types'}
            </h3>
            <div className="space-y-2">
              {trending.map(([type, count], i) => (
                <div key={type} className="flex items-center justify-between rounded-lg bg-slate-900/60 px-3 py-2">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-mono font-bold text-slate-500">#{i + 1}</span>
                    <span className="text-xs font-semibold text-slate-300">
                      {language === 'kn' ? SCAM_LABELS[type].kn : SCAM_LABELS[type].en}
                    </span>
                  </div>
                  <span className="rounded bg-orange-500/20 px-1.5 py-0.5 text-[10px] font-bold text-orange-400">{count}</span>
                </div>
              ))}
            </div>

            <div className="mt-4 rounded-xl border border-slate-800 bg-slate-900/40 p-3">
              <div className="text-center">
                <div className="text-2xl font-mono font-black text-orange-400">{alerts.length}</div>
                <div className="text-[10px] text-slate-500 uppercase font-semibold">{language === 'kn' ? 'ಒಟ್ಟು ಎಚ್ಚರಿಕೆಗಳು' : 'Total Alerts'}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
