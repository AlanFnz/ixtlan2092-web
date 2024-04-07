import { BUILDING_ID, Building, BuildingFactory } from './constants';

const buildingFactory: BuildingFactory = {
  [BUILDING_ID.RESIDENTIAL]: (): Building => {
    return {
      id: BUILDING_ID.RESIDENTIAL,
      height: 1,
      updated: true,
      update: () => {},
    };
  },
  [BUILDING_ID.COMMERCIAL]: (): Building => {
    return {
      id: BUILDING_ID.COMMERCIAL,
      height: 1,
      updated: true,
      update: () => {},
    };
  },
  [BUILDING_ID.INDUSTRIAL]: (): Building => {
    return {
      id: BUILDING_ID.INDUSTRIAL,
      height: 1,
      updated: true,
      update: () => {},
    };
  },
  [BUILDING_ID.ROAD]: (): Building => {
    return {
      id: BUILDING_ID.ROAD,
      updated: true,
      update: () => {},
    };
  },
};

export default buildingFactory;

