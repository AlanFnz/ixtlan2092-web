import * as THREE from 'three';
import { BUILDING_ID, Building } from '../buildings/constants';
import {
  getSideMaterial,
  getTexture,
  getTopMaterial,
  isValidTextureKey,
} from './textures';

const ASSET_ID = {
  GRASS: 'GRASS',
  GROUND: 'GROUND',
  RESIDENTIAL: BUILDING_ID.RESIDENTIAL,
  COMMERCIAL: BUILDING_ID.COMMERCIAL,
  INDUSTRIAL: BUILDING_ID.INDUSTRIAL,
  ROAD: BUILDING_ID.ROAD,
};

interface AssetCreators {
  [key: string]: (...args: any[]) => THREE.Mesh;
}

const cube = new THREE.BoxGeometry(1, 1, 1);

const assets: AssetCreators = {
  [ASSET_ID.GROUND]: (x: number, y: number) => {
    const material = new THREE.MeshLambertMaterial({
      map: getTexture(ASSET_ID.GRASS),
    });
    const mesh = new THREE.Mesh(cube, material);
    mesh.userData = { id: ASSET_ID.GRASS, x, y };
    mesh.position.set(x, -0.5, y);
    mesh.receiveShadow = true;
    return mesh;
  },
  [ASSET_ID.RESIDENTIAL]: (x: number, y: number, data: Building) =>
    createZoneMesh(x, y, data),
  [ASSET_ID.COMMERCIAL]: (x: number, y: number, data: Building) =>
    createZoneMesh(x, y, data),
  [ASSET_ID.INDUSTRIAL]: (x: number, y: number, data: Building) =>
    createZoneMesh(x, y, data),
  [ASSET_ID.ROAD]: (x: number, y: number) => {
    const material = new THREE.MeshLambertMaterial({ color: 0x222222 });
    const mesh = new THREE.Mesh(cube, material);
    mesh.userData = { id: BUILDING_ID.ROAD, x, y };
    mesh.scale.set(1, 0.02, 1);
    mesh.position.set(x, 0.01, y);
    mesh.receiveShadow = true;
    return mesh;
  },
};

function createAssetInstance(
  type: string,
  x: number,
  y: number,
  data: Building | undefined
) {
  if (type in assets) {
    return assets[type](x, y, data);
  } else {
    console.warn(`Asset id ${type} is not found`);
  }
}

function createZoneMesh(x: number, y: number, data: Building): THREE.Mesh {
  const textureName = data.type + data.style;

  if (!data || !isValidTextureKey(textureName)) {
    return new THREE.Mesh(
      cube,
      new THREE.MeshBasicMaterial({ color: 0x888888 })
    );
  }
  const topMaterial = getTopMaterial(0x555555);
  const sideMaterial = getSideMaterial(textureName);

  let materialArray = [
    sideMaterial, // +X
    sideMaterial, // -X
    topMaterial, // +Y
    topMaterial, // -Y
    sideMaterial, // +Z
    sideMaterial, // -Z
  ];

  let mesh = new THREE.Mesh(cube, materialArray);
  mesh.userData = { x, y };

  if (data.height) {
    mesh.scale.set(0.8, (data.height - 0.95) / 2, 0.8);
    mesh.material.forEach(
      (material) => data.height && material.map?.repeat.set(1, data.height - 1)
    );
    mesh.position.set(x, (data.height - 0.95) / 4, y);
  }

  mesh.castShadow = true;
  mesh.receiveShadow = true;
  return mesh;
}

export { ASSET_ID, createAssetInstance };

