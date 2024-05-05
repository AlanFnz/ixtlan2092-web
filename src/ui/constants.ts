import { ICON_KEYS, IconKey } from '../assetManager/icons';

type BaseButton = {
  id: string;
  icon: IconKey;
  uiText: string;
};

type ToggleButton = BaseButton & {
  iconPlay: IconKey;
  iconPause: IconKey;
  uiTextPlay: string;
  uiTextPause: string;
};

type ToolbarButtons = {
  [key: string]: BaseButton | ToggleButton;
};

const TOOLBAR_BUTTONS: ToolbarButtons = {
  SELECT: {
    id: 'SELECT',
    icon: ICON_KEYS.SELECT,
    uiText: 'SELECT',
  },

  RESIDENTIAL: {
    id: 'RESIDENTIAL',
    icon: ICON_KEYS.HOUSE,
    uiText: 'RESIDENTIAL',
  },
  COMMERCIAL: {
    id: 'COMMERCIAL',
    icon: ICON_KEYS.OFFICE,
    uiText: 'COMMERCIAL',
  },
  INDUSTRIAL: {
    id: 'INDUSTRIAL',
    icon: ICON_KEYS.FACTORY,
    uiText: 'INDUSTRIAL',
  },
  ROAD: {
    id: 'ROAD',
    icon: ICON_KEYS.ROAD,
    uiText: 'ROAD',
  },
  BULLDOZE: {
    id: 'BULLDOZE',
    icon: ICON_KEYS.BULLDOZER,
    uiText: 'BULLDOZE',
  },

  TOGGLE_PAUSE: {
    id: 'TOGGLE_PAUSE',
    icon: ICON_KEYS.PAUSE, // fallback icon if needed
    iconPlay: ICON_KEYS.PLAY,
    iconPause: ICON_KEYS.PAUSE,
    uiText: 'PAUSE', // fallback text if needed
    uiTextPlay: 'PLAY',
    uiTextPause: 'PAUSE',
  } as ToggleButton,
};

const INFO_UI_TEXT = 'INFO';

export {
  BaseButton,
  ToggleButton,
  ToolbarButtons,
  TOOLBAR_BUTTONS,
  INFO_UI_TEXT,
};

