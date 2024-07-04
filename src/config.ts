export default {
  CITIZEN: {
    MIN_WORKING_AGE: 16,
    RETIREMENT_AGE: 65,
    MAX_JOB_SEARCH_DISTANCE: 4,
  },
  ZONE: {
    // chances
    ABANDONMENT_CHANCE: 0.25,
    LEVEL_UP_CHANCE: 0.05,
    REDEVELOP_CHANCE: 0.25, // probability of building being re-developed after it is no longer meeting the abandonment criteria
    DEVELOPMENT_CHANCE: 0.25,

    // props
    ABANDONMENT_THRESHOLD: 10, // number of days before abandonment
    MAX_ROAD_SEARCH_DISTANCE: 3, // max distance between buildng and road
    MAX_RESIDENTS: 2, // used as exponential
    MAX_WORKERS: 2, // used as exponential
    RESIDENT_MOVE_IN_CHANCE: 0.5,
    CONSTRUCTION_TIME: 3 // number of days it takes to build
  },
  CITY: {
    SIZE: 16,
  },
  VEHICLE: {
    SPEED: 0.0005, // distance travelled per millisecond
    FADE_TIME: 1000, // start/end time where the vehicle should fade
    MAX_LIFETIME: 10000, // maximum lifetime of a vehicle
    MAX_VEHICLE_COUNT: 10, // maximum number of vehicles in scene
    SPAWN_INTERVAL: 1000, // how often vehicles are spawned in milliseconds
  },
};

