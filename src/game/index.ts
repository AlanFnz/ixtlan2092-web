import { createScene } from '../scene';
import { createCity } from '../city';
import { CITY_SIZE } from './constants';

export function createGame() {
  const scene = createScene(CITY_SIZE);
  const city = createCity(CITY_SIZE);

  const game = {
    update() {
      city?.update();
      scene?.update(city);
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
    });
  }

  return game;
}

