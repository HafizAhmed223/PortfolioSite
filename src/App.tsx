import { ThemeProvider } from '@/components/theme-provider';
import { Toaster } from '@/components/ui/sonner';
import Layout from '@/components/layout';
import Hero from '@/components/sections/hero';
import About from '@/components/sections/about';
import Experience from '@/components/sections/experience';
import Projects from '@/components/sections/projects';
import Skills from '@/components/sections/skills';
import Contact from '@/components/sections/contact';

function App() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="portfolio-theme">
      <Layout>
        <Hero />
        <About />
        <Experience />
        <Projects />
        <Skills />
        <Contact />
      </Layout>
      <Toaster />
    </ThemeProvider>
  );
}

export default App;