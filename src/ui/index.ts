import { ICON_KEYS, getIcon } from '../assets/icons';
import { CustomWindow } from '../types';

declare let window: CustomWindow;

export function createToolbarButtons() {
  const toolbar = document.getElementById('ui-toolbar') as HTMLElement;
  if (!toolbar) {
    console.error('Toolbar element not found!');
    return;
  }

  // Create buttons dynamically for each icon key
  Object.entries(ICON_KEYS).forEach(([key, value]) => {
    const button = document.createElement('button');
    button.id = `button-${value}`;
    button.className = 'ui-button';
    button.style.backgroundImage = `url(${getIcon(value)})`;
    button.style.backgroundSize = 'cover';
    button.style.backgroundPosition = 'center';
    button.style.backgroundRepeat = 'no-repeat';
    button.style.height = '50px';
    button.style.border = 'none';
    button.style.color = 'transparent';
    button.dataset.type = value;
    button.onclick = (event) => window.game.onToolSelected(event);
    toolbar.appendChild(button);
  });

  createInfoPanel(toolbar);
}

function createInfoPanel(toolbar: HTMLElement) {
  const infoPanel = document.createElement('div');
  infoPanel.id = 'info-panel';
  infoPanel.className = 'ui-container';
  toolbar.appendChild(infoPanel);

  const infoTitle = document.createElement('h1');
  infoTitle.textContent = 'INFO';
  infoPanel.appendChild(infoTitle);

  const selectedObjectInfo = document.createElement('div');
  selectedObjectInfo.id = 'selected-object-info';
  infoPanel.appendChild(selectedObjectInfo);

  // Create pause button
  const pauseButton = document.createElement('button');
  pauseButton.id = 'button-pause';
  pauseButton.className = 'ui-button';
  pauseButton.textContent = 'PAUSE'; // Text or use an icon similarly
  pauseButton.onclick = () => window.game.togglePause();
  toolbar.appendChild(pauseButton);
}

