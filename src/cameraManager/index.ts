import * as THREE from 'three';
import {
  DEG2RAD,
  LEFT_MOUSE_BUTTON,
  MIDDLE_MOUSE_BUTTON,
  RIGHT_MOUSE_BUTTON,
  MIN_CAMERA_RADIUS,
  MAX_CAMERA_RADIUS,
  Y_AXIS,
  AZIMUTH_SENSITIVITY,
  PAN_SENSITIVITY,
  ZOOM_SENSITIVITY,
  MIN_CAMERA_ELEVATION,
  MAX_CAMERA_ELEVATION,
  INIT_CAMERA_ELEVATION,
  INIT_CAMERA_AZIMUTH,
  ELEVATION_SENSITIVITY,
  CAMERA_SIZE,
} from './constants';

export interface ICameraManager {
  camera: THREE.OrthographicCamera;
  onMouseDown(event: MouseEvent): void;
  onMouseUp(event: MouseEvent): void;
  onMouseMove(event: MouseEvent): void;
  onMouseWheel(event: WheelEvent): void;
  onTouchStart(event: TouchEvent): void;
  onTouchMove(event: TouchEvent): void;
  onTouchEnd(event: TouchEvent): void;
  onWindowResize(): void;
}

export class CameraManager implements ICameraManager {
  public camera: THREE.OrthographicCamera;
  private gameWindow: HTMLElement;
  private renderer: THREE.WebGLRenderer;
  private citySize: number;
  private aspect: number;
  private cameraOrigin: THREE.Vector3;
  private cameraRadius: number;
  private cameraAzimuth: number;
  private cameraElevation: number;
  private startTouches: { x: number; y: number };
  private isLeftMouseDown: boolean;
  private isMiddleMouseDown: boolean;
  private isRightMouseDown: boolean;
  private isPanning: boolean;
  private prevMouseX: number;
  private prevMouseY: number;

  constructor(
    gameWindow: HTMLElement,
    renderer: THREE.WebGLRenderer,
    citySize: number
  ) {
    this.aspect = gameWindow.clientWidth / gameWindow.clientHeight;
    this.gameWindow = gameWindow;
    this.renderer = renderer;
    this.citySize = citySize;

    this.camera = new THREE.OrthographicCamera(
      (CAMERA_SIZE * this.aspect) / -2,
      (CAMERA_SIZE * this.aspect) / 2,
      CAMERA_SIZE / 2,
      CAMERA_SIZE / -2,
      1,
      1000
    );

    this.cameraOrigin = new THREE.Vector3(citySize / 2, 0, citySize / 2);
    this.cameraRadius = (MIN_CAMERA_RADIUS + MAX_CAMERA_RADIUS) / 2;
    this.cameraAzimuth = INIT_CAMERA_AZIMUTH;
    this.cameraElevation = INIT_CAMERA_ELEVATION;
    this.startTouches = { x: 0, y: 0 };
    this.isLeftMouseDown = false;
    this.isMiddleMouseDown = false;
    this.isRightMouseDown = false;
    this.isPanning = false;
    this.prevMouseX = 0;
    this.prevMouseY = 0;

    this.updateCameraPosition();
    this.camera.updateProjectionMatrix();

    this.onMouseDown = this.onMouseDown.bind(this);
    this.onMouseUp = this.onMouseUp.bind(this);
    this.onMouseMove = this.onMouseMove.bind(this);
    this.onMouseWheel = this.onMouseWheel.bind(this);
    this.onTouchStart = this.onTouchStart.bind(this);
    this.onTouchMove = this.onTouchMove.bind(this);
    this.onTouchEnd = this.onTouchEnd.bind(this);
    this.onWindowResize = this.onWindowResize.bind(this);
  }

  private updateCameraPosition() {
    this.camera.position.x =
      this.cameraRadius *
      Math.sin(this.cameraAzimuth * DEG2RAD) *
      Math.cos(this.cameraElevation * DEG2RAD);
    this.camera.position.y =
      this.cameraRadius * Math.sin(this.cameraElevation * DEG2RAD);
    this.camera.position.z =
      this.cameraRadius *
      Math.cos(this.cameraAzimuth * DEG2RAD) *
      Math.cos(this.cameraElevation * DEG2RAD);
    this.camera.position.add(this.cameraOrigin);
    this.camera.lookAt(this.cameraOrigin);
    this.camera.updateMatrix();
  }

