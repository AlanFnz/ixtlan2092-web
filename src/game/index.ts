import { createScene } from '../scene';
import { createCity } from '../city';
import { CITY_SIZE, Game } from './constants';
import { BUILDING_ID } from '../buildings/constants';
import buildingFactory from '../buildings';
import { isActiveToolIdValid } from './utils';

export function createGame(): Game {
  let activeToolId = '';
  const scene = createScene(CITY_SIZE);
  const city = createCity(CITY_SIZE);

  const game = {
    update() {
      city?.update();
      scene?.update(city);
    },
    setActiveToolId(toolId: string) {
      activeToolId = toolId;
    },
  };

  setInterval(() => {
    game.update();
  }, 1000);

  if (scene) {
    scene.start();
    scene.initScene(city);
    scene.setOnObjectSelected((selectedObject: any) => {
      const { x, y } = selectedObject?.userData;
      const tile = city?.data[x][y];

      if (activeToolId === 'bulldoze' && tile.building && tile.building.id) {
        tile.building = undefined;
      } else if (!tile.building) {
        tile.building =
          buildingFactory[activeToolId] && buildingFactory[activeToolId]();
      }

      scene.update(city);
    });
  }

  return game;
}

