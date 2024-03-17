interface Tile {
  x: number;
  y: number;
  building: boolean;
}

interface City {
  size: number;
  data: Tile[][];
}

export { Tile, City };

