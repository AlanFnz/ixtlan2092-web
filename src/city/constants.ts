interface Tile {
  x: number;
  y: number;
  building: string | undefined;
  update: () => void;
}

interface City {
  size: number;
  data: Tile[][];
  update: () => void;
}

export { Tile, City };

