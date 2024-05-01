function createInfoPanel() {
  const infoOverlay = document.getElementById('ui-info-overlay') as HTMLElement;

  if (!infoOverlay) {
    console.error('InfoPanel element not found!');
    return;
  }

  infoOverlay.className = 'ui-info-overlay-container';

  const infoTitle = document.createElement('h1');
  infoTitle.textContent = 'INFO';
  infoOverlay.appendChild(infoTitle);

  const selectedObjectInfo = document.createElement('div');
  selectedObjectInfo.id = 'selected-object-info';
  infoOverlay.appendChild(selectedObjectInfo);
}

export { createInfoPanel };

