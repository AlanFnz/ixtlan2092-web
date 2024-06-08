import * as THREE from 'three';
import {
  DEG2RAD,
  RIGHT_MOUSE_BUTTON,
  CAMERA_SIZE,
  MIN_CAMERA_RADIUS,
  MAX_CAMERA_RADIUS,
  MIN_CAMERA_ELEVATION,
  MAX_CAMERA_ELEVATION,
  AZIMUTH_SENSITIVITY,
  ELEVATION_SENSITIVITY,
  ZOOM_SENSITIVITY,
  PAN_SENSITIVITY,
  Y_AXIS,
} from './constants';

export interface ICameraManager {
  camera: THREE.OrthographicCamera;
  onMouseMove(event: MouseEvent): void;
  onMouseScroll(event: WheelEvent): void;
  onWindowResize(gameWindow: HTMLElement): void;
  onTouchStart(event: TouchEvent): void;
  onTouchMove(event: TouchEvent): void;
  onTouchEnd(event: TouchEvent): void;
}

export class CameraManager implements ICameraManager {
  public camera: THREE.OrthographicCamera;
  private cameraOrigin: THREE.Vector3;
  private cameraRadius: number;
  private cameraAzimuth: number;
  private cameraElevation: number;
  private startTouches: { x: number; y: number };
  private isPanning: boolean;

  constructor(gameWindow: HTMLElement) {
    const aspect = gameWindow.clientWidth / gameWindow.clientHeight;

    this.camera = new THREE.OrthographicCamera(
      (CAMERA_SIZE * aspect) / -2,
      (CAMERA_SIZE * aspect) / 2,
      CAMERA_SIZE / 2,
      CAMERA_SIZE / -2,
      1,
      1000
    );

    this.cameraOrigin = new THREE.Vector3(6, 0, 6);
    this.cameraRadius = 0.5;
    this.cameraAzimuth = 135;
    this.cameraElevation = 45;
    this.startTouches = { x: 0, y: 0 };
    this.isPanning = false;

    this.updateCameraPosition();
  }

  private updateCameraPosition(): void {
    this.camera.zoom = this.cameraRadius;
    this.camera.position.x =
      100 *
      Math.sin(this.cameraAzimuth * DEG2RAD) *
      Math.cos(this.cameraElevation * DEG2RAD);
    this.camera.position.y = 100 * Math.sin(this.cameraElevation * DEG2RAD);
    this.camera.position.z =
      100 *
      Math.cos(this.cameraAzimuth * DEG2RAD) *
      Math.cos(this.cameraElevation * DEG2RAD);
    this.camera.position.add(this.cameraOrigin);
    this.camera.lookAt(this.cameraOrigin);
    this.camera.updateProjectionMatrix();
  }

  public onMouseMove(event: MouseEvent): void {
    if (event.buttons & RIGHT_MOUSE_BUTTON && !event.ctrlKey) {
      this.cameraAzimuth += -(event.movementX * AZIMUTH_SENSITIVITY);
      this.cameraElevation += event.movementY * ELEVATION_SENSITIVITY;
      this.cameraElevation = Math.min(
        MAX_CAMERA_ELEVATION,
        Math.max(MIN_CAMERA_ELEVATION, this.cameraElevation)
      );
    }

    if (event.buttons & RIGHT_MOUSE_BUTTON && event.ctrlKey) {
      const forward = new THREE.Vector3(0, 0, 1).applyAxisAngle(
        Y_AXIS,
        this.cameraAzimuth * DEG2RAD
      );
      const left = new THREE.Vector3(1, 0, 0).applyAxisAngle(
        Y_AXIS,
        this.cameraAzimuth * DEG2RAD
      );
      this.cameraOrigin.add(
        forward.multiplyScalar(PAN_SENSITIVITY * event.movementY)
      );
      this.cameraOrigin.add(
        left.multiplyScalar(PAN_SENSITIVITY * event.movementX)
      );
    }

    this.updateCameraPosition();
  }

  public onMouseScroll(event: WheelEvent): void {
    this.cameraRadius *= 1 - event.deltaY * ZOOM_SENSITIVITY;
    this.cameraRadius = Math.min(
      MAX_CAMERA_RADIUS,
      Math.max(MIN_CAMERA_RADIUS, this.cameraRadius)
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

  public onWindowResize(gameWindow: HTMLElement): void {
    const aspect = gameWindow.clientWidth / gameWindow.clientHeight;
    this.camera.left = (CAMERA_SIZE * aspect) / -2;
    this.camera.right = (CAMERA_SIZE * aspect) / 2;
    this.camera.updateProjectionMatrix();
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
}

