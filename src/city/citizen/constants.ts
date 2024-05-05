import { CommercialZone } from '../building/commercialZone';
import { Building } from '../building/constants';
import { IndustrialZone } from '../building/industrialZone';
import { City } from '../constants';

interface Citizen {
  id: string;
  firstName: string;
  surname: string;
  age: number;
  residenceId: string | null;
  state: string;
  stateCounter: number;
  job: any;
  update: (city: City) => void;
  setJob: (job: CommercialZone | IndustrialZone | null) => void;
  getFullName: () => string;
  findJob: (city: City) => void | any;
  toHTML: () => string;
}

type CitizenState = (typeof CITIZEN_STATE)[keyof typeof CITIZEN_STATE];

const CITIZEN_STATE = {
  IDLE: 'idle',
  SCHOOL: 'school',
  EMPLOYED: 'employed',
  UNEMPLOYED: 'unemployed',
  RETIRED: 'retired',
};

export { Citizen, CitizenState, CITIZEN_STATE };

