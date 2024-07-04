import { ICity } from '..';
import CONFIG from '../../config';
import { DevelopmentAttribute } from './attributes/development';
import { Building } from './building';
import { BUILDING_TYPE } from './constants';
import { IZone } from './interfaces';

class Zone extends Building implements IZone {
  style: string;
  abandoned: boolean;
  development: DevelopmentAttribute;
  hasRoadAccess: boolean;
  level: number;
  rotation: number;
  maxLevel: number;
  abandonmentCounter: number;

  constructor(x: number, y: number) {
    super(x, y);
    this.style = String.fromCharCode(Math.floor(3 * Math.random()) + 65);
    this.abandoned = false;
    this.development = new DevelopmentAttribute(this);
    this.hasRoadAccess = false;
    this.level = 1;
    this.rotation = 90 * Math.floor(4 * Math.random());
    this.maxLevel = 1;
    this.abandonmentCounter = 0;
  }

  step(city: ICity): void {
    super.step(city);
    this.development.update(city);
  }

  private checkDevelopmentCriteria(city: ICity): boolean {
    this.checkRoadAccess(city);
    return this.hasRoadAccess;
  }

  private checkRoadAccess(city: ICity): void {
    const road = city.findTile(
      { x: this.x, y: this.y },
      (tile) => tile.building?.type === BUILDING_TYPE.ROAD,
      CONFIG.ZONE.MAX_ROAD_SEARCH_DISTANCE
    );
    this.hasRoadAccess = !!road;
  }

  toHTML(): string {
    let html = super.toHTML();
    html += `
    <span class="info-label">Style:</span>
    <span class="info-value">${this.style}</span>
    <br>
    <span class="info-label">Abandoned:</span>
    <span class="info-value">${this.abandoned} (${this.abandonmentCounter}/${CONFIG.ZONE.ABANDONMENT_THRESHOLD})</span>
    <br>
    <span class="info-label">Road Access:</span>
    <span class="info-value">${this.hasRoadAccess}</span>
    <br>
    <span class="info-label">development:</span>
    <span class="info-value">${this.development}</span>
    <br>
    <span class="info-label">Level:</span>
    <span class="info-value">${this.level}</span>
    <br>
    `;
    return html;
  }
}

export { Zone, IZone };

