import { createScene } from './scene';
import { CustomWindow } from './types';
import './main.css';

declare let window: CustomWindow;

window.onload = () => {
  window.scene = createScene();

  // Add listeners
  if (window.scene) {
    if (window.scene.onMouseDown) {
      document.addEventListener('mousedown', window.scene.onMouseDown, false);
    }
    if (window.scene.onMouseUp) {
      document.addEventListener('mouseup', window.scene.onMouseUp, false);
    }
    if (window.scene.onMouseMove) {
      document.addEventListener('mousemove', window.scene.onMouseMove, false);
    }
    window.scene.start();
  }

  window.scene?.start();
};

