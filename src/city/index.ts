import { ASSET_ID } from '../assets';
import { City, Tile } from './constants';

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

  function createTile(x: number, y: number): Tile {
    return {
      x,
      y,
      terrainId: ASSET_ID.GROUND,
      building: undefined,
    };
  }

  initData();

  return {
    size,
    tiles,
    update,
  };
}

