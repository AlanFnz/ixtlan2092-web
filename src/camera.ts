import * as THREE from 'three';

export function createCamera(gameWindow: HTMLElement): {
  camera: THREE.PerspectiveCamera;
  onMouseDown: () => void;
  onMouseUp: () => void;
  onMouseMove: (event: MouseEvent) => void;
} {
  if (!gameWindow) {
    console.error('Failed to find the render target element!');
    return {
      camera: new THREE.PerspectiveCamera(75, 1, 0.1, 1000), // Default values
      onMouseDown: () => {},
      onMouseUp: () => {},
      onMouseMove: () => {},
    };
  }
  // Create a camera with a perspective projection.
  const camera = new THREE.PerspectiveCamera(
    75,
    gameWindow.offsetWidth / gameWindow.offsetHeight,
    0.1,
    1000
  );
  let cameraRadius = 4;
  let cameraAzimuth = 0;
  let cameraElevation = 0;
  let isMouseDown = false;
  let prevMouseX = 0;
  let prevMouseY = 0;
  updateCameraPosition();

  function updateCameraPosition() {
    camera.position.x =
      cameraRadius *
      Math.sin((cameraAzimuth * Math.PI) / 360) *
      Math.cos((cameraElevation * Math.PI) / 360);
    camera.position.y =
      cameraRadius * Math.sin((cameraElevation * Math.PI) / 360);
    camera.position.z =
      cameraRadius *
      Math.cos((cameraAzimuth * Math.PI) / 360) *
      Math.cos((cameraElevation * Math.PI) / 360);
    camera.lookAt(0, 0, 0);
    camera.updateMatrix();
  }

  function onMouseDown() {
    console.log('mouseDown');
    isMouseDown = true;
  }

  function onMouseUp() {
    console.log('mouseUp');
    isMouseDown = false;
  }

  function onMouseMove(event: MouseEvent) {
    console.log('mouseMove');
    if (isMouseDown) {
      cameraAzimuth += -((event.clientX - prevMouseX) * 0.5);
      cameraElevation += -((event.clientY - prevMouseY) * 0.5);
      cameraElevation = Math.min(180, Math.max(0, cameraElevation));
      updateCameraPosition();
    }

    prevMouseX = event.clientX;
    prevMouseY = event.clientY;
  }

  return {
    camera,
    onMouseDown,
    onMouseUp,
    onMouseMove,
  };
}

