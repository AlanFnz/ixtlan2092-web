import * as THREE from 'three';
import { createCamera } from './camera';

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

  // Create a sample mesh
  const mesh = createSampleMesh();
  scene.add(mesh);

  // Handle window resizing
  function onWindowResize() {
    if (!gameWindow || !camera) return;
    camera.onWindowResize();
  }

  function createSampleMesh() {
    const geometry = new THREE.BoxGeometry(1, 1, 1);
    const material = new THREE.MeshBasicMaterial({ color: 0xff0000 });
    return new THREE.Mesh(geometry, material);
  }

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

  // Add listeners
  document.addEventListener('mousedown', onMouseDown, false);
  document.addEventListener('mouseup', onMouseUp, false);
  document.addEventListener('mousemove', (event) => onMouseMove(event), false);

  return {
    start,
    stop,
  };
}

