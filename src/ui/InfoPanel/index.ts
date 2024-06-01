function createInfoPanel() {
  const infoOverlay = document.getElementById('ui-info-overlay') as HTMLElement;

  if (!infoOverlay) {
    console.error('InfoPanel element not found!');
    return;
  }

  infoOverlay.id = 'info-panel';

  const headerContainer = document.createElement('div');
  headerContainer.className = 'info-heading';

  const infoTitle = document.createElement('span');
  infoTitle.textContent = 'INFO';
  headerContainer.appendChild(infoTitle);

  infoOverlay.appendChild(headerContainer);

  const detailsContainer = document.createElement('div');
  detailsContainer.id = 'info-overlay-details';

  infoOverlay.appendChild(detailsContainer);
}

export { createInfoPanel };

