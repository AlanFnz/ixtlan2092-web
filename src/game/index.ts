import { createScene } from '../scene';
import { CustomWindow } from '../types';
import { createCity } from '../city';

const CITY_SIZE = 8;
declare let window: CustomWindow;
export function createGame() {
  window.scene = createScene(CITY_SIZE);
  window.city = createCity(CITY_SIZE);

  if (window.scene) {
    window.scene.start();
    window.scene.initScene(window.city);
  }
}

