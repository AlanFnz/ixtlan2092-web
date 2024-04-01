import * as THREE from 'three';

interface AssetCreators {
  [key: string]: (...args: any[]) => THREE.Mesh;
}

const geometry = new THREE.BoxGeometry(1, 1, 1);
const buildingMaterial = new THREE.MeshLambertMaterial({ color: 0x777777 });

const assets: AssetCreators = {
  grass: (x: number, y: number) => {
    const material = new THREE.MeshLambertMaterial({ color: 0x00aa00 });
    const mesh = new THREE.Mesh(geometry, material);
    mesh.position.set(x, -0.5, y);
    return mesh;
  },
  'building-1': (x: number, y: number, height: number) => {
    const mesh = new THREE.Mesh(geometry, buildingMaterial);
    mesh.position.set(x, 0.5, y);
    return mesh;
  },
  'building-2': (x: number, y: number) => {
    const mesh = new THREE.Mesh(geometry, buildingMaterial);
    mesh.scale.set(1, 2, 1);
    mesh.position.set(x, 1, y);
    return mesh;
  },
  'building-3': (x: number, y: number) => {
    const mesh = new THREE.Mesh(geometry, buildingMaterial);
    mesh.scale.set(1, 3, 1);
    mesh.position.set(x, 1.5, y);
    return mesh;
  },
};

export function createAssetInstance(assetId: string, x: number, y: number) {
  if (assetId in assets) {
    return assets[assetId](x, y);
  } else {
    console.warn(`Asset id ${assetId} is not found`);
  }
}

