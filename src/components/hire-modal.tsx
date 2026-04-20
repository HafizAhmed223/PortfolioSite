import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ArrowRight, ArrowLeft, CheckCircle2, Sparkles, Rocket, Brain, Globe, Cloud, Code2, Loader2 } from 'lucide-react';
import { Button } from './ui/button';
import { toast } from 'sonner';

interface HireModalProps {
  open: boolean;
  onClose: () => void;
}

const PROJECT_TYPES = [
  { icon: Brain, value: 'ai-agents', label: 'AI / Voice Agents', desc: 'LLM pipelines, voice bots, agentic workflows' },
  { icon: Code2, value: 'fullstack', label: 'Full-Stack App', desc: 'MERN, Django REST, Next.js — end-to-end' },
  { icon: Globe, value: 'web3', label: 'Web3 / Blockchain', desc: 'Smart contracts, DeFi, NFT platforms' },
  { icon: Cloud, value: 'cloud', label: 'Cloud & DevOps', desc: 'AWS architecture, CI/CD, microservices' },
  { icon: Rocket, value: 'saas', label: 'SaaS Product', desc: 'From MVP to scalable, revenue-generating SaaS' },
  { icon: Sparkles, value: 'other', label: 'Something Else', desc: 'Let\'s talk — I love unique challenges' },
];

const BUDGETS = [
  'Under $1,000',
  '$1,000 – $5,000',
  '$5,000 – $15,000',
  '$15,000 – $50,000',
  '$50,000+',
  'Let\'s discuss',
];

const TIMELINES = [
  'ASAP (< 2 weeks)',
  '1 month',
  '2–3 months',
  '3–6 months',
  '6+ months',
  'Ongoing / Retainer',
];

const TOTAL_STEPS = 4;

function StepIndicator({ step }: { step: number }) {
  return (
    <div className="flex items-center gap-2 mb-8">
      {Array.from({ length: TOTAL_STEPS }).map((_, i) => (
        <div key={i} className="flex items-center gap-2">
          <div
            className={`flex items-center justify-center rounded-full text-xs font-bold transition-all duration-300 ${
              i < step
                ? 'w-7 h-7 bg-primary text-primary-foreground'
                : i === step
                ? 'w-7 h-7 border-2 border-primary text-primary'
                : 'w-6 h-6 border border-border text-muted-foreground'
            }`}
          >
            {i < step ? <CheckCircle2 className="w-4 h-4" /> : i + 1}
          </div>
          {i < TOTAL_STEPS - 1 && (
            <div className={`h-px flex-1 w-6 transition-all duration-500 ${i < step ? 'bg-primary' : 'bg-border'}`} />
          )}
        </div>
      ))}
      <span className="ml-2 text-xs text-muted-foreground font-mono">{step + 1} / {TOTAL_STEPS}</span>
    </div>
  );
}

