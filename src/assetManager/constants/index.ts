import { BUILDING_TYPE } from '../../city/building/constants';

type AssetId = (typeof BUILDING_TYPE)[keyof typeof BUILDING_TYPE];

interface ModelEntry {
  filename: string;
  file: string;
  scale: number;
  rotation?: number;
  type?: string;
  castShadow?: boolean;
  receiveShadow?: boolean;
}

interface AssetCreators {
  [key: string]: (...args: any[]) => THREE.Mesh;
}

enum ModelKey {
  RESIDENTIAL_A1 = 'RESIDENTIAL-A1',
  RESIDENTIAL_B1 = 'RESIDENTIAL-B1',
  RESIDENTIAL_C1 = 'RESIDENTIAL-C1',
  RESIDENTIAL_A2 = 'RESIDENTIAL-A2',
  RESIDENTIAL_B2 = 'RESIDENTIAL-B2',
  RESIDENTIAL_C2 = 'RESIDENTIAL-C2',
  RESIDENTIAL_A3 = 'RESIDENTIAL-A3',
  RESIDENTIAL_B3 = 'RESIDENTIAL-B3',
  RESIDENTIAL_C3 = 'RESIDENTIAL-C3',
  COMMERCIAL_A1 = 'COMMERCIAL-A1',
  COMMERCIAL_B1 = 'COMMERCIAL-B1',
  COMMERCIAL_C1 = 'COMMERCIAL-C1',
  COMMERCIAL_A2 = 'COMMERCIAL-A2',
  COMMERCIAL_B2 = 'COMMERCIAL-B2',
  COMMERCIAL_C2 = 'COMMERCIAL-C2',
  COMMERCIAL_A3 = 'COMMERCIAL-A3',
  COMMERCIAL_B3 = 'COMMERCIAL-B3',
  COMMERCIAL_C3 = 'COMMERCIAL-C3',
  INDUSTRIAL_A1 = 'INDUSTRIAL-A1',
  INDUSTRIAL_B1 = 'INDUSTRIAL-B1',
  INDUSTRIAL_C1 = 'INDUSTRIAL-C1',
  ROAD_STRAIGHT = 'ROAD-STRAIGHT',
  ROAD_END = 'ROAD-END',
  ROAD_CORNER = 'ROAD-CORNER',
  ROAD_TEE = 'ROAD-THREE-WAY',
  ROAD_INTERSECTION = 'ROAD-FOUR-WAY',
  GRASS = 'GRASS',
}

const modelType = {
  ZONE: 'ZONE',
  ROAD: 'ROAD',
  TERRAIN: 'TERRAIN',
};

export { AssetId, AssetCreators, ModelKey, ModelEntry, modelType };

