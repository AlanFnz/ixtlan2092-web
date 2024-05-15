import { ICity } from '../..';
import { ICitizen } from '../../citizen';
import { BuildingType } from '../constants';

interface IBuilding {
  x: number;
  y: number;
  rotation?: number;
  id: string;
  name: string;
  type: BuildingType;
  isMeshOutOfDate: boolean;
  update(city: ICity): void;
  step(city: ICity): void;
  dispose(): void;
  toHTML(): string;
}

interface IZone extends IBuilding {
  style: number;
  abandoned: boolean;
  developed: boolean;
  hasRoadAccess: boolean;
  level: number;
  abandonmentCounter: number;
}

interface IResidentialZone extends IZone {
  residents: ICitizen[];
}

export interface ICommercialZone {
  workers: ICitizen[];
  maxWorkers: number;
  numberOfJobsAvailable(): number;
  numberOfJobsFilled(): number;
}

export interface IIndustrialZone {
  workers: ICitizen[];
  maxWorkers: number;
  numberOfJobsAvailable(): number;
  numberOfJobsFilled(): number;
}

export { IBuilding, IZone, IResidentialZone };

