import { BUILDING_ID, Building, BuildingFactory } from './constants';

const buildingFactory: BuildingFactory = {
  [BUILDING_ID.RESIDENTIAL]: (): Building => {
    return {
      id: BUILDING_ID.RESIDENTIAL,
      update: () => {},
    };
  },
  [BUILDING_ID.COMMERCIAL]: (): Building => {
    return {
      id: BUILDING_ID.COMMERCIAL,
      update: () => {},
    };
  },
  [BUILDING_ID.INDUSTRIAL]: (): Building => {
    return {
      id: BUILDING_ID.INDUSTRIAL,
      update: () => {},
    };
  },
  [BUILDING_ID.ROAD]: (): Building => {
    return {
      id: BUILDING_ID.ROAD,
      update: () => {},
    };
  },
};

export default buildingFactory;

