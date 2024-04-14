import * as THREE from 'three';
import { createCameraManager } from '../camera';
import { City } from '../city/constants';
import { createAssetInstance } from '../assets';

export function createScene(citySize: number) {
  // Initial scene setup
  const gameWindow = document.getElementById('render-target');
  if (!gameWindow) {
    console.error('Failed to find the render target element!');
    throw new Error('Failed to find the render target element!');
  }

  // Create scene
  const scene = new THREE.Scene();
  scene.background = new THREE.Color(0x7777777);

  // Renderer config
  const renderer = new THREE.WebGLRenderer();
  renderer.setSize(gameWindow.offsetWidth, gameWindow.offsetHeight);
  renderer.setClearColor(0x000000, 0);
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = THREE.PCFSoftShadowMap;
  gameWindow.appendChild(renderer.domElement);

  // Create camera
  const cameraManager = createCameraManager(gameWindow, renderer, citySize);

  if (!cameraManager) {
    console.error('Failed to create camera!');
    throw new Error('Failed to create camera or camera not found');
  }

  // Handle window resizing
  function onWindowResize() {
    if (!gameWindow || !cameraManager) return;
    cameraManager.onWindowResize();
  }

  // Init scene
  const raycaster = new THREE.Raycaster();
  const mouse = new THREE.Vector2();
  let selectedObject: any;

  let terrain: any[] = [];
  let buildings: any[] = [];

  let onObjectSelected: any = undefined;

  function initScene(city: City) {
    scene.clear();
    buildings = Array.from({ length: city.size }, () =>
      new Array(city.size).fill(undefined)
    );

    for (let x = 0; x < city.size; x++) {
      const column = [];

      for (let y = 0; y < city.size; y++) {
        // Load the mesh/3D object corresponding to the tile at (x,y)
        // Terrain
        const terrainId = city?.tiles[x][y]?.terrainId;
        if (terrainId) {
          const terrainMesh = createAssetInstance(
            terrainId,
            x,
            y,
            city?.tiles[x][y]?.building
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

    // Add lights
    setupLights();
  }

  function update(city: City) {
    for (let x = 0; x < city.size; x++) {
      for (let y = 0; y < city.size; y++) {
        const tile = city.tiles[x][y];
        const existingBuildingMesh = buildings[x][y];

        // If the player removes a building, remove it from the scene
        if (!tile.building && existingBuildingMesh) {
          scene.remove(existingBuildingMesh);
          buildings[x][y] = undefined;
        }

        // If the data model has changed, update the mesh
        if (tile.building && tile.building.updated) {
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

  // Render and interaction handlers
  function draw() {
    renderer.render(scene, cameraManager.camera);
  }

  function start() {
    window.addEventListener('resize', onWindowResize, false);
    renderer.setAnimationLoop(draw);
  }

  function stop() {
    window.removeEventListener('resize', onWindowResize, false);
    renderer.setAnimationLoop(null);
  }

  function onMouseDown(event: MouseEvent) {
    cameraManager.onMouseDown(event);

    mouse.x = (event.clientX / renderer.domElement.clientWidth) * 2 - 1;
    mouse.y = -(event.clientY / renderer.domElement.clientHeight) * 2 + 1;

    raycaster.setFromCamera(mouse, cameraManager.camera);

    let intersections = raycaster.intersectObjects(scene.children, false);

    if (intersections.length > 0) {
      if (selectedObject) selectedObject.material?.emissive?.setHex(0);
      selectedObject = intersections[0]?.object;
      selectedObject?.material?.emissive?.setHex(0x555555);
      if (onObjectSelected) {
        onObjectSelected(selectedObject);
      }
    }
  }

  function onMouseUp(event: MouseEvent) {
    cameraManager.onMouseUp(event);
  }

  function onMouseMove(event: MouseEvent) {
    cameraManager.onMouseMove(event);
  }

  function onWheel(event: WheelEvent) {
    cameraManager.onMouseWheel(event);
  }

  function onTouchStart(event: TouchEvent) {
    cameraManager.onTouchStart(event);
  }

  function onTouchMove(event: TouchEvent) {
    cameraManager.onTouchMove(event);
  }

  function onTouchEnd(event: TouchEvent) {
    cameraManager.onTouchEnd(event);
  }

  // Add listeners
  document.addEventListener('mousedown', onMouseDown, false);
  document.addEventListener('mouseup', onMouseUp, false);
  document.addEventListener('mousemove', (event) => onMouseMove(event), false);
  document.addEventListener('wheel', onWheel, { passive: false });
  document.addEventListener('touchstart', onTouchStart, { passive: false });
  document.addEventListener('touchmove', onTouchMove, { passive: false });
  document.addEventListener('touchend', onTouchEnd);

  return {
    initScene,
    start,
    stop,
    update,
    cameraManager,
    setOnObjectSelected(callback: any) {
      onObjectSelected = callback;
    },
  };
}

