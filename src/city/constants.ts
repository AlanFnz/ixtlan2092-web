interface Tile {
  x: number;
  y: number;
  terrainId: string | undefined;
  buildingId: string | undefined;
  update: () => void;
}

interface City {
  size: number;
  data: Tile[][];
  update: () => void;
}

export { Tile, City };

