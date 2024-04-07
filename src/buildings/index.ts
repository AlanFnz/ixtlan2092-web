import { BUILDING_ID, Building, BuildingFactory } from './constants';

const buildingFactory: BuildingFactory = {
  [BUILDING_ID.RESIDENTIAL]: (): Building => {
    return {
      id: BUILDING_ID.RESIDENTIAL,
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
      id: BUILDING_ID.COMMERCIAL,
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
      id: BUILDING_ID.INDUSTRIAL,
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
      id: BUILDING_ID.ROAD,
      updated: true,
      update: function () {
        this.updated = false;
      },
    };
  },
};

export default buildingFactory;

