import { Building } from '../building/constants';
import { City } from '../constants';
import { Citizen } from './constants';

function createCitizen(residenceId: string): Citizen {
  return {
    // props
    id: crypto.randomUUID(),
    firstName: 'James',
    surname: 'Page',
    residenceId,

    // functions
    update(city: City) {
      // not implemented
    },
  };
}

export { createCitizen };