export default function HireModal({ open, onClose }: HireModalProps) {
  const [step, setStep] = useState(0);
  const [submitting, setSubmitting] = useState(false);
  const [done, setDone] = useState(false);
  const [form, setForm] = useState({
    projectType: '',
    budget: '',
    timeline: '',
    vision: '',
    name: '',
    email: '',
    company: '',
  });

  useEffect(() => {
    if (open) {
      setStep(0);
      setDone(false);
      setForm({ projectType: '', budget: '', timeline: '', vision: '', name: '', email: '', company: '' });
    }
  }, [open]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [onClose]);

  const canAdvance = () => {
    if (step === 0) return !!form.projectType;
    if (step === 1) return !!form.budget && !!form.timeline;
    if (step === 2) return form.vision.trim().length >= 20;
    if (step === 3) return !!form.name.trim() && /\S+@\S+\.\S+/.test(form.email);
    return false;
  };

  const buildNotificationText = (f: typeof form) =>
`━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
🚀 NEW PROJECT BRIEF — hafizahmedwaseem.dev
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
👤 Name:     ${f.name}
📧 Email:    ${f.email}
🏢 Company:  ${f.company || '—'}
📅 Received: ${new Date().toLocaleString()}
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
📦 Project Type: ${f.projectType}
💰 Budget:       ${f.budget}
⏱  Timeline:     ${f.timeline}
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
💡 THEIR VISION:

${f.vision}
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
↩  Reply to: ${f.email}`;

  const buildClientMailto = (f: typeof form) => {
    const subject = encodeURIComponent(`Your project brief — Ahmed Waseem`);
    const body = encodeURIComponent(
`Hi ${f.name},

Here's a copy of the brief you submitted on hafizahmedwaseem.dev.

━━━━━━━━━━━━━━━━━━━━━━━━
Project Type : ${f.projectType}
Budget       : ${f.budget}
Timeline     : ${f.timeline}${f.company ? `\nCompany      : ${f.company}` : ''}
━━━━━━━━━━━━━━━━━━━━━━━━
Your Vision:

${f.vision}
━━━━━━━━━━━━━━━━━━━━━━━━

Ahmed has been notified and will respond within 24 hours with a tailored proposal.

Questions in the meantime?
Email: hafizahmedwaseem@gmail.com
LinkedIn: https://linkedin.com/in/hafizahmedwaseem`
    );
    return `mailto:${f.email}?subject=${subject}&body=${body}`;
  };

  const handleSubmit = async () => {
    setSubmitting(true);
    const key = import.meta.env.VITE_WEB3FORMS_API_KEY;

    // Graceful fallback if API key not configured
    if (!key) {
      const subject = encodeURIComponent(`Project Brief: ${form.projectType} — ${form.name}`);
      const body = encodeURIComponent(
        `Name: ${form.name}\nEmail: ${form.email}\nCompany: ${form.company || 'N/A'}\n\nProject: ${form.projectType}\nBudget: ${form.budget}\nTimeline: ${form.timeline}\n\nVision:\n${form.vision}`
      );
      window.open(`mailto:hafizahmedwaseem@gmail.com?subject=${subject}&body=${body}`, '_blank');
      setSubmitting(false);
      setDone(true);
      return;
    }

    try {
      const fd = new FormData();
      fd.append('access_key', key);
      fd.append('subject', `🚀 New Project Brief: ${form.name} — ${form.projectType}`);
      fd.append('from_name', form.name);
      fd.append('email', form.email);
      fd.append('replyto', form.email);
      fd.append('message', buildNotificationText(form));

      const r = await fetch('https://api.web3forms.com/submit', { method: 'POST', body: fd });
      const d = await r.json();
      if (!d.success) throw new Error(d.message || 'Notification failed');

      setDone(true);
    } catch (err) {
      const msg = err instanceof Error ? err.message : 'Unknown error';
      console.error('Hire form error:', msg);
      // Fallback to mailto so the user is never left with just an error
      toast.error('Auto-send failed — opening your email client as backup.', { duration: 4000 });
      setTimeout(() => {
        const subject = encodeURIComponent(`Project Brief: ${form.projectType} — ${form.name}`);
        const body = encodeURIComponent(
          `Name: ${form.name}\nEmail: ${form.email}\nCompany: ${form.company || 'N/A'}\n\nProject: ${form.projectType}\nBudget: ${form.budget}\nTimeline: ${form.timeline}\n\nVision:\n${form.vision}`
        );
        window.open(`mailto:hafizahmedwaseem@gmail.com?subject=${subject}&body=${body}`, '_blank');
        setDone(true);
        setSubmitting(false);
      }, 1500);
      return;
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          key="hire-overlay"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[200] flex items-center justify-center p-4"
          style={{ background: 'rgba(0,0,0,0.75)', backdropFilter: 'blur(8px)' }}
          onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
        >
          <motion.div
            key="hire-card"
            initial={{ opacity: 0, y: 40, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 40, scale: 0.96 }}
            transition={{ type: 'spring', stiffness: 280, damping: 28 }}
            className="relative w-full max-w-2xl rounded-2xl border border-border/60 overflow-hidden"
            style={{ background: 'hsl(var(--background))', boxShadow: '0 0 80px rgba(59,130,246,0.15), 0 25px 60px rgba(0,0,0,0.5)' }}
          >
            {/* Top gradient strip */}
            <div className="h-1 w-full" style={{ background: 'linear-gradient(90deg,#3B82F6,#737AFC,#06B6D4)' }} />

            {/* Close */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 w-8 h-8 rounded-full border border-border/60 flex items-center justify-center text-muted-foreground hover:text-foreground hover:border-primary/50 transition-all z-10"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="p-8">
              {!done ? (
                <>
                  {/* Header */}
                  <div className="mb-6">
                    <p className="text-xs font-mono text-primary tracking-widest uppercase mb-1">Let's Build Together</p>
                    <h2 className="text-2xl md:text-3xl font-extrabold tracking-tight">
                      {step === 0 && "What are you building?"}
                      {step === 1 && "Budget & timeline"}
                      {step === 2 && "Tell me your vision"}
                      {step === 3 && "How do I reach you?"}
                    </h2>
                    <p className="text-sm text-muted-foreground mt-1">
                      {step === 0 && "Not just a developer for hire — a partner who helps you grow."}
                      {step === 1 && "Helps me propose the right engagement model for your goals."}
                      {step === 2 && "The more detail, the better I can understand your pain points."}
                      {step === 3 && "I'll review everything and respond with a tailored proposal within 24h."}
                    </p>
                  </div>

                  <StepIndicator step={step} />

                  <AnimatePresence mode="wait">
                    {/* Step 0 — Project type */}
                    {step === 0 && (
                      <motion.div key="s0" initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -30 }} transition={{ duration: 0.25 }}>
                        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                          {PROJECT_TYPES.map(({ icon: Icon, value, label, desc }) => (
                            <button
                              key={value}
                              onClick={() => setForm(f => ({ ...f, projectType: value }))}
                              className={`text-left p-4 rounded-xl border transition-all duration-200 hover:scale-[1.02] ${
                                form.projectType === value
                                  ? 'border-primary bg-primary/10 shadow-md shadow-primary/10'
                                  : 'border-border/60 hover:border-primary/50 hover:bg-primary/5'
                              }`}
                            >
                              <Icon className={`w-5 h-5 mb-2 ${form.projectType === value ? 'text-primary' : 'text-muted-foreground'}`} />
                              <div className="text-sm font-semibold leading-tight">{label}</div>
                              <div className="text-xs text-muted-foreground mt-0.5 leading-tight">{desc}</div>
                            </button>
                          ))}
                        </div>
                      </motion.div>
                    )}

                    {/* Step 1 — Budget + timeline */}
                    {step === 1 && (
                      <motion.div key="s1" initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -30 }} transition={{ duration: 0.25 }}>
                        <div className="space-y-6">
                          <div>
                            <label className="text-sm font-semibold block mb-3">💰 Budget range</label>
                            <div className="flex flex-wrap gap-2">
                              {BUDGETS.map(b => (
                                <button
                                  key={b}
                                  onClick={() => setForm(f => ({ ...f, budget: b }))}
                                  className={`px-4 py-2 rounded-full text-sm border transition-all duration-200 ${
                                    form.budget === b
                                      ? 'border-primary bg-primary text-primary-foreground'
                                      : 'border-border/60 hover:border-primary/60 text-muted-foreground hover:text-foreground'
                                  }`}
                                >
                                  {b}
                                </button>
                              ))}
                            </div>
                          </div>
                          <div>
                            <label className="text-sm font-semibold block mb-3">⏱ Preferred timeline</label>
                            <div className="flex flex-wrap gap-2">
                              {TIMELINES.map(t => (
                                <button
                                  key={t}
                                  onClick={() => setForm(f => ({ ...f, timeline: t }))}
                                  className={`px-4 py-2 rounded-full text-sm border transition-all duration-200 ${
                                    form.timeline === t
                                      ? 'border-primary bg-primary text-primary-foreground'
                                      : 'border-border/60 hover:border-primary/60 text-muted-foreground hover:text-foreground'
                                  }`}
                                >
                                  {t}
                                </button>
                              ))}
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    )}

                    {/* Step 2 — Vision */}
                    {step === 2 && (
                      <motion.div key="s2" initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -30 }} transition={{ duration: 0.25 }}>
                        <div className="space-y-4">
                          <textarea
                            className="w-full min-h-[180px] rounded-xl border border-border/60 bg-muted/40 px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:border-primary/60 focus:bg-background transition-all resize-none"
                            placeholder="Describe your product idea, the problem it solves, your target users, and what success looks like for you. The more context, the better my proposal will be..."
                            value={form.vision}
                            onChange={e => setForm(f => ({ ...f, vision: e.target.value }))}
                          />
                          <div className={`text-xs font-mono ${form.vision.length < 20 ? 'text-muted-foreground/50' : 'text-green-400'}`}>
                            {form.vision.length < 20
                              ? `${20 - form.vision.length} more characters to continue`
                              : `✓ Great detail — ${form.vision.length} characters`}
                          </div>
                        </div>
                      </motion.div>
                    )}

                    {/* Step 3 — Contact */}
                    {step === 3 && (
                      <motion.div key="s3" initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -30 }} transition={{ duration: 0.25 }}>
                        <div className="space-y-4">
                          <div className="grid sm:grid-cols-2 gap-4">
                            <div>
                              <label className="text-xs font-mono text-muted-foreground uppercase tracking-widest block mb-1.5">Your Name *</label>
                              <input
                                className="w-full rounded-xl border border-border/60 bg-muted/40 px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:border-primary/60 focus:bg-background transition-all"
                                placeholder="John Smith"
                                value={form.name}
                                onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
                              />
                            </div>
                            <div>
                              <label className="text-xs font-mono text-muted-foreground uppercase tracking-widest block mb-1.5">Company / Project</label>
                              <input
                                className="w-full rounded-xl border border-border/60 bg-muted/40 px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:border-primary/60 focus:bg-background transition-all"
                                placeholder="Acme Inc. (optional)"
                                value={form.company}
                                onChange={e => setForm(f => ({ ...f, company: e.target.value }))}
                              />
                            </div>
                          </div>
                          <div>
                            <label className="text-xs font-mono text-muted-foreground uppercase tracking-widest block mb-1.5">Email Address *</label>
                            <input
                              type="email"
                              className="w-full rounded-xl border border-border/60 bg-muted/40 px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:border-primary/60 focus:bg-background transition-all"
                              placeholder="you@company.com"
                              value={form.email}
                              onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
                            />
                          </div>
                          <p className="text-xs text-muted-foreground/60 leading-relaxed">
                            I'll review your project brief and respond with a personalised proposal within 24 hours. No generic templates — I'll speak directly to your vision.
                          </p>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {/* Navigation */}
                  <div className="flex items-center justify-between mt-8 pt-6 border-t border-border/40">
                    <Button
                      variant="ghost"
                      onClick={() => setStep(s => s - 1)}
                      disabled={step === 0}
                      className="gap-2"
                    >
                      <ArrowLeft className="w-4 h-4" />
                      Back
                    </Button>

                    {step < TOTAL_STEPS - 1 ? (
                      <Button
                        onClick={() => setStep(s => s + 1)}
                        disabled={!canAdvance()}
                        className="gap-2 font-semibold shadow-md shadow-primary/20"
                      >
                        Continue
                        <ArrowRight className="w-4 h-4" />
                      </Button>
                    ) : (
                      <Button
                        onClick={handleSubmit}
                        disabled={!canAdvance() || submitting}
                        className="gap-2 font-semibold shadow-md shadow-primary/20"
                      >
                        {submitting ? (
                          <><Loader2 className="w-4 h-4 animate-spin" /> Sending...</>
                        ) : (
                          <><Rocket className="w-4 h-4" /> Send My Brief</>
                        )}
                      </Button>
                    )}
                  </div>
                </>
              ) : (
                /* Success state */
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="py-6"
                >
                  <div className="flex flex-col items-center text-center mb-6">
                    <div className="w-16 h-16 rounded-full bg-green-500/10 border-2 border-green-500/40 flex items-center justify-center mb-4">
                      <CheckCircle2 className="w-8 h-8 text-green-400" />
                    </div>
                    <h3 className="text-2xl font-extrabold mb-1">Brief received! 🚀</h3>
                    <p className="text-muted-foreground text-sm max-w-xs">
                      Ahmed has been notified and will review your brief personally. Expect a tailored response within <span className="text-foreground font-semibold">24 hours</span>.
                    </p>
                  </div>

                  {/* Receipt card */}
                  <div className="rounded-xl border border-border/50 bg-muted/30 divide-y divide-border/40 text-sm mb-6">
                    {[
                      { label: 'Project', value: form.projectType },
                      { label: 'Budget', value: form.budget },
                      { label: 'Timeline', value: form.timeline },
                      { label: 'Reply to', value: form.email },
                    ].map(({ label, value }) => (
                      <div key={label} className="flex items-center justify-between px-4 py-2.5">
                        <span className="text-muted-foreground text-xs font-mono uppercase tracking-wider">{label}</span>
                        <span className="font-medium text-foreground text-xs">{value}</span>
                      </div>
                    ))}
                  </div>

                  {/* Steps */}
                  <div className="flex items-center justify-center gap-0 mb-6">
                    {[
                      { num: '✓', label: 'Brief sent', done: true },
                      { num: '2', label: 'Ahmed reviews', done: false },
                      { num: '3', label: 'Proposal sent', done: false },
                    ].map((s, i) => (
                      <div key={i} className="flex items-center">
                        <div className="flex flex-col items-center">
                          <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold ${s.done ? 'bg-primary text-primary-foreground' : 'border border-border text-muted-foreground'}`}>
                            {s.num}
                          </div>
                          <span className={`text-xs mt-1 font-mono ${s.done ? 'text-primary' : 'text-muted-foreground/60'}`}>{s.label}</span>
                        </div>
                        {i < 2 && <div className={`w-12 h-px mb-5 mx-1 ${s.done ? 'bg-primary/40' : 'bg-border'}`} />}
                      </div>
                    ))}
                  </div>

                  <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
                    <Button
                      variant="outline"
                      className="border-primary/40 hover:border-primary gap-2"
                      onClick={() => window.open(buildClientMailto(form), '_blank')}
                    >
                      📋 Send yourself a copy
                    </Button>
                    <Button onClick={onClose} variant="ghost">
                      Back to Portfolio
                    </Button>
                  </div>
                </motion.div>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
