import { useState, useEffect } from 'react';
import { ModeToggle } from './mode-toggle';
import { Button } from './ui/button';
import { Menu, X } from 'lucide-react';
import { cn } from '@/lib/utils';

const navItems = [
  { name: 'About', href: '#about' },
  { name: 'Experience', href: '#experience' },
  { name: 'Projects', href: '#projects' },
  { name: 'Skills', href: '#skills' },
  { name: 'Contact', href: '#contact' },
];

export default function Layout({ children }: { children: React.ReactNode }) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleMenuItemClick = () => setMobileMenuOpen(false);

  return (
    <div className="bg-background w-[99vw] mx-auto">
      {/* Header */}
      <header
        className={cn(
          'fixed top-0 w-full z-50 transition-all duration-300',
          isScrolled ? 'bg-background/80 backdrop-blur-md shadow-md' : 'bg-transparent'
        )}
      >
        <nav className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <a href="#" className="text-3xl font-bold">
            Ahmed<span className="text-primary">.</span>
          </a>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-6">
            {navItems.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className="text-muted-foreground hover:text-primary transition-colors text-lg"
              >
                {item.name}
              </a>
            ))}
            <ModeToggle />
          </div>

          {/* Mobile Nav Button */}
          <div className="md:hidden flex items-center gap-2">
            <ModeToggle />
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="rounded-full p-2 bg-blue-700 text-white hover:bg-muted/80 transition"
            >
              {mobileMenuOpen ? <X /> : <Menu />}
            </Button>
          </div>
        </nav>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden absolute top-16 left-0 w-full bg-background/95 backdrop-blur-md border-b z-50">
            <div className="px-4 py-4 flex flex-col gap-4">
              {navItems.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  className="text-muted-foreground hover:text-primary transition-colors"
                  onClick={handleMenuItemClick}
                >
                  {item.name}
                </a>
              ))}
            </div>
          </div>
        )}
      </header>

      {/* Main Content */}
      <main>
        {children}
      </main>

      {/* Footer */}
      <footer className="bg-muted/30 py-6 mt-auto">
        <div className="max-w-7xl mx-auto px-4 text-center text-muted-foreground">
          <p>© {new Date().getFullYear()} Ahmed Waseem. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
