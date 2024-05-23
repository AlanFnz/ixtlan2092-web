import * as THREE from 'three';
import CONFIG from '../config';
import { ICity } from '../city';
import { AssetManager, IAssetManager } from '../assetManager';
import { ICameraManager, CameraManager } from '../cameraManager';

export interface ISceneManager {
  start(): void;
  stop(): void;
  update(city: ICity): void;
  cameraManager: ICameraManager;
  getSelectedObject(event: MouseEvent): THREE.Object3D | null;
  setActiveObject(object: THREE.Object3D): void;
  setHighlightedMesh(mesh: THREE.Mesh | null): void;
}

export class SceneManager implements ISceneManager {
  private renderer: THREE.WebGLRenderer;
  private scene: THREE.Scene;
  private gameWindow: HTMLElement;
  private assetManager: IAssetManager;
  private buildings: (THREE.Mesh | null)[][];
  private terrain: THREE.Mesh[][] = [];
  private raycaster: THREE.Raycaster;
  private mouse: THREE.Vector2;
  private activeObject: THREE.Object3D | null;
  private hoverObject: THREE.Object3D | null;
  cameraManager: ICameraManager;

  constructor(city: ICity, onLoad: () => void) {
    this.renderer = new THREE.WebGLRenderer({
      antialias: true,
    });
    this.scene = new THREE.Scene();
    this.gameWindow = document.getElementById('render-target') as HTMLElement;
    this.assetManager = new AssetManager(() => {
      console.log('assets loaded');
      this.initialize(city);
      onLoad();
    });
    this.cameraManager = new CameraManager(
      this.gameWindow,
      this.renderer,
      CONFIG.CITY.SIZE
    );
    this.buildings = [];
    this.terrain = [];

    this.renderer.setSize(
      this.gameWindow.offsetWidth,
      this.gameWindow.offsetHeight
    );
    this.renderer.setClearColor(0x000000, 0);
    this.renderer.shadowMap.enabled = true;
    this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    this.gameWindow.appendChild(this.renderer.domElement);
    window.addEventListener('resize', this.onResize.bind(this), false);

    this.raycaster = new THREE.Raycaster();
    this.mouse = new THREE.Vector2();
    this.activeObject = null;
    this.hoverObject = null;

    this.initialize(city);
  }

  private initialize(city: ICity): void {
    this.scene.clear();

    for (let x = 0; x < city.size; x++) {
      const column = [];
      for (let y = 0; y < city.size; y++) {
        const tile = city.getTile(x, y);
        if (tile) {
          const mesh = this.assetManager.createGroundMesh(tile);
          this.scene.add(mesh);
          column.push(mesh);
        }
      }
      this.buildings.push([...Array(city.size)]);
      this.terrain.push(column);
    }

    this.setupLights();
  }

  private setupLights(): void {
    const sun = new THREE.DirectionalLight(0xffffff, 1);
    sun.position.set(10, 20, 20);
    sun.castShadow = true;
    sun.shadow.camera.left = -10;
    sun.shadow.camera.right = 10;
    sun.shadow.camera.top = 0;
    sun.shadow.camera.bottom = -10;
    sun.shadow.mapSize.width = 1024;
    sun.shadow.mapSize.height = 1024;
    sun.shadow.camera.near = 10;
    sun.shadow.camera.far = 50;
    this.scene.add(sun);
    this.scene.add(new THREE.AmbientLight(0xffffff, 0.3));
  }

  update(city: ICity) {
    for (let x = 0; x < city.size; x++) {
      for (let y = 0; y < city.size; y++) {
        const tile = city.getTile(x, y);
        const existingBuildingMesh = this.buildings[x][y];

        if (tile) {
          if (!tile.building && existingBuildingMesh) {
            this.scene.remove(existingBuildingMesh);
            this.buildings[x][y] = null;
          }

          if (tile.building && tile.building.isMeshOutOfDate) {
            if (existingBuildingMesh) this.scene.remove(existingBuildingMesh);
            const newBuildingMesh = this.assetManager.createBuildingMesh(tile);

            this.terrain[x][y].visible = !tile.building?.hideTerrain ?? true;

            if (newBuildingMesh) {
              this.scene.add(newBuildingMesh);
              this.buildings[x][y] = newBuildingMesh;
            }
            tile.building.isMeshOutOfDate = false;
          }
        }
      }
    }
  }

  public start(): void {
    this.renderer.setAnimationLoop(this.draw.bind(this));
  }

  public stop(): void {
    this.renderer.setAnimationLoop(null);
  }

  private draw(): void {
    this.renderer.render(this.scene, this.cameraManager.camera);
  }

  public setHighlightedMesh(mesh: THREE.Mesh | null): void {
    if (this.hoverObject && this.hoverObject !== this.activeObject) {
      this.setMeshEmission(this.hoverObject, 0x000000);
    }
    this.hoverObject = mesh;
    if (this.hoverObject) {
      this.setMeshEmission(this.hoverObject, 0x555555);
    }
  }

  private setMeshEmission(mesh: THREE.Object3D | null, color: number): void {
    if (!mesh || !(mesh instanceof THREE.Mesh)) return;
    mesh.material.emissive?.setHex(color);
  }

  public getSelectedObject(event: MouseEvent): THREE.Object3D | null {
    this.mouse.x =
      (event.clientX / this.renderer.domElement.clientWidth) * 2 - 1;
    this.mouse.y =
      -(event.clientY / this.renderer.domElement.clientHeight) * 2 + 1;
    this.raycaster.setFromCamera(this.mouse, this.cameraManager.camera);
    let intersections = this.raycaster.intersectObjects(
      this.scene.children,
      true
    );
    if (intersections.length > 0) {
      return intersections[0].object;
    } else {
      return null;
    }
  }

  public setActiveObject(object: THREE.Object3D): void {
    if (this.activeObject) this.setMeshEmission(this.activeObject, 0x000000);
    this.activeObject = object;
    if (this.activeObject) this.setMeshEmission(this.activeObject, 0xaaaa55);
  }

  private onResize(): void {
    this.cameraManager.onWindowResize();
    this.renderer.setSize(
      this.gameWindow.clientWidth,
      this.gameWindow.clientHeight
    );
  }
}

