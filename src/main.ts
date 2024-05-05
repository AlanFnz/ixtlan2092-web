import { Game } from './game';
import { CustomWindow } from './types';
import './main.css';

declare let window: CustomWindow;

window.onload = () => {
  window.game = new Game();
};

