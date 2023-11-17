import { simulateEvent } from '@finsweet/ts-utils';

import { queryElement } from '$utils/queryElement';
import { queryElements } from '$utils/queryElements';

import { type Page, pages } from './pages';

export const transitionIn = () => {
  console.log('transitionIn');

  /**
   * IN:
   * - click transition in triggers
   */

  // create config
  const config = {
    transitionAttr: 'data-transition',
    loaderAttr: 'data-loader',
    value: 'in',
    timeout: 1000,
  };

  // get the page we're going to
  let page: Page | undefined = undefined;
  if (location.pathname.includes('/cases/')) {
    page = pages.find((page) => page.slug === '/cases/');
  } else {
    page = pages.find((page) => page.slug === location.pathname);
  }
  if (!page) return;

  if (page.name !== 'home') clickTriggers();

  const loaderEl = queryElement<HTMLDivElement>(`[${config.loaderAttr}="loader"]`);
  const close = queryElement<HTMLDivElement>(`[${config.loaderAttr}="close"]`);
  const transitionEl = queryElement<HTMLDivElement>(`[${config.transitionAttr}="logo"]`);

  if (document.referrer.includes(window.location.hostname)) {
    transition();
  } else {
    loader();
  }

  function transition() {
    if (loaderEl) loaderEl.remove();
    if (close) simulateEvent(close, 'click');
    clickTriggers();
  }

  function loader() {
    if (transitionEl) transitionEl.remove();

    const customEase =
      'M0,0,C0.061,0.186,0.198,0.488,0.482,0.568,0.564,0.591,0.741,0.561,0.882,0.668,1.009,0.765,0.986,1,1,1';
    const counter = { value: 0 };
    let duration = 6;

    const loaderText = queryElement<HTMLDivElement>(`[${config.loaderAttr}="text"]`);
    const loaderBackground = queryElement<HTMLDivElement>(`[${config.loaderAttr}="background"]`);
    if (!loaderText || !loaderBackground) return;

    // If not a first time visit in this tab
    if (sessionStorage.getItem('visited') !== null) duration = 1;
    sessionStorage.setItem('visited', 'true');

    const updateLoaderText = () => {
      const progress = Math.round(counter.value);
      loaderText.textContent = `${progress}%`;
    };

    const endLoaderAnimation = () => {
      if (close) simulateEvent(close, 'click');
    };

    const timeline = gsap.timeline({
      defaults: {
        duration,
        ease: CustomEase.create('custom', customEase),
      },
      onComplete: endLoaderAnimation,
    });

    timeline
      .to(counter, {
        value: 100,
        onUpdate: updateLoaderText,
      })
      .to(
        loaderBackground,
        {
          width: '100%',
        },
        '<'
      );
  }

  function clickTriggers() {
    // get all trigger elements
    const triggers = queryElements<HTMLDivElement>(`[${config.transitionAttr}=${config.value}]`);
    if (triggers.length === 0) return;

    // click them after the page transition animation is complete
    setTimeout(() => {
      triggers.forEach((trigger) => trigger.click());
    }, config.timeout);
  }
};
