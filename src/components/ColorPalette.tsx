import { useState } from 'react';
import { toast } from 'sonner';
import { ColorPalette as ColorPaletteType } from '@/types';
import { copyToClipboard } from '@/lib/colorUtils';

interface ColorPaletteProps {
  palette: ColorPaletteType;
}

export const ColorPalette = ({ palette }: ColorPaletteProps) => {
  const [hoveredColor, setHoveredColor] = useState<string | null>(null);

  const handleColorClick = async (color: string) => {
    const success = await copyToClipboard(color);
    if (success) {
      toast.success(`Copied ${color} to clipboard!`);
    }
  };

  return (
    <div className="bg-card rounded-lg shadow-md overflow-hidden animate-fade-in transition-all duration-300 ease-in-out hover:shadow-lg transform hover:-translate-y-1">
      <div className="flex h-32">
        {palette.colors.map((color, index) => (
          <div
            key={`${palette.id}-${index}`}
            className="relative flex-1 cursor-pointer transition-transform hover:scale-105"
            style={{ backgroundColor: color }}
            onClick={() => handleColorClick(color)}
            onMouseEnter={() => setHoveredColor(color)}
            onMouseLeave={() => setHoveredColor(null)}
          >
            {hoveredColor === color && (
              <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 text-white text-sm font-medium">
                {color.toUpperCase()}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};