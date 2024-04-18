const CITY_SIZE = 16;

type ActiveToolId = string | null;
interface Game {
  update: () => void;
  onToolSelected: (event: MouseEvent) => void;
  togglePause: () => void;
}

export { CITY_SIZE, ActiveToolId, Game };

