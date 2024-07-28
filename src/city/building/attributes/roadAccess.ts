import { ICity } from "../..";
import CONFIG from "../../../config";
import { ITile } from "../../tile";
import { BUILDING_TYPE } from "../constants";

export class RoadAccessAttribute {
  private tile: ITile;
  value: boolean;

  constructor(tile: ITile) {
    this.tile = tile;
    this.value = false;
  }

  update(city: ICity): void {
    const road = city.findTile(
      this.tile,
      (tile) => tile.building?.type === BUILDING_TYPE.ROAD,
      CONFIG.ATTRIBUTES.ROAD_ACCESS.SEARCH_DISTANCE
    );

    this.value = road !== null;
  }
}
