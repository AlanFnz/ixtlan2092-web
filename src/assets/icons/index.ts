import * as THREE from 'three';
import BULLDOZER from './bulldozer.png';
import FACTORY from './factory.png';
import HOUSE from './house.png';
import OFFICE from './office.png';
import PAUSE from './pause.png';
import PLAY from './play.png';
import ROAD from './road.png';
import SELECT from './select.png';

type IconKey =
  | 'BULLDOZER'
  | 'FACTORY'
  | 'HOUSE'
  | 'OFFICE'
  | 'PAUSE'
  | 'PLAY'
  | 'ROAD'
  | 'SELECT';

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

