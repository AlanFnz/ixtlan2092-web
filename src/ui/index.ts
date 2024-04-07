import { BUILDING_ID } from '../buildings/constants';
import { CustomWindow } from '../types.js';

declare let window: CustomWindow;
export const BULLDOZE_ID = 'bulldoze'
export const BULLDOZE_UI_TEXT = 'BULLDOZE'

export function createToolbarButtons() {
  const toolbar = document.getElementById('ui-toolbar');

  const bulldozeButton = document.createElement('button');
  bulldozeButton.id = 'button-bulldoze';
  bulldozeButton.className = 'ui-button';
  bulldozeButton.textContent = BULLDOZE_UI_TEXT;
  bulldozeButton.onclick = (event) => window.setActiveTool(event, BULLDOZE_ID);
  toolbar?.appendChild(bulldozeButton);

  Object.entries(BUILDING_ID).forEach(([key, value]) => {
    const button = document.createElement('button');
    button.className = 'ui-button';
    button.textContent = key;
    button.onclick = (event) => window.setActiveTool(event, value);

    toolbar?.appendChild(button);
  });
}

