export interface ColorPalette {
  id: string;
  colors: string[];
  category?: string;
  likes?: number;
}

export type Category = {
  id: string;
  name: string;
  icon?: string;
};