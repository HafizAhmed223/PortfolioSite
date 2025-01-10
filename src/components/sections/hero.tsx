import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Github, Linkedin, Mail } from 'lucide-react';

export default function Hero() {
  return (
    <section className="min-h-screen flex items-center justify-center pt-16">
      <div className="container px-4 grid md:grid-cols-2 gap-8 items-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-4xl md:text-6xl font-bold mb-4">
            Hi, I'm Ahmed Waseem
          </h1>
          <h2 className="text-2xl md:text-3xl text-muted-foreground mb-6">
            Software Engineer & AWS Certified
          </h2>
          <p className="text-lg text-muted-foreground mb-8">
            Passionate about building scalable web applications and creating
            exceptional user experiences. Specialized in MERN stack development
            with 2+ years of experience.
          </p>
          <div className="flex flex-wrap gap-4">
            <Button asChild>
              <a href="#contact">Get in Touch</a>
            </Button>
            <Button variant="outline" asChild>
              <a href="#projects">View Projects</a>
            </Button>
            <div className="flex gap-4 ml-auto">
              <Button variant="ghost" size="icon" asChild>
                <a
                  href="https://github.com/HafizAhmed223"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Github className="h-5 w-5" />
                </a>
              </Button>
              <Button variant="ghost" size="icon" asChild>
                <a
                  href="https://linkedin.com/in/hafizahmedwaseem"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Linkedin className="h-5 w-5" />
                </a>
              </Button>
              <Button variant="ghost" size="icon" asChild>
                <a href="mailto:hafizahmedwaseem@gmail.com">
                  <Mail className="h-5 w-5" />
                </a>
              </Button>
            </div>
          </div>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="hidden md:block"
        >
          <div className="relative">
            <div className="absolute -inset-1 rounded-lg bg-gradient-to-r from-primary to-primary/50 opacity-75 blur" />
            <img
              src="https://images.unsplash.com/photo-1607705703571-c5a8695f18f6?q=80&w=2070&auto=format&fit=crop"
              alt="Ahmed Waseem"
              className="relative rounded-lg object-cover w-full aspect-square"
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
}