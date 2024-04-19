import { ICON_KEYS, getIcon } from '../assets/icons';
import { CustomWindow } from '../types';

declare let window: CustomWindow;

export function createToolbarButtons() {
  const toolbar = document.getElementById('ui-toolbar') as HTMLElement;
  if (!toolbar) {
    console.error('Toolbar element not found!');
    return;
  }

  Object.entries(ICON_KEYS).forEach(([key, value]) => {
    const button = document.createElement('button');
    button.id = `button-${value}`;
    button.className = 'ui-button';
    button.style.padding = '8px';
    
    if (value === ICON_KEYS.PLAY || value === ICON_KEYS.PAUSE)
      button.onclick = () => window.game.togglePause();

    const iconImg = document.createElement('img');
    iconImg.src = getIcon(value);
    iconImg.alt = key;
    iconImg.style.width = '100%';
    iconImg.style.height = '100%';

    button.appendChild(iconImg);
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
}

