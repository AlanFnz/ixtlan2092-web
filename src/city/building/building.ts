import { City } from '../constants';
import { BUILDING_TYPE, BuildingType } from './constants';
import { IBuilding } from './interfaces';

class Building implements IBuilding {
  id: string = crypto.randomUUID();
  name: string = 'Building';
  type: BuildingType = BUILDING_TYPE.BUILDING;
  isMeshOutOfDate: boolean = true;

  constructor(public x: number, public y: number) {}

  update(city: City): void {}

  /**
   * update the state of this building by one simulation step
   */
  step(city: City): void {}

  /**
   * cleanup before building removal
   */
  dispose(): void {}

  toHTML(): string {
    let html = '';
    html += '<br><strong>Building</strong><br>';
    html += `Name: ${this.name}<br>`;
    html += `Type: ${this.type}<br>`;
    return html;
  }
}

export { Building };

