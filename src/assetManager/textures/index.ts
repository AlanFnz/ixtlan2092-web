import * as THREE from 'three';
import GRASS from './grass.png';
import RESIDENTIAL1 from './residential1.png';
import RESIDENTIAL2 from './residential2.png';
import RESIDENTIAL3 from './residential3.png';
import COMMERCIAL1 from './commercial1.png';
import COMMERCIAL2 from './commercial2.png';
import COMMERCIAL3 from './commercial3.png';
import INDUSTRIAL1 from './industrial1.png';
import INDUSTRIAL2 from './industrial2.png';
import INDUSTRIAL3 from './industrial3.png';

const loader = new THREE.TextureLoader();
type TextureKey =
  | 'GRASS'
  | 'RESIDENTIAL1'
  | 'RESIDENTIAL2'
  | 'RESIDENTIAL3'
  | 'COMMERCIAL1'
  | 'COMMERCIAL2'
  | 'COMMERCIAL3'
  | 'INDUSTRIAL1'
  | 'INDUSTRIAL2'
  | 'INDUSTRIAL3';

const textures: Record<TextureKey, THREE.Texture> = {
  GRASS: loadTexture(GRASS),
  RESIDENTIAL1: loadTexture(RESIDENTIAL1),
  RESIDENTIAL2: loadTexture(RESIDENTIAL2),
  RESIDENTIAL3: loadTexture(RESIDENTIAL3),
  COMMERCIAL1: loadTexture(COMMERCIAL1),
  COMMERCIAL2: loadTexture(COMMERCIAL2),
  COMMERCIAL3: loadTexture(COMMERCIAL3),
  INDUSTRIAL1: loadTexture(INDUSTRIAL1),
  INDUSTRIAL2: loadTexture(INDUSTRIAL2),
  INDUSTRIAL3: loadTexture(INDUSTRIAL3),
};

function getTopMaterial(color: THREE.Color | number | string) {
  return new THREE.MeshLambertMaterial({ color });
}

function getSideMaterial(textureName: TextureKey) {
  return new THREE.MeshLambertMaterial({ map: textures[textureName].clone() });
}

function isValidTextureKey(key: string): key is TextureKey {
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

