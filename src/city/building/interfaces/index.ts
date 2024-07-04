import { ICity } from '../..';
import { ICitizen } from '../../citizen';
import { DevelopmentAttribute } from '../attributes/development';
import { JobsAttribute } from '../attributes/jobs';
import { ResidentsAttribute } from '../attributes/residents';
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
  development: DevelopmentAttribute;
  hasRoadAccess: boolean;
  level: number;
  rotation: number;
  maxLevel: number;
  abandonmentCounter: number;
}

interface IResidentialZone extends IZone {
  residents: ResidentsAttribute;
}

export interface ICommercialZone {
  jobs: JobsAttribute;
}

export interface IIndustrialZone {
  jobs: JobsAttribute;
}

export { IBuilding, IZone, IResidentialZone };

