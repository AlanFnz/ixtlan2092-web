import { createGame } from './game';
import { CustomWindow } from './types';
import './main.css';

declare let window: CustomWindow;

let selectControl: HTMLButtonElement | null;

window.onload = () => {
  window.game = createGame();
};

