import * as THREE from 'three';
import { BUILDING_ID, Building } from '../buildings/constants';

const ASSET_ID = {
  GRASS: 'grass',
  RESIDENTIAL: BUILDING_ID.RESIDENTIAL,
  COMMERCIAL: BUILDING_ID.COMMERCIAL,
  INDUSTRIAL: BUILDING_ID.INDUSTRIAL,
  ROAD: BUILDING_ID.ROAD,
};

interface AssetCreators {
  [key: string]: (...args: any[]) => THREE.Mesh;
}

const geometry = new THREE.BoxGeometry(1, 1, 1);


const assets: AssetCreators = {
  [ASSET_ID.GRASS]: (x: number, y: number) => {
    const material = new THREE.MeshLambertMaterial({ color: 0x00aa00 });
    const mesh = new THREE.Mesh(geometry, material);
    mesh.userData = { id: ASSET_ID.GRASS, x, y };
    mesh.position.set(x, -0.5, y);
    mesh.castShadow = true;
    mesh.receiveShadow = true;
    return mesh;
  },
  [ASSET_ID.RESIDENTIAL]: (
    x: number,
    y: number,
    data: Building | undefined
  ) => {
    const material = new THREE.MeshLambertMaterial({ color: 0xbb5555 });
    const mesh = new THREE.Mesh(geometry, material);
    mesh.userData = { id: ASSET_ID.RESIDENTIAL, x, y };
    if (data?.height) mesh.scale.set(1, data?.height, 1);
    mesh.position.set(x, 0.5, y);
    mesh.castShadow = true;
    mesh.receiveShadow = true;
    return mesh;
  },
  [ASSET_ID.COMMERCIAL]: (x: number, y: number, data: Building | undefined) => {
    const material = new THREE.MeshLambertMaterial({ color: 0xbbbb55 });
    const mesh = new THREE.Mesh(geometry, material);
    mesh.userData = { id: ASSET_ID.COMMERCIAL, x, y };
    if (data?.height) mesh.scale.set(1, data?.height, 1);
    mesh.position.set(x, 0.5, y);
    mesh.castShadow = true;
    mesh.receiveShadow = true;
    return mesh;
  },
  [ASSET_ID.INDUSTRIAL]: (x: number, y: number, data: Building | undefined) => {
    const material = new THREE.MeshLambertMaterial({ color: 0x5555bb });
    const mesh = new THREE.Mesh(geometry, material);
    mesh.userData = { id: ASSET_ID.INDUSTRIAL, x, y };
    if (data?.height) mesh.scale.set(1, data?.height, 1);
    mesh.position.set(x, 0.5, y);
    mesh.castShadow = true;
    mesh.receiveShadow = true;
    return mesh;
  },
  [ASSET_ID.ROAD]: (x: number, y: number) => {
    const material = new THREE.MeshLambertMaterial({ color: 0x444440 });
    const mesh = new THREE.Mesh(geometry, material);
    mesh.userData = { id: ASSET_ID.ROAD, x, y };
    mesh.scale.set(1, 0.1, 1);
    mesh.position.set(x, 0.05, y);
    mesh.castShadow = true;
    mesh.receiveShadow = true;
    return mesh;
  },
};

function createAssetInstance(
  assetId: string,
  x: number,
  y: number,
  data: Building | undefined
) {
  if (assetId in assets) {
    return assets[assetId](x, y, data);
  } else {
    console.warn(`Asset id ${assetId} is not found`);
  }
}

export { ASSET_ID, createAssetInstance };

