interface Tile {
  x: number;
  y: number;
  buildingId: string | undefined;
  update: () => void;
}

interface City {
  size: number;
  data: Tile[][];
  update: () => void;
}

export { Tile, City };

