import { ICity } from '..';
import { BUILDING_TYPE, BuildingType } from './constants';
import { IBuilding } from './interfaces';

class Building implements IBuilding {
  id: string = crypto.randomUUID();
  name: string = 'Building';
  type: BuildingType = BUILDING_TYPE.BUILDING;
  isMeshOutOfDate: boolean = true;
  hideTerrain: boolean = false;
  rotation: number | undefined;

  constructor(public x: number, public y: number) {}

  update(city: ICity): void {}

  /**
   * update the state of this building by one simulation step
   */
  step(city: ICity): void {}

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

