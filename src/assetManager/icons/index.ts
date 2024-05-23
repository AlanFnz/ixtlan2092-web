import * as THREE from 'three';
import SELECT from './select.png';
import BULLDOZER from './bulldozer.png';
import HOUSE from './house.png';
import OFFICE from './office.png';
import FACTORY from './factory.png';
import JOB from './job.png';
import CALENDAR from './calendar.png';
import PERSON from './person.png';
import PAUSE from './pause.png';
import PLAY from './play.png';
import ROAD from './road.png';

export const ICON_KEYS = {
  SELECT: 'SELECT',
  BULLDOZER: 'BULLDOZER',
  HOUSE: 'HOUSE',
  OFFICE: 'OFFICE',
  FACTORY: 'FACTORY',
  JOB: 'JOB',
  CALENDAR: 'CALENDAR',
  PERSON: 'PERSON',
  ROAD: 'ROAD',
  PAUSE: 'PAUSE',
  PLAY: 'PLAY',
} as const;

type IconKey = (typeof ICON_KEYS)[keyof typeof ICON_KEYS];

const icons: Record<IconKey, string> = {
  SELECT,
  BULLDOZER,
  HOUSE,
  OFFICE,
  FACTORY,
  JOB,
  CALENDAR,
  PERSON,
  PAUSE,
  PLAY,
  ROAD,
};

function isValidIconKey(key: string): key is IconKey {
  return Object.keys(icons).includes(key);
}

const getIcon = (icon: IconKey) => icons[icon];

export { IconKey, getIcon, isValidIconKey };

