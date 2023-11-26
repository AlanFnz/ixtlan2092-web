import * as THREE from 'three';

// Constants
const DEG2RAD = Math.PI / 180;
const LEFT_MOUSE_BUTTON = 0;
const MIDDLE_MOUSE_BUTTON = 1;
const RIGHT_MOUSE_BUTTON = 2;
const MIN_CAMERA_RADIUS = 2;
const MAX_CAMERA_RADIUS = 10;
const Y_AXIS = new THREE.Vector3(0, 1, 0);

export function createCamera(
  gameWindow: HTMLElement,
  renderer: THREE.WebGLRenderer
): {
  camera: THREE.PerspectiveCamera;
  onMouseDown: (event: MouseEvent) => void;
  onMouseUp: (event: MouseEvent) => void;
  onMouseMove: (event: MouseEvent) => void;
  onWindowResize: () => void;
} {
  // Create a camera with a perspective projection.
  const camera = new THREE.PerspectiveCamera(
    75,
    gameWindow.offsetWidth / gameWindow.offsetHeight,
    0.1,
    1000
  );
  let cameraOrigin = new THREE.Vector3();
  let cameraRadius = 4;
  let cameraAzimuth = 0;
  let cameraElevation = 0;
  let isLeftMouseDown = false;
  let isMiddleMouseDown = false;
  let isRightMouseDown = false;
  let prevMouseX = 0;
  let prevMouseY = 0;
  updateCameraPosition();

  function updateCameraPosition() {
    camera.position.x =
      cameraRadius *
      Math.sin(cameraAzimuth * DEG2RAD) *
      Math.cos(cameraElevation * DEG2RAD);
    camera.position.y = cameraRadius * Math.sin(cameraElevation * DEG2RAD);
    camera.position.z =
      cameraRadius *
      Math.cos(cameraAzimuth * DEG2RAD) *
      Math.cos(cameraElevation * DEG2RAD);
    camera.position.add(cameraOrigin);
    camera.lookAt(cameraOrigin);
    camera.updateMatrix();
  }

  // Handle window resizing
  function onWindowResize() {
    if (!gameWindow || !camera) return;
    camera.aspect = gameWindow.offsetWidth / gameWindow.offsetHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(gameWindow.offsetWidth, gameWindow.offsetHeight);
  }

  function onMouseDown(event: MouseEvent) {
    console.log('camera mouseDown');
    if (event.button === LEFT_MOUSE_BUTTON) {
      isLeftMouseDown = true;
    }

    if (event.button === MIDDLE_MOUSE_BUTTON) {
      isMiddleMouseDown = true;
    }

    if (event.button === RIGHT_MOUSE_BUTTON) {
      isRightMouseDown = true;
    }
  }

  function onMouseUp(event: MouseEvent) {
    console.log('camera mouseUp');
    if (event.button === LEFT_MOUSE_BUTTON) {
      isLeftMouseDown = false;
    }

    if (event.button === MIDDLE_MOUSE_BUTTON) {
      isMiddleMouseDown = false;
    }

    if (event.button === RIGHT_MOUSE_BUTTON) {
      isRightMouseDown = false;
    }
  }

  function onMouseMove(event: MouseEvent) {
    console.log('camera mouseMove');

    const deltaX = event.clientX - prevMouseX;
    const deltaY = event.clientY - prevMouseY;

    // Handle rotation
    if (isLeftMouseDown) {
      cameraAzimuth += -(deltaX * 0.5);
      cameraElevation += -(deltaY * 0.5);
      cameraElevation = Math.min(180, Math.max(0, cameraElevation));
      updateCameraPosition();
    }

    // Handle panning
    if (isMiddleMouseDown) {
      const forward = new THREE.Vector3(0, 0, 1).applyAxisAngle(
        Y_AXIS,
        cameraAzimuth * DEG2RAD
      );
      const left = new THREE.Vector3(1, 0, 0).applyAxisAngle(
        Y_AXIS,
        cameraAzimuth * DEG2RAD
      );

      cameraOrigin.add(forward.multiplyScalar(-0.01 * deltaY));
      cameraOrigin.add(left.multiplyScalar(-0.01 * deltaX));
      updateCameraPosition();
    }

    // Handle zoom
    if (isRightMouseDown) {
      cameraRadius += deltaY * 0.02;
      cameraRadius = Math.min(
        MAX_CAMERA_RADIUS,
        Math.max(MIN_CAMERA_RADIUS, cameraRadius)
      );
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
    onWindowResize,
  };
}

