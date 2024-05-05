import * as THREE from 'three';
import BULLDOZER from './bulldozer.png';
import FACTORY from './factory.png';
import HOUSE from './house.png';
import OFFICE from './office.png';
import PAUSE from './pause.png';
import PLAY from './play.png';
import ROAD from './road.png';
import SELECT from './select.png';

export const ICON_KEYS = {
  SELECT: 'SELECT',
  BULLDOZER: 'BULLDOZER',
  HOUSE: 'HOUSE',
  OFFICE: 'OFFICE',
  FACTORY: 'FACTORY',
  ROAD: 'ROAD',
  PAUSE: 'PAUSE',
  PLAY: 'PLAY',
} as const;

type IconKey = (typeof ICON_KEYS)[keyof typeof ICON_KEYS];

const icons: Record<IconKey, string> = {
  BULLDOZER,
  FACTORY,
  HOUSE,
  OFFICE,
  PAUSE,
  PLAY,
  ROAD,
  SELECT,
};

function isValidIconKey(key: string): key is IconKey {
  return Object.keys(icons).includes(key);
}

const getIcon = (icon: IconKey) => icons[icon];

export { IconKey, getIcon, isValidIconKey };

