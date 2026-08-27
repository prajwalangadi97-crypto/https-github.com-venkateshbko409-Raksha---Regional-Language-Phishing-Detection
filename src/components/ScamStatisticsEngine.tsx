import React, { useState, useEffect } from 'react';
import {
  BarChart3,
  TrendingUp,
  PieChart,
  ArrowUpRight,
  ArrowDownRight,
  Shield,
  IndianRupee,
  Users,
  Activity,
} from 'lucide-react';
import type { Language } from '../types';

interface ScamStatisticsEngineProps {
  language: Language;
}

interface StatCard {
  label: string;
  labelKn: string;
  value: number;
  displayValue: string;
  trend: number; // percentage change
  icon: React.ComponentType<{ className?: string }>;
  color: string;
}

const STATS: StatCard[] = [
  { label: 'Total Scams Reported', labelKn: 'ಒಟ್ಟು ವಂಚನೆ ವರದಿ', value: 48726, displayValue: '48,726', trend: 12.4, icon: BarChart3, color: 'cyan' },
  { label: 'Amount Saved (₹)', labelKn: 'ಉಳಿಸಿದ ಮೊತ್ತ (₹)', value: 234, displayValue: '₹234 Cr', trend: 28.7, icon: IndianRupee, color: 'emerald' },
  { label: 'Citizens Protected', labelKn: 'ರಕ್ಷಿತ ನಾಗರಿಕರು', value: 892450, displayValue: '8,92,450', trend: 18.2, icon: Users, color: 'purple' },
  { label: 'Active Threats', labelKn: 'ಸಕ್ರಿಯ ಬೆದರಿಕೆಗಳು', value: 1247, displayValue: '1,247', trend: -5.3, icon: Activity, color: 'red' },
];

const SCAM_BY_TYPE = [
  { label: 'Digital Arrest', labelKn: 'ಡಿಜಿಟಲ್ ಅರೆಸ್ಟ್', value: 28, color: '#ef4444' },
  { label: 'UPI Fraud', labelKn: 'UPI ವಂಚನೆ', value: 22, color: '#f59e0b' },
  { label: 'Loan App', labelKn: 'ಸಾಲ ಆ್ಯಪ್', value: 18, color: '#a855f7' },
  { label: 'Phishing SMS', labelKn: 'ಫಿಶಿಂಗ್ SMS', value: 15, color: '#06b6d4' },
  { label: 'OTP Theft', labelKn: 'OTP ಕಳ್ಳತನ', value: 10, color: '#22c55e' },
  { label: 'Investment', labelKn: 'ಹೂಡಿಕೆ', value: 7, color: '#3b82f6' },
];

const SEVERITY_DIST = [
  { label: 'Critical', labelKn: 'ಗಂಭೀರ', value: 15, color: '#ef4444' },
  { label: 'High', labelKn: 'ಹೆಚ್ಚು', value: 35, color: '#f59e0b' },
  { label: 'Medium', labelKn: 'ಮಧ್ಯಮ', value: 30, color: '#06b6d4' },
  { label: 'Low', labelKn: 'ಕಡಿಮೆ', value: 20, color: '#22c55e' },
];

const MONTHLY_TREND = [
  { month: 'Jan', value: 3200 }, { month: 'Feb', value: 3800 }, { month: 'Mar', value: 4100 },
  { month: 'Apr', value: 3600 }, { month: 'May', value: 4500 }, { month: 'Jun', value: 5200 },
  { month: 'Jul', value: 4800 }, { month: 'Aug', value: 5800 },
];

const DISTRICT_LEADERBOARD = [
  { name: 'Bengaluru Urban', nameKn: 'ಬೆಂಗಳೂರು ನಗರ', cases: 12450, recovered: 78 },
  { name: 'Mysuru', nameKn: 'ಮೈಸೂರು', cases: 4200, recovered: 65 },
  { name: 'Mangaluru', nameKn: 'ಮಂಗಳೂರು', cases: 3800, recovered: 72 },
  { name: 'Hubballi', nameKn: 'ಹುಬ್ಬಳ್ಳಿ', cases: 2900, recovered: 58 },
  { name: 'Belagavi', nameKn: 'ಬೆಳಗಾವಿ', cases: 2100, recovered: 61 },
  { name: 'Kalaburagi', nameKn: 'ಕಲಬುರಗಿ', cases: 1800, recovered: 45 },
];

const maxTrend = Math.max(...MONTHLY_TREND.map(m => m.value));

