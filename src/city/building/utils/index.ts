import { BUILDING_TYPE, BuildingType } from '../constants';

function isValidBuildingId(key: any): key is keyof typeof BUILDING_TYPE {
  return key in BUILDING_TYPE;
}

function checkIsWorkplace(buildingType: BuildingType): boolean {
  return (
    buildingType === BUILDING_TYPE.INDUSTRIAL ||
    buildingType === BUILDING_TYPE.COMMERCIAL
  );
}

export { isValidBuildingId, checkIsWorkplace };

