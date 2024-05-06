import { IGame } from '.';
import { BUILDING_TYPE } from '../city/building/constants';
import { ISceneManager } from '../sceneManager';

function isActiveToolIdValid(
  toolId: string
): toolId is keyof typeof BUILDING_TYPE {
  return Object.values(BUILDING_TYPE).includes(toolId as any);
}

export function setupEventListeners(
  game: IGame,
  sceneManager: ISceneManager,
  onMouseDown: (event: MouseEvent) => void,
  onMouseMove: (event: MouseEvent) => void
) {
  document.addEventListener(
    'wheel',
    sceneManager.cameraManager.onMouseWheel.bind(game),
    { passive: false }
  );

  document.addEventListener('mousedown', onMouseDown.bind(game), false);
  document.addEventListener('mousemove', onMouseMove.bind(game), false);

  document.addEventListener(
    'contextmenu',
    (event) => event.preventDefault(),
    false
  );

  document.addEventListener(
    'touchstart',
    sceneManager.cameraManager.onTouchStart,
    { passive: false }
  );

  document.addEventListener(
    'touchmove',
    sceneManager.cameraManager.onTouchMove,
    { passive: false }
  );

  document.addEventListener('touchend', sceneManager.cameraManager.onTouchEnd);
}

export { isActiveToolIdValid };

