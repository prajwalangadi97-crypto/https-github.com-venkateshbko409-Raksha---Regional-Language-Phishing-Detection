import React, { useState } from 'react';
import {
  FileWarning,
  User,
  Landmark,
  UserX,
  FileText,
  CheckCircle2,
  ChevronRight,
  ChevronLeft,
  Download,
  Phone,
  Send,
} from 'lucide-react';
import type { Language } from '../types';

interface IncidentReportWizardProps {
  language: Language;
}

const STEPS = [
  { icon: User, en: 'Victim Details', kn: 'ಸಂತ್ರಸ್ತರ ವಿವರ' },
  { icon: Landmark, en: 'Financial Details', kn: 'ಆರ್ಥಿಕ ವಿವರ' },
  { icon: UserX, en: 'Scammer Details', kn: 'ವಂಚಕರ ವಿವರ' },
  { icon: FileText, en: 'Description', kn: 'ವಿವರಣೆ' },
  { icon: CheckCircle2, en: 'Review & Submit', kn: 'ಪರಿಶೀಲನೆ & ಸಲ್ಲಿಸಿ' },
];

const DISTRICTS = [
  'Bengaluru Urban', 'Bengaluru Rural', 'Mysuru', 'Mangaluru', 'Hubballi-Dharwad',
  'Belagavi', 'Kalaburagi', 'Tumakuru', 'Shivamogga', 'Udupi', 'Davanagere',
  'Raichur', 'Hassan', 'Ballari', 'Vijayapura', 'Ramanagara', 'Chikkamagaluru',
  'Kodagu', 'Mandya', 'Chamarajanagar', 'Chitradurga', 'Haveri', 'Gadag',
  'Dharwad', 'Uttara Kannada', 'Koppal', 'Bagalkot', 'Bidar', 'Yadgir',
];

const BANKS = [
  'State Bank of India', 'HDFC Bank', 'ICICI Bank', 'Axis Bank', 'Canara Bank',
  'Punjab National Bank', 'Bank of Baroda', 'Union Bank of India', 'Indian Bank',
  'Bank of India', 'Kotak Mahindra Bank', 'IndusInd Bank', 'Yes Bank', 'IDBI Bank',
  'Karnataka Bank', 'Other',
];

const SCAM_APPS = [
  'WhatsApp', 'Telegram', 'PhonePe', 'Google Pay', 'Paytm', 'Phone Call',
  'SMS', 'Email', 'Facebook', 'Instagram', 'Unknown App', 'Other',
];

