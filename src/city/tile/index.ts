import { ASSET_ID } from '../../assets';
import { createBuilding } from '../building';
import { isValidBuildingId } from '../building/utils';
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
        this.building = createBuilding(x, y, activeToolId);
      }
    },
    distanceTo(tile: Tile) {
      return Math.abs(this.x - tile.x) + Math.abs(this.y - tile.y);
    },
    toHTML() {
      let html = '';
      html += `Coordinates: (X: ${this.x}, Y: ${this.y})<br>`;
      html += `Terrain: ${this.terrainId}<br>`;

      if (this.building) {
        html += this.building.toHTML();
      }

      return html;
    },
  };
}

export { createTile };

