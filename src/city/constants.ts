interface Tile {
  x: number;
  y: number;
  building: boolean;
  update: () => void;
}

interface City {
  size: number;
  data: Tile[][];
  update: () => void;
}

export { Tile, City };

