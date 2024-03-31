import * as THREE from 'three';
import {
  DEG2RAD,
  LEFT_MOUSE_BUTTON,
  MIDDLE_MOUSE_BUTTON,
  RIGHT_MOUSE_BUTTON,
  MIN_CAMERA_RADIUS,
  MAX_CAMERA_RADIUS,
  Y_AXIS,
  ROTATION_SENSITIVITY,
  PAN_SENSITIVITY,
  ZOOM_SENSITIVITY,
  MIN_CAMERA_ELEVATION,
  MAX_CAMERA_ELEVATION,
  INIT_CAMERA_ELEVATION,
  INIT_CAMERA_AZIMUTH,
} from './constants';

export function createCamera(
  gameWindow: HTMLElement,
  renderer: THREE.WebGLRenderer,
  citySize: number
): {
  camera: THREE.PerspectiveCamera;
  onMouseDown: (event: MouseEvent) => void;
  onMouseUp: (event: MouseEvent) => void;
  onMouseMove: (event: MouseEvent) => void;
  onMouseWheel: (event: WheelEvent) => void;
  onTouchStart: (event: TouchEvent) => void;
  onTouchMove: (event: TouchEvent) => void;
  onTouchEnd: (event: TouchEvent) => void;
  onWindowResize: () => void;
} {
  // Create a camera with a perspective projection.
  const camera = new THREE.PerspectiveCamera(
    75,
    gameWindow.offsetWidth / gameWindow.offsetHeight,
    0.1,
    1000
  );
  let cameraOrigin = new THREE.Vector3(citySize / 2, 0, citySize / 2);
  let cameraRadius = (MIN_CAMERA_RADIUS + MAX_CAMERA_RADIUS) / 2;
  let cameraAzimuth = INIT_CAMERA_AZIMUTH;
  let cameraElevation = INIT_CAMERA_ELEVATION;
  let startTouches: { x: number; y: number } = { x: 0, y: 0 };
  let isLeftMouseDown = false;
  let isMiddleMouseDown = false;
  let isRightMouseDown = false;
  let isPanning = false;
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
    const deltaX = event.clientX - prevMouseX;
    const deltaY = event.clientY - prevMouseY;

    // Handle rotation
    if (isLeftMouseDown) {
      cameraAzimuth += -(deltaX * ROTATION_SENSITIVITY);
      cameraElevation += -(deltaY * ROTATION_SENSITIVITY);
      cameraElevation = Math.min(
        MAX_CAMERA_ELEVATION,
        Math.max(MIN_CAMERA_ELEVATION, cameraElevation)
      );
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

      cameraOrigin.add(forward.multiplyScalar(PAN_SENSITIVITY * deltaY));
      cameraOrigin.add(left.multiplyScalar(PAN_SENSITIVITY * deltaX));
      updateCameraPosition();
    }

    // Handle zoom
    if (isRightMouseDown) {
      cameraRadius += deltaY * ZOOM_SENSITIVITY;
      cameraRadius = Math.min(
        MAX_CAMERA_RADIUS,
        Math.max(MIN_CAMERA_RADIUS, cameraRadius)
      );
      updateCameraPosition();
    }

    prevMouseX = event.clientX;
    prevMouseY = event.clientY;
  }

  function onMouseWheel(event: WheelEvent): void {
    event.preventDefault();

    const deltaX = event.deltaX;
    const deltaY = event.deltaY;

    // Translate the wheel movement into panning
    const forward = new THREE.Vector3(0, 0, 1).applyQuaternion(
      camera.quaternion
    );
    const right = new THREE.Vector3(1, 0, 0).applyQuaternion(camera.quaternion);

    // Adjust panning direction and speed based on the delta values
    camera.position.addScaledVector(forward, -deltaY * PAN_SENSITIVITY);
    camera.position.addScaledVector(right, -deltaX * PAN_SENSITIVITY);
  }

  function onTouchStart(event: TouchEvent): void {
    if (event.touches.length === 2) {
      isPanning = true;
      startTouches = getAverageTouchPosition(event.touches);
      event.preventDefault();
    }
  }

  function onTouchMove(event: TouchEvent): void {
    if (isPanning && event.touches.length === 2) {
      const currentTouches = getAverageTouchPosition(event.touches);
      const deltaX: number = currentTouches.x - startTouches.x;
      const deltaY: number = currentTouches.y - startTouches.y;

      const forward = new THREE.Vector3(0, 0, 1).applyAxisAngle(
        Y_AXIS,
        cameraAzimuth * DEG2RAD
      );
      const left = new THREE.Vector3(1, 0, 0).applyAxisAngle(
        Y_AXIS,
        cameraAzimuth * DEG2RAD
      );

      cameraOrigin.add(forward.multiplyScalar(-PAN_SENSITIVITY * deltaY));
      cameraOrigin.add(left.multiplyScalar(-PAN_SENSITIVITY * deltaX));
      updateCameraPosition();

      startTouches = currentTouches; // Update the start position for the next move
      event.preventDefault();
    }
  }

  function onTouchEnd(event: TouchEvent): void {
    if (event.touches.length < 2) {
      isPanning = false;
    }
  }

  function getAverageTouchPosition(touches: TouchList): {
    x: number;
    y: number;
  } {
    let avgX: number = 0;
    let avgY: number = 0;
    for (let i = 0; i < touches.length; i++) {
      avgX += touches[i].clientX;
      avgY += touches[i].clientY;
    }
    avgX /= touches.length;
    avgY /= touches.length;
    return { x: avgX, y: avgY };
  }

  return {
    camera,
    onMouseDown,
    onMouseUp,
    onMouseMove,
    onMouseWheel,
    onTouchStart,
    onTouchMove,
    onTouchEnd,
    onWindowResize,
  };
}

