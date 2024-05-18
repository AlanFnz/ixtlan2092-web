import { Zone } from './zone';
import { generateIndustrialBuildingName } from './utils';
import { IIndustrialZone } from './interfaces';
import { BUILDING_TYPE } from './constants';
import { ICitizen } from '../citizen';
import { ICity } from '..';
import config from '../../config';

export class IndustrialZone extends Zone implements IIndustrialZone {
  workers: ICitizen[];
  maxWorkers: number;

  constructor(x: number, y: number) {
    super(x, y);
    this.name = generateIndustrialBuildingName();
    this.type = BUILDING_TYPE.INDUSTRIAL;
    this.workers = [];
    this.level = 1;
    this.maxWorkers = 4;
    this.maxLevel = 1; // limiting to one due to lack of industrial models
  }

  getMaxWorkers() {
    return Math.pow(config.ZONE.MAX_WORKERS, this.level);
  }

  numberOfJobsAvailable(): number {
    return this.abandoned || !this.developed
      ? 0
      : this.getMaxWorkers() - this.workers.length;
  }

  numberOfJobsFilled(): number {
    return this.workers.length;
  }

  step(city: ICity): void {
    super.step(city);
    if (this.abandoned) {
      this.layOffWorkers();
      return
    }

    if (this.developed) {
      if (Math.random() < 0.03 && this.level < this.maxLevel) {
        this.level++;
      }
    }
  }

  private layOffWorkers(): void {
    for (const worker of this.workers) {
      // TODO: set here the workplace as null
    }
    this.workers = [];
  }

  dispose(): void {
    this.layOffWorkers();
    super.dispose();
  }

  toHTML(): string {
    let html = super.toHTML();
    html += `<br><strong>Workers (${this.numberOfJobsFilled()}/${this.getMaxWorkers()})</strong>`;

    html += '<ul style="margin-top: 0; padding-left: 20px;">';
    if (this.workers.length > 0) {
      for (const worker of this.workers) {
        html += worker.toHTML();
      }
    } else {
      html += '<li>None</li>';
    }
    html += '</ul>';

    return html;
  }
}