  public onWindowResize() {
    if (!this.gameWindow || !this.camera) return;
    this.camera.left = (CAMERA_SIZE * this.aspect) / -2;
    this.camera.right = (CAMERA_SIZE * this.aspect) / 2;
    this.camera.updateProjectionMatrix();
  }

  public onMouseDown(event: MouseEvent) {
    if (event.button === LEFT_MOUSE_BUTTON) {
      this.isLeftMouseDown = true;
    }

    if (event.button === MIDDLE_MOUSE_BUTTON) {
      this.isMiddleMouseDown = true;
    }

    if (event.button === RIGHT_MOUSE_BUTTON) {
      this.isRightMouseDown = true;
    }
  }

  public onMouseUp(event: MouseEvent) {
    if (event.button === LEFT_MOUSE_BUTTON) {
      this.isLeftMouseDown = false;
    }

    if (event.button === MIDDLE_MOUSE_BUTTON) {
      this.isMiddleMouseDown = false;
    }

    if (event.button === RIGHT_MOUSE_BUTTON) {
      this.isRightMouseDown = false;
    }
  }

  public onMouseMove(event: MouseEvent) {
    const deltaX = event.clientX - this.prevMouseX;
    const deltaY = event.clientY - this.prevMouseY;

    if (this.isRightMouseDown) {
      if (event.ctrlKey) {
        this.handlePanning(deltaY, deltaX);
      } else {
        // rotation
        this.cameraAzimuth += -(deltaX * AZIMUTH_SENSITIVITY);
        this.cameraElevation += -(deltaY * ELEVATION_SENSITIVITY);
        this.cameraElevation = Math.min(
          MAX_CAMERA_ELEVATION,
          Math.max(MIN_CAMERA_ELEVATION, this.cameraElevation)
        );
      }
      this.updateCameraPosition();
    }

    if (this.isMiddleMouseDown) {
      this.handlePanning(deltaY, deltaX);
    }

    this.prevMouseX = event.clientX;
    this.prevMouseY = event.clientY;
  }

  public onMouseWheel(event: WheelEvent): void {
    event.preventDefault();

    const zoomAmount = event.deltaY * ZOOM_SENSITIVITY;

    this.cameraRadius += zoomAmount;
    this.cameraRadius = Math.max(
      MIN_CAMERA_RADIUS,
      Math.min(MAX_CAMERA_RADIUS, this.cameraRadius)
    );

    this.updateCameraPosition();
  }

  public onTouchStart(event: TouchEvent): void {
    if (event.touches.length === 2) {
      this.isPanning = true;
      this.startTouches = this.getAverageTouchPosition(event.touches);
      event.preventDefault();
    }
  }

  public onTouchMove(event: TouchEvent): void {
    if (this.isPanning && event.touches.length === 2) {
      const currentTouches = this.getAverageTouchPosition(event.touches);
      const deltaX: number = currentTouches.x - this.startTouches.x;
      const deltaY: number = currentTouches.y - this.startTouches.y;

      const forward = new THREE.Vector3(0, 0, 1).applyAxisAngle(
        Y_AXIS,
        this.cameraAzimuth * DEG2RAD
      );
      const left = new THREE.Vector3(1, 0, 0).applyAxisAngle(
        Y_AXIS,
        this.cameraAzimuth * DEG2RAD
      );

      this.cameraOrigin.add(forward.multiplyScalar(-PAN_SENSITIVITY * deltaY));
      this.cameraOrigin.add(left.multiplyScalar(-PAN_SENSITIVITY * deltaX));
      this.updateCameraPosition();

      this.startTouches = currentTouches; // Update the start position for the next move
      event.preventDefault();
    }
  }

  public onTouchEnd(event: TouchEvent): void {
    if (event.touches.length < 2) {
      this.isPanning = false;
    }
  }

  private getAverageTouchPosition(touches: TouchList): {
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

  private handlePanning(deltaY: number, deltaX: number) {
    const forward = new THREE.Vector3(0, 0, 1).applyAxisAngle(
      Y_AXIS,
      this.cameraAzimuth * DEG2RAD
    );
    const left = new THREE.Vector3(1, 0, 0).applyAxisAngle(
      Y_AXIS,
      this.cameraAzimuth * DEG2RAD
    );

    this.cameraOrigin.add(forward.multiplyScalar(PAN_SENSITIVITY * deltaY));
    this.cameraOrigin.add(left.multiplyScalar(PAN_SENSITIVITY * deltaX));

    this.updateCameraPosition();
  }
}

