import { BUILDING_ID } from '../buildings/constants';
import { CustomWindow } from '../types.js';

declare let window: CustomWindow;
export const BULLDOZE_ID = 'bulldoze';
export const BULLDOZE_UI_TEXT = 'BULLDOZE';
export const PAUSE_BUTTON_ID = 'button-pause';
export const PAUSE_UI_TEXT = 'PAUSE';

export function createToolbarButtons() {
  const toolbar = document.getElementById('ui-toolbar');

  if (!toolbar) {
    console.error('Toolbar element not found!');
    return;
  }

  // Create bulldoze button
  const bulldozeButton = document.createElement('button');
  bulldozeButton.id = 'button-bulldoze';
  bulldozeButton.className = 'ui-button';
  bulldozeButton.textContent = BULLDOZE_UI_TEXT;
  bulldozeButton.dataset.type = BULLDOZE_ID; // Set data-type attribute for bulldoze
  bulldozeButton.onclick = (event) => window.game.onToolSelected(event);
  toolbar.appendChild(bulldozeButton);

  // Create buttons for each building type using BUILDING_ID
  Object.entries(BUILDING_ID).forEach(([key, value]) => {
    const button = document.createElement('button');
    button.id = `button-${value}`; // Set id based on the building type
    button.className = 'ui-button';
    button.textContent = key.charAt(0) + key.slice(1).toLowerCase(); // Capitalize the first letter
    button.dataset.type = value; // Set data-type attribute for identifying the tool
    button.onclick = (event) => window.game.onToolSelected(event);

    toolbar.appendChild(button);
  });

  // Create pause button
  const pauseButton = document.createElement('button');
  pauseButton.id = PAUSE_BUTTON_ID;
  pauseButton.className = 'ui-button';
  pauseButton.textContent = PAUSE_UI_TEXT;
  pauseButton.onclick = () => window.game.togglePause(); // Directly toggle pause without event argument
  toolbar.appendChild(pauseButton);
}

