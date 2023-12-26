import { City } from './city/constants';

export interface CustomWindow extends Window {
  scene?: {
    initScene: (city: City) => void;
    start: () => void;
    stop: () => void;
  };
  city: City;
}

