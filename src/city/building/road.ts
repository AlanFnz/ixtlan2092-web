import { ICity } from '..';
import { Building } from './building';
import { BUILDING_TYPE, BuildingType } from './constants';

export interface IRoad {}

export class Road extends Building implements IRoad {
  style: string;
  hideTerrain: boolean;

  constructor(x: number, y: number) {
    super(x, y);
    this.name = 'Two-Lane Road';
    this.type = BUILDING_TYPE.ROAD;
    this.style = 'STRAIGHT';
    this.hideTerrain = true;
  }

  update(city: ICity): void {
    // check which adjacent tiles are roads
    const top =
      city.getTile(this.x, this.y + 1)?.building?.type === this.type ?? false;
    const bottom =
      city.getTile(this.x, this.y - 1)?.building?.type === this.type ?? false;
    const left =
      city.getTile(this.x - 1, this.y)?.building?.type === this.type ?? false;
    const right =
      city.getTile(this.x + 1, this.y)?.building?.type === this.type ?? false;

    // check all combinations
    // four-way intersection
    if (top && bottom && left && right) {
      this.style = 'INTERSECTION';
      this.rotation = 0;
      // T intersection
    } else if (!top && bottom && left && right) {
      // bottom-left-right
      this.style = 'TEE';
      this.rotation = 180;
    } else if (top && !bottom && left && right) {
      // top-left-right
      this.style = 'TEE';
      this.rotation = 0;
    } else if (top && bottom && !left && right) {
      // top-bottom-right
      this.style = 'TEE';
      this.rotation = 90;
    } else if (top && bottom && left && !right) {
      // top-bottom-left
      this.style = 'TEE';
      this.rotation = 270;
      // Corner
    } else if (top && !bottom && left && !right) {
      // top-left
      this.style = 'CORNER';
      this.rotation = 270;
    } else if (top && !bottom && !left && right) {
      // top-right
      this.style = 'CORNER';
      this.rotation = 0;
    } else if (!top && bottom && left && !right) {
      // bottom-left
      this.style = 'CORNER';
      this.rotation = 180;
    } else if (!top && bottom && !left && right) {
      // bottom-right
      this.style = 'CORNER';
      this.rotation = 90;
      // Straight
    } else if (top && bottom && !left && !right) {
      // top-bottom
      this.style = 'STRAIGHT';
      this.rotation = 0;
    } else if (!top && !bottom && left && right) {
      // left-right
      this.style = 'STRAIGHT';
      this.rotation = 90;
      // Dead end
    } else if (top && !bottom && !left && !right) {
      // top
      this.style = 'END';
      this.rotation = 0;
    } else if (!top && bottom && !left && !right) {
      // bottom
      this.style = 'END';
      this.rotation = 180;
    } else if (!top && !bottom && left && !right) {
      // left
      this.style = 'END';
      this.rotation = 270;
    } else if (!top && !bottom && !left && right) {
      // right
      this.style = 'END';
      this.rotation = 90;
    }

    this.isMeshOutOfDate = true;
  }
}

