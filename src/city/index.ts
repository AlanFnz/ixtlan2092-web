import { ASSET_ID } from '../assets';
import { City, Tile } from './constants';

export function createCity(size: number): City {
  const data: Tile[][] = [];

  function initData() {
    for (let x = 0; x < size; x++) {
      const column: Tile[] = [];
      for (let y = 0; y < size; y++) {
        const tile: Tile = {
          x,
          y,
          building: undefined,
          update() {
            const x = Math.random();
            if (x < 0.01) {
              if (this.building === ASSET_ID.BUILDING_2)
                this.building = ASSET_ID.BUILDING_3;
              if (this.building === ASSET_ID.BUILDING_1)
                this.building = ASSET_ID.BUILDING_2;
              if (this.building === undefined)
                this.building = ASSET_ID.BUILDING_1;
            }
          },
        };
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

  initData();

  return {
    size,
    data,
    update,
  };
}

