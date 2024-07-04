import { Zone } from './zone';
import { generateIndustrialBuildingName } from '../utils';
import { IIndustrialZone } from '../interfaces';
import { BUILDING_TYPE } from '../constants';
import { ICity } from '../..';
import config from '../../../config';
import { JobsAttribute } from '../attributes/jobs';

export class IndustrialZone extends Zone implements IIndustrialZone {
  jobs: JobsAttribute;

  constructor(x: number, y: number) {
    super(x, y);
    this.name = generateIndustrialBuildingName();
    this.type = BUILDING_TYPE.INDUSTRIAL;
    this.level = 1;
    this.maxLevel = 1; // limiting to one due to lack of industrial models
    this.jobs = new JobsAttribute(this);
  }

  step(city: ICity): void {
    super.step(city);
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

