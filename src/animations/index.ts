import { groups } from './groups';
import { lenis } from './lenis';
import { mouse } from './mouse';
import { nav } from './nav';

export const animations = () => {
  lenis();
  mouse();
  nav();
  groups();
};
