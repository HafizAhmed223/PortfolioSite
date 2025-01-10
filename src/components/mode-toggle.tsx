import { Moon, Sun } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useTheme } from '@/components/theme-provider';

export function ModeToggle() {
  const { setTheme, theme } = useTheme();  // Extract current theme

  return (
    <DropdownMenu>
      {/* DropdownMenuTrigger makes the button clickable */}
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="relative flex items-center justify-center"
        >
          {/* Sun Icon (Light mode) */}
          <Sun
            className={`h-[1.5rem] w-[1.5rem] transition-transform duration-300 ease-in-out transform ${theme === 'dark' ? 'dark:rotate-90 dark:scale-0' : ''
              }`}
            color={theme === 'dark' ? 'white' : 'black'} // Adjust icon color based on the current theme
          />
          {/* Moon Icon (Dark mode) */}
          <Moon
            className={`absolute h-[1.5rem] w-[1.5rem] transition-transform duration-300 ease-in-out transform ${theme === 'light' ? 'dark:rotate-0 dark:scale-100' : ''
              }`}
            color={theme === 'light' ? 'black' : 'white'} // Adjust icon color based on the current theme
          />
          <span className="sr-only">Toggle theme</span>
        </Button>
      </DropdownMenuTrigger>

      {/* Dropdown Menu content with theme options */}
      <DropdownMenuContent
        align="end"
        className="w-40 p-2 bg-background/90 shadow-lg rounded-md dark:bg-background/95"
      >
        <DropdownMenuItem onClick={() => setTheme('light')}>
          Light
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme('dark')}>
          Dark
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme('system')}>
          System
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
