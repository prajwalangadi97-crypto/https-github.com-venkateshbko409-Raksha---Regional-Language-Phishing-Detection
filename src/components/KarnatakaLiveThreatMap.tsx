import React, { useState, useEffect } from 'react';
import { MapPin, TrendingUp, TrendingDown, Minus, AlertTriangle, Shield } from 'lucide-react';
import type { Language, DistrictThreat, ScamArchetype } from '../types';

interface KarnatakaLiveThreatMapProps {
  language: Language;
}

/* Simplified SVG district shapes (approximate centroids + relative polygon shapes) */
const districtMapData: {
  id: string;
  name: string;
  nameKn: string;
  cx: number;
  cy: number;
  path: string; // simplified polygon path
}[] = [
  { id: 'bengaluru-urban', name: 'Bengaluru Urban', nameKn: 'ಬೆಂಗಳೂರು ನಗರ', cx: 330, cy: 340, path: 'M310,320 L350,315 L360,340 L350,365 L310,360 Z' },
  { id: 'mysuru', name: 'Mysuru', nameKn: 'ಮೈಸೂರು', cx: 260, cy: 400, path: 'M230,375 L290,370 L300,400 L285,430 L225,425 Z' },
  { id: 'mangaluru', name: 'Mangaluru (DK)', nameKn: 'ಮಂಗಳೂರು', cx: 140, cy: 370, path: 'M110,345 L170,340 L180,375 L165,400 L105,395 Z' },
  { id: 'hubballi', name: 'Hubballi-Dharwad', nameKn: 'ಹುಬ್ಬಳ್ಳಿ-ಧಾರವಾಡ', cx: 200, cy: 200, path: 'M170,175 L230,170 L240,200 L225,230 L165,225 Z' },
  { id: 'belagavi', name: 'Belagavi', nameKn: 'ಬೆಳಗಾವಿ', cx: 170, cy: 120, path: 'M135,95 L205,90 L215,125 L200,150 L130,145 Z' },
  { id: 'kalaburagi', name: 'Kalaburagi', nameKn: 'ಕಲಬುರಗಿ', cx: 370, cy: 120, path: 'M335,95 L405,90 L415,125 L400,150 L330,145 Z' },
  { id: 'tumakuru', name: 'Tumakuru', nameKn: 'ತುಮಕೂರು', cx: 290, cy: 290, path: 'M260,265 L320,260 L330,290 L315,320 L255,315 Z' },
  { id: 'shivamogga', name: 'Shivamogga', nameKn: 'ಶಿವಮೊಗ್ಗ', cx: 220, cy: 270, path: 'M190,245 L250,240 L260,270 L245,300 L185,295 Z' },
  { id: 'udupi', name: 'Udupi', nameKn: 'ಉಡುಪಿ', cx: 130, cy: 310, path: 'M105,285 L155,280 L165,310 L150,340 L100,335 Z' },
  { id: 'davanagere', name: 'Davanagere', nameKn: 'ದಾವಣಗೆರೆ', cx: 270, cy: 210, path: 'M245,190 L295,185 L305,215 L290,240 L240,235 Z' },
  { id: 'raichur', name: 'Raichur', nameKn: 'ರಾಯಚೂರು', cx: 340, cy: 175, path: 'M310,155 L370,150 L380,180 L365,205 L305,200 Z' },
  { id: 'hassan', name: 'Hassan', nameKn: 'ಹಾಸನ', cx: 220, cy: 340, path: 'M195,320 L245,315 L255,340 L240,365 L190,360 Z' },
];

