import { motion } from 'framer-motion';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

const experiences = [
  {
    title: 'MERN Stack Developer',
    company: 'TxLabz',
    period: 'July 2023 - August 2024',
    location: 'Lahore, Pakistan',
    description: [
      'Developed scalable web applications using React.js and Next.js enhancing client performance.',
      'Built dynamic, responsive dashboards with role-based access control.',
      'Created APIs using Node.js with MongoDB as a database.',
      'Automated CI/CD pipelines with GitHub Actions and Docker, reducing deployment time.',
    ],
  },
  {
    title: 'Full Stack Developer & AWS Engineer',
    company: 'AI4LYF',
    period: 'August 2024 - December 2024',
    location: 'Lahore, Pakistan',
    description: [
      'Closely worked on designing and deploying AWS infrastructure.',
      'Automated resource scaling with AWS Auto Scaling Groups and implemented authentication mechanisms.',
      'Created APIs using Fast APIs integrating microservices architecture.',
    ],
  },
];

export default function Experience() {
  return (
    <section id="experience" className="py-20">
      <div className="container px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl font-bold mb-4">Experience</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            My professional journey in software development and cloud engineering.
          </p>
        </motion.div>

        <div className="space-y-6">
          {experiences.map((exp, index) => (
            <motion.div
              key={exp.company}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card>
                <CardHeader>
                  <CardTitle>{exp.title}</CardTitle>
                  <CardDescription>
                    {exp.company} | {exp.period} | {exp.location}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                    {exp.description.map((item, i) => (
                      <li key={i}>{item}</li>
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