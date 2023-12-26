import { City, Tile } from './constants';

export function createCity(size: number): City {
  const data: Tile[][] = [];

  function initData() {
    for (let x = 0; x < size; x++) {
      const column: Tile[] = [];
      for (let y = 0; y < size; y++) {
        const tile = { x, y };
        column.push(tile);
      }

      data.push(column);
    }
  }

  initData();

  return {
    size,
    data,
  };
}

