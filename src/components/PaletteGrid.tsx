import { ColorPalette as ColorPaletteType } from '@/types';
import { ColorPalette } from './ColorPalette';

interface PaletteGridProps {
  palettes: ColorPaletteType[];
}

export const PaletteGrid = ({ palettes }: PaletteGridProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
      {palettes.map((palette) => (
        <ColorPalette key={palette.id} palette={palette} />
      ))}
    </div>
  );
};