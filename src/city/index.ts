import { Citizen } from './citizen/constants';
import { City, Coordinate, Tile } from './constants';
import { createTile } from './tile';
import { findTileByCoordinates } from './tile/utils';

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
    let population = 0;
    for (let x = 0; x < size; x++) {
      for (let y = 0; y < size; y++) {
        const tile = getTileByCoordinate({ x, y });
        if (tile) population += tile.building?.citizens?.length ?? 0;
      }
    }
    return population.toString();
  }

  function getTileByCoordinate(coordinate: Coordinate) {
    if (
      !coordinate ||
      typeof coordinate.x !== 'number' ||
      typeof coordinate.y !== 'number'
    ) {
      console.error('Invalid or missing coordinate values');
      return null;
    }

    if (
      coordinate.x < 0 ||
      coordinate.y < 0 ||
      coordinate.x >= tiles.length ||
      coordinate.y >= tiles[coordinate.x].length
    ) {
      console.error('Coordinate out of bounds');
      return null;
    }

    return tiles[coordinate.x][coordinate.y];
  }

  function getTileByBuildingId(tileId: string): Tile | undefined {
    for (let row of tiles) {
      for (let tile of row) {
        if (tile.building?.id === tileId) {
          return tile;
        }
      }
    }
    return undefined;
  }

  function findTile(
    start: Coordinate,
    searchCriteria: (tile: Tile) => boolean,
    maxDistance: number
  ) {
    const startTile: Tile | undefined = findTileByCoordinates(tiles, start);
    const visited = new Set();
    const tilesToSearch: Tile[] = [];

    if (startTile) tilesToSearch.push(startTile);

    while (tilesToSearch.length > 0) {
      const tile = tilesToSearch.shift();
      if (!tile) break;

      if (visited.has(tile?.id)) {
        continue;
      } else {
        visited.add(tile.id);
      }

      const distance = startTile?.distanceTo(tile);
      if (distance && distance > maxDistance) continue;

      if (searchCriteria(tile)) {
        return tile;
      } else {
        tilesToSearch.push(...getTileNeighbors({ x: tile.x, y: tile.y }));
      }
    }

    return null;
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

    // functions
    update,
    getPopulation,
    getTileByCoordinate,
    getTileByBuildingId,
    findTile,
  };
}

