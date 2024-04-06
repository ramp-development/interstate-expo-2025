import { cards } from './cards';
import { countdown } from './countdown';
import { lines } from './lines';
import { sliders } from './sliders';

export const components = () => {
  // eslint-disable-next-line no-console
  // console.log('components');
  countdown();
  lines();
  sliders();
  cards();
};
