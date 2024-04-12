import * as THREE from 'three';

const loader = new THREE.TextureLoader();

export const textures = {
  grass: loadTexture('./grass.png'),
  residential1: loadTexture('./residential1.png'),
  residential2: loadTexture('./residential2.png'),
  residential3: loadTexture('./residential3.png'),
  commercial1: loadTexture('./commercial1.png'),
  commercial2: loadTexture('./commercial2.png'),
  commercial3: loadTexture('./commercial3.png'),
  industrial1: loadTexture('./industrial1.png'),
  industrial2: loadTexture('./industrial2.png'),
  industrial3: loadTexture('./industrial3.png'),
};

export function loadTexture(url: string) {
  const tex = loader.load(url);
  tex.wrapS = THREE.RepeatWrapping;
  tex.wrapT = THREE.RepeatWrapping;
  tex.repeat.set(1, 1);
  return tex;
}

