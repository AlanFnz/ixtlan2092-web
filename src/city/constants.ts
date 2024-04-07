import { Building } from "../buildings/constants";

interface Tile {
  x: number;
  y: number;
  terrainId: string | undefined;
  building: Building | undefined;
}

interface City {
  size: number;
  data: Tile[][];
  update: () => void;
}

export { Tile, City };

