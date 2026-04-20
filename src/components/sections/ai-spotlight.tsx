import { motion } from 'framer-motion';
import { Brain, Mic, Zap, GitBranch, MessageSquare, Activity } from 'lucide-react';

const features = [
  {
    icon: Mic,
    title: 'Voice AI Pipelines',
    desc: 'Inbound & outbound voice agents on Stammer.ai — 24/7 call handling, real-time transcription, call summaries, and automatic appointment booking.',
    color: 'text-purple-400',
    bg: 'bg-purple-500/10 border-purple-500/20',
  },
  {
    icon: Brain,
    title: 'LLM Agent Workflows',
    desc: 'Multi-model LLM pipelines (GPT-4o, Claude 3.7, Grok) powering adaptive chat and voice agents that handle support, sales outreach, and lead qualification.',
    color: 'text-blue-400',
    bg: 'bg-blue-500/10 border-blue-500/20',
  },
  {
    icon: GitBranch,
    title: 'White-label Multi-tenancy',
    desc: 'Architected multi-tenant SaaS infrastructure supporting 1,300+ agency subaccounts with custom domains, branded dashboards, and isolated billing.',
    color: 'text-cyan-400',
    bg: 'bg-cyan-500/10 border-cyan-500/20',
  },
  {
    icon: MessageSquare,
    title: 'Chat AI Agents',
    desc: 'Multi-channel chat agents deployed across websites, WhatsApp, SMS, and CRM platforms — handling support, sales, and lead gen in 160+ languages.',
    color: 'text-green-400',
    bg: 'bg-green-500/10 border-green-500/20',
  },
  {
    icon: Activity,
    title: 'Real-Time Monitoring',
    desc: 'Integrated Sentry and Silk profiling for AI endpoint performance tracking and proactive issue resolution.',
    color: 'text-amber-400',
    bg: 'bg-amber-500/10 border-amber-500/20',
  },
  {
    icon: Zap,
    title: 'Fast Iteration',
    desc: 'From concept to UAT-ready AI feature in 70 days — using CI/CD, Django REST, and React for rapid deployment cycles.',
    color: 'text-rose-400',
    bg: 'bg-rose-500/10 border-rose-500/20',
  },
];

export default function AISpotlight() {
  return (
    <section id="ai" className="py-20 relative overflow-hidden">
      {/* Section glow */}
      <div className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse at 50% 50%, rgba(115,122,252,0.06) 0%, transparent 70%)' }} />

      <div className="container max-w-6xl mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <div className="flex items-center justify-center gap-3 mb-3">
            <span className="w-8 h-px bg-purple-500" />
            <span className="text-purple-400 text-xs font-mono tracking-widest uppercase">Specialized In</span>
            <span className="w-8 h-px bg-purple-500" />
          </div>
          <h2 className="text-3xl md:text-5xl font-bold mb-4">
            AI & Voice Agent{' '}
            <span
              style={{ background: 'linear-gradient(90deg, #737AFC, #06B6D4)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}
            >
              Engineering
            </span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-base md:text-lg">
            Beyond traditional full-stack — I design and deploy intelligent agent systems, voice pipelines, and LLM-powered applications built for the agentic AI era.
          </p>
        </motion.div>

        {/* Featured project callout */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="rounded-2xl border border-purple-500/30 glass-card p-6 md:p-8 mb-12 relative overflow-hidden"
        >
          <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-purple-500/60 to-transparent" />
          <div className="absolute inset-0 opacity-5"
            style={{ background: 'radial-gradient(ellipse at 30% 50%, #737AFC, transparent 60%)' }} />

          <div className="relative flex flex-col md:flex-row gap-6 items-start">
            <div className="shrink-0 w-14 h-14 rounded-2xl bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center shadow-lg shadow-purple-500/30">
              <Mic className="w-7 h-7 text-white" />
            </div>
            <div className="flex-1">
              <div className="flex flex-wrap items-center gap-3 mb-2">
                <h3 className="text-xl font-bold">Stammer.ai — White-Label AI Agent SaaS</h3>
                <span className="text-xs font-mono px-2 py-0.5 rounded bg-purple-500/15 text-purple-400 border border-purple-500/30">
                  Featured Project
                </span>
                <span className="text-xs font-mono px-2 py-0.5 rounded bg-green-500/15 text-green-400 border border-green-500/30">
                  60,000+ Active Users
                </span>
                <span className="text-xs font-mono px-2 py-0.5 rounded bg-blue-500/15 text-blue-400 border border-blue-500/30">
                  1,300+ Agencies
                </span>
              </div>
              <p className="text-muted-foreground text-sm leading-relaxed mb-4">
                Stammer.ai is a bootstrapped, fully self-funded white-label SaaS platform that enables 1,300+ agencies to sell branded Voice &amp; Chat AI agents — inbound/outbound calls, lead generation, appointment booking, and multi-channel support — under their own domain with zero revenue sharing. Serving 60,000+ active users across agency subaccounts globally. I led the full-stack platform revamp: migrating a legacy Django monolith to a decoupled React SPA + DRF architecture, building AI voice agent pipelines with real-time transcription and LLM-driven adaptive responses, integrating Sentry for production monitoring, and optimizing DB performance with Silk profiling to achieve UAT in 70 days.
              </p>
              <div className="flex flex-wrap gap-2">
                {['React.js', 'Django REST', 'Voice AI Agents', 'Chat AI Agents', 'White-label SaaS', 'LLM Pipelines', 'Sentry', 'Silk Profiling', 'Multi-tenant Architecture'].map((t) => (
                  <span key={t} className="text-xs font-mono px-2 py-0.5 rounded bg-primary/10 text-primary/80 border border-primary/20">
                    {t}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </motion.div>

        {/* Feature grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {features.map((f, i) => {
            const Icon = f.icon;
            return (
              <motion.div
                key={f.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.07 }}
                className={`rounded-xl border p-5 glass-card hover:scale-[1.02] transition-transform duration-200 ${f.bg}`}
              >
                <div className={`w-9 h-9 rounded-lg flex items-center justify-center mb-3 ${f.bg} border`}>
                  <Icon className={`w-4.5 h-4.5 ${f.color}`} />
                </div>
                <h4 className="font-semibold mb-1.5">{f.title}</h4>
                <p className="text-sm text-muted-foreground leading-relaxed">{f.desc}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
