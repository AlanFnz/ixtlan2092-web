import { DEG2RAD } from 'three/src/math/MathUtils';
import { ICity } from '../..';
import { DevelopmentAttribute } from '../attributes/development';
import { Building } from '../building';
import { IZone } from '../interfaces';

class Zone extends Building implements IZone {
  style: string;
  abandoned: boolean;
  development: DevelopmentAttribute;
  hasRoadAccess: boolean;
  level: number;
  rotation: { x: number; y: number };
  maxLevel: number;
  abandonmentCounter: number;

  constructor(x: number, y: number) {
    super(x, y);
    this.style = String.fromCharCode(Math.floor(3 * Math.random()) + 65);
    this.abandoned = false;
    this.development = new DevelopmentAttribute(this);
    this.hasRoadAccess = false;
    this.level = 1;
    this.rotation = { x: 0, y: 90 * Math.floor(4 * Math.random()) * DEG2RAD }; // Initialize rotation properly
    this.maxLevel = 1;
    this.abandonmentCounter = 0;
  }

  simulate(city: ICity): void {
    super.simulate(city);
    this.development.simulate(city);
  }

  toHTML(): string {
    let html = super.toHTML();
    html += this.development.toHTML();
    return html;
  }
}

export { Zone, IZone };
