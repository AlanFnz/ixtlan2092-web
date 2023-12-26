interface Tile {
  x: number;
  y: number;
}

interface City {
  size: number;
  data: Tile[][];
}

export { Tile, City };

