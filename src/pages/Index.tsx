import { useState } from 'react';
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
  { id: '1', colors: ['#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4'] },
  { id: '2', colors: ['#FFBE0B', '#FB5607', '#FF006E', '#8338EC'] },
  { id: '3', colors: ['#2D00F7', '#6A00F4', '#8900F2', '#A100F2'] },
];

const Index = () => {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [palettes, setPalettes] = useState<ColorPalette[]>(SAMPLE_PALETTES);

  const handleRandomPalette = () => {
    const newPalette: ColorPalette = {
      id: Date.now().toString(),
      colors: generateRandomPalette(),
    };
    setPalettes([newPalette, ...palettes]);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex">
      <Sidebar
        categories={SAMPLE_CATEGORIES}
        selectedCategory={selectedCategory}
        onSelectCategory={setSelectedCategory}
      />
      <div className="flex-1">
        <header className="bg-white shadow-sm p-6">
          <div className="flex items-center justify-between max-w-7xl mx-auto">
            <div className="flex items-center space-x-2">
              <Palette className="h-6 w-6" />
              <h1 className="text-2xl font-bold">Color Palette Generator</h1>
            </div>
            <Button
              onClick={handleRandomPalette}
              className="flex items-center space-x-2"
            >
              <Shuffle className="h-4 w-4" />
              <span>Random Palette</span>
            </Button>
          </div>
        </header>
        <main className="max-w-7xl mx-auto">
          <PaletteGrid palettes={palettes} />
        </main>
      </div>
    </div>
  );
};

export default Index;