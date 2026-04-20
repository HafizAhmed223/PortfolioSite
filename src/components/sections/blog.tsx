import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Clock, Tag, ArrowRight, BookOpen, ExternalLink } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface Section { heading?: string; body?: string; code?: string; list?: string[]; }
interface Post {
  slug: string; title: string; excerpt: string; category: string;
  categoryColor: string; readTime: string; date: string;
  sections: Section[];
}

const posts: Post[] = [
  {
    slug: 'cursor-cursorrules-token-efficiency',
    title: 'Mastering Cursor: Cut Token Usage 60% with Structured .cursorrules',
    excerpt: 'Most developers treat Cursor like a chatbot. The ones shipping faster treat it like a junior dev with a 200-page project manual. Here\'s the exact system I use.',
    category: 'Developer Tools',
    categoryColor: 'bg-blue-500/15 text-blue-400 border-blue-500/25',
    readTime: '5 min read',
    date: 'Apr 2025',
    sections: [
      { heading: 'The Problem with Freeform Prompting', body: 'Every time you open a new Cursor session without context, you\'re paying token overhead just to re-explain your stack, your naming conventions, your error handling patterns. Multiply that by 50 sessions a week and you\'ve wasted thousands of tokens on repeated boilerplate.\n\nThe fix isn\'t writing longer prompts — it\'s writing them once, in the right place.' },
      { heading: 'The .cursorrules File Structure That Works', body: 'I\'ve tried dozens of formats. This is the one that consistently produces the best first-pass code with the fewest corrections:', code: `# .cursorrules — [Project Name]

## CONTEXT
[2-3 sentences: what does this app do, who uses it]

## TECH STACK
- Frontend: React 18 + TypeScript 5 + Tailwind CSS
- Backend: Django REST Framework 3.15 + PostgreSQL
- Auth: SimpleJWT + OAuth2 (Google)
- Deploy: AWS EC2 + GitHub Actions CI/CD

## CODE STYLE (enforce strictly)
- Functional components, named exports only
- No \`any\` in TypeScript — use \`unknown\` + type narrowing
- Error handling: typed errors, never empty catch blocks
- API calls: always handle loading, error, and empty states

## DO NOT SUGGEST
- console.log in any file (use logger utility)
- Class components
- Direct DOM manipulation
- Inline styles (use Tailwind classes)

## TESTING
- Jest + React Testing Library for components
- Pytest + pytest-benchmark for Django views
- Write test structure first, then implementation` },
      { heading: 'The 3-Part Prompt Formula', body: 'Context → Problem → Expected Output. I used to write "fix this function." Now I write this:', code: `// CONTEXT: AgencyDashboard fetches all agents on mount.
//           Agency "GlobalCo" has 1,400 agents — page takes 4.2s to load.
// PROBLEM:  Single query returns full agent objects including
//           voice_config (large JSON), not needed for list view.
// EXPECTED: Add a lightweight AgentSummarySerializer returning only
//           id, name, status, created_at. Update the list endpoint.
//           Don't touch the detail endpoint.` },
      { heading: 'Token-efficient debugging', body: 'When something breaks, I follow this order: describe the symptom, paste the error message, share only the relevant lines (not the whole file), state what I\'ve already tried. This single habit has cut my debugging back-and-forth from 6-8 exchanges to 1-2.', code: `// ✗ "My form isn't working, here's all 400 lines"

// ✓ Structured debug request:
// SYMPTOM: Contact form submits but user sees no confirmation toast
// ERROR: No error in console. Network tab shows 200 OK from web3forms.
// RELEVANT CODE: Lines 54-71 of contact.tsx (onSubmit handler)
// ALREADY TRIED: Verified API key is set, confirmed fetch returns {success:true}
// SUSPICION: toast() is called before state update re-render?` },
    ],
  },
  {
    slug: 'agentic-ai-production-workflows',
    title: 'From Chatbots to Agents: Building Production Agentic AI Workflows',
    excerpt: 'A chatbot answers questions. An agent takes actions, uses tools, manages state, and recovers from failure. Here\'s how I architect the difference in production systems.',
    category: 'Agentic AI',
    categoryColor: 'bg-purple-500/15 text-purple-400 border-purple-500/25',
    readTime: '7 min read',
    date: 'Mar 2025',
    sections: [
      { heading: 'What Makes Something "Agentic"', body: 'The term gets overused. To me, a system is agentic when it: (1) has access to tools it decides to call, (2) maintains state across multiple steps, (3) can recover from partial failures, and (4) produces outputs that trigger further actions.\n\nA chatbot that calls one API endpoint on demand isn\'t an agent. An agent that monitors an inbox, decides which emails need action, drafts responses, schedules calendar events, and notifies you only when human judgment is required — that\'s an agent.' },
      { heading: 'The Architecture I Use for Multi-Step Agents', body: 'Every production agent I\'ve built uses this pattern: a central orchestrator LLM that routes to specialized sub-agents. Each sub-agent has a narrow, well-defined responsibility and a clear output schema.', code: `# Stammer.ai Voice Agent Architecture (simplified)
Inbound call arrives
  → Transcription Agent (Whisper/ElevenLabs ASR)
      → extracts: text, confidence_score, detected_language
  → Intent Classification Agent (GPT-4o, strict JSON output)
      → routes to: Support | Sales | Booking | Escalate
  → Domain Agent (handles the actual conversation)
      → has access to: CRM tools, calendar API, knowledge base RAG
  → Response Synthesis Agent
      → converts structured response → natural speech
      → applies persona, tone, ambient audio settings
  → Logging Agent (async, doesn't block response)
      → stores: transcript, intent, outcome, latency metrics` },
      { heading: 'Tool Use Patterns That Actually Work', body: 'The biggest production mistake I see is tools with overlapping responsibilities. If your agent can\'t decide between "search_knowledge_base" and "fetch_document," it will make wrong choices at scale. Each tool should have one clear purpose, a description precise enough that the LLM never needs to guess.', code: `# Tool definitions for a support agent
tools = [
  {
    "name": "search_knowledge_base",
    "description": "Search the FAQ and product docs. Use for: product features, pricing, policies. Do NOT use for: account-specific data, real-time status.",
    "parameters": { "query": "string", "max_results": "int (default 3)" }
  },
  {
    "name": "get_account_info",
    "description": "Fetch verified account data for authenticated user. Use for: subscription status, usage stats, billing. Requires: user_id from session.",
    "parameters": { "user_id": "string", "fields": ["subscription", "usage", "billing"] }
  }
]
# The specificity in "Do NOT use for" eliminates ~80% of tool routing errors` },
      { heading: 'Handling Agent Failures Gracefully', body: 'In production, LLMs will occasionally return malformed JSON, call the wrong tool, or get stuck in loops. I build defensive wrappers around every agent call: output validation with Pydantic, max-iterations limits, and a human-escalation fallback for any unrecoverable state.', code: `from pydantic import BaseModel, ValidationError
import asyncio

class AgentResponse(BaseModel):
    intent: str
    confidence: float  # 0.0 - 1.0
    action: str
    action_params: dict

async def run_agent_with_fallback(prompt: str, max_retries: int = 2):
    for attempt in range(max_retries):
        try:
            raw = await llm.complete(prompt)
            return AgentResponse.model_validate_json(raw)
        except (ValidationError, asyncio.TimeoutError) as e:
            if attempt == max_retries - 1:
                # Never leave user hanging — escalate to human
                return escalate_to_human(reason=str(e))
            await asyncio.sleep(0.5 * (attempt + 1))` },
    ],
  },
  {
    slug: 'voice-ai-engineering-production',
    title: 'Voice AI Engineering: Architecture of a Real Production Voice Agent',
    excerpt: 'Building a voice agent that works in a demo is easy. One that handles real calls — background noise, accents, interruptions, latency spikes — takes a different approach entirely.',
    category: 'Voice AI',
    categoryColor: 'bg-cyan-500/15 text-cyan-400 border-cyan-500/25',
    readTime: '6 min read',
    date: 'Mar 2025',
    sections: [
      { heading: 'The Voice Agent Stack', body: 'A production voice agent has four distinct latency contributors: transcription (speech → text), LLM inference (text → response), text-to-speech synthesis (text → audio), and network round-trips. In my work on Stammer.ai, the total budget for these is <1.5 seconds or callers perceive the agent as "slow" and hang up.' },
      { heading: 'Real-time Transcription Pipeline', body: 'I use streaming transcription — sending audio chunks every 250ms rather than waiting for the caller to finish speaking. This shaves 800ms–1.2s off perceived response time because the LLM starts processing before the utterance ends.', code: `# Streaming WebSocket pipeline (Django Channels + ElevenLabs)
async def handle_voice_stream(websocket):
    buffer = b''
    async for chunk in websocket:
        buffer += chunk
        if len(buffer) >= CHUNK_SIZE_BYTES:  # ~250ms of audio
            # Stream to ASR while caller is still speaking
            partial_transcript = await asr.transcribe_partial(buffer)
            if partial_transcript.is_final:
                # Kick off LLM inference immediately — don't wait for full sentence
                asyncio.create_task(
                    generate_response(partial_transcript.text)
                )
            buffer = b''` },
      { heading: 'Latency Optimization: The 3 Big Wins', body: '', list: [
        '1. Parallel TTS prefetch: While the LLM generates the response, I stream the first sentence to TTS immediately. By the time the full response is ready, the first audio chunk is already rendered.',
        '2. Persona caching: Agent system prompts and persona configs are cached in Redis, not re-fetched per call. Saves 150-200ms per conversation turn.',
        '3. Model selection by call complexity: Simple FAQs route to GPT-4o mini (<$0.0002/response). Complex bookings or complaints route to GPT-4o. Reduces avg inference time from 1.1s to 0.4s for 70% of calls.',
      ]},
      { heading: 'Handling Real-World Voice Conditions', body: 'Background noise, crosstalk, non-native accents, and "um/uh" filler words all degrade transcription accuracy. In production I apply noise suppression (WebRTC VAD) before the audio hits the ASR model, filter confidence-below-0.7 partial transcripts, and use a custom vocabulary hint list for industry-specific terms that generic ASR models mis-hear.', code: `# Voice quality pipeline before ASR
def preprocess_audio(raw_audio: bytes) -> bytes:
    # 1. Noise suppression via WebRTC VAD
    processed = webrtc_vad.filter(raw_audio, aggressiveness=2)
    # 2. Normalize volume levels
    processed = normalize_audio(processed, target_dbfs=-20)
    # 3. Strip silence segments (reduces ASR hallucination)
    processed = strip_silence(processed, min_silence_ms=200)
    return processed

# Confidence threshold prevents garbage transcriptions reaching LLM
if transcript.confidence < 0.7:
    yield "I didn't quite catch that — could you repeat?"` },
    ],
  },
  {
    slug: 'aws-architecture-ai-workloads',
    title: 'AWS Architecture Patterns for AI-Powered Applications',
    excerpt: 'Running AI inference on AWS is expensive if you\'re guessing. Here are the patterns I use to cut costs 40-60% while maintaining sub-second response times.',
    category: 'Cloud & AWS',
    categoryColor: 'bg-amber-500/15 text-amber-400 border-amber-500/25',
    readTime: '8 min read',
    date: 'Feb 2025',
    sections: [
      { heading: 'EC2 vs Lambda vs ECS for AI Inference', body: 'The choice depends on your traffic pattern. Lambda is cheap for sporadic calls but cold starts at 800ms–2s make it unusable for voice agents. EC2 (persistent) is right for steady-state inference with predictable load. ECS Fargate with auto-scaling hits the sweet spot for most SaaS AI platforms: fast warmup, scales to zero at night, no server management.', code: `# My default AI workload architecture on AWS:

# 1. ECS Fargate — primary AI inference service
#    - 2 vCPU, 4GB RAM baseline (add GPU for on-prem models)
#    - ALB + target tracking scaling (CPU > 70% → scale out)
#    - Min 1 task always warm (eliminates cold start penalty)

# 2. ElastiCache Redis — session/persona caching
#    - Caches: agent configs, system prompts, user context
#    - TTL: 24h for static config, 15min for conversation state
#    - Saves ~180ms per API call vs hitting RDS each time

# 3. SQS → Lambda — async post-call processing
#    - Call transcripts, analytics, Stripe usage metering
#    - Lambda fine here: not latency-sensitive, bursty workload` },
      { heading: 'IAM Least-Privilege for AI Services', body: 'On the AI4LYF project I inherited an EC2 instance with AdministratorAccess. One compromised dependency could have exfiltrated everything. I rebuilt the IAM structure from scratch:', code: `# IAM Role: ai-inference-service
{
  "Effect": "Allow",
  "Action": [
    "s3:GetObject",           # Read model artifacts
    "s3:PutObject"            # Write inference results
  ],
  "Resource": "arn:aws:s3:::ai4lyf-models/*"
},
{
  "Effect": "Allow",
  "Action": [
    "ssm:GetParameter"        # Read secrets (API keys)
  ],
  "Resource": "arn:aws:ssm:*:*:parameter/ai4lyf/prod/*"
}
# That's it. No S3:* wildcards. No ec2:* permissions.
# Principle: grant what the code actually calls, nothing more.` },
      { heading: 'Cost Control: The Patterns That Actually Work', body: '', list: [
        'S3 Intelligent-Tiering for model artifacts: audio recordings and transcripts automatically move to cheaper storage after 30 days.',
        'Reserved Instances for baseline EC2: I run 1-year RIs for the always-on inference tier. Saves 40% vs on-demand.',
        'CloudWatch billing alarms at 80% of monthly budget — catches runaway Lambda invocations before they become surprise invoices.',
        'SQS dead-letter queues: prevents infinite retry loops on failed AI calls, which can multiply costs 10x.',
      ]},
    ],
  },
  {
    slug: 'api-security-jwt-oauth2-vulnerabilities',
    title: 'API Security: JWT Vulnerabilities, OAuth2 Pitfalls & Defense Patterns',
    excerpt: 'I\'ve audited dozens of APIs as part of building auth systems. The same mistakes appear again and again. Here\'s what I always look for — and how I fix them.',
    category: 'Security',
    categoryColor: 'bg-rose-500/15 text-rose-400 border-rose-500/25',
    readTime: '7 min read',
    date: 'Jan 2025',
    sections: [
      { heading: 'The JWT "alg:none" Attack (Still in the Wild)', body: 'JWT tokens contain a header that specifies the signing algorithm. Some older implementations trust whatever algorithm the token itself claims. An attacker can send a token with "alg":"none" and no signature — and it passes verification. I test for this on every auth implementation I touch.', code: `# Attack: modify the JWT header to alg:"none"
# Original header: {"alg": "HS256", "typ": "JWT"}
# Malicious header: {"alg": "none", "typ": "JWT"}
# Malicious token: header.payload.  (empty signature)

# Fix: pin the algorithm on verification — never trust the token's claim
import jwt

# ✗ Vulnerable
decoded = jwt.decode(token, secret, algorithms=jwt.algorithms.get_default_algorithms())

# ✓ Secure — algorithm pinned at server level
decoded = jwt.decode(
    token,
    secret,
    algorithms=["HS256"],    # whitelist only, never use a dynamic list
    options={"require": ["exp", "iss", "aud"]}
)` },
      { heading: 'IDOR in Multi-Tenant APIs (Most Common Real-World Bug)', body: 'Insecure Direct Object Reference: a user changes the resource ID in a request and accesses another user\'s data. In multi-tenant SaaS this is critical. I see this in ~60% of API codebases I review.', code: `# ✗ Vulnerable endpoint — only checks auth, not ownership
@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_agent(request, agent_id):
    agent = AgentConfig.objects.get(id=agent_id)  # any user can fetch any agent
    return Response(AgentSerializer(agent).data)

# ✓ Secure — filter by current user's agency
@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_agent(request, agent_id):
    agent = AgentConfig.objects.filter(
        id=agent_id,
        agency=request.user.agency  # ownership check
    ).first()
    if not agent:
        raise PermissionDenied()  # 403, not 404 (don't reveal existence)
    return Response(AgentSerializer(agent).data)` },
      { heading: 'OAuth2 Redirect URI Validation', body: 'OAuth2 is secure by design but trivially broken in implementation. The most common mistake: accepting any redirect_uri that starts with your domain. An attacker registers redirect.yourapp.com or uses an open redirect on your own site to steal auth codes.', code: `# ✗ Vulnerable: prefix match
if redirect_uri.startswith("https://app.stammer.ai"):
    # BYPASS: https://app.stammer.ai.attacker.com/callback

# ✓ Secure: exact match against pre-registered URIs
ALLOWED_REDIRECT_URIS = {
    "https://app.stammer.ai/auth/callback",
    "https://app.stammer.ai/admin/oauth-return",
}

if redirect_uri not in ALLOWED_REDIRECT_URIS:
    return HttpResponse("Invalid redirect_uri", status=400)
# Strict set membership — no prefix matching, no regex, no wildcards` },
      { heading: 'Rate Limiting: Beyond IP-Based Limits', body: 'IP-based rate limiting is trivially bypassed by rotating IPs (cheap to buy in bulk). I layer rate limits: per-IP and per-user and per-API-key. For auth endpoints specifically, I add account lockout after N failures with exponential backoff — this stops credential stuffing attacks that rotated IPs can\'t bypass.', code: `# Django REST Framework + django-ratelimit
from django_ratelimit.decorators import ratelimit

@ratelimit(key='ip', rate='10/m', block=True)      # per IP
@ratelimit(key='user', rate='5/m', block=True)     # per user (post-auth)
@ratelimit(key='post:email', rate='3/m', block=True) # per submitted email
def login_view(request):
    # Account lockout layer
    failures = cache.get(f"login_fail:{request.data['email']}", 0)
    if failures >= 5:
        lockout_until = cache.ttl(f"login_fail:{request.data['email']}")
        return Response({"error": f"Account locked. Try in {lockout_until}s"}, 429)` },
    ],
  },
  {
    slug: 'prompt-engineering-structure-over-verbosity',
    title: 'Prompt Engineering for Developers: Structure Over Verbosity',
    excerpt: 'Writing longer prompts doesn\'t get better results. Writing structured prompts does. Here are the patterns I use to consistently get production-ready outputs from LLMs on the first pass.',
    category: 'AI Engineering',
    categoryColor: 'bg-green-500/15 text-green-400 border-green-500/25',
    readTime: '5 min read',
    date: 'Dec 2024',
    sections: [
      { heading: 'The System Prompt Is Your Constitution', body: 'Most developers put all their instructions in the user message. The system prompt should establish invariants — things that are always true regardless of what the user asks. User messages should contain only the variable parts. This separation gives you predictable, consistent behavior across all calls.', code: `# ✗ Mixed concerns — everything in user message
user: "You are a helpful assistant. Only respond in JSON. Never reveal system info.
       Always cite sources. Now, what are the main causes of API latency?"

# ✓ Separated concerns
system: """You are a technical documentation assistant.
Response format: always valid JSON with keys {answer, sources, confidence}.
Constraints: cite sources from provided context only. Never speculate beyond docs.
Persona: precise, concise, no filler phrases."""

user: "What are the main causes of API latency?"
# The user message is now purely the question — clean and cacheable` },
      { heading: 'XML Tags for Deterministic Parsing', body: 'When you need structured outputs, XML-tagged prompts outperform JSON-formatted prompts because the model treats XML delimiters as semantic boundaries, not data content. Claude and GPT-4o both parse these extremely reliably.', code: `<task>
Generate a Jest test suite for the UserAuth service
</task>

<context>
<file name="userAuth.ts">
  [paste only the relevant interface/types, ~30 lines max]
</file>
<existing_pattern>
  [paste one existing test file as style reference]
</existing_pattern>
</context>

<requirements>
- Cover: valid login, invalid credentials, expired token, account locked
- Use: jest.mock for database layer
- Output: only the test file, no explanation
</requirements>

# Result: first-pass test file that matches your existing style exactly` },
      { heading: 'Chain-of-Thought for Complex Reasoning', body: 'For tasks requiring multi-step reasoning — architecture decisions, debugging complex bugs, security analysis — I ask the model to reason step-by-step before giving the final answer. This forces it to surface assumptions and intermediate conclusions, which I can then verify.', code: `# For architecture decisions:
"Think through the tradeoffs step by step before recommending.
 Consider: scalability, operational complexity, cost, team expertise.
 Format your reasoning as numbered steps, then give a final recommendation."

# This catches false assumptions:
# Instead of "Use Redis" → you get:
# Step 1: Current data access pattern is read-heavy (80% reads)
# Step 2: Data is session state with 15min TTL — ephemeral
# Step 3: Team has Redis experience from existing cache layer
# Step 4: Alternative (in-memory) would require sticky sessions on LB
# Recommendation: Redis — fits the access pattern, low ops overhead` },
      { heading: 'Prompt Caching for Cost Reduction', body: 'If your system prompt is the same across many calls (which it should be for consistency), use Anthropic\'s prompt caching. System prompts cached for 5 minutes — for high-volume apps this reduces costs by 60-80% on the prompt tokens.', code: `import anthropic

client = anthropic.Anthropic()

# Mark system prompt for caching (saves ~$0.024 per 1M tokens on cache hits)
response = client.messages.create(
    model="claude-3-7-sonnet-20250219",
    max_tokens=1024,
    system=[
        {
            "type": "text",
            "text": LONG_SYSTEM_PROMPT,  # your stable instructions
            "cache_control": {"type": "ephemeral"}  # cache for 5 min
        }
    ],
    messages=[{"role": "user", "content": user_query}]
)
# First call: full cost. Subsequent calls within 5min: ~10% of input token cost` },
    ],
  },
];

