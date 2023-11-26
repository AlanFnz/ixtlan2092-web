import { createScene } from './scene';
import './main.css';

interface CustomWindow extends Window {
  scene?: {
    start: () => void;
    onMouseDown?: (event: MouseEvent) => void;
    onMouseUp?: (event: MouseEvent) => void;
    onMouseMove?: (event: MouseEvent) => void;
  };
}

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

