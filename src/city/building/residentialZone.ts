import CONFIG from '../../config';
import { Zone } from './zone';
import { IResidentialZone } from './interfaces';
import { BUILDING_TYPE } from './constants';
import { Citizen, ICitizen } from '../citizen';
import { ICity } from '..';

export class ResidentialZone extends Zone implements IResidentialZone {
  residents: ICitizen[];

  constructor(x: number, y: number) {
    super(x, y);
    this.type = BUILDING_TYPE.RESIDENTIAL;
    this.residents = [];
    this.maxLevel = 3;
  }

  step(city: ICity): void {
    super.step(city);

    if (this.abandoned) {
      this.evictResidents();
    } else if (
      this.developed &&
      this.residents.length < CONFIG.ZONE.MAX_RESIDENTS &&
      Math.random() < CONFIG.ZONE.RESIDENT_MOVE_IN_CHANCE
    ) {
      const resident = new Citizen(this);
      this.residents.push(resident);
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
    html += `<br><strong>Residents</strong>`;

    html += '<ul style="margin-top: 0; padding-left: 20px;">';
    if (this.residents.length > 0) {
      for (const resident of this.residents) {
        html += resident.toHTML();
      }
    } else {
      html += '<li>None</li>';
    }
    html += '</ul>';

    return html;
  }
}

