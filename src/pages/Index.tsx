import { useState, useMemo } from 'react';
import { PaletteGrid } from '@/components/PaletteGrid';
import { Sidebar } from '@/components/Sidebar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { generateRandomPalette } from '@/lib/colorUtils';
import { Palette, Shuffle, Search } from 'lucide-react';
import { ColorPalette, Category } from '@/types';

const SAMPLE_CATEGORIES: Category[] = [
  { id: 'pastel', name: 'Pastel' },
  { id: 'vintage', name: 'Vintage' },
  { id: 'neon', name: 'Neon' },
  { id: 'warm', name: 'Warm' },
  { id: 'cold', name: 'Cold' },
];

const SAMPLE_PALETTES: ColorPalette[] = [
  { id: '1', colors: ['#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4'], category: 'pastel' },
  { id: '2', colors: ['#FFBE0B', '#FB5607', '#FF006E', '#8338EC'], category: 'neon' },
  { id: '3', colors: ['#2D00F7', '#6A00F4', '#8900F2', '#A100F2'], category: 'cold' },
];

// Color name to hex mapping
const COLOR_NAMES: { [key: string]: string[] } = {
  red: ['#FF0000', '#FF6B6B', '#FF4444', '#FF6666'],
  blue: ['#0000FF', '#4ECDC4', '#45B7D1', '#2D00F7'],
  yellow: ['#FFFF00', '#FFBE0B', '#FFD700'],
  green: ['#00FF00', '#96CEB4', '#4ECDC4'],
  purple: ['#800080', '#8338EC', '#6A00F4', '#8900F2'],
  orange: ['#FFA500', '#FB5607', '#FF6B6B'],
  pink: ['#FFC0CB', '#FF006E', '#FF69B4'],
};

const Index = () => {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [palettes, setPalettes] = useState<ColorPalette[]>(SAMPLE_PALETTES);

  const handleRandomPalette = () => {
    const newPalette: ColorPalette = {
      id: Date.now().toString(),
      colors: generateRandomPalette(),
      category: selectedCategory || undefined,
    };
    setPalettes([newPalette, ...palettes]);
  };

  const filteredPalettes = useMemo(() => {
    return palettes.filter((palette) => {
      const matchesCategory = !selectedCategory || palette.category === selectedCategory;
      const searchTermLower = searchTerm.toLowerCase();
      
      // Check if search term matches a color name
      const matchesColorName = Object.entries(COLOR_NAMES).some(([name, hexCodes]) => {
        if (name.includes(searchTermLower)) {
          return palette.colors.some(color => 
            hexCodes.some(hex => color.toLowerCase().includes(hex.toLowerCase()))
          );
        }
        return false;
      });

      // Check if search term matches hex code
      const matchesHex = palette.colors.some(color => 
        color.toLowerCase().includes(searchTermLower)
      );

      return matchesCategory && (searchTerm === '' || matchesHex || matchesColorName);
    });
  }, [palettes, selectedCategory, searchTerm]);

  return (
    <div className="min-h-screen bg-background flex flex-col lg:flex-row">
      <Sidebar
        categories={SAMPLE_CATEGORIES}
        selectedCategory={selectedCategory}
        onSelectCategory={setSelectedCategory}
      />
      <div className="flex-1">
        <header className="bg-card shadow-sm p-4 lg:p-6 mt-16 lg:mt-0">
          <div className="flex flex-col lg:flex-row items-center justify-between max-w-7xl mx-auto gap-4">
            <div className="flex items-center space-x-2">
              <Palette className="h-6 w-6" />
              <h1 className="text-xl lg:text-2xl font-bold">Color Palette Generator</h1>
            </div>
            <div className="flex w-full lg:w-auto items-center gap-2">
              <div className="relative flex-1 lg:w-64">
                <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  type="search"
                  placeholder="Search by color name or hex (e.g., blue, #FF0000)"
                  className="pl-8"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <Button
                onClick={handleRandomPalette}
                className="flex items-center space-x-2 whitespace-nowrap"
              >
                <Shuffle className="h-4 w-4" />
                <span>Random Palette</span>
              </Button>
            </div>
          </div>
        </header>
        <main className="max-w-7xl mx-auto p-4">
          <PaletteGrid palettes={filteredPalettes} />
        </main>
      </div>
    </div>
  );
};

export default Index;
