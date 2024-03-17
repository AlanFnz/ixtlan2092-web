import * as THREE from 'three';
import { createCamera } from '../camera';
import { City } from '../city/constants';
import { createGrass } from '../city/cityAssets';

export function createScene() {
  // Initial scene setup
  const gameWindow = document.getElementById('render-target');
  if (!gameWindow) {
    console.error('Failed to find the render target element!');
    throw new Error('Failed to find the render target element!');
  }

  // Create scene
  const scene = new THREE.Scene();
  scene.background = new THREE.Color(0x7777777);

  const renderer = new THREE.WebGLRenderer();
  renderer.setSize(gameWindow.offsetWidth, gameWindow.offsetHeight);
  gameWindow.appendChild(renderer.domElement);

  // Create camera
  const camera = createCamera(gameWindow, renderer);

  if (!camera) {
    console.error('Failed to create camera!');
    throw new Error('Failed to create camera or camera not found');
  }

  // Handle window resizing
  function onWindowResize() {
    if (!gameWindow || !camera) return;
    camera.onWindowResize();
  }

  // Init scene
  let meshes = [];
  function initScene(city: City) {
    scene.clear();
    meshes = [];

    for (let x = 0; x < city.size; x++) {
      const column = [];

      for (let y = 0; y < city.size; y++) {
        // Load the mesh/3D object corresponding to the tile at (x,y)
        // Add grass
        const grassMesh = createGrass(x, y);
        scene.add(grassMesh);
        column.push(grassMesh);
      }
      meshes.push(column);
    }

    // Add lights
    setupLights();
  }

  function setupLights() {
    const lights = [
      new THREE.AmbientLight(0xffffff, 0.8),
      new THREE.DirectionalLight(0xffffff, 0.8),
      new THREE.DirectionalLight(0xffffff, 0.8),
      new THREE.DirectionalLight(0xffffff, 0.8),
    ];

    lights[1]?.position?.set(0, 1, 0);
    lights[2]?.position?.set(1, 1, 0);
    lights[3]?.position?.set(0, 1, 1);

    scene.add(...lights);
  }

  // Render and interaction handlers
  function draw() {
    renderer.render(scene, camera.camera);
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
    camera.onMouseDown(event);
  }

  function onMouseUp(event: MouseEvent) {
    camera.onMouseUp(event);
  }

  function onMouseMove(event: MouseEvent) {
    camera.onMouseMove(event);
  }
  function onTouchStart(event: TouchEvent) {
    camera.onTouchStart(event);
  }
  function onTouchMove(event: TouchEvent) {
    camera.onTouchMove(event);
  }
  function onTouchEnd(event: TouchEvent) {
    camera.onTouchEnd(event);
  }

  // Add listeners
  document.addEventListener('mousedown', onMouseDown, false);
  document.addEventListener('mouseup', onMouseUp, false);
  document.addEventListener('mousemove', (event) => onMouseMove(event), false);
  document.addEventListener('touchstart', onTouchStart, { passive: false });
  document.addEventListener('touchmove', onTouchMove, { passive: false });
  document.addEventListener('touchend', onTouchEnd);

  return {
    initScene,
    start,
    stop,
  };
}

