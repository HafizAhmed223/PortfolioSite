import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Github, Linkedin, Mail } from 'lucide-react';
import { Typewriter } from 'react-simple-typewriter';

export default function HeroSection() {
  return (
    <section className="flex items-center justify-center pt-16">

    <div className="container px-4 grid md:grid-cols-2 gap-8 items-center py-20">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-4xl md:text-6xl font-extrabold mb-4 text-foreground">
          Hi, I'm <span className="text-primary">Ahmed Waseem</span>
        </h1>
        <h2 className="text-xl md:text-4xl mb-6 text-muted-foreground font-medium">
          <span className="bg-gradient-to-r from-[#737AFC] to-[#737AFC]/70 bg-clip-text text-transparent font-bold text-3xl animate-gradient-text">I am </span>
          <span className="bg-gradient-to-r from-[#737AFC] to-[#737AFC]/70 bg-clip-text text-transparent font-bold text-3xl animate-gradient-text">
            <Typewriter
              words={[
                'a Full Stack Developer',
                'AWS Certified',
                'a MERN Stack Expert',
                'a Cloud Engineer',
                'a NEXT.js Developer',
                'a Software Engineer',
                'a Web Developer',
                'a Cloud Enthusiast',
                'a Problem Solver',
                'a Tech Innovator',
                'a Software Architect',
                'a Web2 & Web3 Engineer',
                'Your Next Tech Partner',
              ]}
              loop={0}
              cursor
              cursorStyle="|"
              typeSpeed={60}
              deleteSpeed={40}
              delaySpeed={1500}
            />
          </span>
        </h2>

        <p className="text-xl text-muted-foreground mb-8">
          Passionate about building scalable web applications and creating
          exceptional user experiences. Specialized in MERN stack development
          with 2+ years of experience.
        </p>
        <div className="flex flex-wrap gap-4">
          <Button asChild size="lg">
            <a href="#contact" className='text-xl font-bold '>Get in Touch</a>
          </Button>
          <Button variant="outline" asChild size="lg">
            <a href="#projects" className='text-xl font-bold '>View Projects</a>
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