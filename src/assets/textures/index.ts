import * as THREE from 'three';
import grassTexture from './grass.png';
import RESIDENTIAL1 from './RESIDENTIAL1.png';
import RESIDENTIAL2 from './RESIDENTIAL2.png';
import RESIDENTIAL3 from './RESIDENTIAL3.png';
import COMMERCIAL1 from './COMMERCIAL1.png';
import COMMERCIAL2 from './COMMERCIAL2.png';
import COMMERCIAL3 from './COMMERCIAL3.png';
import INDUSTRIAL1 from './INDUSTRIAL1.png';
import INDUSTRIAL2 from './INDUSTRIAL2.png';
import INDUSTRIAL3 from './INDUSTRIAL3.png';

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

const textures: Record<TextureKey | string, THREE.Texture> = {
  GRASS: loadTexture(grassTexture),
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

const getTexture = (type: TextureKey | string) => textures[type];

export {
  TextureKey,
  getTopMaterial,
  getSideMaterial,
  getTexture,
  isValidTextureKey,
  loadTexture,
};

