import { BUILDING_TYPE } from '../../city/building/constants';

type AssetId = (typeof BUILDING_TYPE)[keyof typeof BUILDING_TYPE];

interface ModelEntry {
  filename: string;
  file: string;
  scale: number;
  front?: number;
  castShadow?: boolean;
  receiveShadow?: boolean;
}

interface AssetCreators {
  [key: string]: (...args: any[]) => THREE.Mesh;
}

enum ModelKey {
  RESIDENTIAL_A1 = 'residential-A1',
  RESIDENTIAL_B1 = 'residential-B1',
  RESIDENTIAL_C1 = 'residential-C1',
  RESIDENTIAL_A2 = 'residential-A2',
  RESIDENTIAL_B2 = 'residential-B2',
  RESIDENTIAL_C2 = 'residential-C2',
  RESIDENTIAL_A3 = 'residential-A3',
  RESIDENTIAL_B3 = 'residential-B3',
  RESIDENTIAL_C3 = 'residential-C3',
  COMMERCIAL_A1 = 'commercial-A1',
  COMMERCIAL_B1 = 'commercial-B1',
  COMMERCIAL_C1 = 'commercial-C1',
  COMMERCIAL_A2 = 'commercial-A2',
  COMMERCIAL_B2 = 'commercial-B2',
  COMMERCIAL_C2 = 'commercial-C2',
  COMMERCIAL_A3 = 'commercial-A3',
  COMMERCIAL_B3 = 'commercial-B3',
  COMMERCIAL_C3 = 'commercial-C3',
  INDUSTRIAL_A1 = 'industrial-A1',
  INDUSTRIAL_B1 = 'industrial-B1',
  INDUSTRIAL_C1 = 'industrial-C1',
  ROAD_STRAIGHT = 'road-straight',
  ROAD_END = 'road-end',
  ROAD_CORNER = 'road-corner',
  ROAD_TEE = 'road-tee',
  ROAD_INTERSECTION = 'road-intersection',
  GRASS = 'grass',
}

export { AssetId, AssetCreators, ModelKey, ModelEntry };

