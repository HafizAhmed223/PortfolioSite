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
    company: 'TxLabz',
    period: 'July 2024 – Present',
    location: 'Lahore, Pakistan',
    tags: ['React.js', 'Django REST', 'FastAPI', 'AWS', 'Sentry', 'ThirdWeb'],
    description: [
      'Led the full-stack revamp of the "Stammer" project, migrating a legacy Django template UI to a decoupled React SPA architecture.',
      'Developed a robust backend API using Django REST Framework and achieved full UAT readiness within 70 days.',
      'Optimized database performance and API response times by performing deep query profiling using Silk.',
      'Improved application stability and monitoring by integrating Sentry and resolving high-priority production issues.',
      'Designed a scalable microservices architecture using FastAPI and AWS (EC2, S3, IAM) to handle high-concurrency workloads.',
      'Integrated smart contracts with ThirdWeb SDK for decentralized applications, including NFT and prediction market platforms.',
    ],
  },
  {
    title: 'Associate Software Engineer',
    company: 'TxLabz',
    period: 'Oct 2023 – June 2024',
    location: 'Lahore, Pakistan',
    tags: ['React.js', 'Next.js', 'Node.js', 'MongoDB', 'Tailwind CSS', 'Docker'],
    description: [
      'Spearheaded frontend and backend feature development using React.js, Next.js (TypeScript), Node.js, and MongoDB for enterprise applications.',
      'Developed enterprise-grade admin dashboards and modular UI components built with reusable design patterns and Tailwind CSS.',
      'Implemented secure authentication and authorization flows utilizing JWT, OAuth2, and Role-Based Access Control (RBAC).',
      'Automated CI/CD pipelines for staging and production environments using Docker and GitHub Actions, significantly reducing deployment downtime.',
      'Collaborated directly with US-based clients during Agile sprints, increasing overall sprint delivery rates by 20%.',
    ],
  },
  {
    title: 'Software Engineer Intern',
    company: 'TxLabz',
    period: 'July 2023 – Sept 2023',
    location: 'Lahore, Pakistan',
    tags: ['REST APIs', 'WebSockets', 'UI/UX', 'AWS CloudWatch'],
    description: [
      'Assisted in building secure REST APIs featuring real-time communication support via WebSockets.',
      'Collaborated with senior developers to deliver pixel-perfect user interfaces matching strict design system specifications.',
      'Monitored production application health and assisted in debugging critical issues using AWS CloudWatch.',
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
