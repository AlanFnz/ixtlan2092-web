import { ICity } from '../..';
import CONFIG from '../../../config';
import { Citizen } from '../../citizen';
import { ResidentialZone } from '../residentialZone';
import { Zone } from '../zone';

export class ResidentsAttribute {
  private zone: Zone;
  private residents: Citizen[] = [];

  constructor(zone: Zone) {
    this.zone = zone;
  }

  get count(): number {
    return this.residents.length;
  }

  get maximum(): number {
    return Math.pow(CONFIG.ZONE.MAX_RESIDENTS, this.zone.development.level);
  }

  update(city: ICity): void {
    // If building is abandoned, all residents are evicted and no more residents are allowed to move in.
    if (
      this.zone.development.state === 'abandoned' &&
      this.residents.length > 0
    ) {
      this.evictAll();
    } else if (this.zone.development.state === 'developed') {
      // Move in new residents if there is room
      if (
        this.residents.length < this.maximum &&
        Math.random() < CONFIG.ZONE.RESIDENT_MOVE_IN_CHANCE
      ) {
        this.residents.push(new Citizen(this.zone as ResidentialZone));
      }
    }

    for (const resident of this.residents) {
      resident.step(city);
    }
  }

  evictAll(): void {
    for (const resident of this.residents) {
      resident.dispose();
    }
    this.residents = [];
  }

  dispose(): void {
    this.evictAll();
  }

  toHTML(): string {
    let html = `<div class="info-heading">Residents (${this.residents.length}/${this.maximum})</div>`;

    html += '<ul class="info-citizen-list">';
    for (const resident of this.residents) {
      html += resident.toHTML();
    }
    html += '</ul>';

    return html;
  }
}

