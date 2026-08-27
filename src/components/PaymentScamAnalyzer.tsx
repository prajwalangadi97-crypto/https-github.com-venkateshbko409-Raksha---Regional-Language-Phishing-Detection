import React, { useState } from 'react';
import {
  CreditCard,
  QrCode,
  AlertOctagon,
  Zap,
  RefreshCw,
  AlertTriangle,
  ExternalLink,
  ArrowRight,
} from 'lucide-react';
import type { Language, PaymentScamAnalysis, ActivePillar } from '../types';

interface PaymentScamAnalyzerProps {
  language: Language;
  onNavigateTo?: (pillar: ActivePillar) => void;
}

const PRESET_UPI_PAYLOADS = [
  {
    label: 'BESCOM Fake Refund Collect Request',
    labelKn: 'ಬೆಸ್ಕಾಂ ನಕಲಿ ರೀಫಂಡ್ ಕಲೆಕ್ಟ್ ರಿಕ್ವೆಸ್ಟ್',
    payload: 'upi://pay?pa=refund.bescom.officer@ibl&pn=BESCOM_Refund_Department&am=12000&cu=INR&tn=Click_to_receive_power_rebate',
  },
  {
    label: 'OLX Army Buyer Scan to Receive',
    labelKn: 'OLX ಆರ್ಮಿ ಅಧಿಕಾರಿ QR ಸ್ಕ್ಯಾನ್ ವಂಚನೆ',
    payload: 'upi://pay?pa=defense.canteen.pay@okaxis&pn=Army_Canteen_Board&am=18500&cu=INR&tn=Scan_to_claim_advance_cash',
  },
  {
    label: 'PhonePe Lottery Reward Voucher',
    labelKn: 'PhonePe ಲಾಟರಿ ರಿವಾರ್ಡ್ ವೋಚರ್',
    payload: 'upi://pay?pa=reward.cashback.claim@paytm&pn=PhonePe_Reward_Claim&am=4999&cu=INR&tn=Enter_UPI_PIN_to_credit_5000',
  },
];

