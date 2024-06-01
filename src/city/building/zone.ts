import { ICity } from '..';
import CONFIG from '../../config';
import { Building } from './building';
import { BUILDING_TYPE } from './constants';
import { IZone } from './interfaces';

class Zone extends Building implements IZone {
  style: string;
  abandoned: boolean;
  developed: boolean;
  hasRoadAccess: boolean;
  level: number;
  rotation: number;
  maxLevel: number;
  abandonmentCounter: number;

  constructor(x: number, y: number) {
    super(x, y);
    this.style = String.fromCharCode(Math.floor(3 * Math.random()) + 65);
    this.abandoned = false;
    this.developed = false;
    this.hasRoadAccess = false;
    this.level = 1;
    this.rotation = 90 * Math.floor(4 * Math.random());
    this.maxLevel = 1;
    this.abandonmentCounter = 0;
  }

  update(city: ICity): void {
    this.checkRoadAccess(city);
  }

  step(city: ICity): void {
    super.step(city);

    if (this.checkDevelopmentCriteria()) {
      this.abandonmentCounter = 0;
      if (Math.random() < CONFIG.ZONE.DEVELOPMENT_CHANCE) {
        this.abandoned = false;
        this.developed = true;
        this.isMeshOutOfDate = true;
      }
    } else {
      if (this.abandonmentCounter < CONFIG.ZONE.ABANDONMENT_THRESHOLD)
        this.abandonmentCounter++;
      if (this.abandonmentCounter >= CONFIG.ZONE.ABANDONMENT_THRESHOLD) {
        if (Math.random() < CONFIG.ZONE.ABANDONMENT_CHANCE) {
          this.abandoned = true;
          this.isMeshOutOfDate = true;
        }
      }
    }
  }

  private checkDevelopmentCriteria(): boolean {
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
    <span class="info-label">Developed:</span>
    <span class="info-value">${this.developed}</span>
    <br>
    <span class="info-label">Level:</span>
    <span class="info-value">${this.level}</span>
    <br>
    `;
    return html;
  }
}

export { Zone, IZone };

