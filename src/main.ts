import { createScene } from './scene';
import { CustomWindow } from './types';
import './main.css';
import { createCity } from './city';

declare let window: CustomWindow;
const CITY_SIZE = 8;

window.onload = () => {
  window.scene = createScene(CITY_SIZE);
  window.city = createCity(CITY_SIZE);

  if (window.scene) {
    window.scene.start();
    window.scene.initScene(window.city);
  }
};

