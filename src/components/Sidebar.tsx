import { Category } from '@/types';
import { cn } from '@/lib/utils';

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
  return (
    <div className="w-64 bg-white shadow-md p-4 animate-slide-in">
      <h2 className="text-lg font-semibold mb-4">Categories</h2>
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
  );
};