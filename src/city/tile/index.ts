import { ASSET_ID } from '../../assets';
import { createBuilding, isValidBuildingId } from '../building';
import { Tile } from '../constants';

function createTile(x: number, y: number): Tile {
  return {
    // props
    x,
    y,
    terrainId: ASSET_ID.GROUND,
    building: undefined,

    // functions
    removeBuilding() {
      this.building = null;
    },
    placeBuilding(activeToolId) {
      if (activeToolId && isValidBuildingId(activeToolId)) {
        this.building = createBuilding(activeToolId);
      }
    },
  };
}

export { createTile };

