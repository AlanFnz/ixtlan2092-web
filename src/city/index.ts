import { Citizen } from './citizen/constants';
import { City, Coordinate, Tile } from './constants';
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

  function getPopulation() {
    return citizens.length.toString();
  }

  function getTileNeighbors(coordinate: Coordinate): Tile[] {
    const { x, y } = coordinate;
    const neighbors: Tile[] = [];

    if (x > 0) {
      neighbors.push(tiles[x - 1][y]);
    }
    if (x < size - 1) {
      neighbors.push(tiles[x + 1][y]);
    }
    if (y > 0) {
      neighbors.push(tiles[x][y - 1]);
    }
    if (y < size - 1) {
      neighbors.push(tiles[x][y + 1]);
    }

    return neighbors;
  }

  initData();

  return {
    // props
    size,
    tiles,
    citizens,

    // functions
    update,
    getPopulation,
  };
}

