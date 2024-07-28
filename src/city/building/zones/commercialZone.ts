import { Zone } from './zone';
import { generateCommericalBuildingName } from '../utils';
import { BUILDING_TYPE } from '../constants';
import { ICommercialZone } from '../interfaces';
import { ICity } from '../..';
import { JobsAttribute } from '../attributes/jobs';

export class CommercialZone extends Zone implements ICommercialZone {
  jobs: JobsAttribute;

  constructor(x: number, y: number) {
    super(x, y);
    this.name = generateCommericalBuildingName();
    this.type = BUILDING_TYPE.COMMERCIAL;
    this.level = 1;
    this.maxLevel = 3;
    this.jobs = new JobsAttribute(this);
  }

  simulate(city: ICity): void {
    super.simulate(city);
    this.jobs.update();
  }

  dispose(): void {
    this.jobs.dispose();
    super.dispose();
  }

  toHTML(): string {
    let html = super.toHTML();
    html += this.jobs.toHTML();
    return html;
  }
}

