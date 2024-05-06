import CONFIG from '../config';
import { getIcon } from '../assetManager/icons';
import { City, ICity } from '../city';
import { BuildingEntity } from '../city/building/buildingCreator';
import { ITile } from '../city/tile';
import { ISceneManager, SceneManager } from '../sceneManager';
import { createUi } from '../ui';
import { TOOLBAR_BUTTONS, ToggleButton } from '../ui/constants';
import { setupEventListeners } from './utils';

export interface IGame {
  selectedControl: HTMLElement | null;
  activeToolId: string | null;
  isPaused: boolean;
  focusedObject: BuildingEntity | ITile | null;
  step(): void;
  onToolSelected(event: MouseEvent): void;
  togglePause(): void;
}

export class Game implements IGame {
  selectedControl: HTMLElement | null = document.getElementById(
    TOOLBAR_BUTTONS.SELECT.id
  );
  activeToolId: string | null = TOOLBAR_BUTTONS.SELECT.id;
  isPaused: boolean = false;
  focusedObject: BuildingEntity | ITile | null = null;
  lastMove: number = Date.now();
  private city: ICity = new City(CONFIG.CITY.SIZE);
  private sceneManager: ISceneManager = new SceneManager(this.city);

  constructor() {
    this.sceneManager.start();
    createUi();

    this.selectedControl = document.getElementById(TOOLBAR_BUTTONS.SELECT.id);
    this.selectedControl?.classList.add('selected');
    setupEventListeners(
      this,
      this.sceneManager,
      this.onMouseDown,
      this.onMouseMove
    );
    setInterval(() => this.step(), 1000);
  }

  step(): void {
    if (this.isPaused) return;
    this.city.step();
    this.sceneManager.update(this.city);
    this.updateTitleBar();
    this.updateInfoOverlay();
  }

  onToolSelected(event: MouseEvent): void {
    if (this.selectedControl) {
      this.selectedControl.classList.remove('selected');
    }
    this.selectedControl = event.target as HTMLElement;
    this.selectedControl.classList.add('selected');
    this.activeToolId = this.selectedControl.getAttribute('data-type') || null;
  }

  togglePause(): void {
    this.isPaused = !this.isPaused;

    const toggleButton = document.getElementById(
      TOOLBAR_BUTTONS.TOGGLE_PAUSE.id
    ) as HTMLButtonElement;

    if (toggleButton) {
      const toggleButtonInfo = TOOLBAR_BUTTONS.TOGGLE_PAUSE as ToggleButton;
      const newState = this.isPaused
        ? toggleButtonInfo.uiTextPlay
        : toggleButtonInfo.uiTextPause;
      const newIcon = getIcon(
        this.isPaused ? toggleButtonInfo.iconPlay : toggleButtonInfo.iconPause
      );

      toggleButton.innerHTML = `<img src="${newIcon}" alt="${newState}" style="width: 100%; height: 100%; pointer-events: none;">`;
      toggleButton.dataset.state = newState;
      if (this.isPaused) {
        toggleButton.classList.add('selected');
      } else {
        toggleButton.classList.remove('selected');
      }
    }
  }

  private onMouseDown(event: MouseEvent): void {
    if (event.button === 0) {
      const selectedObject = this.sceneManager.getSelectedObject(event);
      this.useActiveTool(selectedObject as THREE.Object3D);
    }
  }

  private onMouseMove(event: MouseEvent): void {
    if (Date.now() - this.lastMove < 16) return;
    this.lastMove = Date.now();
    const hoverObject = this.sceneManager.getSelectedObject(event);
    this.sceneManager.setHighlightedMesh(hoverObject as THREE.Mesh);
    if (hoverObject && event.buttons & 1) {
      this.useActiveTool(hoverObject as THREE.Object3D);
    }
  }

  private useActiveTool(object: THREE.Object3D | null): void {
    if (!object) {
      this.updateInfoOverlay(true);
      return;
    }
    const tile = object.userData as ITile;
    console.log('tile', tile)
    if (this.activeToolId === TOOLBAR_BUTTONS.SELECT.id) {
      this.sceneManager.setActiveObject(object);
      this.focusedObject = tile;
      this.updateInfoOverlay();
    } else if (
      this.activeToolId === TOOLBAR_BUTTONS.BULLDOZE.id &&
      tile.building
    ) {
      tile.removeBuilding();
      this.city.update();
      this.sceneManager.update(this.city);
    } else if (!tile.building) {
      tile.placeBuilding(this.activeToolId);
      this.city.update();
      this.sceneManager.update(this.city);
    }
  }

  private updateInfoOverlay(clear?: boolean): void {
    const infoOverlayDetails = document.getElementById('info-overlay-details');
    const tile = clear ? null : this.focusedObject || null;
    if (infoOverlayDetails) {
      infoOverlayDetails.innerHTML = tile ? tile.toHTML() : '';
    }
  }

  private updateTitleBar(): void {
    const populationCounter = document.getElementById('population-counter');
    if (populationCounter) {
      populationCounter.textContent = this.city.getPopulation();
    }
  }
}

