import { ActiveToolId } from "../game/constants";
import { Building } from "./building/constants";

interface Tile {
  x: number;
  y: number;
  terrainId: string | undefined;
  building: Building | undefined | null;
  removeBuilding: () => void;
  placeBuilding: (activeToolId: ActiveToolId) => void;
}

interface City {
  size: number;
  tiles: Tile[][];
  update: () => void;
}

export { Tile, City };

