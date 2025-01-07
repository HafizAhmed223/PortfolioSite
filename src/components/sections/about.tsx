import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { Award, BookOpen, Code2, Cpu } from 'lucide-react';

const highlights = [
  {
    icon: Code2,
    title: 'Full Stack Development',
    description: 'Expertise in building end-to-end web applications using MERN stack.',
  },
  {
    icon: Cpu,
    title: 'AWS Certified',
    description: 'Certified AWS Developer with experience in cloud infrastructure.',
  },
  {
    icon: Award,
    title: '2+ Years Experience',
    description: 'Professional experience in developing scalable applications.',
  },
  {
    icon: BookOpen,
    title: 'Continuous Learning',
    description: 'Always staying updated with the latest technologies and best practices.',
  },
];

export default function About() {
  return (
    <section id="about" className="py-20 bg-muted/30">
      <div className="container px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl font-bold mb-4">About Me</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            I'm a passionate Full Stack Developer with a focus on creating scalable
            and user-friendly web applications. With expertise in the MERN stack
            and AWS, I bring ideas to life through clean code and innovative solutions.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {highlights.map((item, index) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card>
                <CardContent className="pt-6">
                  <div className="rounded-full bg-primary/10 p-3 w-12 h-12 mb-4">
                    <item.icon className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="font-semibold mb-2">{item.title}</h3>
                  <p className="text-sm text-muted-foreground">
                    {item.description}
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}