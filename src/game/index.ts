import { createScene } from '../sceneManager';
import { createCity } from '../city';
import { CITY_SIZE, Game } from './constants';
import { createUi } from '../ui';
import { Tile } from '../city/constants';
import { TOOLBAR_BUTTONS, ToggleButton } from '../ui/constants';
import { getIcon } from '../assetManager/icons';

export function createGame(): Game {
  createUi();
  const scene = createScene(CITY_SIZE);
  const city = createCity(CITY_SIZE);

  let selectedControl: HTMLElement | null =
    document.getElementById('button-select');
  let activeToolId: string | null = 'select';
  let isPaused = false;
  let lastMove: any = new Date();

  function update() {
    if (isPaused) return;
    // update the city data model first, then update the scene
    city.update();
    scene.update(city);

    // update ui
    updateTitleBar();
  }

  // event listeners
  document.addEventListener('mousedown', onMouseDown, false);
  document.addEventListener('mouseup', scene.cameraManager.onMouseUp, false);
  document.addEventListener('mousemove', (event) => onMouseMove(event), false);
  document.addEventListener('wheel', scene.cameraManager.onMouseWheel, {
    passive: false,
  });
  document.addEventListener('touchstart', scene.cameraManager.onTouchStart, {
    passive: false,
  });
  document.addEventListener('touchmove', scene.cameraManager.onTouchMove, {
    passive: false,
  });
  document.addEventListener('touchend', scene.cameraManager.onTouchEnd);
  window.addEventListener('resize', scene.onWindowResize, false);

  // prevent context menu from popping up
  document.addEventListener(
    'contextmenu',
    (event) => event.preventDefault(),
    false
  );

  function onMouseDown(event: MouseEvent) {
    if (event.button === 0) {
      const selectedObject = scene.getSelectedObject(event);
      useActiveTool(selectedObject);
    }

    scene.cameraManager.onMouseDown(event);
  }

  function onMouseMove(event: MouseEvent) {
    // throttle event handler so it doesn't hurts performance
    if (Date.now() - lastMove < 1 / 60.0) return;
    lastMove = Date.now();

    // get the object the mouse is currently hovering over
    const hoverObject = scene.getSelectedObject(event);

    scene.setHighlightedObject(hoverObject);

    // if left mouse-button is down, use the tool as well
    if (hoverObject && event.buttons & 1) {
      useActiveTool(hoverObject);
    }

    scene.cameraManager.onMouseMove(event);
  }

  function togglePause() {
    isPaused = !isPaused;

    const toggleButton = document.getElementById(
      TOOLBAR_BUTTONS.TOGGLE_PAUSE.id
    ) as HTMLButtonElement;

    if (toggleButton) {
      const toggleButtonInfo = TOOLBAR_BUTTONS.TOGGLE_PAUSE as ToggleButton;
      const newState = isPaused
        ? toggleButtonInfo.uiTextPlay
        : toggleButtonInfo.uiTextPause;
      const newIcon = getIcon(
        isPaused ? toggleButtonInfo.iconPlay : toggleButtonInfo.iconPause
      );

      toggleButton.innerHTML = `<img src="${newIcon}" alt="${newState}" style="width: 100%; height: 100%; pointer-events: none;">`;
      toggleButton.dataset.state = newState;
      if (isPaused) {
        toggleButton.classList.add('selected');
      } else {
        toggleButton.classList.remove('selected');
      }
    }
  }

  function onToolSelected(event: MouseEvent) {
    if (event.target instanceof HTMLElement) {
      if (selectedControl) selectedControl.classList.remove('selected');
      selectedControl = event.target;
      selectedControl?.classList.add('selected');
      activeToolId = selectedControl?.getAttribute('data-type');
    }
  }

  function useActiveTool(object: any) {
    if (!object) {
      updateInfoOverlay(null);
      return;
    }

    const { x, y } = object.userData;
    const tile = city.getTileByCoordinate({ x, y });
    if (!tile) return;

    // select
    if (activeToolId === TOOLBAR_BUTTONS.SELECT.id) {
      scene.setActiveObject(object);
      updateInfoOverlay(tile);
    } else if (activeToolId === TOOLBAR_BUTTONS.BULLDOZE.id) {
      tile.removeBuilding();
    } else if (!tile.building && activeToolId) {
      tile.placeBuilding(activeToolId);
    }

    scene.update(city);
  }

  function updateInfoOverlay(tile: Tile | null) {
    const selectedObjectInfo = document.getElementById('info-overlay-details');
    if (selectedObjectInfo)
      selectedObjectInfo.innerHTML = tile ? tile.toHTML() : '';
  }

  function updateTitleBar() {
    const populationCounter = document.getElementById('population-counter');
    if (populationCounter) populationCounter.innerHTML = city.getPopulation();
  }

  setInterval(() => {
    update();
  }, 1000);

  if (scene) {
    scene.start();
    scene.initScene(city);
  }

  return {
    isPaused,
    update,
    onToolSelected,
    togglePause,
  };
}

