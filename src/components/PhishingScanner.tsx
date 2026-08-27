import React, { useState } from 'react';
import {
  FileSearch,
  AlertTriangle,
  ShieldCheck,
  Zap,
  Phone,
  CreditCard,
  ExternalLink,
  Upload,
  Copy,
  Check,
  Sparkles,
  Flame,
  Cpu,
  RefreshCw,
  Info,
} from 'lucide-react';
import type { Language, PhishingAnalysis, ActivePillar } from '../types';
import { api } from '../api';
import { presetPhishingSamples } from '../data/karnatakaScamData';
import { ImageOcrScanner } from './ImageOcrScanner';

interface PhishingScannerProps {
  language: Language;
  initialText?: string;
  onNavigateTo: (pillar: ActivePillar) => void;
}

export const PhishingScanner: React.FC<PhishingScannerProps> = ({
  language,
  initialText = '',
  onNavigateTo,
}) => {
  const [activeMode, setActiveMode] = useState<'text' | 'ocr'>('text');
  const [inputText, setInputText] = useState(initialText);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [result, setResult] = useState<PhishingAnalysis | null>(null);
  const [copied, setCopied] = useState(false);

  // Sync initialText if passed from presets
  React.useEffect(() => {
    if (!initialText) return;
    const timer = setTimeout(() => {
      setInputText(initialText);
      const runAnalysis = async () => {
        setIsAnalyzing(true);
        setResult(null);
        try {
          const res = await api.analyzePhishing(initialText);
          setResult(res);
        } catch (err) {
          console.error(err);
        } finally {
          setIsAnalyzing(false);
        }
      };
      runAnalysis();
    }, 0);
    return () => clearTimeout(timer);
  }, [initialText]);

  const handleAnalyze = async (textToScan?: string) => {
    const text = textToScan || inputText;
    if (!text.trim()) return;

    setIsAnalyzing(true);
    setResult(null);
    try {
      const res = await api.analyzePhishing(text);
      setResult(res);
    } catch (err) {
      console.error(err);
    } finally {
      setIsAnalyzing(false);
    }
  };

  const handleSendOcrText = (extractedText: string) => {
    setInputText(extractedText);
    setActiveMode('text');
    handleAnalyze(extractedText);
  };

  const handleCopyReport = () => {
    if (!result) return;
    const summary = `🛡️ RAKSHA AI CYBER AUDIT REPORT
Scam Archetype: ${result.scamArchetype}
Threat Level: ${result.threatLevel} (Risk Score: ${result.overallScore}/100)
Detected Coercion Triggers: ${result.coercionTriggers.join(', ')}
Extracted IOCs:
• URLs: ${result.suspiciousEntities.urls.join(', ') || 'None'}
• Phones: ${result.suspiciousEntities.phones.join(', ') || 'None'}
• UPI IDs: ${result.suspiciousEntities.upiIds.join(', ') || 'None'}
Analysis: ${result.explanation}`;

    navigator.clipboard.writeText(summary);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const getThreatBadgeStyles = (level: string) => {
    switch (level) {
      case 'CRITICAL':
        return {
          bg: 'bg-rose-500/15 border-rose-500/40 text-rose-300',
          stroke: '#fb7185',
          text: 'text-rose-400',
        };
      case 'HIGH':
        return {
          bg: 'bg-amber-500/15 border-amber-500/40 text-amber-300',
          stroke: '#fbbf24',
          text: 'text-amber-400',
        };
      case 'MEDIUM':
        return {
          bg: 'bg-sky-500/15 border-sky-400/40 text-sky-300',
          stroke: '#38bdf8',
          text: 'text-sky-400',
        };
      case 'LOW':
        return {
          bg: 'bg-blue-500/15 border-blue-400/40 text-blue-300',
          stroke: '#60a5fa',
          text: 'text-blue-400',
        };
      default:
        return {
          bg: 'bg-emerald-500/15 border-emerald-500/40 text-emerald-300',
          stroke: '#34d399',
          text: 'text-emerald-400',
        };
    }
  };

  const threatStyle = result ? getThreatBadgeStyles(result.threatLevel) : getThreatBadgeStyles('SAFE');

  // Calculate SVG circular gauge metrics
  const score = result ? result.overallScore : 0;
  const radius = 38;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (score / 100) * circumference;

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8 space-y-6">
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <div className="flex items-center gap-2.5">
            <span className="flex h-8 w-8 items-center justify-center rounded-xl bg-white/[0.05] text-sky-400 border border-white/10">
              <FileSearch className="h-4 w-4" />
            </span>
            <h2 className="text-xl font-bold font-heading text-white sm:text-2xl">
              {language === 'kn'
                ? 'ಬಹುಭಾಷಾ ಫಿಶಿಂಗ್ & ಸೈಬರ್ ಸಂದೇಶ ವಿಶ್ಲೇಷಕ'
                : 'Multimodal Indic NLP Triage & Phishing Scanner'}
            </h2>
          </div>
          <p className="mt-1 text-xs text-slate-400 sm:text-sm font-sans">
            {language === 'kn'
              ? 'ಕನ್ನಡ, ಇಂಗ್ಲಿಷ್, ಹಿಂದಿ ಸೇರಿದಂತೆ 12 ಭಾರತೀಯ ಭಾಷೆಗಳ ಎಸ್‌ಎಂಎಸ್, ವಾಟ್ಸಾಪ್ ಫಾರ್ವರ್ಡ್, URL ಮತ್ತು OCR ಸ್ಕ್ರೀನ್‌ಶಾಟ್‌ಗಳನ್ನು ಪರಿಶೀಲಿಸಿ.'
              : 'Scan suspicious SMS, WhatsApp forwards, phishing URLs, UPI IDs, and screenshots across 12 Indian languages.'}
          </p>
        </div>

        {/* Mode Switcher */}
        <div className="flex items-center rounded-full bg-[#121622]/90 border border-white/10 p-1 text-xs font-semibold backdrop-blur-xl">
          <button
            onClick={() => setActiveMode('text')}
            className={`px-4 py-1.5 rounded-full transition-all duration-200 cursor-pointer font-heading ${
              activeMode === 'text'
                ? 'bg-white text-slate-950 font-bold shadow-md shadow-white/15'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            {language === 'kn' ? 'ಪಠ್ಯ / SMS ಸ್ಕ್ಯಾನ್' : 'Text / SMS Scanner'}
          </button>
          <button
            onClick={() => setActiveMode('ocr')}
            className={`px-4 py-1.5 rounded-full flex items-center gap-1.5 transition-all duration-200 cursor-pointer font-heading ${
              activeMode === 'ocr'
                ? 'bg-white text-slate-950 font-bold shadow-md shadow-white/15'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Upload className="h-3.5 w-3.5" />
            <span>{language === 'kn' ? 'ಚಿತ್ರ OCR ಸ್ಕ್ಯಾನರ್' : 'Screenshot Vision OCR'}</span>
          </button>
        </div>
      </div>

      {/* Render ImageOcrScanner if in OCR Mode */}
      {activeMode === 'ocr' && (
        <ImageOcrScanner
          language={language}
          onNavigateTo={onNavigateTo}
          onSendToPhishing={handleSendOcrText}
        />
      )}

      {/* Render Standard Text Scanner if in Text Mode */}
      {activeMode === 'text' && (
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
          {/* Left Column: Input & Presets (7 cols) */}
          <div className="lg:col-span-7 flex flex-col gap-5">
            <div className="figma-card-static p-5 sm:p-6">
              <div className="flex items-center justify-between mb-3">
                <label htmlFor="phishing-input" className="text-xs font-bold uppercase tracking-wider text-slate-300 font-heading flex items-center gap-1.5">
                  <Info className="h-3.5 w-3.5 text-sky-400" />
                  {language === 'kn' ? 'ಸಂದೇಶ ಅಥವಾ URL ಅನ್ನು ನಮೂದಿಸಿ' : 'Paste Suspicious Text / SMS / URL / UPI ID'}
                </label>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setActiveMode('ocr')}
                    className="flex items-center gap-1.5 rounded-full border border-white/10 bg-white/[0.04] px-3 py-1 text-[11px] font-medium text-slate-300 transition-all hover:border-white/20 hover:text-white cursor-pointer"
                  >
                    <Upload className="h-3.5 w-3.5 text-sky-400" />
                    <span>{language === 'kn' ? 'ಸ್ಕ್ರೀನ್‌ಶಾಟ್ OCR' : 'Screenshot OCR'}</span>
                  </button>
                </div>
              </div>

              <textarea
                id="phishing-input"
                rows={5}
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                placeholder={
                  language === 'kn'
                    ? 'ಉದಾಹರಣೆ: "ನಿಮ್ಮ ಬೆಸ್ಕಾಂ ವಿದ್ಯುತ್ ಬಿಲ್ ₹3,450 ಬಾಕಿಯಿದೆ. ಇಂದು ರಾತ್ರಿ 9:30 ಕ್ಕೆ ಕಡಿತವಾಗಲಿದೆ. ಪಾವತಿಸಲು ಕ್ಲಿಕ್ ಮಾಡಿ: bescom-pay.top/karnataka"'
                    : 'Example: "Dear SBI User, your YONO account is locked. Update KYC immediately at http://sbi-yono-update.xyz to avoid suspension..."'
                }
                className="w-full rounded-2xl border border-white/10 bg-[#0a0d14] p-4 font-mono text-sm text-white placeholder-slate-600 focus:border-sky-400 focus:outline-none focus:ring-2 focus:ring-sky-400/20 transition-all"
              />

              {/* Action Buttons */}
              <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
                <div className="flex items-center gap-2.5">
                  <button
                    type="button"
                    onClick={() => handleAnalyze()}
                    disabled={isAnalyzing || !inputText.trim()}
                    className="flex items-center gap-2 rounded-full bg-white px-5 py-2.5 text-sm font-bold font-heading text-slate-950 shadow-lg shadow-white/15 transition-all duration-200 hover:scale-105 hover:bg-sky-50 active:scale-95 disabled:opacity-50 disabled:pointer-events-none cursor-pointer"
                  >
                    {isAnalyzing ? (
                      <>
                        <RefreshCw className="h-4 w-4 animate-spin text-slate-950" />
                        <span>{language === 'kn' ? 'ವಿಶ್ಲೇಷಿಸಲಾಗುತ್ತಿದೆ...' : 'Running Indic NLP...'}</span>
                      </>
                    ) : (
                      <>
                        <Zap className="h-4 w-4 text-sky-600" />
                        <span>{language === 'kn' ? 'AI ವಿಶ್ಲೇಷಣೆ ನಡೆಸಿ' : 'Scan with Indic AI'}</span>
                      </>
                    )}
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      setInputText('');
                      setResult(null);
                    }}
                    className="rounded-full border border-white/10 bg-white/[0.03] px-4 py-2.5 text-xs font-medium text-slate-400 hover:text-white transition-colors cursor-pointer"
                  >
                    {language === 'kn' ? 'ತೆರವುಗೊಳಿಸಿ' : 'Clear'}
                  </button>
                </div>

                <span className="text-[11px] text-slate-500 font-mono">
                  {inputText.length} characters
                </span>
              </div>
            </div>

            {/* Quick Preset Selector */}
            <div className="figma-card-static p-4 sm:p-5">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3 font-heading">
                {language === 'kn' ? 'ತ್ವರಿತ ಪರೀಕ್ಷಾ ಮಾದರಿಗಳು (Click to test)' : 'Test With Verified Karnataka Threats'}
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {presetPhishingSamples.slice(0, 4).map((sample, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => {
                      setInputText(sample.text);
                      handleAnalyze(sample.text);
                    }}
                    className="flex flex-col items-start rounded-xl border border-white/[0.07] bg-white/[0.02] p-3 text-left transition-all duration-200 hover:border-sky-400/40 hover:bg-white/[0.06] cursor-pointer"
                  >
                    <div className="flex w-full items-center justify-between">
                      <span className="text-[10px] font-bold text-sky-300 font-mono">{sample.category}</span>
                      <span className="text-[9px] text-slate-500 font-bold">{sample.language.toUpperCase()}</span>
                    </div>
                    <div className="text-xs font-semibold text-slate-200 mt-1 line-clamp-1 font-heading">
                      {language === 'kn' ? sample.titleKn : sample.title}
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column: AI Forensic Output (5 cols) */}
          <div className="lg:col-span-5">
            {isAnalyzing ? (
              <div className="flex h-full min-h-[420px] flex-col items-center justify-center rounded-2xl border border-sky-400/20 bg-[#121622]/60 p-8 text-center backdrop-blur-2xl">
                <div className="relative flex h-16 w-16 items-center justify-center">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-sky-400 opacity-20"></span>
                  <Sparkles className="h-8 w-8 text-sky-400 animate-spin" />
                </div>
                <h3 className="mt-4 text-base font-bold text-white font-heading">
                  {language === 'kn' ? 'ಬಹುಭಾಷಾ AI ವಿಶ್ಲೇಷಣೆ ಪ್ರಗತಿಯಲ್ಲಿದೆ...' : 'Analyzing Indic NLP & Coercion Vectors...'}
                </h3>
                <p className="mt-1.5 text-xs text-slate-400 max-w-xs font-sans">
                  {language === 'kn'
                    ? 'ಮನಶ್ಶಾಸ್ತ್ರೀಯ ಒತ್ತಡ, ನಕಲಿ ಬ್ಯಾಂಕ್ ಮಾದರಿಗಳು ಮತ್ತು ದುರುದ್ದೇಶಪೂರಿತ URL ಗಳನ್ನು ಹೊರತೆಗೆಯಲಾಗುತ್ತಿದೆ...'
                    : 'Deconstructing psychological triggers, entity relationships, and syndicate archetypes...'}
                </p>
              </div>
            ) : result ? (
              <div className="flex flex-col gap-4 rounded-2xl border border-white/[0.1] bg-gradient-to-b from-[#141824]/90 to-[#0e121b]/95 p-5 sm:p-6 backdrop-blur-3xl shadow-2xl">
                {/* Header Score & Threat Level with Circular Risk Gauge */}
                <div className="flex items-center justify-between border-b border-white/[0.08] pb-4">
                  <div>
                    <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400 font-heading">
                      {language === 'kn' ? 'ಬೆದರಿಕೆ ವರ್ಗೀಕರಣ' : 'Threat Assessment'}
                    </div>
                    <div className="mt-1 text-lg font-black text-white font-heading">
                      {result.scamArchetype.replace(/_/g, ' ')}
                    </div>
                    <span className={`inline-block mt-1 px-3 py-0.5 rounded-full text-[10px] font-bold border ${threatStyle.bg}`}>
                      {result.threatLevel} LEVEL
                    </span>
                  </div>

                  {/* Circular Risk Score Gauge */}
                  <div className="flex flex-col items-center">
                    <div className="relative h-20 w-20 flex items-center justify-center">
                      <svg className="h-20 w-20 -rotate-90" viewBox="0 0 100 100">
                        <circle
                          className="text-white/[0.08]"
                          strokeWidth="8"
                          stroke="currentColor"
                          fill="transparent"
                          r={radius}
                          cx="50"
                          cy="50"
                        />
                        <circle
                          stroke={threatStyle.stroke}
                          strokeWidth="8"
                          strokeDasharray={circumference}
                          strokeDashoffset={strokeDashoffset}
                          strokeLinecap="round"
                          fill="transparent"
                          r={radius}
                          cx="50"
                          cy="50"
                          style={{ transition: 'stroke-dashoffset 0.8s cubic-bezier(0.16, 1, 0.3, 1)' }}
                        />
                      </svg>
                      <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                        <span className="text-xl font-black font-mono text-white">
                          {result.overallScore}
                        </span>
                        <span className="text-[9px] text-slate-400 font-mono">/100</span>
                      </div>
                    </div>
                    <span className="text-[10px] font-medium text-slate-400 font-mono mt-1">RISK SCORE</span>
                  </div>
                </div>

                {/* Coercion Triggers Detected */}
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-300 mb-2 flex items-center gap-1.5 font-heading">
                    <AlertTriangle className="h-3.5 w-3.5 text-amber-400" />
                    <span>{language === 'kn' ? 'ಪತ್ತೆಯಾದ ಒತ್ತಡ ತಂತ್ರಗಳು' : 'Psychological Coercion Detected'}</span>
                  </h4>
                  {result.coercionTriggers.length > 0 ? (
                    <div className="flex flex-wrap gap-1.5">
                      {result.coercionTriggers.map((trig, i) => (
                        <span
                          key={i}
                          className="rounded-full border border-amber-500/30 bg-amber-500/10 px-3 py-0.5 font-mono text-[10px] font-bold text-amber-300"
                        >
                          ⚡ {trig.replace(/_/g, ' ')}
                        </span>
                      ))}
                    </div>
                  ) : (
                    <div className="text-xs text-slate-400">
                      {language === 'kn' ? 'ಯಾವುದೇ ತೀವ್ರ ಒತ್ತಡ ತಂತ್ರ ಕಂಡುಬಂದಿಲ್ಲ.' : 'No high-pressure coercion vectors detected.'}
                    </div>
                  )}
                </div>

                {/* Extracted Entities (IOCs) */}
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-300 mb-2 font-heading">
                    {language === 'kn' ? 'ಹೊರತೆಗೆಯಲಾದ ವಿವರಗಳು (Extracted IOCs)' : 'Harvested IOC Entities'}
                  </h4>
                  <div className="space-y-1.5 font-mono text-xs">
                    {result.suspiciousEntities.urls.map((u, i) => (
                      <div key={i} className="flex items-center gap-2 rounded-xl bg-white/[0.03] p-2.5 text-sky-300 border border-white/[0.08]">
                        <ExternalLink className="h-3.5 w-3.5 shrink-0 text-sky-400" />
                        <span className="truncate">{u}</span>
                      </div>
                    ))}
                    {result.suspiciousEntities.phones.map((p, i) => (
                      <div key={i} className="flex items-center gap-2 rounded-xl bg-white/[0.03] p-2.5 text-amber-300 border border-white/[0.08]">
                        <Phone className="h-3.5 w-3.5 shrink-0 text-amber-400" />
                        <span>{p}</span>
                      </div>
                    ))}
                    {result.suspiciousEntities.upiIds.map((upi, i) => (
                      <div key={i} className="flex items-center gap-2 rounded-xl bg-white/[0.03] p-2.5 text-rose-300 border border-white/[0.08]">
                        <CreditCard className="h-3.5 w-3.5 shrink-0 text-rose-400" />
                        <span>{upi}</span>
                      </div>
                    ))}
                    {result.suspiciousEntities.urls.length === 0 &&
                      result.suspiciousEntities.phones.length === 0 &&
                      result.suspiciousEntities.upiIds.length === 0 && (
                        <div className="text-xs text-slate-500 italic p-1">
                          {language === 'kn' ? 'ಯಾವುದೇ ನೇರ URL ಅಥವಾ ಫೋನ್ ಸಂಖ್ಯೆ ಪತ್ತೆಯಾಗಿಲ್ಲ.' : 'No suspicious raw entities extracted.'}
                        </div>
                      )}
                  </div>
                </div>

                {/* Bilingual Explanation */}
                <div className="rounded-2xl border border-white/[0.08] bg-black/40 p-3.5">
                  <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-1 font-heading">
                    {language === 'kn' ? 'AI ತನಿಖಾ ವಿವರಣೆ (Analysis):' : 'Forensic Deconstruction:'}
                  </div>
                  <p className="text-xs leading-relaxed text-slate-200 font-sans">
                    {language === 'kn' ? result.explanationKn : result.explanation}
                  </p>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-white/[0.08]">
                  <button
                    type="button"
                    onClick={handleCopyReport}
                    className="flex items-center gap-1.5 rounded-full border border-white/15 bg-white/[0.04] px-4 py-2 text-xs font-medium text-slate-200 hover:border-white/30 hover:bg-white/[0.08] transition-all cursor-pointer"
                  >
                    {copied ? <Check className="h-3.5 w-3.5 text-emerald-400" /> : <Copy className="h-3.5 w-3.5" />}
                    <span>{copied ? (language === 'kn' ? 'ನಕಲಿಸಲಾಗಿದೆ' : 'Copied') : language === 'kn' ? 'ವರದಿ ನಕಲಿಸಿ' : 'Copy Report'}</span>
                  </button>

                  {result.overallScore >= 50 && (
                    <>
                      <button
                        type="button"
                        onClick={() => onNavigateTo('honeypot')}
                        className="flex items-center gap-1.5 rounded-full bg-gradient-to-r from-purple-600 to-indigo-600 px-4 py-2 text-xs font-bold text-white shadow-md shadow-purple-500/25 hover:opacity-95 cursor-pointer font-heading"
                      >
                        <Cpu className="h-3.5 w-3.5" />
                        <span>{language === 'kn' ? 'ಹನಿಪಾಟ್‌ನಲ್ಲಿ ಬಲೆ ಬೀಸಿ' : 'Deploy Honeypot Trap'}</span>
                      </button>

                      <button
                        type="button"
                        onClick={() => onNavigateTo('golden-hour')}
                        className="flex items-center gap-1.5 rounded-full bg-gradient-to-r from-rose-600 to-pink-600 px-4 py-2 text-xs font-bold text-white shadow-md shadow-rose-500/25 hover:opacity-95 cursor-pointer font-heading"
                      >
                        <Flame className="h-3.5 w-3.5" />
                        <span>{language === 'kn' ? '1930 ತುರ್ತು ಫ್ರೀಜ್' : '1930 Rapid Freeze'}</span>
                      </button>
                    </>
                  )}
                </div>
              </div>
            ) : (
              <div className="flex h-full min-h-[420px] flex-col items-center justify-center rounded-2xl border border-dashed border-white/10 bg-white/[0.01] p-8 text-center">
                <ShieldCheck className="h-12 w-12 text-slate-600 mb-3" />
                <h3 className="text-sm font-bold text-slate-200 font-heading">
                  {language === 'kn' ? 'ಯಾವುದೇ ವಿಶ್ಲೇಷಣೆ ನಡೆಸಲಾಗಿಲ್ಲ' : 'Awaiting Input for Forensic Triage'}
                </h3>
                <p className="mt-1 text-xs text-slate-400 max-w-xs font-sans">
                  {language === 'kn'
                    ? 'ಸಂದೇಶವನ್ನು ನಮೂದಿಸಿ ಅಥವಾ ಎಡಭಾಗದ ಮಾದರಿಗಳಲ್ಲಿ ಒಂದನ್ನು ಆರಿಸಿ "AI ವಿಶ್ಲೇಷಣೆ ನಡೆಸಿ" ಕ್ಲಿಕ್ ಮಾಡಿ.'
                    : 'Paste suspicious text or select a threat preset to inspect Indic NLP, psychological vectors, and IOCs.'}
                </p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default PhishingScanner;
