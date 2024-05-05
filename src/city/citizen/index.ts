import CONFIG from '../../config';
import { CommercialZone } from '../building/commercialZone';
import { IndustrialZone } from '../building/industrialZone';
import { ResidentialZone } from '../building/residentialZone';
import { checkIsWorkplace } from '../building/utils';
import { City, Tile } from '../constants';
import { CITIZEN_STATE, CitizenState } from './constants';
import { getRandomFirstName, getRandomSurname } from './utils';

export interface ICitizen {
  id: string;
  firstName: string;
  surname: string;
  age: number;
  state: CitizenState;
  stateCounter: number;
  residence: ResidentialZone;
  workplace: CommercialZone | IndustrialZone | null;
  step(city: City): void;
  dispose(): void;
  setWorkplace(workplace: CommercialZone | IndustrialZone | null): void;
  toHTML(): string;
}

export class Citizen implements ICitizen {
  id: string;
  firstName: string;
  surname: string;
  age: number;
  state: CitizenState;
  stateCounter: number;
  residence: ResidentialZone;
  workplace: CommercialZone | IndustrialZone | null;

  constructor(residence: ResidentialZone) {
    this.id = crypto.randomUUID();
    this.firstName = getRandomFirstName();
    this.surname = getRandomSurname();
    this.age = 1 + Math.floor(100 * Math.random());
    this.state = CITIZEN_STATE.IDLE;
    this.stateCounter = 0;
    this.residence = residence;
    this.workplace = null;
    this.initializeState();
  }

  private initializeState() {
    if (this.age < CONFIG.CITIZEN.MIN_WORKING_AGE) {
      this.state = CITIZEN_STATE.SCHOOL;
    } else if (this.age >= CONFIG.CITIZEN.RETIREMENT_AGE) {
      this.state = CITIZEN_STATE.RETIRED;
    } else {
      this.state = CITIZEN_STATE.UNEMPLOYED;
    }
  }

  step(city: City): void {
    switch (this.state) {
      case CITIZEN_STATE.IDLE:
      case CITIZEN_STATE.SCHOOL:
      case CITIZEN_STATE.RETIRED:
        // nothing for now
        break;
      case CITIZEN_STATE.UNEMPLOYED:
        this.workplace = this.findJob(city);
        if (this.workplace) {
          this.state = CITIZEN_STATE.EMPLOYED;
        }
        break;
      case CITIZEN_STATE.EMPLOYED:
        if (!this.workplace) {
          this.state = CITIZEN_STATE.UNEMPLOYED;
        }
        break;
      default:
        console.error(
          `Citizen ${this.id} is in an unknown state (${this.state})`
        );
    }
  }

  dispose(): void {
    this.workplace?.workers.splice(this.workplace.workers.indexOf(this), 1);
  }

  private findJob(city: City): CommercialZone | IndustrialZone | null {
    const tile = city.findTile(
      { x: this.residence.x, y: this.residence.y },
      (tile: Tile) => {
        // search for an industrial or commercial building with at least one available job
        const building = tile.building as CommercialZone | IndustrialZone;
        if (
          checkIsWorkplace(building.type) &&
          building.numberOfJobsAvailable() > 0
        ) {
          return true;
        }
        return false;
      },
      CONFIG.CITIZEN.MAX_JOB_SEARCH_DISTANCE
    );

    if (tile && tile.building && checkIsWorkplace(tile.building.type)) {
      // employ the citizen at the building
      const building = tile.building as CommercialZone | IndustrialZone;
      building.workers.push(this);
      return building;
    } else {
      return null;
    }
  }

  setWorkplace(workplace: CommercialZone | IndustrialZone | null): void {
    this.workplace = workplace;
  }

  toHTML(): string {
    return `
      <li style="font-size:small">${this.firstName} ${this.surname} (Age: ${
      this.age
    } | State: ${this.state})
        <ul style="padding-left:8px">
          <li>Job: ${this.workplace?.name ?? 'N/A'}</li>
        </ul>
      </li>
    `;
  }
}

