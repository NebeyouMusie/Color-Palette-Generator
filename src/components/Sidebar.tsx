import { Category } from '@/types';
import { cn } from '@/lib/utils';
import { Input } from '@/components/ui/input';
import { useState } from 'react';
import { Menu } from 'lucide-react';
import { Button } from './ui/button';

interface SidebarProps {
  categories: Category[];
  selectedCategory: string | null;
  onSelectCategory: (category: string | null) => void;
  onSearch: (term: string) => void;
}

export const Sidebar = ({
  categories,
  selectedCategory,
  onSelectCategory,
  onSearch,
}: SidebarProps) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <Button
        variant="outline"
        size="icon"
        className="fixed top-4 left-4 z-50 lg:hidden"
        onClick={() => setIsOpen(!isOpen)}
      >
        <Menu className="h-4 w-4" />
      </Button>

      <div className={cn(
        "fixed inset-y-0 left-0 z-40 w-64 bg-white shadow-md p-4 transform transition-transform duration-200 ease-in-out lg:translate-x-0 lg:static",
        isOpen ? "translate-x-0" : "-translate-x-full"
      )}>
        <div className="space-y-4">
          <Input
            type="search"
            placeholder="Search palettes..."
            className="w-full"
            onChange={(e) => onSearch(e.target.value)}
          />
          
          <h2 className="text-lg font-semibold">Categories</h2>
          <div className="space-y-2">
            <button
              onClick={() => onSelectCategory(null)}
              className={cn(
                "w-full text-left px-4 py-2 rounded-md transition-colors",
                selectedCategory === null
                  ? "bg-primary text-white"
                  : "hover:bg-gray-100"
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
                    ? "bg-primary text-white"
                    : "hover:bg-gray-100"
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