import * as THREE from 'three';
import UNDER_CONSTRUCTION_MODEL from './models/under_construction.gltf';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { textures } from './textures';
import { ITile } from '../city/tile';
import { IZone } from '../city/building/interfaces';
import { BUILDING_TYPE } from '../city/building/constants';
import { models } from './models';
import { ModelEntry, ModelKey, modelType } from './constants';
import { DevelopmentState } from '../city/building/attributes/development';

const DEG2RAD = Math.PI / 180.0;

export interface IAssetManager {
  createGroundMesh(tile: ITile): THREE.Mesh;
  createBuildingMesh(tile: ITile): THREE.Mesh | null;
  createRandomVehicleMesh(): THREE.Mesh | null;
  textures: Record<string, THREE.Texture>;
}

export class AssetManager implements IAssetManager {
  private gltfLoader = new GLTFLoader();
  private cubeGeometry = new THREE.BoxGeometry(1, 1, 1);
  private onLoad = () => {};
  private modelCount = 0;
  private loadedModelCount = 0;
  private loadedModels: Record<ModelKey, THREE.Mesh> = {} as Record<
    ModelKey,
    THREE.Mesh
  >;

  public textures: Record<string, THREE.Texture> = {
    grass: textures.GRASS,
    base: textures.BASE,
    grid: textures.GRID,
    specular: textures.SPECULAR,
  };

  constructor(onLoad: any) {
    this.modelCount = Object.keys(models).length;
    this.loadedModelCount = 0;

    for (const [modelName, meta] of Object.entries(models)) {
      this.loadModel(modelName as ModelKey, meta);
    }

    this.onLoad = onLoad;
  }

  loadModel(
    name: ModelKey,
    {
      filename,
      file,
      scale = 1,
      rotation = 0,
      receiveShadow = true,
      castShadow = true,
    }: ModelEntry
  ): void {
    this.gltfLoader.load(
      file,
      (glb) => {
        console.log(`Loaded file: ${file}`);
        // try to find a mesh in the children of the scene
        let mesh: THREE.Mesh | null = null;
        glb.scene.traverse((child) => {
          if ((child as THREE.Mesh).isMesh) {
            mesh = child as THREE.Mesh;
          }
        });

        if (!mesh) {
          console.error(`Model ${name} does not contain a mesh.`);
          return;
        }

        (mesh as THREE.Object3D).traverse((node) => {
          if ((node as THREE.Mesh).isMesh) {
            (node as THREE.Mesh).material = new THREE.MeshLambertMaterial({
              map: this.textures.base,
              specularMap: this.textures.specular,
            });
            node.receiveShadow = receiveShadow;
            node.castShadow = castShadow;
          }
        });

        (mesh as THREE.Object3D).position.set(0, 0, 0);
        (mesh as THREE.Object3D).rotation.set(
          0,
          THREE.MathUtils.degToRad(rotation),
          0
        );
        (mesh as THREE.Object3D).scale.set(scale / 30, scale / 30, scale / 30);
        (mesh as THREE.Object3D).receiveShadow = receiveShadow;
        (mesh as THREE.Object3D).castShadow = castShadow;

        this.loadedModels[name] = mesh;

        this.loadedModelCount++;
        if (this.loadedModelCount === this.modelCount) {
          this.onLoad();
        }
      },
      (xhr) => {
        console.log(`${name} ${(xhr.loaded / xhr.total) * 100}% loaded`);
      },
      (error) => {
        console.error(error);
      }
    );
  }

  cloneMesh(name: ModelKey, transparent = false): THREE.Mesh | null {
    const mesh = this.loadedModels[name]?.clone() as THREE.Mesh;
    if (!mesh) return null;
    mesh.material = Array.isArray(mesh.material)
      ? mesh.material.map((material) => material.clone())
      : (mesh.material as THREE.Material).clone();

    if (Array.isArray(mesh.material)) {
      mesh.material.forEach((material) => {
        (material as THREE.MeshLambertMaterial).transparent = transparent;
      });
    } else {
      (mesh.material as THREE.MeshLambertMaterial).transparent = transparent;
    }

    return mesh;
  }

  createGroundMesh(tile: ITile): THREE.Mesh {
    const material = new THREE.MeshLambertMaterial({
      map: this.textures['grass'],
    });
    const mesh = new THREE.Mesh(this.cubeGeometry, material);
    mesh.traverse((obj) => (obj.userData = tile));
    mesh.position.set(tile.x, -0.5, tile.y);
    mesh.receiveShadow = true;
    return mesh;
  }

  createBuildingMesh(tile: ITile): THREE.Mesh | null {
    if (!tile.building) return null;

    switch (tile.building.type) {
      case BUILDING_TYPE.RESIDENTIAL:
      case BUILDING_TYPE.COMMERCIAL:
      case BUILDING_TYPE.INDUSTRIAL:
        return this.createZoneMesh(tile);
      case BUILDING_TYPE.ROAD:
        return this.createRoadMesh(tile);
      default:
        console.warn(`Mesh type ${tile.building?.type} is not recognized.`);
        return null;
    }
  }

  private createZoneMesh(tile: ITile): THREE.Mesh | null {
    const zone = tile.building as IZone | null;
    if (!zone) {
      throw new Error('Tile does not have a valid building.');
    }

    let modelName = '';
    switch (zone.development.state) {
      case (DevelopmentState.UNDER_CONSTRUCTION, DevelopmentState.UNDEVELOPED):
        modelName = 'UNDER-CONSTRUCTION';
        break;
      default:
        modelName = `${zone.type}-${zone.style}${zone.development?.level}`;
        break;
    }

    let mesh = this.cloneMesh(modelName as ModelKey);
    if (!mesh) return null;
    mesh.traverse((obj) => (obj.userData = tile));
    mesh.rotation.set(0, (zone.rotation || 0) * DEG2RAD, 0);
    mesh.position.set(zone.x, 0, zone.y);

    if (zone.development?.state === DevelopmentState.ABANDONED) {
      mesh.traverse((obj) => {
        if (
          obj instanceof THREE.Mesh &&
          obj.material instanceof THREE.MeshLambertMaterial
        ) {
          obj.material.color = new THREE.Color(0x707070);
        }
      });
    }

    return mesh;
  }

  private createRoadMesh(tile: ITile): THREE.Mesh | null {
    const road = tile.building;
    if (!road) return null;
    const mesh = this.cloneMesh(`${road.type}-${road.style}` as ModelKey);
    if (!mesh) return null;
    mesh.traverse((obj) => (obj.userData = tile));
    if (road.rotation) mesh.rotation.set(0, road.rotation * DEG2RAD, 0);
    mesh.position.set(road.x, 0.01, road.y);
    mesh.receiveShadow = true;
    return mesh;
  }

  createRandomVehicleMesh(): THREE.Mesh | null {
    const types = Object.entries(models)
      .filter(([_, model]) => model.type === modelType.VEHICLE)
      .map(([key]) => key as ModelKey);

    const i = Math.floor(types.length * Math.random());
    console.log('types[i]', types[i]);
    return this.cloneMesh(types[i], true);
  }
}
