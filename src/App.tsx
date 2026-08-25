import { useState } from 'react';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { CommandHubNavigator } from './components/CommandHubNavigator';
import { CommandQuickDock } from './components/CommandQuickDock';
import { PhishingScanner } from './components/PhishingScanner';
import { VoiceCloneDeepfakeDetector } from './components/VoiceCloneDeepfakeDetector';
import { ScamHoneypotTrap } from './components/ScamHoneypotTrap';
import { ApkMalwareInspector } from './components/ApkMalwareInspector';
import { GoldenHourEmergencyFreeze } from './components/GoldenHourEmergencyFreeze';
import { ScamDnaMemoryExplorer } from './components/ScamDnaMemoryExplorer';
import { ScamCampaignRadar } from './components/ScamCampaignRadar';
import { FamilyProtectionNetwork } from './components/FamilyProtectionNetwork';
import { SeniorVoiceProtectionMode } from './components/SeniorVoiceProtectionMode';
import { PaymentScamAnalyzer } from './components/PaymentScamAnalyzer';
import { UrlThreatAnalyzer } from './components/UrlThreatAnalyzer';
import { CyberTutorSection } from './components/CyberTutorSection';
import { ScamCopilotDrawer } from './components/ScamCopilotDrawer';

import type { Language, ActivePillar, TelemetryStats } from './types';
import { initialTelemetry } from './data/karnatakaScamData';

export function App() {
  const [language, setLanguage] = useState<Language>('en');
  const [activePillar, setActivePillar] = useState<ActivePillar>('dashboard');
  const [seniorMode, setSeniorMode] = useState<boolean>(false);
  const [copilotOpen, setCopilotOpen] = useState<boolean>(false);
  const [presetPhishingText, setPresetPhishingText] = useState<string>('');
  const [telemetry] = useState<TelemetryStats>(initialTelemetry);

  const handleToggleLanguage = () => {
    setLanguage((prev) => (prev === 'en' ? 'kn' : 'en'));
  };

  const handleToggleSeniorMode = () => {
    setSeniorMode((prev) => !prev);
  };

  const handleSelectPreset = (text: string) => {
    setPresetPhishingText(text);
    setActivePillar('phishing');
  };

  return (
    <div
      className={`min-h-screen bg-slate-950 text-slate-100 selection:bg-cyan-500 selection:text-slate-950 ${
        seniorMode ? 'senior-mode font-sans text-lg' : ''
      }`}
    >
      {/* Top Navbar */}
      <Navbar
        language={language}
        onToggleLanguage={handleToggleLanguage}
        activePillar={activePillar}
        onSelectPillar={setActivePillar}
        seniorMode={seniorMode}
        onToggleSeniorMode={handleToggleSeniorMode}
        onOpenCopilot={() => setCopilotOpen(true)}
        onOpenGoldenHour={() => setActivePillar('golden-hour')}
      />

      {/* Senior Voice Mode Dedicated Overlay when enabled */}
      {seniorMode && (
        <SeniorVoiceProtectionMode
          language={language}
        />
      )}

      {/* Command Tactical Deck Navigation */}
      <CommandHubNavigator
        activePillar={activePillar}
        onSelectPillar={setActivePillar}
        language={language}
      />

      {/* Main Tactical Screen Rendering */}
      <main className="pb-24">
        {activePillar === 'dashboard' && (
          <div className="space-y-8 animate-fade-in">
            <HeroSection
              language={language}
              telemetry={telemetry}
              onSelectPillar={setActivePillar}
              onSelectPreset={handleSelectPreset}
            />

            {/* Embedded Live Radar on Dashboard */}
            <ScamCampaignRadar language={language} />

            {/* Embedded Phishing & Payment Triage on Dashboard */}
            <div className="border-t border-slate-800/80 pt-6">
              <PaymentScamAnalyzer language={language} />
            </div>
          </div>
        )}

        {activePillar === 'phishing' && (
          <div className="space-y-8 animate-fade-in">
            <PhishingScanner
              language={language}
              initialText={presetPhishingText}
              onNavigateTo={setActivePillar}
            />
            <div className="border-t border-slate-800/80 pt-4">
              <UrlThreatAnalyzer language={language} />
            </div>
            <div className="border-t border-slate-800/80 pt-4">
              <PaymentScamAnalyzer language={language} />
            </div>
          </div>
        )}

        {activePillar === 'voice' && (
          <div className="animate-fade-in">
            <VoiceCloneDeepfakeDetector language={language} />
          </div>
        )}

        {activePillar === 'honeypot' && (
          <div className="animate-fade-in">
            <ScamHoneypotTrap
              language={language}
              onNavigateTo={setActivePillar}
            />
          </div>
        )}

        {activePillar === 'apk' && (
          <div className="animate-fade-in">
            <ApkMalwareInspector
              language={language}
              onNavigateTo={setActivePillar}
            />
          </div>
        )}

        {activePillar === 'golden-hour' && (
          <div className="animate-fade-in">
            <GoldenHourEmergencyFreeze language={language} />
          </div>
        )}

        {activePillar === 'intelligence' && (
          <div className="space-y-8 animate-fade-in">
            <ScamCampaignRadar language={language} />
            <div className="border-t border-slate-800/80 pt-4">
              <ScamDnaMemoryExplorer language={language} />
            </div>
            <div className="border-t border-slate-800/80 pt-4">
              <FamilyProtectionNetwork language={language} />
            </div>
          </div>
        )}

        {activePillar === 'education' && (
          <div className="animate-fade-in">
            <CyberTutorSection language={language} />
          </div>
        )}
      </main>

      {/* Floating Bottom Quick Dock */}
      <CommandQuickDock
        activePillar={activePillar}
        onSelectPillar={setActivePillar}
        language={language}
        onOpenCopilot={() => setCopilotOpen(true)}
        seniorMode={seniorMode}
        onToggleSeniorMode={handleToggleSeniorMode}
      />

      {/* Floating AI Cyber Copilot Assistant Drawer */}
      <ScamCopilotDrawer
        isOpen={copilotOpen}
        onClose={() => setCopilotOpen(false)}
        language={language}
        onNavigateTo={setActivePillar}
      />
    </div>
  );
}

export default App;
