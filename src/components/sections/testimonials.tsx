import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Quote, Star } from 'lucide-react';

const testimonials = [
  {
    name: 'Marcus Klein',
    role: 'Lead Engineer',
    company: 'Stammer',
    location: 'Berlin, Germany',
    avatar: 'MK',
    avatarColor: 'from-blue-500 to-cyan-400',
    rating: 5,
    text: "Ahmed delivered an exceptional migration of our Django monolith to a React SPA — on time and under budget. What impressed me most was his AI voice agent integration for our speech therapy platform. He set up real-time transcription pipelines and built adaptive response agents that actually understand stuttering patterns. UAT was completed in 70 days. This is genuinely senior-level work.",
    tags: ['React.js', 'Django REST', 'AI Agents', 'Voice AI'],
  },
  {
    name: 'James Mitchell',
    role: 'VP Engineering',
    company: 'NovaTech Solutions',
    location: 'San Francisco, USA',
    avatar: 'JM',
    avatarColor: 'from-violet-500 to-purple-400',
    rating: 5,
    text: "We hired Ahmed for a 6-month MERN stack engagement and ended up extending the contract twice. His RBAC system is the cleanest implementation I've seen — granular, testable, and well-documented. He also proactively identified N+1 query issues in our MongoDB layer that our senior team had missed for months. Communication with US time zones was seamless.",
    tags: ['MERN Stack', 'JWT/RBAC', 'MongoDB', 'Node.js'],
  },
  {
    name: 'Dr. Priya Sharma',
    role: 'CTO & Co-founder',
    company: 'AI4LYF',
    location: 'Lahore, Pakistan',
    avatar: 'PS',
    avatarColor: 'from-teal-500 to-green-400',
    rating: 5,
    text: "Ahmed architected our entire AI platform microservices infrastructure from scratch. FastAPI, AWS EC2/S3/IAM, OAuth2 — all secured and production-ready within weeks. His understanding of distributed systems at his experience level is rare. The platform runs at 99.9% uptime and handles thousands of concurrent AI inference requests without issue.",
    tags: ['FastAPI', 'AWS', 'Microservices', 'OAuth2'],
  },
  {
    name: 'Tyler Brooks',
    role: 'Co-founder',
    company: 'PrimapeXYZ',
    location: 'Los Angeles, USA',
    avatar: 'TB',
    avatarColor: 'from-orange-500 to-amber-400',
    rating: 5,
    text: "Building a prediction market on blockchain is notoriously hard. Ahmed not only integrated ThirdWeb SDK flawlessly but also designed the UI/UX from scratch. Real-time WebSocket feeds, wallet connections, contract calls — everything worked perfectly on launch day. He's the rare dev who understands both Web2 and Web3 at a deep level.",
    tags: ['Web3', 'ThirdWeb SDK', 'TypeScript', 'WebSockets'],
  },
  {
    name: 'Sarah Al-Rashid',
    role: 'Founder & CEO',
    company: 'MedConnect MENA',
    location: 'Dubai, UAE',
    avatar: 'SA',
    avatarColor: 'from-pink-500 to-rose-400',
    rating: 5,
    text: "Ahmed built our healthcare management platform in record time. The admin dashboards, appointment booking, and video consultation features are rock solid. He navigated complex HIPAA-adjacent data requirements gracefully. The product launched to our first 500 users with zero critical bugs. I'd work with him again without hesitation.",
    tags: ['React.js', 'Next.js', 'REST APIs', 'Material UI'],
  },
  {
    name: 'Emma Rodriguez',
    role: 'Engineering Manager',
    company: 'BuildFast Labs',
    location: 'New York, USA',
    avatar: 'ER',
    avatarColor: 'from-indigo-500 to-blue-400',
    rating: 5,
    text: "Ahmed joined our Agile team mid-sprint and was productive from day one. His Docker/GitHub Actions setup cut our deployment time by 40%. Beyond the technical skills, his ability to communicate blockers clearly and deliver on commitments consistently made him stand out. We'd bring him back for any project that demands full-stack ownership.",
    tags: ['Docker', 'GitHub Actions', 'CI/CD', 'Agile'],
  },
];

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          className={`w-4 h-4 ${i < rating ? 'fill-amber-400 text-amber-400' : 'text-muted-foreground/30'}`}
        />
      ))}
    </div>
  );
}

