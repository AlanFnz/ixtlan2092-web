import personIcon from '../../assetManager/icons/person.png';

function createTopBar() {
  const topbar = document.getElementById('ui-topbar') as HTMLElement;
  if (!topbar) {
    console.error('Title bar element not found!');
    return;
  }

  const topbarLeftItems = document.createElement('div');
  topbarLeftItems.id = 'ui-topbar-left-items';
  topbarLeftItems.className = 'ui-topbar-left-items';
  topbarLeftItems.textContent = '$1000';
  topbar.appendChild(topbarLeftItems);

  const topbarCenterItems = document.createElement('div');
  topbarCenterItems.id = 'ui-topbar-center-items';
  topbarCenterItems.className = 'ui-topbar-center-items';
  topbarCenterItems.textContent = 'My City';
  topbar.appendChild(topbarCenterItems);

  const topbarRightItems = document.createElement('div');
  topbarRightItems.id = 'ui-topbar-right-items';
  topbarRightItems.className = 'ui-topbar-right-items';
  topbarRightItems.innerHTML =
    `<img id="population-icon" src=${personIcon}>` +
    '<span id="population-counter">0</span>';
  topbar.appendChild(topbarRightItems);
}

export { createTopBar };

