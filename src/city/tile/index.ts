import { ASSET_ID } from '../../assets';
import { Tile } from '../constants';

function createTile(x: number, y: number): Tile {
  return {
    x,
    y,
    terrainId: ASSET_ID.GROUND,
    building: undefined,
  };
}

export { createTile };
