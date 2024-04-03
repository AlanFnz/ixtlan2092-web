import * as THREE from 'three';

const ASSET_ID = {
  GRASS: 'grass',
  BUILDING_1: 'building-1',
  BUILDING_2: 'building-2',
  BUILDING_3: 'building-3',
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
    return mesh;
  },
  [ASSET_ID.BUILDING_1]: (x: number, y: number, height: number) => {
    const material = new THREE.MeshLambertMaterial({ color: 0x777777 });
    const mesh = new THREE.Mesh(geometry, material);
    mesh.userData = { id: ASSET_ID.BUILDING_1, x, y };
    mesh.position.set(x, 0.5, y);
    return mesh;
  },
  [ASSET_ID.BUILDING_2]: (x: number, y: number) => {
    const material = new THREE.MeshLambertMaterial({ color: 0x777777 });
    const mesh = new THREE.Mesh(geometry, material);
    mesh.userData = { id: ASSET_ID.BUILDING_2, x, y };
    mesh.scale.set(1, 2, 1);
    mesh.position.set(x, 1, y);
    return mesh;
  },
  [ASSET_ID.BUILDING_3]: (x: number, y: number) => {
    const material = new THREE.MeshLambertMaterial({ color: 0x777777 });
    const mesh = new THREE.Mesh(geometry, material);
    mesh.userData = { id: ASSET_ID.BUILDING_3, x, y };
    mesh.scale.set(1, 3, 1);
    mesh.position.set(x, 1.5, y);
    return mesh;
  },
};

function createAssetInstance(assetId: string, x: number, y: number) {
  if (assetId in assets) {
    return assets[assetId](x, y);
  } else {
    console.warn(`Asset id ${assetId} is not found`);
  }
}

export { ASSET_ID, createAssetInstance };

