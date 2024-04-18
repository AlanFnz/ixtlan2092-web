import { City } from '../constants';

interface Citizen {
  id: string;
  firstName: string;
  surname: string;
  residenceId: string | null;
  update: (city: City) => void;
}

export { Citizen };

