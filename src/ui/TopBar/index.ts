function createTopBar() {
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

export { createTopBar };

