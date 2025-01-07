// import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ExternalLink, Github } from 'lucide-react';

const projects = [
  {
    title: 'Auto Magic (AI-Driven SaaS)',
    description: 'A SaaS platform to analyze and scrape e-commerce reviews using the MERN stack.',
    details: [
      'Built a SaaS platform to analyze and scrape e-commerce reviews using the MERN stack.',
      'Delivered actionable insights for consumers and managers, enhancing decision-making efficiency.',
    ],
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2070&auto=format&fit=crop',
    github: 'https://github.com/HafizAhmed223/fyp-frontend',
    demo: 'https://fyp-frontend-pied.vercel.app',
  },
  {
    title: 'Maweidi (Healthcare Management)',
    description: 'A comprehensive healthcare management platform with appointment booking and video consultations.',
    details: [
      'Designed user-friendly interfaces with Formik, Yup, and Material UI for admin dashboards.',
      'Enabled seamless appointment booking and integrated video consultations.',
    ],
    image: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?q=80&w=2070&auto=format&fit=crop',
    github: 'https://github.com/HafizAhmed223',
    demo: 'https://www.maweidi.com.kw/?fbclid=IwZXh0bgNhZW0CMTAAAR1YJnkAuQz6KmBDaJnkbDssv8tqy450jvDW9iunSlwNPd3KMO4BfZZKU14_aem_YLrqxRIK9NkAV7MZtdUUog',
  },
  {
    title: 'TB Dashboard',
    description: 'A Next.js dashboard with full responsiveness and role-based access control.',
    details: [
      'Developed with Next.js, ensuring full responsiveness and RBAC implementation.',
      'Improved UX through clean and optimized code structures.',
    ],
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2070&auto=format&fit=crop',
    github: 'https://github.com/HafizAhmed223',
    demo: 'https://tb.eghosting.site/login',
  },
];

export default function Projects() {
  // const [selectedProject, setSelectedProject] = useState(null);

  return (
    <section id="projects" className="py-20 bg-muted/30">
      <div className="container px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl font-bold mb-4">Featured Projects</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            A selection of my recent work in web development and cloud engineering.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project, index) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card className="group hover:shadow-lg transition-shadow">
                <CardHeader className="p-0">
                  <div className="relative overflow-hidden">
                    <img
                      src={project.image}
                      alt={project.title}
                      className="w-full h-48 object-cover transition-transform group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-4">
                      <Button size="icon" variant="secondary" asChild>
                        <a
                          href={project.github}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <Github className="h-5 w-5" />
                        </a>
                      </Button>
                      <Button size="icon" variant="secondary" asChild>
                        <a
                          href={project.demo}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <ExternalLink className="h-5 w-5" />
                        </a>
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="pt-6">
                  <CardTitle className="mb-2">{project.title}</CardTitle>
                  <CardDescription>{project.description}</CardDescription>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}