import { Building } from './building';
import { BUILDING_TYPE } from './constants';

export interface IRoad {}

export class Road extends Building implements IRoad {
  constructor(x: number, y: number) {
    super(x, y);
    this.type = BUILDING_TYPE.ROAD;
  }
}

