import * as THREE from 'three';

export function createGrass(x: number, y: number) {
  const geometry = new THREE.BoxGeometry(1, 1, 1);
  const material = new THREE.MeshLambertMaterial({ color: 0x00aa00 });
  const mesh = new THREE.Mesh(geometry, material);
  mesh.position.set(x, 0, y);
  return mesh;
}

