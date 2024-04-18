import { Citizen } from '../citizen/constants';
import { City } from '../constants';

interface Building {
  id: string;
  type: string;
  style: number;
  height?: number;
  updated: boolean;
  citizens?: Citizen[];
  maxCitizens?: number;
  update: (city: City) => void;
}

const BUILDING_TYPE = {
  RESIDENTIAL: 'RESIDENTIAL',
  COMMERCIAL: 'COMMERCIAL',
  INDUSTRIAL: 'INDUSTRIAL',
  ROAD: 'ROAD',
};

export { Building, BUILDING_TYPE };

