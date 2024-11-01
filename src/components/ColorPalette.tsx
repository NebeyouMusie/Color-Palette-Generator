import { useState } from 'react';
import { toast } from 'sonner';
import { ColorPalette as ColorPaletteType } from '@/types';
import { copyToClipboard } from '@/lib/colorUtils';

interface ColorPaletteProps {
  palette: ColorPaletteType;
}

export const ColorPalette = ({ palette }: ColorPaletteProps) => {
  const [isHovered, setIsHovered] = useState(false);

  const handleColorClick = async (color: string) => {
    const success = await copyToClipboard(color);
    if (success) {
      toast.success(`Copied ${color} to clipboard!`);
    }
  };

  return (
    <div 
      className="bg-white rounded-lg shadow-md overflow-hidden animate-fade-in"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="flex h-32">
        {palette.colors.map((color, index) => (
          <div
            key={`${palette.id}-${index}`}
            className="color-swatch flex-1"
            style={{ backgroundColor: color }}
            onClick={() => handleColorClick(color)}
          >
            {isHovered && (
              <div className="color-swatch-tooltip">
                {color.toUpperCase()}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};