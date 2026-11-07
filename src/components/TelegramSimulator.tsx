import React, { useState, useEffect, useRef } from 'react';
import { DEMO_FLOWS, BOT_CATALOG, SITE_CONFIG } from '../config/showroom';
import { BotSimulatorStep, BotItem } from '../types/showroom';
import { Send, RotateCcw, Sparkles, CheckCheck, Bot, ExternalLink, ShieldCheck } from 'lucide-react';

interface TelegramSimulatorProps {
  initialFlowId?: string;
  onOrderBotById: (botId: string) => void;
}

export const TelegramSimulator: React.FC<TelegramSimulatorProps> = ({
  initialFlowId = 'shop-bot-flow',
  onOrderBotById,
}) => {
  const [currentFlowId, setCurrentFlowId] = useState<string>(initialFlowId);
  const [messages, setMessages] = useState<BotSimulatorStep[]>([]);
  const [isTyping, setIsTyping] = useState<boolean>(false);
  const [customInput, setCustomInput] = useState<string>('');
  const chatBottomRef = useRef<HTMLDivElement>(null);

  const activeFlow = DEMO_FLOWS[currentFlowId] || DEMO_FLOWS['shop-bot-flow'];
  const activeBot = BOT_CATALOG.find((b) => b.id === activeFlow.botId) || BOT_CATALOG[0];

  useEffect(() => {
    if (initialFlowId && DEMO_FLOWS[initialFlowId]) {
      setCurrentFlowId(initialFlowId);
    }
  }, [initialFlowId]);

  useEffect(() => {
    // Reset conversation whenever active flow changes
    setMessages(activeFlow.initialMessages);
  }, [currentFlowId]);

  useEffect(() => {
    // Auto-scroll to bottom of chat
    chatBottomRef.current?.scrollIntoView({ behavior: 'smooth' });
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

    // Append user message
    const userMsg: BotSimulatorStep = {
      id: `user-${Date.now()}`,
      sender: 'user',
      text: label,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMsg]);
    setIsTyping(true);

    setTimeout(() => {
      setIsTyping(false);
      const botResponse = activeFlow.responses[action];
      if (botResponse && botResponse.length > 0) {
        // filter out any user step from predefined responses
        const botOnlySteps = botResponse.filter((s) => s.sender === 'bot');
        if (botOnlySteps.length > 0) {
          setMessages((prev) => [...prev, ...botOnlySteps]);
        }
      } else {
        // Fallback default response
        setMessages((prev) => [
          ...prev,
          {
            id: `fallback-${Date.now()}`,
            sender: 'bot',
            text: `🤖 Simulated response for action: **${label}**.\n\nIn the real production bot, this triggers an asynchronous webhook handling business logic, payment verifications, and database updates.`,
            buttons: [{ label: '🔄 Reset Chat', action: 'reset' }],
            time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          },
        ]);
      }
    }, 600);
  };

  const handleCustomSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customInput.trim()) return;

    const userText = customInput.trim();
    setCustomInput('');

    const userMsg: BotSimulatorStep = {
      id: `user-${Date.now()}`,
      sender: 'user',
      text: userText,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMsg]);
    setIsTyping(true);

    setTimeout(() => {
      setIsTyping(false);
      setMessages((prev) => [
        ...prev,
        {
          id: `bot-echo-${Date.now()}`,
          sender: 'bot',
          text: `🤖 Received: "${userText}".\n\nOur bots are programmed with conversational state machines (aiogram 3.x) & RAG LLM integration to interpret natural language effortlessly.\n\nReady to test or purchase?`,
          buttons: [
            { label: '🛒 Browse Catalog', action: 'browse_catalog' },
            { label: '💬 Talk to Developer', action: 'handover' },
            { label: '🔄 Reset', action: 'reset' },
          ],
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        },
      ]);
    }, 700);
  };

  return (
    <section id="simulator" className="py-24 bg-[#08090d] border-t border-white/5 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-spotify-green/10 text-spotify-green text-xs font-bold uppercase tracking-wider mb-3 border border-spotify-green/20">
            <Sparkles className="w-3.5 h-3.5" />
            Interactive In-Browser Telegram Sandbox
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
            Test Real Bot Workflows Live
          </h2>
          <p className="mt-4 text-slate-300 text-sm sm:text-base">
            Click through inline buttons, checkouts, and AI responses. Experience the exact user experience your customers will get inside Telegram.
          </p>

          {/* Bot Selector Pills */}
          <div className="mt-8 flex items-center justify-center gap-2 flex-wrap">
            {Object.entries(DEMO_FLOWS).map(([key, flow]) => {
              const isSelected = key === currentFlowId;
              return (
                <button
                  key={key}
                  onClick={() => setCurrentFlowId(key)}
                  className={`px-4 py-2 rounded-full text-xs font-semibold transition-all flex items-center gap-2 ${
                    isSelected
                      ? 'bg-spotify-green text-black font-bold shadow-glow-green/30 scale-105'
                      : 'bg-[#151722] text-slate-400 hover:text-white border border-white/5'
                  }`}
                >
                  <span>{flow.avatarText}</span>
                  <span>{flow.botName.replace(' Demo', '')}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Simulator Device Frame */}
        <div className="max-w-2xl mx-auto rounded-3xl bg-[#0f1118] border-2 border-slate-700/60 shadow-2xl overflow-hidden relative">
          {/* Telegram Header */}
          <div className="bg-[#181b26] px-5 py-3.5 border-b border-white/10 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-spotify-green to-cyan-500 flex items-center justify-center text-lg font-bold text-black shadow-md">
                {activeFlow.avatarText}
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-bold text-sm text-white">{activeFlow.botName}</span>
                  <span className="text-[10px] uppercase font-bold px-1.5 py-0.2 rounded bg-spotify-green/20 text-spotify-green">
                    BOT
                  </span>
                </div>
                <div className="text-xs text-spotify-green flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-spotify-green inline-block animate-pulse"></span>
                  {activeFlow.botUsername} • online
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => setMessages(activeFlow.initialMessages)}
                title="Restart Conversation"
                className="p-2 rounded-lg bg-white/5 text-slate-400 hover:text-white hover:bg-white/10 transition-colors"
              >
                <RotateCcw className="w-4 h-4" />
              </button>
              <button
                onClick={() => onOrderBotById(activeFlow.botId)}
                className="text-xs font-bold px-3 py-1.5 rounded-full bg-spotify-green text-black hover:bg-spotify-green-light transition-all shadow-glow-green/30"
              >
                Deploy Bot
              </button>
            </div>
          </div>

          {/* Chat Messages Area */}
          <div className="p-4 sm:p-6 space-y-4 min-h-[380px] max-h-[480px] overflow-y-auto bg-[#0a0c13]/95 bg-[radial-gradient(#181d2c_1px,transparent_1px)] [background-size:16px_16px]">
            {messages.map((msg) => {
              const isUser = msg.sender === 'user';
              return (
                <div
                  key={msg.id}
                  className={`flex flex-col ${isUser ? 'items-end' : 'items-start'}`}
                >
                  <div
                    className={`max-w-[85%] rounded-2xl px-4 py-3 text-xs sm:text-sm leading-relaxed shadow-md ${
                      isUser
                        ? 'bg-gradient-to-r from-spotify-green to-emerald-500 text-black font-medium rounded-br-none'
                        : 'bg-[#1b1f2d] text-slate-100 rounded-bl-none border border-white/5'
                    }`}
                  >
                    <div className="whitespace-pre-line">
                      {msg.text.split('\n').map((line, lIdx) => (
                        <p key={lIdx} className={lIdx > 0 ? 'mt-1.5' : ''}>
                          {line}
                        </p>
                      ))}
                    </div>
                    <div
                      className={`text-[10px] mt-1.5 flex items-center justify-end gap-1 ${
                        isUser ? 'text-black/60' : 'text-slate-400'
                      }`}
                    >
                      <span>{msg.time || '12:00'}</span>
                      {isUser && <CheckCheck className="w-3.5 h-3.5 text-black" />}
                    </div>
                  </div>

                  {/* Inline Telegram Keyboard Buttons */}
                  {msg.buttons && msg.buttons.length > 0 && (
                    <div className="mt-2 grid grid-cols-1 sm:grid-cols-2 gap-2 w-full max-w-[85%]">
                      {msg.buttons.map((btn, bIdx) => (
                        <button
                          key={bIdx}
                          onClick={() => handleButtonClick(btn.action, btn.label, btn.url)}
                          className="px-3 py-2 rounded-xl bg-[#23283a] hover:bg-[#2d344b] text-slate-200 text-xs font-semibold transition-all border border-white/10 hover:border-spotify-green/50 text-center flex items-center justify-center gap-1.5 shadow-sm active:scale-95"
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

            {/* Typing Indicator */}
            {isTyping && (
              <div className="flex items-center gap-2 text-xs text-slate-400 py-1">
                <div className="flex items-center gap-1 px-3 py-2 rounded-2xl bg-[#1b1f2d] border border-white/5">
                  <span className="w-1.5 h-1.5 rounded-full bg-spotify-green animate-bounce" />
                  <span className="w-1.5 h-1.5 rounded-full bg-spotify-green animate-bounce [animation-delay:0.2s]" />
                  <span className="w-1.5 h-1.5 rounded-full bg-spotify-green animate-bounce [animation-delay:0.4s]" />
                </div>
                <span className="text-[11px] font-mono text-spotify-green">{activeFlow.botUsername} is typing...</span>
              </div>
            )}
            <div ref={chatBottomRef} />
          </div>

          {/* Interactive Chat Input Bar */}
          <form
            onSubmit={handleCustomSend}
            className="p-3 bg-[#131622] border-t border-white/10 flex items-center gap-2"
          >
            <input
              type="text"
              value={customInput}
              onChange={(e) => setCustomInput(e.target.value)}
              placeholder="Type a simulated message or command..."
              className="flex-1 px-4 py-2 text-xs bg-[#0b0d14] rounded-full border border-white/10 text-white placeholder-slate-500 focus:outline-none focus:border-spotify-green"
            />
            <button
              type="submit"
              className="p-2 rounded-full bg-spotify-green text-black hover:bg-spotify-green-light transition-all shrink-0"
              title="Send Message"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>

          {/* Footer inside device */}
          <div className="bg-[#0b0d14] px-4 py-2 border-t border-white/5 flex items-center justify-between text-[11px] text-slate-400">
            <span>Showing: {activeBot.name}</span>
            <span className="text-spotify-green font-medium">
              One-Time: ${activeBot.oneTimePrice} | Monthly: ${activeBot.monthlyPrice}/mo
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};
