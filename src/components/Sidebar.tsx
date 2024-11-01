import { Category } from '@/types';
import { cn } from '@/lib/utils';
import { useState } from 'react';
import { Menu } from 'lucide-react';
import { Button } from './ui/button';
import { useTheme } from '@/components/theme-provider';
import { Moon, Sun } from 'lucide-react';

interface SidebarProps {
  categories: Category[];
  selectedCategory: string | null;
  onSelectCategory: (category: string | null) => void;
}

export const Sidebar = ({
  categories,
  selectedCategory,
  onSelectCategory,
}: SidebarProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const { theme, setTheme } = useTheme();

  return (
    <>
      <div className="fixed top-4 right-4 flex items-center gap-2 z-50 lg:hidden">
        <Button
          variant="outline"
          size="icon"
          onClick={() => setTheme(theme === "light" ? "dark" : "light")}
        >
          {theme === "light" ? (
            <Moon className="h-4 w-4" />
          ) : (
            <Sun className="h-4 w-4" />
          )}
        </Button>
        <Button
          variant="outline"
          size="icon"
          onClick={() => setIsOpen(!isOpen)}
        >
          <Menu className="h-4 w-4" />
        </Button>
      </div>

      <div className={cn(
        "fixed inset-y-0 left-0 z-40 w-64 bg-background border-r shadow-md p-4 transform transition-transform duration-200 ease-in-out lg:translate-x-0 lg:static",
        isOpen ? "translate-x-0" : "-translate-x-full"
      )}>
        <div className="space-y-4 mt-16 lg:mt-0">
          <h2 className="text-lg font-semibold">Categories</h2>
          <div className="space-y-2">
            <button
              onClick={() => onSelectCategory(null)}
              className={cn(
                "w-full text-left px-4 py-2 rounded-md transition-colors",
                selectedCategory === null
                  ? "bg-primary text-primary-foreground"
                  : "hover:bg-muted"
              )}
            >
              All Palettes
            </button>
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => onSelectCategory(category.id)}
                className={cn(
                  "w-full text-left px-4 py-2 rounded-md transition-colors",
                  selectedCategory === category.id
                    ? "bg-primary text-primary-foreground"
                    : "hover:bg-muted"
                )}
              >
                {category.name}
              </button>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};