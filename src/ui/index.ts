import { createInfoPanel } from './InfoPanel';
import { createToolBar } from './ToolBar';
import { createTopBar } from './TopBar';

export function createUi() {
  createTopBar();
  const toolbar = createToolBar();
  if (toolbar) createInfoPanel(toolbar);
}

