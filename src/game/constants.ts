interface Game {
  update: () => void;
  onToolSelected: (event: MouseEvent) => void;
  togglePause: () => void;
}

const CITY_SIZE = 16;

export { Game, CITY_SIZE };

