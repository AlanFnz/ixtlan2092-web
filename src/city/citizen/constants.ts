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
  getFullName: () => string;
  toHTML: () => string;
}

export { Citizen };

