import { BUILDING_TYPE } from '../city/building/constants';
import { CustomWindow } from '../types.js';
import {
  BULLDOZE_ID,
  BULLDOZE_UI_TEXT,
  INFO_UI_TEXT,
  PAUSE_BUTTON_ID,
  PAUSE_UI_TEXT,
  SELECT_ID,
  SELECT_UI_TEXT,
} from './constants';

declare let window: CustomWindow;

export function createToolbarButtons() {
  const toolbar = document.getElementById('ui-toolbar');

  if (!toolbar) {
    console.error('Toolbar element not found!');
    return;
  }

  // Select button
  const selectButton = document.createElement('button');
  selectButton.id = `button-${SELECT_ID}`;
  selectButton.className = 'ui-button selected';
  selectButton.textContent = SELECT_UI_TEXT;
  selectButton.dataset.type = SELECT_ID;
  selectButton.onclick = (event) => window.game.onToolSelected(event);
  toolbar.appendChild(selectButton);

  // Bulldoze button
  const bulldozeButton = document.createElement('button');
  bulldozeButton.id = `button-${BULLDOZE_ID}`;
  bulldozeButton.className = 'ui-button';
  bulldozeButton.textContent = BULLDOZE_UI_TEXT;
  bulldozeButton.dataset.type = BULLDOZE_ID;
  bulldozeButton.onclick = (event) => window.game.onToolSelected(event);
  toolbar.appendChild(bulldozeButton);

  // Create buttons for each building type using BUILDING_TYPE
  Object.entries(BUILDING_TYPE).forEach(([key, value]) => {
    const button = document.createElement('button');
    button.id = `button-${value}`; // Set id based on the building type
    button.className = 'ui-button';
    button.textContent = key;
    button.dataset.type = value; // Set data-type attribute for identifying the tool
    button.onclick = (event) => window.game.onToolSelected(event);

    toolbar.appendChild(button);
  });

  // Create info panel
  const infoPanel = document.createElement('div');
  infoPanel.id = 'info-panel';
  infoPanel.className = 'ui-container';
  toolbar.appendChild(infoPanel);

  const infoTitle = document.createElement('h1');
  infoTitle.textContent = INFO_UI_TEXT;
  infoPanel.appendChild(infoTitle);

  const selectedObjectInfo = document.createElement('div');
  selectedObjectInfo.id = 'selected-object-info';
  infoPanel.appendChild(selectedObjectInfo);

  // Create pause button
  const pauseButton = document.createElement('button');
  pauseButton.id = PAUSE_BUTTON_ID;
  pauseButton.className = 'ui-button';
  pauseButton.textContent = PAUSE_UI_TEXT;
  pauseButton.onclick = () => window.game.togglePause();
  toolbar.appendChild(pauseButton);
}

