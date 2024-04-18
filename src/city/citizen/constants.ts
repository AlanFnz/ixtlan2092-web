import { City } from '../constants';

interface Citizen {
  name: string;
  surname: string;
  residence: number | null;
  update: (city: City) => void;
}

export { Citizen };

