import { transitionIn } from './in';
import { transitionOut } from './out';

export const transitions = () => {
  console.log('transitions');

  transitionIn();
  transitionOut();
};
