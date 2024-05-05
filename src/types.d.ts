import { ICity } from './city';
import { IGame } from './game';

export interface CustomWindow extends Window {
  scene?: {
    initScene: (city: ICity) => void;
    start: () => void;
    stop: () => void;
  };
  city: ICity;
  game: IGame;
  setActiveTool: (event: any, toolId: string) => void;
}

