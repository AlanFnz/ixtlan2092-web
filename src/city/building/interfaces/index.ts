import { ICity } from '../..';
import { ICitizen } from '../../citizen';
import { BuildingType } from '../constants';

interface IBuilding {
  x: number;
  y: number;
  id: string;
  name: string;
  type: BuildingType;
  isMeshOutOfDate: boolean;
  hideTerrain: boolean;
  update(city: ICity): void;
  step(city: ICity): void;
  dispose(): void;
  toHTML(): string;
}

interface IZone extends IBuilding {
  style: string;
  abandoned: boolean;
  developed: boolean;
  hasRoadAccess: boolean;
  level: number;
  rotation: number;
  maxLevel: number;
  abandonmentCounter: number;
}

interface IResidentialZone extends IZone {
  residents: ICitizen[];
  getMaxResidents(): number;
}

export interface ICommercialZone {
  workers: ICitizen[];
  maxWorkers: number;
  getMaxWorkers(): number;
  numberOfJobsAvailable(): number;
  numberOfJobsFilled(): number;
}

export interface IIndustrialZone {
  workers: ICitizen[];
  maxWorkers: number;
  getMaxWorkers(): number;
  numberOfJobsAvailable(): number;
  numberOfJobsFilled(): number;
}

export { IBuilding, IZone, IResidentialZone };

