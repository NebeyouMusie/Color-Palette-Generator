import { useState, useMemo } from 'react';
import { PaletteGrid } from '@/components/PaletteGrid';
import { Sidebar } from '@/components/Sidebar';
import { Button } from '@/components/ui/button';
import { generateRandomPalette } from '@/lib/colorUtils';
import { Palette, Shuffle } from 'lucide-react';
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
      const matchesSearch = !searchTerm || palette.colors.some(color => 
        color.toLowerCase().includes(searchTerm.toLowerCase())
      );
      return matchesCategory && matchesSearch;
    });
  }, [palettes, selectedCategory, searchTerm]);

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col lg:flex-row">
      <Sidebar
        categories={SAMPLE_CATEGORIES}
        selectedCategory={selectedCategory}
        onSelectCategory={setSelectedCategory}
        onSearch={setSearchTerm}
      />
      <div className="flex-1">
        <header className="bg-white shadow-sm p-4 lg:p-6 mt-16 lg:mt-0">
          <div className="flex flex-col lg:flex-row items-center justify-between max-w-7xl mx-auto gap-4">
            <div className="flex items-center space-x-2">
              <Palette className="h-6 w-6" />
              <h1 className="text-xl lg:text-2xl font-bold">Color Palette Generator</h1>
            </div>
            <Button
              onClick={handleRandomPalette}
              className="flex items-center space-x-2 w-full lg:w-auto"
            >
              <Shuffle className="h-4 w-4" />
              <span>Random Palette</span>
            </Button>
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