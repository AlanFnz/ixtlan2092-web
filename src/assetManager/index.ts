import * as THREE from 'three';
import UNDER_CONSTRUCTION_MODEL from './models/under_construction.gltf';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { TextureKey, getSideMaterial, textures } from './textures';
import { ITile } from '../city/tile';
import { IZone } from '../city/building/interfaces';
import { BUILDING_TYPE } from '../city/building/constants';

export interface IAssetManager {
  createGroundMesh(tile: ITile): THREE.Mesh;
  createBuildingMesh(tile: ITile): THREE.Mesh | null;
}

export class AssetManager implements IAssetManager {
  private gltfLoader = new GLTFLoader();
  private cubeGeometry = new THREE.BoxGeometry(1, 1, 1);

  private models: Record<string, THREE.Object3D> = {};

  private textures: Record<string, THREE.Texture> = {
    grass: textures.GRASS,
    residential1: textures.RESIDENTIAL1,
    residential2: textures.RESIDENTIAL2,
    residential3: textures.RESIDENTIAL3,
    commercial1: textures.COMMERCIAL1,
    commercial2: textures.COMMERCIAL2,
    commercial3: textures.COMMERCIAL3,
    industrial1: textures.INDUSTRIAL1,
    industrial2: textures.INDUSTRIAL2,
    industrial3: textures.INDUSTRIAL3,
  };

  constructor() {
    this.loadModels();
  }

  private loadModels() {
    this.gltfLoader.load(
      UNDER_CONSTRUCTION_MODEL,
      (gltf) => {
        const mesh = gltf.scene;
        mesh.scale.set(0.01, 0.01, 0.01);

        mesh.traverse((child) => {
          if ((child as THREE.Mesh).isMesh) {
            child.castShadow = true;
            child.receiveShadow = true;
          }
        });

        this.models['underConstruction'] = mesh;
      },
      undefined,
      (error) =>
        console.error('An error happened while loading a model:', error)
    );
  }

  createGroundMesh(tile: ITile): THREE.Mesh {
    const material = new THREE.MeshLambertMaterial({
      map: this.textures['grass'],
    });
    const mesh = new THREE.Mesh(this.cubeGeometry, material);
    mesh.userData = tile;
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

  private createZoneMesh(tile: ITile): THREE.Mesh {
    const zone = tile.building as IZone;

    let mesh: THREE.Mesh;

    if (!zone.developed) {
      mesh = this.getModel('underConstruction');
      mesh.position.set(zone.x, 0.01, zone.y);
      return mesh
    }
    const textureName = zone.type + zone.style as TextureKey;
    const topMaterial = this.getTopMaterial();
    const sideMaterial = getSideMaterial(textureName);

    if (zone.abandoned) {
      sideMaterial.color.setHex(0x555555);
    }

    mesh = new THREE.Mesh(this.cubeGeometry, [
      sideMaterial,
      sideMaterial, // sides
      topMaterial,
      topMaterial, // top and bottom
      sideMaterial,
      sideMaterial, // front and back
    ]);
    mesh.userData = tile;
    mesh.scale.set(0.8, 0.8 * zone.level, 0.8);
    mesh.position.set(zone.x, 0.4 * zone.level, zone.y);

    mesh.castShadow = true;
    mesh.receiveShadow = true;

    return mesh;
  }

  private createRoadMesh(tile: ITile): THREE.Mesh | null {
    const road = tile.building;
    if (!road) return null;
    const material = new THREE.MeshLambertMaterial({ color: 0x222222 });
    const mesh = new THREE.Mesh(this.cubeGeometry, material);
    mesh.userData = tile;
    mesh.scale.set(1, 0.02, 1);
    mesh.position.set(road.x, 0.01, road.y);
    mesh.receiveShadow = true;
    return mesh;
  }

  private getModel(modelName: string): THREE.Mesh {
    const model = this.models[modelName];
    return model.clone() as THREE.Mesh;
  }

  private getTopMaterial(): THREE.MeshLambertMaterial {
    return new THREE.MeshLambertMaterial({ color: 0x555555 });
  }

  private updateMaterials(mesh: THREE.Mesh, zoneLevel: number): void {
    const materials = Array.isArray(mesh.material)
      ? mesh.material
      : [mesh.material];
    materials.forEach((material: THREE.Material) => {
      // Cast map explicitly to THREE.Texture to access the repeat property
      const texture = (material as THREE.MeshBasicMaterial).map;
      if (texture instanceof THREE.Texture) {
        texture.repeat.set(1, zoneLevel);
      }
    });
  }
}

