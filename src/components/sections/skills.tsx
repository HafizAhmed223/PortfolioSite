import { motion } from 'framer-motion';
import { Progress } from '@/components/ui/progress';

const skills = [
  { name: 'React.js', level: 90 },
  { name: 'Next.js', level: 85 },
  { name: 'Node.js', level: 85 },
  { name: 'JavaScript', level: 90 },
  { name: 'Python', level: 80 },
  { name: 'AWS', level: 75 },
  { name: 'Shopify Plus', level: 60 },
  { name: 'SQA', level: 75 },
  { name: 'MongoDB', level: 85 },
  { name: 'Docker', level: 70 },
  { name: 'TypeScript', level: 80 },
  { name: 'Tailwind CSS', level: 90 },
];

export default function Skills() {
  return (
    <section id="skills" className="py-20">
      <div className="container px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl font-bold mb-4">Skills & Expertise</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            My technical skills and proficiency levels in various technologies.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          {skills.map((skill, index) => (
            <motion.div
              key={skill.name}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="font-medium">{skill.name}</span>
                  <span className="text-muted-foreground">{skill.level}%</span>
                </div>
                <Progress value={skill.level} className="h-2" />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}