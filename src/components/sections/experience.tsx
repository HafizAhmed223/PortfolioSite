import { motion } from 'framer-motion';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Code, Cloud, LayoutDashboard } from 'lucide-react';

const experiences = [
  {
    icon: <LayoutDashboard className="w-6 h-6 md:w-7 md:h-7" />,
    title: 'Frontend Engineer',
    company: 'TxLabz',
    period: 'July 2023 – August 2024',
    location: 'Lahore, Pakistan',
    description: [
      'Built dynamic, scalable applications with React.js and Next.js.',
      'Engineered role-based dashboards with responsive designs.',
      'Streamlined deployment using GitHub Actions and Docker.',
    ],
  },
  {
    icon: <Cloud className="w-6 h-6 md:w-7 md:h-7" />,
    title: 'Backend Engineer | AWS Engineer',
    company: 'AI4LYF',
    period: 'August 2024 – December 2024',
    location: 'Lahore, Pakistan',
    description: [
      'Designed robust AWS cloud infrastructure with secure configurations.',
      'Implemented auto-scaling and monitoring using CloudWatch.',
      'Developed scalable APIs using FastAPI with microservices approach.',
    ],
  },
  {
    icon: <Code className="w-6 h-6 md:w-7 md:h-7" />,
    title: 'Associate Software Engineer | Full Stack Developer',
    company: 'Cherry Byte Technologies',
    period: 'January 2025 – Present',
    location: 'Lahore, Pakistan',
    description: [
      'Delivering full-stack web apps using MERN stack.',
      'Integrated third-party services, payment gateways, and APIs.',
      'Collaborated across teams for optimized product delivery.',
    ],
  },
];

export default function Experience() {
  return (
    <section
      id="experience"
      className="py-20 bg-muted/30 flex items-center justify-center"
    >
      <div className="container px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-5xl font-bold mb-4">
            Experience
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-base md:text-lg">
            A timeline of my professional roles and technical impact.
          </p>
        </motion.div>

        <div className="space-y-10 relative before:absolute before:inset-y-0 before:left-4 before:w-1 before:bg-primary/20 before:rounded">
          {experiences.map((exp, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.15 }}
              className="relative pl-10"
            >
              {/* Timeline Dot */}
              <div className="absolute left-0 top-4 h-3 w-3 rounded-full bg-primary shadow-lg border-2 border-white" />

              <Card className="transition-all duration-300 hover:shadow-xl hover:-translate-y-1 border border-border/50 backdrop-blur-sm bg-background/80">
                <CardHeader className="pb-3">
                  <div className="flex items-center gap-3 text-primary">
                    {exp.icon}
                    <CardTitle className="text-xl md:text-2xl font-semibold transition duration-300 hover:text-transparent hover:bg-clip-text hover:bg-gradient-to-r hover:from-primary hover:to-[#737AFC]">
                      {exp.title}
                    </CardTitle>
                  </div>
                  <CardDescription className="text-sm md:text-base text-muted-foreground mt-1">
                    <span className="font-medium">{exp.company}</span> &bull;{' '}
                    {exp.period} &bull; {exp.location}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="list-disc list-inside space-y-2 text-sm md:text-base text-muted-foreground leading-relaxed">
                    {exp.description.map((point, i) => (
                      <li key={i}>{point}</li>
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
