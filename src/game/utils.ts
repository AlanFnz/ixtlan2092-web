const BUILDING_ID = {
  RESIDENTIAL: 'residential',
  COMMERCIAL: 'commercial',
  INDUSTRIAL: 'industrial',
  ROAD: 'road',
};

function isActiveToolIdValid(
  toolId: string
): toolId is keyof typeof BUILDING_ID {
  return Object.values(BUILDING_ID).includes(toolId as any);
}

export { isActiveToolIdValid };

