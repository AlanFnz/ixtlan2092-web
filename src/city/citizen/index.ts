import { Building } from '../building/constants';
import { City } from '../constants';
import { Citizen, EMPLOYENT_STATES } from './constants';
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
    state: EMPLOYENT_STATES.UNEMPLOYED,
    stateCounter: 0, // number of steps in the current state
    job: null, // will probably be a ref to the building this citizen works

    // functions
    update(city: City) {
      switch (this.state) {
        case EMPLOYENT_STATES.UNEMPLOYED:
          // looking for a job
          console.log(`${this.getFullName()} is looking for a job`);
          // this.job = this.findJob(city);

          // transition
          if (this.job) {
            console.log(
              `${this.getFullName()} found a job at ${this.job?.name}`
            );
            this.state = EMPLOYENT_STATES.EMPLOYED;
          }
          break;
        case EMPLOYENT_STATES.EMPLOYED:
          break;
        default:
          console.error(
            `Citizen ${this.id} is in an unknown state (${this.state})`
          );
      }
    },
    getFullName() {
      return `${this.firstName} ${this.surname}`;
    },
    toHTML() {
      return `<span>${this.firstName} ${this.surname} | Age: ${this.age}</span>`;
    },
    findJob(city) {},
  };
}

export { createCitizen };

