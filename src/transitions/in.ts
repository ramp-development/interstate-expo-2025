import { queryElements } from '$utils/queryElements';

export const transitionIn = () => {
  console.log('transitionIn');

  /**
   * IN:
   * - click transition in triggers
   */

  // create config
  const config = {
    attr: 'data-transition',
    value: 'in',
    timeout: 1000,
  };

  // get all trigger elements
  const triggers = queryElements<HTMLDivElement>(`[${config.attr}=${config.value}]`);
  if (triggers.length === 0) return;

  // click them after the page transition animation is complete
  setTimeout(() => {
    triggers.forEach((trigger) => trigger.click());
  }, config.timeout);
};
