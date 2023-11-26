import { createScene } from './scene';
import './main.css';

interface CustomWindow extends Window {
  scene?: {
    start: () => void;
  };
}

declare let window: CustomWindow;

window.onload = () => {
  window.scene = createScene();
  window.scene?.start();
};

