import { ICity } from '..';
import CONFIG from '../../config';
import { Building } from './building';
import { BUILDING_TYPE } from './constants';
import { IZone } from './interfaces';

class Zone extends Building implements IZone {
  style: number;
  abandoned: boolean;
  developed: boolean;
  hasRoadAccess: boolean;
  level: number;
  abandonmentCounter: number;

  constructor(x: number, y: number) {
    super(x, y);
    this.style = Math.floor(3 * Math.random()) + 1;
    this.abandoned = false;
    this.developed = false;
    this.hasRoadAccess = false;
    this.level = 1;
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
      if (this.abandonmentCounter < CONFIG.ZONE.ABANDONMENT_THRESHOLD) this.abandonmentCounter++;
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
    html += `Style: ${this.style}<br>`;
    html += `Abandoned: ${this.abandoned} (${this.abandonmentCounter}/${CONFIG.ZONE.ABANDONMENT_THRESHOLD})<br>`;
    html += `Road Access: ${this.hasRoadAccess}<br>`;
    html += `Developed: ${this.developed}<br>`;
    html += `Level: ${this.level}<br>`;
    return html;
  }
}

export { Zone, IZone };

