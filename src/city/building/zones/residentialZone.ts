import { Zone } from './zone';
import { IResidentialZone } from '../interfaces';
import { BUILDING_TYPE } from '../constants';
import { ICity } from '../..';
import { ResidentsAttribute } from '../attributes/residents';

export class ResidentialZone extends Zone implements IResidentialZone {
  residents: ResidentsAttribute;

  constructor(x: number, y: number) {
    super(x, y);
    this.type = BUILDING_TYPE.RESIDENTIAL;
    this.residents = new ResidentsAttribute(this);
    this.level = 1;
    this.maxLevel = 3;
  }

  step(city: ICity): void {
    super.step(city);
    this.residents.update(city);
  }

  dispose(): void {
    this.residents.dispose();
    super.dispose();
  }

  toHTML(): string {
    let html = super.toHTML();
    html += this.residents.toHTML();
    return html;
  }
}

