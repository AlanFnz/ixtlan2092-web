export interface CustomWindow extends Window {
  scene?: {
    start: () => void;
    onMouseDown?: (event: MouseEvent) => void;
    onMouseUp?: (event: MouseEvent) => void;
    onMouseMove?: (event: MouseEvent) => void;
  };
}

