interface Building {
  type: string;
  style: number;
  height?: number;
  updated: boolean;
  update: (this: Building) => void;
}

const BUILDING_ID = {
  RESIDENTIAL: 'RESIDENTIAL',
  COMMERCIAL: 'COMMERCIAL',
  INDUSTRIAL: 'INDUSTRIAL',
  ROAD: 'ROAD',
};

export { Building, BUILDING_ID };

