function createInfoPanel() {
  const infoPanel = document.getElementById('ui-infopanel') as HTMLElement;

  if (!infoPanel) {
    console.error('InfoPanel element not found!');
    return;
  }

  infoPanel.className = 'ui-infopanel-container';

  const infoTitle = document.createElement('h1');
  infoTitle.textContent = 'INFO';
  infoPanel.appendChild(infoTitle);

  const selectedObjectInfo = document.createElement('div');
  selectedObjectInfo.id = 'selected-object-info';
  infoPanel.appendChild(selectedObjectInfo);
}

export { createInfoPanel };

