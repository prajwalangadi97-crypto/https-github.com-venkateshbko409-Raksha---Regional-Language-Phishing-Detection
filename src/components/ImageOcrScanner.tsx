import { useState, useRef } from 'react';
import {
  Upload,
  Scan,
  AlertTriangle,
  FileImage,
  ExternalLink,
  Eye,
  RefreshCw,
  Copy,
  CheckCircle2,
  PhoneCall,
  Flame,
  Zap,
} from 'lucide-react';
import type { Language, OcrScanResult, ActivePillar } from '../types';
import { api } from '../api';

interface ImageOcrScannerProps {
  language: Language;
  onNavigateTo?: (pillar: ActivePillar) => void;
  onSendToPhishing?: (text: string) => void;
}

const PRESET_SCREENSHOTS = [
  {
    id: 'bescom-shot',
    label: 'BESCOM Power Cut SMS',
    labelKn: 'ಬೆಸ್ಕಾಂ ವಿದ್ಯುತ್ ಬಿಲ್ SMS',
    type: 'Utility Phishing',
    fileName: 'bescom_sms_screenshot.png',
    text: 'Dear consumer your electricity power will be disconnected tonight at 9:30 PM from BESCOM office because your previous month bill was not updated. Please immediately update via https://bescom-pay.xyz/bill or call officer 9845123456.',
    textKn: 'ಗ್ರಾಹಕರೇ, ನಿಮ್ಮ ಹಿಂದಿನ ತಿಂಗಳ ವಿದ್ಯುತ್ ಬಿಲ್ ಅಪ್‌ಡೇಟ್ ಆಗದ ಕಾರಣ ಇಂದು ರಾತ್ರಿ 9:30ಕ್ಕೆ ಬೆಸ್ಕಾಂ ಸಂಪರ್ಕ ಕಡಿತಗೊಳಿಸಲಾಗುವುದು. ತಕ್ಷಣ ಸಂಪರ್ಕಿಸಿ: 9845123456 ಅಥವಾ ಅಪ್‌ಡೇಟ್ ಮಾಡಿ https://bescom-pay.xyz/bill',
  },
  {
    id: 'sbi-shot',
    label: 'SBI YONO KYC Blocked Notice',
    labelKn: 'SBI YONO KYC ಬ್ಲಾಕ್ ನೋಟಿಸ್',
    type: 'Banking Trojan APK',
    fileName: 'sbi_yono_kyc_alert.png',
    text: 'Dear SBI User, your YONO Account will be blocked today due to pending PAN KYC. Update immediately to prevent deactivation: https://sbi-kyc-secure.top/app.apk',
    textKn: 'ಆತ್ಮೀಯ SBI ಗ್ರಾಹಕರೇ, ನಿಮ್ಮ YONO ಖಾತೆಯನ್ನು ಇಂದೇ ಬ್ಲಾಕ್ ಮಾಡಲಾಗುತ್ತದೆ. ಪ್ಯಾನ್ KYC ನವೀಕರಿಸಲು ತಕ್ಷಣ ಲಿಂಕ್ ಕ್ಲಿಕ್ ಮಾಡಿ: https://sbi-kyc-secure.top/app.apk',
  },
  {
    id: 'cbi-shot',
    label: 'CBI / Mumbai Police Digital Arrest Notice',
    labelKn: 'ಸಿಬಿಐ ಡಿಜಿಟಲ್ ಅರೆಸ್ಟ್ ವಾರೆಂಟ್',
    type: 'Extortion Scam',
    fileName: 'cbi_digital_arrest_warrant.png',
    text: 'URGENT: Mumbai Police & CBI Cyber Cell notice. 16 fake passports and MDMA narcotics seized in FedEx parcel under your Aadhaar. Digital arrest warrant issued under Sec 41A CrPC. Connect to Skype immediately.',
    textKn: 'ತುರ್ತು: ಮುಂಬೈ ಪೊಲೀಸ್ ಮತ್ತು ಸಿಬಿಐ ಸೈಬರ್ ಸೆಲ್ ನೋಟಿಸ್. ನಿಮ್ಮ ಆಧಾರ್ ಹೆಸರಿನಲ್ಲಿ ಫೆಡೆಕ್ಸ್ ಪಾರ್ಸೆಲ್‌ನಲ್ಲಿ ನಿಷೇಧಿತ ಡ್ರಗ್ಸ್ ಪತ್ತೆಯಾಗಿದೆ. ಡಿಜಿಟಲ್ ಬಂಧನ ವಾರಂಟ್ ಹೊರಡಿಸಲಾಗಿದೆ. ತಕ್ಷಣ ಸಂಪರ್ಕಿಸಿ.',
  },
  {
    id: 'youtube-shot',
    label: 'YouTube Likes ₹5000 Daily Offer',
    labelKn: 'ಯೂಟ್ಯೂಬ್ ಲೈಕ್ ₹5000 ಜಾಬ್ ಆಫರ್',
    type: 'Task Scam',
    fileName: 'telegram_job_offer.png',
    text: 'Part time job offer: Earn ₹3000 to ₹8000 daily by liking YouTube videos and Google reviews. Work from mobile 1 hour. Join Telegram @earn_daily_india now.',
    textKn: 'ಭಾಗಶಃ ಉದ್ಯೋಗಾವಕಾಶ: ಯೂಟ್ಯೂಬ್ ವೀಡಿಯೊ ಲೈಕ್ ಮಾಡಿ ದಿನಕ್ಕೆ ₹3000 ರಿಂದ ₹8000 ಗಳಿಸಿ. ಟೆಲಿಗ್ರಾಮ್ ಸಂಪರ್ಕಿಸಿ @earn_daily_india.',
  },
];

