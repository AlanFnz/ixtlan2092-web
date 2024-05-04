import { ActiveToolId } from '../../game/constants';
import { Building } from '../building/constants';

interface Tile {
  id: string;
  x: number;
  y: number;
  terrainId: string | undefined;
  building: Building | undefined | null;
  removeBuilding: () => void;
  placeBuilding: (activeToolId: ActiveToolId) => void;
  distanceTo: (tile: Tile) => number;
  toHTML: () => string;
}

export { Tile };

