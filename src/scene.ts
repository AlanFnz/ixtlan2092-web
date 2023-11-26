import * as THREE from 'three';

export function createScene() {
  // Initial scene setup
  const gameWindow = document.getElementById('render-target');
  if (!gameWindow) {
    console.error('Failed to find the render target element!');
    return;
  }

  // Create scene
  const scene = new THREE.Scene();
  scene.background = new THREE.Color(0x7777777);

  // Create a camera with a perspective projection.
  const camera = new THREE.PerspectiveCamera(
    75,
    gameWindow.offsetWidth / gameWindow.offsetHeight,
    0.1,
    1000
  );
  camera.position.z = 5; // Elevate camera from origin

  const renderer = new THREE.WebGLRenderer();
  renderer.setSize(gameWindow.offsetWidth, gameWindow.offsetHeight);
  gameWindow.appendChild(renderer.domElement);

  // Create a sample mesh
  const mesh = createSampleMesh();
  scene.add(mesh);

  // Handle window resizing
  function onWindowResize() {
    if (!gameWindow) return;
    camera.aspect = gameWindow.offsetWidth / gameWindow.offsetHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(gameWindow.offsetWidth, gameWindow.offsetHeight);
  }

  function createSampleMesh() {
    const geometry = new THREE.BoxGeometry(1, 1, 1);
    const material = new THREE.MeshBasicMaterial({ color: 0xff0000 });
    return new THREE.Mesh(geometry, material);
  }

  function draw() {
    mesh.rotation.x += 0.01;
    mesh.rotation.y += 0.01;
    renderer.render(scene, camera);
  }

  function start() {
    window.addEventListener('resize', onWindowResize, false);
    renderer.setAnimationLoop(draw);
  }

  function stop() {
    window.removeEventListener('resize', onWindowResize, false);
    renderer.setAnimationLoop(null);
  }

  function onMouseDown() {
    console.log('mouseDown');
  }

  function onMouseUp() {
    console.log('mouseUp');
  }

  function onMouseMove() {
    console.log('mouseMove');
  }

  return {
    start,
    stop,
    onMouseDown,
    onMouseUp,
    onMouseMove,
  };
}

