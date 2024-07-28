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
  simulate(city: ICity): void {}

  /**
   * cleanup before building removal
   */
  dispose(): void {}

  toHTML(): string {
    let html = `
      <div class="info-heading">Building</div>
      <span class="info-label">Name:</span>
      <span class="info-value">${this.name}</span>
      <br>
      <span class="info-label">Type:</span>
      <span class="info-value">${this.type}</span>
      <br>
    `;
    return html;
  }
}

export { Building };

