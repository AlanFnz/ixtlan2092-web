import * as THREE from 'three';
import { ASSET_ID } from '../constants';
import { BUILDING_TYPE, Building } from '../../city/building/constants';
import {
  getSideMaterial,
  getTexture,
  getTopMaterial,
  isValidTextureKey,
} from '../textures';

const cube = new THREE.BoxGeometry(1, 1, 1);

function createGroundMesh(x: number, y: number): THREE.Mesh {
  const material = new THREE.MeshLambertMaterial({
    map: getTexture(ASSET_ID.GRASS),
  });
  const mesh = new THREE.Mesh(cube, material);
  mesh.userData = { id: ASSET_ID.GRASS, x, y };
  mesh.position.set(x, -0.5, y);
  mesh.receiveShadow = true;
  return mesh;
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
  mesh.userData = { id: data.id, x, y };

  if (data.height) {
    mesh.scale.set(0.8, 0.8 * data.height, 0.8);
    mesh.material.forEach(
      (material) => data.height && material.map?.repeat.set(1, data.height - 1)
    );
    mesh.position.set(x, (data.height - 0.95) / 4, y);
  }

  mesh.castShadow = true;
  mesh.receiveShadow = true;
  return mesh;
}

function createRoadMesh(x: number, y: number): THREE.Mesh {
  const material = new THREE.MeshLambertMaterial({ color: 0x222222 });
  const mesh = new THREE.Mesh(cube, material);
  mesh.userData = { id: BUILDING_TYPE.ROAD, x, y };
  mesh.scale.set(1, 0.02, 1);
  mesh.position.set(x, 0.01, y);
  mesh.receiveShadow = true;
  return mesh;
}

export { createGroundMesh, createZoneMesh, createRoadMesh };