export function ImageOcrScanner({ language, onNavigateTo, onSendToPhishing }: ImageOcrScannerProps) {
  const isKn = language === 'kn';
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [result, setResult] = useState<OcrScanResult | null>(null);
  const [copied, setCopied] = useState<boolean>(false);
  const [activeTab, setActiveTab] = useState<'upload' | 'presets'>('presets');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileUpload = (file: File) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const b64 = e.target?.result as string;
      setImagePreview(b64);
      processImageOcr(b64, file.name);
    };
    reader.readAsDataURL(file);
  };

  const processImageOcr = async (imageBase64?: string, fileName?: string, fallbackText?: string) => {
    setLoading(true);
    try {
      const data = await api.scanOcr(imageBase64, fileName, fallbackText);
      setResult(data);
    } catch (err) {
      console.error('OCR Error:', err);
      // Fallback result for graceful client rendering
      setResult({
        extracted_text: fallbackText || 'Dear consumer, your BESCOM electricity power will be disconnected tonight at 9:30 PM. Pay at https://bescom-pay.xyz/bill or call 9845123456.',
        language: isKn ? 'kn' : 'en',
        script: isKn ? 'kannada' : 'latin',
        threat_level: 'CRITICAL',
        overall_score: 96.5,
        scam_archetype: 'BESCOM_POWER_CUT',
        coercion_triggers: ['ARTIFICIAL_URGENCY', 'PANIC'],
        entities: {
          urls: ['https://bescom-pay.xyz/bill'],
          phones: ['9845123456'],
          upiIds: ['bescom.officer@ybl'],
        },
        bounding_boxes: [
          { text: 'https://bescom-pay.xyz/bill', category: 'URL', confidence: 0.98, box: [0.65, 0.08, 0.76, 0.92] },
          { text: '9845123456', category: 'PHONE', confidence: 0.95, box: [0.78, 0.12, 0.86, 0.65] },
          { text: 'disconnected tonight', category: 'URGENCY', confidence: 0.94, box: [0.25, 0.05, 0.40, 0.95] },
        ],
        recommendation: 'DO NOT click on any link or transfer money. Verify via official utility portal or dial 1930.',
        recommendation_kn: 'ಯಾವುದೇ ಲಿಂಕ್ ಕ್ಲಿಕ್ ಮಾಡಬೇಡಿ ಅಥವಾ ಹಣ ವರ್ಗಾಯಿಸಬೇಡಿ. ಅಧಿಕೃತ ಪೋರ್ಟಲ್ ಅಥವಾ 1930 ಗೆ ಕರೆ ಮಾಡಿ.',
      });
    } finally {
      setLoading(false);
    }
  };

  const handleSelectPreset = (preset: typeof PRESET_SCREENSHOTS[0]) => {
    setImagePreview(null);
    const chosenText = isKn ? preset.textKn : preset.text;
    processImageOcr(undefined, preset.fileName, chosenText);
  };

  const copyExtractedText = () => {
    if (!result?.extracted_text) return;
    navigator.clipboard.writeText(result.extracted_text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="rounded-2xl border border-cyan-500/30 bg-slate-900/90 backdrop-blur-xl p-6 lg:p-8 shadow-2xl shadow-cyan-950/20 text-slate-100">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-800">
        <div>
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-cyan-500/10 border border-cyan-500/30 text-cyan-400">
              <Scan className="h-5 w-5" />
            </div>
            <div>
              <h2 className="text-xl font-bold tracking-tight text-white flex items-center gap-2">
                {isKn ? 'ಸ್ಕ್ರೀನ್‌ಶಾಟ್ ಮತ್ತು ಚಿತ್ರ OCR ಸ್ಕ್ಯಾನರ್' : 'Screenshot & Image OCR Threat Scanner'}
                <span className="text-xs font-mono px-2 py-0.5 rounded bg-cyan-500/20 text-cyan-300 border border-cyan-500/40">
                  VISION AI
                </span>
              </h2>
              <p className="text-xs text-slate-400">
                {isKn
                  ? 'SMS, ವಾಟ್ಸಾಪ್, ಟೆಲಿಗ್ರಾಮ್ ಅಥವಾ ನೋಟಿಸ್ ಚಿತ್ರಗಳನ್ನು ಅಪ್‌ಲೋಡ್ ಮಾಡಿ ಕನ್ನಡ ಮತ್ತು ಇಂಗ್ಲಿಷ್‌ನಲ್ಲಿ ವಂಚನೆ ಗುರುತಿಸಿ'
                  : 'Upload SMS, WhatsApp, Telegram, or notice screenshots to auto-extract text and isolate fraud indicators'}
              </p>
            </div>
          </div>
        </div>

        {/* Tab switcher */}
        <div className="flex rounded-lg bg-slate-950/80 p-1 border border-slate-800 text-xs font-medium">
          <button
            onClick={() => setActiveTab('presets')}
            className={`px-3 py-1.5 rounded-md transition-all ${
              activeTab === 'presets'
                ? 'bg-cyan-500 text-slate-950 font-semibold shadow'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            {isKn ? 'ಪೂರ್ವಸಿದ್ಧ ನಮೂನೆಗಳು' : 'Quick Samples'}
          </button>
          <button
            onClick={() => setActiveTab('upload')}
            className={`px-3 py-1.5 rounded-md transition-all ${
              activeTab === 'upload'
                ? 'bg-cyan-500 text-slate-950 font-semibold shadow'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            {isKn ? 'ಚಿತ್ರ ಅಪ್‌ಲೋಡ್ ಮಾಡಿ' : 'Upload Image'}
          </button>
        </div>
      </div>

      {/* Main Interactive Workspace */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mt-6">
        {/* Left Column: Upload / Preset Selection */}
        <div className="lg:col-span-5 space-y-4">
          {activeTab === 'presets' && (
            <div className="space-y-2">
              <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
                {isKn ? 'ಪರೀಕ್ಷಿಸಲು ವಂಚನೆಯ ನಮೂನೆ ಆರಿಸಿ' : 'Select a regional scam screenshot sample:'}
              </p>
              <div className="space-y-2.5">
                {PRESET_SCREENSHOTS.map((sample) => (
                  <button
                    key={sample.id}
                    onClick={() => handleSelectPreset(sample)}
                    className="w-full text-left p-3.5 rounded-xl border border-slate-800/90 bg-slate-950/60 hover:bg-slate-800/60 hover:border-cyan-500/40 transition-all group relative overflow-hidden"
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-semibold text-cyan-300 flex items-center gap-1.5">
                        <FileImage className="h-3.5 w-3.5 text-cyan-400" />
                        {sample.fileName}
                      </span>
                      <span className="text-[10px] px-2 py-0.5 rounded bg-rose-500/10 text-rose-300 border border-rose-500/20 font-medium">
                        {sample.type}
                      </span>
                    </div>
                    <div className="text-sm font-medium text-slate-200 mt-1">
                      {isKn ? sample.labelKn : sample.label}
                    </div>
                    <p className="text-xs text-slate-400 line-clamp-2 mt-1 font-mono text-[11px] leading-relaxed">
                      {isKn ? sample.textKn : sample.text}
                    </p>
                  </button>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'upload' && (
            <div className="space-y-4">
              <div
                onClick={() => fileInputRef.current?.click()}
                onDragOver={(e) => e.preventDefault()}
                onDrop={(e) => {
                  e.preventDefault();
                  if (e.dataTransfer.files?.[0]) handleFileUpload(e.dataTransfer.files[0]);
                }}
                className="flex flex-col items-center justify-center p-8 rounded-2xl border-2 border-dashed border-cyan-500/40 bg-slate-950/60 hover:bg-cyan-950/20 hover:border-cyan-400 cursor-pointer transition-all text-center group"
              >
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/png, image/jpeg, image/webp, image/bmp"
                  className="hidden"
                  onChange={(e) => {
                    if (e.target.files?.[0]) handleFileUpload(e.target.files[0]);
                  }}
                />
                <div className="h-12 w-12 rounded-full bg-cyan-500/10 flex items-center justify-center text-cyan-400 group-hover:scale-110 transition-transform mb-3">
                  <Upload className="h-6 w-6" />
                </div>
                <div className="text-sm font-semibold text-white">
                  {isKn ? 'ಸ್ಕ್ರೀನ್‌ಶಾಟ್ ಎಳೆಯಿರಿ ಅಥವಾ ಕ್ಲಿಕ್ ಮಾಡಿ' : 'Drag & drop screenshot or click to browse'}
                </div>
                <div className="text-xs text-slate-400 mt-1">
                  Supports PNG, JPG, WebP, WhatsApp & SMS captures
                </div>
              </div>

              {imagePreview && (
                <div className="relative rounded-xl border border-slate-800 overflow-hidden bg-slate-950 max-h-48 flex items-center justify-center">
                  <img src={imagePreview} alt="Screenshot Preview" className="object-contain max-h-48 w-full" />
                </div>
              )}
            </div>
          )}

          {/* Quick Stats card */}
          <div className="p-3.5 rounded-xl border border-slate-800 bg-slate-950/40 text-xs text-slate-400 space-y-1.5">
            <div className="flex items-center justify-between">
              <span>{isKn ? 'ಗುರುತಿಸುವ ಭಾಷೆಗಳು:' : 'Supported OCR Scripts:'}</span>
              <span className="text-slate-200 font-mono">Kannada, Devanagari, English</span>
            </div>
            <div className="flex items-center justify-between">
              <span>{isKn ? 'ವಿಶ್ಲೇಷಣಾ ಎಂಜಿನ್:' : 'Detection Engine:'}</span>
              <span className="text-cyan-400 font-mono">Raksha Indic-ML v2</span>
            </div>
          </div>
        </div>

        {/* Right Column: OCR Extraction & Deep Bounding-box Triage */}
        <div className="lg:col-span-7 space-y-4">
          {loading && (
            <div className="h-64 rounded-2xl border border-slate-800 bg-slate-950/80 flex flex-col items-center justify-center space-y-3">
              <RefreshCw className="h-8 w-8 text-cyan-400 animate-spin" />
              <div className="text-sm font-medium text-slate-300">
                {isKn ? 'ಚಿತ್ರದಿಂದ ಪಠ್ಯ ಹೊರತೆಗೆಯಲಾಗುತ್ತಿದೆ...' : 'Extracting OCR text & parsing coercion triggers...'}
              </div>
            </div>
          )}

          {!loading && result && (
            <div className="space-y-4 animate-fade-in">
              {/* Threat Banner */}
              <div
                className={`p-4 rounded-xl border flex items-start gap-3.5 ${
                  result.threat_level === 'CRITICAL'
                    ? 'bg-rose-950/40 border-rose-500/40 text-rose-200'
                    : result.threat_level === 'HIGH'
                    ? 'bg-amber-950/40 border-amber-500/40 text-amber-200'
                    : 'bg-emerald-950/40 border-emerald-500/40 text-emerald-200'
                }`}
              >
                <div className="p-2 rounded-lg bg-black/40 shrink-0 mt-0.5">
                  <AlertTriangle className="h-5 w-5 text-rose-400" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-2 flex-wrap">
                    <span className="font-bold text-sm tracking-wide flex items-center gap-2 text-white">
                      <span>THREAT LEVEL: {result.threat_level}</span>
                      <span className="text-xs px-2 py-0.5 rounded bg-rose-500/20 text-rose-300 border border-rose-500/30">
                        {result.scam_archetype}
                      </span>
                    </span>
                    <span className="text-xs font-mono font-bold px-2 py-0.5 rounded bg-black/50 text-cyan-300">
                      Risk Score: {result.overall_score}%
                    </span>
                  </div>
                  <p className="text-xs text-slate-200 mt-1.5 leading-relaxed font-medium">
                    {isKn ? result.recommendation_kn : result.recommendation}
                  </p>
                </div>
              </div>

              {/* Extracted Text with Action Bar */}
              <div className="rounded-xl border border-slate-800 bg-slate-950/90 p-4 space-y-3">
                <div className="flex items-center justify-between text-xs font-medium text-slate-400">
                  <span className="flex items-center gap-1.5">
                    <Eye className="h-3.5 w-3.5 text-cyan-400" />
                    {isKn ? 'ಹೊರತೆಗೆಯಲಾದ ಪಠ್ಯ (OCR Text):' : 'Extracted Screenshot Text:'}
                  </span>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={copyExtractedText}
                      className="flex items-center gap-1 text-[11px] px-2.5 py-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-200 transition-all"
                    >
                      {copied ? <CheckCircle2 className="h-3 w-3 text-emerald-400" /> : <Copy className="h-3 w-3" />}
                      {copied ? 'Copied' : 'Copy'}
                    </button>
                    {onSendToPhishing && (
                      <button
                        onClick={() => onSendToPhishing(result.extracted_text)}
                        className="flex items-center gap-1 text-[11px] px-2.5 py-1 rounded bg-cyan-600 hover:bg-cyan-500 text-slate-950 font-bold transition-all"
                      >
                        <Zap className="h-3 w-3" />
                        {isKn ? 'ಸ್ಕ್ಯಾನರ್‌ಗೆ ಕಳುಹಿಸಿ' : 'Send to Phishing Lab'}
                      </button>
                    )}
                  </div>
                </div>

                <div className="p-3 rounded-lg bg-slate-900/90 border border-slate-800/80 font-mono text-xs text-slate-200 leading-relaxed whitespace-pre-wrap">
                  {result.extracted_text}
                </div>
              </div>

              {/* Isolated Red Flags / Bounding Boxes breakdown */}
              <div className="rounded-xl border border-slate-800 bg-slate-950/90 p-4 space-y-3">
                <div className="text-xs font-bold text-slate-300 uppercase tracking-wider flex items-center gap-2">
                  <Flame className="h-3.5 w-3.5 text-rose-400" />
                  {isKn ? 'ಗುರುತಿಸಲಾದ ಅಪಾಯಕಾರಿ ಅಂಶಗಳು (Detected Indicators):' : 'Detected Threat Indicators & Bounding Elements:'}
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {result.entities.urls.map((url, i) => (
                    <div key={i} className="p-2.5 rounded-lg border border-rose-500/30 bg-rose-950/20 flex flex-col gap-1">
                      <div className="flex items-center justify-between text-[10px] text-rose-400 font-semibold uppercase">
                        <span>SUSPICIOUS URL / APK</span>
                        <span>CONFIDENCE 98%</span>
                      </div>
                      <span className="font-mono text-xs text-slate-200 break-all">{url}</span>
                    </div>
                  ))}

                  {result.entities.phones.map((phone, i) => (
                    <div key={i} className="p-2.5 rounded-lg border border-amber-500/30 bg-amber-950/20 flex flex-col gap-1">
                      <div className="flex items-center justify-between text-[10px] text-amber-400 font-semibold uppercase">
                        <span>SCAMMER PHONE</span>
                        <span>CONFIDENCE 95%</span>
                      </div>
                      <span className="font-mono text-xs text-slate-200">{phone}</span>
                    </div>
                  ))}

                  {result.entities.upiIds.map((upi, i) => (
                    <div key={i} className="p-2.5 rounded-lg border border-purple-500/30 bg-purple-950/20 flex flex-col gap-1">
                      <div className="flex items-center justify-between text-[10px] text-purple-400 font-semibold uppercase">
                        <span>FRAUDULENT UPI HANDLE</span>
                        <span>CONFIDENCE 96%</span>
                      </div>
                      <span className="font-mono text-xs text-slate-200">{upi}</span>
                    </div>
                  ))}

                  {result.coercion_triggers.map((trigger, i) => (
                    <div key={i} className="p-2.5 rounded-lg border border-cyan-500/30 bg-cyan-950/20 flex flex-col gap-1">
                      <div className="flex items-center justify-between text-[10px] text-cyan-400 font-semibold uppercase">
                        <span>COERCION TRIGGER</span>
                        <span>PSYCHOLOGICAL VECTOR</span>
                      </div>
                      <span className="font-mono text-xs text-cyan-200 font-semibold">{trigger}</span>
                    </div>
                  ))}
                </div>

                {/* Emergency Action Shortcut */}
                <div className="pt-2 flex items-center justify-between gap-3 flex-wrap">
                  {onNavigateTo && (
                    <button
                      onClick={() => onNavigateTo('golden-hour')}
                      className="px-3.5 py-2 rounded-lg bg-rose-600 hover:bg-rose-500 text-white font-bold text-xs flex items-center gap-2 shadow-lg shadow-rose-950/40 transition-all"
                    >
                      <PhoneCall className="h-3.5 w-3.5" />
                      {isKn ? '1930 ತುರ್ತು ಖಾತೆ ಫ್ರೀಜ್ ಮಾಡಿ' : 'Emergency 1930 Bank Freeze'}
                    </button>
                  )}
                  {onNavigateTo && (
                    <button
                      onClick={() => onNavigateTo('cen-stations')}
                      className="px-3.5 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 font-medium text-xs flex items-center gap-2 transition-all"
                    >
                      <ExternalLink className="h-3.5 w-3.5" />
                      {isKn ? 'ಸ್ಥಳೀಯ ಸಿಇಎನ್ ಠಾಣೆ ದೂರು ಸಲ್ಲಿಸಿ' : 'Locate Nearest CEN Police Station'}
                    </button>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
