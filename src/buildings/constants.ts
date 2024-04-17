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
  RESIDENTIAL: 'RESIDENTIAL',
  COMMERCIAL: 'COMMERCIAL',
  INDUSTRIAL: 'INDUSTRIAL',
  ROAD: 'ROAD',
};

export { Building, BuildingFactory, BUILDING_ID };