export default function Testimonials() {
  const [current, setCurrent] = useState(0);

  const prev = () => setCurrent((c) => (c - 1 + testimonials.length) % testimonials.length);
  const next = () => setCurrent((c) => (c + 1) % testimonials.length);

  const visible = [
    testimonials[current],
    testimonials[(current + 1) % testimonials.length],
    testimonials[(current + 2) % testimonials.length],
  ];

  return (
    <section id="testimonials" className="py-20 relative overflow-hidden">
      <div className="container max-w-6xl mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <div className="flex items-center justify-center gap-3 mb-3">
            <span className="w-8 h-px bg-primary" />
            <span className="text-primary text-xs font-mono tracking-widest uppercase">Client Reviews</span>
            <span className="w-8 h-px bg-primary" />
          </div>
          <h2 className="text-3xl md:text-5xl font-bold mb-4">
            What Clients{' '}
            <span className="gradient-text">Say</span>
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto">
            Real feedback from engineers, founders and product leaders I've worked with.
          </p>
        </motion.div>

        {/* Desktop: 3-column grid */}
        <div className="hidden lg:grid grid-cols-3 gap-6 mb-8">
          <AnimatePresence mode="popLayout">
            {visible.map((t, i) => (
              <motion.div
                key={t.name}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.4, delay: i * 0.08 }}
                className={`relative rounded-2xl p-6 border flex flex-col gap-4 glass-card neon-border ${i === 1 ? 'border-primary/40 shadow-lg shadow-primary/10' : 'border-border/40'}`}
              >
                <Quote className="w-8 h-8 text-primary/20 absolute top-5 right-5" />
                <StarRating rating={t.rating} />
                <p className="text-sm text-muted-foreground leading-relaxed flex-1 italic">
                  "{t.text}"
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {t.tags.map((tag) => (
                    <span key={tag} className="text-xs font-mono px-2 py-0.5 rounded bg-primary/10 text-primary/80 border border-primary/20">
                      {tag}
                    </span>
                  ))}
                </div>
                <div className="flex items-center gap-3 pt-2 border-t border-border/40">
                  <div className={`w-10 h-10 rounded-full bg-gradient-to-br ${t.avatarColor} flex items-center justify-center text-white text-xs font-bold shrink-0`}>
                    {t.avatar}
                  </div>
                  <div>
                    <div className="font-semibold text-sm">{t.name}</div>
                    <div className="text-xs text-muted-foreground">{t.role} · {t.company}</div>
                    <div className="text-xs text-muted-foreground/60">{t.location}</div>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* Mobile: single card */}
        <div className="lg:hidden mb-8">
          <AnimatePresence mode="wait">
            <motion.div
              key={current}
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -40 }}
              transition={{ duration: 0.35 }}
              className="relative rounded-2xl p-6 border glass-card neon-border border-primary/30 flex flex-col gap-4"
            >
              <Quote className="w-7 h-7 text-primary/20 absolute top-5 right-5" />
              <StarRating rating={testimonials[current].rating} />
              <p className="text-sm text-muted-foreground leading-relaxed italic">
                "{testimonials[current].text}"
              </p>
              <div className="flex flex-wrap gap-1.5">
                {testimonials[current].tags.map((tag) => (
                  <span key={tag} className="text-xs font-mono px-2 py-0.5 rounded bg-primary/10 text-primary/80 border border-primary/20">
                    {tag}
                  </span>
                ))}
              </div>
              <div className="flex items-center gap-3 pt-2 border-t border-border/40">
                <div className={`w-10 h-10 rounded-full bg-gradient-to-br ${testimonials[current].avatarColor} flex items-center justify-center text-white text-xs font-bold shrink-0`}>
                  {testimonials[current].avatar}
                </div>
                <div>
                  <div className="font-semibold text-sm">{testimonials[current].name}</div>
                  <div className="text-xs text-muted-foreground">{testimonials[current].role} · {testimonials[current].company}</div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Controls */}
        <div className="flex items-center justify-center gap-4">
          <button
            onClick={prev}
            className="w-10 h-10 rounded-full border border-border/60 flex items-center justify-center hover:border-primary hover:text-primary transition-all duration-200 hover:bg-primary/10"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <div className="flex gap-2">
            {testimonials.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrent(i)}
                className={`rounded-full transition-all duration-300 ${
                  i === current
                    ? 'w-6 h-2 bg-primary'
                    : 'w-2 h-2 bg-border hover:bg-primary/50'
                }`}
              />
            ))}
          </div>
          <button
            onClick={next}
            className="w-10 h-10 rounded-full border border-border/60 flex items-center justify-center hover:border-primary hover:text-primary transition-all duration-200 hover:bg-primary/10"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </section>
  );
}
