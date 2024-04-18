import { City } from '../constants';
import { Citizen } from './constants';

function createCitizen(): Citizen {
  return {
    // props
    name: 'James',
    surname: 'Page',
    residence: null,

    // functions
    update(city: City) {
      // not implemented
    },
  };
}

export { createCitizen };

