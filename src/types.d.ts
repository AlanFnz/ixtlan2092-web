import { City } from './city/constants';
import { Game } from './game/constants';

export interface CustomWindow extends Window {
  scene?: {
    initScene: (city: City) => void;
    start: () => void;
    stop: () => void;
  };
  city: City;
  game: Game;
  setActiveTool: (event: any, toolId: string) => void;
}

