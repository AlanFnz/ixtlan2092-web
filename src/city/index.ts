import { City, Tile } from './constants';

export function createCity(size: number): City {
  const data: Tile[][] = [];

  function initData() {
    for (let x = 0; x < size; x++) {
      const column: Tile[] = [];
      for (let y = 0; y < size; y++) {
        const tile = {
          x,
          y,
          building: false,
          update() {
            console.log(`updating tile ${x} ${y}`);
          },
        };
        column.push(tile);
        if (Math.random() > 0.7) tile.building = true;
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

