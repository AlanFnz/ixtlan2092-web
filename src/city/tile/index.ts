import { BuildingEntity, createBuilding } from '../building/buildingCreator';
import { ICity } from '..';
import { BuildingType } from '../building/constants';

export interface RoadAccess {
  value: boolean;
}

export interface ITile {
  id: string;
  x: number;
  y: number;
  terrain: string;
  building: BuildingEntity | null | undefined;
  roadAccess: RoadAccess | null | undefined;
  distanceTo(tile: Tile): number;
  update(city: ICity): void;
  removeBuilding(): void;
  placeBuilding(type: string | null): void;
  toHTML(): string;
}

export class Tile implements ITile {
  id: string;
  x: number;
  y: number;
  terrain: string;
  building: BuildingEntity | null | undefined;
  roadAccess: RoadAccess | null | undefined;
  
  constructor(x: number, y: number) {
    this.id = crypto.randomUUID();
    this.x = x;
    this.y = y;
    this.terrain = 'ground';
    this.building = null;
  }

  distanceTo(tile: Tile): number {
    return Math.abs(this.x - tile.x) + Math.abs(this.y - tile.y);
  }

  update(city: ICity): void {
    if (this.building) {
      this.building.update(city);
    }
  }

  removeBuilding(): void {
    if (this.building) {
      this.building.dispose();
      this.building = null;
    }
  }

  placeBuilding(type: BuildingType): void {
    this.building = createBuilding(this.x, this.y, type);
  }

  toHTML(): string {
    let html = `
      <span class="info-label">Coordinates: </span>
      <span class="info-value">X: ${this.x}, Y: ${this.y}</span>
      <br>
      <span class="info-label">Terrain: </span>
      <span class="info-value">${this.terrain}</span>
      <br>
    `;

    if (this.building) {
      html += this.building.toHTML();
    }

    html += '</div>';
    return html;
  }
}

