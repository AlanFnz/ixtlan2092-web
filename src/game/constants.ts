interface Game {
  update: () => void;
  setActiveToolId: (toolId: string) => void;
}

const CITY_SIZE = 16;

export { Game, CITY_SIZE };