const threatDataByDistrict: Record<string, DistrictThreat> = {
  'bengaluru-urban': { district: 'Bengaluru Urban', districtKn: 'ಬೆಂಗಳೂರು ನಗರ', totalCases: 4521, activeCampaigns: 12, topScamType: 'INVESTMENT_PONZI', trend: 'rising', recentSpike: true },
  'mysuru': { district: 'Mysuru', districtKn: 'ಮೈಸೂರು', totalCases: 1230, activeCampaigns: 5, topScamType: 'SBI_YONO_KYC', trend: 'stable', recentSpike: false },
  'mangaluru': { district: 'Mangaluru (DK)', districtKn: 'ಮಂಗಳೂರು', totalCases: 890, activeCampaigns: 4, topScamType: 'FEDEX_DIGITAL_ARREST', trend: 'rising', recentSpike: true },
  'hubballi': { district: 'Hubballi-Dharwad', districtKn: 'ಹುಬ್ಬಳ್ಳಿ-ಧಾರವಾಡ', totalCases: 675, activeCampaigns: 3, topScamType: 'LOAN_APP_BLACKMAIL', trend: 'declining', recentSpike: false },
  'belagavi': { district: 'Belagavi', districtKn: 'ಬೆಳಗಾವಿ', totalCases: 512, activeCampaigns: 2, topScamType: 'BESCOM_POWER_CUT', trend: 'stable', recentSpike: false },
  'kalaburagi': { district: 'Kalaburagi', districtKn: 'ಕಲಬುರಗಿ', totalCases: 398, activeCampaigns: 3, topScamType: 'UPI_REVERSE_PAYMENT', trend: 'rising', recentSpike: true },
  'tumakuru': { district: 'Tumakuru', districtKn: 'ತುಮಕೂರು', totalCases: 267, activeCampaigns: 1, topScamType: 'OTP_THEFT', trend: 'declining', recentSpike: false },
  'shivamogga': { district: 'Shivamogga', districtKn: 'ಶಿವಮೊಗ್ಗ', totalCases: 189, activeCampaigns: 2, topScamType: 'AADHAAR_LINK_FRAUD', trend: 'stable', recentSpike: false },
  'udupi': { district: 'Udupi', districtKn: 'ಉಡುಪಿ', totalCases: 145, activeCampaigns: 1, topScamType: 'YOUTUBE_JOB', trend: 'declining', recentSpike: false },
  'davanagere': { district: 'Davanagere', districtKn: 'ದಾವಣಗೆರೆ', totalCases: 320, activeCampaigns: 2, topScamType: 'CUSTOMS_IMPERSONATION', trend: 'stable', recentSpike: false },
  'raichur': { district: 'Raichur', districtKn: 'ರಾಯಚೂರು', totalCases: 210, activeCampaigns: 1, topScamType: 'LOAN_APP_BLACKMAIL', trend: 'rising', recentSpike: false },
  'hassan': { district: 'Hassan', districtKn: 'ಹಾಸನ', totalCases: 178, activeCampaigns: 1, topScamType: 'BESCOM_POWER_CUT', trend: 'stable', recentSpike: false },
};

const syndicateLinks = [
  { from: 'bengaluru-urban', to: 'mysuru' },
  { from: 'bengaluru-urban', to: 'mangaluru' },
  { from: 'kalaburagi', to: 'raichur' },
  { from: 'hubballi', to: 'belagavi' },
  { from: 'bengaluru-urban', to: 'tumakuru' },
];

const getDistrictColor = (cases: number, spike: boolean): string => {
  if (spike) return 'rgba(255, 59, 92, 0.6)';
  if (cases > 2000) return 'rgba(255, 59, 92, 0.4)';
  if (cases > 800) return 'rgba(251, 191, 36, 0.35)';
  if (cases > 400) return 'rgba(56, 189, 248, 0.3)';
  return 'rgba(52, 211, 153, 0.25)';
};

const getDistrictStroke = (cases: number, spike: boolean): string => {
  if (spike) return '#ff3b5c';
  if (cases > 2000) return '#ef4444';
  if (cases > 800) return '#f59e0b';
  if (cases > 400) return '#38bdf8';
  return '#34d399';
};

const formatScamType = (type: ScamArchetype): string => {
  return type.replace(/_/g, ' ').replace(/\b\w/g, c => c.toUpperCase());
};