function ArticleModal({ post, onClose }: { post: Post; onClose: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[200] flex items-start justify-center overflow-y-auto py-8 px-4"
      style={{ background: 'rgba(0,0,0,0.8)', backdropFilter: 'blur(8px)' }}
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
    >
      <motion.article
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 40 }}
        transition={{ type: 'spring', stiffness: 280, damping: 28 }}
        className="relative w-full max-w-3xl rounded-2xl border border-border/60 overflow-hidden my-auto"
        style={{ background: 'hsl(var(--background))', boxShadow: '0 0 80px rgba(59,130,246,0.12), 0 25px 60px rgba(0,0,0,0.5)' }}
      >
        <div className="h-1 w-full" style={{ background: 'linear-gradient(90deg,#3B82F6,#737AFC,#06B6D4)' }} />

        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-8 h-8 rounded-full border border-border/60 flex items-center justify-center text-muted-foreground hover:text-foreground hover:border-primary/50 transition-all z-10"
        >
          <X className="w-4 h-4" />
        </button>

        <div className="p-8">
          <div className="flex items-center gap-3 mb-4 flex-wrap">
            <span className={`text-xs font-mono px-2.5 py-1 rounded-full border ${post.categoryColor}`}>
              <Tag className="w-3 h-3 inline mr-1" />{post.category}
            </span>
            <span className="text-xs text-muted-foreground flex items-center gap-1">
              <Clock className="w-3 h-3" />{post.readTime}
            </span>
            <span className="text-xs text-muted-foreground">{post.date}</span>
          </div>

          <h1 className="text-2xl md:text-3xl font-extrabold leading-tight mb-4">{post.title}</h1>
          <p className="text-muted-foreground text-base leading-relaxed mb-8 border-l-2 border-primary/40 pl-4 italic">{post.excerpt}</p>

          <div className="space-y-8">
            {post.sections.map((sec, i) => (
              <section key={i}>
                {sec.heading && (
                  <h2 className="text-lg font-bold mb-2 text-foreground">{sec.heading}</h2>
                )}
                {sec.body && sec.body.split('\n\n').map((para, j) => (
                  <p key={j} className="text-muted-foreground text-sm leading-relaxed mb-3">{para}</p>
                ))}
                {sec.list && (
                  <ul className="space-y-2 mb-3">
                    {sec.list.map((item, j) => (
                      <li key={j} className="text-sm text-muted-foreground flex gap-2">
                        <span className="text-primary mt-0.5 shrink-0">▸</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                )}
                {sec.code && (
                  <pre
                    className="text-xs font-mono leading-relaxed p-4 rounded-xl overflow-x-auto mt-3"
                    style={{
                      background: 'rgba(0,0,0,0.5)',
                      border: '1px solid rgba(59,130,246,0.15)',
                      color: '#94a3b8',
                      whiteSpace: 'pre-wrap',
                      wordBreak: 'break-word',
                    }}
                  >
                    <code>{sec.code}</code>
                  </pre>
                )}
              </section>
            ))}
          </div>

          <div className="mt-10 pt-6 border-t border-border/40 flex flex-wrap items-center justify-between gap-4">
            <div>
              <div className="text-sm font-semibold">Written by Ahmed Waseem</div>
              <div className="text-xs text-muted-foreground">Full Stack & AI Agent Developer · Lahore, Pakistan</div>
            </div>
            <Button onClick={onClose} variant="outline" className="border-primary/40 hover:border-primary text-sm">
              Back to Portfolio
            </Button>
          </div>
        </div>
      </motion.article>
    </motion.div>
  );
}

export default function Blog() {
  const [selected, setSelected] = useState<Post | null>(null);

  return (
    <section id="blog" className="py-20 relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse at 50% 100%, rgba(115,122,252,0.04) 0%, transparent 60%)' }} />

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
            <span className="text-primary text-xs font-mono tracking-widest uppercase">Insights & Writing</span>
            <span className="w-8 h-px bg-primary" />
          </div>
          <h2 className="text-3xl md:text-5xl font-bold mb-4">
            Technical{' '}
            <span className="gradient-text">Blog</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Deep dives on AI agents, voice engineering, AWS, API security, and developer workflow — from real production experience.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {posts.map((post, i) => (
            <motion.button
              key={post.slug}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.07 }}
              onClick={() => setSelected(post)}
              className="text-left group rounded-2xl border border-border/50 glass-card p-6 hover:border-primary/50 hover:shadow-lg hover:shadow-primary/5 hover:-translate-y-1 transition-all duration-300 flex flex-col relative overflow-hidden"
            >
              {/* Top hover line */}
              <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-primary to-[#737AFC] scale-x-0 group-hover:scale-x-100 transition-transform duration-400 origin-left" />

              <div className="flex items-center justify-between mb-4">
                <span className={`text-xs font-mono px-2.5 py-1 rounded-full border ${post.categoryColor}`}>
                  {post.category}
                </span>
                <span className="text-xs text-muted-foreground flex items-center gap-1">
                  <Clock className="w-3 h-3" />{post.readTime}
                </span>
              </div>

              <h3 className="font-bold text-base leading-snug mb-3 group-hover:text-primary transition-colors duration-200 flex-1">
                {post.title}
              </h3>

              <p className="text-sm text-muted-foreground leading-relaxed mb-4 line-clamp-3">
                {post.excerpt}
              </p>

              <div className="flex items-center justify-between pt-3 border-t border-border/40">
                <span className="text-xs text-muted-foreground font-mono">{post.date}</span>
                <span className="flex items-center gap-1 text-xs font-semibold text-primary group-hover:gap-2 transition-all">
                  Read Article <ArrowRight className="w-3 h-3" />
                </span>
              </div>
            </motion.button>
          ))}
        </div>

        {/* Newsletter-style CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mt-12 rounded-2xl border border-primary/20 glass-card p-8 text-center"
        >
          <BookOpen className="w-8 h-8 text-primary mx-auto mb-3" />
          <h3 className="text-lg font-bold mb-2">More articles on the way</h3>
          <p className="text-sm text-muted-foreground mb-4 max-w-md mx-auto">
            I regularly write about AI engineering, developer tooling, and cloud architecture. Reach out if you want to discuss any of these topics.
          </p>
          <Button variant="outline" asChild className="border-primary/40 hover:border-primary gap-2">
            <a href="#contact">
              <ExternalLink className="w-4 h-4" />
              Start a conversation
            </a>
          </Button>
        </motion.div>
      </div>

      <AnimatePresence>
        {selected && <ArticleModal post={selected} onClose={() => setSelected(null)} />}
      </AnimatePresence>
    </section>
  );
}
