import { Building } from '../building/constants';
import { City } from '../constants';
import { Citizen } from './constants';
import { getRandomAge, getRandomSurname } from './utils';
import { getRandomFirstName } from './utils';

function createCitizen(residenceId: string): Citizen {
  return {
    // props
    id: crypto.randomUUID(),
    firstName: getRandomFirstName(),
    surname: getRandomSurname(),
    age: getRandomAge(),
    residenceId,

    // functions
    update(city: City) {
      // not implemented
    },
  };
}

export { createCitizen };

