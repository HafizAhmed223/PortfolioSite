import { useState, useEffect } from 'react';
import { ModeToggle } from './mode-toggle';
import { Button } from './ui/button';
import { Menu, X } from 'lucide-react';
import { cn } from '@/lib/utils';
import AnimatedBackground from './animated-bg';
import ChatWidget from './chat-widget';
import HireModal from './hire-modal';

const navItems = [
  { name: 'About', href: '#about' },
  { name: 'How I Build', href: '#workflow' },
  { name: 'Projects', href: '#projects' },
  { name: 'Blog', href: '#blog' },
  { name: 'Testimonials', href: '#testimonials' },
  { name: 'Contact', href: '#contact' },
];

export default function Layout({ children }: { children: React.ReactNode }) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [hireOpen, setHireOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Allow child sections to trigger hire modal via custom event
  useEffect(() => {
    const handler = () => setHireOpen(true);
    window.addEventListener('open-hire-modal', handler);
    return () => window.removeEventListener('open-hire-modal', handler);
  }, []);

  const handleMenuItemClick = () => setMobileMenuOpen(false);

  return (
    <div className="bg-background w-[99vw] mx-auto relative">
      <AnimatedBackground />

      {/* Header */}
      <header
        className={cn(
          'fixed top-0 w-full z-50 transition-all duration-300',
          isScrolled
            ? 'bg-background/80 backdrop-blur-xl shadow-md border-b border-border/40'
            : 'bg-transparent'
        )}
      >
        <nav className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <a href="#" className="text-xl font-extrabold tracking-tight">
            Ahmed<span className="text-primary">.</span>
          </a>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-5">
            {navItems.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className="text-sm text-muted-foreground hover:text-primary transition-colors duration-200 font-medium"
              >
                {item.name}
              </a>
            ))}
          </div>

          <div className="hidden md:flex items-center gap-3">
            <ModeToggle />
            <Button
              size="sm"
              className="font-semibold shadow-md shadow-primary/20 hover:shadow-primary/40 transition-shadow"
              onClick={() => setHireOpen(true)}
            >
              💼 Hire Me
            </Button>
          </div>

          {/* Mobile Nav Button */}
          <div className="md:hidden flex items-center gap-2">
            <ModeToggle />
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="rounded-full"
            >
              {mobileMenuOpen ? <X /> : <Menu />}
            </Button>
          </div>
        </nav>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden absolute top-16 left-0 w-full bg-background/95 backdrop-blur-xl border-b border-border/40 z-50">
            <div className="px-4 py-4 flex flex-col gap-3">
              {navItems.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  className="text-muted-foreground hover:text-primary transition-colors py-1"
                  onClick={handleMenuItemClick}
                >
                  {item.name}
                </a>
              ))}
              <Button
                className="mt-2 w-full font-semibold"
                onClick={() => { setHireOpen(true); handleMenuItemClick(); }}
              >
                💼 Hire Me
              </Button>
            </div>
          </div>
        )}
      </header>

      {/* Main Content */}
      <main className="relative z-10">
        {children}
      </main>

      {/* Footer */}
      <footer className="relative z-10 border-t border-border/40 py-8">
        <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-muted-foreground font-mono">
            © {new Date().getFullYear()} <span className="text-primary">Ahmed Waseem</span> · Built with passion
          </p>
          <div className="flex items-center gap-2 text-sm text-green-400 font-mono">
            <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
            Open to opportunities
          </div>
        </div>
      </footer>

      <HireModal open={hireOpen} onClose={() => setHireOpen(false)} />
      <ChatWidget />
    </div>
  );
}
