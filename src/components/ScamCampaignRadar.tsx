import React, { useState } from 'react';
import {
  Radio,
  MapPin,
  TrendingUp,
  TrendingDown,
  Minus,
  AlertTriangle,
  Flame,
  Building2,
} from 'lucide-react';
import type { Language, DistrictThreat } from '../types';
import { karnatakaDistrictThreats } from '../data/karnatakaScamData';

interface ScamCampaignRadarProps {
  language: Language;
}

export const ScamCampaignRadar: React.FC<ScamCampaignRadarProps> = ({
  language,
}) => {
  const [selectedDistrict, setSelectedDistrict] = useState<DistrictThreat>(
    karnatakaDistrictThreats[0]
  );

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="mb-6 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-red-500/20 text-red-400">
              <Radio className="h-4 w-4 animate-pulse" />
            </span>
            <h2 className="text-xl font-bold text-slate-100 sm:text-2xl">
              {language === 'kn'
                ? 'ಕರ್ನಾಟಕ ಜಿಲ್ಲಾವಾರು ಸೈಬರ್ ಬೆದರಿಕೆ ರೇಡಾರ್'
                : 'Karnataka District Cyber Threat Radar & Smishing Telemetry'}
            </h2>
          </div>
          <p className="mt-1 text-xs text-slate-400 sm:text-sm">
            {language === 'kn'
              ? 'ಬೆಂಗಳೂರು, ಮೈಸೂರು, ಮಂಗಳೂರು ಸೇರಿದಂತೆ ರಾಜ್ಯದ ಎಲ್ಲಾ ಜಿಲ್ಲೆಗಳ ನೈಜ ಸಮಯದ ವಂಚನಾ ವರದಿಗಳು ಮತ್ತು ಟ್ರೆಂಡ್‌ಗಳು.'
              : 'Real-time telemetry tracking active smishing spikes, fraudulent campaigns, and archetype surges across Karnataka.'}
          </p>
        </div>

        <div className="flex items-center gap-2 rounded-xl border border-red-500/30 bg-red-950/30 px-3 py-1.5 text-xs text-red-300 font-mono">
          <span className="h-2 w-2 rounded-full bg-red-500 animate-ping" />
          <span>KARNATAKA CID INTEL MESH ACTIVE</span>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
        {/* Left: District Cards Grid (8 cols) */}
        <div className="lg:col-span-8 grid grid-cols-1 sm:grid-cols-2 gap-3">
          {karnatakaDistrictThreats.map((item, idx) => {
            const isSelected = selectedDistrict.district === item.district;

            return (
              <button
                key={idx}
                type="button"
                onClick={() => setSelectedDistrict(item)}
                className={`group flex flex-col items-start rounded-2xl border p-4 text-left transition-all backdrop-blur-md ${
                  isSelected
                    ? 'border-cyan-500/80 bg-slate-900/90 text-slate-100 shadow-lg shadow-cyan-950/40'
                    : 'border-slate-800/80 bg-slate-950/60 text-slate-400 hover:border-slate-700 hover:bg-slate-900/60'
                }`}
              >
                <div className="flex w-full items-center justify-between">
                  <div className="flex items-center gap-2">
                    <MapPin className={`h-4 w-4 ${isSelected ? 'text-cyan-400' : 'text-slate-500'}`} />
                    <span className="font-bold text-sm text-slate-100">
                      {language === 'kn' ? item.districtKn : item.district}
                    </span>
                  </div>

                  {item.recentSpike && (
                    <span className="flex items-center gap-1 rounded-full bg-red-500/20 px-2 py-0.5 font-mono text-[9px] font-bold text-red-400 animate-pulse border border-red-500/30">
                      <Flame className="h-3 w-3" /> SPIKE
                    </span>
                  )}
                </div>

                <div className="mt-3 flex w-full items-center justify-between border-t border-slate-800/80 pt-2.5 font-mono text-xs">
                  <div>
                    <span className="text-slate-500 text-[10px] block">TOTAL CASES</span>
                    <span className="font-bold text-slate-200">{item.totalCases.toLocaleString()}</span>
                  </div>

                  <div>
                    <span className="text-slate-500 text-[10px] block">CAMPAIGNS</span>
                    <span className="font-bold text-cyan-300">{item.activeCampaigns} Active</span>
                  </div>

                  <div>
                    <span className="text-slate-500 text-[10px] block">TREND</span>
                    <span className="flex items-center gap-1 font-bold">
                      {item.trend === 'rising' ? (
                        <span className="text-red-400 flex items-center">
                          <TrendingUp className="h-3 w-3" /> Rising
                        </span>
                      ) : item.trend === 'declining' ? (
                        <span className="text-emerald-400 flex items-center">
                          <TrendingDown className="h-3 w-3" /> Falling
                        </span>
                      ) : (
                        <span className="text-slate-400 flex items-center">
                          <Minus className="h-3 w-3" /> Stable
                        </span>
                      )}
                    </span>
                  </div>
                </div>

                <div className="mt-2.5 rounded-lg bg-slate-950/80 px-2 py-1 text-[10px] font-mono text-amber-300 border border-slate-800 w-full truncate">
                  Top Threat: {item.topScamType}
                </div>
              </button>
            );
          })}
        </div>

        {/* Right: Selected District Intelligence Spotlight (4 cols) */}
        <div className="lg:col-span-4 flex flex-col gap-4">
          <div className="rounded-2xl border border-slate-800 bg-slate-900/80 p-5 backdrop-blur-md">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3 mb-4">
              <div>
                <span className="text-[10px] font-bold uppercase text-cyan-400 font-mono">
                  REGIONAL SPOTLIGHT
                </span>
                <h3 className="text-lg font-black text-slate-100">
                  {language === 'kn'
                    ? selectedDistrict.districtKn
                    : selectedDistrict.district}
                </h3>
              </div>
              <span className="rounded-xl bg-slate-800 p-2 text-cyan-400">
                <Building2 className="h-5 w-5" />
              </span>
            </div>

            <div className="space-y-4 text-xs">
              <div className="rounded-xl border border-slate-800 bg-slate-950 p-3.5">
                <div className="text-[10px] font-bold uppercase text-slate-400 mb-1">
                  Active Syndicate Modus Operandi:
                </div>
                <p className="text-slate-200 leading-relaxed font-sans">
                  {language === 'kn'
                    ? selectedDistrict.descriptionKn
                    : selectedDistrict.description}
                </p>
              </div>

              <div className="grid grid-cols-2 gap-2 text-center font-mono">
                <div className="rounded-xl border border-slate-800 bg-slate-950/60 p-3">
                  <div className="text-lg font-black text-cyan-400">
                    {selectedDistrict.totalCases}
                  </div>
                  <div className="text-[10px] text-slate-400">FIRs Registered</div>
                </div>

                <div className="rounded-xl border border-slate-800 bg-slate-950/60 p-3">
                  <div className="text-lg font-black text-amber-400">
                    {selectedDistrict.activeCampaigns}
                  </div>
                  <div className="text-[10px] text-slate-400">Syndicate Hubs</div>
                </div>
              </div>

              <div className="rounded-xl border border-red-500/30 bg-red-950/30 p-3 text-red-300">
                <div className="flex items-center gap-1.5 font-bold mb-1">
                  <AlertTriangle className="h-3.5 w-3.5" />
                  <span>{language === 'kn' ? 'ಜಿಲ್ಲಾ ಎಚ್ಚರಿಕೆ ಬುಲೆಟಿನ್' : 'Advisory for Citizens:'}</span>
                </div>
                <p className="text-[11px] leading-relaxed opacity-90 font-sans">
                  {language === 'kn'
                    ? 'ಅಪರಿಚಿತ ಕರೆಗಳಲ್ಲಿ ವೈಯಕ್ತಿಕ ವಿವರ ಅಥವಾ ಬ್ಯಾಂಕಿಂಗ್ ಒಟಿಪಿ ಹಂಚಿಕೊಳ್ಳಬೇಡಿ. ತಕ್ಷಣ 1930 ಸೈಬರ್ ಹೆಲ್ಪ್‌ಲೈನ್‌ಗೆ ಕರೆ ಮಾಡಿ.'
                    : 'Never pay clearance fees for courier parcels or update KYC via SMS links. Dial 1930 immediately if targeted.'}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
