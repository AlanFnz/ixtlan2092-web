import { BuildingEntity } from '../city/building/buildingCreator';
import { Building } from '../city/building/constants';
import { ASSET_ID, AssetCreators } from './constants';
import { createGroundMesh, createRoadMesh, createZoneMesh } from './mesh';

const assets: AssetCreators = {
  [ASSET_ID.GROUND]: (x: number, y: number) => createGroundMesh(x, y),
  [ASSET_ID.RESIDENTIAL]: (x: number, y: number, data: Building) =>
    createZoneMesh(x, y, data),
  [ASSET_ID.COMMERCIAL]: (x: number, y: number, data: Building) =>
    createZoneMesh(x, y, data),
  [ASSET_ID.INDUSTRIAL]: (x: number, y: number, data: Building) =>
    createZoneMesh(x, y, data),
  [ASSET_ID.ROAD]: (x: number, y: number) => createRoadMesh(x, y),
};

function createAssetInstance(
  type: string,
  x: number,
  y: number,
  data: BuildingEntity | undefined
) {
  if (type in assets) {
    return assets[type](x, y, data);
  } else {
    console.warn(`Asset id ${type} is not found`);
  }
}

export { createAssetInstance };

