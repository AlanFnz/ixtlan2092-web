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
    state: 'unemployed',
    stateCounter: 0, // number of steps in the current state
    job: null, // will probably be a ref to the building this citizen works

    // functions
    update(city: City) {
      // not implemented
    },
    toHTML() {
      return `<span>${this.firstName} ${this.surname} | Age: ${this.age}</span>`;
    },
  };
}

export { createCitizen };

