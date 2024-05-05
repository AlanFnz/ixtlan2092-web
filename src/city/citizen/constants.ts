type CitizenState = (typeof CITIZEN_STATE)[keyof typeof CITIZEN_STATE];

const CITIZEN_STATE = {
  IDLE: 'idle',
  SCHOOL: 'school',
  EMPLOYED: 'employed',
  UNEMPLOYED: 'unemployed',
  RETIRED: 'retired',
};

export { CitizenState, CITIZEN_STATE };

