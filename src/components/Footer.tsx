import React from 'react';
import {
  Shield,
  Phone,
  Globe,
  Mail,
  ExternalLink,
  GitBranch,
  Heart,
} from 'lucide-react';
import type { Language } from '../types';

/**
 * Footer — Minimalist Titanium Dark Luxury Footer with emergency numbers & civic links.
 */
export const Footer: React.FC<{ language: Language }> = ({ language }) => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-white/[0.08] bg-[#07090e]/95 backdrop-blur-3xl mt-14">
      {/* Emergency Helplines Banner */}
      <div className="bg-rose-500/[0.06] border-b border-rose-500/10">
        <div className="mx-auto max-w-7xl px-4 py-3 sm:px-6">
          <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-8 text-xs">
            <div className="flex items-center gap-2 text-rose-300 font-bold font-heading">
              <Phone className="h-3.5 w-3.5 animate-pulse text-rose-400" />
              <span>{language === 'kn' ? 'ತುರ್ತು ಸಹಾಯವಾಣಿ' : 'Emergency Helplines'}:</span>
            </div>
            <a href="tel:1930" className="flex items-center gap-1.5 text-white font-mono font-bold hover:text-sky-300 transition-colors">
              <span className="inline-flex h-2 w-2 rounded-full bg-rose-500 animate-pulse" />
              1930 — {language === 'kn' ? 'ಸೈಬರ್ ಅಪರಾಧ' : 'National Cyber Crime Helpline (Golden Hour)'}
            </a>
            <a href="tel:112" className="flex items-center gap-1.5 text-slate-300 font-mono hover:text-sky-300 transition-colors">
              112 — {language === 'kn' ? 'ಪೊಲೀಸ್ ತುರ್ತು' : 'Police Emergency'}
            </a>
            <a href="tel:14417" className="flex items-center gap-1.5 text-slate-300 font-mono hover:text-sky-300 transition-colors">
              14417 — {language === 'kn' ? 'ಮಹಿಳಾ ಸಹಾಯವಾಣಿ' : 'Women Helpline'}
            </a>
          </div>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}
          <div className="space-y-3">
            <div className="flex items-center gap-2.5">
              <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-gradient-to-b from-white/20 via-white/5 to-white/0 p-[1px]">
                <div className="flex h-full w-full items-center justify-center rounded-[11px] bg-[#121622] border border-white/10">
                  <Shield className="h-4 w-4 text-sky-400" />
                </div>
              </div>
              <div>
                <h3 className="text-sm font-bold tracking-tight text-white font-heading">
                  RAKSHA <span className="text-sky-400 font-black">AI</span>
                </h3>
                <p className="text-[10px] text-slate-500 font-mono">ರಕ್ಷಾ ಕವಚ • OMNIKON</p>
              </div>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed font-sans">
              {language === 'kn'
                ? 'ಕರ್ನಾಟಕದ ಮೊದಲ ಬಹುಭಾಷಾ AI ಸೈಬರ್ ರಕ್ಷಣಾ ವೇದಿಕೆ. ಪ್ರತಿ ನಾಗರಿಕನ ಡಿಜಿಟಲ್ ಸುರಕ್ಷತೆಗಾಗಿ.'
                : "India's premier multilingual Indic AI cyber defense platform. Protecting every citizen's digital life."}
            </p>
          </div>

          {/* Government Links */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-200 font-heading">
              {language === 'kn' ? 'ಸರ್ಕಾರಿ ಸಂಪನ್ಮೂಲಗಳು' : 'Government Resources'}
            </h4>
            <ul className="space-y-2 text-xs text-slate-400 font-sans">
              <li>
                <a href="https://cybercrime.gov.in" target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 hover:text-sky-300 transition-colors">
                  <ExternalLink className="h-3 w-3" /> cybercrime.gov.in (NCRP)
                </a>
              </li>
              <li>
                <a href="https://www.cert-in.org.in" target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 hover:text-sky-300 transition-colors">
                  <ExternalLink className="h-3 w-3" /> CERT-In National Advisory
                </a>
              </li>
              <li>
                <a href="https://www.ksp.gov.in" target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 hover:text-sky-300 transition-colors">
                  <ExternalLink className="h-3 w-3" /> Karnataka State Police
                </a>
              </li>
              <li>
                <a href="https://www.rbi.org.in/Scripts/FraudAwarenessCorner.aspx" target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 hover:text-sky-300 transition-colors">
                  <ExternalLink className="h-3 w-3" /> RBI Fraud Awareness
                </a>
              </li>
            </ul>
          </div>

          {/* Tools & Features */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-200 font-heading">
              {language === 'kn' ? 'ಸಾಧನಗಳು' : 'Cyber Defense Tools'}
            </h4>
            <ul className="space-y-2 text-xs text-slate-400 font-sans">
              <li className="hover:text-sky-300 transition-colors cursor-pointer">Indic NLP Phishing & SMS Scanner</li>
              <li className="hover:text-sky-300 transition-colors cursor-pointer">Voice Clone Deepfake Detector</li>
              <li className="hover:text-sky-300 transition-colors cursor-pointer">APK Sandbox & C2 Inspector</li>
              <li className="hover:text-sky-300 transition-colors cursor-pointer">Dark Web Data Breach Checker</li>
              <li className="hover:text-sky-300 transition-colors cursor-pointer">1930 NCRP Golden Hour Protocol</li>
            </ul>
          </div>

          {/* Contact & Connect */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-200 font-heading">
              {language === 'kn' ? 'ಸಂಪರ್ಕ' : 'Security Desk'}
            </h4>
            <ul className="space-y-2 text-xs text-slate-400 font-sans">
              <li>
                <a href="mailto:raksha-ai@ksp.gov.in" className="flex items-center gap-1.5 hover:text-sky-300 transition-colors">
                  <Mail className="h-3 w-3" /> raksha-ai@ksp.gov.in
                </a>
              </li>
              <li>
                <a href="#" className="flex items-center gap-1.5 hover:text-sky-300 transition-colors">
                  <Globe className="h-3 w-3" /> raksha.karnataka.gov.in
                </a>
              </li>
              <li>
                <a href="#" className="flex items-center gap-1.5 hover:text-sky-300 transition-colors">
                  <GitBranch className="h-3 w-3" /> Open Source on GitHub
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-10 flex flex-col items-center justify-between gap-3 border-t border-white/[0.08] pt-6 sm:flex-row">
          <p className="text-[11px] text-slate-500 font-mono">
            © {currentYear} Omnikon — Raksha AI. {language === 'kn' ? 'ಎಲ್ಲಾ ಹಕ್ಕುಗಳನ್ನು ಕಾಯ್ದಿರಿಸಲಾಗಿದೆ.' : 'All Rights Reserved.'}
          </p>
          <div className="flex items-center gap-1.5 text-[11.5px] text-slate-400 font-sans">
            <span>{language === 'kn' ? 'ಭಾರತದ ನಾಗರಿಕರ ಸುರಕ್ಷತೆಗಾಗಿ' : 'Built for the digital safety of every citizen'}</span>
            <Heart className="h-3.5 w-3.5 text-rose-500 fill-rose-500" />
          </div>
          <div className="flex items-center gap-3 text-[10px] font-mono text-slate-500">
            <span>v1.0.0</span>
            <span>•</span>
            <span>FastAPI + React 19 + Indic ML</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
