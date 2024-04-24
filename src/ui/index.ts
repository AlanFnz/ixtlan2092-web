import { IconKey, getIcon } from '../assets/icons';
import { CustomWindow } from '../types';
import { BaseButton, TOOLBAR_BUTTONS, ToggleButton } from './constants';

declare let window: CustomWindow;

export function createUi() {
  createToolbarButtons();
  createtopbar();
}

function isToggleButton(
  button: BaseButton | ToggleButton
): button is ToggleButton {
  return 'iconPlay' in button && 'iconPause' in button;
}

function createtopbar() {
  const topbar = document.getElementById('ui-topbar') as HTMLElement;
  if (!topbar) {
    console.error('Title bar element not found!');
    return;
  }

  const topbarLeftItems = document.createElement('div');
  topbarLeftItems.id = 'title-bar-left-items';
  topbarLeftItems.className = 'title-bar-items';
  topbarLeftItems.textContent = '$1000';
  topbar.appendChild(topbarLeftItems);

  const topbarCenterItems = document.createElement('div');
  topbarCenterItems.id = 'title-bar-center-items';
  topbarCenterItems.className = 'title-bar-items';
  topbarCenterItems.textContent = 'My City';
  topbar.appendChild(topbarCenterItems);

  const topbarRightItems = document.createElement('div');
  topbarRightItems.id = 'title-bar-right-items';
  topbarRightItems.className = 'title-bar-items';
  topbarRightItems.innerHTML =
    'Population: <span id="population-counter">0</span>';
  topbar.appendChild(topbarRightItems);
}

function createToolbarButtons() {
  const toolbar = document.getElementById('ui-toolbar') as HTMLElement;
  if (!toolbar) {
    console.error('Toolbar element not found!');
    return;
  }

  Object.entries(TOOLBAR_BUTTONS).forEach(([key, toolbarButton]) => {
    const button = document.createElement('button');
    button.id = toolbarButton.id;
    button.className = 'ui-button';
    button.style.padding = '8px';

    const iconImg = document.createElement('img');
    iconImg.style.width = '100%';
    iconImg.style.height = '100%';
    iconImg.style.pointerEvents = 'none';

    if (isToggleButton(toolbarButton)) {
      const isPaused = window.game?.isPaused ?? false;
      button.onclick = () => window.game.togglePause();
      iconImg.src = getIcon(
        isPaused ? toolbarButton.iconPlay : toolbarButton.iconPause
      );
      iconImg.alt = isPaused
        ? toolbarButton.uiTextPause
        : toolbarButton.uiTextPlay;
    } else {
      button.onclick = (event) => window.game.onToolSelected(event);
      iconImg.src = getIcon(toolbarButton.icon as IconKey);
      iconImg.alt = toolbarButton.uiText;
    }

    button.appendChild(iconImg);
    button.dataset.type = toolbarButton.id;
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

