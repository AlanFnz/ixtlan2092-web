import { Building } from "../buildings/constants";

interface Tile {
  x: number;
  y: number;
  terrainId: string | undefined;
  building: Building | undefined;
}

interface City {
  size: number;
  tiles: Tile[][];
  update: () => void;
}

export { Tile, City };

