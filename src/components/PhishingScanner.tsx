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

  const getThreatColor = (level: string) => {
    switch (level) {
      case 'CRITICAL':
        return 'text-red-400 bg-red-950/60 border-red-500/50';
      case 'HIGH':
        return 'text-amber-400 bg-amber-950/60 border-amber-500/50';
      case 'MEDIUM':
        return 'text-cyan-400 bg-cyan-950/60 border-cyan-500/50';
      case 'LOW':
        return 'text-blue-400 bg-blue-950/60 border-blue-500/50';
      default:
        return 'text-emerald-400 bg-emerald-950/60 border-emerald-500/50';
    }
  };

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8 space-y-6">
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-teal-500/20 text-teal-400">
              <FileSearch className="h-4 w-4" />
            </span>
            <h2 className="text-xl font-bold text-slate-100 sm:text-2xl">
              {language === 'kn'
                ? 'ಬಹುಭಾಷಾ ಫಿಶಿಂಗ್ & ಸೈಬರ್ ಸಂದೇಶ ವಿಶ್ಲೇಷಕ'
                : 'Multimodal Indic NLP Triage & Phishing Scanner'}
            </h2>
          </div>
          <p className="mt-1 text-xs text-slate-400 sm:text-sm">
            {language === 'kn'
              ? 'ಕನ್ನಡ, ಇಂಗ್ಲಿಷ್, ಹಿಂದಿ ಸೇರಿದಂತೆ 12 ಭಾರತೀಯ ಭಾಷೆಗಳ ಎಸ್‌ಎಂಎಸ್, ವಾಟ್ಸಾಪ್ ಫಾರ್ವರ್ಡ್, URL ಮತ್ತು OCR ಸ್ಕ್ರೀನ್‌ಶಾಟ್‌ಗಳನ್ನು ಪರಿಶೀಲಿಸಿ.'
              : 'Scan suspicious SMS, WhatsApp forwards, phishing URLs, and screenshots across 12 Indian languages.'}
          </p>
        </div>

        {/* Mode Switcher */}
        <div className="flex items-center rounded-xl bg-slate-900 border border-slate-800 p-1 text-xs font-semibold">
          <button
            onClick={() => setActiveMode('text')}
            className={`px-3.5 py-1.5 rounded-lg transition-all ${
              activeMode === 'text'
                ? 'bg-cyan-500 text-slate-950 font-bold shadow'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            {language === 'kn' ? 'ಪಠ್ಯ / SMS ಸ್ಕ್ಯಾನ್' : 'Text / SMS Scanner'}
          </button>
          <button
            onClick={() => setActiveMode('ocr')}
            className={`px-3.5 py-1.5 rounded-lg flex items-center gap-1.5 transition-all ${
              activeMode === 'ocr'
                ? 'bg-cyan-500 text-slate-950 font-bold shadow'
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
          <div className="lg:col-span-7 flex flex-col gap-4">
            <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-5 backdrop-blur-md">
              <div className="flex items-center justify-between mb-3">
                <label htmlFor="phishing-input" className="text-xs font-bold uppercase tracking-wider text-slate-300">
                  {language === 'kn' ? 'ಸಂದೇಶ ಅಥವಾ URL ಅನ್ನು ನಮೂದಿಸಿ' : 'Paste Suspicious Text / SMS / URL'}
                </label>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setActiveMode('ocr')}
                    className="flex items-center gap-1.5 rounded-lg border border-slate-700 bg-slate-800/80 px-2.5 py-1 text-[11px] font-semibold text-slate-300 transition-all hover:border-cyan-500 hover:text-cyan-300"
                  >
                    <Upload className="h-3.5 w-3.5 text-cyan-400" />
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
              className="w-full rounded-xl border border-slate-800 bg-slate-950/80 p-3.5 font-mono text-sm text-slate-100 placeholder-slate-600 focus:border-cyan-500 focus:outline-none focus:ring-1 focus:ring-cyan-500"
            />

            {/* Action Buttons */}
            <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => handleAnalyze()}
                  disabled={isAnalyzing || !inputText.trim()}
                  className="flex items-center gap-2 rounded-xl bg-gradient-to-r from-cyan-500 to-teal-500 px-5 py-2 text-sm font-bold text-slate-950 shadow-lg shadow-cyan-500/25 transition-all hover:scale-105 active:scale-95 disabled:opacity-50 disabled:pointer-events-none"
                >
                  {isAnalyzing ? (
                    <>
                      <RefreshCw className="h-4 w-4 animate-spin" />
                      <span>{language === 'kn' ? 'ವಿಶ್ಲೇಷಿಸಲಾಗುತ್ತಿದೆ...' : 'Running Indic NLP...'}</span>
                    </>
                  ) : (
                    <>
                      <Zap className="h-4 w-4" />
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
                  className="rounded-xl border border-slate-800 bg-slate-900/80 px-3.5 py-2 text-xs font-semibold text-slate-400 hover:text-slate-200"
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
          <div className="rounded-2xl border border-slate-800 bg-slate-900/40 p-4">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2.5">
              {language === 'kn' ? 'ತ್ವರಿತ ಪರೀಕ್ಷಾ ಮಾದರಿಗಳು (Click to test)' : 'Test With Verified Karnataka Threats'}
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {presetPhishingSamples.slice(0, 4).map((sample, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => {
                    setInputText(sample.text);
                    handleAnalyze(sample.text);
                  }}
                  className="flex flex-col items-start rounded-xl border border-slate-800/80 bg-slate-950/50 p-2.5 text-left transition-all hover:border-cyan-500/40 hover:bg-slate-900/80"
                >
                  <div className="flex w-full items-center justify-between">
                    <span className="text-[10px] font-bold text-cyan-400 font-mono">{sample.category}</span>
                    <span className="text-[9px] text-slate-500">{sample.language.toUpperCase()}</span>
                  </div>
                  <div className="text-xs font-semibold text-slate-200 mt-1 line-clamp-1">
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
            <div className="flex h-full min-h-[380px] flex-col items-center justify-center rounded-2xl border border-cyan-500/30 bg-slate-900/60 p-8 text-center backdrop-blur-md">
              <div className="relative flex h-16 w-16 items-center justify-center">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-cyan-400 opacity-30"></span>
                <Sparkles className="h-8 w-8 text-cyan-400 animate-spin" />
              </div>
              <h3 className="mt-4 text-base font-bold text-slate-200">
                {language === 'kn' ? 'ಬಹುಭಾಷಾ AI ವಿಶ್ಲೇಷಣೆ ಪ್ರಗತಿಯಲ್ಲಿದೆ...' : 'Analyzing Indic NLP & Coercion Vectors...'}
              </h3>
              <p className="mt-1 text-xs text-slate-400 max-w-xs">
                {language === 'kn'
                  ? 'ಮನಶ್ಶಾಸ್ತ್ರೀಯ ಒತ್ತಡ, ನಕಲಿ ಬ್ಯಾಂಕ್ ಮಾದರಿಗಳು ಮತ್ತು ದುರುದ್ದೇಶಪೂರಿತ URL ಗಳನ್ನು ಹೊರತೆಗೆಯಲಾಗುತ್ತಿದೆ...'
                  : 'Deconstructing psychological triggers, entity relationships, and syndicate archetypes...'}
              </p>
            </div>
          ) : result ? (
            <div className="flex flex-col gap-4 rounded-2xl border border-slate-800 bg-slate-900/70 p-5 backdrop-blur-md">
              {/* Header Score & Threat Level */}
              <div className="flex items-center justify-between border-b border-slate-800 pb-4">
                <div>
                  <div className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
                    {language === 'kn' ? 'ಬೆದರಿಕೆ ವರ್ಗೀಕರಣ' : 'Threat Assessment'}
                  </div>
                  <div className="mt-1 text-lg font-black text-slate-100">
                    {result.scamArchetype.replace(/_/g, ' ')}
                  </div>
                </div>

                <div
                  className={`flex flex-col items-end rounded-xl border px-3 py-1.5 ${getThreatColor(
                    result.threatLevel
                  )}`}
                >
                  <span className="text-xs font-black tracking-wider">{result.threatLevel}</span>
                  <span className="text-[10px] font-mono font-bold">
                    Risk: {result.overallScore}/100
                  </span>
                </div>
              </div>

              {/* Coercion Triggers Detected */}
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-300 mb-2 flex items-center gap-1.5">
                  <AlertTriangle className="h-3.5 w-3.5 text-amber-400" />
                  <span>{language === 'kn' ? 'ಪತ್ತೆಯಾದ ಒತ್ತಡ ತಂತ್ರಗಳು (Coercion Triggers)' : 'Psychological Coercion Detected'}</span>
                </h4>
                {result.coercionTriggers.length > 0 ? (
                  <div className="flex flex-wrap gap-1.5">
                    {result.coercionTriggers.map((trig, i) => (
                      <span
                        key={i}
                        className="rounded-md border border-amber-500/30 bg-amber-950/40 px-2 py-0.5 font-mono text-[10px] font-bold text-amber-300"
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
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-300 mb-2">
                  {language === 'kn' ? 'ಹೊರತೆಗೆಯಲಾದ ವಿವರಗಳು (Extracted IOCs)' : 'Harvested IOC Entities'}
                </h4>
                <div className="space-y-1.5 font-mono text-xs">
                  {result.suspiciousEntities.urls.map((u, i) => (
                    <div key={i} className="flex items-center gap-2 rounded-lg bg-slate-950/60 p-2 text-cyan-300 border border-slate-800">
                      <ExternalLink className="h-3.5 w-3.5 shrink-0 text-cyan-400" />
                      <span className="truncate">{u}</span>
                    </div>
                  ))}
                  {result.suspiciousEntities.phones.map((p, i) => (
                    <div key={i} className="flex items-center gap-2 rounded-lg bg-slate-950/60 p-2 text-amber-300 border border-slate-800">
                      <Phone className="h-3.5 w-3.5 shrink-0 text-amber-400" />
                      <span>{p}</span>
                    </div>
                  ))}
                  {result.suspiciousEntities.upiIds.map((upi, i) => (
                    <div key={i} className="flex items-center gap-2 rounded-lg bg-slate-950/60 p-2 text-red-300 border border-slate-800">
                      <CreditCard className="h-3.5 w-3.5 shrink-0 text-red-400" />
                      <span>{upi}</span>
                    </div>
                  ))}
                  {result.suspiciousEntities.urls.length === 0 &&
                    result.suspiciousEntities.phones.length === 0 &&
                    result.suspiciousEntities.upiIds.length === 0 && (
                      <div className="text-xs text-slate-500 italic">
                        {language === 'kn' ? 'ಯಾವುದೇ ನೇರ URL ಅಥವಾ ಫೋನ್ ಸಂಖ್ಯೆ ಪತ್ತೆಯಾಗಿಲ್ಲ.' : 'No suspicious raw entities extracted.'}
                      </div>
                    )}
                </div>
              </div>

              {/* Bilingual Explanation */}
              <div className="rounded-xl border border-slate-800 bg-slate-950/70 p-3.5">
                <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-1">
                  {language === 'kn' ? 'AI ತನಿಖಾ ವಿವರಣೆ (Analysis):' : 'Forensic Deconstruction:'}
                </div>
                <p className="text-xs leading-relaxed text-slate-200">
                  {language === 'kn' ? result.explanationKn : result.explanation}
                </p>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-slate-800">
                <button
                  type="button"
                  onClick={handleCopyReport}
                  className="flex items-center gap-1.5 rounded-lg border border-slate-700 bg-slate-800 px-3 py-1.5 text-xs font-semibold text-slate-200 hover:border-slate-600"
                >
                  {copied ? <Check className="h-3.5 w-3.5 text-emerald-400" /> : <Copy className="h-3.5 w-3.5" />}
                  <span>{copied ? (language === 'kn' ? 'ನಕಲಿಸಲಾಗಿದೆ' : 'Copied') : language === 'kn' ? 'ವರದಿ ನಕಲಿಸಿ' : 'Copy Report'}</span>
                </button>

                {result.overallScore >= 50 && (
                  <>
                    <button
                      type="button"
                      onClick={() => onNavigateTo('honeypot')}
                      className="flex items-center gap-1.5 rounded-lg bg-purple-600 px-3 py-1.5 text-xs font-bold text-white shadow-md shadow-purple-600/30 hover:bg-purple-500"
                    >
                      <Cpu className="h-3.5 w-3.5" />
                      <span>{language === 'kn' ? 'ಹನಿಪಾಟ್‌ನಲ್ಲಿ ಬಲೆ ಬೀಸಿ' : 'Deploy Honeypot Trap'}</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => onNavigateTo('golden-hour')}
                      className="flex items-center gap-1.5 rounded-lg bg-red-600 px-3 py-1.5 text-xs font-bold text-white shadow-md shadow-red-600/30 hover:bg-red-500"
                    >
                      <Flame className="h-3.5 w-3.5" />
                      <span>{language === 'kn' ? '1930 ತುರ್ತು ಫ್ರೀಜ್' : '1930 Rapid Freeze'}</span>
                    </button>
                  </>
                )}
              </div>
            </div>
          ) : (
            <div className="flex h-full min-h-[380px] flex-col items-center justify-center rounded-2xl border border-dashed border-slate-800 bg-slate-900/30 p-8 text-center">
              <ShieldCheck className="h-10 w-10 text-slate-600 mb-3" />
              <h3 className="text-sm font-bold text-slate-400">
                {language === 'kn' ? 'ಯಾವುದೇ ವಿಶ್ಲೇಷಣೆ ನಡೆಸಲಾಗಿಲ್ಲ' : 'Awaiting Input for Forensic Triage'}
              </h3>
              <p className="mt-1 text-xs text-slate-500 max-w-xs">
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
