import { ICitizen } from '../../citizen';
import { City } from '../../constants';
import { BuildingType } from '../constants';

interface IBuilding {
  x: number;
  y: number;
  id: string;
  name: string;
  type: BuildingType;
  isMeshOutOfDate: boolean;
  update(city: City): void;
  step(city: City): void;
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

