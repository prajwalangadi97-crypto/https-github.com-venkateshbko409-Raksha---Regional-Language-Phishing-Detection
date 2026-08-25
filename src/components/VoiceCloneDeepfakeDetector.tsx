import React, { useState, useEffect, useRef } from 'react';
import {
  Mic,
  Volume2,
  ShieldCheck,
  Play,
  Square,
  KeyRound,
  AlertOctagon,
  Sparkles,
  Activity,
  CheckCircle2,
  XCircle,
} from 'lucide-react';
import type { Language, VoiceForensicResult } from '../types';
import { voiceCloneAudioSamples } from '../data/karnatakaScamData';
import { simulateVoiceForensics } from '../mockData';

interface VoiceCloneDeepfakeDetectorProps {
  language: Language;
}

export const VoiceCloneDeepfakeDetector: React.FC<VoiceCloneDeepfakeDetectorProps> = ({
  language,
}) => {
  const [selectedSampleId, setSelectedSampleId] = useState<string>(voiceCloneAudioSamples[0].id);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [result, setResult] = useState<VoiceForensicResult | null>(null);

  // Safe Word Protocol State
  const [safeWord, setSafeWord] = useState('KAVACHA-2026');
  const [testSafeWordInput, setTestSafeWordInput] = useState('');
  const [safeWordStatus, setSafeWordStatus] = useState<'IDLE' | 'PASS' | 'FAIL'>('IDLE');

  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const animationFrameRef = useRef<number | null>(null);

  const currentSample = voiceCloneAudioSamples.find((s) => s.id === selectedSampleId) || voiceCloneAudioSamples[0];

  // Spectral Waveform Animation Effect
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let phase = 0;

    const render = () => {
      const width = canvas.width;
      const height = canvas.height;
      ctx.clearRect(0, 0, width, height);

      // Background subtle grid
      ctx.strokeStyle = 'rgba(51, 65, 85, 0.2)';
      ctx.lineWidth = 1;
      for (let x = 0; x < width; x += 30) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, height);
        ctx.stroke();
      }

      // Draw spectral bars
      const numBars = 36;
      const barWidth = width / numBars - 2;

      for (let i = 0; i < numBars; i++) {
        const factor = isPlaying ? Math.sin(phase + i * 0.3) * 0.5 + 0.5 : 0.08;
        const jitter = currentSample.isDeepfake && isPlaying ? (Math.random() - 0.5) * 20 : 0;
        const barHeight = Math.max(6, factor * (height - 30) + jitter);

        const x = i * (barWidth + 2);
        const y = height / 2 - barHeight / 2;

        const gradient = ctx.createLinearGradient(0, y, 0, y + barHeight);
        if (currentSample.isDeepfake) {
          gradient.addColorStop(0, '#ff3b5c');
          gradient.addColorStop(1, '#991b1b');
        } else {
          gradient.addColorStop(0, '#00ffcc');
          gradient.addColorStop(1, '#0284c7');
        }

        ctx.fillStyle = gradient;
        ctx.fillRect(x, y, barWidth, barHeight);
      }

      phase += isPlaying ? 0.15 : 0.02;
      animationFrameRef.current = requestAnimationFrame(render);
    };

    render();

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [isPlaying, currentSample]);

  const handlePlaySample = () => {
    if (isPlaying) {
      window.speechSynthesis.cancel();
      setIsPlaying(false);
      return;
    }

    setIsPlaying(true);
    // Use speech synthesis to play realistic prompt
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(currentSample.script);
      utterance.rate = currentSample.isDeepfake ? 1.05 : 0.95;
      utterance.pitch = currentSample.isDeepfake ? 1.2 : 1.0;
      utterance.onend = () => setIsPlaying(false);
      utterance.onerror = () => setIsPlaying(false);
      window.speechSynthesis.speak(utterance);
    } else {
      setTimeout(() => setIsPlaying(false), 4000);
    }
  };

  const handleRunForensics = async () => {
    setIsAnalyzing(true);
    setResult(null);
    try {
      const res = await simulateVoiceForensics();
      // align with sample truth
      res.isDeepfake = currentSample.isDeepfake;
      res.confidence = currentSample.metrics.confidence;
      res.spectralJitter = currentSample.metrics.jitter;
      res.respirationDetected = currentSample.metrics.respiration;
      res.biologicalScore = currentSample.metrics.biologicalScore;
      setResult(res);
    } finally {
      setIsAnalyzing(false);
    }
  };

  const handleVerifySafeWord = () => {
    if (!testSafeWordInput.trim()) return;
    if (testSafeWordInput.trim().toUpperCase() === safeWord.trim().toUpperCase()) {
      setSafeWordStatus('PASS');
    } else {
      setSafeWordStatus('FAIL');
    }
  };

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      {/* Section Header */}
      <div className="mb-6 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-blue-500/20 text-blue-400">
              <Mic className="h-4 w-4" />
            </span>
            <h2 className="text-xl font-bold text-slate-100 sm:text-2xl">
              {language === 'kn'
                ? 'AI ಧ್ವನಿ ಕ್ಲೋನ್ & ಡೀಪ್‌ಫೇಕ್ ಆಡಿಯೋ ಫೊರೆನ್ಸಿಕ್ ಲ್ಯಾಬ್'
                : 'Acoustic Deepfake Forensics & Family Safe Word Guard'}
            </h2>
          </div>
          <p className="mt-1 text-xs text-slate-400 sm:text-sm">
            {language === 'kn'
              ? 'ಸ್ಪೆಕ್ಟ್ರಲ್ ಜಿಟ್ಟರ್, ವೊಕೋಡರ್ ಹಾರ್ಮೋನಿಕ್ಸ್ ಮತ್ತು ಜೈವಿಕ ಉಸಿರಾಟದ ಮಾದರಿಗಳನ್ನು ವಿಶ್ಲೇಷಿಸಿ ನಕಲಿ ತುರ್ತು ಕರೆಗಳನ್ನು ಪತ್ತೆಹಚ್ಚಿ.'
              : 'Deconstruct acoustic jitter, synthetic vocoder harmonics, and biological respiration to defeat AI clone distress scams.'}
          </p>
        </div>

        <div className="flex items-center gap-2 rounded-xl border border-blue-500/30 bg-blue-950/30 px-3 py-1.5 text-xs text-blue-300">
          <Activity className="h-4 w-4 animate-pulse text-blue-400" />
          <span>Real-time Spectral Waveform Engine</span>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
        {/* Left: Waveform Visualizer & Sample Selector (7 cols) */}
        <div className="lg:col-span-7 flex flex-col gap-5">
          {/* Waveform Card */}
          <div className="rounded-2xl border border-slate-800 bg-slate-900/80 p-5 backdrop-blur-md">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <span className="h-2.5 w-2.5 rounded-full bg-cyan-400 animate-ping" />
                <h3 className="text-xs font-bold uppercase tracking-wider text-slate-200">
                  {language === 'kn' ? 'ಲೈವ್ ಸ್ಪೆಕ್ಟ್ರಲ್ ಆಡಿಯೋ ಅನಾಲಿಸಿಸ್' : 'Spectral Frequency & Harmonic Waveform'}
                </h3>
              </div>
              <span className="font-mono text-xs text-slate-400">
                Sampling: 44.1 kHz • Jitter: {currentSample.metrics.jitter}
              </span>
            </div>

            {/* Canvas Visualizer */}
            <div className="relative overflow-hidden rounded-xl border border-slate-800 bg-slate-950 p-2">
              <canvas
                ref={canvasRef}
                width={560}
                height={160}
                className="w-full h-40 block"
              />
              <div className="absolute bottom-2 right-3 font-mono text-[10px] text-slate-500">
                {currentSample.isDeepfake ? 'FLAG: SYNTHETIC HARMONIC VOCODER' : 'STATUS: BIOLOGICAL SPECTRUM'}
              </div>
            </div>

            {/* Playback Controls & Forensics Trigger */}
            <div className="mt-4 flex flex-wrap items-center justify-between gap-3 border-t border-slate-800 pt-4">
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={handlePlaySample}
                  className={`flex items-center gap-2 rounded-xl px-4 py-2 text-xs font-bold transition-all ${
                    isPlaying
                      ? 'bg-red-600 text-white shadow-md shadow-red-600/30'
                      : 'bg-gradient-to-r from-blue-500 to-cyan-500 text-slate-950 shadow-md shadow-blue-500/20 hover:scale-105'
                  }`}
                >
                  {isPlaying ? (
                    <>
                      <Square className="h-3.5 w-3.5 fill-current" />
                      <span>{language === 'kn' ? 'ನಿಲ್ಲಿಸಿ' : 'Stop Audio'}</span>
                    </>
                  ) : (
                    <>
                      <Play className="h-3.5 w-3.5 fill-current" />
                      <span>{language === 'kn' ? 'ಆಡಿಯೋ ಪ್ಲೇ ಮಾಡಿ' : 'Play Audio Simulation'}</span>
                    </>
                  )}
                </button>

                <button
                  type="button"
                  onClick={handleRunForensics}
                  disabled={isAnalyzing}
                  className="flex items-center gap-1.5 rounded-xl border border-slate-700 bg-slate-800 px-4 py-2 text-xs font-bold text-slate-200 hover:border-cyan-400 hover:text-cyan-300"
                >
                  <Sparkles className="h-3.5 w-3.5 text-cyan-400" />
                  <span>{isAnalyzing ? (language === 'kn' ? 'ಪರಿಶೀಲಿಸಲಾಗುತ್ತಿದೆ...' : 'Analyzing...') : language === 'kn' ? 'ಫೊರೆನ್ಸಿಕ್ ಸ್ಕ್ಯಾನ್' : 'Run Forensic Audit'}</span>
                </button>
              </div>

              <div className="text-right">
                <span className="text-[10px] text-slate-400 block font-mono">
                  Duration: {currentSample.duration}
                </span>
                <span className="text-[11px] font-bold text-slate-300">
                  {currentSample.speaker}
                </span>
              </div>
            </div>

            {/* Script Display */}
            <div className="mt-4 rounded-xl border border-slate-800/80 bg-slate-950/60 p-3.5">
              <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-1">
                {language === 'kn' ? 'ಕರೆ ಸಂಭಾಷಣೆ (Transcript):' : 'Audio Transcript:'}
              </div>
              <p className="text-xs text-slate-200 leading-relaxed font-sans italic">
                "{currentSample.script}"
              </p>
              {currentSample.scriptEn && (
                <p className="mt-1 text-[11px] text-slate-400 font-sans">
                  Translation: "{currentSample.scriptEn}"
                </p>
              )}
            </div>
          </div>

          {/* Sample Selector */}
          <div className="rounded-2xl border border-slate-800 bg-slate-900/40 p-4">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-300 mb-3">
              {language === 'kn' ? 'ಪರೀಕ್ಷಾ ಕರೆ ಮಾದರಿಗಳು (Select Sample)' : 'Test Audio Scenarios'}
            </h4>
            <div className="space-y-2">
              {voiceCloneAudioSamples.map((sample) => (
                <button
                  key={sample.id}
                  type="button"
                  onClick={() => {
                    setSelectedSampleId(sample.id);
                    setResult(null);
                    if (isPlaying) {
                      window.speechSynthesis.cancel();
                      setIsPlaying(false);
                    }
                  }}
                  className={`flex w-full items-center justify-between rounded-xl border p-3 text-left transition-all ${
                    selectedSampleId === sample.id
                      ? 'border-cyan-500/60 bg-cyan-950/30 text-slate-100 shadow-sm'
                      : 'border-slate-800 bg-slate-950/50 text-slate-300 hover:border-slate-700 hover:bg-slate-900/60'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div
                      className={`flex h-8 w-8 items-center justify-center rounded-lg ${
                        sample.isDeepfake
                          ? 'bg-red-500/20 text-red-400'
                          : 'bg-emerald-500/20 text-emerald-400'
                      }`}
                    >
                      <Mic className="h-4 w-4" />
                    </div>
                    <div>
                      <div className="text-xs font-bold text-slate-200">
                        {language === 'kn' ? sample.titleKn : sample.title}
                      </div>
                      <div className="text-[11px] text-slate-400">
                        {sample.speaker}
                      </div>
                    </div>
                  </div>

                  <span
                    className={`rounded px-2 py-0.5 font-mono text-[10px] font-bold ${
                      sample.isDeepfake
                        ? 'bg-red-500/20 text-red-300 border border-red-500/30'
                        : 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                    }`}
                  >
                    {sample.isDeepfake ? 'AI CLONED' : 'HUMAN'}
                  </span>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Right: Forensic Results & Safe Word Protocol (5 cols) */}
        <div className="lg:col-span-5 flex flex-col gap-5">
          {/* Forensic Result Card */}
          <div className="rounded-2xl border border-slate-800 bg-slate-900/80 p-5 backdrop-blur-md">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-300 mb-3 flex items-center gap-1.5">
              <Activity className="h-4 w-4 text-cyan-400" />
              <span>{language === 'kn' ? 'ಧ್ವನಿ ಫೊರೆನ್ಸಿಕ್ ಫಲಿತಾಂಶ' : 'Forensic Metric Breakdown'}</span>
            </h3>

            {result ? (
              <div className="space-y-3.5">
                <div
                  className={`flex items-center justify-between rounded-xl border p-3.5 ${
                    result.isDeepfake
                      ? 'border-red-500/50 bg-red-950/40 text-red-200'
                      : 'border-emerald-500/50 bg-emerald-950/40 text-emerald-200'
                  }`}
                >
                  <div>
                    <div className="text-xs font-bold uppercase tracking-wider">
                      {result.isDeepfake ? 'SYNTHETIC AI VOICE CLONE DETECTED' : 'AUTHENTIC HUMAN VOICE VERIFIED'}
                    </div>
                    <div className="text-[11px] opacity-80 mt-0.5">
                      Confidence: {result.confidence}% Match
                    </div>
                  </div>
                  {result.isDeepfake ? (
                    <AlertOctagon className="h-7 w-7 text-red-400" />
                  ) : (
                    <ShieldCheck className="h-7 w-7 text-emerald-400" />
                  )}
                </div>

                {/* Metric Meters */}
                <div className="space-y-2.5 text-xs">
                  <div>
                    <div className="flex justify-between text-slate-300 mb-1">
                      <span>Biological Authenticity Score:</span>
                      <span className="font-mono font-bold">{result.biologicalScore}/100</span>
                    </div>
                    <div className="h-2 w-full rounded-full bg-slate-800 overflow-hidden">
                      <div
                        className={`h-full rounded-full ${
                          result.biologicalScore > 60 ? 'bg-emerald-400' : 'bg-red-500'
                        }`}
                        style={{ width: `${result.biologicalScore}%` }}
                      />
                    </div>
                  </div>

                  <div className="flex items-center justify-between border-t border-slate-800 pt-2 text-slate-300">
                    <span>Biological Respiration (Breathing):</span>
                    <span className="font-mono font-bold">
                      {result.respirationDetected ? '✅ DETECTED' : '❌ ABSENT (AI Vocoder)'}
                    </span>
                  </div>

                  <div className="flex items-center justify-between border-t border-slate-800 pt-2 text-slate-300">
                    <span>Spectral Jitter Index:</span>
                    <span className="font-mono font-bold text-cyan-300">
                      {result.spectralJitter}
                    </span>
                  </div>
                </div>

                {/* Flags */}
                <div className="border-t border-slate-800 pt-3">
                  <div className="text-[10px] font-bold uppercase text-slate-400 mb-1.5">
                    Acoustic Indicators Flagged:
                  </div>
                  <div className="space-y-1">
                    {result.flags.map((f, i) => (
                      <div key={i} className="flex items-center gap-2 text-xs text-slate-300 font-mono">
                        <span className="h-1.5 w-1.5 rounded-full bg-cyan-400" />
                        <span>{f}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center p-6 text-center border border-dashed border-slate-800 rounded-xl">
                <Volume2 className="h-8 w-8 text-slate-600 mb-2" />
                <span className="text-xs text-slate-400">
                  {language === 'kn'
                    ? 'ಫೊರೆನ್ಸಿಕ್ ಸ್ಕ್ಯಾನ್ ಬಟನ್ ಒತ್ತಿ ಮೆಟ್ರಿಕ್ಸ್ ವೀಕ್ಷಿಸಿ'
                    : 'Click "Run Forensic Audit" to inspect biological resonance & vocoder frequencies.'}
                </span>
              </div>
            )}
          </div>

          {/* Family Safe Word Defense Card */}
          <div className="rounded-2xl border border-amber-500/30 bg-amber-950/20 p-5 backdrop-blur-md">
            <div className="flex items-center gap-2 mb-2">
              <KeyRound className="h-4 w-4 text-amber-400" />
              <h3 className="text-xs font-bold uppercase tracking-wider text-amber-300">
                {language === 'kn' ? 'ಕುಟುಂಬದ ರಹಸ್ಯ ಪದ ಪ್ರೋಟೋಕಾಲ್ (Safe Word)' : 'Family Safe Word Challenge Protocol'}
              </h3>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">
              {language === 'kn'
                ? 'AI ಧ್ವನಿ ಕ್ಲೋನ್ ಕರೆಗಳು ಎಂದಿಗೂ ನಿಮ್ಮ ಕುಟುಂಬದ ರಹಸ್ಯ ಪದವನ್ನು ಊಹಿಸಲು ಸಾಧ್ಯವಿಲ್ಲ. ತುರ್ತು ಸಮಯದಲ್ಲಿ ಈ ರಹಸ್ಯ ಪದವನ್ನು ಕೇಳಿ ಪರಿಶೀಲಿಸಿ.'
                : 'AI models can clone voice pitch within 3 seconds of audio, but cannot guess an offline family safe word.'}
            </p>

            <div className="mt-3.5 space-y-2.5">
              <div>
                <label className="text-[10px] font-bold uppercase text-slate-400 block mb-1">
                  {language === 'kn' ? 'ನಿಮ್ಮ ರಹಸ್ಯ ಪದ (Configured Safe Word):' : 'Set Your Family Safe Word:'}
                </label>
                <input
                  type="text"
                  value={safeWord}
                  onChange={(e) => setSafeWord(e.target.value.toUpperCase())}
                  className="w-full rounded-lg border border-slate-800 bg-slate-950 px-3 py-1.5 font-mono text-xs font-bold text-amber-400 focus:border-amber-400 focus:outline-none"
                />
              </div>

              <div>
                <label className="text-[10px] font-bold uppercase text-slate-400 block mb-1">
                  {language === 'kn' ? 'ಕರೆ ಮಾಡಿದವರ ರಹಸ್ಯ ಪದ ಪರೀಕ್ಷಿಸಿ (Test Incoming Caller):' : 'Challenge Caller With Safe Word:'}
                </label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={testSafeWordInput}
                    onChange={(e) => {
                      setTestSafeWordInput(e.target.value);
                      setSafeWordStatus('IDLE');
                    }}
                    placeholder="Enter what caller replied..."
                    className="flex-1 rounded-lg border border-slate-800 bg-slate-950 px-3 py-1.5 text-xs text-slate-200 focus:border-cyan-400 focus:outline-none"
                  />
                  <button
                    type="button"
                    onClick={handleVerifySafeWord}
                    className="rounded-lg bg-amber-500 px-3 py-1.5 text-xs font-bold text-slate-950 hover:bg-amber-400"
                  >
                    Verify
                  </button>
                </div>
              </div>

              {safeWordStatus === 'PASS' && (
                <div className="flex items-center gap-2 rounded-lg bg-emerald-950/60 border border-emerald-500/40 p-2 text-xs font-bold text-emerald-300">
                  <CheckCircle2 className="h-4 w-4" />
                  <span>{language === 'kn' ? 'ರಹಸ್ಯ ಪದ ಸರಿಯಾಗಿದೆ — ನೈಜ ಕುಟುಂಬದ ಸದಸ್ಯ!' : 'Safe Word Verified — Authentic Family Member!'}</span>
                </div>
              )}

              {safeWordStatus === 'FAIL' && (
                <div className="flex items-center gap-2 rounded-lg bg-red-950/60 border border-red-500/40 p-2 text-xs font-bold text-red-300">
                  <XCircle className="h-4 w-4" />
                  <span>{language === 'kn' ? 'ತಪ್ಪು ರಹಸ್ಯ ಪದ! ಇದು AI ಧ್ವನಿ ಕ್ಲೋನ್ ವಂಚನೆ — ಕರೆ ಕಟ್ ಮಾಡಿ!' : 'WRONG SAFE WORD! AI Voice Clone Impersonator — Disconnect Call!'}</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
