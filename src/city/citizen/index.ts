import { checkIsWorkplace } from '../building/utils';
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
          this.job = this.findJob(city);

          // transition
          if (this.job) {
            console.log(
              `${this.getFullName()} found a job at ${this.job?.name}`
            );
            this.state = EMPLOYENT_STATES.EMPLOYED;
          }
          break;
        case EMPLOYENT_STATES.EMPLOYED:
          if (!this.job) {
            this.state = EMPLOYENT_STATES.EMPLOYED;
          }
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
    findJob(city) {
      if (!this.residenceId) return null;
      const residenceTile = city.getTileById(this.residenceId);

      if (!residenceTile) return null;

      const tile = city.findTile(
        { x: residenceTile.x, y: residenceTile.y },
        (tile) => {
          if (!tile.building) return false;
          const buildingType = tile.building.type;

          if (checkIsWorkplace(buildingType)) {
            if (
              tile.building.getNumberOfJobsAvailable &&
              tile.building.getNumberOfJobsAvailable() > 0
            ) {
              return true;
            }
          }

          return false;
        },
        4
      );

      if (tile) {
        tile.building?.workers?.push(this);
        return tile.building;
      } else {
        return null;
      }
    },
  };
}

export { createCitizen };

