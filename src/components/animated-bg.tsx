import { useRef } from 'react';

const SKILL_WORDS = [
  'React', 'Next.js', 'TypeScript', 'Node.js', 'Python', 'FastAPI',
  'Django', 'MongoDB', 'PostgreSQL', 'AWS', 'Docker', 'Web3',
  'AI Agent', 'Voice AI', 'MERN', 'OAuth2', 'REST API', 'Microservices',
  'LLM', 'WebSockets', 'CI/CD', 'GraphQL',
];

function FloatingWord({ word, style }: { word: string; style: React.CSSProperties }) {
  return (
    <div
      className="absolute text-xs font-mono select-none pointer-events-none whitespace-nowrap"
      style={{
        color: 'rgba(59,130,246,0.18)',
        animation: `float-up ${style.animationDuration} linear ${style.animationDelay} infinite`,
        ...style,
      }}
    >
      {word}
    </div>
  );
}

export default function AnimatedBackground() {
  const particlesRef = useRef<Array<{ word: string; style: React.CSSProperties }>>([]);

  if (particlesRef.current.length === 0) {
    particlesRef.current = Array.from({ length: 18 }, (_, i) => ({
      word: SKILL_WORDS[i % SKILL_WORDS.length],
      style: {
        left: `${Math.random() * 95}%`,
        bottom: `-40px`,
        animationDuration: `${12 + Math.random() * 16}s`,
        animationDelay: `${Math.random() * 20}s`,
        fontSize: `${0.6 + Math.random() * 0.45}rem`,
        opacity: 0.12 + Math.random() * 0.12,
      },
    }));
  }

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none" style={{ zIndex: 0 }}>
      {/* Grid overlay */}
      <div
        className="absolute inset-0 opacity-[0.025]"
        style={{
          backgroundImage: `
            linear-gradient(rgba(59,130,246,1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(59,130,246,1) 1px, transparent 1px)
          `,
          backgroundSize: '64px 64px',
        }}
      />

      {/* Blob 1 — top left blue */}
      <div
        className="absolute rounded-full"
        style={{
          width: '600px',
          height: '600px',
          top: '-150px',
          left: '-150px',
          background: 'radial-gradient(circle, rgba(59,130,246,0.18) 0%, transparent 70%)',
          filter: 'blur(60px)',
          animation: 'blob-drift-1 22s ease-in-out infinite',
        }}
      />

      {/* Blob 2 — top right purple */}
      <div
        className="absolute rounded-full"
        style={{
          width: '500px',
          height: '500px',
          top: '0px',
          right: '-100px',
          background: 'radial-gradient(circle, rgba(115,122,252,0.14) 0%, transparent 70%)',
          filter: 'blur(70px)',
          animation: 'blob-drift-2 28s ease-in-out infinite',
        }}
      />

      {/* Blob 3 — mid center cyan */}
      <div
        className="absolute rounded-full"
        style={{
          width: '450px',
          height: '450px',
          top: '40%',
          left: '30%',
          background: 'radial-gradient(circle, rgba(6,182,212,0.10) 0%, transparent 70%)',
          filter: 'blur(80px)',
          animation: 'blob-drift-3 35s ease-in-out infinite',
        }}
      />

      {/* Blob 4 — bottom right blue */}
      <div
        className="absolute rounded-full"
        style={{
          width: '550px',
          height: '550px',
          bottom: '-100px',
          right: '10%',
          background: 'radial-gradient(circle, rgba(59,130,246,0.12) 0%, transparent 70%)',
          filter: 'blur(65px)',
          animation: 'blob-drift-4 24s ease-in-out infinite',
        }}
      />

      {/* Blob 5 — bottom left purple */}
      <div
        className="absolute rounded-full"
        style={{
          width: '400px',
          height: '400px',
          bottom: '5%',
          left: '5%',
          background: 'radial-gradient(circle, rgba(139,92,246,0.10) 0%, transparent 70%)',
          filter: 'blur(70px)',
          animation: 'blob-drift-2 30s ease-in-out infinite reverse',
        }}
      />

      {/* Floating skill words */}
      {particlesRef.current.map((p, i) => (
        <FloatingWord key={i} word={p.word} style={p.style} />
      ))}

      {/* Vignette overlay */}
      <div
        className="absolute inset-0"
        style={{
          background: 'radial-gradient(ellipse at center, transparent 40%, rgba(6,11,26,0.5) 100%)',
        }}
      />
    </div>
  );
}
