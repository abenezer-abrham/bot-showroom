import React, { useState, useEffect, useRef } from 'react';
import { DEMO_FLOWS } from '../config/showroom';
import { BotSimulatorStep } from '../types/showroom';
import { RotateCcw, CheckCheck, ExternalLink, Send, ArrowRight } from 'lucide-react';

interface TelegramSimulatorProps {
  activeDemoFlowId: string;
  onSelectFlow: (flowId: string) => void;
  onOrderPackage: (packageId: string) => void;
}

export const TelegramSimulator: React.FC<TelegramSimulatorProps> = ({
  activeDemoFlowId,
  onSelectFlow,
  onOrderPackage,
}) => {
  const [messages, setMessages] = useState<BotSimulatorStep[]>([]);
  const [isTyping, setIsTyping] = useState<boolean>(false);
  const [customInput, setCustomInput] = useState<string>('');
  const chatContainerRef = useRef<HTMLDivElement>(null);

  const activeFlow = DEMO_FLOWS[activeDemoFlowId] || DEMO_FLOWS['standard-flow'];

  useEffect(() => {
    // Reset conversation when active flow changes
    setMessages(activeFlow.initialMessages);
  }, [activeDemoFlowId]);

  useEffect(() => {
    // Scroll strictly inside the chat container so the main webpage window never jumps
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTo({
        top: chatContainerRef.current.scrollHeight,
        behavior: 'smooth',
      });
    }
  }, [messages, isTyping]);

  const handleButtonClick = (action: string, label: string, url?: string) => {
    if (url) {
      window.open(url, '_blank');
      return;
    }

    if (action === 'reset') {
      setMessages(activeFlow.initialMessages);
      return;
    }

    // Append user tap message
    const userMsg: BotSimulatorStep = {
      id: `usr-${Date.now()}`,
      sender: 'user',
      text: label,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMsg]);
    setIsTyping(true);

    setTimeout(() => {
      setIsTyping(false);
      const flowResponse = activeFlow.responses[action];
      if (flowResponse && flowResponse.length > 0) {
        const botOnly = flowResponse.filter((s) => s.sender === 'bot');
        if (botOnly.length > 0) {
          setMessages((prev) => [...prev, ...botOnly]);
        }
      } else {
        setMessages((prev) => [
          ...prev,
          {
            id: `bot-${Date.now()}`,
            sender: 'bot',
            text: `Action "${label}" processed. This updates the business order status and alerts the owner.`,
            buttons: [{ label: 'Back to Start', action: 'reset' }],
            time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          },
        ]);
      }
    }, 450);
  };

  const handleCustomSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customInput.trim()) return;

    const text = customInput.trim();
    setCustomInput('');

    const userMsg: BotSimulatorStep = {
      id: `usr-${Date.now()}`,
      sender: 'user',
      text,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMsg]);
    setIsTyping(true);

    setTimeout(() => {
      setIsTyping(false);
      setMessages((prev) => [
        ...prev,
        {
          id: `echo-${Date.now()}`,
          sender: 'bot',
          text: `Command "${text}" received. The bot processes inquiries and notifies the owner directly.`,
          buttons: [{ label: 'Restart Flow', action: 'reset' }],
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        },
      ]);
    }, 500);
  };

  const flowTabs = [
    { id: 'starter-flow', label: 'Starter: Menu & Location', packageId: 'starter' },
    { id: 'standard-flow', label: 'Standard: Order Dispatch', packageId: 'standard' },
    { id: 'full-flow', label: 'Full: Bookings & Reports', packageId: 'full' },
  ];

  return (
    <section id="simulator" className="py-20 sm:py-28 bg-[#0b0d13] border-t border-white/5 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-10">
          <div className="text-xs font-semibold text-emerald-400 uppercase tracking-wider mb-2">
            Live Sandbox
          </div>
          <h2 className="text-2xl sm:text-4xl font-bold text-white tracking-tight">
            Test Real Bot Workflows
          </h2>
          <p className="mt-3 text-sm sm:text-base text-slate-300">
            Click through menu options, simulated cart orders, and booking confirmations to test the exact customer experience.
          </p>

          {/* Flow Selector Pills */}
          <div className="mt-8 flex items-center justify-center gap-2 flex-wrap">
            {flowTabs.map((tab) => {
              const isSelected = tab.id === activeDemoFlowId;
              return (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => onSelectFlow(tab.id)}
                  className={`px-4 py-2 rounded-lg text-xs font-semibold transition-all ${
                    isSelected
                      ? 'bg-emerald-400 text-black font-bold shadow-sm'
                      : 'bg-[#151722] text-slate-400 hover:text-white border border-white/10'
                  }`}
                >
                  {tab.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Telegram Device Window */}
        <div className="max-w-xl mx-auto rounded-2xl bg-[#0f1118] border border-white/15 shadow-2xl overflow-hidden">
          {/* Header */}
          <div className="bg-[#161a25] px-4 py-3 border-b border-white/10 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 flex items-center justify-center text-xs font-bold">
                YS
              </div>
              <div>
                <div className="flex items-center gap-1.5">
                  <span className="font-bold text-xs sm:text-sm text-white">{activeFlow.tierName}</span>
                  <span className="text-[9px] uppercase font-bold px-1.5 py-0.2 rounded bg-white/10 text-slate-300">
                    BOT
                  </span>
                </div>
                <div className="text-[11px] text-emerald-400">
                  {activeFlow.botUsername} • online
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setMessages(activeFlow.initialMessages)}
                title="Restart Conversation"
                className="p-1.5 rounded-lg bg-white/5 text-slate-400 hover:text-white transition-colors"
                aria-label="Restart conversation"
              >
                <RotateCcw className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={() => onOrderPackage(activeFlow.tierId)}
                className="text-xs font-semibold px-3 py-1.5 rounded-lg bg-emerald-400 text-black hover:bg-emerald-300 transition-colors"
              >
                Order Tier
              </button>
            </div>
          </div>

          {/* Messages Area */}
          <div
            ref={chatContainerRef}
            className="p-4 sm:p-5 space-y-3.5 min-h-[340px] max-h-[440px] overflow-y-auto bg-[#090b10]"
          >
            {messages.map((msg) => {
              const isUser = msg.sender === 'user';
              return (
                <div
                  key={msg.id}
                  className={`flex flex-col ${isUser ? 'items-end' : 'items-start'}`}
                >
                  <div
                    className={`max-w-[88%] rounded-xl px-3.5 py-2.5 text-xs sm:text-sm leading-relaxed ${
                      isUser
                        ? 'bg-emerald-500 text-black font-medium rounded-br-none'
                        : 'bg-[#181d29] text-slate-100 rounded-bl-none border border-white/5'
                    }`}
                  >
                    <div className="whitespace-pre-line">
                      {msg.text.split('\n').map((line, lIdx) => (
                        <p key={lIdx} className={lIdx > 0 ? 'mt-1' : ''}>
                          {line}
                        </p>
                      ))}
                    </div>
                    <div
                      className={`text-[10px] mt-1 flex items-center justify-end gap-1 ${
                        isUser ? 'text-black/60' : 'text-slate-500'
                      }`}
                    >
                      <span>{msg.time || '12:00'}</span>
                      {isUser && <CheckCheck className="w-3 h-3 text-black" />}
                    </div>
                  </div>

                  {/* Inline Buttons */}
                  {msg.buttons && msg.buttons.length > 0 && (
                    <div className="mt-1.5 grid grid-cols-1 sm:grid-cols-2 gap-1.5 w-full max-w-[88%]">
                      {msg.buttons.map((btn, bIdx) => (
                        <button
                          key={bIdx}
                          type="button"
                          onClick={() => handleButtonClick(btn.action, btn.label, btn.url)}
                          className="px-3 py-2 rounded-lg bg-[#202636] hover:bg-[#283044] text-slate-200 text-xs font-medium transition-colors border border-white/10 text-center flex items-center justify-center gap-1 min-h-[38px] active:scale-98"
                        >
                          <span>{btn.label}</span>
                          {btn.url && <ExternalLink className="w-3 h-3 text-slate-400" />}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}

            {isTyping && (
              <div className="flex items-center gap-2 text-xs text-slate-400">
                <div className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-[#181d29] border border-white/5">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-bounce" />
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-bounce [animation-delay:0.2s]" />
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-bounce [animation-delay:0.4s]" />
                </div>
                <span className="text-[11px] text-slate-400">typing...</span>
              </div>
            )}
          </div>

          {/* Input Bar */}
          <form
            onSubmit={handleCustomSend}
            className="p-2.5 bg-[#12151e] border-t border-white/10 flex items-center gap-2"
          >
            <input
              type="text"
              value={customInput}
              onChange={(e) => setCustomInput(e.target.value)}
              placeholder="Type a test message or command..."
              className="flex-1 px-3.5 py-2 text-xs bg-[#090b10] rounded-lg border border-white/10 text-white placeholder-slate-500 focus:outline-none focus:border-emerald-400"
            />
            <button
              type="submit"
              className="p-2 rounded-lg bg-emerald-400 text-black hover:bg-emerald-300 transition-colors shrink-0"
              aria-label="Send test message"
            >
              <Send className="w-3.5 h-3.5" />
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};
