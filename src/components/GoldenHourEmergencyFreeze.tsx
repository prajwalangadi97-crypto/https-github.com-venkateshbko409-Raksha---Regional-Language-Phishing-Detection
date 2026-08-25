import React, { useState, useEffect } from 'react';
import {
  Flame,
  Clock,
  PhoneCall,
  Mail,
  Copy,
  Check,
  Building2,
  MapPin,
  FileText,
} from 'lucide-react';
import type { Language, IncidentReport } from '../types';
import { bankFreezeNotices, karnatakaCENStations } from '../data/karnatakaScamData';

interface GoldenHourEmergencyFreezeProps {
  language: Language;
}

export const GoldenHourEmergencyFreeze: React.FC<GoldenHourEmergencyFreezeProps> = ({
  language,
}) => {
  // 2-Hour Golden Window Timer (7200 seconds)
  const [secondsRemaining, setSecondsRemaining] = useState<number>(7200);
  const [timerRunning] = useState<boolean>(true);

  // Intake form state
  const [formData, setFormData] = useState<IncidentReport>({
    victimName: 'Suresh Kumar',
    victimPhone: '+91-98450-12345',
    victimEmail: '',
    victimDistrict: 'Bengaluru Urban',
    victimBank: 'Canara Bank (Lead Bank Karnataka)',
    accountNumber: 'XXXX-XXXX-8921',
    amountLost: 45000,
    transactionUTR: 'UTR9021849120',
    transactionDate: new Date().toISOString().split('T')[0],
    scammerUPI: 'clearing@sbi-arb',
    scammerPhone: '+91-98451-22990',
    scammerApp: '',
    scammerLinks: '',
    description: 'Impersonated BESCOM electricity officer and demanded immediate bill clearance via payment link.',
    timestamp: new Date().toLocaleString(),
  });

  const [selectedBankIndex, setSelectedBankIndex] = useState<number>(0);
  const [copiedEmail, setCopiedEmail] = useState<boolean>(false);
  const [selectedDistrict, setSelectedDistrict] = useState<string>('Bengaluru Urban (City)');

  useEffect(() => {
    let interval: any;
    if (timerRunning && secondsRemaining > 0) {
      interval = setInterval(() => {
        setSecondsRemaining((prev) => prev - 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [timerRunning, secondsRemaining]);

  const formatTime = (secs: number) => {
    const hours = Math.floor(secs / 3600);
    const minutes = Math.floor((secs % 3600) / 60);
    const seconds = secs % 60;
    return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(
      2,
      '0'
    )}:${String(seconds).padStart(2, '0')}`;
  };

  const currentBankNotice = bankFreezeNotices[selectedBankIndex] || bankFreezeNotices[0];

  // Fill email template dynamically
  const generatedEmailText = currentBankNotice.emailTemplate
    .replace(/{victimName}/g, formData.victimName)
    .replace(/{victimPhone}/g, formData.victimPhone)
    .replace(/{accountNumber}/g, formData.accountNumber)
    .replace(/{amount}/g, formData.amountLost.toLocaleString())
    .replace(/{utr}/g, formData.transactionUTR)
    .replace(/{scammerUPI}/g, formData.scammerUPI)
    .replace(/{description}/g, formData.description)
    .replace(/{timestamp}/g, formData.timestamp);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(generatedEmailText);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2000);
  };

  const handleMailTo = () => {
    const subject = encodeURIComponent(
      `URGENT: CYBER FRAUD REVERSAL FREEZE (UTR: ${formData.transactionUTR})`
    );
    const body = encodeURIComponent(generatedEmailText);
    window.open(
      `mailto:${currentBankNotice.nodalOfficerEmail}?subject=${subject}&body=${body}`,
      '_blank'
    );
  };

  const currentCENStation =
    karnatakaCENStations.find((s) => s.district === selectedDistrict) ||
    karnatakaCENStations[0];

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      {/* Golden Hour Urgent Banner */}
      <div className="relative overflow-hidden rounded-3xl border border-red-500/50 bg-gradient-to-r from-red-950 via-slate-950 to-red-950 p-6 sm:p-8 shadow-2xl shadow-red-950/60 mb-8 backdrop-blur-xl">
        <div className="pointer-events-none absolute -right-10 -top-10 h-60 w-60 rounded-full bg-red-600/10 blur-3xl" />

        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
          <div>
            <div className="flex items-center gap-2">
              <span className="flex h-8 w-8 items-center justify-center rounded-xl bg-red-600/30 text-red-400 ring-1 ring-red-500/40">
                <Flame className="h-5 w-5 animate-pulse" />
              </span>
              <span className="rounded-md border border-red-500/40 bg-red-950/80 px-2.5 py-0.5 font-mono text-xs font-black uppercase tracking-wider text-red-300">
                NATIONAL CRITICAL WINDOW
              </span>
            </div>

            <h2 className="mt-3 text-2xl font-black tracking-tight text-white sm:text-3xl">
              {language === 'kn'
                ? '1930 ಸೈಬರ್ ಕ್ರೈಂ "ಗೋಲ್ಡನ್ ಅವರ್" ತುರ್ತು ಫ್ರೀಜ್ ಕಮಾಂಡ್'
                : '1930 National Cyber Crime "Golden Hour" Rapid Freeze Wizard'}
            </h2>

            <p className="mt-2 text-xs text-slate-300 sm:text-sm max-w-2xl leading-relaxed">
              {language === 'kn'
                ? 'ವಂಚನೆ ನಡೆದ ಮೊದಲ 2 ಗಂಟೆಗಳಲ್ಲಿ (ಗೋಲ್ಡನ್ ಅವರ್) ಬ್ಯಾಂಕ್ ನೋಡಲ್ ಅಧಿಕಾರಿಗಳಿಗೆ ಮತ್ತು 1930 ಹೆಲ್ಪ್‌ಲೈನ್‌ಗೆ ತಕ್ಷಣ ಮಾಹಿತಿ ನೀಡಿ ಹಣವನ್ನು ತಡೆಹಿಡಿಯಿರಿ.'
                : 'The first 120 minutes are critical. Trigger immediate debit freezes on beneficiary mule accounts before funds are withdrawn at ATMs or routed to crypto mixers.'}
            </p>
          </div>

          {/* Countdown Clock Display */}
          <div className="flex flex-col items-center justify-center rounded-2xl border border-red-500/40 bg-slate-950/90 p-5 shadow-inner">
            <div className="flex items-center gap-2 text-xs font-bold uppercase text-red-400 font-mono">
              <Clock className="h-4 w-4 animate-spin" />
              <span>GOLDEN HOUR REMAINING</span>
            </div>
            <div className="mt-1 font-mono text-3xl font-black tracking-widest text-red-500 sm:text-4xl">
              {formatTime(secondsRemaining)}
            </div>
            <div className="mt-2 flex items-center gap-2 text-[10px] text-slate-400 font-mono">
              <span>NCRP PROTOCOL: ACTIVE</span>
              <span>•</span>
              <a
                href="tel:1930"
                className="text-red-400 font-bold hover:underline flex items-center gap-1"
              >
                <PhoneCall className="h-3 w-3" /> DIAL 1930
              </a>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
        {/* Left: 1-Minute Incident Intake Form (6 cols) */}
        <div className="lg:col-span-6 flex flex-col gap-5">
          <div className="rounded-2xl border border-slate-800 bg-slate-900/80 p-5 backdrop-blur-md">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3 mb-4">
              <div className="flex items-center gap-2">
                <FileText className="h-4 w-4 text-cyan-400" />
                <h3 className="text-xs font-bold uppercase tracking-wider text-slate-200">
                  {language === 'kn' ? '1-ನಿಮಿಷದ ಘಟನಾ ವಿವರ ನಮೂನೆ' : '1-Minute Incident Rapid Intake'}
                </h3>
              </div>
              <span className="text-[10px] text-slate-400 font-mono">
                Mandatory for Bank Freeze
              </span>
            </div>

            <div className="space-y-3 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label htmlFor="victim-name" className="text-slate-400 block mb-1 font-semibold">
                    {language === 'kn' ? 'ಸಂತ್ರಸ್ತರ ಹೆಸರು (Victim Name):' : 'Victim Full Name:'}
                  </label>
                  <input
                    id="victim-name"
                    type="text"
                    value={formData.victimName}
                    onChange={(e) => setFormData({ ...formData, victimName: e.target.value })}
                    className="w-full rounded-lg border border-slate-800 bg-slate-950 p-2.5 text-slate-100 focus:border-cyan-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label htmlFor="victim-phone" className="text-slate-400 block mb-1 font-semibold">
                    {language === 'kn' ? 'ಮೊಬೈಲ್ ಸಂಖ್ಯೆ (Phone):' : 'Victim Mobile Number:'}
                  </label>
                  <input
                    id="victim-phone"
                    type="text"
                    value={formData.victimPhone}
                    onChange={(e) => setFormData({ ...formData, victimPhone: e.target.value })}
                    className="w-full rounded-lg border border-slate-800 bg-slate-950 p-2.5 text-slate-100 focus:border-cyan-500 focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label htmlFor="victim-bank" className="text-slate-400 block mb-1 font-semibold">
                    {language === 'kn' ? 'ಸಂತ್ರಸ್ತರ ಬ್ಯಾಂಕ್ (Victim Bank):' : 'Victim Bank:'}
                  </label>
                  <select
                    id="victim-bank"
                    value={selectedBankIndex}
                    onChange={(e) => {
                      const idx = Number(e.target.value);
                      setSelectedBankIndex(idx);
                      setFormData({ ...formData, victimBank: bankFreezeNotices[idx].bankName });
                    }}
                    className="w-full rounded-lg border border-slate-800 bg-slate-950 p-2.5 text-slate-100 focus:border-cyan-500 focus:outline-none"
                  >
                    {bankFreezeNotices.map((b, i) => (
                      <option key={i} value={i}>
                        {b.bankName}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label htmlFor="account-number" className="text-slate-400 block mb-1 font-semibold">
                    {language === 'kn' ? 'ಖಾತೆ ಸಂಖ್ಯೆ (Account No):' : 'Account / Card Number:'}
                  </label>
                  <input
                    id="account-number"
                    type="text"
                    value={formData.accountNumber}
                    onChange={(e) => setFormData({ ...formData, accountNumber: e.target.value })}
                    className="w-full rounded-lg border border-slate-800 bg-slate-950 p-2.5 text-slate-100 focus:border-cyan-500 focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label htmlFor="amount-lost" className="text-slate-400 block mb-1 font-semibold">
                    {language === 'kn' ? 'ಕಳೆದುಕೊಂಡ ಮೊತ್ತ (Amount Lost ₹):' : 'Disputed Amount (₹):'}
                  </label>
                  <input
                    id="amount-lost"
                    type="number"
                    value={formData.amountLost}
                    onChange={(e) => setFormData({ ...formData, amountLost: Number(e.target.value) })}
                    className="w-full rounded-lg border border-slate-800 bg-slate-950 p-2.5 text-red-400 font-mono font-bold focus:border-cyan-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label htmlFor="transaction-utr" className="text-slate-400 block mb-1 font-semibold">
                    {language === 'kn' ? 'ವಹಿವಾಟು UTR / ರೆಫರೆನ್ಸ್ ಸಂಖ್ಯೆ:' : 'Transaction UTR / Ref No:'}
                  </label>
                  <input
                    id="transaction-utr"
                    type="text"
                    value={formData.transactionUTR}
                    onChange={(e) => setFormData({ ...formData, transactionUTR: e.target.value })}
                    className="w-full rounded-lg border border-slate-800 bg-slate-950 p-2.5 text-cyan-300 font-mono focus:border-cyan-500 focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="scammer-upi" className="text-slate-400 block mb-1 font-semibold">
                  {language === 'kn' ? 'ವಂಚಕರ UPI / ಫಲಾನುಭವಿ ಖಾತೆ (Scammer UPI / Beneficiary):' : 'Beneficiary / Scammer UPI / Mule A/C:'}
                </label>
                <input
                  id="scammer-upi"
                  type="text"
                  value={formData.scammerUPI}
                  onChange={(e) => setFormData({ ...formData, scammerUPI: e.target.value })}
                  placeholder="e.g. scammer@ybl or A/C 9182301923"
                  className="w-full rounded-lg border border-slate-800 bg-slate-950 p-2.5 text-amber-300 font-mono focus:border-cyan-500 focus:outline-none"
                />
              </div>

              <div>
                <label htmlFor="incident-desc" className="text-slate-400 block mb-1 font-semibold">
                  {language === 'kn' ? 'ಘಟನೆಯ ಸಾರಾಂಶ (Summary):' : 'Short Incident Description:'}
                </label>
                <textarea
                  id="incident-desc"
                  rows={2}
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="w-full rounded-lg border border-slate-800 bg-slate-950 p-2.5 text-slate-200 focus:border-cyan-500 focus:outline-none"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Right: Bank Nodal Freeze Notice & CEN Directory (6 cols) */}
        <div className="lg:col-span-6 flex flex-col gap-5">
          {/* Pre-Drafted Bank Freeze Notice */}
          <div className="rounded-2xl border border-slate-800 bg-slate-900/80 p-5 backdrop-blur-md">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3 mb-3">
              <div>
                <h3 className="text-xs font-bold uppercase tracking-wider text-slate-200 flex items-center gap-1.5">
                  <Building2 className="h-4 w-4 text-cyan-400" />
                  <span>{currentBankNotice.bankName}</span>
                </h3>
                <span className="text-[11px] font-mono text-cyan-400">
                  Nodal: {currentBankNotice.nodalOfficerEmail}
                </span>
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={handleCopyEmail}
                  className="flex items-center gap-1 rounded-lg border border-slate-700 bg-slate-800 px-2.5 py-1 text-xs font-semibold text-slate-200 hover:text-white"
                >
                  {copiedEmail ? <Check className="h-3.5 w-3.5 text-emerald-400" /> : <Copy className="h-3.5 w-3.5" />}
                  <span>{copiedEmail ? 'Copied' : 'Copy'}</span>
                </button>

                <button
                  type="button"
                  onClick={handleMailTo}
                  className="flex items-center gap-1 rounded-lg bg-red-600 px-3 py-1 text-xs font-bold text-white shadow-md hover:bg-red-500"
                >
                  <Mail className="h-3.5 w-3.5" />
                  <span>1-Click Email</span>
                </button>
              </div>
            </div>

            {/* Notice Preview */}
            <div className="rounded-xl border border-slate-800 bg-slate-950 p-3.5 font-mono text-[11px] text-slate-300 leading-relaxed max-h-56 overflow-y-auto whitespace-pre-wrap">
              {generatedEmailText}
            </div>

            {/* Emergency SMS Freeze Syntax */}
            {currentBankNotice.smsCode && (
              <div className="mt-3 rounded-lg border border-amber-500/30 bg-amber-950/30 p-2.5 text-xs text-amber-300 font-mono">
                <span className="font-bold">⚡ EMERGENCY SMS / USSD FREEZE:</span>{' '}
                {currentBankNotice.smsCode}
              </div>
            )}
          </div>

          {/* Karnataka CEN Cyber Police Stations Directory */}
          <div className="rounded-2xl border border-slate-800 bg-slate-900/80 p-5 backdrop-blur-md">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3 mb-3">
              <div className="flex items-center gap-2">
                <MapPin className="h-4 w-4 text-emerald-400" />
                <h3 className="text-xs font-bold uppercase tracking-wider text-slate-200">
                  {language === 'kn' ? 'ಕರ್ನಾಟಕ CEN ಸೈಬರ್ ಪೊಲೀಸ್ ಠಾಣೆಗಳ ಡೈರೆಕ್ಟರಿ' : 'Karnataka CEN Cyber Stations Directory'}
                </h3>
              </div>
              <label htmlFor="cen-district-select" className="sr-only">
                {language === 'kn' ? 'ಜಿಲ್ಲೆ ಆಯ್ಕೆಮಾಡಿ' : 'Select District'}
              </label>
              <select
                id="cen-district-select"
                value={selectedDistrict}
                onChange={(e) => setSelectedDistrict(e.target.value)}
                className="rounded-lg border border-slate-800 bg-slate-950 px-2.5 py-1 text-xs text-slate-200 focus:outline-none"
              >
                {karnatakaCENStations.map((st, i) => (
                  <option key={i} value={st.district}>
                    {st.district}
                  </option>
                ))}
              </select>
            </div>

            <div className="rounded-xl border border-slate-800 bg-slate-950/60 p-3 text-xs space-y-2">
              <div className="font-bold text-slate-100 text-sm">
                {currentCENStation.stationName}
              </div>
              <div className="text-slate-400 flex items-start gap-1.5">
                <MapPin className="h-3.5 w-3.5 shrink-0 text-slate-500 mt-0.5" />
                <span>{currentCENStation.address}</span>
              </div>
              <div className="flex flex-wrap items-center justify-between gap-2 border-t border-slate-800/80 pt-2 font-mono text-[11px]">
                <a
                  href={`tel:${currentCENStation.phone.split('/')[0].trim()}`}
                  className="text-cyan-400 hover:underline flex items-center gap-1"
                >
                  <PhoneCall className="h-3 w-3" /> {currentCENStation.phone}
                </a>
                <a
                  href={`mailto:${currentCENStation.email}`}
                  className="text-slate-300 hover:underline flex items-center gap-1"
                >
                  <Mail className="h-3 w-3" /> {currentCENStation.email}
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
