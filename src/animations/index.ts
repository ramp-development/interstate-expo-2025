import { groups } from './groups';
import { mouse } from './mouse';
import { nav } from './nav';

export const animations = () => {
  mouse();
  nav();
  groups();
};
