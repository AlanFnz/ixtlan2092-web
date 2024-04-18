import { ActiveToolId } from '../game/constants';
import { Building } from './building/constants';
import { Citizen } from './citizen/constants';

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
  citizens: Citizen[];
  update: () => void;
}

export { Tile, City };

