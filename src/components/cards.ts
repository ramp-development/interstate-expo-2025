/**
 * Function to force all card reveal elements to be full size
 */

import { queryElement } from '$utils/queryElement';
import { queryElements } from '$utils/queryElements';

export const cards = () => {
  // eslint-disable-next-line no-console
  console.log('cards');

  const attr = 'data-card';
  const components = queryElements<HTMLDivElement>(`[${attr}="component"]`);

  resizeCards();
  addEventListener('resize', resizeCards);

  function resizeCards(): void {
    components.forEach((component) => {
      const sub = queryElement(`[${attr}="sub"]`, component);
      if (!sub) return;

      const height = component.offsetHeight;
      sub.style.height = `${height}px`;
      sub.style.minHeight = `${height}px`;
    });
  }
};