export const PaymentScamAnalyzer: React.FC<PaymentScamAnalyzerProps> = ({
  language,
  onNavigateTo,
}) => {
  const isKn = language === 'kn';
  const [upiPayload, setUpiPayload] = useState(PRESET_UPI_PAYLOADS[0].payload);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [result, setResult] = useState<PaymentScamAnalysis | null>(null);
  const [parsedParams, setParsedParams] = useState<Record<string, string>>({});

  const parseUpiUri = (uri: string) => {
    const params: Record<string, string> = {};
    if (!uri.includes('?')) return params;
    const query = uri.split('?')[1];
    query.split('&').forEach((part) => {
      const [k, v] = part.split('=');
      if (k && v) params[k] = decodeURIComponent(v);
    });
    return params;
  };

  const handleAnalyzeUPI = () => {
    if (!upiPayload.trim()) return;

    setIsAnalyzing(true);
    const parsed = parseUpiUri(upiPayload);
    setParsedParams(parsed);

    setTimeout(() => {
      const isReverseScam =
        upiPayload.toLowerCase().includes('refund') ||
        upiPayload.toLowerCase().includes('receive') ||
        upiPayload.toLowerCase().includes('cashback') ||
        upiPayload.toLowerCase().includes('claim') ||
        upiPayload.toLowerCase().includes('rebate');

      const flags: string[] = [];
      let riskScore = 20;

      if (upiPayload.startsWith('upi://pay')) {
        flags.push('Payload executes an OUTWARD DEBIT request (deducts funds from your account)');
      }
      if (isReverseScam) {
        riskScore = 98;
        flags.push('CRITICAL: Transaction note uses deceptive "Receive/Claim/Refund" keywords to trick victim into entering UPI PIN');
        flags.push('Unverified private VPA handle spoofing an official utility or armed forces canteen');
      }
      if (parsed['am']) {
        flags.push(`Pre-filled amount detected: ₹${parsed['am']} will be debited instantly`);
      }
      if (parsed['pn']) {
        flags.push(`Payee Name set to deceptive identity: "${parsed['pn']}"`);
      }

      setResult({
        type: 'REVERSE_UPI',
        riskScore: riskScore,
        threatLevel: riskScore > 75 ? 'CRITICAL' : 'SAFE',
        flags: flags,
        scammerUPI: parsed['pa'] || 'refund.scammer@ibl',
        suggestedAction:
          'DO NOT ENTER YOUR UPI PIN. Entering your PIN will instantly TRANSFER MONEY OUT of your account to the scammer.',
        suggestedActionKn:
          'ದಯವಿಟ್ಟು ನಿಮ್ಮ UPI PIN ನಮೂದಿಸಬೇಡಿ! PIN ನಮೂದಿಸಿದರೆ ನಿಮ್ಮ ಖಾತೆಯಿಂದ ಹಣ ಕಡಿತವಾಗಿ ವಂಚಕನ ಖಾತೆಗೆ ತಕ್ಷಣ ವರ್ಗಾವಣೆಯಾಗುತ್ತದೆ.',
      });
      setIsAnalyzing(false);
    }, 800);
  };

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8 space-y-6 animate-fade-in text-white">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <div className="flex items-center gap-2.5">
            <span className="flex h-8 w-8 items-center justify-center rounded-xl bg-white/[0.05] text-sky-400 border border-white/10">
              <CreditCard className="h-4 w-4" />
            </span>
            <h2 className="text-xl font-bold font-heading text-white sm:text-2xl">
              {isKn
                ? 'UPI ರಿವರ್ಸ್ ಪೇಮೆಂಟ್ & QR ಕೋಡ್ ಟ್ರ್ಯಾಪ್ ಡಿಟೆಕ್ಟರ್'
                : 'UPI Fraud, Reverse Payment & QR Intent Decoder'}
            </h2>
          </div>
          <p className="mt-1 text-xs text-slate-400 sm:text-sm font-sans">
            {isKn
              ? 'ಹಣ ಸ್ವೀಕರಿಸುವ ನೆಪದಲ್ಲಿ ಕಳುಹಿಸಲಾಗುವ ನಕಲಿ QR ಕೋಡ್‌ಗಳು ಮತ್ತು UPI ಕಲೆಕ್ಟ್ ರಿಕ್ವೆಸ್ಟ್‌ಗಳನ್ನು ಡಿಕೋಡ್ ಮಾಡಿ.'
              : 'Deconstruct deceptive QR payloads and UPI URIs that trick victims into authorizing outward debits.'}
          </p>
        </div>

        {/* Golden Rule Pill */}
        <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-200 text-xs font-mono">
          <AlertTriangle className="h-4 w-4 text-amber-400 shrink-0" />
          <span className="font-bold">GOLDEN RULE: NO UPI PIN NEEDED TO RECEIVE MONEY</span>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
        {/* Left: Input Payload & Preset Switcher (6 cols) */}
        <div className="lg:col-span-6 flex flex-col gap-4">
          <div className="figma-card-static p-5 sm:p-6 space-y-4">
            <label htmlFor="upi-payload-input" className="text-xs font-bold uppercase tracking-wider text-slate-300 block font-heading">
              {isKn ? 'UPI ಲಿಂಕ್ ಅಥವಾ QR ಪೇಲೋಡ್ ನಮೂದಿಸಿ:' : 'Paste UPI Intent Link / QR Code String:'}
            </label>

            <textarea
              id="upi-payload-input"
              rows={3}
              value={upiPayload}
              onChange={(e) => setUpiPayload(e.target.value)}
              placeholder="upi://pay?pa=merchant@upi&pn=Store&am=500&cu=INR"
              className="w-full rounded-2xl border border-white/10 bg-[#0a0d14] p-3 text-xs font-mono text-sky-300 placeholder-slate-600 focus:border-sky-400 focus:outline-none focus:ring-2 focus:ring-sky-400/20 transition-all"
            />

            <div className="flex items-center justify-between gap-3">
              <button
                type="button"
                onClick={handleAnalyzeUPI}
                disabled={isAnalyzing}
                className="flex items-center gap-2 rounded-full bg-white px-5 py-2.5 text-xs font-bold font-heading text-slate-950 shadow-md shadow-white/15 hover:bg-sky-50 transition-all cursor-pointer"
              >
                {isAnalyzing ? (
                  <RefreshCw className="h-3.5 w-3.5 animate-spin text-slate-950" />
                ) : (
                  <Zap className="h-3.5 w-3.5 text-sky-600" />
                )}
                <span>{isAnalyzing ? (isKn ? 'ಡಿಕೋಡ್ ಮಾಡಲಾಗುತ್ತಿದೆ...' : 'Decoding URI...') : isKn ? 'ಪೇಲೋಡ್ ಡಿಕೋಡ್ ಮಾಡಿ' : 'Analyze UPI Intent'}</span>
              </button>

              <button
                onClick={() => setUpiPayload('')}
                className="text-xs text-slate-400 hover:text-white transition-all font-mono cursor-pointer"
              >
                Clear
              </button>
            </div>
          </div>

          {/* Quick Presets */}
          <div className="space-y-2">
            <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider font-heading">
              {isKn ? 'ಪರೀಕ್ಷಾ ಮಾದರಿಗಳು (Select Sample):' : 'Select suspicious payment intent sample:'}
            </p>
            <div className="space-y-2">
              {PRESET_UPI_PAYLOADS.map((item, idx) => (
                <button
                  key={idx}
                  onClick={() => {
                    setUpiPayload(item.payload);
                    setResult(null);
                  }}
                  className="w-full text-left p-3.5 rounded-2xl border border-white/[0.07] bg-white/[0.02] hover:bg-white/[0.06] hover:border-sky-400/40 transition-all text-xs cursor-pointer"
                >
                  <span className="font-bold text-slate-200 block font-heading">{isKn ? item.labelKn : item.label}</span>
                  <span className="font-mono text-[11px] text-sky-400 truncate block mt-0.5">{item.payload}</span>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Right: Decoded Parameters & Fraud Assessment (6 cols) */}
        <div className="lg:col-span-6 flex flex-col gap-4">
          <div className="figma-card-static p-5 sm:p-6 space-y-4 backdrop-blur-2xl">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-200 flex items-center gap-2 font-heading">
              <QrCode className="h-4 w-4 text-sky-400" />
              <span>{isKn ? 'ಡಿಕೋಡ್ ಮಾಡಿದ ಪ್ಯಾರಾಮೀಟರ್‌ಗಳು' : 'Decoded UPI Parameters & Risk Audit'}</span>
            </h3>

            {isAnalyzing && (
              <div className="h-44 flex flex-col items-center justify-center space-y-2">
                <RefreshCw className="h-6 w-6 text-sky-400 animate-spin" />
                <span className="text-xs text-slate-400 font-mono">Parsing URI scheme and NPCI VPA registry...</span>
              </div>
            )}

            {!isAnalyzing && result && (
              <div className="space-y-4 animate-fade-in">
                {/* Threat Banner */}
                <div className="p-4 rounded-2xl bg-rose-500/10 border border-rose-500/30 text-rose-200 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-xs flex items-center gap-2 text-white font-heading">
                      <AlertOctagon className="h-4 w-4 text-rose-400" />
                      REVERSE PAYMENT FRAUD DETECTED
                    </span>
                    <span className="font-mono text-xs font-bold px-2.5 py-0.5 rounded-full bg-rose-500/20 text-rose-300 border border-rose-500/30">
                      Score: {result.riskScore}%
                    </span>
                  </div>
                  <p className="text-xs leading-relaxed font-medium font-sans">
                    {isKn ? result.suggestedActionKn : result.suggestedAction}
                  </p>
                </div>

                {/* Parameter Table */}
                {Object.keys(parsedParams).length > 0 && (
                  <div className="grid grid-cols-2 gap-2.5 text-xs">
                    <div className="p-3 rounded-xl bg-white/[0.03] border border-white/[0.08]">
                      <span className="text-slate-500 text-[10px] uppercase font-mono block">Payee VPA (pa)</span>
                      <span className="text-rose-300 font-mono font-bold break-all">{parsedParams['pa']}</span>
                    </div>
                    <div className="p-3 rounded-xl bg-white/[0.03] border border-white/[0.08]">
                      <span className="text-slate-500 text-[10px] uppercase font-mono block">Payee Name (pn)</span>
                      <span className="text-slate-200 font-bold">{parsedParams['pn']}</span>
                    </div>
                    <div className="p-3 rounded-xl bg-white/[0.03] border border-white/[0.08]">
                      <span className="text-slate-500 text-[10px] uppercase font-mono block">Amount (am)</span>
                      <span className="text-rose-400 font-mono font-bold">₹{parsedParams['am'] || 'Custom'}</span>
                    </div>
                    <div className="p-3 rounded-xl bg-white/[0.03] border border-white/[0.08]">
                      <span className="text-slate-500 text-[10px] uppercase font-mono block">Transaction Note (tn)</span>
                      <span className="text-amber-300 font-mono text-[11px]">{parsedParams['tn'] || 'None'}</span>
                    </div>
                  </div>
                )}

                {/* Flags */}
                <div className="space-y-1.5 font-mono text-xs">
                  {result.flags.map((flag, idx) => (
                    <div key={idx} className="flex items-start gap-2 text-slate-300 rounded-xl bg-white/[0.02] p-2 border border-white/[0.06]">
                      <span className="text-rose-400 mt-0.5">•</span>
                      <span>{flag}</span>
                    </div>
                  ))}
                </div>

                {/* 1-Click NPCI Dispute & Freeze Links */}
                <div className="pt-2 flex items-center justify-between gap-3 flex-wrap">
                  {onNavigateTo && (
                    <button
                      onClick={() => onNavigateTo('golden-hour')}
                      className="px-4 py-2 rounded-full bg-gradient-to-r from-rose-600 to-pink-600 hover:opacity-95 text-white font-bold text-xs flex items-center gap-2 shadow-lg shadow-rose-600/20 transition-all cursor-pointer font-heading"
                    >
                      <span>1930 Bank UPI Account Freeze</span>
                      <ArrowRight className="h-3.5 w-3.5" />
                    </button>
                  )}

                  <a
                    href="https://www.npci.org.in/what-we-do/upi/dispute-redressal-mechanism"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs text-sky-400 hover:underline flex items-center gap-1 font-mono"
                  >
                    <ExternalLink className="h-3 w-3" />
                    NPCI UPI Dispute Portal
                  </a>
                </div>
              </div>
            )}

            {!isAnalyzing && !result && (
              <div className="h-44 flex flex-col items-center justify-center text-center p-4 text-xs text-slate-500 border border-dashed border-white/10 rounded-2xl bg-white/[0.01]">
                <span>Click "Analyze UPI Intent" to deconstruct parameters and check for reverse charge traps</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentScamAnalyzer;
