import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Terminal, Brain, TestTube2, Zap, Shield,
  ChevronDown, Code2, Layers,
} from 'lucide-react';

const steps = [
  {
    id: 'cursor',
    icon: Terminal,
    color: 'from-blue-500 to-cyan-400',
    glow: 'rgba(59,130,246,0.3)',
    label: 'Cursor + .cursorrules',
    tagline: 'Context is everything — structured rules, not freeform chat.',
    detail: [
      {
        heading: 'Every project starts with a .cursorrules file',
        body: `I define project context, stack, conventions, and hard rules upfront. Cursor reads this before every prompt — no repeated explanations, no wrong framework assumptions.`,
        code: `# .cursorrules
## Stack
- Frontend: React 18 + TypeScript + Tailwind
- Backend: Django REST / FastAPI
- DB: PostgreSQL + MongoDB
- Deploy: AWS EC2 + GitHub Actions

## Style Rules
- Functional components, named exports only
- No \`any\` in TypeScript — ever
- Error handling: typed try/catch, never silent fails
- Prefer composition over inheritance

## Anti-patterns (reject if suggested)
- console.log in production code
- Unused imports / dead variables
- Direct DOM manipulation in React`,
      },
      {
        heading: 'The 3-Part Prompt Pattern',
        body: `Instead of "fix this bug," I write CONTEXT → PROBLEM → EXPECTED. This cuts back-and-forth iterations by ~60% because the AI has everything it needs on the first pass.`,
        code: `// CONTEXT: ProductList renders 500+ items, parent re-renders on every cart update
// PROBLEM: Full list re-renders even when cart changes unrelated items
// EXPECTED: Memoize ProductList and the sort fn, preserve existing prop types

// → Cursor now generates a targeted solution, not a generic one`,
      },
      {
        heading: 'Token efficiency tricks',
        body: `I use @file references instead of pasting code. I ask for diffs, not whole files. For debugging, I describe the error first, then share the stack trace, then ask for the fix — not all at once.`,
        code: `// ✗ Expensive: "Here is my entire 400-line component, please fix the bug"
// ✓ Efficient:  "Line 87 throws TypeError: Cannot read 'map' of undefined
//               when \`data\` is null on first render. Fix with a null guard."`,
      },
    ],
    tags: ['Cursor', '.cursorrules', 'Context Engineering', 'Token Efficiency'],
  },
  {
    id: 'prompts',
    icon: Brain,
    color: 'from-purple-500 to-violet-400',
    glow: 'rgba(139,92,246,0.3)',
    label: 'Prompt Engineering',
    tagline: 'Structure beats verbosity — every time.',
    detail: [
      {
        heading: 'XML-structured prompts for complex tasks',
        body: `For agentic tasks or complex code generation I wrap prompts in XML tags. Claude and GPT-4o parse these deterministically, giving you consistent outputs at scale.`,
        code: `<task>Refactor the UserAuth service to support OAuth2 + JWT dual-mode auth</task>
<context>
  - Existing: session-based auth with Django's built-in User model
  - Target: stateless JWT for API + OAuth2 (Google, GitHub) for web
  - Constraint: must not break existing session-based admin panel
</context>
<output_format>
  - Produce only the updated auth/backends.py and auth/views.py
  - Add inline comments for non-obvious decisions
  - List any migration steps needed
</output_format>`,
      },
      {
        heading: 'Few-shot examples for consistent style',
        body: `When I want AI to match a codebase's existing style — naming conventions, error pattern, logging format — I give 2–3 examples before the instruction. Output quality jumps dramatically.`,
        code: `// Examples of how we handle errors in this codebase:
// Example 1: async API call
// Example 2: database transaction
// Example 3: external service call
// Now write the Stripe webhook handler following the same pattern.`,
      },
      {
        heading: 'System prompts for persistent AI context',
        body: `For long-running projects I maintain a "project brain" — a markdown doc with architecture decisions, non-obvious constraints, and open questions. I paste the relevant section at the start of every session.`,
        code: `## Project Brain — Stammer.ai migration
Architecture: Multi-tenant SaaS, each agency = isolated schema
Auth: JWT (API) + Session (admin), both must coexist
Performance: Silk profiling shows N+1 on AgentConfig.related_set
Decision log: Moved to DRF ViewSets over APIViews for consistency
Open: Voice agent WebSocket latency >800ms under load — investigating`,
      },
    ],
    tags: ['Prompt Engineering', 'XML Tags', 'Few-shot', 'System Prompts'],
  },
  {
    id: 'testing',
    icon: TestTube2,
    color: 'from-green-500 to-emerald-400',
    glow: 'rgba(16,185,129,0.3)',
    label: 'AI-Assisted Testing',
    tagline: 'Write the test spec first. Let AI fill the cases.',
    detail: [
      {
        heading: 'Test-first, AI-generated cases',
        body: `I write the test structure and edge case descriptions first, then use AI to implement the assertions. This ensures I define what "correct" means before any code is written — the AI can't drift.`,
        code: `// I write this spec:
describe('UserAuthService', () => {
  // TC-1: valid credentials → returns JWT + refresh token
  // TC-2: wrong password → throws UnauthorizedError (not generic Error)
  // TC-3: expired token → throws TokenExpiredError with expiry metadata
  // TC-4: refresh with revoked token → throws RevokedTokenError
  // TC-5: concurrent login limit (>3 sessions) → oldest session invalidated
});
// Then ask Cursor: "Implement all test cases following the project's mock pattern"`,
      },
      {
        heading: 'Performance regression tests',
        body: `Every optimisation I ship includes a benchmark test. If a future change makes the query take 20% longer, CI catches it before prod does.`,
        code: `// Django + pytest-benchmark
def test_agent_config_query_performance(benchmark, db):
    # Silk profiling revealed N+1 here — fixed with select_related
    result = benchmark(lambda: AgentConfig.objects.select_related(
        'agency', 'voice_settings'
    ).filter(active=True)[:50])

    assert benchmark.stats.mean < 0.05  # must complete in <50ms
    assert len(result) == 50`,
      },
      {
        heading: 'AI-generated mocks for external APIs',
        body: `For voice AI endpoints, payment gateways, and LLM APIs I ask AI to generate realistic mock responses based on the official API schema. This lets me write deterministic tests without hitting paid APIs in CI.`,
        code: `// Ask: "Generate a realistic mock for ElevenLabs TTS response
//        including audio_base64, duration_seconds, model_used fields"
// AI generates → I use in tests → zero API costs in CI`,
      },
    ],
    tags: ['Jest', 'Pytest', 'TDD', 'Benchmarking', 'Mocking'],
  },
  {
    id: 'performance',
    icon: Zap,
    color: 'from-amber-500 to-orange-400',
    glow: 'rgba(245,158,11,0.3)',
    label: 'Performance Optimization',
    tagline: 'Measure before you optimize. Silk, Lighthouse, React Profiler.',
    detail: [
      {
        heading: 'Profile first, optimize second',
        body: `I never guess at performance bottlenecks. On Django projects I use Silk for query profiling — it caught a 47-query N+1 on Stammer.ai's agency dashboard that was invisible in code review. On React I run Lighthouse and React DevTools Profiler before touching anything.`,
        code: `# Silk in Django settings — catches N+1 before prod
SILKY_PYTHON_PROFILER = True
SILKY_MAX_RECORDED_REQUESTS = 100

# A single page was making 47 DB queries.
# select_related + prefetch_related reduced it to 3.
AgentConfig.objects.select_related('agency__plan')
                   .prefetch_related('voice_settings', 'integrations')
                   .filter(active=True)`,
      },
      {
        heading: 'React optimization hierarchy',
        body: `I follow a specific order: 1) Fix unnecessary re-renders with memo/useMemo, 2) Lazy-load heavy components, 3) Virtualise long lists, 4) Code-split routes. Each step is measured before moving to the next.`,
        code: `// Step 1: Stop re-renders
const AgentCard = memo(({ agent }: Props) => { ... });

// Step 2: Lazy-load the voice config panel (heavy audio deps)
const VoicePanel = lazy(() => import('./VoicePanel'));

// Step 3: Virtualise agency list (1000+ rows)
<VirtualList height={600} itemCount={agents.length}
  itemSize={72} renderItem={({ index }) => <AgentCard agent={agents[index]} />}
/>`,
      },
      {
        heading: 'Bundle analysis as a CI gate',
        body: `I run bundle-analyzer on every significant PR. If a dependency adds >50KB gzipped it needs justification. This discipline has kept Stammer.ai's main bundle under 400KB gzipped across a year of feature additions.`,
        code: `// vite.config.ts
import { visualizer } from 'rollup-plugin-visualizer';

plugins: [
  visualizer({ filename: 'dist/stats.html', gzipSize: true })
]
// CI check: fail if gzip > 400KB
// "Did you add a new charting lib? Find a lighter one."`,
      },
    ],
    tags: ['Silk', 'React Profiler', 'Lighthouse', 'Bundle Analysis', 'N+1'],
  },
  {
    id: 'architecture',
    icon: Layers,
    color: 'from-cyan-500 to-sky-400',
    glow: 'rgba(6,182,212,0.3)',
    label: 'Project Architecture',
    tagline: 'ADRs, structured docs, and decisions that survive team changes.',
    detail: [
      {
        heading: 'Architecture Decision Records (ADRs)',
        body: `Every non-obvious technical decision gets a lightweight ADR in the repo. When a new dev joins, or I return to a project after 3 months, I know exactly why things are the way they are. This eliminates "why did we do it this way?" paralysis.`,
        code: `# ADR-007: Multi-schema vs row-level multi-tenancy
## Status: Accepted
## Context
Stammer.ai serves 1,300+ agencies. Agencies must never see each other's data.
## Decision
Use PostgreSQL schemas (one per agency) over row-level tenant_id filtering.
## Consequences
+ Stronger isolation, simpler queries (no WHERE tenant_id = X everywhere)
- Migrations must run across all schemas — use django-tenants management cmd
- Schema creation adds ~200ms to agency signup flow (acceptable)`,
      },
      {
        heading: 'CLAUDE.md / project memory files',
        body: `Every project I work in gets a CLAUDE.md (or equivalent project brain file) that describes architecture, live constraints, gotchas, and open questions. This is the first file I point my AI tools to at the start of every session.`,
        code: `# CLAUDE.md — Stammer.ai
## Architecture
Multi-tenant Django app, schema-per-agency via django-tenants
DRF ViewSets, SimpleJWT, Celery for async voice processing

## Non-obvious constraints
- Agency subdomain routing happens at nginx level, not Django middleware
- Voice agent WebSocket must reconnect within 2s or ElevenLabs session dies
- Stripe webhooks MUST process idempotently (duplicate events are common)

## Current tech debt
[ ] Voice latency spike >800ms under concurrent load — needs profiling
[ ] Bulk agency migrations timeout at >500 schemas — needs batching`,
      },
    ],
    tags: ['ADRs', 'CLAUDE.md', 'Django Tenants', 'Documentation', 'Multi-tenancy'],
  },
  {
    id: 'security',
    icon: Shield,
    color: 'from-rose-500 to-pink-400',
    glow: 'rgba(244,63,94,0.3)',
    label: 'Security-First Coding',
    tagline: 'I find vulnerabilities before attackers do.',
    detail: [
      {
        heading: 'JWT implementation pitfalls I test for',
        body: `Most JWT bugs aren't in the library — they're in how developers use it. I always test for algorithm confusion (HS256/RS256 swap), token-without-expiry, and missing audience/issuer validation before shipping any auth layer.`,
        code: `// ✗ Vulnerable: accepts any algorithm the token claims
jwt.verify(token, secret);

// ✓ Secure: pin the algorithm, validate claims
jwt.verify(token, secret, {
  algorithms: ['HS256'],      // never allow 'none' or RS256 confusion
  issuer: 'api.stammer.ai',
  audience: 'stammer-client',
  clockTolerance: 30           // seconds, prevent replay on clock skew
});`,
      },
      {
        heading: 'API security checklist I run on every endpoint',
        body: `Before shipping any API endpoint I run through: auth required, rate-limited, input validated against schema, SQL-injection safe (ORM only, no raw queries with user input), and response doesn't leak internal field names.`,
        code: `# My pre-ship API checklist (pytest marks)
@pytest.mark.security
def test_endpoint_requires_auth():       ...
def test_endpoint_rate_limited():        ...
def test_input_rejects_sql_injection():  ...
def test_input_rejects_xss_payload():    ...
def test_response_excludes_pii_fields(): ...
def test_idor_different_tenant_blocked():...  # critical for multi-tenant`,
      },
    ],
    tags: ['JWT Security', 'OAuth2', 'API Hardening', 'IDOR', 'Rate Limiting'],
  },
];

