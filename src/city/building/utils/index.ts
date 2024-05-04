import { BUILDING_TYPE, BuildingType } from '../constants';
import {
  adjectives,
  commercialBusinessTypes,
  descriptors,
  industryTypes,
} from './names';

function getRandomElement<T>(array: T[]): T {
  const randomIndex = Math.floor(Math.random() * array.length);
  return array[randomIndex];
}

function generateCommericalBuildingName(): string {
  const adjective = getRandomElement(adjectives);
  const businessType = getRandomElement(commercialBusinessTypes);
  return `${adjective} ${businessType}`;
}

function generateIndustrialBuildingName(): string {
  const descriptor = getRandomElement(descriptors);
  const industryType = getRandomElement(industryTypes);
  return `${descriptor} ${industryType}`;
}

function isValidBuildingId(key: any): key is keyof typeof BUILDING_TYPE {
  return key in BUILDING_TYPE;
}

function checkIsWorkplace(buildingType: BuildingType): boolean {
  return (
    buildingType === BUILDING_TYPE.INDUSTRIAL ||
    buildingType === BUILDING_TYPE.COMMERCIAL
  );
}

export {
  isValidBuildingId,
  checkIsWorkplace,
  generateCommericalBuildingName,
  generateIndustrialBuildingName,
};

