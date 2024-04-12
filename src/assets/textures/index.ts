import * as THREE from 'three';
import grassTexture from './grass.png';
import residential1 from './residential1.png';
import residential2 from './residential2.png';
import residential3 from './residential3.png';
import commercial1 from './commercial1.png';
import commercial2 from './commercial2.png';
import commercial3 from './commercial3.png';
import industrial1 from './industrial1.png';
import industrial2 from './industrial2.png';
import industrial3 from './industrial3.png';

const loader = new THREE.TextureLoader();
type TextureKey =
  | 'grass'
  | 'residential1'
  | 'residential2'
  | 'residential3'
  | 'commercial1'
  | 'commercial2'
  | 'commercial3'
  | 'industrial1'
  | 'industrial2'
  | 'industrial3';

const textures: Record<TextureKey, THREE.Texture> = {
  grass: loadTexture(grassTexture),
  residential1: loadTexture(residential1),
  residential2: loadTexture(residential2),
  residential3: loadTexture(residential3),
  commercial1: loadTexture(commercial1),
  commercial2: loadTexture(commercial2),
  commercial3: loadTexture(commercial3),
  industrial1: loadTexture(industrial1),
  industrial2: loadTexture(industrial2),
  industrial3: loadTexture(industrial3),
};

function getTopMaterial(color: THREE.Color | number | string) {
  return new THREE.MeshLambertMaterial({ color });
}

function getSideMaterial(textureName: TextureKey) {
  return new THREE.MeshLambertMaterial({ map: textures[textureName].clone() });
}

function isValidTextureKey(key: any): key is TextureKey {
  return key in textures;
}

function loadTexture(url: string) {
  const tex = loader.load(url);
  tex.wrapS = THREE.RepeatWrapping;
  tex.wrapT = THREE.RepeatWrapping;
  tex.repeat.set(1, 1);
  return tex;
}

const getTexture = (type: TextureKey) => textures[type];

export {
  TextureKey,
  getTopMaterial,
  getSideMaterial,
  getTexture,
  isValidTextureKey,
  loadTexture,
};

