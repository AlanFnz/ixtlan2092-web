import { BUILDING_TYPE } from '../../city/building/constants';

type AssetId = (typeof BUILDING_TYPE)[keyof typeof BUILDING_TYPE];

interface AssetCreators {
  [key: string]: (...args: any[]) => THREE.Mesh;
}

export { AssetId, AssetCreators };

