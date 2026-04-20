import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Github, Linkedin, Mail, Download, Sparkles, Mic, Brain } from 'lucide-react';
import { Typewriter } from 'react-simple-typewriter';

const stats = [
  { num: '3+', label: 'Years Experience' },
  { num: '4', label: 'Companies' },
  { num: '15+', label: 'Projects Shipped' },
];

const badges = [
  { icon: Sparkles, label: 'MERN Specialist', color: 'from-cyan-500/20 to-cyan-600/10 border-cyan-500/30 text-cyan-400' },
  { icon: Brain, label: 'Full Stack Developer', color: 'from-blue-500/20 to-blue-600/10 border-blue-500/30 text-blue-400' },
  { icon: Mic, label: 'AI Engineer', color: 'from-purple-500/20 to-purple-600/10 border-purple-500/30 text-purple-400' },
];

export default function HeroSection() {
  return (
    <section className="flex items-center justify-center pt-16 min-h-screen relative overflow-hidden">
      <div className="container px-4 relative z-10">
        <div className="grid md:grid-cols-2 gap-10 items-center py-20 max-w-6xl mx-auto">

          {/* Left column */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            {/* Availability badge */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 }}
              className="inline-flex items-center gap-2 mb-6 px-3 py-1.5 rounded-full border text-xs font-mono"
              style={{
                background: 'rgba(16,185,129,0.08)',
                borderColor: 'rgba(16,185,129,0.3)',
                color: '#10B981',
              }}
            >
              <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
              Available for new opportunities
            </motion.div>

            <h1 className="text-4xl md:text-6xl font-extrabold mb-4 text-foreground leading-tight tracking-tight">
              Hi, I'm{' '}
              <span className="gradient-text">Ahmed Waseem</span>
            </h1>

            <h2 className="text-lg md:text-2xl mb-6 font-medium min-h-[2rem]">
              <span
                className="font-bold"
                style={{ background: 'linear-gradient(90deg,#3B82F6,#737AFC)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}
              >
                <Typewriter
                  words={[
                    'MERN Specialist',
                    'Full Stack Developer',
                    'AI-First Engineer',
                    'AI Agent Developer',
                    'Voice AI Engineer',
                    'MERN Stack Specialist',
                    'AWS Cloud Engineer',
                    'Django REST Expert',
                    'Web3 Developer',
                    'Your Next Tech Partner',
                  ]}
                  loop={0}
                  cursor
                  cursorStyle="|"
                  typeSpeed={60}
                  deleteSpeed={40}
                  delaySpeed={1500}
                />
              </span>
            </h2>

            <p className="text-base md:text-lg text-muted-foreground mb-6 max-w-lg leading-relaxed">
              I build scalable full-stack apps, AI agent pipelines, and voice-driven experiences. 3+ years shipping production systems across MERN, Django, AWS, and emerging AI stacks.
            </p>

            {/* AI/Voice badges */}
            <div className="flex flex-wrap gap-2 mb-8">
              {badges.map(({ icon: Icon, label, color }) => (
                <motion.span
                  key={label}
                  initial={{ opacity: 0, scale: 0.85 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.5 }}
                  className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full border text-xs font-semibold bg-gradient-to-r ${color}`}
                >
                  <Icon className="w-3 h-3" />
                  {label}
                </motion.span>
              ))}
            </div>

            <div className="flex flex-wrap gap-3 mb-10">
              <Button
                size="lg"
                className="font-semibold shadow-lg shadow-primary/30 hover:shadow-primary/50 transition-shadow"
                onClick={() => window.dispatchEvent(new Event('open-hire-modal'))}
              >
                💼 Hire Me
              </Button>
              <Button variant="outline" asChild size="lg" className="font-semibold border-primary/50 hover:border-primary hover:bg-primary/10 dark:border-primary/40 dark:text-foreground">
                <a href="#projects">View Projects</a>
              </Button>
              <Button
                variant="outline"
                asChild
                size="lg"
                className="font-semibold border-border hover:border-primary hover:bg-primary/10 dark:border-slate-500 dark:text-slate-200 dark:hover:border-primary dark:hover:text-primary"
              >
                <a href="#contact">
                  <Download className="w-4 h-4 mr-2" />
                  Get in Touch
                </a>
              </Button>
            </div>

            <div className="flex gap-3 mb-10">
              <a href="https://github.com/HafizAhmed223" target="_blank" rel="noopener noreferrer"
                className="w-9 h-9 rounded-full border border-border/60 flex items-center justify-center hover:border-primary hover:bg-primary/10 hover:text-primary transition-all duration-200">
                <Github className="h-4 w-4" />
              </a>
              <a href="https://linkedin.com/in/hafizahmedwaseem" target="_blank" rel="noopener noreferrer"
                className="w-9 h-9 rounded-full border border-border/60 flex items-center justify-center hover:border-primary hover:bg-primary/10 hover:text-primary transition-all duration-200">
                <Linkedin className="h-4 w-4" />
              </a>
              <a href="mailto:hafizahmedwaseem@gmail.com"
                className="w-9 h-9 rounded-full border border-border/60 flex items-center justify-center hover:border-primary hover:bg-primary/10 hover:text-primary transition-all duration-200">
                <Mail className="h-4 w-4" />
              </a>
            </div>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.8 }}
              className="flex gap-8 border-t border-border/50 pt-8"
            >
              {stats.map((s) => (
                <div key={s.label}>
                  <div className="text-2xl md:text-3xl font-extrabold gradient-text">{s.num}</div>
                  <div className="text-xs text-muted-foreground font-mono tracking-wide uppercase mt-0.5">{s.label}</div>
                </div>
              ))}
            </motion.div>
          </motion.div>

          {/* Right column — visual card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="hidden md:flex flex-col gap-4"
          >
            {/* Profile image */}
            <div className="relative">
              <div className="absolute -inset-1 rounded-2xl blur-lg opacity-60"
                style={{ background: 'linear-gradient(135deg, #3B82F6, #737AFC, #06B6D4)' }} />
              <img
                src="https://images.unsplash.com/photo-1607705703571-c5a8695f18f6?q=80&w=2070&auto=format&fit=crop"
                alt="Ahmed Waseem"
                className="relative rounded-2xl object-cover w-full aspect-square"
              />
              {/* Floating info chips */}
              <motion.div
                animate={{ y: [0, -8, 0] }}
                transition={{ repeat: Infinity, duration: 3, ease: 'easeInOut' }}
                className="absolute -bottom-4 -left-4 glass-card rounded-xl px-4 py-2.5 border border-primary/30 shadow-xl"
              >
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                  <span className="text-xs font-mono text-foreground">Open to Work</span>
                </div>
              </motion.div>
              <motion.div
                animate={{ y: [0, 8, 0] }}
                transition={{ repeat: Infinity, duration: 3.5, ease: 'easeInOut', delay: 0.5 }}
                className="absolute -top-4 -right-4 glass-card rounded-xl px-4 py-2.5 border border-purple-500/30 shadow-xl"
              >
                <div className="flex items-center gap-2">
                  <Brain className="w-3.5 h-3.5 text-purple-400" />
                  <span className="text-xs font-mono text-foreground">AI Agent Dev</span>
                </div>
              </motion.div>
            </div>

            {/* Quick facts */}
            <div className="grid grid-cols-2 gap-3">
              {[
                { label: 'Location', value: 'Lahore, Pakistan' },
                { label: 'Available', value: 'Immediately' },
                { label: 'Preferred', value: 'Full-time / Freelance' },
                { label: 'Timezone', value: 'PKT (UTC+5)' },
              ].map((f) => (
                <div key={f.label} className="glass-card rounded-xl px-3 py-2.5 border border-border/40">
                  <div className="text-xs text-muted-foreground font-mono">{f.label}</div>
                  <div className="text-sm font-semibold text-foreground">{f.value}</div>
                </div>
              ))}
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
