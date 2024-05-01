import { ASSET_ID } from '../../assets';
import { createBuilding, isValidBuildingId } from '../building';
import { Tile } from '../constants';

function createTile(x: number, y: number): Tile {
  return {
    // props
    id: crypto.randomUUID(),
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
    toHTML() {
      let html = '';
      html += `Coordinates: (X: ${this.x}, Y: ${this.y})<br>`;
      html += `Terrain: ${this.terrainId}<br>`;

      if (this.building) {
        // TODO:
      }

      return html;
    },
  };
}

export { createTile };

