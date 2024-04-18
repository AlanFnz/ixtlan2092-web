import { Building } from '../building/constants';
import { City } from '../constants';
import { Citizen } from './constants';

function createCitizen(residenceId: string): Citizen {
  return {
    // props
    name: 'James',
    surname: 'Page',
    residenceId,

    // functions
    update(city: City) {
      // not implemented
    },
  };
}

export { createCitizen };

