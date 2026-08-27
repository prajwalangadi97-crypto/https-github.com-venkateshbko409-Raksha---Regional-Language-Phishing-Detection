import React, { useState, useEffect, useCallback } from 'react';
import {
  ShieldOff,
  Search,
  AlertTriangle,
  CheckCircle2,
  Lock,
  Mail,
  Phone,
  Eye,
  Calendar,
  Database,
  Loader2,
} from 'lucide-react';
import type { Language, BreachRecord, ThreatLevel } from '../types';
import { api } from '../api';

interface DarkWebLeakCheckerProps {
  language: Language;
}

const SEVERITY_STYLES: Record<ThreatLevel, { bg: string; text: string; border: string }> = {
  CRITICAL: { bg: 'bg-red-950/30', text: 'text-red-400', border: 'border-red-500/40' },
  HIGH: { bg: 'bg-amber-950/20', text: 'text-amber-400', border: 'border-amber-500/40' },
  MEDIUM: { bg: 'bg-cyan-950/20', text: 'text-cyan-400', border: 'border-cyan-500/30' },
  LOW: { bg: 'bg-slate-900/50', text: 'text-slate-400', border: 'border-slate-700' },
  SAFE: { bg: 'bg-emerald-950/20', text: 'text-emerald-400', border: 'border-emerald-500/30' },
};