export const KarnatakaLiveThreatMap: React.FC<KarnatakaLiveThreatMapProps> = ({ language }) => {
  const [selectedDistrict, setSelectedDistrict] = useState<string | null>(null);
  const [highlightedDistrict, setHighlightedDistrict] = useState<string>(districtMapData[0].id);

  // Auto-rotate highlight every 4 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setHighlightedDistrict(prev => {
        const spiked = districtMapData.filter(d => threatDataByDistrict[d.id]?.recentSpike);
        const pool = spiked.length > 0 ? spiked : districtMapData;
        const currentIdx = pool.findIndex(d => d.id === prev);
        return pool[(currentIdx + 1) % pool.length].id;
      });
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  const selectedData = selectedDistrict ? threatDataByDistrict[selectedDistrict] : null;

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <div className="mb-6">
        <div className="flex items-center gap-2">
          <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-red-500/20 text-red-400">
            <MapPin className="h-4 w-4" />
          </span>
          <h2 className="text-xl font-bold text-slate-100 sm:text-2xl">
            {language === 'kn' ? 'ಕರ್ನಾಟಕ ಲೈವ್ ಸೈಬರ್ ಬೆದರಿಕೆ ನಕ್ಷೆ' : 'Karnataka Live Cyber Threat Map'}
          </h2>
        </div>
        <p className="mt-1 text-xs text-slate-400 sm:text-sm">
          {language === 'kn'
            ? 'ಜಿಲ್ಲಾ-ಮಟ್ಟದ ಲೈವ್ ಥ್ರೆಟ್ ಹೀಟ್‌ಮ್ಯಾಪ್ ಮತ್ತು ಸಿಂಡಿಕೇಟ್ ಸಂಪರ್ಕ ರೇಖೆಗಳು'
            : 'District-level live threat heatmap with syndicate connection lines'}
        </p>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
        {/* Map (8 cols) */}
        <div className="lg:col-span-8">
          <div className="relative rounded-2xl border border-slate-800 bg-slate-900/80 p-4 backdrop-blur-md overflow-hidden">
            {/* Background grid */}
            <div className="absolute inset-0 cyber-grid opacity-30 pointer-events-none" />

            <svg viewBox="60 60 400 420" className="w-full h-auto" style={{ minHeight: 380 }}>
              <defs>
                {/* Pulse animation for spike districts */}
                <radialGradient id="pulseGlow" cx="50%" cy="50%" r="50%">
                  <stop offset="0%" stopColor="#ff3b5c" stopOpacity="0.6" />
                  <stop offset="100%" stopColor="#ff3b5c" stopOpacity="0" />
                </radialGradient>
                <filter id="glow">
                  <feGaussianBlur stdDeviation="3" result="coloredBlur" />
                  <feMerge>
                    <feMergeNode in="coloredBlur" />
                    <feMergeNode in="SourceGraphic" />
                  </feMerge>
                </filter>
              </defs>

              {/* Karnataka outline silhouette */}
              <path
                d="M100,80 L180,70 L280,65 L400,80 L420,100 L430,170 L420,250 L400,300 L380,350 L360,380 L330,410 L290,440 L250,450 L210,440 L170,420 L140,400 L110,370 L90,330 L80,280 L75,220 L80,160 L90,120 Z"
                fill="rgba(15, 23, 42, 0.6)"
                stroke="rgba(100, 116, 139, 0.3)"
                strokeWidth="1.5"
              />

              {/* Syndicate connection lines */}
              {syndicateLinks.map((link, i) => {
                const from = districtMapData.find(d => d.id === link.from);
                const to = districtMapData.find(d => d.id === link.to);
                if (!from || !to) return null;
                return (
                  <line
                    key={`link-${i}`}
                    x1={from.cx}
                    y1={from.cy}
                    x2={to.cx}
                    y2={to.cy}
                    stroke="rgba(167, 139, 250, 0.25)"
                    strokeWidth="1.5"
                    strokeDasharray="6 4"
                    className="animate-pulse-glow"
                  />
                );
              })}

              {/* District polygons */}
              {districtMapData.map(d => {
                const threat = threatDataByDistrict[d.id];
                if (!threat) return null;
                const isHighlighted = highlightedDistrict === d.id;
                const isSelected = selectedDistrict === d.id;

                return (
                  <g key={d.id}>
                    <path
                      d={d.path}
                      fill={getDistrictColor(threat.totalCases, threat.recentSpike)}
                      stroke={isSelected ? '#00ffcc' : getDistrictStroke(threat.totalCases, threat.recentSpike)}
                      strokeWidth={isSelected ? 2.5 : isHighlighted ? 2 : 1}
                      className="cursor-pointer transition-all duration-300"
                      onClick={() => setSelectedDistrict(d.id === selectedDistrict ? null : d.id)}
                      filter={isHighlighted ? 'url(#glow)' : undefined}
                    />

                    {/* Pulse ring for spike districts */}
                    {threat.recentSpike && (
                      <circle
                        cx={d.cx}
                        cy={d.cy}
                        r="22"
                        fill="none"
                        stroke="#ff3b5c"
                        strokeWidth="1.5"
                        opacity="0.5"
                        className="animate-ping"
                        style={{ transformOrigin: `${d.cx}px ${d.cy}px`, animationDuration: '2s' }}
                      />
                    )}

                    {/* District dot */}
                    <circle
                      cx={d.cx}
                      cy={d.cy}
                      r={threat.recentSpike ? 5 : 3.5}
                      fill={threat.recentSpike ? '#ff3b5c' : '#38bdf8'}
                      className="cursor-pointer"
                      onClick={() => setSelectedDistrict(d.id === selectedDistrict ? null : d.id)}
                    />

                    {/* District label */}
                    <text
                      x={d.cx}
                      y={d.cy - 12}
                      textAnchor="middle"
                      fill="rgba(203, 213, 225, 0.9)"
                      fontSize="8"
                      fontWeight="600"
                      className="pointer-events-none select-none"
                    >
                      {language === 'kn' ? d.nameKn : d.name}
                    </text>
                  </g>
                );
              })}
            </svg>

            {/* Legend */}
            <div className="mt-3 flex flex-wrap items-center gap-3 text-[10px] font-semibold text-slate-400 px-2">
              <div className="flex items-center gap-1.5"><span className="h-2.5 w-2.5 rounded-full bg-red-500" /> {language === 'kn' ? 'ಗಂಭೀರ (ಸ್ಪೈಕ್)' : 'Critical (Spike)'}</div>
              <div className="flex items-center gap-1.5"><span className="h-2.5 w-2.5 rounded-full bg-amber-500" /> {language === 'kn' ? 'ಹೆಚ್ಚು' : 'High'}</div>
              <div className="flex items-center gap-1.5"><span className="h-2.5 w-2.5 rounded-full bg-sky-500" /> {language === 'kn' ? 'ಮಧ್ಯಮ' : 'Medium'}</div>
              <div className="flex items-center gap-1.5"><span className="h-2.5 w-2.5 rounded-full bg-emerald-500" /> {language === 'kn' ? 'ಕಡಿಮೆ' : 'Low'}</div>
              <div className="flex items-center gap-1.5"><span className="h-0.5 w-4 bg-purple-400/50 border-dashed" style={{ borderTop: '1.5px dashed rgba(167,139,250,0.5)' }} /> {language === 'kn' ? 'ಸಿಂಡಿಕೇಟ್ ಲಿಂಕ್' : 'Syndicate Link'}</div>
            </div>
          </div>
        </div>

        {/* District Detail Panel (4 cols) */}
        <div className="lg:col-span-4">
          {selectedData ? (
            <div className="rounded-2xl border border-slate-800 bg-slate-900/80 p-5 backdrop-blur-md animate-slide-in-right">
              <div className="flex items-center justify-between border-b border-slate-800 pb-3 mb-4">
                <h3 className="text-sm font-bold text-slate-100">
                  {language === 'kn' ? selectedData.districtKn || selectedData.district : selectedData.district}
                </h3>
                <span className={`rounded-full px-2 py-0.5 text-[10px] font-bold ${selectedData.recentSpike ? 'bg-red-500/20 text-red-400' : 'bg-slate-800 text-slate-400'}`}>
                  {selectedData.recentSpike ? (language === 'kn' ? '🔴 ತೀವ್ರ ಹೆಚ್ಚಳ' : '🔴 ACTIVE SPIKE') : (language === 'kn' ? '🟢 ಸಾಮಾನ್ಯ' : '🟢 NORMAL')}
                </span>
              </div>

              <div className="space-y-3">
                <div className="flex items-center justify-between rounded-xl bg-slate-950/60 p-3">
                  <span className="text-xs text-slate-400">{language === 'kn' ? 'ಒಟ್ಟು ಪ್ರಕರಣಗಳು' : 'Total Cases'}</span>
                  <span className="font-mono text-lg font-bold text-cyan-400">{selectedData.totalCases.toLocaleString()}</span>
                </div>

                <div className="flex items-center justify-between rounded-xl bg-slate-950/60 p-3">
                  <span className="text-xs text-slate-400">{language === 'kn' ? 'ಸಕ್ರಿಯ ಅಭಿಯಾನಗಳು' : 'Active Campaigns'}</span>
                  <span className="font-mono text-lg font-bold text-amber-400">{selectedData.activeCampaigns}</span>
                </div>

                <div className="flex items-center justify-between rounded-xl bg-slate-950/60 p-3">
                  <span className="text-xs text-slate-400">{language === 'kn' ? 'ಮುಖ್ಯ ವಂಚನೆ' : 'Top Scam Type'}</span>
                  <span className="text-xs font-bold text-purple-400">{formatScamType(selectedData.topScamType)}</span>
                </div>

                <div className="flex items-center justify-between rounded-xl bg-slate-950/60 p-3">
                  <span className="text-xs text-slate-400">{language === 'kn' ? 'ಪ್ರವೃತ್ತಿ' : 'Trend'}</span>
                  <div className="flex items-center gap-1.5">
                    {selectedData.trend === 'rising' && <TrendingUp className="h-4 w-4 text-red-400" />}
                    {selectedData.trend === 'declining' && <TrendingDown className="h-4 w-4 text-emerald-400" />}
                    {selectedData.trend === 'stable' && <Minus className="h-4 w-4 text-slate-400" />}
                    <span className={`text-xs font-bold ${selectedData.trend === 'rising' ? 'text-red-400' : selectedData.trend === 'declining' ? 'text-emerald-400' : 'text-slate-400'}`}>
                      {selectedData.trend.toUpperCase()}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center rounded-2xl border border-slate-800 bg-slate-900/80 p-8 text-center backdrop-blur-md h-full min-h-[300px]">
              <Shield className="h-10 w-10 text-slate-600 mb-3" />
              <h3 className="text-sm font-bold text-slate-300">
                {language === 'kn' ? 'ಜಿಲ್ಲೆಯನ್ನು ಆಯ್ಕೆಮಾಡಿ' : 'Select a District'}
              </h3>
              <p className="mt-1 text-xs text-slate-500">
                {language === 'kn'
                  ? 'ನಕ್ಷೆಯಲ್ಲಿ ಯಾವುದಾದರೂ ಜಿಲ್ಲೆಯ ಮೇಲೆ ಕ್ಲಿಕ್ ಮಾಡಿ ವಿವರಗಳನ್ನು ನೋಡಿ'
                  : 'Click on any district on the map to view threat intelligence'}
              </p>

              {/* Quick district list */}
              <div className="mt-4 w-full space-y-1.5">
                {districtMapData.filter(d => threatDataByDistrict[d.id]?.recentSpike).map(d => (
                  <button
                    key={d.id}
                    type="button"
                    onClick={() => setSelectedDistrict(d.id)}
                    className="flex w-full items-center justify-between rounded-lg border border-red-500/30 bg-red-950/20 p-2 text-left text-xs transition-all hover:border-red-400 hover:bg-red-950/40"
                  >
                    <div className="flex items-center gap-2">
                      <AlertTriangle className="h-3 w-3 text-red-400" />
                      <span className="font-semibold text-red-300">{language === 'kn' ? d.nameKn : d.name}</span>
                    </div>
                    <span className="font-mono text-[10px] text-red-400">SPIKE</span>
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
