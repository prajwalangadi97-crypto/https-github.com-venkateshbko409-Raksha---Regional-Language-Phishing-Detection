import React, { useState, useEffect, useCallback } from 'react';
import {
  QrCode,
  Upload,
  ShieldAlert,
  ExternalLink,
  ArrowRight,
  Globe,
  AlertTriangle,
  CheckCircle2,
  Loader2,
  Link2,
} from 'lucide-react';
import type { Language, QRScanResult, ThreatLevel } from '../types';

interface QRThreatScannerProps {
  language: Language;
}

const SEVERITY_STYLES: Record<ThreatLevel, string> = {
  CRITICAL: 'border-red-500/50 bg-red-950/30 text-red-300',
  HIGH: 'border-amber-500/40 bg-amber-950/20 text-amber-300',
  MEDIUM: 'border-cyan-500/30 bg-cyan-950/20 text-cyan-300',
  LOW: 'border-slate-700 bg-slate-900/50 text-slate-300',
  SAFE: 'border-emerald-500/30 bg-emerald-950/20 text-emerald-300',
};

const MOCK_RESULTS: QRScanResult[] = [
  {
    decodedUrl: 'https://sbi-yono-update.top/verify?uid=XXXX',
    domain: 'sbi-yono-update.top',
    isShortened: false,
    redirectChain: ['sbi-yono-update.top', 'cdn-phish.xyz/sbi', 'data-harvest.cc/collect'],
    threatLevel: 'CRITICAL',
    riskScore: 96,
    flags: ['Newly registered domain (3 days)', 'Non-.in TLD (.top)', 'URL mimics SBI YONO', 'Redirect to known phishing infrastructure', 'No SSL certificate'],
    verdict: 'MALICIOUS — This QR code leads to a phishing website impersonating SBI YONO. Do NOT enter any credentials.',
    verdictKn: 'ಅಪಾಯಕಾರಿ — ಈ QR ಕೋಡ್ SBI YONO ನಕಲಿ ಫಿಶಿಂಗ್ ವೆಬ್‌ಸೈಟ್‌ಗೆ ಕರೆದೊಯ್ಯುತ್ತದೆ. ಯಾವುದೇ ಮಾಹಿತಿ ನಮೂದಿಸಬೇಡಿ.',
  },
  {
    decodedUrl: 'upi://pay?pa=scammer@ybl&pn=BESCOM&am=2500&cu=INR',
    domain: 'UPI Payment',
    isShortened: false,
    redirectChain: [],
    threatLevel: 'HIGH',
    riskScore: 82,
    flags: ['UPI collect request embedded in QR', 'Payee name spoofs "BESCOM"', 'UPI ID not official BESCOM VPA', 'Pre-filled amount: ₹2,500'],
    verdict: 'SUSPICIOUS — This QR triggers a UPI payment to an unofficial ID disguised as BESCOM. Official BESCOM never uses QR for bill payment.',
    verdictKn: 'ಅನುಮಾನಾಸ್ಪದ — ಈ QR BESCOM ಎಂದು ನಕಲಿ UPI ID ಗೆ ₹2,500 ಪಾವತಿ ಮಾಡುತ್ತದೆ.',
  },
  {
    decodedUrl: 'https://www.google.com',
    domain: 'google.com',
    isShortened: false,
    redirectChain: ['google.com'],
    threatLevel: 'SAFE',
    riskScore: 5,
    flags: ['Known trusted domain', 'Valid SSL certificate', 'No redirects'],
    verdict: 'SAFE — This QR code links to a legitimate, well-known website.',
    verdictKn: 'ಸುರಕ್ಷಿತ — ಈ QR ಕೋಡ್ ವಿಶ್ವಾಸಾರ್ಹ ವೆಬ್‌ಸೈಟ್‌ಗೆ ಲಿಂಕ್ ಆಗಿದೆ.',
  },
];

