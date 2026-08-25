import React, { useState } from 'react';
import {
  Globe,
  AlertTriangle,
  Lock,
  Unlock,
  Zap,
  RefreshCw,
} from 'lucide-react';
import type { Language, UrlAnalysis } from '../types';
import { simulateUrlAnalysis } from '../mockData';

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
      const res = await simulateUrlAnalysis(url);
      setResult(res);
    } finally {
      setIsScanning(false);
    }
  };

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="mb-6 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-teal-500/20 text-teal-400">
              <Globe className="h-4 w-4" />
            </span>
            <h2 className="text-xl font-bold text-slate-100 sm:text-2xl">
              {language === 'kn'
                ? 'URL & ಡೊಮೇನ್ ರೆಪ್ಯುಟೇಶನ್ ಇನ್‌ಸ್ಪೆಕ್ಟರ್'
                : 'Instant URL & Domain Reputation Checker'}
            </h2>
          </div>
          <p className="mt-1 text-xs text-slate-400 sm:text-sm">
            {language === 'kn'
              ? 'ಪ್ಯೂನಿಕೋಡ್ ಅಟ್ಯಾಕ್, ನಕಲಿ .top / .xyz ಡೊಮೇನ್‌ಗಳು ಮತ್ತು ಬ್ರ್ಯಾಂಡ್ ವಂಚನೆ ಲಿಂಕ್‌ಗಳನ್ನು ಪರಿಶೀಲಿಸಿ.'
              : 'Analyze punycode spoofing, rogue top-level domains, missing SSL certs, and brand impersonation.'}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
        {/* Left: URL Input & Presets (6 cols) */}
        <div className="lg:col-span-6 flex flex-col gap-4">
          <div className="rounded-2xl border border-slate-800 bg-slate-900/80 p-5 backdrop-blur-md">
            <label htmlFor="url-threat-input" className="text-xs font-bold uppercase tracking-wider text-slate-300 block mb-2">
              {language === 'kn' ? 'ಪರಿಶೀಲಿಸಲು URL ನಮೂದಿಸಿ:' : 'Enter Suspicious URL / Web Link:'}
            </label>

            <div className="flex gap-2">
              <input
                id="url-threat-input"
                type="text"
                value={urlInput}
                onChange={(e) => setUrlInput(e.target.value)}
                placeholder="http://example-fake-bank.top"
                className="flex-1 rounded-xl border border-slate-800 bg-slate-950 p-3 font-mono text-xs text-slate-200 focus:border-cyan-500 focus:outline-none"
              />
              <button
                type="button"
                onClick={() => handleScan()}
                disabled={isScanning || !urlInput.trim()}
                className="flex items-center gap-1.5 rounded-xl bg-cyan-500 px-5 py-2 text-xs font-bold text-slate-950 shadow-md hover:bg-cyan-400 disabled:opacity-50"
              >
                {isScanning ? (
                  <RefreshCw className="h-4 w-4 animate-spin" />
                ) : (
                  <Zap className="h-4 w-4" />
                )}
                <span>{language === 'kn' ? 'ಸ್ಕ್ಯಾನ್' : 'Scan'}</span>
              </button>
            </div>

            {/* Quick Test Links */}
            <div className="mt-4 pt-3 border-t border-slate-800">
              <div className="text-[10px] font-bold uppercase text-slate-400 mb-2">
                Click Sample Threats to Test:
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
                    className="rounded-lg border border-slate-800 bg-slate-950 px-2.5 py-1 font-mono text-[10px] text-cyan-300 hover:border-cyan-500"
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
            <div className="rounded-2xl border border-slate-800 bg-slate-900/80 p-5 backdrop-blur-md">
              <div className="flex items-center justify-between border-b border-slate-800 pb-3 mb-4">
                <div>
                  <span className="text-[10px] font-bold uppercase text-slate-400 font-mono">
                    TARGET DOMAIN
                  </span>
                  <div className="text-sm font-bold text-slate-100 font-mono mt-0.5 break-all">
                    {result.domain}
                  </div>
                </div>

                <span
                  className={`rounded-xl border px-3 py-1 font-mono text-xs font-bold ${
                    result.threatLevel === 'CRITICAL'
                      ? 'border-red-500/50 bg-red-950/60 text-red-300'
                      : result.threatLevel === 'HIGH'
                      ? 'border-amber-500/50 bg-amber-950/60 text-amber-300'
                      : 'border-emerald-500/50 bg-emerald-950/60 text-emerald-300'
                  }`}
                >
                  {result.threatLevel} ({result.riskScore}/100)
                </span>
              </div>

              <div className="grid grid-cols-2 gap-2 font-mono text-xs mb-4">
                <div className="rounded-lg bg-slate-950/60 p-2.5 border border-slate-800">
                  <span className="text-[10px] text-slate-500 block">TLD EXTENSION</span>
                  <span className="font-bold text-slate-200">.{result.tld}</span>
                </div>

                <div className="rounded-lg bg-slate-950/60 p-2.5 border border-slate-800">
                  <span className="text-[10px] text-slate-500 block">DOMAIN AGE</span>
                  <span className="font-bold text-slate-200">{result.registrationAge}</span>
                </div>

                <div className="rounded-lg bg-slate-950/60 p-2.5 border border-slate-800">
                  <span className="text-[10px] text-slate-500 block">SSL ENCRYPTION</span>
                  <span className={`font-bold flex items-center gap-1 ${result.isHttps ? 'text-emerald-400' : 'text-red-400'}`}>
                    {result.isHttps ? <Lock className="h-3 w-3" /> : <Unlock className="h-3 w-3" />}
                    {result.isHttps ? 'HTTPS Valid' : 'No SSL / HTTP'}
                  </span>
                </div>

                <div className="rounded-lg bg-slate-950/60 p-2.5 border border-slate-800">
                  <span className="text-[10px] text-slate-500 block">HOMOGRAPH ATTACK</span>
                  <span className="font-bold text-slate-200">
                    {result.isPunycode ? '⚠️ Punycode Detected' : 'Clean Character Set'}
                  </span>
                </div>
              </div>

              {/* Flags */}
              <div className="space-y-1.5 border-t border-slate-800 pt-3">
                <div className="text-[10px] font-bold uppercase text-slate-400">
                  Reputation Flags Identified:
                </div>
                {result.flags.map((flag, idx) => (
                  <div
                    key={idx}
                    className="flex items-center gap-2 text-xs text-amber-300 font-mono"
                  >
                    <AlertTriangle className="h-3 w-3 shrink-0 text-amber-400" />
                    <span>{flag}</span>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div className="flex h-full min-h-[220px] flex-col items-center justify-center rounded-2xl border border-dashed border-slate-800 bg-slate-900/30 p-6 text-center">
              <Globe className="h-8 w-8 text-slate-600 mb-2" />
              <span className="text-xs text-slate-400">
                Enter domain name to evaluate certificate authenticity & TLD risk.
              </span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
