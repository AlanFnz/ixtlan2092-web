import { ASSET_ID } from '../assets';
import { City, Tile } from './constants';

export function createCity(size: number): City {
  const data: Tile[][] = [];

  function initData(this: any) {
    for (let x = 0; x < size; x++) {
      const column: Tile[] = [];
      for (let y = 0; y < size; y++) {
        const tile: Tile = createTile(x, y);
        column.push(tile);
      }
      data.push(column);
    }
  }

  function update() {
    for (let x = 0; x < size; x++) {
      const column: Tile[] = [];
      for (let y = 0; y < size; y++) {
        data[x][y].update();
      }
    }
  }

  function createTile(x: number, y: number): Tile {
    return {
      x,
      y,
      terrainId: ASSET_ID.GRASS,
      buildingId: undefined,
      update() {
        const x = Math.random();
        if (x < 0.01) {
          if (this.buildingId === ASSET_ID.BUILDING_2) this.buildingId = ASSET_ID.BUILDING_3;
          if (this.buildingId === ASSET_ID.BUILDING_1) this.buildingId = ASSET_ID.BUILDING_2;
          if (this.buildingId === undefined) this.buildingId = ASSET_ID.BUILDING_1;
        }
      },
    };
  }

  initData();

  return {
    size,
    data,
    update,
  };
}

