interface Building {
  type: string;
  style: number;
  height?: number;
  updated: boolean;
  update: (this: Building) => void;
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

