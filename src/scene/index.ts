import * as THREE from 'three';
import { createCameraManager } from '../camera';
import { City } from '../city/constants';
import { createAssetInstance } from '../assets';
import { Building } from '../city/building/constants';

export function createScene(citySize: number) {
  const gameWindow = document.getElementById('render-target');
  if (!gameWindow) {
    console.error('Failed to find the render target element!');
    throw new Error('Failed to find the render target element!');
  }

  const scene = new THREE.Scene();

  // renderer config
  const renderer = new THREE.WebGLRenderer();
  renderer.setSize(gameWindow.offsetWidth, gameWindow.offsetHeight);
  renderer.setClearColor(0x000000, 0);
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = THREE.PCFSoftShadowMap;
  gameWindow.appendChild(renderer.domElement);

  const cameraManager = createCameraManager(gameWindow, renderer, citySize);

  if (!cameraManager) {
    console.error('Failed to create camera!');
    throw new Error('Failed to create camera or camera not found');
  }

  function onWindowResize() {
    if (!gameWindow || !cameraManager) return;
    cameraManager.onWindowResize();
  }

  // init scene
  const raycaster = new THREE.Raycaster();
  const mouse = new THREE.Vector2();
  let activeObject: any = undefined;
  let hoverObject: any = undefined;
  let terrain: any[] = [];
  let buildings: any[] = [];

  function initScene(city: City) {
    scene.clear();
    buildings = Array.from({ length: city.size }, () =>
      new Array(city.size).fill(undefined)
    );

    for (let x = 0; x < city.size; x++) {
      const column = [];

      for (let y = 0; y < city.size; y++) {
        const tile = city.getTileByCoordinate({ x, y });
        if (tile?.terrainId) {
          const terrainMesh = createAssetInstance(
            tile.terrainId,
            x,
            y,
            tile.building
          );
          if (terrainMesh) {
            scene.add(terrainMesh);
            column.push(terrainMesh);
          }
        }
      }
      terrain.push(column);
      buildings.push(...Array(city.size).fill(undefined));
    }

    setupLights();
  }

  function update(city: City) {
    for (let x = 0; x < city.size; x++) {
      for (let y = 0; y < city.size; y++) {
        const tile = city.getTileByCoordinate({ x, y });
        const existingBuildingMesh = buildings[x][y];

        // if the player removes a building, remove it from the scene
        if (!tile?.building && existingBuildingMesh) {
          scene.remove(existingBuildingMesh);
          buildings[x][y] = undefined;
        }

        // if the data model has changed, update the mesh
        if (tile?.building && tile.building.updated) {
          scene.remove(existingBuildingMesh);
          buildings[x][y] = createAssetInstance(
            tile.building.type,
            x,
            y,
            tile.building
          );
          scene.add(buildings[x][y]);
          tile.building.updated = false;
        }
      }
    }
  }

  function setupLights() {
    const sun = new THREE.DirectionalLight(0xffffff, 4);
    sun.position.set(20, 10, 20);
    sun.castShadow = true;
    sun.shadow.camera.left = -10;
    sun.shadow.camera.right = 10;
    sun.shadow.camera.top = 0;
    sun.shadow.camera.bottom = -10;
    sun.shadow.mapSize.width = 1024;
    sun.shadow.mapSize.height = 1024;
    sun.shadow.camera.near = 0.5;
    sun.shadow.camera.far = 50;
    scene.add(sun);
    scene.add(new THREE.AmbientLight(0xffffff, 1));
  }

  function getSelectedObject(event: MouseEvent) {
    // compute normalized mouse coordinates
    mouse.x = (event.clientX / renderer.domElement.clientWidth) * 2 - 1;
    mouse.y = -(event.clientY / renderer.domElement.clientHeight) * 2 + 1;

    raycaster.setFromCamera(mouse, cameraManager.camera);

    let intersections = raycaster.intersectObjects(scene.children, false);

    if (intersections.length > 0) {
      return intersections[0].object;
    } else {
      return null;
    }
  }

  function setHighlightedObject(object: THREE.Object3D | null) {
    if (hoverObject && hoverObject !== activeObject) {
      setObjectEmission(hoverObject, 0x000000);
    }

    hoverObject = object;

    if (hoverObject) {
      setObjectEmission(hoverObject, 0x555555);
    }
  }

  function setActiveObject(object: Building) {
    setObjectEmission(activeObject, 0x000000);
    activeObject = object;
    setObjectEmission(activeObject, 0xaaaa55);
  }

  function setObjectEmission(object: THREE.Object3D, color: number) {
    if (!object) return;

    if (object instanceof THREE.Mesh) {
      const materials = Array.isArray(object.material)
        ? object.material
        : [object.material];

      materials.forEach((material) => {
        if (
          material instanceof THREE.MeshStandardMaterial ||
          material instanceof THREE.MeshPhongMaterial
        ) {
          material.emissive.setHex(color);
        }
      });
    }
  }

  function draw() {
    renderer.render(scene, cameraManager.camera);
  }

  function start() {
    renderer.setAnimationLoop(draw);
  }

  function stop() {
    window.removeEventListener('resize', onWindowResize, false);
    renderer.setAnimationLoop(null);
  }

  return {
    // props
    cameraManager,

    // functions
    initScene,
    start,
    stop,
    update,
    onWindowResize,
    setActiveObject,
    getSelectedObject,
    setHighlightedObject,
  };
}

