import { Building } from '../building/constants';
import { City } from '../constants';
import { Citizen } from './constants';

function createCitizen(residence: Building): Citizen {
  return {
    // props
    name: 'James',
    surname: 'Page',
    residence,

    // functions
    update(city: City) {
      // not implemented
    },
  };
}

export { createCitizen };

