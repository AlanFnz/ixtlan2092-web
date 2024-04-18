import { City } from '../constants';

interface Citizen {
  id: string;
  name: string;
  surname: string;
  residenceId: string | null;
  update: (city: City) => void;
}

export { Citizen };

