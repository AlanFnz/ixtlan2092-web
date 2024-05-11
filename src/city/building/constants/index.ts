const BUILDING_TYPE = {
  BUILDING: 'BUILDING',
  RESIDENTIAL: 'RESIDENTIAL',
  COMMERCIAL: 'COMMERCIAL',
  INDUSTRIAL: 'INDUSTRIAL',
  ROAD: 'ROAD',
} as const;

type BuildingType = (typeof BUILDING_TYPE)[keyof typeof BUILDING_TYPE];

export { BUILDING_TYPE, BuildingType };

