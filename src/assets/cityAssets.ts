import * as THREE from 'three';

export function createGrass(x: number, y: number) {
  const geometry = new THREE.BoxGeometry(1, 1, 1);
  const material = new THREE.MeshLambertMaterial({ color: 0x00aa00 });
  const mesh = new THREE.Mesh(geometry, material);
  mesh.position.set(x, -0.5, y);
  return mesh;
}

export function createBuilding(x: number, y: number, height: number = 1) {
  const geometry = new THREE.BoxGeometry(1, height, 1);
  const material = new THREE.MeshLambertMaterial({ color: 0x777777 });
  const mesh = new THREE.Mesh(geometry, material);
  mesh.position.set(x, height / 2, y);
  return mesh;
}

