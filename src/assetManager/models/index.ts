import { ModelEntry, ModelKey, modelType } from '../constants';
import modelsFiles from './modelsFiles';

const models: Record<ModelKey, ModelEntry> = {
  /**
   * terrain and buildings
   */
  [ModelKey.RESIDENTIAL_A1]: {
    filename: 'building-house-block-big.glb',
    file: modelsFiles.BUILDING_HOUSE_BLOCK_BIG,
    scale: 200,
    type: modelType.ZONE,
  },
  [ModelKey.RESIDENTIAL_B1]: {
    filename: 'building-house-family-small.glb',
    file: modelsFiles.BUILDING_HOUSE_FAMILY_SMALL,
    scale: 200,
    type: modelType.ZONE,
  },
  [ModelKey.RESIDENTIAL_C1]: {
    filename: 'building-house-family-large.glb',
    file: modelsFiles.BUILDING_HOUSE_FAMILY_LARGE,
    scale: 150,
    type: modelType.ZONE,
  },
  [ModelKey.RESIDENTIAL_A2]: {
    filename: 'building-block-4floor-short.glb',
    file: modelsFiles.BUILDING_BLOCK_4FLOOR_SHORT,
    scale: 175,
    type: modelType.ZONE,
  },
  [ModelKey.RESIDENTIAL_B2]: {
    filename: 'building-block-4floor-corner.glb',
    file: modelsFiles.BUILDING_BLOCK_4FLOOR_CORNER,
    scale: 175,
    type: modelType.ZONE,
  },
  [ModelKey.RESIDENTIAL_C2]: {
    filename: 'building-block-5floor.glb',
    file: modelsFiles.BUILDING_BLOCK_5FLOOR,
    scale: 175,
    type: modelType.ZONE,
  },
  [ModelKey.RESIDENTIAL_A3]: {
    filename: 'building-office-balcony.glb',
    file: modelsFiles.BUILDING_OFFICE_BALCONY,
    scale: 125,
    type: modelType.ZONE,
  },
  [ModelKey.RESIDENTIAL_B3]: {
    filename: 'building-office-pyramid.glb',
    file: modelsFiles.BUILDING_OFFICE_PYRAMID,
    scale: 125,
    type: modelType.ZONE,
  },
  [ModelKey.RESIDENTIAL_C3]: {
    filename: 'building-office-tall.glb',
    file: modelsFiles.BUILDING_OFFICE_TALL,
    scale: 125,
    type: modelType.ZONE,
  },
  [ModelKey.COMMERCIAL_A1]: {
    filename: 'building-cafe.glb',
    file: modelsFiles.BUILDING_CAFE,
    scale: 200,
    type: modelType.ZONE,
  },
  [ModelKey.COMMERCIAL_B1]: {
    filename: 'building-burger-joint.glb',
    file: modelsFiles.BUILDING_BURGER_JOINT,
    scale: 150,
    type: modelType.ZONE,
  },
  [ModelKey.COMMERCIAL_C1]: {
    filename: 'building-restaurant.glb',
    file: modelsFiles.BUILDING_RESTAURANT,
    scale: 200,
    type: modelType.ZONE,
  },
  [ModelKey.COMMERCIAL_A2]: {
    filename: 'building-cinema.glb',
    file: modelsFiles.BUILDING_CINEMA,
    scale: 150,
    type: modelType.ZONE,
  },
  [ModelKey.COMMERCIAL_B2]: {
    filename: 'building-casino.glb',
    file: modelsFiles.BUILDING_CASINO,
    scale: 150,
    type: modelType.ZONE,
  },
  [ModelKey.COMMERCIAL_C2]: {
    filename: 'data-center.glb',
    file: modelsFiles.DATA_CENTER,
    scale: 100,
    type: modelType.ZONE,
  },
  [ModelKey.COMMERCIAL_A3]: {
    filename: 'building-office.glb',
    file: modelsFiles.BUILDING_OFFICE,
    scale: 100,
    type: modelType.ZONE,
  },
  [ModelKey.COMMERCIAL_B3]: {
    filename: 'building-office-big.glb',
    file: modelsFiles.BUILDING_OFFICE_BIG,
    scale: 100,
    type: modelType.ZONE,
  },
  [ModelKey.COMMERCIAL_C3]: {
    filename: 'building-skyscraper.glb',
    file: modelsFiles.BUILDING_SKYSCRAPER,
    scale: 100,
    type: modelType.ZONE,
  },
  [ModelKey.INDUSTRIAL_A1]: {
    filename: 'industry-factory.glb',
    file: modelsFiles.INDUSTRY_FACTORY,
    scale: 100,
    type: modelType.ZONE,
  },
  [ModelKey.INDUSTRIAL_B1]: {
    filename: 'industry-factory-old.glb',
    file: modelsFiles.INDUSTRY_FACTORY_OLD,
    scale: 100,
    type: modelType.ZONE,
  },
  [ModelKey.INDUSTRIAL_C1]: {
    filename: 'industry-warehouse.glb',
    file: modelsFiles.INDUSTRY_WAREHOUSE,
    scale: 150,
    type: modelType.ZONE,
  },
  [ModelKey.ROAD_STRAIGHT]: {
    filename: 'tile-road-straight.glb',
    type: modelType.ROAD,
    file: modelsFiles.TILE_ROAD_STRAIGHT,
    scale: 100,
    castShadow: false,
  },
  [ModelKey.ROAD_END]: {
    filename: 'tile-road-end.glb',
    type: modelType.ROAD,
    file: modelsFiles.TILE_ROAD_END,
    scale: 100,
    castShadow: false,
  },
  [ModelKey.ROAD_CORNER]: {
    filename: 'tile-road-curve.glb',
    type: modelType.ROAD,
    file: modelsFiles.TILE_ROAD_CURVE,
    scale: 100,
    castShadow: false,
  },
  [ModelKey.ROAD_TEE]: {
    filename: 'tile-road-intersection-t.glb',
    type: modelType.ROAD,
    file: modelsFiles.TILE_ROAD_INTERSECTION_T,
    scale: 100,
    castShadow: false,
  },
  [ModelKey.ROAD_INTERSECTION]: {
    filename: 'tile-road-intersection.glb',
    type: modelType.ROAD,
    file: modelsFiles.TILE_ROAD_INTERSECTION,
    scale: 100,
    castShadow: false,
  },
  [ModelKey.GRASS]: {
    filename: 'tile-plain_grass.glb',
    type: modelType.TERRAIN,
    file: modelsFiles.TILE_PLAIN_GRASS,
    scale: 1,
    castShadow: false,
  },
  /**
   * cars
   */
  [ModelKey.CAR_TAXI]: {
    filename: 'car-taxi.glb',
    file: modelsFiles.CAR_TAXI,
    rotation: 90,
    type: modelType.VEHICLE,
  },
  [ModelKey.CAR_POLICE]: {
    filename: 'car-police.glb',
    file: modelsFiles.CAR_POLICE,
    rotation: 90,
    type: modelType.VEHICLE,
  },
  [ModelKey.CAR_PASSENGER]: {
    filename: 'car-passenger.glb',
    file: modelsFiles.CAR_PASSENGER,
    rotation: 90,
    type: modelType.VEHICLE,
  },
  [ModelKey.CAR_VETERAN]: {
    filename: 'car-veteran.glb',
    file: modelsFiles.CAR_VETERAN,
    rotation: 90,
    type: modelType.VEHICLE,
  },
  [ModelKey.CAR_TRUCK]: {
    filename: 'truck.glb',
    file: modelsFiles.TRUCK,
    rotation: 90,
    type: modelType.VEHICLE,
  },
  [ModelKey.CAR_HIPPIE_VAN]: {
    filename: 'car-hippie-van.glb',
    file: modelsFiles.CAR_HIPPIE_VAN,
    rotation: 90,
    type: modelType.VEHICLE,
  },
  [ModelKey.CAR_TOW_TRUCK]: {
    filename: 'car-tow-truck.glb',
    file: modelsFiles.CAR_TOW_TRUCK,
    rotation: 90,
    type: modelType.VEHICLE,
  },
  [ModelKey.CAR_AMBULANCE_PICKUP]: {
    filename: 'car-ambulance-pickup.glb',
    file: modelsFiles.CAR_AMBULANCE_PICKUP,
    rotation: 90,
    type: modelType.VEHICLE,
  },
  [ModelKey.CAR_PASSENGER_RACE]: {
    filename: 'car-passenger-race.glb',
    file: modelsFiles.CAR_PASSENGER_RACE,
    rotation: 90,
    type: modelType.VEHICLE,
  },
  [ModelKey.CAR_BAYWATCH]: {
    filename: 'car-baywatch.glb',
    file: modelsFiles.CAR_BAYWATCH,
    rotation: 90,
    type: modelType.VEHICLE,
  },
};

export { models };

