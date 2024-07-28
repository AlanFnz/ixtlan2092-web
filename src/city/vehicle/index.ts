import * as THREE from "three";
import { VehicleGraphNode } from "./vehicleGraphNode";
import CONFIG from "../../config";
import { IAssetManager } from "../../assetManager";

const FORWARD = new THREE.Vector3(1, 0, 0);

export class Vehicle extends THREE.Group {
  private createdTime: number;
  private cycleStartTime: number;
  private origin: VehicleGraphNode | null;
  private destination: VehicleGraphNode | null;
  private originWorldPosition: THREE.Vector3;
  private destinationWorldPosition: THREE.Vector3;
  private originToDestination: THREE.Vector3;
  private orientation: THREE.Vector3;
  private mesh: THREE.Mesh | null;

  constructor(
    origin: VehicleGraphNode,
    destination: VehicleGraphNode,
    assetManager: IAssetManager
  ) {
    super();

    this.createdTime = Date.now();
    this.cycleStartTime = this.createdTime;

    this.origin = origin;
    this.destination = destination;

    this.originWorldPosition = new THREE.Vector3();
    this.destinationWorldPosition = new THREE.Vector3();
    this.originToDestination = new THREE.Vector3();
    this.orientation = new THREE.Vector3();

    this.mesh = assetManager.createRandomVehicleMesh();
    if (this.mesh) {
      this.add(this.mesh);
    } else {
      console.error("Failed to create a random vehicle mesh.");
    }

    this.updateWorldPositions();
  }

  get cycleTime(): number {
    const distance = this.originToDestination.length();
    const cycleDuration = distance / CONFIG.VEHICLE.SPEED;
    const value = (Date.now() - this.cycleStartTime) / cycleDuration;

    return Math.max(0, Math.min(value, 1));
  }

  get age(): number {
    return Date.now() - this.createdTime;
  }

  update(): void {
    if (!this.origin || !this.destination) {
      this.dispose();
      return;
    }

    if (!this.destination.parent) {
      this.dispose();
      return;
    }

    if (this.age > CONFIG.VEHICLE.MAX_LIFETIME) {
      this.dispose();
      return;
    }

    if (this.cycleTime === 1) {
      this.pickNewDestination();
    } else {
      this.position.copy(this.originWorldPosition);
      this.position.lerp(this.destinationWorldPosition, this.cycleTime);
    }

    this.updateOpacity();
  }

  updateOpacity(): void {
    const setOpacity = (opacity: number) => {
      this.traverse((obj) => {
        if ((obj as THREE.Mesh).material) {
          ((obj as THREE.Mesh).material as THREE.Material).opacity = Math.max(
            0,
            Math.min(opacity, 1)
          );
        }
      });
    };

    if (this.age < CONFIG.VEHICLE.FADE_TIME) {
      setOpacity(this.age / CONFIG.VEHICLE.FADE_TIME);
    } else if (CONFIG.VEHICLE.MAX_LIFETIME - this.age < CONFIG.VEHICLE.FADE_TIME) {
      setOpacity(
        (CONFIG.VEHICLE.MAX_LIFETIME - this.age) / CONFIG.VEHICLE.FADE_TIME
      );
    } else {
      setOpacity(1);
    }
  }

  pickNewDestination(): void {
    this.origin = this.destination;
    this.destination = this.origin?.getRandomNextNode() || null;
    this.updateWorldPositions();
    this.cycleStartTime = Date.now();
  }

  updateWorldPositions(): void {
    if (!this.origin || !this.destination) {
      return;
    }

    this.origin.getWorldPosition(this.originWorldPosition);
    this.destination.getWorldPosition(this.destinationWorldPosition);

    this.originToDestination.copy(this.destinationWorldPosition);
    this.originToDestination.sub(this.originWorldPosition);

    this.orientation.copy(this.originToDestination);
    this.orientation.normalize();

    this.quaternion.setFromUnitVectors(FORWARD, this.orientation);
  }

  dispose(): void {
    this.traverse((obj) => {
      if ((obj as THREE.Mesh).material) {
        ((obj as THREE.Mesh).material as THREE.Material).dispose();
      }
    });
    this.removeFromParent();
  }
}
