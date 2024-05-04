import { Building } from '../building/constants';
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
  setJob: (job: Building | null) => void;
  getFullName: () => string;
  findJob: (city: City) => void | any;
  toHTML: () => string;
}

const EMPLOYENT_STATES = {
  EMPLOYED: 'employed',
  UNEMPLOYED: 'unemployed',
};

export { Citizen, EMPLOYENT_STATES };

