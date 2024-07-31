import { ICity } from "../..";
import CONFIG from "../../../config";
import { ITile } from "../../tile";
import { BUILDING_TYPE } from "../constants";

export interface IRoadAccessAttribute {
  tile: ITile;
  value: boolean;
  simulate(city: ICity): void;
}

export class RoadAccessAttribute {
  tile: ITile;
  value: boolean;

  constructor(tile: ITile) {
    this.tile = tile;
    this.value = false;
  }

  simulate(city: ICity): void {
    const road = city.findTile(
      this.tile,
      (tile) => tile.building?.type === BUILDING_TYPE.ROAD,
      CONFIG.ATTRIBUTES.ROAD_ACCESS.SEARCH_DISTANCE
    );

    this.value = road !== null;
  }
}
