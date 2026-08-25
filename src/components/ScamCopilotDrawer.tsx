import React, { useState } from 'react';
import {
  Bot,
  X,
  Send,
  Sparkles,
  ArrowRight,
} from 'lucide-react';
import type { Language, CopilotMessage, ActivePillar } from '../types';

interface ScamCopilotDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  language: Language;
  onNavigateTo: (pillar: ActivePillar) => void;
}

export const ScamCopilotDrawer: React.FC<ScamCopilotDrawerProps> = ({
  isOpen,
  onClose,
  language,
  onNavigateTo,
}) => {
  const [messages, setMessages] = useState<CopilotMessage[]>([
    {
      id: '1',
      role: 'assistant',
      content:
        language === 'kn'
          ? 'ನಮಸ್ಕಾರ! ನಾನು ರಕ್ಷಾ AI ಸೈಬರ್ ತನಿಖಾ ಸಹಾಯಕ. ಯಾವುದೇ ಅನುಮಾನಾಸ್ಪದ ಕರೆ, SMS, ಅಥವಾ ವಂಚನೆಯ ಬಗ್ಗೆ ನನ್ನನ್ನು ಕೇಳಿ.'
          : 'Namaste! I am your Raksha AI Cyber Assistant. Ask me about suspicious calls, phishing links, 1930 procedures, or scam archetypes.',
      timestamp: 'Just now',
    },
  ]);
  const [inputQuery, setInputQuery] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  if (!isOpen) return null;

  const quickPrompts = [
    {
      label: language === 'kn' ? 'ಡಿಜಿಟಲ್ ಅರೆಸ್ಟ್ ನಿಜವೇ?' : 'Is Digital Arrest real?',
      query: 'Is Digital Arrest real in India?',
      actionTab: 'golden-hour' as ActivePillar,
    },
    {
      label: language === 'kn' ? 'ನಾನು ಲಿಂಕ್ ಕ್ಲಿಕ್ ಮಾಡಿದೆ, ಏನು ಮಾಡಬೇಕು?' : 'I clicked a fake link, what to do?',
      query: 'I clicked a suspicious link, what should I do now?',
      actionTab: 'golden-hour' as ActivePillar,
    },
    {
      label: language === 'kn' ? 'ಬೆಸ್ಕಾಂ ಮೆಸೇಜ್ ನಿಜವೇ ಅಥವಾ ನಕಲಿಯೇ?' : 'Why is BESCOM message fake?',
      query: 'Why do scammers send BESCOM electricity power cut SMS?',
      actionTab: 'phishing' as ActivePillar,
    },
  ];

  const handleSendQuery = (customText?: string) => {
    const text = customText || inputQuery;
    if (!text.trim()) return;

    const userMsg: CopilotMessage = {
      id: `user-${Date.now()}`,
      role: 'user',
      content: text,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputQuery('');
    setIsTyping(true);

    setTimeout(() => {
      let replyContent =
        language === 'kn'
          ? 'ನಾನು ಈ ವಿವರಗಳನ್ನು ಪರಿಶೀಲಿಸಿದ್ದೇನೆ. ಎಂದಿಗೂ OTP, ATM PIN ಅಥವಾ ರಹಸ್ಯ ಪಾಸ್‌ವರ್ಡ್ ಹಂಚಿಕೊಳ್ಳಬೇಡಿ. ಅನುಮಾನವಿದ್ದರೆ ನಮ್ಮ ಫಿಶಿಂಗ್ ಸ್ಕ್ಯಾನರ್‌ನಲ್ಲಿ ಪಠ್ಯವನ್ನು ಪರೀಕ್ಷಿಸಿ ಅಥವಾ 1930 ಗೆ ಕರೆ ಮಾಡಿ.'
          : 'I have analyzed your query. Never share bank OTPs or transfer money to unverified UPI handles. Use our forensic tools or call 1930 immediately if funds were lost.';

      const lower = text.toLowerCase();
      let actionLinks: { label: string; tab: ActivePillar }[] | undefined;

      if (lower.includes('digital arrest') || lower.includes('police') || lower.includes('cbi')) {
        replyContent =
          language === 'kn'
            ? 'ಭಾರತೀಯ ಕಾನೂನಿನಲ್ಲಿ "ಡಿಜಿಟಲ್ ಅರೆಸ್ಟ್" ಎಂಬ ಯಾವುದೇ ನಿಯಮವಿಲ್ಲ. ಇದು 100% ಸುಲಿಗೆ ವಂಚನೆ. ಕರೆಯನ್ನು ತಕ್ಷಣ ಕಟ್ ಮಾಡಿ ಮತ್ತು 1930 ಗೆ ದೂರು ನೀಡಿ.'
            : 'Digital arrest is completely fraudulent. Police never interrogate over video calls or ask for security deposits. Hang up and dial 1930.';
        actionLinks = [{ label: 'Open 1930 Emergency Freeze', tab: 'golden-hour' }];
      } else if (lower.includes('voice') || lower.includes('call') || lower.includes('kidnap')) {
        replyContent =
          language === 'kn'
            ? 'ಇದು AI ವಾಯ್ಸ್ ಕ್ಲೋನ್ ವಂಚನೆಯಾಗಿರಬಹುದು. ನಿಮ್ಮ ಕುಟುಂಬದ ಜೊತೆಗೂಡಿ ರಹಸ್ಯ "ಫ್ಯಾಮಿಲಿ ಸೇಫ್ ವರ್ಡ್" ಬಳಸಿ ಪರೀಕ್ಷಿಸಿ.'
            : 'This matches AI Voice Clone patterns. Use your offline Family Safe Word to verify the caller before transferring any funds.';
        actionLinks = [{ label: 'Launch Voice Forensics Lab', tab: 'voice' }];
      } else if (lower.includes('apk') || lower.includes('loan') || lower.includes('app')) {
        replyContent =
          language === 'kn'
            ? 'ಸೈಡ್‌ಲೋಡ್ ಸಾಲದ ಆ್ಯಪ್‌ಗಳು ನಿಮ್ಮ ಸಂಪರ್ಕಗಳನ್ನು ಕದಿಯುತ್ತವೆ. ಫೋನ್ ಅನ್ನು Safe Mode ನಲ್ಲಿ ರನ್ ಮಾಡಿ ಆ್ಯಪ್ ಅನ್‌ಇನ್‌ಸ್ಟಾಲ್ ಮಾಡಿ.'
            : 'Predatory loan apps use Accessibility permissions to exfiltrate contacts and gallery photos. Run our APK sandbox to inspect permissions.';
        actionLinks = [{ label: 'Inspect APK Sandbox', tab: 'apk' }];
      }

      const botMsg: CopilotMessage = {
        id: `bot-${Date.now()}`,
        role: 'assistant',
        content: replyContent,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        actionLinks,
      };

      setMessages((prev) => [...prev, botMsg]);
      setIsTyping(false);
    }, 1000);
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-black/60 backdrop-blur-sm">
      <div className="flex h-full w-full max-w-md flex-col border-l border-slate-800 bg-slate-950 shadow-2xl animate-slide-in-right">
        {/* Drawer Header */}
        <div className="flex items-center justify-between border-b border-slate-800 bg-slate-900/80 px-4 py-3.5">
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-cyan-500/20 text-cyan-400">
              <Bot className="h-4 w-4 animate-pulse" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-slate-100">
                RAKSHA <span className="text-cyan-400">AI Copilot</span>
              </h3>
              <span className="text-[10px] text-slate-400 font-sans">
                {language === 'kn' ? 'ಕರ್ನಾಟಕ ಸೈಬರ್ ಸಹಾಯವಾಣಿ' : '24/7 Indic Cyber Defense Assistant'}
              </span>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="rounded-lg p-1.5 text-slate-400 hover:bg-slate-800 hover:text-white"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Chat History */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3.5 text-xs">
          {messages.map((msg) => {
            const isBot = msg.role === 'assistant';
            return (
              <div
                key={msg.id}
                className={`flex flex-col ${isBot ? 'items-start' : 'items-end'}`}
              >
                <div className="flex items-center gap-1 text-[10px] text-slate-400 mb-1 font-mono">
                  {isBot ? 'RAKSHA AI' : 'YOU'} • {msg.timestamp}
                </div>
                <div
                  className={`max-w-[85%] rounded-2xl p-3 leading-relaxed whitespace-pre-wrap ${
                    isBot
                      ? 'border border-cyan-500/30 bg-cyan-950/30 text-slate-100 rounded-tl-sm'
                      : 'border border-slate-700 bg-slate-800 text-slate-200 rounded-tr-sm'
                  }`}
                >
                  {msg.content}

                  {msg.actionLinks && (
                    <div className="mt-2.5 pt-2 border-t border-cyan-500/20 space-y-1">
                      {msg.actionLinks.map((link, i) => (
                        <button
                          key={i}
                          type="button"
                          onClick={() => {
                            onNavigateTo(link.tab);
                            onClose();
                          }}
                          className="flex items-center gap-1.5 rounded-lg bg-cyan-500/20 border border-cyan-500/40 px-2.5 py-1 text-[11px] font-bold text-cyan-300 hover:bg-cyan-500/30 w-full"
                        >
                          <span>{link.label}</span>
                          <ArrowRight className="h-3 w-3" />
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            );
          })}

          {isTyping && (
            <div className="flex items-center gap-2 text-xs text-cyan-400 font-mono animate-pulse">
              <Sparkles className="h-3.5 w-3.5 animate-spin" />
              <span>Analyzing threat databases...</span>
            </div>
          )}
        </div>

        {/* Quick Prompts */}
        <div className="border-t border-slate-800 bg-slate-900/50 p-3">
          <div className="text-[10px] font-bold uppercase text-slate-400 mb-1.5">
            Quick Questions:
          </div>
          <div className="flex flex-wrap gap-1.5">
            {quickPrompts.map((qp, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => handleSendQuery(qp.query)}
                className="rounded-lg border border-slate-800 bg-slate-950 px-2.5 py-1 text-[11px] text-cyan-300 hover:border-cyan-500"
              >
                {qp.label}
              </button>
            ))}
          </div>
        </div>

        {/* Input Bar */}
        <div className="border-t border-slate-800 bg-slate-900 p-3">
          <div className="flex items-center gap-2">
            <input
              type="text"
              value={inputQuery}
              onChange={(e) => setInputQuery(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSendQuery()}
              placeholder={
                language === 'kn'
                  ? 'ಸೈಬರ್ ಪ್ರಶ್ನೆಯನ್ನು ಕೇಳಿ...'
                  : 'Ask about any cyber threat or procedure...'
              }
              className="flex-1 rounded-xl border border-slate-800 bg-slate-950 px-3.5 py-2 text-xs text-slate-200 focus:border-cyan-500 focus:outline-none"
            />
            <button
              type="button"
              onClick={() => handleSendQuery()}
              className="rounded-xl bg-cyan-500 p-2 text-slate-950 hover:bg-cyan-400"
            >
              <Send className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
