import { BUILDING_ID, Building, BuildingFactory } from './constants';

const buildingFactory: BuildingFactory = {
  [BUILDING_ID.RESIDENTIAL]: (): Building => {
    return {
      type: BUILDING_ID.RESIDENTIAL,
      style: Math.floor(3 * Math.random()) + 1,
      height: 1,
      updated: true,
      update: function () {
        if (Math.random() < 0.01) {
          if (this.height && this.height < 5) {
            this.height += 1;
            this.updated = true;
          }
        }
      },
    };
  },
  [BUILDING_ID.COMMERCIAL]: (): Building => {
    return {
      type: BUILDING_ID.COMMERCIAL,
      style: Math.floor(3 * Math.random()) + 1,
      height: 1,
      updated: true,
      update: function () {
        if (Math.random() < 0.01) {
          if (this.height && this.height < 5) {
            this.height += 1;
            this.updated = true;
          }
        }
      },
    };
  },
  [BUILDING_ID.INDUSTRIAL]: (): Building => {
    return {
      type: BUILDING_ID.INDUSTRIAL,
      style: Math.floor(3 * Math.random()) + 1,
      height: 1,
      updated: true,
      update: function () {
        if (Math.random() < 0.01) {
          if (this.height && this.height < 5) {
            this.height += 1;
            this.updated = true;
          }
        }
      },
    };
  },
  [BUILDING_ID.ROAD]: (): Building => {
    return {
      type: BUILDING_ID.ROAD,
      style: Math.floor(3 * Math.random()) + 1,
      updated: true,
      update: function () {
        this.updated = false;
      },
    };
  },
};

export default buildingFactory;

