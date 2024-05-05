import { ActiveToolId } from '../../game/constants';
import { BuildingEntity } from '../building/buildingCreator';
import { CommercialZone } from '../building/commercialZone';
import { Building } from '../building/constants';
import { IndustrialZone } from '../building/industrialZone';
import { ResidentialZone } from '../building/residentialZone';

interface Tile {
  id: string;
  x: number;
  y: number;
  terrainId: string | undefined;
  building: BuildingEntity | undefined;
  removeBuilding: () => void;
  placeBuilding: (activeToolId: ActiveToolId) => void;
  distanceTo: (tile: Tile) => number;
  toHTML: () => string;
}

export { Tile };

