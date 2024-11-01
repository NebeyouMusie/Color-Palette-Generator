import { ColorPalette as ColorPaletteType } from '@/types';
import { ColorPalette } from './ColorPalette';

interface PaletteGridProps {
  palettes: ColorPaletteType[];
}

export const PaletteGrid = ({ palettes }: PaletteGridProps) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6">
      {palettes.map((palette) => (
        <ColorPalette key={palette.id} palette={palette} />
      ))}
    </div>
  );
};