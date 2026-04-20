import { useState, useRef, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, X, Send, Bot, User, Sparkles } from 'lucide-react';

type Role = 'bot' | 'user';
interface Message { role: Role; text: string; id: number; }

type Stage =
  | 'GREETING'
  | 'CHOOSE_INTENT'
  | 'EXPLORE_AREA'
  | 'COLLECT_NAME'
  | 'COLLECT_EMAIL'
  | 'COLLECT_BRIEF'
  | 'SUBMITTED'
  | 'EXPLORE_INFO';

const INTENTS = [
  { label: '🚀 Hire Ahmed', value: 'hire' },
  { label: '💬 Discuss a project', value: 'project' },
  { label: '🔍 Explore his work', value: 'explore' },
  { label: '👋 Just saying hi', value: 'hi' },
];

const AREAS = [
  { label: '🤖 AI & Voice Agents', value: 'ai' },
  { label: '⚛️ Full-Stack Apps', value: 'fullstack' },
  { label: '🔗 Web3 / Blockchain', value: 'web3' },
  { label: '☁️ Cloud & DevOps', value: 'cloud' },
];

const AREA_INFO: Record<string, string> = {
  ai: "Ahmed built AI voice agent pipelines for Stammer — a speech therapy platform. He integrated real-time transcription, LLM-driven adaptive responses, and speaker diarization. He's skilled in building agentic workflows with LLMs and voice APIs. Want to discuss a similar project?",
  fullstack: "Ahmed's MERN/full-stack portfolio includes Stammer (React + DRF), Swoodle (e-commerce on AWS), MODJIVERSE (GPT-powered SaaS), and enterprise dashboards. Over 3 years shipping production apps. Want to get in touch?",
  web3: "Ahmed built Primape — a decentralized prediction market with ThirdWeb SDK and smart contract integration. He's comfortable across Web2 and Web3 stacks. Interested in discussing a blockchain project?",
  cloud: "Ahmed designed microservices infrastructure on AWS (EC2, S3, IAM) for a production AI platform at AI4LYF. He configures CI/CD pipelines with GitHub Actions and Docker. Want to connect?",
};

let msgIdCounter = 1;
function mkMsg(role: Role, text: string): Message {
  return { role, text, id: msgIdCounter++ };
}