export default function Workflow() {
  const [active, setActive] = useState<string | null>(null);
  const [activeDetail, setActiveDetail] = useState(0);

  const activeStep = steps.find(s => s.id === active);

  return (
    <section id="workflow" className="py-20 relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse at 50% 0%, rgba(59,130,246,0.04) 0%, transparent 60%)' }} />

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
            <span className="text-primary text-xs font-mono tracking-widest uppercase">How I Build</span>
            <span className="w-8 h-px bg-primary" />
          </div>
          <h2 className="text-3xl md:text-5xl font-bold mb-4">
            AI-First{' '}
            <span className="gradient-text">Developer Workflow</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Not just using AI tools — building systems around them. Click any card to explore the actual practices, patterns, and code I use daily.
          </p>
        </motion.div>

        {/* Step cards */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-8">
          {steps.map((step, i) => {
            const Icon = step.icon;
            const isActive = active === step.id;
            return (
              <motion.button
                key={step.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.07 }}
                onClick={() => {
                  setActive(isActive ? null : step.id);
                  setActiveDetail(0);
                }}
                className={`text-left p-5 rounded-2xl border transition-all duration-300 group ${
                  isActive
                    ? 'border-primary/60 bg-primary/10 shadow-lg'
                    : 'border-border/50 hover:border-primary/40 hover:bg-primary/5 glass-card'
                }`}
                style={isActive ? { boxShadow: `0 0 30px ${step.glow}` } : {}}
              >
                <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${step.color} flex items-center justify-center mb-3 shadow-md`}>
                  <Icon className="w-5 h-5 text-white" />
                </div>
                <div className="font-semibold text-sm mb-1">{step.label}</div>
                <div className="text-xs text-muted-foreground leading-relaxed">{step.tagline}</div>
                <div className="flex items-center gap-1 mt-3 text-xs text-primary/70 font-mono">
                  <span>{isActive ? 'Collapse' : 'Explore'}</span>
                  <ChevronDown className={`w-3 h-3 transition-transform duration-300 ${isActive ? 'rotate-180' : ''}`} />
                </div>
              </motion.button>
            );
          })}
        </div>

        {/* Expanded detail panel */}
        <AnimatePresence mode="wait">
          {activeStep && (
            <motion.div
              key={active}
              initial={{ opacity: 0, y: -16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.3 }}
              className="rounded-2xl border border-primary/30 overflow-hidden glass-card"
            >
              {/* Panel header */}
              <div className="flex items-center gap-3 px-6 py-4 border-b border-border/40"
                style={{ background: `linear-gradient(135deg, ${activeStep.glow} 0%, transparent 100%)` }}>
                <div className={`w-9 h-9 rounded-xl bg-gradient-to-br ${activeStep.color} flex items-center justify-center shrink-0`}>
                  <activeStep.icon className="w-4.5 h-4.5 text-white" />
                </div>
                <div>
                  <div className="font-bold">{activeStep.label}</div>
                  <div className="flex flex-wrap gap-1 mt-0.5">
                    {activeStep.tags.map(t => (
                      <span key={t} className="text-xs font-mono px-1.5 py-0.5 rounded bg-primary/10 text-primary/80 border border-primary/20">{t}</span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Sub-step tabs */}
              <div className="flex gap-1 px-6 pt-4 overflow-x-auto">
                {activeStep.detail.map((d, i) => (
                  <button
                    key={i}
                    onClick={() => setActiveDetail(i)}
                    className={`shrink-0 text-xs font-semibold px-3 py-1.5 rounded-lg transition-all ${
                      activeDetail === i
                        ? 'bg-primary text-primary-foreground'
                        : 'text-muted-foreground hover:text-foreground hover:bg-muted'
                    }`}
                  >
                    {d.heading.length > 36 ? d.heading.slice(0, 34) + '…' : d.heading}
                  </button>
                ))}
              </div>

              {/* Detail content */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeDetail}
                  initial={{ opacity: 0, x: 10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -10 }}
                  transition={{ duration: 0.2 }}
                  className="p-6 grid md:grid-cols-2 gap-6"
                >
                  <div>
                    <h4 className="font-bold text-base mb-2">{activeStep.detail[activeDetail].heading}</h4>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {activeStep.detail[activeDetail].body}
                    </p>
                  </div>
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <Code2 className="w-3.5 h-3.5 text-primary" />
                      <span className="text-xs font-mono text-primary">Example</span>
                    </div>
                    <pre
                      className="text-xs font-mono leading-relaxed p-4 rounded-xl overflow-x-auto"
                      style={{
                        background: 'rgba(0,0,0,0.4)',
                        border: '1px solid rgba(59,130,246,0.15)',
                        color: '#94a3b8',
                        whiteSpace: 'pre-wrap',
                        wordBreak: 'break-word',
                      }}
                    >
                      <code>{activeStep.detail[activeDetail].code}</code>
                    </pre>
                  </div>
                </motion.div>
              </AnimatePresence>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Bottom tools row */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-10 flex flex-wrap items-center justify-center gap-3"
        >
          {['Cursor', 'Claude 3.7', 'GPT-4o', 'GitHub Copilot', 'Jest', 'Pytest', 'Silk', 'Lighthouse', 'Sentry', 'Docker', 'GitHub Actions', 'Postman'].map(tool => (
            <span key={tool} className="text-xs font-mono px-3 py-1.5 rounded-full border border-border/60 text-muted-foreground hover:border-primary/50 hover:text-foreground transition-all cursor-default">
              {tool}
            </span>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
