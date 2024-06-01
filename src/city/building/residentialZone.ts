import CONFIG from '../../config';
import { Zone } from './zone';
import { IResidentialZone } from './interfaces';
import { BUILDING_TYPE } from './constants';
import { Citizen, ICitizen } from '../citizen';
import { ICity } from '..';
import config from '../../config';

export class ResidentialZone extends Zone implements IResidentialZone {
  residents: ICitizen[];

  constructor(x: number, y: number) {
    super(x, y);
    this.type = BUILDING_TYPE.RESIDENTIAL;
    this.residents = [];
    this.level = 1;
    this.maxLevel = 3;
  }

  getMaxResidents() {
    return Math.pow(config.ZONE.MAX_RESIDENTS, this.level);
  }

  step(city: ICity): void {
    super.step(city);

    if (this.abandoned) {
      this.evictResidents();
      return;
    }
    if (this.developed) {
      if (
        this.developed &&
        this.residents.length < CONFIG.ZONE.MAX_RESIDENTS &&
        Math.random() < CONFIG.ZONE.RESIDENT_MOVE_IN_CHANCE
      ) {
        const resident = new Citizen(this);
        this.residents.push(resident);
      } else {
        if (Math.random() < 0.03 && this.level < this.maxLevel) {
          this.level++;
        }
      }
    }
  }

  private evictResidents(): void {
    for (const resident of this.residents) {
      // TODO: call here resident dispose method when available
    }
    this.residents = [];
  }

  dispose(): void {
    this.evictResidents();
    super.dispose();
  }

  toHTML(): string {
    let html = super.toHTML();
    html += `
      <div class="info-heading">Residents (${
        this.residents.length
      }/${this.getMaxResidents()})</div>`;

    html += '<ul class="info-citizen-list">';
    for (const resident of this.residents) {
      html += resident.toHTML();
    }
    html += '</ul>';
    return html;
  }
}

