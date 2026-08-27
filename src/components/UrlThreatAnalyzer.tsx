import React, { useState } from 'react';
import {
  Globe,
  AlertTriangle,
  Lock,
  Unlock,
  Zap,
  RefreshCw,
  ShieldAlert,
  ShieldCheck,
} from 'lucide-react';
import type { Language, UrlAnalysis } from '../types';
import { api } from '../api';

interface UrlThreatAnalyzerProps {
  language: Language;
}

export const UrlThreatAnalyzer: React.FC<UrlThreatAnalyzerProps> = ({
  language,
}) => {
  const [urlInput, setUrlInput] = useState('http://sbi-yono-update.top/login');
  const [isScanning, setIsScanning] = useState(false);
  const [result, setResult] = useState<UrlAnalysis | null>(null);

  const handleScan = async (targetUrl?: string) => {
    const url = targetUrl || urlInput;
    if (!url.trim()) return;

    setIsScanning(true);
    setResult(null);

    try {
      const res = await api.scanUrl(url);
      setResult(res);
    } finally {
      setIsScanning(false);
    }
  };

  const getThreatStyle = (level: string) => {
    switch (level) {
      case 'CRITICAL':
        return {
          badge: 'border-rose-500/40 bg-rose-500/15 text-rose-300',
          stroke: '#fb7185',
          text: 'text-rose-400',
        };
      case 'HIGH':
        return {
          badge: 'border-amber-500/40 bg-amber-500/15 text-amber-300',
          stroke: '#fbbf24',
          text: 'text-amber-400',
        };
      case 'MEDIUM':
        return {
          badge: 'border-sky-400/40 bg-sky-500/15 text-sky-300',
          stroke: '#38bdf8',
          text: 'text-sky-400',
        };
      default:
        return {
          badge: 'border-emerald-500/40 bg-emerald-500/15 text-emerald-300',
          stroke: '#34d399',
          text: 'text-emerald-400',
        };
    }
  };

  const threatStyle = result ? getThreatStyle(result.threatLevel) : getThreatStyle('SAFE');
  const score = result ? result.riskScore : 0;
  const radius = 34;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (score / 100) * circumference;

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="mb-6 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <div className="flex items-center gap-2.5">
            <span className="flex h-8 w-8 items-center justify-center rounded-xl bg-white/[0.05] text-sky-400 border border-white/10">
              <Globe className="h-4 w-4" />
            </span>
            <h2 className="text-xl font-bold font-heading text-white sm:text-2xl">
              {language === 'kn'
                ? 'URL & ಡೊಮೇನ್ ರೆಪ್ಯುಟೇಶನ್ ಇನ್‌ಸ್ಪೆಕ್ಟರ್'
                : 'Instant URL & Domain Reputation Checker'}
            </h2>
          </div>
          <p className="mt-1 text-xs text-slate-400 sm:text-sm font-sans">
            {language === 'kn'
              ? 'ಪ್ಯೂನಿಕೋಡ್ ಅಟ್ಯಾಕ್, ನಕಲಿ .top / .xyz ಡೊಮೇನ್‌ಗಳು ಮತ್ತು ಬ್ರ್ಯಾಂಡ್ ವಂಚನೆ ಲಿಂಕ್‌ಗಳನ್ನು ಪರಿಶೀಲಿಸಿ.'
              : 'Analyze punycode spoofing, rogue top-level domains, missing SSL certs, and brand impersonation.'}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
        {/* Left: URL Input & Presets (6 cols) */}
        <div className="lg:col-span-6 flex flex-col gap-4">
          <div className="figma-card-static p-5 sm:p-6">
            <label htmlFor="url-threat-input" className="text-xs font-bold uppercase tracking-wider text-slate-300 block mb-2 font-heading">
              {language === 'kn' ? 'ಪರಿಶೀಲಿಸಲು URL ನಮೂದಿಸಿ:' : 'Enter Suspicious URL / Web Link:'}
            </label>

            <div className="flex gap-2.5">
              <input
                id="url-threat-input"
                type="text"
                value={urlInput}
                onChange={(e) => setUrlInput(e.target.value)}
                placeholder="http://example-fake-bank.top"
                className="flex-1 rounded-full border border-white/10 bg-[#0a0d14] px-4 py-3 font-mono text-xs text-white focus:border-sky-400 focus:outline-none focus:ring-2 focus:ring-sky-400/20 transition-all"
              />
              <button
                type="button"
                onClick={() => handleScan()}
                disabled={isScanning || !urlInput.trim()}
                className="flex items-center gap-1.5 rounded-full bg-white px-5 py-2.5 text-xs font-bold font-heading text-slate-950 shadow-md shadow-white/15 hover:bg-sky-50 disabled:opacity-50 transition-all cursor-pointer"
              >
                {isScanning ? (
                  <RefreshCw className="h-4 w-4 animate-spin text-slate-950" />
                ) : (
                  <Zap className="h-4 w-4 text-sky-600" />
                )}
                <span>{language === 'kn' ? 'ಸ್ಕ್ಯಾನ್' : 'Scan URL'}</span>
              </button>
            </div>

            {/* Quick Test Links */}
            <div className="mt-5 pt-4 border-t border-white/[0.08]">
              <div className="text-[10px] font-bold uppercase text-slate-400 mb-2.5 font-heading">
                Click Sample Threat Links to Test:
              </div>
              <div className="flex flex-wrap gap-2">
                {[
                  'http://sbi-yono-update.top/login',
                  'https://bescom-billpay.xyz/pay',
                  'http://fedex-parcel-clearance.click/track',
                  'https://www.onlinesbi.sbi/',
                ].map((sample, i) => (
                  <button
                    key={i}
                    type="button"
                    onClick={() => {
                      setUrlInput(sample);
                      handleScan(sample);
                    }}
                    className="rounded-full border border-white/10 bg-white/[0.03] px-3 py-1.5 font-mono text-[10.5px] text-sky-300 hover:border-sky-400/40 hover:bg-white/[0.07] transition-all cursor-pointer"
                  >
                    {sample}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Right: URL Analysis Result (6 cols) */}
        <div className="lg:col-span-6">
          {result ? (
            <div className="figma-card-static p-5 sm:p-6 backdrop-blur-2xl">
              <div className="flex items-center justify-between border-b border-white/[0.08] pb-4 mb-4">
                <div>
                  <span className="text-[10px] font-bold uppercase text-slate-400 font-mono">
                    TARGET DOMAIN
                  </span>
                  <div className="text-sm font-bold text-white font-mono mt-0.5 break-all">
                    {result.domain}
                  </div>
                  <span className={`inline-block mt-1 px-3 py-0.5 rounded-full text-[10px] font-bold border ${threatStyle.badge}`}>
                    {result.threatLevel} LEVEL
                  </span>
                </div>

                {/* Score Gauge */}
                <div className="relative h-18 w-18 flex items-center justify-center">
                  <svg className="h-18 w-18 -rotate-90" viewBox="0 0 90 90">
                    <circle
                      className="text-white/[0.08]"
                      strokeWidth="7"
                      stroke="currentColor"
                      fill="transparent"
                      r={radius}
                      cx="45"
                      cy="45"
                    />
                    <circle
                      stroke={threatStyle.stroke}
                      strokeWidth="7"
                      strokeDasharray={circumference}
                      strokeDashoffset={strokeDashoffset}
                      strokeLinecap="round"
                      fill="transparent"
                      r={radius}
                      cx="45"
                      cy="45"
                      style={{ transition: 'stroke-dashoffset 0.8s cubic-bezier(0.16, 1, 0.3, 1)' }}
                    />
                  </svg>
                  <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                    <span className="text-base font-black font-mono text-white">
                      {result.riskScore}
                    </span>
                    <span className="text-[8px] text-slate-400 font-mono">/100</span>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2.5 font-mono text-xs mb-4">
                <div className="rounded-2xl bg-white/[0.03] p-3 border border-white/[0.08]">
                  <span className="text-[10px] text-slate-500 block">TLD EXTENSION</span>
                  <span className="font-bold text-white mt-0.5 block">
                    {result.tld.startsWith('.') ? result.tld : `.${result.tld}`}
                  </span>
                </div>

                <div className="rounded-2xl bg-white/[0.03] p-3 border border-white/[0.08]">
                  <span className="text-[10px] text-slate-500 block">SSL ENCRYPTION</span>
                  <span className={`font-bold flex items-center gap-1.5 mt-0.5 ${result.isHttps ? 'text-emerald-400' : 'text-rose-400'}`}>
                    {result.isHttps ? <Lock className="h-3.5 w-3.5" /> : <Unlock className="h-3.5 w-3.5" />}
                    {result.isHttps ? 'HTTPS Valid' : 'No SSL / HTTP'}
                  </span>
                </div>

                <div className="rounded-2xl bg-white/[0.03] p-3 border border-white/[0.08]">
                  <span className="text-[10px] text-slate-500 block">HOMOGRAPH CHECK</span>
                  <span className="font-bold text-white mt-0.5 block">
                    {result.isPunycode ? '⚠️ Punycode Detected' : 'Clean Character Set'}
                  </span>
                </div>

                <div className="rounded-2xl bg-white/[0.03] p-3 border border-white/[0.08]">
                  <span className="text-[10px] text-slate-500 block">INSPECTION METHOD</span>
                  <span className="font-bold text-sky-400 mt-0.5 block">15 Lexical Heuristics</span>
                </div>
              </div>

              {/* Flags */}
              <div className="space-y-1.5 border-t border-white/[0.08] pt-3">
                <div className="text-[10px] font-bold uppercase text-slate-400 font-heading">
                  Reputation Flags Identified:
                </div>
                {result.flags.length > 0 ? (
                  result.flags.map((flag, idx) => (
                    <div
                      key={idx}
                      className="flex items-center gap-2 text-xs text-amber-300 font-mono rounded-xl bg-amber-500/10 p-2.5 border border-amber-500/20"
                    >
                      <AlertTriangle className="h-3.5 w-3.5 shrink-0 text-amber-400" />
                      <span>{flag}</span>
                    </div>
                  ))
                ) : (
                  <div className="flex items-center gap-2 text-xs text-emerald-400 font-mono p-1">
                    <ShieldCheck className="h-4 w-4" />
                    <span>No malicious flags identified.</span>
                  </div>
                )}
              </div>
            </div>
          ) : (
            <div className="flex h-full min-h-[240px] flex-col items-center justify-center rounded-2xl border border-dashed border-white/10 bg-white/[0.01] p-6 text-center">
              <ShieldAlert className="h-10 w-10 text-slate-600 mb-2" />
              <span className="text-xs text-slate-400 max-w-xs font-sans">
                Enter a domain or link on the left to evaluate TLD risk, spoofing patterns, and SSL status.
              </span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default UrlThreatAnalyzer;
