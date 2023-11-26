import { createScene } from './scene';
import { CustomWindow } from './types';
import './main.css';

declare let window: CustomWindow;

window.onload = () => {
  window.scene = createScene();

  if (window.scene) {
    window.scene.start();
  }

  window.scene?.start();
};

