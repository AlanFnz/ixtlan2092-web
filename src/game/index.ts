import { createScene } from '../scene';
import { CustomWindow } from '../types';
import { createCity } from '../city';
import config from './config';

declare let window: CustomWindow;

export function createGame() {
  const scene = createScene(config.CITY_SIZE);
  const city = createCity(config.CITY_SIZE);

  const game = {
    update() {},
  };

  if (scene) {
    scene.start();
    scene.initScene(city);
  }
}

