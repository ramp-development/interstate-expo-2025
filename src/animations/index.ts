import { groups } from './groups';
import { mouse } from './mouse';
import { nav } from './nav';
import { transitions } from './transitions';

export const animations = () => {
  // setTimeout(groups, 1000);
  transitions();
  mouse();
  nav();
  groups();
};
