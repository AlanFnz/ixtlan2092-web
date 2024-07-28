import { BuildingEntity, createBuilding } from "../building/buildingCreator";
import { ICity } from "..";
import { BuildingType } from "../building/constants";
import {
  IRoadAccessAttribute,
  RoadAccessAttribute,
} from "../building/attributes/roadAccess";

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
  distanceTo(tile: ITile): number;
  simulate(city: ICity): void;
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
  roadAccess: IRoadAccessAttribute | null | undefined;

  constructor(x: number, y: number) {
    this.id = crypto.randomUUID();
    this.x = x;
    this.y = y;
    this.terrain = "ground";
    this.building = null;
    this.roadAccess = new RoadAccessAttribute(this);
  }

  distanceTo(tile: Tile): number {
    return Math.abs(this.x - tile.x) + Math.abs(this.y - tile.y);
  }

  simulate(city: ICity): void {
    this.building?.simulate(city);
  }

  update(city: ICity): void {
    this.building?.update(city);
    this.roadAccess?.update(city);
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

    html += "</div>";
    return html;
  }
}