export const QRThreatScanner: React.FC<QRThreatScannerProps> = ({ language }) => {
  const [urlInput, setUrlInput] = useState('');
  const [scanning, setScanning] = useState(false);
  const [scanProgress, setScanProgress] = useState(0);
  const [result, setResult] = useState<QRScanResult | null>(null);
  const [dragActive, setDragActive] = useState(false);

  const startScan = useCallback(() => {
    setScanning(true);
    setScanProgress(0);
    setResult(null);
  }, []);

  useEffect(() => {
    if (!scanning) return;
    const interval = setInterval(() => {
      setScanProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setScanning(false);
          const mock = MOCK_RESULTS[Math.floor(Math.random() * MOCK_RESULTS.length)];
          setResult(urlInput.includes('safe') || urlInput.includes('google')
            ? MOCK_RESULTS[2]
            : urlInput.includes('upi')
              ? MOCK_RESULTS[1]
              : mock
          );
          return 100;
        }
        return prev + Math.random() * 12 + 3;
      });
    }, 100);
    return () => clearInterval(interval);
  }, [scanning, urlInput]);

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragActive(false);
    // Simulate QR decode from image
    setUrlInput('sbi-yono-update.top/verify');
    startScan();
  };

  const riskColor = (score: number) =>
    score >= 75 ? 'text-red-400' : score >= 50 ? 'text-amber-400' : score >= 25 ? 'text-cyan-400' : 'text-emerald-400';

  return (
    <div className="mx-auto max-w-4xl px-4 py-8 sm:px-6 lg:px-8">
      <div className="mb-6 flex items-center gap-3">
        <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-fuchsia-500/20 text-fuchsia-400">
          <QrCode className="h-5 w-5" />
        </span>
        <div>
          <h2 className="text-xl font-bold text-slate-100 sm:text-2xl">
            {language === 'kn' ? 'QR ಕೋಡ್ ಬೆದರಿಕೆ ಸ್ಕ್ಯಾನರ್' : 'QR Code Threat Scanner'}
          </h2>
          <p className="text-xs text-slate-400">
            {language === 'kn' ? 'QR ಕೋಡ್ ಅಪಾಯ ವಿಶ್ಲೇಷಣೆ — URL ಅಥವಾ ಚಿತ್ರ ಅಪ್‌ಲೋಡ್ ಮಾಡಿ' : 'Analyze QR code threats — paste URL or upload image'}
          </p>
        </div>
      </div>

      <div className="rounded-2xl border border-slate-800 bg-slate-950/90 p-6 backdrop-blur-md">
        {/* Upload Zone */}
        <div
          className={`rounded-xl border-2 border-dashed p-8 text-center transition-all cursor-pointer ${
            dragActive
              ? 'border-fuchsia-500 bg-fuchsia-950/20'
              : 'border-slate-700 bg-slate-900/30 hover:border-slate-600'
          }`}
          onDragOver={e => { e.preventDefault(); setDragActive(true); }}
          onDragLeave={() => setDragActive(false)}
          onDrop={handleDrop}
          onClick={() => {
            if (!urlInput) {
              setUrlInput('sbi-yono-update.top/verify');
            }
          }}
        >
          <QrCode className="mx-auto h-10 w-10 text-slate-500 mb-3" />
          <p className="text-sm font-semibold text-slate-300">
            {language === 'kn' ? 'QR ಕೋಡ್ ಚಿತ್ರವನ್ನು ಡ್ರ್ಯಾಗ್ & ಡ್ರಾಪ್ ಮಾಡಿ' : 'Drag & Drop QR Code Image'}
          </p>
          <p className="text-xs text-slate-500 mt-1">
            {language === 'kn' ? 'ಅಥವಾ ಕೆಳಗೆ URL ಪೇಸ್ಟ್ ಮಾಡಿ' : 'or paste the decoded URL below'}
          </p>
        </div>

        {/* URL Input */}
        <div className="mt-4 flex gap-3">
          <div className="relative flex-1">
            <Link2 className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-500" />
            <input
              className="w-full rounded-lg border border-slate-700 bg-slate-900/80 pl-10 pr-4 py-3 text-sm text-slate-100 placeholder-slate-500 outline-none focus:border-fuchsia-500 focus:ring-2 focus:ring-fuchsia-500/20 font-mono"
              placeholder={language === 'kn' ? 'QR ಡೀಕೋಡ್ ಮಾಡಿದ URL...' : 'Paste decoded QR URL here...'}
              value={urlInput}
              onChange={e => { setUrlInput(e.target.value); setResult(null); }}
              onKeyDown={e => e.key === 'Enter' && urlInput.trim() && startScan()}
            />
          </div>
          <button
            type="button"
            onClick={startScan}
            disabled={scanning || !urlInput.trim()}
            className="flex items-center gap-2 rounded-lg bg-gradient-to-r from-fuchsia-500 to-purple-600 px-5 py-3 text-sm font-bold text-white shadow-lg shadow-fuchsia-500/25 transition-all hover:scale-105 disabled:opacity-40 disabled:hover:scale-100"
          >
            {scanning ? <Loader2 className="h-4 w-4 animate-spin" /> : <Upload className="h-4 w-4" />}
            {language === 'kn' ? 'ವಿಶ್ಲೇಷಿಸಿ' : 'Analyze'}
          </button>
        </div>

        {/* Scan Progress */}
        {scanning && (
          <div className="mt-4 animate-fade-in">
            <div className="flex justify-between text-[10px] font-mono text-slate-400 mb-1">
              <span>{language === 'kn' ? 'QR ವಿಷಯ ವಿಶ್ಲೇಷಿಸಲಾಗುತ್ತಿದೆ...' : 'Analyzing QR content...'}</span>
              <span>{Math.min(100, Math.round(scanProgress))}%</span>
            </div>
            <div className="h-2 rounded-full bg-slate-800 overflow-hidden">
              <div className="h-full rounded-full bg-gradient-to-r from-fuchsia-500 to-purple-500 transition-all duration-150" style={{ width: `${Math.min(100, scanProgress)}%` }} />
            </div>
          </div>
        )}

        {/* Results */}
        {result && !scanning && (
          <div className="mt-6 space-y-4 animate-fade-in">
            {/* Verdict Banner */}
            <div className={`rounded-xl border p-4 ${SEVERITY_STYLES[result.threatLevel]}`}>
              <div className="flex items-start gap-3">
                {result.threatLevel === 'SAFE' ? (
                  <CheckCircle2 className="h-6 w-6 text-emerald-400 shrink-0 mt-0.5" />
                ) : (
                  <ShieldAlert className="h-6 w-6 shrink-0 mt-0.5" />
                )}
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className={`text-sm font-bold ${riskColor(result.riskScore)}`}>
                      {result.threatLevel}
                    </span>
                    <span className={`font-mono text-lg font-black ${riskColor(result.riskScore)}`}>
                      {result.riskScore}/100
                    </span>
                  </div>
                  <p className="text-xs leading-relaxed">
                    {language === 'kn' ? result.verdictKn : result.verdict}
                  </p>
                </div>
              </div>
            </div>

            {/* Details Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="rounded-lg border border-slate-800 bg-slate-900/60 p-3">
                <div className="text-[10px] font-semibold text-slate-500 uppercase mb-1 flex items-center gap-1">
                  <ExternalLink className="h-2.5 w-2.5" /> {language === 'kn' ? 'ಡೀಕೋಡ್ ಮಾಡಿದ URL' : 'Decoded URL'}
                </div>
                <div className="text-xs font-mono text-slate-300 break-all">{result.decodedUrl}</div>
              </div>
              <div className="rounded-lg border border-slate-800 bg-slate-900/60 p-3">
                <div className="text-[10px] font-semibold text-slate-500 uppercase mb-1 flex items-center gap-1">
                  <Globe className="h-2.5 w-2.5" /> {language === 'kn' ? 'ಡೊಮೈನ್' : 'Domain'}
                </div>
                <div className="text-xs font-mono text-slate-300">{result.domain}</div>
              </div>
            </div>

            {/* Redirect Chain */}
            {result.redirectChain.length > 1 && (
              <div className="rounded-lg border border-slate-800 bg-slate-900/60 p-3">
                <div className="text-[10px] font-semibold text-slate-500 uppercase mb-2">
                  {language === 'kn' ? 'ರಿಡೈರೆಕ್ಟ್ ಚೈನ್' : 'Redirect Chain'}
                </div>
                <div className="flex flex-wrap items-center gap-1.5">
                  {result.redirectChain.map((hop, i) => (
                    <React.Fragment key={i}>
                      <span className="rounded bg-slate-800 px-2 py-1 font-mono text-[10px] text-slate-300">{hop}</span>
                      {i < result.redirectChain.length - 1 && <ArrowRight className="h-3 w-3 text-red-400" />}
                    </React.Fragment>
                  ))}
                </div>
              </div>
            )}

            {/* Flags */}
            <div className="rounded-lg border border-slate-800 bg-slate-900/60 p-3">
              <div className="text-[10px] font-semibold text-slate-500 uppercase mb-2 flex items-center gap-1">
                <AlertTriangle className="h-2.5 w-2.5" /> {language === 'kn' ? 'ಪತ್ತೆಯಾದ ಫ್ಲ್ಯಾಗ್‌ಗಳು' : 'Detected Flags'}
              </div>
              <div className="flex flex-wrap gap-1.5">
                {result.flags.map((flag, i) => (
                  <span key={i} className="rounded-md bg-red-950/30 px-2 py-1 text-[10px] font-semibold text-red-300 border border-red-500/20">
                    ⚠ {flag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
