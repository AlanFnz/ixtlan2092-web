import { Tile } from './tile/constants';

interface Coordinate {
  x: number;
  y: number;
}

interface City {
  size: number;
  update: () => void;
  getPopulation: () => string;
  getTileByCoordinate: (coordinate: Coordinate) => Tile | null;
  getTileByBuildingId: (id: string) => Tile | undefined;
  findTile: (
    start: Coordinate,
    searchCriteria: (tile: Tile) => boolean,
    maxDistance: number
  ) => Tile | null;
}

export { Tile, City, Coordinate };