function AnimatedCounter({ target, duration = 2000 }: { target: number; duration?: number }) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    let start = 0;
    const step = target / (duration / 16);
    const timer = setInterval(() => {
      start += step;
      if (start >= target) {
        setCount(target);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, 16);
    return () => clearInterval(timer);
  }, [target, duration]);
  return <>{count.toLocaleString()}</>;
}

export const ScamStatisticsEngine: React.FC<ScamStatisticsEngineProps> = ({ language }) => {
  const [animatedBars, setAnimatedBars] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setAnimatedBars(true), 300);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="mb-6 flex items-center gap-3">
        <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-500/20 text-indigo-400">
          <BarChart3 className="h-5 w-5" />
        </span>
        <div>
          <h2 className="text-xl font-bold text-slate-100 sm:text-2xl">
            {language === 'kn' ? 'ಸ್ಕ್ಯಾಮ್ ಅಂಕಿಅಂಶ ಎಂಜಿನ್' : 'Scam Statistics & Analytics Engine'}
          </h2>
          <p className="text-xs text-slate-400">
            {language === 'kn' ? 'ಕರ್ನಾಟಕ ಸೈಬರ್ ಅಪರಾಧ ಡೇಟಾ ವಿಶ್ಲೇಷಣೆ' : 'Karnataka cyber crime data analytics & trend analysis'}
          </p>
        </div>
      </div>

      {/* Stat Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-6">
        {STATS.map((stat, i) => {
          const Icon = stat.icon;
          const isPositive = stat.trend > 0;
          return (
            <div key={i} className="rounded-xl border border-slate-800 bg-slate-950/90 p-4 transition-all hover:border-slate-700 animate-slide-up" style={{ animationDelay: `${i * 100}ms` }}>
              <div className="flex items-center justify-between mb-2">
                <span className={`flex h-8 w-8 items-center justify-center rounded-lg bg-${stat.color}-500/20`}>
                  <Icon className={`h-4 w-4 text-${stat.color}-400`} />
                </span>
                <span className={`flex items-center gap-0.5 text-[10px] font-bold ${
                  stat.label === 'Active Threats'
                    ? (isPositive ? 'text-red-400' : 'text-emerald-400')
                    : (isPositive ? 'text-emerald-400' : 'text-red-400')
                }`}>
                  {isPositive ? <ArrowUpRight className="h-3 w-3" /> : <ArrowDownRight className="h-3 w-3" />}
                  {Math.abs(stat.trend)}%
                </span>
              </div>
              <div className="text-xl font-mono font-black text-slate-100">
                <AnimatedCounter target={stat.value} />
              </div>
              <div className="text-[10px] font-medium text-slate-500 mt-0.5">
                {language === 'kn' ? stat.labelKn : stat.label}
              </div>
            </div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Scams by Type — Bar Chart */}
        <div className="rounded-2xl border border-slate-800 bg-slate-950/90 p-5">
          <h3 className="text-sm font-bold text-slate-200 mb-4 flex items-center gap-2">
            <BarChart3 className="h-4 w-4 text-cyan-400" />
            {language === 'kn' ? 'ವಂಚನೆ ಪ್ರಕಾರದ ಪ್ರಕಾರ' : 'Scams by Type (%)'}
          </h3>
          <div className="space-y-3">
            {SCAM_BY_TYPE.map((item, i) => (
              <div key={i}>
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs font-medium text-slate-300">{language === 'kn' ? item.labelKn : item.label}</span>
                  <span className="text-xs font-mono font-bold text-slate-400">{item.value}%</span>
                </div>
                <div className="h-3 rounded-full bg-slate-800 overflow-hidden">
                  <div
                    className="h-full rounded-full transition-all duration-1000 ease-out"
                    style={{
                      width: animatedBars ? `${item.value}%` : '0%',
                      backgroundColor: item.color,
                      transitionDelay: `${i * 100}ms`,
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Severity Distribution — Donut */}
        <div className="rounded-2xl border border-slate-800 bg-slate-950/90 p-5">
          <h3 className="text-sm font-bold text-slate-200 mb-4 flex items-center gap-2">
            <PieChart className="h-4 w-4 text-purple-400" />
            {language === 'kn' ? 'ತೀವ್ರತೆ ವಿತರಣೆ' : 'Threat Severity Distribution'}
          </h3>
          <div className="flex items-center gap-6">
            {/* CSS Donut */}
            <div className="relative h-40 w-40 shrink-0">
              <svg viewBox="0 0 36 36" className="h-full w-full -rotate-90">
                {SEVERITY_DIST.map((item, i) => {
                  const dash = item.value;
                  const currentOffset = SEVERITY_DIST.slice(0, i).reduce((sum, s) => sum + s.value, 0);
                  return (
                    <circle
                      key={i}
                      cx="18" cy="18" r="14"
                      fill="none"
                      stroke={item.color}
                      strokeWidth="4"
                      strokeDasharray={`${animatedBars ? dash : 0} ${100 - dash}`}
                      strokeDashoffset={-currentOffset}
                      className="transition-all duration-1000 ease-out"
                      style={{ transitionDelay: `${i * 200}ms` }}
                    />
                  );
                })}
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <Shield className="h-5 w-5 text-slate-400 mb-1" />
                <div className="text-lg font-mono font-black text-slate-200">48.7K</div>
                <div className="text-[9px] text-slate-500">{language === 'kn' ? 'ಒಟ್ಟು' : 'TOTAL'}</div>
              </div>
            </div>
            {/* Legend */}
            <div className="space-y-2.5 flex-1">
              {SEVERITY_DIST.map((item, i) => (
                <div key={i} className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="h-3 w-3 rounded-sm" style={{ backgroundColor: item.color }} />
                    <span className="text-xs font-medium text-slate-300">{language === 'kn' ? item.labelKn : item.label}</span>
                  </div>
                  <span className="text-xs font-mono font-bold text-slate-400">{item.value}%</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Monthly Trend */}
        <div className="rounded-2xl border border-slate-800 bg-slate-950/90 p-5">
          <h3 className="text-sm font-bold text-slate-200 mb-4 flex items-center gap-2">
            <TrendingUp className="h-4 w-4 text-emerald-400" />
            {language === 'kn' ? 'ಮಾಸಿಕ ವಂಚನೆ ಪ್ರವೃತ್ತಿ' : 'Monthly Scam Trend (2024)'}
          </h3>
          <div className="flex items-end gap-2 h-40">
            {MONTHLY_TREND.map((m, i) => (
              <div key={i} className="flex-1 flex flex-col items-center justify-end gap-1">
                <span className="text-[9px] font-mono text-slate-500">{(m.value / 1000).toFixed(1)}K</span>
                <div
                  className="w-full rounded-t-md bg-gradient-to-t from-cyan-600 to-cyan-400 transition-all duration-1000 ease-out"
                  style={{
                    height: animatedBars ? `${(m.value / maxTrend) * 100}%` : '0%',
                    transitionDelay: `${i * 80}ms`,
                    minHeight: animatedBars ? '4px' : '0',
                  }}
                />
                <span className="text-[9px] font-medium text-slate-500">{m.month}</span>
              </div>
            ))}
          </div>
        </div>

        {/* District Leaderboard */}
        <div className="rounded-2xl border border-slate-800 bg-slate-950/90 p-5">
          <h3 className="text-sm font-bold text-slate-200 mb-4 flex items-center gap-2">
            <Shield className="h-4 w-4 text-amber-400" />
            {language === 'kn' ? 'ಜಿಲ್ಲಾ ಅಪರಾಧ ಶ್ರೇಣಿ' : 'District Crime Leaderboard'}
          </h3>
          <div className="space-y-2">
            {DISTRICT_LEADERBOARD.map((d, i) => (
              <div key={i} className="flex items-center gap-3 rounded-lg bg-slate-900/60 px-3 py-2.5 animate-slide-up" style={{ animationDelay: `${i * 80}ms` }}>
                <span className={`flex h-7 w-7 items-center justify-center rounded-lg text-xs font-bold ${
                  i === 0 ? 'bg-amber-500/20 text-amber-400' : i === 1 ? 'bg-slate-600/30 text-slate-300' : i === 2 ? 'bg-orange-800/30 text-orange-400' : 'bg-slate-800 text-slate-500'
                }`}>
                  #{i + 1}
                </span>
                <div className="flex-1 min-w-0">
                  <div className="text-xs font-bold text-slate-200">{language === 'kn' ? d.nameKn : d.name}</div>
                  <div className="text-[10px] text-slate-500">{d.cases.toLocaleString()} {language === 'kn' ? 'ಪ್ರಕರಣಗಳು' : 'cases'}</div>
                </div>
                <div className="text-right">
                  <div className={`text-sm font-mono font-bold ${d.recovered >= 70 ? 'text-emerald-400' : d.recovered >= 50 ? 'text-amber-400' : 'text-red-400'}`}>
                    {d.recovered}%
                  </div>
                  <div className="text-[9px] text-slate-500">{language === 'kn' ? 'ಮರುಪಡೆದ' : 'recovered'}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
