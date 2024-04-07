interface Building {
  id: string;
  height?: number;
  updated: boolean;
  update: () => void;
}

interface BuildingFactory {
  [key: string]: () => Building;
}

const BUILDING_ID = {
  RESIDENTIAL: 'residential',
  COMMERCIAL: 'commercial',
  INDUSTRIAL: 'industrial',
  ROAD: 'road',
};

export { Building, BuildingFactory, BUILDING_ID };

