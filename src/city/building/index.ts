import { createCitizen } from '../citizen';
import { Citizen } from '../citizen/constants';
import { City } from '../constants';
import { BUILDING_TYPE, Building } from './constants';

function isValidBuildingId(key: any): key is keyof typeof BUILDING_TYPE {
  return key in BUILDING_TYPE;
}

function createBuilding(buildingType: keyof typeof BUILDING_TYPE): Building {
  const buildings = {
    [BUILDING_TYPE.RESIDENTIAL]: {
      type: BUILDING_TYPE.RESIDENTIAL,
      style: Math.floor(3 * Math.random()) + 1,
      height: 1,
      updated: true,

      citizens: [] as Citizen[],
      maxCitizens: 4,

      update(city: City) {
        if (this.citizens.length < this.maxCitizens) {
          const citizen = createCitizen(this);
          this.citizens.push(citizen);
          city.citizens.push(citizen);
          console.log(citizen);
        }

        if (Math.random() < 0.01 && this.height && this.height < 5) {
          this.height += 1;
          this.updated = true;
        }
      },
    },
    [BUILDING_TYPE.COMMERCIAL]: {
      type: BUILDING_TYPE.COMMERCIAL,
      style: Math.floor(3 * Math.random()) + 1,
      height: 1,
      updated: true,
      update() {
        if (Math.random() < 0.01 && this.height && this.height < 5) {
          this.height += 1;
          this.updated = true;
        }
      },
    },
    [BUILDING_TYPE.INDUSTRIAL]: {
      type: BUILDING_TYPE.INDUSTRIAL,
      style: Math.floor(3 * Math.random()) + 1,
      height: 1,
      updated: true,
      update() {
        if (Math.random() < 0.01 && this.height && this.height < 5) {
          this.height += 1;
          this.updated = true;
        }
      },
    },
    [BUILDING_TYPE.ROAD]: {
      type: BUILDING_TYPE.ROAD,
      style: Math.floor(3 * Math.random()) + 1,
      updated: true,
      update: function () {
        this.updated = false;
      },
    },
  };

  return buildings[buildingType] || buildings[BUILDING_TYPE.ROAD];
}

export { createBuilding, isValidBuildingId };

