export default {
  CITIZEN: {
    MIN_WORKING_AGE: 16,
    RETIREMENT_AGE: 65,
    MAX_JOB_SEARCH_DISTANCE: 4,
  },
  ZONE: {
    ABANDONMENT_THRESHOLD: 10, // number of days before abandonment
    ABANDONMENT_CHANCE: 0.25,
    DEVELOPMENT_CHANCE: 0.25,
    MAX_ROAD_SEARCH_DISTANCE: 3, // max distance between buildng and road
    MAX_RESIDENTS: 2, // used as exponential
    MAX_WORKERS: 2, // used as exponential
    RESIDENT_MOVE_IN_CHANCE: 0.5,
  },
  CITY: {
    SIZE: 16,
  },
};

