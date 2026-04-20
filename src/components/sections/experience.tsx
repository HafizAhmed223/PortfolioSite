import { motion } from 'framer-motion';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Briefcase } from 'lucide-react';

const experiences = [
  {
    title: 'Software Engineer',
    company: 'Evolve Edge Technologies',
    period: 'Feb 2026 — Present',
    location: 'Lahore, Pakistan',
    tags: ['React.js', 'Django REST', 'Sentry', 'Silk'],
    description: [
      'Led full-stack revamp of "Stammer" — migrated legacy Django template UI to a decoupled React SPA architecture.',
      'Developed robust backend APIs using Django REST Framework, achieving full UAT readiness within 70 days.',
      'Optimized database performance via deep query profiling with Silk; improved API response times significantly.',
      'Integrated Sentry for application monitoring, resolving high-priority production issues proactively.',
    ],
  },
  {
    title: 'MERN Stack Developer',
    company: 'TxLabz',
    period: 'May 2025 — Feb 2026',
    location: 'Lahore, Pakistan',
    tags: ['React.js', 'Node.js', 'MongoDB', 'JWT', 'Docker'],
    description: [
      'Led frontend and backend feature development using React.js, Node.js, and MongoDB for enterprise applications.',
      'Implemented JWT + RBAC authentication improving security and granular access control.',
      'Automated CI/CD pipelines with Docker and GitHub Actions, reducing deployment downtime.',
      'Collaborated with US-based clients in Agile sprints, consistently delivering prioritized features on time.',
    ],
  },
  {
    title: 'Full Stack Developer & AWS Engineer',
    company: 'AI4LYF',
    period: 'Jan 2025 — Apr 2025',
    location: 'Lahore, Pakistan',
    tags: ['FastAPI', 'AWS', 'OAuth2', 'GitHub Actions'],
    description: [
      'Designed microservices architecture with FastAPI and AWS (EC2, S3, IAM) for a production AI platform.',
      'Built secure OAuth2-based APIs with RBAC enforcement across distributed services.',
      'Configured CI/CD pipelines for staging and production environments using GitHub Actions.',
    ],
  },
  {
    title: 'Full Stack Developer',
    company: 'Cherry Byte Technologies',
    period: 'Aug 2024 — Dec 2024',
    location: 'Lahore, Pakistan',
    tags: ['Next.js', 'TypeScript', 'ThirdWeb SDK', 'WebSockets'],
    description: [
      'Developed enterprise-grade admin dashboards using React.js and Next.js with TypeScript.',
      'Integrated smart contracts with ThirdWeb SDK for NFT and prediction market applications.',
      'Built secure REST APIs with real-time WebSocket support for live data features.',
    ],
  },
  {
    title: 'Full Stack Developer',
    company: 'TxLabz',
    period: 'Jul 2023 — Aug 2024',
    location: 'Lahore, Pakistan',
    tags: ['React.js', 'Node.js', 'MongoDB', 'GitHub Actions'],
    description: [
      'Delivered scalable dashboards and modular components with reusable design patterns.',
      'Improved sprint delivery rates by 20% through Agile ceremonies and deployment automation.',
    ],
  },
];

export default function Experience() {
  return (
    <section
      id="experience"
      className="py-20 bg-muted/30 flex items-center justify-center"
    >
      <div className="container max-w-6xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-5xl font-bold mb-4">Experience</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-base md:text-lg">
            A timeline of my professional roles and technical impact across 5 companies.
          </p>
        </motion.div>

        <div className="space-y-8 relative before:absolute before:inset-y-0 before:left-4 before:w-0.5 before:bg-gradient-to-b before:from-primary before:to-primary/10 before:rounded">
          {experiences.map((exp, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -24 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.12 }}
              className="relative pl-12"
            >
              <div className="absolute left-0 top-5 h-8 w-8 rounded-full bg-primary/10 border-2 border-primary flex items-center justify-center">
                <Briefcase className="w-3.5 h-3.5 text-primary" />
              </div>

              <Card className="transition-all duration-300 hover:shadow-xl hover:-translate-y-1 border border-border/50 backdrop-blur-sm bg-background/80">
                <CardHeader className="pb-3">
                  <div className="flex flex-wrap items-start justify-between gap-2">
                    <CardTitle className="text-xl md:text-2xl font-semibold transition duration-300 hover:text-transparent hover:bg-clip-text hover:bg-gradient-to-r hover:from-primary hover:to-[#737AFC]">
                      {exp.title}
                    </CardTitle>
                    <span className="text-xs font-mono text-primary bg-primary/10 px-2 py-1 rounded shrink-0">
                      {exp.period}
                    </span>
                  </div>
                  <CardDescription className="text-sm md:text-base text-muted-foreground">
                    <span className="font-medium text-foreground">{exp.company}</span>
                    {' · '}{exp.location}
                  </CardDescription>
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {exp.tags.map((tag) => (
                      <Badge key={tag} variant="secondary" className="text-xs font-mono">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {exp.description.map((point, i) => (
                      <li key={i} className="flex gap-2 text-sm md:text-base text-muted-foreground leading-relaxed">
                        <span className="text-primary mt-1 shrink-0">—</span>
                        {point}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
