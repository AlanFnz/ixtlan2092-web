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
              if (this.building === 'building-2') this.building = 'building-3';
              if (this.building === 'building-1') this.building = 'building-2';
              if (this.building === undefined) this.building = 'building-1';
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

