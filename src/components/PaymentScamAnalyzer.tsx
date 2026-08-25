import React, { useState } from 'react';
import {
  CreditCard,
  QrCode,
  AlertOctagon,
  Zap,
  RefreshCw,
} from 'lucide-react';
import type { Language, PaymentScamAnalysis } from '../types';

interface PaymentScamAnalyzerProps {
  language: Language;
}

export const PaymentScamAnalyzer: React.FC<PaymentScamAnalyzerProps> = ({
  language,
}) => {
  const [upiPayload, setUpiPayload] = useState(
    'upi://pay?pa=refundscam@ibl&pn=BESCOM_Refund_Officer&am=12000&cu=INR&tn=Click_to_receive_money'
  );
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [result, setResult] = useState<PaymentScamAnalysis | null>(null);

  const handleAnalyzeUPI = () => {
    if (!upiPayload.trim()) return;

    setIsAnalyzing(true);
    setTimeout(() => {
      const isReverseScam =
        upiPayload.toLowerCase().includes('refund') ||
        upiPayload.toLowerCase().includes('receive') ||
        upiPayload.toLowerCase().includes('cashback');

      const flags: string[] = [];
      let riskScore = 20;

      if (upiPayload.startsWith('upi://pay')) {
        flags.push('Payload executes a DEBIT (Payment Outward) request');
      }
      if (isReverseScam) {
        riskScore = 96;
        flags.push('Transaction note contains deceptive "Receive/Refund" keyword to trick victim into entering UPI PIN');
        flags.push('VPA handle does not belong to an official registered utility or merchant gateway');
      }
      if (upiPayload.includes('am=')) {
        flags.push('Pre-fixed debit amount detected in URI');
      }

      setResult({
        type: 'REVERSE_UPI',
        riskScore: riskScore,
        threatLevel: riskScore > 75 ? 'CRITICAL' : 'SAFE',
        flags: flags,
        scammerUPI: 'refundscam@ibl',
        suggestedAction:
          'DO NOT ENTER YOUR UPI PIN. This request will deduct ₹12,000 from your bank account immediately.',
        suggestedActionKn:
          'ದಯವಿಟ್ಟು ನಿಮ್ಮ UPI PIN ನಮೂದಿಸಬೇಡಿ! ಇದು ನಿಮ್ಮ ಖಾತೆಯಿಂದ ₹12,000 ಹಣವನ್ನು ಕಡಿತಗೊಳಿಸುವ ಮೋಸದ ವಹಿವಾಟು.',
      });
      setIsAnalyzing(false);
    }, 1200);
  };

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="mb-6 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-teal-500/20 text-teal-400">
              <CreditCard className="h-4 w-4" />
            </span>
            <h2 className="text-xl font-bold text-slate-100 sm:text-2xl">
              {language === 'kn'
                ? 'UPI ರಿವರ್ಸ್ ಪೇಮೆಂಟ್ & QR ಕೋಡ್ ಟ್ರ್ಯಾಪ್ ಡಿಟೆಕ್ಟರ್'
                : 'UPI Reverse Payment & QR Fraud Analyzer'}
            </h2>
          </div>
          <p className="mt-1 text-xs text-slate-400 sm:text-sm">
            {language === 'kn'
              ? 'ಹಣ ಸ್ವೀಕರಿಸುವ ನೆಪದಲ್ಲಿ ಕಳುಹಿಸಲಾಗುವ ನಕಲಿ QR ಕೋಡ್‌ಗಳು ಮತ್ತು UPI ಕಲೆಕ್ಟ್ ರಿಕ್ವೆಸ್ಟ್‌ಗಳನ್ನು ಡಿಕೋಡ್ ಮಾಡಿ.'
              : 'Deconstruct deceptive QR payloads and UPI URIs that trick victims into authorizing outward debits.'}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
        {/* Left: Input Payload (6 cols) */}
        <div className="lg:col-span-6 flex flex-col gap-4">
          <div className="rounded-2xl border border-slate-800 bg-slate-900/80 p-5 backdrop-blur-md">
            <label htmlFor="upi-payload-input" className="text-xs font-bold uppercase tracking-wider text-slate-300 block mb-2">
              {language === 'kn' ? 'UPI ಲಿಂಕ್ ಅಥವಾ QR ಪೇಲೋಡ್ ನಮೂದಿಸಿ:' : 'Paste UPI Link / QR Payload / Intent String:'}
            </label>

            <textarea
              id="upi-payload-input"
              rows={4}
              value={upiPayload}
              onChange={(e) => setUpiPayload(e.target.value)}
              placeholder="upi://pay?pa=merchant@upi&pn=Store&am=500"
              className="w-full rounded-xl border border-slate-800 bg-slate-950 p-3 font-mono text-xs text-slate-200 focus:border-cyan-500 focus:outline-none"
            />

            <div className="mt-4 flex items-center justify-between">
              <button
                type="button"
                onClick={handleAnalyzeUPI}
                disabled={isAnalyzing || !upiPayload.trim()}
                className="flex items-center gap-2 rounded-xl bg-gradient-to-r from-teal-500 to-emerald-500 px-5 py-2 text-xs font-bold text-slate-950 shadow-md hover:scale-105 disabled:opacity-50"
              >
                {isAnalyzing ? (
                  <>
                    <RefreshCw className="h-4 w-4 animate-spin" />
                    <span>Analyzing Payload...</span>
                  </>
                ) : (
                  <>
                    <Zap className="h-4 w-4" />
                    <span>{language === 'kn' ? 'ಪೇಲೋಡ್ ಪರಿಶೀಲಿಸಿ' : 'Inspect UPI Payload'}</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Right: Analysis Breakdown (6 cols) */}
        <div className="lg:col-span-6">
          {result ? (
            <div className="rounded-2xl border border-slate-800 bg-slate-900/80 p-5 backdrop-blur-md">
              <div className="flex items-center justify-between border-b border-slate-800 pb-3 mb-4">
                <div>
                  <span className="text-[10px] font-bold uppercase text-slate-400 font-mono">
                    PAYLOAD TYPE
                  </span>
                  <div className="text-sm font-bold text-slate-100 mt-0.5">
                    {result.type}
                  </div>
                </div>

                <span
                  className={`rounded-xl border px-3 py-1 font-mono text-xs font-bold ${
                    result.threatLevel === 'CRITICAL'
                      ? 'border-red-500/50 bg-red-950/60 text-red-300'
                      : 'border-emerald-500/50 bg-emerald-950/60 text-emerald-300'
                  }`}
                >
                  {result.threatLevel} ({result.riskScore}/100)
                </span>
              </div>

              {/* Warning Alert */}
              <div className="rounded-xl border border-red-500/40 bg-red-950/30 p-3.5 text-red-300 mb-4">
                <div className="flex items-center gap-2 font-bold mb-1">
                  <AlertOctagon className="h-4 w-4 text-red-400" />
                  <span>CRITICAL WARNING:</span>
                </div>
                <p className="text-xs leading-relaxed font-sans">
                  {language === 'kn' ? result.suggestedActionKn : result.suggestedAction}
                </p>
              </div>

              {/* Flags */}
              <div className="space-y-2">
                <div className="text-[10px] font-bold uppercase text-slate-400">
                  Detected Protocol Irregularities:
                </div>
                {result.flags.map((flag, idx) => (
                  <div
                    key={idx}
                    className="flex items-center gap-2 rounded-lg bg-slate-950/60 p-2.5 text-xs text-slate-300 border border-slate-800"
                  >
                    <span className="h-1.5 w-1.5 rounded-full bg-red-400" />
                    <span>{flag}</span>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div className="flex h-full min-h-[220px] flex-col items-center justify-center rounded-2xl border border-dashed border-slate-800 bg-slate-900/30 p-6 text-center">
              <QrCode className="h-8 w-8 text-slate-600 mb-2" />
              <span className="text-xs text-slate-400">
                Click "Inspect UPI Payload" to verify transaction flow.
              </span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