export default function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [stage, setStage] = useState<Stage>('GREETING');
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [leadData, setLeadData] = useState({ name: '', email: '', brief: '', intent: '' });
  const [hasNotified, setHasNotified] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  const addBot = useCallback((text: string, delay = 800) => {
    setIsTyping(true);
    setTimeout(() => {
      setIsTyping(false);
      setMessages((prev) => [...prev, mkMsg('bot', text)]);
    }, delay);
  }, []);

  useEffect(() => {
    if (open && messages.length === 0) {
      addBot("Hi there! 👋 I'm Alex, Ahmed's AI portfolio assistant. I can tell you about his work, connect you with him, or help kick off a project. How can I help?", 600);
      setStage('CHOOSE_INTENT');
    }
  }, [open, messages.length, addBot]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  // Send page-view notification once on first open
  useEffect(() => {
    if (open && !hasNotified) {
      setHasNotified(true);
      const key = import.meta.env.VITE_WEB3FORMS_API_KEY;
      if (!key) return;
      const fd = new FormData();
      fd.append('access_key', key);
      fd.append('subject', '👀 Portfolio Viewed — Chat Widget Opened');
      fd.append('from_name', 'Portfolio Analytics');
      fd.append('message', `Someone opened the chat widget on your portfolio.\nTime: ${new Date().toLocaleString()}\nReferrer: ${document.referrer || 'Direct'}`);
      fetch('https://api.web3forms.com/submit', { method: 'POST', body: fd }).catch(() => {});
    }
  }, [open, hasNotified]);

  const handleIntent = (value: string) => {
    const label = INTENTS.find((i) => i.value === value)?.label ?? value;
    setMessages((prev) => [...prev, mkMsg('user', label)]);
    setLeadData((d) => ({ ...d, intent: value }));

    if (value === 'explore') {
      addBot("Great taste! Ahmed's built across several domains. What interests you most?", 700);
      setStage('EXPLORE_AREA');
    } else if (value === 'hi') {
      addBot("Hello! 😊 Happy to have you here. Feel free to browse. Want me to tell you something cool about Ahmed's work, or would you like to leave your email so he can follow up?", 800);
      setStage('COLLECT_NAME');
    } else {
      addBot(
        value === 'hire'
          ? "Excellent! Ahmed is currently open to new full-time and freelance opportunities. Let me pass your details along. What's your name?"
          : "Sounds exciting! Let me connect you with Ahmed. What's your name?",
        800
      );
      setStage('COLLECT_NAME');
    }
  };

  const handleArea = (value: string) => {
    const label = AREAS.find((a) => a.value === value)?.label ?? value;
    setMessages((prev) => [...prev, mkMsg('user', label)]);
    addBot(AREA_INFO[value], 900);
    setTimeout(() => {
      setMessages((prev) => [...prev, mkMsg('bot', "Would you like to leave your details so Ahmed can get in touch? Just share your name to start.")]);
      setStage('COLLECT_NAME');
    }, 900 + 1800);
  };

  const sendLead = async (data: typeof leadData) => {
    const key = import.meta.env.VITE_WEB3FORMS_API_KEY;
    if (!key) return;
    const fd = new FormData();
    fd.append('access_key', key);
    fd.append('subject', `🔔 New Portfolio Lead: ${data.name} (${data.intent})`);
    fd.append('from_name', data.name);
    fd.append('email', data.email);
    fd.append(
      'message',
      `Name: ${data.name}\nEmail: ${data.email}\nIntent: ${data.intent}\nMessage: ${data.brief || 'N/A'}\nTime: ${new Date().toLocaleString()}`
    );
    await fetch('https://api.web3forms.com/submit', { method: 'POST', body: fd }).catch(() => {});
  };

  const handleSend = () => {
    const text = input.trim();
    if (!text) return;
    setInput('');
    setMessages((prev) => [...prev, mkMsg('user', text)]);

    if (stage === 'COLLECT_NAME') {
      setLeadData((d) => ({ ...d, name: text }));
      addBot(`Nice to meet you, ${text}! 😊 What's the best email address for Ahmed to reach you?`, 700);
      setStage('COLLECT_EMAIL');
    } else if (stage === 'COLLECT_EMAIL') {
      if (!/\S+@\S+\.\S+/.test(text)) {
        addBot("Hmm, that doesn't look like a valid email. Mind double-checking?", 600);
        return;
      }
      setLeadData((d) => ({ ...d, email: text }));
      addBot("Perfect! 📧 Last thing — in a sentence or two, what's this about? (A project, a role, or anything you'd like to say)", 700);
      setStage('COLLECT_BRIEF');
    } else if (stage === 'COLLECT_BRIEF') {
      const updated = { ...leadData, brief: text };
      setLeadData(updated);
      setStage('SUBMITTED');
      addBot(`Thanks, ${leadData.name}! 🚀 I've notified Ahmed. He'll review your message and reach out to ${leadData.email} within 24 hours.`, 800);
      sendLead(updated);
      setTimeout(() => {
        setMessages((prev) => [
          ...prev,
          mkMsg('bot', "Is there anything else you'd like to know while you wait? I can tell you more about his projects or skills! 💡"),
        ]);
      }, 2400);
    } else if (stage === 'SUBMITTED') {
      addBot("Feel free to browse the portfolio in the meantime. Ahmed has some really interesting AI and Web3 projects! 🎯", 700);
    }
  };

  const showIntentButtons = stage === 'CHOOSE_INTENT' && !isTyping;
  const showAreaButtons = stage === 'EXPLORE_AREA' && !isTyping;
  const showInput = ['COLLECT_NAME', 'COLLECT_EMAIL', 'COLLECT_BRIEF', 'SUBMITTED'].includes(stage);

  return (
    <>
      {/* Floating Button */}
      <motion.button
        onClick={() => setOpen(true)}
        className={`fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full flex items-center justify-center shadow-2xl transition-all duration-300 ${open ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}
        style={{
          background: 'linear-gradient(135deg, #3B82F6, #737AFC)',
          boxShadow: '0 0 30px rgba(59,130,246,0.5), 0 4px 20px rgba(0,0,0,0.4)',
        }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: open ? 0 : 1, scale: open ? 0 : 1 }}
        transition={{ delay: 2, duration: 0.4, type: 'spring' }}
      >
        <MessageCircle className="w-6 h-6 text-white" />
        <span className="absolute -top-1 -right-1 w-4 h-4 bg-green-400 rounded-full border-2 border-background animate-pulse" />
      </motion.button>

      {/* Chat Panel */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 40, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 40, scale: 0.95 }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            className="fixed bottom-6 right-6 z-50 w-[360px] max-w-[calc(100vw-24px)] flex flex-col rounded-2xl overflow-hidden shadow-2xl"
            style={{
              height: '520px',
              border: '1px solid rgba(59,130,246,0.3)',
              background: 'hsl(var(--background))',
            }}
          >
            {/* Header */}
            <div
              className="flex items-center justify-between px-4 py-3 shrink-0"
              style={{ background: 'linear-gradient(135deg, #1d3a6e, #2d1b69)' }}
            >
              <div className="flex items-center gap-3">
                <div className="relative w-9 h-9 rounded-full bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center">
                  <Bot className="w-4 h-4 text-white" />
                  <span className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-green-400 rounded-full border-2 border-[#1d3a6e]" />
                </div>
                <div>
                  <div className="text-sm font-semibold text-white">Alex</div>
                  <div className="flex items-center gap-1 text-xs text-blue-300">
                    <Sparkles className="w-3 h-3" />
                    Ahmed's AI Assistant
                  </div>
                </div>
              </div>
              <button
                onClick={() => setOpen(false)}
                className="w-7 h-7 rounded-full flex items-center justify-center text-white/60 hover:text-white hover:bg-white/10 transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-3" style={{ scrollbarWidth: 'thin' }}>
              {messages.map((msg) => (
                <motion.div
                  key={msg.id}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`flex items-end gap-2 ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  {msg.role === 'bot' && (
                    <div className="w-7 h-7 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center shrink-0 mb-0.5">
                      <Bot className="w-3.5 h-3.5 text-white" />
                    </div>
                  )}
                  <div
                    className={`max-w-[80%] px-3 py-2 rounded-2xl text-sm leading-relaxed ${
                      msg.role === 'user'
                        ? 'bg-primary text-primary-foreground rounded-br-sm'
                        : 'bg-muted text-foreground rounded-bl-sm'
                    }`}
                  >
                    {msg.text}
                  </div>
                  {msg.role === 'user' && (
                    <div className="w-7 h-7 rounded-full bg-gradient-to-br from-slate-500 to-slate-600 flex items-center justify-center shrink-0 mb-0.5">
                      <User className="w-3.5 h-3.5 text-white" />
                    </div>
                  )}
                </motion.div>
              ))}

              {/* Typing indicator */}
              {isTyping && (
                <div className="flex items-end gap-2 justify-start">
                  <div className="w-7 h-7 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center shrink-0">
                    <Bot className="w-3.5 h-3.5 text-white" />
                  </div>
                  <div className="bg-muted px-4 py-3 rounded-2xl rounded-bl-sm flex gap-1.5 items-center">
                    {[0, 1, 2].map((i) => (
                      <span
                        key={i}
                        className="w-2 h-2 rounded-full bg-primary/60"
                        style={{ animation: `typing-bounce 1.2s ease-in-out ${i * 0.2}s infinite` }}
                      />
                    ))}
                  </div>
                </div>
              )}

              {/* Intent buttons */}
              {showIntentButtons && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="flex flex-col gap-2 pl-9"
                >
                  {INTENTS.map((intent) => (
                    <button
                      key={intent.value}
                      onClick={() => handleIntent(intent.value)}
                      className="text-left px-3 py-2 rounded-xl border border-primary/30 bg-primary/5 hover:bg-primary/15 hover:border-primary/60 text-sm transition-all duration-200 text-foreground"
                    >
                      {intent.label}
                    </button>
                  ))}
                </motion.div>
              )}

              {/* Area buttons */}
              {showAreaButtons && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="flex flex-col gap-2 pl-9"
                >
                  {AREAS.map((area) => (
                    <button
                      key={area.value}
                      onClick={() => handleArea(area.value)}
                      className="text-left px-3 py-2 rounded-xl border border-primary/30 bg-primary/5 hover:bg-primary/15 hover:border-primary/60 text-sm transition-all duration-200 text-foreground"
                    >
                      {area.label}
                    </button>
                  ))}
                </motion.div>
              )}

              <div ref={bottomRef} />
            </div>

            {/* Input */}
            {showInput && (
              <div className="px-3 py-3 border-t border-border/50 flex gap-2 shrink-0">
                <input
                  className="flex-1 text-sm bg-muted rounded-xl px-3 py-2 outline-none border border-transparent focus:border-primary/50 transition-colors placeholder:text-muted-foreground/50"
                  placeholder={
                    stage === 'COLLECT_NAME' ? 'Your name...'
                    : stage === 'COLLECT_EMAIL' ? 'Your email...'
                    : 'Your message...'
                  }
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                  autoFocus
                />
                <button
                  onClick={handleSend}
                  disabled={!input.trim()}
                  className="w-9 h-9 rounded-xl bg-primary flex items-center justify-center text-primary-foreground hover:bg-primary/90 disabled:opacity-40 disabled:cursor-not-allowed transition-all shrink-0"
                >
                  <Send className="w-4 h-4" />
                </button>
              </div>
            )}

            {/* Footer */}
            <div className="px-4 py-1.5 border-t border-border/30 text-center shrink-0">
              <span className="text-xs text-muted-foreground/50 font-mono">
                Powered by Ahmed's Portfolio AI
              </span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
