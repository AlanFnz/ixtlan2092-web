import { City, Tile } from './constants';
import { createTile } from './tile';

export function createCity(size: number): City {
  const tiles: Tile[][] = [];

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

  function update() {
    for (let x = 0; x < size; x++) {
      const column: Tile[] = [];
      for (let y = 0; y < size; y++) {
        tiles[x][y].building?.update();
      }
    }
  }

  initData();

  return {
    size,
    tiles,
    update,
  };
}

