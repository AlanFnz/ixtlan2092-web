import { Building } from '../building/constants';
import { City } from '../constants';

interface Citizen {
  name: string;
  surname: string;
  residenceId: string | null;
  update: (city: City) => void;
}

export { Citizen };

