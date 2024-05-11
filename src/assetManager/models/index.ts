import { ModelEntry, ModelKey } from '../constants';

const models: Record<ModelKey, ModelEntry> = {
  [ModelKey.RESIDENTIAL_A1]: {
    filename: 'building-house-block-big.glb',
    scale: 200,
    front: 0,
  },
  [ModelKey.RESIDENTIAL_B1]: {
    filename: 'building-house-family-small.glb',
    scale: 200,
    front: 0,
  },
  [ModelKey.RESIDENTIAL_C1]: {
    filename: 'building-house-family-large.glb',
    scale: 150,
    front: 0,
  },
  [ModelKey.RESIDENTIAL_A2]: {
    filename: 'building-block-4floor-short.glb',
    scale: 175,
    front: 0,
  },
  [ModelKey.RESIDENTIAL_B2]: {
    filename: 'building-block-4floor-corner.glb',
    scale: 175,
    front: 0,
  },
  [ModelKey.RESIDENTIAL_C2]: {
    filename: 'building-block-5floor.glb',
    scale: 175,
    front: 0,
  },
  [ModelKey.RESIDENTIAL_A3]: {
    filename: 'building-office-balcony.glb',
    scale: 125,
    front: 0,
  },
  [ModelKey.RESIDENTIAL_B3]: {
    filename: 'building-office-pyramid.glb',
    scale: 125,
    front: 0,
  },
  [ModelKey.RESIDENTIAL_C3]: {
    filename: 'building-office-tall.glb',
    scale: 125,
    front: 0,
  },
  [ModelKey.COMMERCIAL_A1]: {
    filename: 'building-cafe.glb',
    scale: 200,
    front: 0,
  },
  [ModelKey.COMMERCIAL_B1]: {
    filename: 'building-burger-joint.glb',
    scale: 150,
    front: 0,
  },
  [ModelKey.COMMERCIAL_C1]: {
    filename: 'building-restaurant.glb',
    scale: 200,
    front: 0,
  },
  [ModelKey.COMMERCIAL_A2]: {
    filename: 'building-cinema.glb',
    scale: 150,
    front: 0,
  },
  [ModelKey.COMMERCIAL_B2]: {
    filename: 'building-casino.glb',
    scale: 150,
    front: 0,
  },
  [ModelKey.COMMERCIAL_C2]: {
    filename: 'data-center.glb',
    scale: 100,
    front: 0,
  },
  [ModelKey.COMMERCIAL_A3]: {
    filename: 'building-office.glb',
    scale: 100,
    front: 0,
  },
  [ModelKey.COMMERCIAL_B3]: {
    filename: 'building-office-big.glb',
    scale: 100,
    front: 0,
  },
  [ModelKey.COMMERCIAL_C3]: {
    filename: 'building-skyscraper.glb',
    scale: 100,
    front: 0,
  },
  [ModelKey.INDUSTRIAL_A1]: {
    filename: 'industry-factory.glb',
    scale: 100,
    front: 0,
  },
  [ModelKey.INDUSTRIAL_B1]: {
    filename: 'industry-factory-old.glb',
    scale: 100,
    front: 0,
  },
  [ModelKey.INDUSTRIAL_C1]: {
    filename: 'industry-warehouse.glb',
    scale: 150,
    front: 0,
  },
  [ModelKey.ROAD_STRAIGHT]: {
    filename: 'tile-road-straight.glb',
    scale: 100,
    castShadow: false,
  },
  [ModelKey.ROAD_END]: {
    filename: 'tile-road-end.glb',
    scale: 100,
    castShadow: false,
  },
  [ModelKey.ROAD_CORNER]: {
    filename: 'tile-road-curve.glb',
    scale: 100,
    castShadow: false,
  },
  [ModelKey.ROAD_TEE]: {
    filename: 'tile-road-intersection-t.glb',
    scale: 100,
    castShadow: false,
  },
  [ModelKey.ROAD_INTERSECTION]: {
    filename: 'tile-road-intersection.glb',
    scale: 100,
    castShadow: false,
  },
  [ModelKey.GRASS]: {
    filename: 'tile-plain_grass.glb',
    scale: 1,
    castShadow: false,
  },
};

export { models };