export const IncidentReportWizard: React.FC<IncidentReportWizardProps> = ({ language }) => {
  const [step, setStep] = useState(0);
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({
    victimName: '', victimPhone: '', victimEmail: '', victimDistrict: '',
    victimBank: '', accountNumber: '', amountLost: '', transactionUTR: '', transactionDate: '',
    scammerUPI: '', scammerPhone: '', scammerApp: '', scammerLinks: '',
    description: '',
  });

  const update = (key: string, value: string) => setForm(prev => ({ ...prev, [key]: value }));

  const canNext = () => {
    if (step === 0) return form.victimName && form.victimPhone && form.victimDistrict;
    if (step === 1) return form.victimBank && form.amountLost;
    if (step === 2) return true;
    if (step === 3) return form.description.length > 10;
    return true;
  };

  const handleSubmit = () => {
    setSubmitted(true);
  };

  const [refId] = useState(() => `RKSHA-${Date.now().toString(36).toUpperCase()}-${Math.random().toString(36).slice(2, 6).toUpperCase()}`);

  const inputClass = 'w-full rounded-lg border border-slate-700 bg-slate-900/80 px-4 py-3 text-sm text-slate-100 placeholder-slate-500 outline-none transition-all focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20';
  const selectClass = 'w-full rounded-lg border border-slate-700 bg-slate-900/80 px-4 py-3 text-sm text-slate-100 outline-none transition-all focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20 appearance-none';
  const labelClass = 'block text-xs font-semibold text-slate-300 mb-1.5';

  return (
    <div className="mx-auto max-w-4xl px-4 py-8 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="mb-6 flex items-center gap-3">
        <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-red-500/20 text-red-400">
          <FileWarning className="h-5 w-5" />
        </span>
        <div>
          <h2 className="text-xl font-bold text-slate-100 sm:text-2xl">
            {language === 'kn' ? 'ಸೈಬರ್ ವಂಚನೆ ಘಟನೆ ವರದಿ' : 'Cyber Fraud Incident Report'}
          </h2>
          <p className="text-xs text-slate-400">
            {language === 'kn'
              ? 'ನಿಮ್ಮ ಘಟನೆಯನ್ನು 1930 NCRP ಗೆ ವರದಿ ಮಾಡಿ — ಗೋಲ್ಡನ್ ಅವರ್ ಒಳಗೆ'
              : 'File your incident report for 1930 NCRP — within the Golden Hour'}
          </p>
        </div>
      </div>

      {submitted ? (
        /* ── Success State ─────────────────────────── */
        <div className="rounded-2xl border border-emerald-500/40 bg-emerald-950/20 p-8 text-center animate-fade-in">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-emerald-500/20">
            <CheckCircle2 className="h-8 w-8 text-emerald-400" />
          </div>
          <h3 className="text-xl font-bold text-emerald-300">
            {language === 'kn' ? 'ವರದಿ ಯಶಸ್ವಿಯಾಗಿ ಸಲ್ಲಿಸಲಾಗಿದೆ!' : 'Report Successfully Filed!'}
          </h3>
          <p className="mt-2 text-sm text-slate-300">
            {language === 'kn' ? 'ನಿಮ್ಮ ಉಲ್ಲೇಖ ಸಂಖ್ಯೆ:' : 'Your Reference ID:'}
          </p>
          <div className="mt-2 inline-block rounded-lg bg-slate-900 px-4 py-2 font-mono text-lg font-bold text-cyan-400">
            {refId}
          </div>
          <div className="mt-6 flex flex-wrap justify-center gap-3">
            <a
              href="tel:1930"
              className="flex items-center gap-2 rounded-lg bg-red-600 px-5 py-2.5 text-sm font-bold text-white shadow-lg shadow-red-600/30 hover:bg-red-500 transition-all"
            >
              <Phone className="h-4 w-4" />
              {language === 'kn' ? '1930 ಕರೆ ಮಾಡಿ' : 'Call 1930 Now'}
            </a>
            <button
              type="button"
              className="flex items-center gap-2 rounded-lg border border-slate-700 bg-slate-900 px-5 py-2.5 text-sm font-semibold text-slate-200 hover:border-cyan-500/50 transition-all"
            >
              <Download className="h-4 w-4 text-cyan-400" />
              {language === 'kn' ? 'PDF ಡೌನ್‌ಲೋಡ್' : 'Download PDF'}
            </button>
          </div>
          <div className="mt-6 rounded-xl border border-slate-800 bg-slate-900/60 p-4 text-left">
            <h4 className="text-xs font-bold uppercase text-slate-400 mb-2">
              {language === 'kn' ? 'ಮುಂದಿನ ಹಂತಗಳು' : 'Next Steps'}
            </h4>
            <ul className="space-y-1.5 text-xs text-slate-300">
              <li>✅ {language === 'kn' ? 'ಈ ಉಲ್ಲೇಖ ID ಯನ್ನು ಸುರಕ್ಷಿತವಾಗಿ ಇಡಿ' : 'Save your reference ID securely'}</li>
              <li>✅ {language === 'kn' ? 'cybercrime.gov.in ನಲ್ಲಿ FIR ಫೈಲ್ ಮಾಡಿ' : 'File an FIR at cybercrime.gov.in'}</li>
              <li>✅ {language === 'kn' ? 'ನಿಮ್ಮ ಬ್ಯಾಂಕ್ ನೋಡಲ್ ಅಧಿಕಾರಿಯನ್ನು ಸಂಪರ್ಕಿಸಿ' : 'Contact your bank\'s nodal officer'}</li>
              <li>✅ {language === 'kn' ? '2 ಗಂಟೆ ಒಳಗೆ ಬ್ಯಾಂಕ್ ಖಾತೆ ಫ್ರೀಜ್ ಮಾಡಿ' : 'Request bank account freeze within 2 hours'}</li>
            </ul>
          </div>
        </div>
      ) : (
        <>
          {/* ── Step Progress ───────────────────────── */}
          <div className="mb-6 flex items-center justify-between gap-1 overflow-x-auto pb-2">
            {STEPS.map((s, i) => {
              const Icon = s.icon;
              const isActive = i === step;
              const isDone = i < step;
              return (
                <button
                  key={i}
                  type="button"
                  onClick={() => i < step && setStep(i)}
                  className={`flex shrink-0 items-center gap-2 rounded-xl px-3 py-2 text-xs font-bold transition-all ${
                    isActive
                      ? 'border border-cyan-500/50 bg-cyan-950/40 text-cyan-300 shadow-md shadow-cyan-500/10'
                      : isDone
                        ? 'border border-emerald-500/30 bg-emerald-950/20 text-emerald-400 cursor-pointer'
                        : 'border border-slate-800 bg-slate-900/40 text-slate-500'
                  }`}
                >
                  <Icon className="h-3.5 w-3.5" />
                  <span className="hidden sm:inline">{language === 'kn' ? s.kn : s.en}</span>
                  <span className="sm:hidden">{i + 1}</span>
                </button>
              );
            })}
          </div>

          {/* ── Form Content ────────────────────────── */}
          <div className="rounded-2xl border border-slate-800 bg-slate-950/90 p-6 backdrop-blur-md animate-fade-in">

            {/* Step 0: Victim Details */}
            {step === 0 && (
              <div className="space-y-4">
                <h3 className="text-sm font-bold text-slate-200 mb-4 flex items-center gap-2">
                  <User className="h-4 w-4 text-cyan-400" />
                  {language === 'kn' ? 'ಸಂತ್ರಸ್ತರ ವಿವರಗಳು' : 'Victim Personal Details'}
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className={labelClass}>{language === 'kn' ? 'ಹೆಸರು *' : 'Full Name *'}</label>
                    <input className={inputClass} placeholder={language === 'kn' ? 'ನಿಮ್ಮ ಹೆಸರು' : 'Enter your full name'} value={form.victimName} onChange={e => update('victimName', e.target.value)} />
                  </div>
                  <div>
                    <label className={labelClass}>{language === 'kn' ? 'ಫೋನ್ ಸಂಖ್ಯೆ *' : 'Phone Number *'}</label>
                    <input className={inputClass} placeholder="+91 XXXXX XXXXX" value={form.victimPhone} onChange={e => update('victimPhone', e.target.value)} />
                  </div>
                  <div>
                    <label className={labelClass}>{language === 'kn' ? 'ಇಮೇಲ್' : 'Email'}</label>
                    <input className={inputClass} type="email" placeholder="email@example.com" value={form.victimEmail} onChange={e => update('victimEmail', e.target.value)} />
                  </div>
                  <div>
                    <label className={labelClass}>{language === 'kn' ? 'ಜಿಲ್ಲೆ *' : 'District *'}</label>
                    <select className={selectClass} value={form.victimDistrict} onChange={e => update('victimDistrict', e.target.value)}>
                      <option value="">{language === 'kn' ? 'ಜಿಲ್ಲೆ ಆಯ್ಕೆಮಾಡಿ' : 'Select district'}</option>
                      {DISTRICTS.map(d => <option key={d} value={d}>{d}</option>)}
                    </select>
                  </div>
                </div>
              </div>
            )}

            {/* Step 1: Financial Details */}
            {step === 1 && (
              <div className="space-y-4">
                <h3 className="text-sm font-bold text-slate-200 mb-4 flex items-center gap-2">
                  <Landmark className="h-4 w-4 text-amber-400" />
                  {language === 'kn' ? 'ಆರ್ಥಿಕ ವಿವರಗಳು' : 'Financial Transaction Details'}
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className={labelClass}>{language === 'kn' ? 'ಬ್ಯಾಂಕ್ *' : 'Bank Name *'}</label>
                    <select className={selectClass} value={form.victimBank} onChange={e => update('victimBank', e.target.value)}>
                      <option value="">{language === 'kn' ? 'ಬ್ಯಾಂಕ್ ಆಯ್ಕೆಮಾಡಿ' : 'Select bank'}</option>
                      {BANKS.map(b => <option key={b} value={b}>{b}</option>)}
                    </select>
                  </div>
                  <div>
                    <label className={labelClass}>{language === 'kn' ? 'ಖಾತೆ ಸಂಖ್ಯೆ' : 'Account Number'}</label>
                    <input className={inputClass} placeholder="XXXX XXXX XXXX" value={form.accountNumber} onChange={e => update('accountNumber', e.target.value)} />
                  </div>
                  <div>
                    <label className={labelClass}>{language === 'kn' ? 'ನಷ್ಟದ ಮೊತ್ತ (₹) *' : 'Amount Lost (₹) *'}</label>
                    <input className={inputClass} type="number" placeholder="₹ 0" value={form.amountLost} onChange={e => update('amountLost', e.target.value)} />
                  </div>
                  <div>
                    <label className={labelClass}>{language === 'kn' ? 'UTR / ವಹಿವಾಟು ID' : 'UTR / Transaction ID'}</label>
                    <input className={inputClass} placeholder="UTR Number" value={form.transactionUTR} onChange={e => update('transactionUTR', e.target.value)} />
                  </div>
                  <div>
                    <label className={labelClass}>{language === 'kn' ? 'ವಹಿವಾಟು ದಿನಾಂಕ' : 'Transaction Date'}</label>
                    <input className={inputClass} type="date" value={form.transactionDate} onChange={e => update('transactionDate', e.target.value)} />
                  </div>
                </div>
              </div>
            )}

            {/* Step 2: Scammer Details */}
            {step === 2 && (
              <div className="space-y-4">
                <h3 className="text-sm font-bold text-slate-200 mb-4 flex items-center gap-2">
                  <UserX className="h-4 w-4 text-red-400" />
                  {language === 'kn' ? 'ವಂಚಕರ ವಿವರಗಳು' : 'Scammer / Suspect Details'}
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className={labelClass}>{language === 'kn' ? 'ವಂಚಕ UPI ID' : 'Scammer UPI ID'}</label>
                    <input className={inputClass} placeholder="scammer@ybl" value={form.scammerUPI} onChange={e => update('scammerUPI', e.target.value)} />
                  </div>
                  <div>
                    <label className={labelClass}>{language === 'kn' ? 'ವಂಚಕ ಫೋನ್' : 'Scammer Phone'}</label>
                    <input className={inputClass} placeholder="+91 XXXXX XXXXX" value={form.scammerPhone} onChange={e => update('scammerPhone', e.target.value)} />
                  </div>
                  <div>
                    <label className={labelClass}>{language === 'kn' ? 'ಬಳಸಿದ ಆ್ಯಪ್' : 'App / Platform Used'}</label>
                    <select className={selectClass} value={form.scammerApp} onChange={e => update('scammerApp', e.target.value)}>
                      <option value="">{language === 'kn' ? 'ಆ್ಯಪ್ ಆಯ್ಕೆಮಾಡಿ' : 'Select app'}</option>
                      {SCAM_APPS.map(a => <option key={a} value={a}>{a}</option>)}
                    </select>
                  </div>
                  <div>
                    <label className={labelClass}>{language === 'kn' ? 'ಅನುಮಾನಾಸ್ಪದ ಲಿಂಕ್‌ಗಳು' : 'Suspicious Links'}</label>
                    <input className={inputClass} placeholder="https://..." value={form.scammerLinks} onChange={e => update('scammerLinks', e.target.value)} />
                  </div>
                </div>
              </div>
            )}

            {/* Step 3: Description */}
            {step === 3 && (
              <div className="space-y-4">
                <h3 className="text-sm font-bold text-slate-200 mb-4 flex items-center gap-2">
                  <FileText className="h-4 w-4 text-purple-400" />
                  {language === 'kn' ? 'ಘಟನೆಯ ವಿವರಣೆ' : 'Incident Description'}
                </h3>
                <textarea
                  className="w-full rounded-lg border border-slate-700 bg-slate-900/80 px-4 py-3 text-sm text-slate-100 placeholder-slate-500 outline-none transition-all focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20 min-h-[180px] resize-y font-mono"
                  placeholder={language === 'kn'
                    ? 'ವಂಚನೆ ಹೇಗೆ ನಡೆಯಿತು ಎಂದು ವಿವರವಾಗಿ ಬರೆಯಿರಿ...'
                    : 'Describe in detail how the scam occurred — include timeline, messages received, actions taken...'}
                  value={form.description}
                  onChange={e => update('description', e.target.value)}
                />
                <p className="text-[10px] text-slate-500">
                  {form.description.length} {language === 'kn' ? 'ಅಕ್ಷರಗಳು (ಕನಿಷ್ಠ 10)' : 'characters (minimum 10)'}
                </p>
              </div>
            )}

            {/* Step 4: Review */}
            {step === 4 && (
              <div className="space-y-4">
                <h3 className="text-sm font-bold text-slate-200 mb-4 flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-emerald-400" />
                  {language === 'kn' ? 'ಪರಿಶೀಲನೆ & ಸಲ್ಲಿಸಿ' : 'Review & Submit'}
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {[
                    { label: language === 'kn' ? 'ಹೆಸರು' : 'Name', value: form.victimName },
                    { label: language === 'kn' ? 'ಫೋನ್' : 'Phone', value: form.victimPhone },
                    { label: language === 'kn' ? 'ಜಿಲ್ಲೆ' : 'District', value: form.victimDistrict },
                    { label: language === 'kn' ? 'ಬ್ಯಾಂಕ್' : 'Bank', value: form.victimBank },
                    { label: language === 'kn' ? 'ನಷ್ಟದ ಮೊತ್ತ' : 'Amount Lost', value: form.amountLost ? `₹${Number(form.amountLost).toLocaleString()}` : '—' },
                    { label: 'UTR', value: form.transactionUTR || '—' },
                    { label: language === 'kn' ? 'ವಂಚಕ UPI' : 'Scammer UPI', value: form.scammerUPI || '—' },
                    { label: language === 'kn' ? 'ಆ್ಯಪ್' : 'Platform', value: form.scammerApp || '—' },
                  ].map((item, i) => (
                    <div key={i} className="rounded-lg border border-slate-800 bg-slate-900/60 px-3 py-2">
                      <div className="text-[10px] font-semibold text-slate-500 uppercase">{item.label}</div>
                      <div className="text-sm font-medium text-slate-200 truncate">{item.value || '—'}</div>
                    </div>
                  ))}
                </div>
                {form.description && (
                  <div className="rounded-lg border border-slate-800 bg-slate-900/60 px-3 py-2 mt-2">
                    <div className="text-[10px] font-semibold text-slate-500 uppercase mb-1">{language === 'kn' ? 'ವಿವರಣೆ' : 'Description'}</div>
                    <div className="text-xs text-slate-300 line-clamp-4">{form.description}</div>
                  </div>
                )}
                <div className="rounded-xl border border-amber-500/30 bg-amber-950/20 p-3 mt-2">
                  <p className="text-xs text-amber-300">
                    ⚠️ {language === 'kn'
                      ? 'ಸಲ್ಲಿಸುವ ಮೊದಲು ಎಲ್ಲಾ ವಿವರಗಳನ್ನು ಪರಿಶೀಲಿಸಿ. ತಪ್ಪು ಮಾಹಿತಿ ತನಿಖೆಯನ್ನು ವಿಳಂಬಗೊಳಿಸಬಹುದು.'
                      : 'Please verify all details before submitting. Incorrect information may delay the investigation.'}
                  </p>
                </div>
              </div>
            )}

            {/* ── Navigation Buttons ─────────────────── */}
            <div className="mt-6 flex items-center justify-between border-t border-slate-800 pt-4">
              <button
                type="button"
                onClick={() => setStep(s => s - 1)}
                disabled={step === 0}
                className="flex items-center gap-1.5 rounded-lg border border-slate-700 bg-slate-900 px-4 py-2 text-xs font-semibold text-slate-300 transition-all hover:border-slate-600 disabled:opacity-30 disabled:cursor-not-allowed"
              >
                <ChevronLeft className="h-3.5 w-3.5" />
                {language === 'kn' ? 'ಹಿಂದೆ' : 'Back'}
              </button>

              <div className="text-[10px] font-mono text-slate-500">
                {step + 1} / {STEPS.length}
              </div>

              {step < 4 ? (
                <button
                  type="button"
                  onClick={() => setStep(s => s + 1)}
                  disabled={!canNext()}
                  className="flex items-center gap-1.5 rounded-lg bg-gradient-to-r from-cyan-500 to-teal-600 px-5 py-2 text-xs font-bold text-slate-950 shadow-lg shadow-cyan-500/25 transition-all hover:scale-105 disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:scale-100"
                >
                  {language === 'kn' ? 'ಮುಂದೆ' : 'Next'}
                  <ChevronRight className="h-3.5 w-3.5" />
                </button>
              ) : (
                <button
                  type="button"
                  onClick={handleSubmit}
                  className="flex items-center gap-1.5 rounded-lg bg-gradient-to-r from-red-500 to-rose-600 px-5 py-2 text-xs font-bold text-white shadow-lg shadow-red-500/25 transition-all hover:scale-105 animate-pulse"
                >
                  <Send className="h-3.5 w-3.5" />
                  {language === 'kn' ? 'ವರದಿ ಸಲ್ಲಿಸಿ' : 'Submit Report'}
                </button>
              )}
            </div>
          </div>
        </>
      )}
    </div>
  );
};
