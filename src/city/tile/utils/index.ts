import { ITile } from '..';
import { ICoordinate } from '../..';

function findTileByCoordinates(
  tiles: ITile[][],
  coordinate: ICoordinate
): ITile | undefined {
  // tiles is a 2D array
  if (
    coordinate.x < 0 ||
    coordinate.y < 0 ||
    coordinate.x >= tiles.length ||
    coordinate.y >= tiles[0].length
  ) {
    return undefined; // ensure the coordinates are within the bounds of the array.
  }

  return tiles[coordinate.x][coordinate.y];
}

export { findTileByCoordinates };

