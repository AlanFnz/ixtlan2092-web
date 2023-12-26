import { createScene } from './scene';
import { CustomWindow } from './types';
import './main.css';
import { createCity } from './city';

declare let window: CustomWindow;

window.onload = () => {
  window.scene = createScene();
  window.city = createCity(8);

  if (window.scene) {
    window.scene.start();
    window.scene.initScene(window.city);
  }
};

