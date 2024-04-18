import { Citizen } from './citizen/constants';
import { City, Tile } from './constants';
import { createTile } from './tile';

export function createCity(size: number): City {
  const tiles: Tile[][] = [];
  const citizens: Citizen[] = [];

  function initData(this: any) {
    for (let x = 0; x < size; x++) {
      const column: Tile[] = [];
      for (let y = 0; y < size; y++) {
        const tile: Tile = createTile(x, y);
        column.push(tile);
      }
      tiles.push(column);
    }
  }

  function update(this: City) {
    for (let x = 0; x < size; x++) {
      for (let y = 0; y < size; y++) {
        tiles[x][y].building?.update(this);
      }
    }
  }

  initData();

  return {
    size,
    tiles,
    citizens,
    update,
  };
}