export const DarkWebLeakChecker: React.FC<DarkWebLeakCheckerProps> = ({ language }) => {
  const [input, setInput] = useState('');
  const [scanning, setScanning] = useState(false);
  const [scanProgress, setScanProgress] = useState(0);
  const [results, setResults] = useState<BreachRecord[] | null>(null);
  const [scanType, setScanType] = useState<'email' | 'phone'>('email');

  const runScan = useCallback(() => {
    if (!input.trim()) return;
    setScanning(true);
    setScanProgress(0);
    setResults(null);
  }, [input]);

  useEffect(() => {
    if (!scanning) return;
    const interval = setInterval(() => {
      setScanProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          // Call API when progress bar finishes
          api.checkBreach(input, scanType).then((data: any) => {
            setResults(data.breaches || []);
            setScanning(false);
          }).catch(() => {
            setResults([]);
            setScanning(false);
          });
          return 100;
        }
        return prev + Math.random() * 8 + 2;
      });
    }, 120);
    return () => clearInterval(interval);
  }, [scanning, input, scanType]);

  const riskScore = results ? Math.min(100, results.length * 28 + (results.some(r => r.severity === 'CRITICAL') ? 20 : 0)) : 0;

  return (
    <div className="mx-auto max-w-4xl px-4 py-8 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="mb-6 flex items-center gap-3">
        <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-purple-500/20 text-purple-400">
          <ShieldOff className="h-5 w-5" />
        </span>
        <div>
          <h2 className="text-xl font-bold text-slate-100 sm:text-2xl">
            {language === 'kn' ? 'ಡಾರ್ಕ್ ವೆಬ್ ಸೋರಿಕೆ ಪರೀಕ್ಷೆ' : 'Dark Web Leak Checker'}
          </h2>
          <p className="text-xs text-slate-400">
            {language === 'kn'
              ? 'ನಿಮ್ಮ ಇಮೇಲ್ ಅಥವಾ ಫೋನ್ ಸಂಖ್ಯೆ ಡೇಟಾ ಉಲ್ಲಂಘನೆಯಲ್ಲಿ ಇದೆಯೇ ಪರಿಶೀಲಿಸಿ'
              : 'Check if your email or phone has been exposed in known data breaches'}
          </p>
        </div>
      </div>

      {/* Input */}
      <div className="rounded-2xl border border-slate-800 bg-slate-950/90 p-6 backdrop-blur-md">
        <div className="flex items-center gap-2 mb-4">
          <button
            type="button"
            onClick={() => { setScanType('email'); setInput(''); setResults(null); }}
            className={`flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-bold transition-all ${
              scanType === 'email' ? 'bg-cyan-500 text-slate-950' : 'border border-slate-700 text-slate-400 hover:text-slate-200'
            }`}
          >
            <Mail className="h-3.5 w-3.5" />
            Email
          </button>
          <button
            type="button"
            onClick={() => { setScanType('phone'); setInput(''); setResults(null); }}
            className={`flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-bold transition-all ${
              scanType === 'phone' ? 'bg-cyan-500 text-slate-950' : 'border border-slate-700 text-slate-400 hover:text-slate-200'
            }`}
          >
            <Phone className="h-3.5 w-3.5" />
            Phone
          </button>
        </div>

        <div className="flex gap-3">
          <div className="relative flex-1">
            {scanType === 'email' ? (
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-500" />
            ) : (
              <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-500" />
            )}
            <input
              className="w-full rounded-lg border border-slate-700 bg-slate-900/80 pl-10 pr-4 py-3 text-sm text-slate-100 placeholder-slate-500 outline-none focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20"
              placeholder={scanType === 'email' ? 'your.email@example.com' : '+91 XXXXX XXXXX'}
              value={input}
              onChange={e => { setInput(e.target.value); setResults(null); }}
              onKeyDown={e => e.key === 'Enter' && runScan()}
            />
          </div>
          <button
            type="button"
            onClick={runScan}
            disabled={scanning || !input.trim()}
            className="flex items-center gap-2 rounded-lg bg-gradient-to-r from-purple-500 to-fuchsia-600 px-5 py-3 text-sm font-bold text-white shadow-lg shadow-purple-500/25 transition-all hover:scale-105 disabled:opacity-40 disabled:hover:scale-100"
          >
            {scanning ? <Loader2 className="h-4 w-4 animate-spin" /> : <Search className="h-4 w-4" />}
            {language === 'kn' ? 'ಸ್ಕ್ಯಾನ್' : 'Scan'}
          </button>
        </div>

        {/* Progress */}
        {scanning && (
          <div className="mt-4 animate-fade-in">
            <div className="flex items-center justify-between text-[10px] font-mono text-slate-400 mb-1.5">
              <span>{language === 'kn' ? 'ಡಾರ್ಕ್ ವೆಬ್ ಡೇಟಾಬೇಸ್ ಸ್ಕ್ಯಾನ್ ಮಾಡಲಾಗುತ್ತಿದೆ...' : 'Scanning dark web databases...'}</span>
              <span>{Math.min(100, Math.round(scanProgress))}%</span>
            </div>
            <div className="h-2 rounded-full bg-slate-800 overflow-hidden">
              <div
                className="h-full rounded-full bg-gradient-to-r from-purple-500 to-fuchsia-500 transition-all duration-200"
                style={{ width: `${Math.min(100, scanProgress)}%` }}
              />
            </div>
            <div className="mt-2 flex items-center gap-2 text-[10px] text-slate-500 font-mono">
              <Database className="h-3 w-3 animate-pulse" />
              <span>{language === 'kn' ? 'HIBP • IntelX • DeHashed • Snusbase ಪರೀಕ್ಷಿಸಲಾಗುತ್ತಿದೆ' : 'Querying HIBP • IntelX • DeHashed • Snusbase'}</span>
            </div>
          </div>
        )}

        {/* Results */}
        {results !== null && !scanning && (
          <div className="mt-6 animate-fade-in">
            {results.length === 0 ? (
              <div className="rounded-xl border border-emerald-500/40 bg-emerald-950/20 p-6 text-center">
                <CheckCircle2 className="mx-auto h-10 w-10 text-emerald-400 mb-3" />
                <h3 className="text-lg font-bold text-emerald-300">
                  {language === 'kn' ? 'ಯಾವುದೇ ಸೋರಿಕೆ ಕಂಡುಬಂದಿಲ್ಲ!' : 'No Breaches Found!'}
                </h3>
                <p className="text-xs text-slate-400 mt-1">
                  {language === 'kn' ? 'ನಿಮ್ಮ ಡೇಟಾ ತಿಳಿದ ಉಲ್ಲಂಘನೆಗಳಲ್ಲಿ ಕಂಡುಬಂದಿಲ್ಲ' : 'Your data was not found in any known breach databases'}
                </p>
              </div>
            ) : (
              <>
                {/* Risk Score */}
                <div className="flex items-center justify-between mb-4 rounded-xl border border-red-500/30 bg-red-950/20 p-4">
                  <div>
                    <h3 className="text-sm font-bold text-red-300">
                      <AlertTriangle className="inline h-4 w-4 mr-1.5" />
                      {results.length} {language === 'kn' ? 'ಉಲ್ಲಂಘನೆಗಳಲ್ಲಿ ಕಂಡುಬಂದಿದೆ' : 'Breaches Found'}
                    </h3>
                    <p className="text-xs text-slate-400 mt-0.5">
                      {language === 'kn' ? 'ನಿಮ್ಮ ಡೇಟಾ ಅಪಾಯದಲ್ಲಿದೆ — ತಕ್ಷಣ ಕ್ರಮ ಕೈಗೊಳ್ಳಿ' : 'Your data is at risk — take immediate action'}
                    </p>
                  </div>
                  <div className="text-right">
                    <div className={`text-2xl font-mono font-black ${riskScore >= 70 ? 'text-red-400' : riskScore >= 40 ? 'text-amber-400' : 'text-cyan-400'}`}>
                      {riskScore}
                    </div>
                    <div className="text-[10px] text-slate-500">{language === 'kn' ? 'ಅಪಾಯ ಸ್ಕೋರ್' : 'RISK SCORE'}</div>
                  </div>
                </div>

                {/* Breach List */}
                <div className="space-y-3">
                  {results.map((breach, i) => {
                    const style = SEVERITY_STYLES[breach.severity];
                    return (
                      <div key={i} className={`rounded-xl border ${style.border} ${style.bg} p-4 animate-slide-up`} style={{ animationDelay: `${i * 100}ms` }}>
                        <div className="flex items-start justify-between gap-3">
                          <div>
                            <div className="flex items-center gap-2">
                              <h4 className="text-sm font-bold text-slate-200">{breach.breachName}</h4>
                              <span className={`rounded border px-1.5 py-0.5 text-[9px] font-bold ${style.text} ${style.border}`}>
                                {breach.severity}
                              </span>
                            </div>
                            <p className="mt-1 text-xs text-slate-400">
                              {language === 'kn' ? breach.descriptionKn : breach.description}
                            </p>
                          </div>
                          <div className="text-right shrink-0">
                            <div className="flex items-center gap-1 text-[10px] text-slate-500">
                              <Calendar className="h-3 w-3" />
                              {breach.breachDate}
                            </div>
                            <div className="text-[10px] text-slate-500 mt-0.5">
                              {(breach.recordCount / 1000000).toFixed(1)}M {language === 'kn' ? 'ದಾಖಲೆಗಳು' : 'records'}
                            </div>
                          </div>
                        </div>
                        <div className="mt-2 flex flex-wrap gap-1.5">
                          {breach.dataExposed.map(d => (
                            <span key={d} className="flex items-center gap-1 rounded-md bg-slate-800/80 px-2 py-0.5 text-[10px] font-semibold text-slate-300">
                              <Eye className="h-2.5 w-2.5 text-red-400" />
                              {d}
                            </span>
                          ))}
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* Recommendations */}
                <div className="mt-4 rounded-xl border border-cyan-500/30 bg-cyan-950/20 p-4">
                  <h4 className="text-xs font-bold uppercase text-cyan-300 mb-2 flex items-center gap-1.5">
                    <Lock className="h-3.5 w-3.5" />
                    {language === 'kn' ? 'ತಕ್ಷಣದ ಕ್ರಮಗಳು' : 'Immediate Actions Required'}
                  </h4>
                  <ul className="space-y-1 text-xs text-slate-300">
                    <li>🔑 {language === 'kn' ? 'ಎಲ್ಲಾ ಪ್ರಭಾವಿತ ಖಾತೆಗಳ ಪಾಸ್‌ವರ್ಡ್ ಬದಲಾಯಿಸಿ' : 'Change passwords on all affected accounts immediately'}</li>
                    <li>🛡️ {language === 'kn' ? '2-ಫ್ಯಾಕ್ಟರ್ ಅಧಿಕೃತತೆ ಸಕ್ರಿಯಗೊಳಿಸಿ' : 'Enable Two-Factor Authentication (2FA) on all accounts'}</li>
                    <li>💳 {language === 'kn' ? 'ಕ್ರೆಡಿಟ್ / ಡೆಬಿಟ್ ಕಾರ್ಡ್ ವಹಿವಾಟುಗಳನ್ನು ಮೇಲ್ವಿಚಾರಣೆ ಮಾಡಿ' : 'Monitor credit/debit card transactions for unauthorized activity'}</li>
                    <li>📧 {language === 'kn' ? 'ಫಿಶಿಂಗ್ ಇಮೇಲ್‌ಗಳಿಗೆ ಎಚ್ಚರಿಕೆಯಿಂದ ಇರಿ' : 'Be alert for targeted phishing emails using your leaked data'}</li>
                    <li>🏦 {language === 'kn' ? 'ಆಧಾರ್ ಸೋರಿಕೆ ಇದ್ದರೆ UIDAI ಗೆ ವರದಿ ಮಾಡಿ' : 'If Aadhaar is exposed, report to UIDAI and lock biometrics'}</li>
                  </ul>
                </div>
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
