import { motion } from 'framer-motion';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ExternalLink, Github } from 'lucide-react';

const projects = [
  {
    num: '01',
    title: 'Stammer.ai',
    description:
      'White-label AI SaaS platform powering 60,000+ active users across 1,300+ agencies. Sell branded Voice & Chat AI agents — inbound/outbound calls, lead gen, appointment booking — under your own domain with zero revenue sharing. Led full-stack migration from legacy Django templates to a modern React SPA + DRF architecture, integrated Sentry monitoring, and optimized DB performance to reach UAT in 70 days.',
    tags: ['React.js', 'Django REST', 'Voice AI', 'Chat AI', 'White-label SaaS', 'Sentry'],
    github: 'https://github.com/HafizAhmed223',
    demo: 'https://stammer.ai',
  },
  {
    num: '02',
    title: 'MODJIVERSE',
    description:
      'GPT-powered AI assistant that dynamically adapts its tone and responses based on the user\'s emotional context. Built with a microservices architecture.',
    tags: ['Next.js', 'Node.js', 'MongoDB', 'MySQL', 'GPT API'],
    github: 'https://github.com/HafizAhmed223',
    demo: null,
  },
  {
    num: '03',
    title: 'Swoodle',
    description:
      'A full-featured e-commerce platform built on the MERN stack and deployed on AWS. Scalable architecture with secure payment flows and real-time inventory management.',
    tags: ['React.js', 'Node.js', 'MongoDB', 'AWS'],
    github: 'https://github.com/HafizAhmed223',
    demo: null,
  },
  {
    num: '04',
    title: 'Primape',
    description:
      'A decentralized prediction market application on the blockchain. Users stake tokens on real-world outcomes using smart contract integrations via ThirdWeb SDK.',
    tags: ['TypeScript', 'ThirdWeb SDK', 'Web3', 'React.js'],
    github: 'https://github.com/HafizAhmed223',
    demo: null,
  },
  {
    num: '05',
    title: 'Nomia Document Generator',
    description:
      'Automated legal and HR document creation system. Generates tailored documents from user inputs, dramatically reducing manual effort for legal teams.',
    tags: ['React.js', 'TypeScript', 'Node.js'],
    github: 'https://github.com/HafizAhmed223',
    demo: null,
  },
  {
    num: '06',
    title: 'Auto Magic (AI-Driven SaaS)',
    description:
      'A SaaS platform to analyze and scrape e-commerce reviews using the MERN stack. Delivers actionable insights for consumers and managers.',
    tags: ['React.js', 'Node.js', 'MongoDB', 'AI'],
    github: 'https://github.com/HafizAhmed223/fyp-frontend',
    demo: 'https://fyp-frontend-pied.vercel.app',
  },
];

export default function Projects() {
  return (
    <section id="projects" className="py-20 bg-muted/30 flex items-center justify-center">
      <div className="container max-w-6xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-5xl font-bold mb-4">Things I've Built</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-base md:text-lg">
            A selection of projects spanning full-stack web apps, blockchain, AI, and cloud-deployed systems.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project, index) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.08 }}
            >
              <Card className="group h-full flex flex-col hover:shadow-xl hover:-translate-y-1 transition-all duration-300 border border-border/50 bg-background/80 backdrop-blur-sm overflow-hidden relative">
                {/* Top accent line */}
                <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-primary to-[#737AFC] scale-x-0 group-hover:scale-x-100 transition-transform duration-400 origin-left" />

                <CardHeader className="pb-3">
                  <span className="text-xs font-mono text-muted-foreground/60 mb-1">{project.num}</span>
                  <CardTitle className="text-lg md:text-xl font-bold group-hover:text-primary transition-colors duration-200">
                    {project.title}
                  </CardTitle>
                </CardHeader>

                <CardContent className="flex flex-col flex-1 gap-4">
                  <p className="text-sm text-muted-foreground leading-relaxed flex-1">
                    {project.description}
                  </p>
                  <div className="flex flex-wrap gap-1.5">
                    {project.tags.map((tag) => (
                      <Badge key={tag} variant="secondary" className="text-xs font-mono">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                  <div className="flex gap-2 pt-1">
                    <Button size="sm" variant="ghost" className="h-8 px-3 text-xs" asChild>
                      <a href={project.github} target="_blank" rel="noopener noreferrer">
                        <Github className="h-3.5 w-3.5 mr-1.5" />
                        Code
                      </a>
                    </Button>
                    {project.demo && (
                      <Button size="sm" variant="ghost" className="h-8 px-3 text-xs" asChild>
                        <a href={project.demo} target="_blank" rel="noopener noreferrer">
                          <ExternalLink className="h-3.5 w-3.5 mr-1.5" />
                          Live Demo
                        </a>
                      </Button>
                    )}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
