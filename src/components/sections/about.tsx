import { motion } from 'framer-motion';
const techStack = [
  'React.js / Next.js',
  'Node.js / Express',
  'MongoDB / PostgreSQL',
  'TypeScript / ES6+',
  'AWS (EC2, S3, IAM)',
  'Docker / GitHub Actions',
  'FastAPI / Django REST',
  'Tailwind CSS / MUI',
  'Jest / Cypress',
  'Web3 / ThirdWeb SDK',
  'OAuth2 / JWT / RBAC',
  'WebSockets / REST APIs',
];

const highlights = [
  { num: '3+', label: 'Years Experience' },
  { num: '3', label: 'Roles at TxLabz' },
  { num: '15+', label: 'Projects Shipped' },
  { num: '100%', label: 'Remote Ready' },
];

export default function About() {
  return (
    <section id="about" className="py-20 flex items-center justify-center">
      <div className="container max-w-6xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">About Me</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-base md:text-lg">
            Full Stack Developer based in Lahore, Pakistan — building production-grade apps across the MERN stack, Django, and AWS.
          </p>
        </motion.div>

        {/* Stats Row */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-14"
        >
          {highlights.map((h, i) => (
            <motion.div
              key={h.label}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="rounded-2xl bg-primary/5 border border-border p-6 text-center"
            >
              <div className="text-3xl font-extrabold bg-gradient-to-r from-primary to-[#737AFC] bg-clip-text text-transparent">
                {h.num}
              </div>
              <div className="text-xs text-muted-foreground font-mono tracking-wide uppercase mt-1">{h.label}</div>
            </motion.div>
          ))}
        </motion.div>

        {/* Bio + Tech Grid */}
        <div className="grid md:grid-cols-2 gap-12 items-start">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="space-y-4 text-muted-foreground leading-relaxed"
          >
            <p>
              I'm a <strong className="text-foreground font-semibold">Full Stack Developer</strong> with 3+ years of hands-on experience building production-grade applications across the MERN stack and beyond.
            </p>
            <p>
              From leading full-stack migrations and designing microservices architectures to collaborating with US-based clients in Agile sprints — I thrive in fast-paced environments that demand both technical depth and clear communication.
            </p>
            <p>
              I care deeply about code quality, system performance, and shipping things that actually work. Whether it's a React SPA, a Django/Node.js API, or cloud-deployed AWS infrastructure — I take ownership of the whole stack.
            </p>
            <p>
              Currently a <strong className="text-foreground font-semibold">Software Engineer at TxLabz</strong>, I'm open to senior and lead roles where I can drive impactful projects.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <p className="text-xs font-mono text-primary tracking-widest uppercase mb-5">Technologies I Work With</p>
            <div className="grid grid-cols-2 gap-2.5">
              {techStack.map((tech, i) => (
                <motion.div
                  key={tech}
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.05 }}
                  className="flex items-center gap-2 text-sm text-muted-foreground"
                >
                  <span className="text-primary text-xs">▸</span>
                  <span className="font-mono">{tech}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
