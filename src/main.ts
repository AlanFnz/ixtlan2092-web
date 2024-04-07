import { createGame } from './game';
import { CustomWindow } from './types';
import './main.css';

declare let window: CustomWindow;

let selectControl = document.getElementById('button-bulldoze');

window.onload = () => {
  window.game = createGame();
  window.setActiveTool = (event: any, toolId: string) => {
    if (selectControl) selectControl.classList.remove('selected');
    selectControl = event.target;
    selectControl?.classList.add('selected');

    window.game.setActiveToolId(toolId)
  };
};

