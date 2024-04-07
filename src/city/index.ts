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
        data[x][y].building?.update();
      }
    }
  }

  function createTile(x: number, y: number): Tile {
    return {
      x,
      y,
      terrainId: ASSET_ID.GRASS,
      building: undefined,
    };
  }

  initData();

  return {
    size,
    data,
    update,
  };
}

