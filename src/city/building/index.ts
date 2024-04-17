import { BUILDING_ID, Building } from './constants';

function isValidBuildingId(key: any): key is keyof typeof BUILDING_ID {
  return key in BUILDING_ID;
}

function createBuilding(buildingType: keyof typeof BUILDING_ID): Building {
  const commonUpdate = function (this: Building) {
    if (Math.random() < 0.01 && this.height && this.height < 5) {
      this.height += 1;
      this.updated = true;
    }
  };

  const buildings = {
    [BUILDING_ID.RESIDENTIAL]: {
      type: BUILDING_ID.RESIDENTIAL,
      style: Math.floor(3 * Math.random()) + 1,
      height: 1,
      updated: true,
      update: commonUpdate,
    },
    [BUILDING_ID.COMMERCIAL]: {
      type: BUILDING_ID.COMMERCIAL,
      style: Math.floor(3 * Math.random()) + 1,
      height: 1,
      updated: true,
      update: commonUpdate,
    },
    [BUILDING_ID.INDUSTRIAL]: {
      type: BUILDING_ID.INDUSTRIAL,
      style: Math.floor(3 * Math.random()) + 1,
      height: 1,
      updated: true,
      update: commonUpdate,
    },
    [BUILDING_ID.ROAD]: {
      type: BUILDING_ID.ROAD,
      style: Math.floor(3 * Math.random()) + 1,
      updated: true,
      update: function () {
        this.updated = false;
      },
    },
  };

  return buildings[buildingType] || buildings[BUILDING_ID.ROAD];
}

export { createBuilding, isValidBuildingId };

