import { ThemeProvider } from '@/components/theme-provider';
import { Toaster } from '@/components/ui/sonner';
import Layout from '@/components/layout';
import Hero from '@/components/sections/hero';
import About from '@/components/sections/about';
import AISpotlight from '@/components/sections/ai-spotlight';
import Workflow from '@/components/sections/workflow';
import Experience from '@/components/sections/experience';
import Projects from '@/components/sections/projects';
import Skills from '@/components/sections/skills';
import Testimonials from '@/components/sections/testimonials';
import Blog from '@/components/sections/blog';
import Contact from '@/components/sections/contact';

function App() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="portfolio-theme">
      <Layout>
        <Hero />
        <About />
        <AISpotlight />
        <Workflow />
        <Experience />
        <Projects />
        <Skills />
        <Testimonials />
        <Blog />
        <Contact />
      </Layout>
      <Toaster />
    </ThemeProvider>
  );
}

export default App;
