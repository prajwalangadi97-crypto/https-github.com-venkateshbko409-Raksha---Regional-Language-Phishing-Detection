import React, { useState, useMemo } from 'react';
import {
  PhoneCall,
  MapPin,
  Mail,
  Shield,
  FileText,
  Search,
  Navigation,
  Printer,
  Copy,
  CheckCircle2,
  ExternalLink,
} from 'lucide-react';
import type { Language, CENStation, ActivePillar } from '../types';
import { allKarnatakaCenStations } from '../data/cenStationsData';

interface CenStationLocatorProps {
  language: Language;
  onNavigateTo?: (pillar: ActivePillar) => void;
}

export const CenStationLocator: React.FC<CenStationLocatorProps> = ({ language, onNavigateTo }) => {
  const isKn = language === 'kn';
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [selectedStation, setSelectedStation] = useState<CENStation>(allKarnatakaCenStations[0]);
  const [copiedDraft, setCopiedDraft] = useState<boolean>(false);
  const [locating, setLocating] = useState<boolean>(false);

  // Complaint generator state
  const [victimName, setVictimName] = useState<string>('');
  const [victimPhone, setVictimPhone] = useState<string>('');
  const [victimAadhaarLast4] = useState<string>('');
  const [scamType] = useState<string>('CBI / Police Digital Arrest Video Call Extortion');
  const [amountLost, setAmountLost] = useState<string>('50000');
  const [scammerContact, setScammerContact] = useState<string>('+91 99823 44102 / cbi.officer@ybl');
  const [transactionRef, setTransactionRef] = useState<string>('UTR-392819283910');
  const [incidentDate] = useState<string>(new Date().toISOString().split('T')[0]);

  // Find nearest station via GPS
  const handleLocateNearest = () => {
    if (!navigator.geolocation) {
      alert('Geolocation is not supported by your browser.');
      return;
    }
    setLocating(true);
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const uLat = pos.coords.latitude;
        const uLng = pos.coords.longitude;

        // Calculate nearest station
        let minDistance = Infinity;
        let nearest = allKarnatakaCenStations[0];
        allKarnatakaCenStations.forEach((station) => {
          const sLat = station.latitude || 12.9791;
          const sLng = station.longitude || 77.5913;
          const dLat = (sLat - uLat) * (Math.PI / 180);
          const dLng = (sLng - uLng) * (Math.PI / 180);
          const a =
            Math.sin(dLat / 2) * Math.sin(dLat / 2) +
            Math.cos(uLat * (Math.PI / 180)) *
              Math.cos(sLat * (Math.PI / 180)) *
              Math.sin(dLng / 2) *
              Math.sin(dLng / 2);
          const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
          const distanceKm = 6371 * c;
          if (distanceKm < minDistance) {
            minDistance = distanceKm;
            nearest = station;
          }
        });
        setSelectedStation(nearest);
        setLocating(false);
      },
      () => {
        setLocating(false);
      }
    );
  };

  const filteredStations = useMemo(() => {
    if (!searchTerm.trim()) return allKarnatakaCenStations;
    const term = searchTerm.toLowerCase();
    return allKarnatakaCenStations.filter(
      (s) =>
        s.district.toLowerCase().includes(term) ||
        (s.districtKn && s.districtKn.includes(term)) ||
        s.stationName.toLowerCase().includes(term) ||
        s.address.toLowerCase().includes(term) ||
        (s.jurisdiction && s.jurisdiction.toLowerCase().includes(term))
    );
  }, [searchTerm]);

  const generateComplaintPetition = () => {
    const today = new Date().toLocaleDateString('en-IN', {
      day: '2-digit',
      month: 'long',
      year: 'numeric',
    });

    return `FORMAL COMPLAINT PETITION UNDER IT ACT & IPC / BNS
To,
The Station House Officer / Inspector of Police,
${selectedStation.stationName},
${selectedStation.address}, Karnataka.

Subject: Immediate registration of FIR regarding Cyber Fraud / Extortion amounting to ₹${amountLost || '0'} under Sections 66C, 66D of Information Technology Act 2000 and Sections 419, 420, 384 of IPC / BNS 318, 319.

Respected Sir / Madam,

I, the undersigned complainant, wish to bring to your immediate notice a grave cyber financial crime committed against me:

1. COMPLAINANT DETAILS:
   - Full Name: ${victimName || '[Complainant Full Name]'}
   - Contact Mobile: ${victimPhone || '[Mobile Number]'}
   - Aadhaar (Last 4 Digits): XXXX-XXXX-${victimAadhaarLast4 || 'XXXX'}
   - District Jurisdiction: ${selectedStation.district}

2. INCIDENT SUMMARY:
   - Date & Time of Incident: ${incidentDate}
   - Fraud Modus Operandi: ${scamType}
   - Total Financial Loss: INR ₹${amountLost || '0'}
   - Transaction UTR / Bank Reference: ${transactionRef || '[UTR Number]'}
   - Accused / Scammer Identifiers: ${scammerContact || '[Scammer Phone / UPI / Link]'}

3. BRIEF STATEMENT OF FACTS:
   On ${incidentDate}, the accused contacted me pretending to be an authorized authority/entity. Under psychological coercion and deception, they instructed me to transfer money / provide credentials under the pretext of ${scamType}. 
   I immediately requested my bank to freeze the beneficiary account and am lodging this official complaint within the Golden Hour.

4. PRAYER / RELIEF SOUGHT:
   - Kindly register an FIR under Section 66C & 66D of IT Act 2000 and Sections 419, 420, 384 of IPC.
   - Issue immediate notice to the recipient bank/payment gateway to freeze the fraudulently transferred funds of ₹${amountLost}.
   - Track the CDR (Call Detail Record), IP logs, and KYC of accused identifier (${scammerContact}).

Date: ${today}
Place: ${selectedStation.district}, Karnataka

Sincerely,
${victimName || '[Complainant Signature/Name]'}
Phone: ${victimPhone || '[Phone]'}
----------------------------------------------------------------------
[Digitally Drafted via Omnikon / Raksha AI — Karnataka Cyber Intelligence]`;
  };

  const handleCopyDraft = () => {
    navigator.clipboard.writeText(generateComplaintPetition());
    setCopiedDraft(true);
    setTimeout(() => setCopiedDraft(false), 2500);
  };

  const handlePrintDraft = () => {
    const printWindow = window.open('', '_blank');
    if (!printWindow) return;
    const content = generateComplaintPetition().replace(/\n/g, '<br/>');
    printWindow.document.write(`
      <html>
        <head>
          <title>Cyber Crime Complaint Petition - ${selectedStation.stationName}</title>
          <style>
            body { font-family: 'Times New Roman', serif; font-size: 13pt; line-height: 1.6; margin: 40px; }
            h2 { text-align: center; font-size: 15pt; text-decoration: underline; }
            .footer { margin-top: 40px; font-size: 10pt; color: #555; border-top: 1px solid #ccc; padding-top: 10px; }
          </style>
        </head>
        <body>
          <div>${content}</div>
          <script>window.print();</script>
        </body>
      </html>
    `);
    printWindow.document.close();
  };

  return (
    <div className="space-y-8 animate-fade-in text-slate-100">
      {/* Hero Header Banner */}
      <div className="rounded-2xl border border-cyan-500/30 bg-gradient-to-br from-slate-900 via-slate-900/90 to-cyan-950/40 p-6 lg:p-8 backdrop-blur-xl shadow-2xl">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-xs font-mono text-cyan-400">
              <Shield className="h-4 w-4" />
              <span>KARNATAKA POLICE CEN NETWORK • 31 DISTRICTS</span>
            </div>
            <h1 className="text-2xl lg:text-3xl font-extrabold text-white tracking-tight">
              {isKn ? 'ಕರ್ನಾಟಕ ಸಿಇಎನ್ ಸೈಬರ್ ಪೊಲೀಸ್ ಠಾಣೆಗಳು & ದೂರು ಜನರೇಟರ್' : 'Karnataka CEN Police Station SOS & FIR Generator'}
            </h1>
            <p className="text-sm text-slate-400 max-w-3xl">
              {isKn
                ? 'ಕರ್ನಾಟಕದ ಎಲ್ಲಾ ಜಿಲ್ಲಾ ಸೈಬರ್ ಅಪರಾಧ (CEN) ಪೊಲೀಸ್ ಠಾಣೆಗಳ ಸಂಪರ್ಕ ವಿವರಗಳು, ತ್ವರಿತ ತುರ್ತು ಕರೆ, ಮತ್ತು ಕಾನೂನುಬದ್ಧ ಎಫ್‌ಐಆರ್ ದೂರು ಪತ್ರ ರಚನೆ'
                : 'Directory of all Cyber Economics & Narcotics (CEN) police stations in Karnataka. Direct SOS dialing and legal FIR draft generation citing IT Act & IPC sections.'}
            </p>
          </div>

          {/* Quick SOS Helpline Buttons */}
          <div className="flex flex-wrap items-center gap-3 shrink-0">
            <a
              href="tel:1930"
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-rose-600 hover:bg-rose-500 text-white font-bold text-sm shadow-lg shadow-rose-950/60 transition-all hover:scale-105"
            >
              <PhoneCall className="h-4 w-4" />
              <span>{isKn ? '1930 ಸೈಬರ್ ಹೆಲ್ಪ್‌ಲೈನ್' : 'Call 1930 Helpline'}</span>
            </a>
            <button
              onClick={handleLocateNearest}
              disabled={locating}
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-cyan-500/20 hover:bg-cyan-500/30 text-cyan-300 border border-cyan-500/40 font-semibold text-sm transition-all"
            >
              <Navigation className={`h-4 w-4 ${locating ? 'animate-spin' : ''}`} />
              <span>{locating ? 'Locating...' : isKn ? 'ಹತ್ತಿರದ ಠಾಣೆ ಹುಡುಕಿ' : 'Find Nearest Station'}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Grid: Directory + FIR Generator */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Column: Station Selector & District List */}
        <div className="lg:col-span-5 space-y-4">
          {/* Search bar */}
          <div className="relative">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
            <input
              type="text"
              placeholder={isKn ? 'ಜಿಲ್ಲೆ ಅಥವಾ ಠಾಣೆಯ ಹೆಸರು ಹುಡುಕಿ...' : 'Search district (e.g. Bengaluru, Mysuru, Hubballi)...'}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 rounded-xl bg-slate-950/80 border border-slate-800 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500 transition-all"
            />
          </div>

          {/* Station List */}
          <div className="space-y-2.5 max-h-[600px] overflow-y-auto pr-1">
            {filteredStations.map((station) => {
              const isSelected = selectedStation.id === station.id;
              return (
                <div
                  key={station.id}
                  onClick={() => setSelectedStation(station)}
                  className={`p-4 rounded-xl border cursor-pointer transition-all ${
                    isSelected
                      ? 'border-cyan-500/80 bg-cyan-950/30 shadow-lg shadow-cyan-950/40'
                      : 'border-slate-800/80 bg-slate-900/60 hover:bg-slate-800/50 hover:border-slate-700'
                  }`}
                >
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <span className="text-xs font-mono px-2 py-0.5 rounded bg-slate-800 text-cyan-300 font-semibold">
                        {isKn ? station.districtKn || station.district : station.district}
                      </span>
                      <h3 className="text-sm font-bold text-white mt-1.5 leading-snug">
                        {isKn ? station.stationNameKn || station.stationName : station.stationName}
                      </h3>
                    </div>
                    {isSelected && (
                      <span className="h-2.5 w-2.5 rounded-full bg-cyan-400 shadow-sm shadow-cyan-400 shrink-0 mt-1" />
                    )}
                  </div>

                  <p className="text-xs text-slate-400 mt-2 flex items-start gap-1.5">
                    <MapPin className="h-3.5 w-3.5 text-slate-500 shrink-0 mt-0.5" />
                    <span className="line-clamp-2">{isKn ? station.addressKn || station.address : station.address}</span>
                  </p>

                  <div className="flex items-center gap-4 mt-3 pt-3 border-t border-slate-800/60 text-xs font-mono">
                    <a
                      href={`tel:${station.phone.split('/')[0].trim()}`}
                      onClick={(e) => e.stopPropagation()}
                      className="flex items-center gap-1.5 text-cyan-400 hover:underline"
                    >
                      <PhoneCall className="h-3 w-3" />
                      {station.phone.split('/')[0].trim()}
                    </a>
                    <a
                      href={`mailto:${station.email}`}
                      onClick={(e) => e.stopPropagation()}
                      className="flex items-center gap-1.5 text-slate-400 hover:text-white"
                    >
                      <Mail className="h-3 w-3" />
                      Email
                    </a>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Column: Selected Station Details + Auto FIR Generator */}
        <div className="lg:col-span-7 space-y-6">
          {/* Station Dossier Card */}
          <div className="p-6 rounded-2xl border border-cyan-500/30 bg-slate-900/90 backdrop-blur-xl shadow-xl space-y-4">
            <div className="flex items-start justify-between gap-4 flex-wrap">
              <div>
                <span className="text-xs font-mono px-2.5 py-1 rounded bg-cyan-500/20 text-cyan-300 border border-cyan-500/30">
                  {selectedStation.district}
                </span>
                <h2 className="text-lg font-bold text-white mt-2">
                  {isKn ? selectedStation.stationNameKn || selectedStation.stationName : selectedStation.stationName}
                </h2>
              </div>
              <div className="flex items-center gap-2">
                <a
                  href={`tel:${selectedStation.emergencyDirect}`}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-rose-600 hover:bg-rose-500 text-white font-bold text-xs shadow transition-all"
                >
                  <PhoneCall className="h-3.5 w-3.5" />
                  {isKn ? 'ತುರ್ತು ಡೆಸ್ಕ್ ಕರೆ' : 'Emergency Desk'}
                </a>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs pt-2">
              <div className="p-3 rounded-xl bg-slate-950/60 border border-slate-800 space-y-1">
                <span className="text-slate-400">{isKn ? 'ಠಾಣೆ ವಿಳಾಸ:' : 'Station Address:'}</span>
                <p className="text-slate-200 font-medium">{selectedStation.address}</p>
              </div>
              <div className="p-3 rounded-xl bg-slate-950/60 border border-slate-800 space-y-1">
                <span className="text-slate-400">{isKn ? 'ಅಧಿಕಾರಿ / ಇಮೇಲ್:' : 'Nodal Officer & Email:'}</span>
                <p className="text-slate-200 font-medium">{selectedStation.officerInCharge}</p>
                <p className="text-cyan-400 font-mono">{selectedStation.email}</p>
              </div>
            </div>

            <div className="p-3 rounded-xl bg-slate-950/40 border border-slate-800 text-xs">
              <span className="text-slate-400 font-semibold">{isKn ? 'ವ್ಯಾಪ್ತಿ (Jurisdiction): ' : 'Jurisdiction: '}</span>
              <span className="text-slate-300">{selectedStation.jurisdiction}</span>
            </div>
          </div>

          {/* Instant FIR & Cyber Complaint Generator */}
          <div className="p-6 rounded-2xl border border-slate-800 bg-slate-900/90 backdrop-blur-xl shadow-xl space-y-5">
            <div className="flex items-center justify-between gap-4 border-b border-slate-800 pb-4">
              <div className="flex items-center gap-2.5">
                <FileText className="h-5 w-5 text-cyan-400" />
                <div>
                  <h3 className="text-base font-bold text-white">
                    {isKn ? 'ಸ್ವಯಂಚಾಲಿತ ಎಫ್‌ಐಆರ್ ಮತ್ತು ದೂರು ಪತ್ರ ಜನರೇಟರ್' : 'Automated FIR & Cyber Crime Complaint Generator'}
                  </h3>
                  <p className="text-xs text-slate-400">
                    Pre-fills legal sections (IT Act 66C/66D & IPC 419/420) formatted for police submission
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={handleCopyDraft}
                  className="flex items-center gap-1 text-xs px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 transition-all"
                >
                  {copiedDraft ? <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400" /> : <Copy className="h-3.5 w-3.5" />}
                  {copiedDraft ? 'Copied' : 'Copy'}
                </button>
                <button
                  onClick={handlePrintDraft}
                  className="flex items-center gap-1 text-xs px-3 py-1.5 rounded-lg bg-cyan-600 hover:bg-cyan-500 text-slate-950 font-bold transition-all"
                >
                  <Printer className="h-3.5 w-3.5" />
                  {isKn ? 'ಪ್ರಿಂಟ್ / ಪಿಡಿಎಫ್' : 'Print / PDF'}
                </button>
              </div>
            </div>

            {/* Form Inputs for Customizing Draft */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div>
                <label className="text-slate-400 block mb-1 font-medium">{isKn ? 'ಸಂತ್ರಸ್ತರ ಪೂರ್ಣ ಹೆಸರು' : 'Victim Full Name'}</label>
                <input
                  type="text"
                  placeholder="e.g. Ramesh Kumar"
                  value={victimName}
                  onChange={(e) => setVictimName(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-slate-800 text-white focus:outline-none focus:border-cyan-500"
                />
              </div>

              <div>
                <label className="text-slate-400 block mb-1 font-medium">{isKn ? 'ಸಂಪರ್ಕ ಮೊಬೈಲ್ ಸಂಖ್ಯೆ' : 'Contact Mobile Number'}</label>
                <input
                  type="text"
                  placeholder="e.g. 98450 12345"
                  value={victimPhone}
                  onChange={(e) => setVictimPhone(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-slate-800 text-white focus:outline-none focus:border-cyan-500"
                />
              </div>

              <div>
                <label className="text-slate-400 block mb-1 font-medium">{isKn ? 'ಕಳೆದುಹೋದ ಮೊತ್ತ (₹)' : 'Amount Lost (INR ₹)'}</label>
                <input
                  type="text"
                  placeholder="e.g. 50000"
                  value={amountLost}
                  onChange={(e) => setAmountLost(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-slate-800 text-white focus:outline-none focus:border-cyan-500"
                />
              </div>

              <div>
                <label className="text-slate-400 block mb-1 font-medium">{isKn ? 'ವಹಿವಾಟು UTR / ಬ್ಯಾಂಕ್ ರೆಫರೆನ್ಸ್' : 'Transaction UTR / Ref'}</label>
                <input
                  type="text"
                  placeholder="e.g. UTR-392819283910"
                  value={transactionRef}
                  onChange={(e) => setTransactionRef(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-slate-800 text-white focus:outline-none focus:border-cyan-500"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="text-slate-400 block mb-1 font-medium">{isKn ? 'ದಾಳಿಕೋರರ ವಿವರ (ಫೋನ್ / UPI / ಲಿಂಕ್)' : 'Scammer Details (Phone / UPI / Link / Fake Police)'}</label>
                <input
                  type="text"
                  placeholder="e.g. +91 99823 44102, cbi.officer@ybl, Skype: @cbi_cyber_cell"
                  value={scammerContact}
                  onChange={(e) => setScammerContact(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-slate-800 text-white focus:outline-none focus:border-cyan-500"
                />
              </div>
            </div>

            {/* Petition Preview */}
            <div className="rounded-xl border border-slate-800 bg-slate-950 p-4 font-mono text-[11px] text-slate-300 leading-relaxed max-h-72 overflow-y-auto whitespace-pre-wrap">
              {generateComplaintPetition()}
            </div>

            {/* Action Links */}
            <div className="flex items-center justify-between gap-4 pt-2 flex-wrap">
              <a
                href="https://cybercrime.gov.in"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 text-xs text-cyan-400 hover:underline"
              >
                <ExternalLink className="h-3.5 w-3.5" />
                Submit online at National Cybercrime Reporting Portal (cybercrime.gov.in)
              </a>

              {onNavigateTo && (
                <button
                  onClick={() => onNavigateTo('golden-hour')}
                  className="px-3.5 py-2 rounded-lg bg-rose-600/20 hover:bg-rose-600/30 text-rose-300 border border-rose-500/40 text-xs font-bold transition-all"
                >
                  Go to 1930 Bank Freeze Protocol →
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
